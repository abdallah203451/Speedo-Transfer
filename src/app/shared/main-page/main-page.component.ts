import { Component } from '@angular/core';
import { MoneyTransferHeroSectionComponent } from '../money-transfer-hero-section/money-transfer-hero-section.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MoneyTransferHeroSectionComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
