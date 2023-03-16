// eslint-disable-next-line prettier/prettier
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
