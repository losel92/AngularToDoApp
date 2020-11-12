import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit {
  taskList: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskList = tasks;
    });
  }

  deleteTask(task: Task) {
    // Delete from UI
    this.taskList = this.taskList.filter((t) => t.id !== task.id);
    // Delete from server
    this.taskService.deleteTask(task).subscribe();
  }

  addTask() {
    this.taskList.push(new Task());
  }
}
