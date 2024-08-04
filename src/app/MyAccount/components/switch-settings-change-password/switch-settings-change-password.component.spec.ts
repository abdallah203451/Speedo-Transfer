import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSettingsChangePasswordComponent } from './switch-settings-change-password.component';

describe('SwitchSettingsChangePasswordComponent', () => {
  let component: SwitchSettingsChangePasswordComponent;
  let fixture: ComponentFixture<SwitchSettingsChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchSettingsChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchSettingsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
