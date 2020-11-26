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

export class PaymentApiResponse {
  public constructor(
      public status: string,
      public txid: string,
      public orderRef: string,
      public txref: string,
      public flwref: string,
      public deviceFingerprint: string,
      public ip: string,
      public cycle: string,
      public amount: number,
      public currency: string,
      public appfee: number,
      public chargedAmount: number,
      public merchantFee: number,
      public merchantBearsFee: number,
      public vbvrespcode: string,
      public vbvrespmessage: string,
      public paymentType: string,
      public paymentId: string,
      public fraudStatus: string,
      public chargeType: string,
      public customerId: string,
      public customerPhone: string,
      public customerEmail: string,
      public accountId: string
  ) { }
}

