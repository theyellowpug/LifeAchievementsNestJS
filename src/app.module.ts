import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as dotenv from 'dotenv';
import configuration from './configuration/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    UserModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        //uri: "mongodb+srv://barnaholl:Linoleum69@lifeachievements.vzcu98l.mongodb.net/life-achivements-db?retryWrites=true&w=majority"
        uri: process.env.NODE_ENV === "test" ? configService.get<string>("database.mongo_db_uri") : configService.get<string>("database.mongo_db_test_uri")
        //configuration.database.mongo_db_uri : configuration.database.mongo_db_test_uri
      }),
    }),
   /* GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService, UserService,],
})
export class AppModule {}
