import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    url: 'mysql://root:root@localhost:3303/apoowo',
    port: 3303,
    username: 'root',
    password: 'root',
    database: 'apoowo',
    // synchronize: true,
    autoLoadEntities: true
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
