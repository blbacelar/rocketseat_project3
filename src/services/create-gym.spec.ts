import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGym } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGym

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGym(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gyms',
      description: '',
      latitude: 37.097306,
      longitude: -8.1885847,
      phone: '',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
