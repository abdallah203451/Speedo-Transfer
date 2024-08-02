import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MoneyTransferHeroSectionComponent } from '../../shared/money-transfer-hero-section/money-transfer-hero-section.component';
import { AccountDataComponent } from '../components/account-data/account-data.component';

@Component({
  selector: 'app-money-transfer-form',
  templateUrl: './money-transfer-form.component.html',
  styleUrls: ['./money-transfer-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MoneyTransferHeroSectionComponent,
    AccountDataComponent,
  ],
})
export class MoneyTransferFormComponent {
  fees: any;
  feeCurrency: any;
  transferForm: FormGroup;
  convertedAmount: number | null = null;
  currencyOptions: string[] = [];
  exchangeRates: any = {};
  conversionRateText: string | null = null;
  transferSuccessful: boolean = false;
  fromAccount = 'xxxx7890';
  private apiUrl =
    'https://v6.exchangerate-api.com/v6/44d7f7e9b0c7df5700709f65/latest/USD';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.transferForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      fromCurrency: ['USD', Validators.required],
      toCurrency: ['EGP', Validators.required],
      recipientName: ['', Validators.required],
      recipientAccount: [
        '',
        [Validators.required, Validators.pattern('^[1-9]{8}$')],
      ],
      senderName: ['Jonathon Smith', Validators.required],
    });

    this.fetchExchangeRates().subscribe((rates) => {
      this.exchangeRates = rates;
      this.currencyOptions = Object.keys(rates);
      this.convertAmount();
    });
  }

  convertAmount() {
    const amount = this.transferForm.value.amount;
    const fromCurrency = this.transferForm.value.fromCurrency;
    const toCurrency = this.transferForm.value.toCurrency;

    if (amount <= 0) {
      this.convertedAmount = null;
      this.conversionRateText = null;
      return;
    }

    if (
      fromCurrency &&
      toCurrency &&
      this.exchangeRates[fromCurrency] &&
      this.exchangeRates[toCurrency]
    ) {
      const fromRate = this.exchangeRates[fromCurrency];
      const toRate = this.exchangeRates[toCurrency];
      this.convertedAmount = (amount / fromRate) * toRate;
      this.conversionRateText = `1 ${fromCurrency} = ${(
        toRate / fromRate
      ).toFixed(4)} ${toCurrency}`;
    } else {
      this.convertedAmount = null;
    }
  }

  private fetchExchangeRates(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.conversion_rates));
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.currentPage = 2;
    }
  }

  goBackToHome() {
    this.currentPage = 1;
  }

  addToFavourite() {
    // Implement your logic to add to favourite
  }

  confirmTransfer() {
    this.transferSuccessful = true;
    this.currentPage = 3;
  }

  getMaskedAccount(account: string | null): string {
    if (!account || account.length < 8) return 'xxxxxxxx';
    return 'xxxx' + account.substring(4);
  }

  openNewWindow() {
    const width = 600;
    const height = 300;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const newWindow = window.open(
      'https://example.com',
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (newWindow) {
      newWindow.focus();
    } else {
      alert('Failed to open new window');
    }
  }
  currentPage: number = 1;
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
