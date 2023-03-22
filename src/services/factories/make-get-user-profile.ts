import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfile } from '../get-user-profile'

export function makeGetUserMetrics() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfile(userRepository)

  return useCase
}
