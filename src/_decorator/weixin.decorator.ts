import { SetMetadata } from '@nestjs/common';

export const IS_WEIXIN_KEY = 'isWx';
export const Weixin = () => SetMetadata(IS_WEIXIN_KEY, true);
