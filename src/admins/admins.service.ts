import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type Admin = any;

@Injectable()
export class AdminsService {
  private readonly admins = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<Admin | undefined> {
    return this.admins.find(user => user.username === username);
  }
}
