import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeEditDialogComponent } from './employe-edit-dialog.component';

describe('EmployeEditDialogComponent', () => {
  let component: EmployeEditDialogComponent;
  let fixture: ComponentFixture<EmployeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
