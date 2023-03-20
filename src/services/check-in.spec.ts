import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUser } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-numbers-checkins-error'

let checkInsRepository: InMemoryCheckinRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUser

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUser(checkInsRepository, gymsRepository)

    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JS Gyms',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: new Decimal(0),
        userLongitude: new Decimal(0),
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    })

    vi.setSystemTime(new Date(2023, 0, 2, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    })
    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should be able to check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS Gyms',
      description: '',
      latitude: new Decimal(37.097306),
      longitude: new Decimal(-8.1885847),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: new Decimal(37.08464),
        userLongitude: new Decimal(-8.2541164),
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
