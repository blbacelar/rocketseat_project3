import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInHistory() {
  const checkinRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkinRepository)

  return useCase
}
