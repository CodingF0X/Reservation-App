import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyCategoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
