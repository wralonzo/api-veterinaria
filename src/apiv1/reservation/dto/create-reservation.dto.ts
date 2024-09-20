import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  idPet: number;

  @IsTime()
  @IsNotEmpty()
  horaInicio: string;

  @IsTime()
  @IsNotEmpty()
  horaFin: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false; // Return false if value is empty

          // Regular expression to validate time in HH:MM format
          const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time in HH:MM format`;
        },
      },
    });
  };
}
