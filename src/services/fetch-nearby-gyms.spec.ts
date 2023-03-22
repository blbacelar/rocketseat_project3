import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearByGym } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGym

describe('Search Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGym(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gyms',
      description: '',
      latitude: 37.097306,
      longitude: -8.1885847,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      latitude: 37.0208619,
      longitude: -7.9274137,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Further Gym',
      description: '',
      latitude: 37.097306,
      longitude: -8.1885847,
      phone: '',
    })

    const { gyms } = await sut.execute({
      userLatitude: 37.097306,
      userLongitude: -8.1885847,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gyms' }),
      expect.objectContaining({ title: 'Further Gym' }),
    ])
  })
})
