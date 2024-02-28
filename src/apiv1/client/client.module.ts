import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Client } from '@/typeorm/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), UserModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
