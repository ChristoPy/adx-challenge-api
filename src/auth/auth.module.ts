import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [AdminsModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
