import { Checkin, Prisma } from '@prisma/client'

export interface CheckinRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> // used Unchecked becuase just wanna check a user that already exists.
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
}
