import { Component, OnInit, inject } from '@angular/core';
import { ScheduleFilterInput, TaskEmailHistory } from 'src/app/core/models/task-management.models';
import { TaskManagementService } from 'src/app/core/services/task-management.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-task-email-sent-history',
  templateUrl: './task-email-sent-history.component.html',
  styleUrls: ['./task-email-sent-history.component.scss']
})
export class TaskEmailSentHistoryComponent implements OnInit {
  private tms = inject(TaskManagementService);


  showModal = false;
  modalContentSafe: SafeHtml | null = null;
  constructor(private sanitizer: DomSanitizer) { }


  taskList: TaskEmailHistory[] = [];
  filterInput: ScheduleFilterInput = {
    emailIds:'',
    empIds: '',
    scheduleType: '',
    status: 'Active',
    page: 1,
    size: 10,
    search: ''
  };

  totalRecords = 0;
  searchTerm = '';

  statusDD = [
    { id: 'Active', name: 'Active' },
    { id: 'Inactive', name: 'Inactive' }
  ];
  status: string[] = ['Active'];

  //  Employee filter
  empList: any[] = [];
  empId: any[] = [];

  emailList:any[] =[];
  selectedEmails: string[] = [];  // for selected values

onEmailChange(selected: string[]) {
  console.log("Selected Emails: ", selected);
  this.loadTaskHistory();
}

selectAllEmails() {
  this.selectedEmails = [...this.emailList];
}

clearAllEmails() {
  this.selectedEmails = [];
}

  ngOnInit(): void {
    this.loadTaskHistory();
    this.getTaskScheduledEmpDD(); // load employee list
    this. GetDistinctEmailsForDD();
  }

  getStatus(selected: string[]): void {
    this.status = selected;
    this.filterInput.status = selected.join(',');
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }

  loadTaskHistory(): void {
    this.filterInput.empIds = this.empId.length > 0 ? this.empId.join(',') : '';
   this.filterInput.emailIds = this.selectedEmails.length > 0 ? this.selectedEmails.join(',') : '';

    this.tms.getTaskEmailSentHistoryPaggi(this.filterInput).subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          this.taskList = res.data;
          this.totalRecords = res.recordsFiltered;
          for(let i = 0; i< this.taskList.length;i++ ){
            this.taskList[i].sNo = this.filterInput.size * (this.filterInput.page - 1) + i + 1
          }
        } else {
          this.taskList = [];
          this.totalRecords = 0;
        }
      },
      error: (err) => {
        console.error('Error fetching task history:', err);
        this.taskList = [];
        this.totalRecords = 0;
      }
    });
  }



  onSearchChange(): void {
    this.filterInput.search = this.searchTerm;
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }

  onPageSizeChange(size: number): void {
    this.filterInput.size = size;
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }

  onPageChange(newPage: number): void {
    this.filterInput.page = newPage;
    this.loadTaskHistory();
  }

  pageChanged(event: any): void {
    this.onPageChange(event.page);
  }


  //  Employee Methods
  getTaskScheduledEmpDD(): void {
    this.tms.getTaskScheduledEmpDD().subscribe({
      next: (res) => {
        if (res && res.success) {
          this.empList = res.data && res.data.length > 0 ? res.data : [];
        } else {
          this.empList = [];
        }
      },
      error: () => {
        this.empList = [];
      }
    });
  }
  GetDistinctEmailsForDD(): void {
    this.tms.GetDistinctEmailsForDD().subscribe({
      next: (res) => {
        if (res && res.success) {
           this.emailList = res.data && res.data.length > 0 ? res.data : [];
        } else {
           this.emailList = [];
        }
      },
      error: () => {
         this.emailList = [];
      }
    });
  }

  getEmpId(event: any): void {
    this.empId = event;
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }

  getEmpName(item: any): string {
    return item.empName ? `${item.empName} (${item.employeeCode})` : '';
  }

  onSelectAll(): void {
    this.empId = this.empList.map((x: any) => x.id);
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }

  onClearAll(): void {
    this.empId = [];
    this.filterInput.page = 1;
    this.loadTaskHistory();
  }


  getPreviewText(html: string | null | undefined, limit = 15): string {
    if (!html) { return '-'; }
    const text = html.replace(/<[^>]+>/g, '').trim(); // strip tags
    if (!text) { return '-'; }
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  isLong(html: string | null | undefined, limit = 15): boolean {
    if (!html) { return false; }
    const text = html.replace(/<[^>]+>/g, '').trim();
    return text.length > limit;
  }

  openModal(html: string | null | undefined): void {
    this.modalContentSafe = this.sanitizer.bypassSecurityTrustHtml(html || '');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalContentSafe = null;
  }

}
