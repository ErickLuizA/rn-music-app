import express, { urlencoded, json, Request, Response, NextFunction } from 'express'
import { CustomError } from './errors/CustomError'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  console.log(`The error is ${error.message}`)

  return response.status(500).json({ message: 'Internal Server Error' })
})

export default app
