export class ExamDetailRequest {
  constructor(
    public inviteCode: boolean,
    public code: string
  ) {}
}

export class ExamDetailInitialData {
  constructor(
    public examExists: boolean,
    public studentRegistered: boolean,
    public examHasStarted: boolean,
    public examHasEnded: boolean,
    public examTokenId: number,
    public examName: string,
    public examDescription: string,
    public startDate: Date,
    public endDate: Date,
    public startTime: string,
    public examTotalTime: number,
    public pausable: boolean,
    public timedPerExam: boolean,
    public timedPerSection: boolean,
    public timedPerQuestion: boolean,
    public email: string
  ) {}
}
