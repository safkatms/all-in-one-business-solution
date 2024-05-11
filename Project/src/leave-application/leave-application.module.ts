import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LeaveApplicationService } from './leave-application.service';
import { LeaveApplicationController } from './leave-application.controller';
import { LeaveMiddleware } from 'src/middleware/leave.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './entities/leave-application.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Leave,User])],
  controllers: [LeaveApplicationController],
  providers: [LeaveApplicationService],
})
export class LeaveApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LeaveMiddleware)
      .forRoutes({ path: 'leave', method: RequestMethod.POST });
  }
}
