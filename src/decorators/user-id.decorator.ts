import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new BadRequestException('User ID header is missing');
    }

    return userId;
  },
);
