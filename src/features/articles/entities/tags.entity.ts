import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @ManyToMany(() => ArticleEntity, { cascade: true })
  @JoinTable()
  articles: ArticleEntity[];
}
