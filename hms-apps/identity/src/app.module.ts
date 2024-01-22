import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    // url: 'mysql://root:root@localhost:3303/apoowo',
    port: 5432,
    username: 'my_user',
    password: 'my_password',
    database: 'my_database',
    synchronize: true,
    autoLoadEntities: true
    // entities: ["dist/**/*.entity{.ts,.js}"],
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
