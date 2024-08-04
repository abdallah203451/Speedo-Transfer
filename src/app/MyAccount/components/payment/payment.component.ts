import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  copyToClipboard() {
    const accountNumberText = (document.getElementById('account-number') as HTMLElement).innerText;
    const accountNumber = accountNumberText.replace('Account Number: ', '');
    navigator.clipboard.writeText(accountNumber).then(() => {
      this.showCopySuccessMessage();
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  showCopySuccessMessage() {
    const messageElement = document.getElementById('copy-success-message');
    if (messageElement) {
      messageElement.classList.remove('hidden');
      setTimeout(() => {
        messageElement.classList.add('hidden');
      }, 2500);
    }
  }
}
