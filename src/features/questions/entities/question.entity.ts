import { TagEntity } from 'src/features/articles/entities/tags.entity';
import { UserEntity } from 'src/features/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @Column({})
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.questions) // Many questions to one user
  author: UserEntity;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable({ name: 'question_tags' })
  tags: TagEntity[];
}
