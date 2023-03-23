import { makeFetchUserCheckInHistory } from '@/services/factories/make-fecth-user-check-ins-history'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryBodySchema.parse(request.query)

  const historyCheckin = makeFetchUserCheckInHistory()
  const { checkIns } = await historyCheckin.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })
}
