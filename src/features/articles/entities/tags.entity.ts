import { QuestionEntity } from 'src/features/questions/entities/question.entity';
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
  @JoinTable({ name: 'article_tags' })
  articles: ArticleEntity[];

  @ManyToMany(() => QuestionEntity, { cascade: true })
  @JoinTable({ name: 'question_tags' })
  questions: QuestionEntity[];
}
