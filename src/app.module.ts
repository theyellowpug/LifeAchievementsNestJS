import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        //uri: "mongodb+srv://barnaholl:Linoleum69@lifeachievements.vzcu98l.mongodb.net/life-achivements-db?retryWrites=true&w=majority"
        uri: process.env.NODE_ENV === "test" ? process.env.MONGO_DB_URI: process.env.MONGO_DB_URI
      }),
    }),
   /* GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
