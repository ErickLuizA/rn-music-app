import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { name: 'Bad Request', message: error.message }
})

export const badRequests = (error: Error[]): HttpResponse => ({
  statusCode: 400,
  body: { name: 'Bad Request', errors: error.map(err => err.message) }
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: { name: 'Forbidden', message: error.message }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { name: 'Server Error', message: error.message }

})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
