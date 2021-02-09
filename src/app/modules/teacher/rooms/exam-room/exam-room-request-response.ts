export class RtcTokenResponse {
  constructor(
    public token: string,
    public uid: number
  ) {}
}

export class RtcTokenRequest {
  constructor(
    public channelName: string, 
    public student: boolean, 
    public examTokenId: number
  ) {}
}
