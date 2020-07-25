import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit, AfterViewInit {
  totalCount: number;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;
  @ViewChild('filter') filter: ElementRef;
  currentFilterData: string;
  currentPage: PageEvent;
  currentSort: Sort;

  emailsDataSource = new MatTableDataSource<any>();

  constructor(
    private httpClient: HttpClient,
    private matPaginatorIntl: MatPaginatorIntl) { }

  ngAfterViewInit(): void {

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };

    this.getIssues();


    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getIssues();
    });

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        // 準備要提供給API的filter資料
        this.currentFilterData = (this.filter.nativeElement as HTMLInputElement).value;
        this.getIssues();

      // 後端篩選就不需要指定filter了
      //   this.emailsDataSource.filter =
      //     (this.filter.nativeElement as HTMLInputElement).value;
      // 後端篩選就用不到filterPredicate了
      //   this.emailsDataSource.filterPredicate = (data: any, filter: string): boolean => {
      //     return data.title.indexOf(filter) !== -1;
      //   }
      });
  }


  changeSort(sortInfo: Sort): void {
    // 因為API排序欄位是created，因此在這邊做調整
    if (sortInfo.active === 'created_at') {
    sortInfo.active = 'created';
  }
    this.currentSort = sortInfo;
    this.getIssues();
  }

  ngOnInit(): void {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }


  getIssues(): void {
    const baseUrl = 'https://api.github.com/search/issues?q=repo:Yorko/mlcourse.ai';

    let targetUrl = `${baseUrl}&page=${this
      .currentPage.pageIndex + 1}&per_page=${this
        .currentPage.pageSize}`;

    if (this.currentSort.direction) {
    targetUrl = `${targetUrl}&&sort=${this
      .currentSort.active}&order=${this
        .currentSort.direction}`;
    }

    if (this.currentFilterData) {
      targetUrl = `${targetUrl}&q=${this.currentFilterData}+in:title`;
    }

    this.httpClient.get<any>(targetUrl).subscribe(data => {
        this.totalCount = data.total_count;
        this.emailsDataSource.data = data.items;
        // 從後端進行排序時，不用指定sort
        // this.emailsDataSource.sort = this.sortTable;
        // 從後端取得資料時，就不用指定data srouce的paginator了
        // this.emailsDataSource.paginator = this.paginator;
      });
  }

  reply(emailRow): void {
    console.log('回覆信件', emailRow);
  }

  delete (emailRow): void {
    console.log('刪除信件', emailRow);
  }

}
