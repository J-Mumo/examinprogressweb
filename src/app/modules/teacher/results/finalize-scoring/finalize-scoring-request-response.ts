export class FinalizeScoringRequestInitialData {
  constructor(
    public studentId: number,
    public examId: number
  ) {}
}

export class FinalizeScore {
  constructor(
    public questionId: number,
    public question: string,
    public questionMaxPoints: number,
    public studentAnswer: string
  ) {}
}

export class FinalizeScoringInitialData {
  constructor(
    public studentName: string,
    public scoringComplete: boolean,
    public finalizeScore: FinalizeScore
  ) {}
}

export class FinalizeScoringRequest {
  constructor(
    public questionId: number,
    public studentId: number,
    public pointsEarned: number
  ) {}
}

export class SaveResponse {
  constructor(
    public saved: boolean,
    public error: null
  ) {}
}
