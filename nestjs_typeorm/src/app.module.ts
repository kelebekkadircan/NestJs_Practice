import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { Hotel } from './entities/Hotel';
import { Profile } from './entities/Profile';
import { Post } from './entities/Posts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs_mysql_tutorial',
      entities: [User, Hotel, Profile, Post],
      synchronize: true,
    }),
    UsersModule,
    HotelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
