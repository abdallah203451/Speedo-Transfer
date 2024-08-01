import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransferFormComponent } from './money-transfer-form.component';

describe('MoneyTransferFormComponent', () => {
  let component: MoneyTransferFormComponent;
  let fixture: ComponentFixture<MoneyTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTransferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
