import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User';
import { UsersModule } from './users/users.module';
import { Hotel } from './hotels/entities/Hotel';
import { Profile } from './users/entities/Profile';
import { Post } from './users/entities/Posts';
import { Label } from './users/entities/Label';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs_mysql_tutorial',
      entities: [User, Hotel, Profile, Post, Label],
      synchronize: true,
    }),
    UsersModule,
    // HotelsModule, // SİLİNDİ
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
