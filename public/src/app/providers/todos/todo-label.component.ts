import { Component, Inject } from '@angular/core';
import { UNIQUE_ID } from './id-generator.provider';

@Component({
  selector: 'my-todo-label',
  template: `
    <!-- This could be a complex component, like an editable label. -->
    <label [attr.for]="checkboxId"><ng-content></ng-content></label>
  `
})
export class TodoLabelComponent  {
  constructor(@Inject(UNIQUE_ID) public checkboxId: string) {}
}
