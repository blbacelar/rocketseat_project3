// eslint-disable-next-line prettier/prettier
import { CheckinRepository } from '@/repositories/checkin-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Checkin } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-numbers-checkins-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckinUserRequest {
  userId: string
  gymId: string
  userLatitude: Decimal
  userLongitude: Decimal
}

interface CheckinUserResponse {
  checkin: Checkin
}

export class CheckinUser {
  constructor(
    private checkinRepository: CheckinRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUserRequest): Promise<CheckinUserResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude.toNumber(),
        longitude: userLongitude.toNumber(),
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkinOnSameDate = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkinOnSameDate) {
      throw new MaxNumberOfCheckinsError()
    }

    const checkin = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkin,
    }
  }
}
