import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPagesComponent } from './acc-pages.component';

describe('AccPagesComponent', () => {
  let component: AccPagesComponent;
  let fixture: ComponentFixture<AccPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
