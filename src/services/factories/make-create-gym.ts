import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGym } from '../create-gym'

export function makeCreateGym() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CreateGym(gymRepository)

  return useCase
}
