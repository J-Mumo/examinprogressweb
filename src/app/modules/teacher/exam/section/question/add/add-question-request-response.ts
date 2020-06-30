export class AddMultipleChoiceQuestionAnswerRequest {
  constructor(
    public answerText: string,
    public correct: boolean
  ) {}
}

export class AddQuestionRequest {
  constructor(
    public sectionId: number,
    public questionType: string,
    public questionText: string,
    public score: number,
    public answerType: string,
    public addMultipleChoiceQuestionAnswerRequests: AddMultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) {}
}
