import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, ValidateNested } from 'class-validator';

enum TOPIC {
  TEMPERATURE = 'temperature',
}

enum UNIT {
  C = 'C',
  F = 'F',
}

class TemperatureMessage {
  @IsNumber()
  temperature: number;

  @IsEnum(UNIT)
  unit: UNIT;
}

export class CreateMessageDTO {
  @IsEnum(TOPIC)
  topic: TOPIC;

  @IsObject()
  @ValidateNested()
  @Type(() => TemperatureMessage)
  message: TemperatureMessage;
}
