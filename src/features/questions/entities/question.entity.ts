import { UserEntity } from 'src/features/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @Column({})
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.questions) // Many questions to one user
  author: UserEntity;
}
