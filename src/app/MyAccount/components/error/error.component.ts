import { Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { RegisterComponent } from '../../../auth/components/register/register.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(private dialog: DialogService) {}
  toRegister() {
    this.dialog.open(RegisterComponent);
  }
}
