import { NextFunction, Request, Response } from 'express'
import { CreateUserUseCaseImpl } from '../../../data/useCases/User/CreateUserUseCaseImpl'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCaseImpl
  ) {}

  async handle (request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { name, avatar, email, password } = request.body

    try {
      const user = await this.createUserUseCase.execute({ name, avatar, email, password })

      return response.status(2001).json(user)
    } catch (error) {
      next(error)
    }
  }
}
