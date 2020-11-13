import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTask: EventEmitter<any> = new EventEmitter();

  title: string;

  plusIcon: IconDefinition = faPlus;
  @ViewChild('titleInput') titleElem: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const task = {
      title: this.title,
      completed: false,
    };

    this.addTask.emit(task);

    // Clear the input
    this.titleElem.nativeElement.value = '';
  }
}
