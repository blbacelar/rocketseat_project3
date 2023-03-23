import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // Create User
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: '123456',
  })

  // Auth User
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
