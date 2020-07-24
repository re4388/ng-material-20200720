import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts$: Observable<any[]>;
  progress = 20;
  strokeWidth = 10;
  diameter = 10;

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  showAddPostDialog(): void {
    this.dialog.open(AddPostDialogComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      console.log('目前已經沒有dialog了');
    });

    this.dialog.afterOpened.subscribe((dialogRef: MatDialogRef<any>) => {
      console.log(`新的dialog已開啟：${dialogRef.id}`);
      console.log(`目前已開啟 ${this.dialog.openDialogs.length} 個dialog了`);
    });
  }

  ngOnInit(): void {
    this.posts$ = this.httpClient
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((posts) => posts.slice(0, 6)));
  }
}
