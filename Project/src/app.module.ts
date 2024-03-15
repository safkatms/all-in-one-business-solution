import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { PackageModule } from './package/package.module';

@Module({
  imports: [UserModule, AuthModule,TypeOrmModule.forRoot(config), PackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
