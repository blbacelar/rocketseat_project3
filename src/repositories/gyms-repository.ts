import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyGyms {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyGyms): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
