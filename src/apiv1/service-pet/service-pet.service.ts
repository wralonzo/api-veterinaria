import { Injectable } from '@nestjs/common';
import { CreateServicePetDto } from './dto/create-service-pet.dto';
import { UpdateServicePetDto } from './dto/update-service-pet.dto';

@Injectable()
export class ServicePetService {
  create(createServicePetDto: CreateServicePetDto) {
    return 'This action adds a new servicePet';
  }

  findAll() {
    return `This action returns all servicePet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePet`;
  }

  update(id: number, updateServicePetDto: UpdateServicePetDto) {
    return `This action updates a #${id} servicePet`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicePet`;
  }
}
