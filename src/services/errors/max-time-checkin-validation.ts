export class MaxTimeCheckinValidation extends Error {
  constructor() {
    super('Checkin can not be validated. It has been more than 20 minutes')
  }
}
