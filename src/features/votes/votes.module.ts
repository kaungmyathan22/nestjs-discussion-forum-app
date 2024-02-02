import { Module } from '@nestjs/common';
import { VotesController } from './controllers/votes.controller';
import { VotesService } from './services/votes.service';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
