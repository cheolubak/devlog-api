import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  exports: [],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        database: configService.get('DATABASE_NAME', 'postgres'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        host: configService.get('SUPABASE_URL', 'localhost'),
        password: configService.get('DATABASE_PASSWORD'),
        port: configService.get('DATABASE_PORT', 3306),
        synchronize: configService.get('NODE_ENV') !== 'production',
        type: 'mysql',
        username: configService.get('DATABASE_USER'),
      }),
    }),
  ],
})
export class DatabaseModule {}
