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
  constructor (
    public updated: boolean,
    public error: string,
    public tokens: number
  ) {}
}
