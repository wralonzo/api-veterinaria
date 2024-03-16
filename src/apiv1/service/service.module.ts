import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCatalog } from '@/typeorm/entities/service-catalog.entity';
import { ServicePet } from '@/typeorm/entities/service-pet';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCatalog, ServicePet])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
