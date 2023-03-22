import { Checkin, Prisma } from '@prisma/client'

export interface CheckinRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findById(id: string): Promise<Checkin | null> // used Unchecked becuase just wanna check a user that already exists.
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  countByUserId(userId: string): Promise<number>
  save(checkin: Checkin): Promise<Checkin>
}
