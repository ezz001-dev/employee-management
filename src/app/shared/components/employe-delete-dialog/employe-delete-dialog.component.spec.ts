import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDeleteDialogComponent } from './employe-delete-dialog.component';

describe('EmployeDeleteDialogComponent', () => {
  let component: EmployeDeleteDialogComponent;
  let fixture: ComponentFixture<EmployeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
