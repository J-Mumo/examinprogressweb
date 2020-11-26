import { Component, OnInit } from '@angular/core';
import { PaymentInitialData } from './tokens-request-response';
import { TokensService } from './tokens.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens: number;
  tokensToBuy: number;
  columns: string[] = ['tokens', 'pricePerToken', 'total'];
  tokensData: MatTableDataSource<any>;
  total = 0;
  paymentInitialData: PaymentInitialData;
  paymentData: InlinePaymentOptions = {
    public_key: '',
    tx_ref: '',
    amount: this.total,
    currency: '',
    payment_options: 'card,mpesa',
    redirect_url: '',
    meta: '',
    customer: null,
    customizations: this.customizations(),
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  };

  constructor(
    private tokensService: TokensService,
    private flutterwave: Flutterwave
  ) { }

  ngOnInit(): void {
    this.tokensService.getInitialData().subscribe(
      (tokens: number) => {
        this.tokens = tokens;
      }
    );
    this.getPaymentInitialData();
  }

  getPaymentInitialData() {
    this.tokensService.getPaymentInitialData().subscribe(
      (paymentInitialData: PaymentInitialData) => {
        this.paymentInitialData = paymentInitialData;
        this.paymentData.public_key = paymentInitialData.publicKey;
        this.paymentData.currency = paymentInitialData.currency;
        this.paymentData.tx_ref = this.generateTxRef();
        const customer = {
          name: paymentInitialData.firstName + ' ' + paymentInitialData.lastName,
          email: paymentInitialData.email
        };
        this.paymentData.customer = customer;
      }
    );
  }

  generateTxRef() {
    return this.paymentInitialData.userId + '-' + parseInt(Math.random().toString().substr(2), 16) + new Date().getTime();
  }

  customizations() {
    const customizations = {
      title: 'Exam In Progress',
      description: 'Exam In Progress',
      logo: ''
    };
    return customizations;
  }

  makePayment(){
    this.paymentData.amount = this.total;
    this.flutterwave.inlinePay(this.paymentData);
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    if (response.status === 'successful') {
      
    }
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  calculateTokenPrice() {
    this.total = this.tokensToBuy * 100;
  }

  next() {
    this.total = this.tokensToBuy * 100;
    this.tokensData = new MatTableDataSource([{tokens: this.tokens, pricePerToken: 100, total: this.total}]);
  }

  showGetTokens() {
    document.getElementById('getTokens').hidden = false;
  }
}
