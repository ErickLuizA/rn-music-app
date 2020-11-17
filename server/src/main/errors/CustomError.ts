export class CustomError {
  constructor (public message: string, public statusCode = 400) {}
}
