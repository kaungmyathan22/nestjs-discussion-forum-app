import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/features/email/email.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        // Handle duplicate key violation error here
        throw new HttpException(
          'User with this email already exists.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw error; // Re-throw other errors
      }
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneOrFail(where: FindOptionsWhere<UserEntity>) {
    const user = await this.userRepository.findOne({ where });
    if (!user) {
      throw new HttpException(`User not found.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `The user with given id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(
      { id },
      {
        ...updateUserDto,
      },
    );
    if (result.affected) {
      return this.findOne(id);
    }
    throw new HttpException(
      `The user with given id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
    return {
      success: true,
    };
  }

  async authenticate(payload: AuthenticateDTO) {
    const user = await this.findByEmail(payload.email);
    const isPasswordMatch = await user.isPasswordMatch(payload.password);
    if (user && isPasswordMatch) {
      return user;
    }
    throw new HttpException(
      'Invalid email / password.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async deleteUser(user: UserEntity) {
    const user_to_delete = await this.findOne(user.id);
    return await this.userRepository.delete(user_to_delete.id);
  }

  async updatePassword(newPassword: string, user: UserEntity) {
    user.password = newPassword;
    return this.userRepository.save(user);
  }

  async setUserVerified(user: UserEntity) {
    return await this.userRepository.update(user.id, { verified: true });
  }
}
