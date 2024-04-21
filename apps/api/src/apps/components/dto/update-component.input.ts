import { CreateComponentInput } from './create-component.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateComponentInput extends PartialType(CreateComponentInput) {
  id: number;
}
