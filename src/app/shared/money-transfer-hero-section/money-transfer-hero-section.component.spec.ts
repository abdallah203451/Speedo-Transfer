import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransferHeroSectionComponent } from './money-transfer-hero-section.component';

describe('MoneyTransferHeroSectionComponent', () => {
  let component: MoneyTransferHeroSectionComponent;
  let fixture: ComponentFixture<MoneyTransferHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyTransferHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTransferHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
