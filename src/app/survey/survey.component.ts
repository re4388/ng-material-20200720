import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  enableProdMode,
  Injectable,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepperIntl } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  MatCheckboxChange,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { SurveyInputDirective } from './survey-input.directive';
import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class TwStepperIntl extends MatStepperIntl {
  optionalLabel = ' 非必填';
}

// 調整時機為invalid + dirty即顯示錯誤訊息
export class EarlyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [
    { provide: MatStepperIntl, useClass: TwStepperIntl },
    { provide: ErrorStateMatcher, useClass: EarlyErrorStateMatcher },
    // { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'noop' },
  ],
})
export class SurveyComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean>;

  @ViewChildren(SurveyInputDirective) surveyInputs: QueryList<
    SurveyInputDirective
  >;

  keyManager: FocusKeyManager<SurveyInputDirective>;

  displayFocusTrap: boolean;

  startDate = moment('1999-1-10', 'YYYY-MM-DD');
  minDate = moment('1999-1-5', 'YYYY-MM-DD');
  maxDate = moment('1999-1-25', 'YYYY-MM-DD');
  isLinear: boolean;

  countries$: Observable<any[]>;
  intro: string;
  surveyForm: FormGroup;
  majorTechList: any[];
  interestList: any[];
  nestInterestList: any[];

  earlyErrorStateMatcher = new EarlyErrorStateMatcher();

  indeterminateSelectedPayFor: boolean;

  @HostListener('keydown', ['$event'])
  keydown($event: KeyboardEvent): void {
    // 監聽鍵盤事件並依照案件設定按鈕focus狀態
    if ($event.keyCode === UP_ARROW) {
      this.keyManager.setPreviousItemActive();
    } else if ($event.keyCode === DOWN_ARROW) {
      this.keyManager.setNextItemActive();
    }
  }
  ngAfterViewInit(): void {
    this.keyManager = new FocusKeyManager(this.surveyInputs).withWrap();
    this.keyManager.setActiveItem(0);
  }

  familyDayFilter(date: moment.Moment): boolean {
    const day = date.day();
    return day !== 2 && day !== 5;
  }
  logDateInput($event: MatDatepickerInputEvent<moment.Moment>): void {
    console.log($event);
  }

  logDateChange($event: MatDatepickerInputEvent<moment.Moment>): void {
    console.log($event);
  }

  constructor(
    private httpClient: HttpClient,
    private announcer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver
  ) {
    this.surveyForm = new FormGroup({
      basicQuestions: new FormGroup({
        name: new FormControl('', Validators.required),
        country: new FormControl(''),
        interest: new FormControl(null),
        majorTech: new FormControl(''),
        intro: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      }),
      mainQuestions: new FormGroup({
        payForAll: new FormControl(false),
        payForBook: new FormControl(false),
        payForMusic: new FormControl(false),
        payForMovie: new FormControl(true),
        angularLikeScore: new FormControl(4),
        angularMaterialLikeScore: new FormControl(4),
        subscribeAngular: new FormControl(true),
        subscribeAngularMaterial: new FormControl(true),
        subscribeNgRx: new FormControl(false),
      }),
      otherQuestions: new FormGroup({
        favoriteColorRed: new FormControl(0),
        favoriteColorGreen: new FormControl(0),
        favoriteColorBlue: new FormControl(0),
        surveyScore: new FormControl(5),
      }),
    });
  }

  public announce(): void {
    this.announcer.announce('Hello world!', 'assertive');
  }

  get selectedColorRed(): void {
    return this.surveyForm.get('otherQuestions').get('favoriteColorRed').value;
  }

  get selectedColorGreen(): void {
    return this.surveyForm.get('otherQuestions').get('favoriteColorGreen')
      .value;
  }

  get selectedColorBlue(): void {
    return this.surveyForm.get('otherQuestions').get('favoriteColorBlue').value;
  }

  // 組合顏色樣式
  get selectedColorStyle(): string {
    return `rgb(${this.selectedColorRed}, ${this.selectedColorGreen}, ${this.selectedColorBlue})`;
  }

  highlightFiltered(countryName: string): string {
    const inputCountry = this.surveyForm.get('basicQuestions').get('country')
      .value;
    return countryName.replace(
      inputCountry,
      `<span class="autocomplete-highlight">${inputCountry}</span>`
    );
  }

  displayCountry(country: any): string {
    if (country) {
      return `${country.name} / ${country.code}`;
    } else {
      return '';
    }
  }

  /* state checking and set state */
  private _setSelectAllState(): void {
    const payForBook = this.surveyForm.get('mainQuestions').get('payForBook')
      .value;
    const payForMusic = this.surveyForm.get('mainQuestions').get('payForMusic')
      .value;
    const payForMovie = this.surveyForm.get('mainQuestions').get('payForMovie')
      .value;
    const count =
      (payForBook ? 1 : 0) + (payForMusic ? 1 : 0) + (payForMovie ? 1 : 0);
    // set `payForAll` checkbox unchecked unless we have all 3 checked
    this.surveyForm
      .get('mainQuestions')
      .get('payForAll')
      .setValue(count === 3);
    // set to indeterminate state to `false` so long as we don't have all three selected
    this.indeterminateSelectedPayFor = count > 0 && count < 3;
  }

  /* we invoke state checking whenever we check one of three checkboxes */
  payForChange(): void {
    this._setSelectAllState();
  }

  checkAllChange($event: MatCheckboxChange): void {
    // we select all three checkboxes
    this.surveyForm
      .get('mainQuestions')
      .get('payForBook')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMusic')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMovie')
      .setValue($event.checked);
    this._setSelectAllState();
  }

  ngOnInit(): void {

    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset).pipe(
        map((match) => match.matches)
      );

    this._setSelectAllState();
    this.surveyForm
      .get('basicQuestions')
      .get('country')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((inputCountry) => {
        this.countries$ = this.httpClient
          .get<any[]>('assets/countries.json')
          .pipe(
            map((countries) => {
              return countries.filter(
                (country) => country.name.indexOf(inputCountry) >= 0
              );
            })
          );
      });
    this.majorTechList = [
      {
        name: ' 前端',
        items: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        name: ' 後端',
        items: ['C#', 'NodeJs', 'Go'],
      },
    ];

    this.interestList = [
      {
        id: 1,
        name: ' 桌球',
      },
      {
        id: 2,
        name: ' 網球',
      },
      {
        id: 3,
        name: ' 羽球',
      },
    ];

    this.nestInterestList = [
      {
        id: 1,
        name: ' 球類',
        subItems: [
          {
            id: 11,
            name: ' 桌球',
          },
          {
            id: 12,
            name: ' 網球',
          },
          {
            id: 13,
            name: ' 羽球',
          },
        ],
      },
      {
        id: 2,
        name: ' 其他',
        subItems: [
          {
            id: 21,
            name: ' 游泳',
          },
          {
            id: 22,
            name: ' 跑步',
          },
        ],
      },
    ];
  }
}
