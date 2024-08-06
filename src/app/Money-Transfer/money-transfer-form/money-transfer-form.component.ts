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
import { DialogService } from '@ngneat/dialog';
import { FavoriteListComponent } from '../components/favorite-list/favorite-list.component';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { ActivatedRoute } from '@angular/router';
import { ShareInputService } from '../../services/share-input/share-input.service';

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
  transferForm!: FormGroup;
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
      currency_code: 'EGP',
      currency_name: 'Egypt',
      exchange_rate: 50,
      flag_url: 'assets/egypt.svg',
    },
  ];
  fromAccount = 'xxxx7890';
  constructor(
    private fb: FormBuilder,
    private transfer: MoneyTransferService,
    private dialog: DialogService,
    private fav: FavoriteService,
    private share: ShareInputService
  ) {}

  ngOnInit() {
    this.transferForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      recipientName: ['', Validators.required],
      recipientAccount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      senderName: ['Jonathon Smith', Validators.required],
    });
    // this.transfer.getCurrencies().subscribe((data) => {
    //   this.currencies = data;
    //   this.selectedCurrency.codeFrom = this.currencies[0].currency_code;
    //   this.selectedCurrency.codeTo = this.currencies[0].currency_code;
    //   this.selectedCurrency.rateFrom = this.currencies[0].exchange_rate;
    //   this.selectedCurrency.rateTo = this.currencies[0].exchange_rate;
    //   this.selectedCurrency.flagFrom = this.currencies[0].flag_url;
    //   this.selectedCurrency.flagTo = this.currencies[0].flag_url;
    // });
    this.selectedCurrency = this.share.getCurrency();
    this.transferForm.get('amount')?.setValue(this.share.getFrom());
    this.convertedAmount = this.share.getTo();
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
          currency_code: this.selectedCurrency.codeTo,
          exchange_rate: this.selectedCurrency.rateTo,
        },
        recipient: {
          recipient_name: this.transferForm.value.recipientName,
          recipient_account_number: this.transferForm.value.recipientAccount,
        },
      };

      this.transfer.sendTransferDetails(transferDetails).subscribe(
        (response) => {
          console.log('Transfer successful', response);
          this.goToPage(3);
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  opneFavorite() {
    const dialogRef = this.dialog.open(FavoriteListComponent);
    dialogRef.afterClosed$.subscribe((result) => {
      if (result) {
        this.transferForm.get('recipientName')?.setValue(result.recipientName);
        this.transferForm
          .get('recipientAccount')
          ?.setValue(result.recipientAccountId);
      }
    });
  }

  addFavorite() {
    let obj = {
      recipientName: this.transferForm.value.recipientName,
      recipientAccountId: this.transferForm.value.recipientAccount,
    };
    this.fav.addFavorite(obj).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
