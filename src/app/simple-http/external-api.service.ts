import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  // this line is for package optimization
  // for more, see here -> https://angular.tw/guide/architecture-services
  providedIn: 'root',
})
export class ExternalApiService {
  constructor(private http: HttpClient) {}
  getItems() {
    return this.http.get(`https://api.github.com/users/re4388/starred`);
  }
}
