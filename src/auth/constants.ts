import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const NoAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
  secret: 'EXAMPLE SECRET AND DON\'T USE IT UNLESS YOU WANT TO BE FIRED',
};
