export class SendMessageRequest {
  constructor(
    public name: string,
    public email: string,
    public message: string
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string,
  ) {}
}
