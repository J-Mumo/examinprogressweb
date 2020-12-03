export class PaymentInitialData {
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public currency: string,
    public publicKey: string,
    public paymentEndPoint: string,
    public production: boolean
    ) { }
}

export class PaymentRequest {
  constructor(
    public tokens: number,
    public paymentSuccessResponse: any
  ) {}
}

export class UpdateTokenResponse {
  constructor(
    public updated: boolean,
    public error: string,
    public tokens: number
  ) {}
}

export class PaymentHistoryInitialData {
  constructor(
    public paymentHistoryTransfers: PaymentHistoryTransfer[]
  ) {}
}

export class PaymentHistoryTransfer {
  constructor(
    public id: number,
    public amountPaid: number,
    public tokensBought: number,
    public currency: string
  ) {}
}

export class TokenConsumptionInitialData {
  constructor(
    public tokenConsumedTransfers: TokenConsumedTransfer[]
  ) {}
}

export class TokenConsumedTransfer {
  constructor(
    public id: number,
    public email: string,
    public examName: string,
    public studentName: string
  ) {}
}
