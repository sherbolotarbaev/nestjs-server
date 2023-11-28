import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { GetCurrentUserId } from '../auth/common/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @GetCurrentUserId() userId: number,
    @Query('q') query: string,
  ) {
    return await this.usersService.getUsers(userId, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.usersService.getUser(userId, id);
  }
}
