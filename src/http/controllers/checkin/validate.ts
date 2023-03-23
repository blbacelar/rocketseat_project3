import { makeValidateCheckin } from '@/services/factories/make-validate-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinsParams = z.object({
    checkinId: z.string().uuid(),
  })

  const { checkinId } = validateCheckinsParams.parse(request.params)

  const validateCheckin = makeValidateCheckin()
  const { checkin } = await validateCheckin.execute({
    checkinId,
  })

  return reply.status(201).send({
    checkin,
  })
}
