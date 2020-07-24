import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Link1Component } from './link1/link1.component';
import { SurveyComponent } from './survey/survey.component';
import { Link3Component } from './link3/link3.component';
import { DynamicGridComponent } from './dynamic-grid/dynamic-grid.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { BlogComponent } from './blog/blog.component';
import { InboxComponent } from './inbox/inbox.component';


const routes: Routes = [
  { path: 'link1', component: Link1Component },
  { path: 'button-icon', component: ButtonIconComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'link3', component: Link3Component },
  { path: 'dynamic-grid', component: DynamicGridComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'inbox', component: InboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
