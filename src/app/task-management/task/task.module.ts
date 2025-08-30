import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TaskListComponent } from './task-list/task-list.component';
import { NgxEditorModule } from 'ngx-editor';
import { TaskEmailSentHistoryComponent } from './task-email-sent-history/task-email-sent-history.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskEmailSentHistoryComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgSelectModule,
    PaginationModule,
    NgxEditorModule
  ]
})
export class TaskModule { 
  
}
