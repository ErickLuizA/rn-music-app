import express, { urlencoded, json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from '../routes'

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser())

app.use(routes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.json({ error: error.message })
})

export default app
