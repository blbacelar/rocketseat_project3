import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinUser } from '../check-in'

export function makeCheckin() {
  const checkinRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckinUser(checkinRepository, gymRepository)

  return useCase
}
