import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearByGym } from '../fetch-nearby-gyms'

export function makeFetchNearByGyms() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGym(gymRepository)

  return useCase
}
