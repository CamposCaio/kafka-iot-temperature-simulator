import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: '123',
      username: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: false,
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
