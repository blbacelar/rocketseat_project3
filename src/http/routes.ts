import { register } from '@/http/controllers/register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
