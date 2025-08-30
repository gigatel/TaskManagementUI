import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskEmailSentHistoryComponent } from "./task-email-sent-history/task-email-sent-history.component";
import { PaginationComponent } from "ngx-bootstrap/pagination";

const routes: Routes = [
    {path: 'task-list', component: TaskListComponent},
     {path: 'task-email-history', component: TaskEmailSentHistoryComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaskRoutingModule {}
