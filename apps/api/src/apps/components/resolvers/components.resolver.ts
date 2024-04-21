import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentsService } from '../components.service';
import { CreateComponentInput } from '../dto/create-component.input';
import { UpdateComponentInput } from '../dto/update-component.input';

@Resolver('Component')
export class ComponentsResolver {
  constructor(private readonly componentsService: ComponentsService) {}

  @Mutation('createComponent')
  create(
    @Args('createComponentInput') createComponentInput: CreateComponentInput
  ) {
    return this.componentsService.create(createComponentInput);
  }

  @Query('components')
  findAll() {
    return this.componentsService.findAll();
  }

  @Query('component')
  findOne(@Args('id') id: number) {
    return this.componentsService.findOne(id);
  }

  @Mutation('updateComponent')
  update(
    @Args('updateComponentInput') updateComponentInput: UpdateComponentInput
  ) {
    return this.componentsService.update(
      updateComponentInput.id,
      updateComponentInput
    );
  }

  @Mutation('removeComponent')
  remove(@Args('id') id: number) {
    return this.componentsService.remove(id);
  }
}
