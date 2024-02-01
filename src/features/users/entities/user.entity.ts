import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Question } from 'src/features/questions/entities/question.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  @Exclude()
  verified: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Question, (question) => question.author) // One user to many questions
  questions: Question[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async isPasswordMatch(plainText: string) {
    try {
      return bcrypt.compare(plainText, this.password);
    } catch (error) {
      return false;
    }
  }
}
