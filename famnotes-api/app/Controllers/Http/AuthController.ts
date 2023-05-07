import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: false }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    let data = await request.validate({
      schema: userSchema,
      data: request.only(['email', 'password']),
    })
    let user = await User.create(data)
    user = await auth.login(user)

    return response.json(user)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    let data = await request.validate({
      schema: userSchema,
      data: request.only(['email', 'password']),
    })

    let user = await auth.attempt(data.email, data.password)

    return response.json(user)
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.ok('Logged out.')
  }
}
