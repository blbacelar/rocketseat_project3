import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGym } from '../search-gyms'

export function makeGetUserMetrics() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new SearchGym(gymRepository)

  return useCase
}
