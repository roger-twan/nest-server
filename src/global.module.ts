import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot([{
      ttl: 1000 * 10, // milliseconds * seconds
      limit: 10,
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({        
        type: 'mysql',
        port: 3306,
        database: 'nest_database',
        synchronize: false,
        autoLoadEntities: true,
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('LOGIN_EXP') || '60s' }
      }),
    }),
  ],
  exports: [ConfigModule, JwtModule]
})

export class GlobalModule {}
