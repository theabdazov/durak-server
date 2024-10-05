import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: string, fullName: string): Promise<UserEntity> {
    console.log(userId, fullName);
    const user = new UserEntity();
    user.id = userId;
    user.fullName = fullName;
    return await this.userRepository.save(user);
  }
}
