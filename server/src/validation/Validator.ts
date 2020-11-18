import { Validation } from '../presentation/protocols/validation'
import validator from 'validator'

export class Validator implements Validation {
  validate (input: { name: string, email: string, password: string}): Error[] {
    const errors: Error[] = []

    if (validator.isEmpty(input.name)) {
      const error = Error('Invalid name')
      errors.push(error)
    }

    if (!validator.isEmail(input.email)) {
      const error = Error('Invalid email address')
      errors.push(error)
    }

    if (validator.isEmpty(input.password)) {
      const error = Error('Invalid password')
      errors.push(error)
    }

    return errors
  }
}
