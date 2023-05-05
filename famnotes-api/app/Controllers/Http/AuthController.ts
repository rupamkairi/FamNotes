import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response, auth, session }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: false }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    let data = await request.validate({ schema: userSchema, data: request.all() })
    let user = await User.create(data)
    user = await auth.login(user)

    return response.json(user)
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    console.log(request.body())
    const { email, password } = request.only(['email', 'password'])

    let user: any = null
    try {
      user = await auth.attempt(email, password)
    } catch (error) {
      return error
    }

    console.log(user)
    return response.json(user)
  }
}
