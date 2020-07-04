export class AddQuestionInitialData {
  constructor(
    public examTimedByQuestion: boolean
  ) {}
}

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
    public duration: string,
    public answerType: string,
    public addMultipleChoiceQuestionAnswerRequests: AddMultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class QuestionRequest {
  constructor(
    public questionText: string,
    public score: number,
    public answerType: string,
    public addMultipleChoiceQuestionAnswerRequests: AddMultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class AddComprehensionQuestionRequest {
  constructor(
    public sectionId: number,
    public comprehensionQuestionId: number,
    public comprehension: string,
    public duration: string,
    public questionRequest: QuestionRequest
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: string
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number
  ) {}
}
