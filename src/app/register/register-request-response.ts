export class RegisterRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public inviteLink: boolean,
    public code: string
  ) { }

}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) { }
}
