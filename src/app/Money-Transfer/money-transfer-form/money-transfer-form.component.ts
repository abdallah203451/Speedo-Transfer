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
import { MoneyTransferService } from '../../services/money-transfer/money-transfer.service';
import { currency } from '../../models/currency';

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
  currentPage: number = 1;
  transferForm: FormGroup;
  dropdownOpenFrom = false;
  dropdownOpenTo = false;
  convertedAmount?: number;
  selectedCurrency = {
    codeFrom: 'USD',
    rateFrom: 1,
    codeTo: 'USD',
    rateTo: 50,
    flagFrom: 'assets/united states.svg',
    flagTo: 'assets/united states.svg',
  };
  currencies: currency[] = [
    {
      currency_code: 'USD',
      currency_name: 'United States Dollar',
      exchange_rate: 1.0,
      flag_url: 'assets/united states.svg',
    },
    {
      currency_code: 'aaa',
      currency_name: 'United States Dollar',
      exchange_rate: 50,
      flag_url: 'assets/united states.svg',
    },
  ];
  fromAccount = 'xxxx7890';
  constructor(private fb: FormBuilder, private transfer: MoneyTransferService) {
    this.transferForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      recipientName: ['', Validators.required],
      recipientAccount: [
        '',
        [Validators.required, Validators.pattern('^[1-9]{8}$')],
      ],
      senderName: ['Jonathon Smith', Validators.required],
    });
  }

  ngOnInit() {
    this.transfer.getCurrencies().subscribe((data) => {
      this.currencies = data;
      this.selectedCurrency.codeFrom = this.currencies[0].currency_code;
      this.selectedCurrency.codeTo = this.currencies[0].currency_code;
      this.selectedCurrency.rateFrom = this.currencies[0].exchange_rate;
      this.selectedCurrency.rateTo = this.currencies[0].exchange_rate;
      this.selectedCurrency.flagFrom = this.currencies[0].flag_url;
      this.selectedCurrency.flagTo = this.currencies[0].flag_url;
    });
  }

  toggleDropdownFrom() {
    this.dropdownOpenFrom = !this.dropdownOpenFrom;
  }
  toggleDropdownTo() {
    this.dropdownOpenTo = !this.dropdownOpenTo;
  }

  convertAmount() {
    this.convertedAmount =
      (this.transferForm.value.amount / this.selectedCurrency.rateFrom) *
      this.selectedCurrency.rateTo;
  }
  selectCurrencyFrom(currency: currency) {
    this.selectedCurrency.codeFrom = currency.currency_code;
    this.selectedCurrency.rateFrom = currency.exchange_rate;
    this.selectedCurrency.flagFrom = currency.flag_url;
    this.convertAmount();
  }
  selectCurrencyTo(currency: currency) {
    this.selectedCurrency.codeTo = currency.currency_code;
    this.selectedCurrency.rateTo = currency.exchange_rate;
    this.selectedCurrency.flagTo = currency.flag_url;
    this.convertAmount();
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.currentPage = 2;
    }
  }
  confirmTransfer() {
    this.currentPage = 3;
  }
  goBackToHome() {
    this.currentPage = 1;
  }
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getMaskedAccount(account: string | null): string {
    if (!account || account.length < 8) return 'xxxxxxxx';
    return 'xxxx' + account.substring(4);
  }
  onConfirm() {
    if (this.transferForm.valid) {
      const transferDetails = {
        transfer_from: {
          amount: this.transferForm.value.amount,
          currency_code: this.selectedCurrency.codeFrom,
          exchange_rate: this.selectedCurrency.rateFrom,
        },
        transfer_to: {
          amount: this.convertedAmount,
          currency_code: this.selectedCurrency.codeTo, // Update this to the actual recipient currency
          exchange_rate: this.selectedCurrency.rateTo, // Update this to the actual exchange rate
        },
        recipient: {
          recipient_name: this.transferForm.value.recipientName,
          recipient_account_number: this.transferForm.value.recipientAccount,
        },
      };

      this.transfer.sendTransferDetails(transferDetails).subscribe(
        (response) => {
          console.log('Transfer successful', response);
          this.confirmTransfer();
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
