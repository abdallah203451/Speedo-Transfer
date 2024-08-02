import { Component } from '@angular/core';
import { MoneyInputComponent } from '../../../shared/money-input/money-input.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MoneyInputComponent, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(private readonly router: Router) {}
  goTOTransfer() {
    this.router.navigate(['/transfer']);
  }
}
