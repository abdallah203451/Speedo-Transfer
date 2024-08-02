import { Component, EventEmitter, Output } from '@angular/core';
import { AuthModalService } from '../../services/auth-modal/auth-modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // @Output() loginButtonClicked = new EventEmitter<boolean>();
  // @Output() registerButtonClicked = new EventEmitter<boolean>();
  constructor(private authModalService: AuthModalService) {}
  toLogin() {
    // this.loginButtonClicked.emit(true);
    this.authModalService.showLogin();
  }

  toRegister() {
    // this.registerButtonClicked.emit(true);
    this.authModalService.showRegister();
  }
}
