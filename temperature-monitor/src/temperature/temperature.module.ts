import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [TemperatureService],
})
export class TemperatureModule {}
