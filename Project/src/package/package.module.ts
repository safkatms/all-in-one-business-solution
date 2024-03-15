import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Package } from './entities/package.entity';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
  imports:[TypeOrmModule.forFeature([Package,User])]
})
export class PackageModule {}
