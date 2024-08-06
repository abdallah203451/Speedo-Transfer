import { Injectable, input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareInputService {
  private inputFrom: number = 1;
  private inputTo: number = 1;
  private selectedCurrency = {
    codeFrom: 'USD',
    rateFrom: 1,
    codeTo: 'USD',
    rateTo: 50,
    flagFrom: 'assets/united states.svg',
    flagTo: 'assets/united states.svg',
  };
  set(from: number, to: number, obj: any) {
    this.inputFrom = from;
    this.inputTo = to;
    this.selectedCurrency = obj;
  }
  getFrom(): number {
    return this.inputFrom;
  }
  getTo(): number {
    return this.inputTo;
  }
  getCurrency() {
    return this.selectedCurrency;
  }
}
