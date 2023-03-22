// eslint-disable-next-line prettier/prettier
import { CheckinRepository } from '@/repositories/checkin-repository'
import { Checkin } from '@prisma/client'
import dayjs from 'dayjs'
import { MaxTimeCheckinValidation } from './errors/max-time-checkin-validation'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckinUserRequest {
  checkinId: string
}

interface ValidateCheckinUserResponse {
  checkin: Checkin
}

export class ValidateCheckinUser {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckinUserRequest): Promise<ValidateCheckinUserResponse> {
    const checkin = await this.checkinRepository.findById(checkinId)

    if (!checkin) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkin.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new MaxTimeCheckinValidation()
    }

    checkin.validated_at = new Date()

    await this.checkinRepository.save(checkin)

    return {
      checkin,
    }
  }
}
