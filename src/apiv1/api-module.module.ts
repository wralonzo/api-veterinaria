import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PetModule } from './pet/pet.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { ServicePetModule } from './service-pet/service-pet.module';
import { ConsultModule } from './consult/consult.module';
import { ServiceModule } from './service/service.module';
import { ExamenModule } from './examen/examen.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConstancyModule } from './constancy/constancy.module';
import { MedicamentoModule } from './medicamento/medicamento.module';

@Module({
  imports: [
    ClientModule,
    PetModule,
    VaccineModule,
    ServicePetModule,
    ConsultModule,
    ServiceModule,
    ExamenModule,
    ReservationModule,
    ConstancyModule,
    MedicamentoModule,
  ],
})
export class ApiModule {}
