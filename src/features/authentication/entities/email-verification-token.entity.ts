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
  @Column({ nullable: true })
  token_hash: string;
  @Column({ type: 'timestamp with time zone', nullable: true })
  expiresAt: Date;
}
