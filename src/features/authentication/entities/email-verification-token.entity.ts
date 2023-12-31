import { UserEntity } from 'src/features/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmailVerificationTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
  @Column()
  token_hash: string;
  @Column({ type: 'timestamp with time zone' })
  expiresAt: Date;
}
