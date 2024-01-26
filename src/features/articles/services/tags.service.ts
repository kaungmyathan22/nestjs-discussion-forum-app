import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../entities/tags.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async getOrCreate(title: string) {
    let tagEntity = await this.tagRepository.findOne({
      where: { title },
    });
    if (!tagEntity) {
      tagEntity = await this.tagRepository.save(
        this.tagRepository.create({ title }),
      );
    }
    await this.tagRepository.save(tagEntity);
    return tagEntity;
  }
}
