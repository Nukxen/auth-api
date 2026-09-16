import { Module } from '@nestjs/common';
import { HttpCodeInstances } from '../httpcodeinstances/http-code-instances.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
