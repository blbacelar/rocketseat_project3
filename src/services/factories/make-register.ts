import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUser } from '../register'

export function makeRegisterUser() {
  const prismaUserRepository = new PrismaUsersRepository()
  const registerUser = new RegisterUser(prismaUserRepository)

  return registerUser
}
