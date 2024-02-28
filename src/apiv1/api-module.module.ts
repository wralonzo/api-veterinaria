import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PetModule } from './pet/pet.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { ServicePetModule } from './service-pet/service-pet.module';

@Module({
  imports: [AuthModule, UserModule, ClientModule, PetModule, VaccineModule, ServicePetModule],
})
export class ApiModule {}
