export class CreateSectionRequest {
  constructor(
    public examId: number,
    public name: string,
    public description: string
  ) {}
}

export class SaveResponseWithId {
  constructor(
    public saved: boolean,
    public error: string,
    public id: number,
  ) {}
}
