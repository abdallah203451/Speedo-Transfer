import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-money-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './money-input.component.html',
  styleUrl: './money-input.component.scss',
})
export class MoneyInputComponent {
  transferForm!: FormGroup;
  convertedAmount: number | null = null;
  currencyOptions: string[] = [];
  exchangeRates: any = {};
  conversionRateText: string | null = null;

  private apiUrl =
    'https://v6.exchangerate-api.com/v6/44d7f7e9b0c7df5700709f65/latest/USD';
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
}
