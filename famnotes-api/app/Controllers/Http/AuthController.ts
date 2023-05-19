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

    const data = await request.validate({
      schema: userSchema,
      data: request.only(['email', 'password']),
    })

    // Remember me token funtionality here or in auth middleware...
    // data['remember_me_token'] = Math.random().toString()

    const user = await User.create(data)
    const authUser = await auth.login(user)

    const result: User = {
      ...authUser.toJSON(),
      remember_me_token: authUser?.rememberMeToken,
    }
    return response.json(result)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    const data = await request.validate({
      schema: userSchema,
      data: request.only(['email', 'password']),
    })

    const authUser = await auth.attempt(data.email, data.password)

    const result: User = {
      ...authUser.toJSON(),
      remember_me_token: authUser?.rememberMeToken,
    }

    return response.json(result)
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.ok('Logged out.')
  }
}
