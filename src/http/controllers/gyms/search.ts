import { makeSearchGyms } from '@/services/factories/make-search-gyms'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGyms = makeSearchGyms()
  const { gyms } = await searchGyms.execute({ query, page })

  return reply.status(201).send({
    gyms,
  })
}
