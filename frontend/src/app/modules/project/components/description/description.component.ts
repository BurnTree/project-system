import {Component, Input} from '@angular/core';
import {Task} from "../../../models/task";
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html'
})
export class DescriptionComponent {

  @Input()
  public task: Task;
}
