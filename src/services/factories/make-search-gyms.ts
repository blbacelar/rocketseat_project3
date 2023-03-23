import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGym } from '../search-gyms'

export function makeSearchGyms() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new SearchGym(gymRepository)

  return useCase
}
