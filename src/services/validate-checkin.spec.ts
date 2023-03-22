import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxTimeCheckinValidation } from './errors/max-time-checkin-validation'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckinUser } from './validate-checkin'

let checkInsRepository: InMemoryCheckinRepository
let sut: ValidateCheckinUser

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinRepository()
    sut = new ValidateCheckinUser(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckin = await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const { checkin } = await sut.execute({ checkinId: createdCheckin.id })

    expect(checkin.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkinId: 'inexistent id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckin = await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const twentyOneMinInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinInMs)

    await expect(() =>
      sut.execute({ checkinId: createdCheckin.id }),
    ).rejects.toBeInstanceOf(MaxTimeCheckinValidation)
  })
})
