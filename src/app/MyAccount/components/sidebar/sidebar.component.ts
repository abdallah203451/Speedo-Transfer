import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Ensure correct syntax
})
export class SidebarComponent {
  activeButton: string = 'profile';

  setActive(button: string) {
    this.activeButton = button;
  }
}
