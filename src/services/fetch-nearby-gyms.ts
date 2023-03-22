import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearByGymRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymResponse {
  gyms: Gym[]
}

export class FetchNearByGym {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymRequest): Promise<FetchNearByGymResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
