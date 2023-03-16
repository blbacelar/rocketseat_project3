import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUser } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const { user } = await registerUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const { user } = await registerUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordCorrect = await compare('123456', user.password_hash)

    expect(isPasswordCorrect).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const email = 'johndoe@email.com'

    await registerUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUser.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
