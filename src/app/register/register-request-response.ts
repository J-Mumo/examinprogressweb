export class RegisterRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) { }

}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) { }
}
