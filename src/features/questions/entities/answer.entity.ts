import { QuestionEntity } from 'src/features/questions/entities/question.entity';
import { UserEntity } from 'src/features/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @ManyToOne(() => UserEntity)
  author: UserEntity;
  @ManyToOne(() => QuestionEntity)
  question: QuestionEntity;
  @CreateDateColumn({ default: new Date(), type: 'timestamp with time zone' })
  createdAt: Date;
}
