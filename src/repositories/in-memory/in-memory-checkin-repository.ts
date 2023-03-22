import { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckinRepository } from '../checkin-repository'

export class InMemoryCheckinRepository implements CheckinRepository {
  public items: Checkin[] = []

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkin)

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const isThereaCheckin = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at)
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return item.user_id === userId && isOnSameDay
    })

    if (!isThereaCheckin) {
      return null
    }

    return isThereaCheckin
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async findById(id: string) {
    const checkin = this.items.find((item) => item.id === id)

    if (!checkin) {
      return null
    }
    return checkin
  }

  async save(checkin: Checkin) {
    const checkinIndex = this.items.findIndex((item) => (item.id = checkin.id))

    if (checkinIndex >= 0) {
      this.items[checkinIndex] = checkin
    }

    return checkin
  }
}
