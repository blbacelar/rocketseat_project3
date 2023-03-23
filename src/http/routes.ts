import { profile } from '@/http/controllers/profile'
import { register } from '@/http/controllers/register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
