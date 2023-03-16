import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUser } from '../authenticate'

export function makeAuthenticateUser() {
  const prismaUserRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUser(prismaUserRepository)

  return authenticateUser
}
