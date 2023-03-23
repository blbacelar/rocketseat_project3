import { makeGetUserMetrics } from '@/services/factories/make-get-user-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userMetrics = makeGetUserMetrics()
  const { checkInsCount } = await userMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
