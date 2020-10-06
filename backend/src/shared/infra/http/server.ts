import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import { createConnections } from 'typeorm'
import 'express-async-errors'

import AppError from '@shared/errors/AppError'
import routes from './routes'

import '@shared/container/index'

createConnections()

const app = express()

app.use(express.json())
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333')
})
