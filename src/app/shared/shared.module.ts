import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoaderComponent } from './loader/loader.component';
import { BranchDropdownComponent } from './branch-dropdown/branch-dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCurrentyFormat } from './pipe/currency.pipe';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    LoaderComponent,
    BranchDropdownComponent,
    MyCurrentyFormat
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BreadcrumbsComponent,LoaderComponent,BranchDropdownComponent, MyCurrentyFormat]
})
export class SharedModule { }
