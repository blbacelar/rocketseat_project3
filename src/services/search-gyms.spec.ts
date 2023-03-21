import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGym } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGym

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGym(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    await gymsRepository.create({
      title: 'JS Gyms',
      description: '',
      latitude: 37.097306,
      longitude: -8.1885847,
      phone: '',
    })

    await gymsRepository.create({
      title: 'Delphi',
      description: '',
      latitude: 37.097306,
      longitude: -8.1885847,
      phone: '',
    })

    const { gyms } = await sut.execute({ query: 'JS Gyms', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gyms' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gyms ${i}`,
        description: '',
        latitude: 37.097306,
        longitude: -8.1885847,
        phone: '',
      })
    }

    const { gyms } = await sut.execute({ query: 'JS Gyms', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gyms 21' }),
      expect.objectContaining({ title: 'JS Gyms 22' }),
    ])
  })
})
