export class QuestionTypeTransfer {
  constructor(
    public questionTypeId: number,
    public name: string
  ) {}
}

export class AnswerTypeTransfer {
  constructor(
    public answerTypeId: number,
    public name: string
  ) {}
}

export class AddQuestionInitialData {
  constructor(
    public examTimedByQuestion: boolean,
    public questionTypeTransfers: QuestionTypeTransfer[],
    public answerTypeTransfers: AnswerTypeTransfer[]
  ) {}
}

export class MultipleChoiceQuestionAnswerRequest {
  constructor(
    public answerId: number,
    public answerText: string,
    public correct: boolean
  ) {}
}

export class AddQuestionRequest {
  constructor(
    public sectionId: number,
    public answerTypeId: number,
    public questionText: string,
    public score: number,
    public duration: string,
    public multipleChoiceQuestionAnswerRequests: MultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class QuestionRequest {
  constructor(
    public questionText: string,
    public score: number,
    public multipleChoiceQuestionAnswerRequests: MultipleChoiceQuestionAnswerRequest[]
  ) {}
}

export class AddComprehensionQuestionRequest {
  constructor(
    public sectionId: number,
    public comprehensionQuestionId: number,
    public answerTypeId: number,
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

export enum AnswerTypeEnum {
  multipleChoiceSingleAnswerId = 1,
  multipleChoiceMultipleAnswersId,
  textAnswerId,
  imageAnswerId
}