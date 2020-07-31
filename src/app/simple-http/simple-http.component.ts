import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from './external-api.service';
import { Observable } from 'rxjs';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css'],
})
export class SimpleHttpComponent implements OnInit {
  constructor(
    private externalApiService: ExternalApiService,
    // private _sanitizer: DomSanitizer
  ) {}
  items: Observable<any>;

  // getSantizeUrl(url: string) {
  //   return this._sanitizer.bypassSecurityTrustUrl(url);
  // }

  ngOnInit(): void {
    this.items = this.externalApiService.getItems();
  }
}
