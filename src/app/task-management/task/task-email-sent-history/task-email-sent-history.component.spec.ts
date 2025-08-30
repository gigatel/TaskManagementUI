import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEmailSentHistoryComponent } from './task-email-sent-history.component';

describe('TaskEmailSentHistoryComponent', () => {
  let component: TaskEmailSentHistoryComponent;
  let fixture: ComponentFixture<TaskEmailSentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEmailSentHistoryComponent]
    });
    fixture = TestBed.createComponent(TaskEmailSentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
