export class InvalidGrantException {

  public constructor(
      public error: string,
      public errorDescription: string) {
  }
}

export class ErrorDetails {

  public constructor(
      public errorId: string,
      public message: string,
      public timestamp: string) {

  }
}
export class OrganisationDetails {
  public constructor(
  public infoEmail: string) {
  }
}

export class ErrorInitialData {

  public constructor(
      public organisationDetails: OrganisationDetails) {
  }
}

