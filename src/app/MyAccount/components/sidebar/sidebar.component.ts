import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Ensure correct syntax
})
export class SidebarComponent {
  @Output() switch = new EventEmitter<string>();

  profile() {
    this.switch.emit('profile');
  }
  changePassword() {
    this.switch.emit('changePassword');
  }
}
