export class AddMultipleChoiceQuestionAnswerRequest {
  constructor(
    public answerText: string,
    public correct: boolean
  ) {}
}

export class AddQuestionRequest {
  constructor(
    public sectionId: number,
    public questionText: string,
    public score: number,
    public addMultipleChoiceQuestionAnswerRequests: AddMultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) {}
}
