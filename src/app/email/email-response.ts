export class EmailActivationResponse {

  public constructor(public emailActivation: boolean, public error: string) {

  }
}

export class EmailSentResponse {

  public constructor(public emailSent: boolean, public error: string) {

  }
}

export class EmailActivationRequest {

  public constructor(public emailValidationCode: string, public localeStr: string) {

  }
}


export class ResendEmailActivationRequest {

  public constructor(public email: string, public localeStr: string) {

  }
}


