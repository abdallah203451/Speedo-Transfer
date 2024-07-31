import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { DownloadComponent } from '../../../shared/download/download.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, DownloadComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
