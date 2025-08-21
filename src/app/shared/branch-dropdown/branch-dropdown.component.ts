import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-branch-dropdown',
  templateUrl: './branch-dropdown.component.html',
  styleUrls: ['./branch-dropdown.component.scss']
})
export class BranchDropdownComponent {
  selectControl = new FormControl();
  branchDropdown: any[] = [];

  getBranchText(item: any): string{
    return item.companyBranch ? item.companyBranch : ''
  }
}
