import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Client } from '@/typeorm/entities/client.entity';
import { Pet } from '@/typeorm/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Pet]), UserModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
