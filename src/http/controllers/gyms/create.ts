import { makeCreateGym } from '@/services/factories/make-create-gym'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body)

  const createGym = makeCreateGym()
  await createGym.execute({ title, description, phone, latitude, longitude })

  return reply.status(201).send()
}
