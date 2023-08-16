import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import apiConfig from './config/api';
import { ComapnyModule } from './modules/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig],
    }),
    ComapnyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
