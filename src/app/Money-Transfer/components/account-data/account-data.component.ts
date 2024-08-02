import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-data',
  standalone: true,
  imports: [],
  templateUrl: './account-data.component.html',
  styleUrl: './account-data.component.scss',
})
export class AccountDataComponent {
  @Input() name = '';
  @Input() accountNumber = '';
}
