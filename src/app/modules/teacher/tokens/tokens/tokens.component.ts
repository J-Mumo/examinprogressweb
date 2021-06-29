import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { 
  PaymentInitialData, UpdateTokenResponse, PaymentRequest, PaymentHistoryInitialData, 
  TokenConsumptionInitialData, PaymentHistoryTransfer, TokenConsumedTransfer 
} from './tokens-request-response';
import { TokensService } from './tokens.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

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
  stepper: MatStepper;
  tokensData: MatTableDataSource<any>;
  paymentHistory: MatTableDataSource<PaymentHistoryTransfer>;
  paymentHistoryColumns: string[] = ['amountPaid', 'tokensBought', 'currency'];
  total = 0;
  paymentInitialData: PaymentInitialData;
  tokenConsumption: MatTableDataSource<TokenConsumedTransfer>;
  tokenConsumptionColumns: string[] = ['email', 'examName', 'studentName'];
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
    private activatedRoute: ActivatedRoute,
    private tokensService: TokensService,
    private snackBar: MatSnackBar,
    private router: Router,
    private flutterwave: Flutterwave,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.tokensService.getInitialData().subscribe(
      (tokens: number) => {
        this.tokens = tokens;
      }
    );
    this.getInitialData();
  }

  getInitialData() {
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

    this.tokensService.getPaymentHistoryInitialData().subscribe(
      (paymentHistory: PaymentHistoryInitialData) => {
        this.paymentHistory = new MatTableDataSource(paymentHistory.paymentHistoryTransfers);
      }
    );

    this.tokensService.getTokenonsumptionInitialData().subscribe(
      (tokenConsumption: TokenConsumptionInitialData) => {
        this.tokenConsumption = new MatTableDataSource(tokenConsumption.tokenConsumedTransfers);
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
    this.stepper = stepper;
    if (this.total > 0) {
      document.getElementById('tokensToBuyInTable-error').hidden = true;
      this.paymentData.amount = this.total;
      this.flutterwave.inlinePay(this.paymentData);
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
            this.flutterwave.closePaymentModal(3);
            this.getInitialData();
            this.ref.detectChanges();
            this.stepper.previous();
            document.getElementById('getTokens').hidden = true;
            this.message = 'You have successfuly paid for ' + this.tokensToBuy + ' token(s).';
            this.tokenSnackBar(this.message);
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
    document.getElementById('paymentHistory').hidden = true;
    document.getElementById('tokenConsumption').hidden = true;
  }

  showPaymentHistory() {
    document.getElementById('getTokens').hidden = true;
    document.getElementById('paymentHistory').hidden = false;
    document.getElementById('tokenConsumption').hidden = true;
  }

  showTokenConsumption() {
    document.getElementById('getTokens').hidden = true;
    document.getElementById('paymentHistory').hidden = true;
    document.getElementById('tokenConsumption').hidden = false;
  }

  navigateBack(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
