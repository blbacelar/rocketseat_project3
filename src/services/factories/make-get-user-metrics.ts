import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetrics } from '../get-user-metrics'

export function makeGetUserMetrics() {
  const checkinRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetrics(checkinRepository)

  return useCase
}
