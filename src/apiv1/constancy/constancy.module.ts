import { Module } from '@nestjs/common';
import { ConstancyService } from './constancy.service';
import { ConstancyController } from './constancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constancy } from '@/typeorm/entities/contancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Constancy])],
  controllers: [ConstancyController],
  providers: [ConstancyService],
})
export class ConstancyModule {}
