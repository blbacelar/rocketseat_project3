import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckinUser } from '../validate-checkin'

export function makeValidateCheckin() {
  const checkinRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckinUser(checkinRepository)

  return useCase
}
