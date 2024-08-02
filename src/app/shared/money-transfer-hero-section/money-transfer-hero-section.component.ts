import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-money-transfer-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './money-transfer-hero-section.component.html',
  styleUrl: './money-transfer-hero-section.component.scss',
})
export class MoneyTransferHeroSectionComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.updateCurrentRoute(this.router.url);
  }

  updateCurrentRoute(url: string): void {
    const routeSegments = url.split('/');
    this.currentRoute = routeSegments[routeSegments.length - 1].replace(
      '-',
      ' '
    );
  }
}
