import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export class SearchGym {
  constructor(private gymRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
