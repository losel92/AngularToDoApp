import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Task } from 'src/app/models/Task';
import {
  faPencilAlt,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();

  isEditingTitle: boolean = false;
  @ViewChild('titleInput') inputField: ElementRef;

  pencilIcon: IconDefinition = faPencilAlt;
  trashIcon: IconDefinition = faTrash;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    //If the title is empty, show the input field
    if (this.task.title == '') {
      this.isEditingTitle = true;
      setTimeout(() => {
        // this will make it execute after the above boolean has changed
        this.inputField.nativeElement.focus();
      }, 0);
    }
  }

  setClasses() {
    let classes = {
      task: true,
      'is-completed': this.task.completed,
    };
    return classes;
  }

  // Mark / unmark task as completed
  checkboxChangeFn(e: any) {
    // Update UI
    this.task.completed = e.currentTarget.checked;

    // Update server
    this.taskService.checkBoxChangeCompleted(this.task).subscribe((task) => {
      console.log(task);
    });
  }

  // Mark / unmark task as completed
  titleChangeFn(e: any) {
    this.task.title = e.target.value;
    this.isEditingTitle = false;
  }

  titleEditFn(e: any) {
    if (!this.isEditingTitle) {
      this.isEditingTitle = true;

      setTimeout(() => {
        // this will make it execute after the above boolean has changed
        this.inputField.nativeElement.focus();
      }, 0);
    }
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task);
  }
}
