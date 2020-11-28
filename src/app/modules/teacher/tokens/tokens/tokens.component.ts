import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentInitialData, UpdateTokenResponse, PaymentRequest } from './tokens-request-response';
import { TokensService } from './tokens.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens: number;
  tokensToBuy: number;
  columns: string[] = ['tokens', 'pricePerToken', 'total'];
  message: string;
  tokensData: MatTableDataSource<any>;
  total = 0;
  paymentInitialData: PaymentInitialData;
  paymentData: InlinePaymentOptions = {
    public_key: '',
    tx_ref: '',
    amount: this.total,
    currency: '',
    payment_options: 'card,mpesa',
    redirect_url: '/teacher/tokens',
    meta: '',
    customer: null,
    customizations: this.customizations(),
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  };

  constructor(
    private tokensService: TokensService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
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

  makePayment(stepper: MatStepper){
    if (this.total > 0) {
      this.paymentData.amount = this.total;
      this.flutterwave.inlinePay(this.paymentData);
      document.getElementById('tokensToBuyInTable-error').hidden = true;
    } else if (document.getElementById('tokensToBuyInTable-error') === null) {
      stepper.previous();
    } else {
      document.getElementById('tokensToBuyInTable-error').hidden = false;
    }
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    if (response.status === 'successful') {
      const request: PaymentRequest = new PaymentRequest(this.tokensToBuy, response);
      this.tokensService.updateTokens(request).subscribe(
        (res: UpdateTokenResponse) => {
          if (res.updated) {
            this.tokens = res.tokens;
            this.message = 'You have successfuly paid for ' + this.tokensToBuy + ' tokens.';
            this.tokenSnackBar(this.message);
            this.ref.detectChanges();
          } else {
            this.message = 'Your payment was not successful. Please contact support for help.';
            this.tokenSnackBar(this.message);
            console.log('Updating tokens in db failed. UserId: ', this.paymentInitialData.userId,
            'Amount of tokens bought: ', this.tokensToBuy, 'Time: ', Date.now());
          }
        }
      );
    }
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  calculateTokenPrice() {
    this.total = this.tokensToBuy * 100;
  }

  tokenSnackBar(message) {
    this.snackBar.open( message, '', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

  onSubmit(form: NgForm, stepper: MatStepper) {
    if (!form.valid) {
      if (this.tokensToBuy === undefined || this.tokensToBuy === null ) {
        document.getElementById('tokensToBuy-error').hidden = false;
      } else { document.getElementById('tokensToBuy-error').hidden = true; }

    } else if (this.tokensToBuy < 1) {
      document.getElementById('tokensToBuy-error').hidden = false;
    } else {
      document.getElementById('tokensToBuy-error').hidden = true;
      stepper.next();
      this.total = this.tokensToBuy * 100;
      this.tokensData = new MatTableDataSource([{tokens: this.tokens, pricePerToken: 100, total: this.total}]);
    }
  }

  showGetTokens() {
    document.getElementById('getTokens').hidden = false;
  }
}
