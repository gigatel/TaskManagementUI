import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, TOOLBAR_FULL } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global-service';
import { TaskManagementService } from 'src/app/core/services/task-management.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  taskForm!: FormGroup;
  maxDate = new Date();

  showBoundaryLinks!: boolean;
  showDirectionLinks!: boolean;
  loader: boolean = false;

  totalRecords: number = 0;
  showEntries: number = 0;
  itemsPerPage: number = 5;
  pageSize: number = 1;

  editor: any = Editor;
  public Editor = ClassicEditor;
  public editorData = '<p>Initial content.</p>'; // Initial content
  public editorConfig = {
    sourceEditing: true, // Enable source code editing
  };
  toolbar: any = TOOLBAR_FULL;

  status: any[] = [];
  scheduleType: any[] = [];
  empId: any[] = [];
  empList: any[] = [];
  taskList: any[] = [];
  dayList: any[] = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' }
  ];
  statusDD = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'InActive' },
  ]
  scheduleTypeDD = [
    { id: 1, name: 'One Time', value: 'OneTime' },
    { id: 2, name: 'Recuring', value: 'Recuring' },
  ]

  private ts = inject(ToastrService);
  private tms = inject(TaskManagementService);
  public tks = inject(TokenStorageService);
  private gs = inject(GlobalService);

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      schedule: new FormControl(''),
      time: new FormControl('', [Validators.required]),
      reminder: new FormControl(''),
      // emails: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(;(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))*$/)]),
      emails: new FormControl('', [Validators.required, this.multipleEmailsValidator()]),

      status: new FormControl(''),
      selecteDay: new FormControl(''),
      selectDate: new FormControl(''),
      scheduleType: new FormControl('', [Validators.required]),
      id: new FormControl(0),
      endDate: new FormControl('')
    })

    this.editor = new Editor();
    this.status = ['Active'];
    this.searchAsset('');
    this.getTaskScheduledEmpDD();

    this.taskForm.controls['scheduleType'].valueChanges.subscribe(res => {
      this.f['schedule'].reset();
      this.f['reminder'].reset();
      this.f['selectDate'].reset();
      this.f['selecteDay'].reset();
      this.f['endDate'].reset();

    })

    this.taskForm.controls['schedule'].valueChanges.subscribe(res => {
      this.f['selectDate'].reset();
      this.f['selecteDay'].reset();

    })
  }

  get f() {
    return this.taskForm.controls
  }

  submit(text: string): void {
    let payload: any;
    if (!(this.taskForm.valid)) {
      console.log(this.taskForm)
      this.ts.warning('Please Select All Required Fields!!')
      return
    }

    const html = this.f['description'].value;
    const textWithLineBreaks = html
      .replace(/<p>/g, '')           // remove <p>
      .replace(/<\/p>/g, '<br>')       // replace </p> with newline
      .replace(/<br\s*\/?>/g, '<br>')  // replace <br> with newline
      .replace(/&nbsp;/g, ' ');

    payload = {
      taskName: this.f['name'].value ?? '',
      scheduleType: this.f['scheduleType'].value ?? '',
      schedule: this.f['schedule'].value ?? '',
      scheduleDay: this.f['selecteDay'].value ?? '',
      scheduleDate: this.f['scheduleType'].value === 'OneTime' ? this.gs.convertDateObjIntoString(this.f['reminder'].value) : (this.f['selectDate'].value ? this.gs.convertDateObjIntoString(this.f['selectDate'].value) : ''),
      scheduleTime: text === 'save' && this.f['time'].value ? this.f['time'].value + '' + ':00' : (this.f['time'].touched || this.f['time'].dirty ? this.f['time'].value + '' + ':00' : this.f['time'].value),
      taskSubject: this.f['subject'].value ?? '',
      taskDescription: textWithLineBreaks ?? '',
      receiverEmailId: this.f['emails'].value.endsWith(';') ? this.removeMultipleSemiColumn(this.f['emails'].value) :  this.f['emails'].value,
      endDate: this.f['endDate'].value ? this.gs.convertDateObjIntoString(this.f['endDate'].value) : ''
    }

    payload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => {
        if (typeof v === 'string') {
          return v.trim() !== '';  // remove empty/whitespace strings
        }
        return v !== null && v !== undefined; // remove null/undefined
      })
    );


    if (text === 'save') {
      payload.id = 0;
    } else {
      payload.id = this.f['id'].value ?? 0;
    }

    console.log(payload)

    // this.insertUpdateTaskSchedules(payload, text);

  }

  insertUpdateTaskSchedules(payload: any, text: string): void {
    this.tms.insertUpdateTaskSchedules(payload).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.taskForm.reset();
          this.f['id'].patchValue(0);
          this.searchAsset('')
          if (text === 'save') {
            this.ts.success('Task Created Successfully!!');
          } else {
            this.ts.success('Task Updated Successfully!!');
          }
        } else {
          this.ts.warning(res.message);
        }
      },
      error: (error) => {
        this.ts.error(error.error.message);
      }
    })
  }

  taskListPaggi(payload: any): void {
    this.tms.getTaskSchedulePaggi(payload).subscribe({
      next: (res) => {
        if (res && res.success) {
          if (res.data && res.data.length > 0) {
            this.taskList = res.data;
            this.totalRecords = res.recordsFiltered;

            for (let i = 0; i < this.taskList.length; i++) {
              this.taskList[i].sNo = (payload.size) * (payload.page - 1) + i + 1;
            }
          } else {
            this.taskList = [];
          }
        } else {
          this.taskList = [];
          this.ts.warning(res.message);
        }
      },
      error: (err) => {
        this.taskList = [];
        this.ts.error(err.error.messages);
      }
    })
  }

  pageChanged(event: any) {
    this.pageSize = event.page
    const payload = {
      page: event.page,
      size: this.showEntries ? Number(this.showEntries) : this.itemsPerPage,
      search: '',
      empIds: this.empId ? this.empId.join(',') : '',
      scheduleType: this.scheduleType ? this.scheduleType.join(',') : '',
      status: this.status ? this.status.join(',') : ''
    }
    this.taskListPaggi(payload);
  }

  searchAsset(event: any): void {
    const payload = {
      page: this.pageSize ? this.pageSize : 1,
      size: this.itemsPerPage ? this.itemsPerPage : 1,
      search: event,
      empIds: this.empId ? this.empId.join(',') : '',
      scheduleType: this.scheduleType ? this.scheduleType.join(',') : '',
      status: this.status ? this.status.join(',') : ''

    }
    this.taskListPaggi(payload);
  }

  setItemsPerPage(event: any): void {
    this.showEntries = event.target.value;
    this.pageSize = 1;
    const payload = {
      page: this.pageSize ? this.pageSize : 1,
      size: event.target.value ? Number(event.target.value) : 1,
      search: '',
      empIds: this.empId ? this.empId.join(',') : '',
      scheduleType: this.scheduleType ? this.scheduleType.join(',') : '',
      status: this.status ? this.status.join(',') : ''

    }
    this.taskListPaggi(payload);
  }

  cancel(): void {
    this.taskForm.reset();
    this.f['id'].patchValue(0);
  }

  edit(id: number): void {
    if (id === 0 || id === null || id === undefined) {
      return
    }

    this.getTaskScheduleById(id);

  }

  deleteTask(id: number): void {
    if (id === 0 || id === null || id === undefined) {
      return
    }

    this.deleteTaskSchedule(id);
  }

  getTaskScheduleById(id: number): void {
    this.tms.getTaskScheduleById(id).subscribe({
      next: (res) => {
        if (res && res.success) {
          if (res.data && res.data !== null && res.data !== undefined) {
            this.taskForm.patchValue({
              id: res.data.id || 0,
              name: res.data.taskName || '',
              subject: res.data.taskSubject || '',
              scheduleType: res.data.scheduleType || '',
              schedule: res.data.schedule || '',
              selecteDay: res.data.scheduleDay || '',
              selectDate: res.data.scheduleDate ? new Date(res.data.scheduleDate) : '',
              reminder: res.data.scheduleDate ? new Date(res.data.scheduleDate) : '',
              time: res.data.scheduleTime || '',
              emails: res.data.receiverEmailId || '',
              description: res.data.taskDescription || '',
              endDate: res.data.endDate ? new Date(res.data.endDate) : ''

            })
          }
        } else {
          this.ts.warning(res.message);
        }
      },
      error: (err) => {
        this.ts.error(err.error.message);

      }
    })
  }

  deleteTaskSchedule(id: number): void {
    this.tms.deleteTaskSchedule(id).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.ts.info('InActive Task Successfully!!');
          this.searchAsset('');
        } else {
          this.ts.warning(res.message);
        }
      },
      error: (err) => {
        this.ts.error(err.error.message);

      }
    })
  }

  getStatus(event: any): void {
    this.searchAsset('');
  }

  getScheduleType(event: any): void {
    this.searchAsset('');
  }

  getEmpId(event: any): void {
    this.searchAsset('');

  }

  getTaskScheduledEmpDD(): void {
    this.tms.getTaskScheduledEmpDD().subscribe({
      next: (res) => {
        if (res && res.success) {
          if (res.data && res.data.length > 0) {
            this.empList = res.data;
          } else {
            this.empList = [];
          }
        } else {
          this.empList = [];
          this.ts.warning(res.message);
        }
      },
      error: (err) => {
        this.empList = [];
        this.ts.error(err.error);
      }
    })
  }

  getEmpName(item: any): string {
    return item.empName ? item.empName + '(' + item.employeeCode + ')' : ''
  }

  onSelectAll(): void {
    const selectedAllEMP = this.empList && this.empList.length > 0 ? this.empList.map((x: any) => x.id) : [];
    this.empId = selectedAllEMP;
    this.searchAsset('');
  }

  onClearAll(): void {
    this.empId = [];
    this.searchAsset('');

  }

  multipleEmailsValidator(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) return null;
      const input = control.value.endsWith(';')
        ? control.value.slice(0, -1)
        : control.value;

      const emails = input.split(';').map((e: any) => e.trim()).filter((e: any) => e.length > 0);

      const emailRegex = /^[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

      const invalidEmail = emails.find((e: any) => !emailRegex.test(e));

      return invalidEmail ? { invalidEmail: invalidEmail } : null;
    }
  }

  removeMultipleSemiColumn(value: string): string{
    let selectedValue = '';
    if(value === '' || value === null) return '';
    selectedValue = value.split(';').map(e => e.trim()).filter(x => x).join(';');
    return selectedValue
  }

}
