import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagementRoutingModule } from './task-management-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [],
  imports: [
    PaginationModule,
    CommonModule,
    TaskManagementRoutingModule
  ]
})
export class TaskManagementModule { }
