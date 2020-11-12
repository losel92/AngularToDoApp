import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../models/Task';
import { Observable } from 'rxjs';
import { Url, UrlObject } from 'url';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasksUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  tasksLimit: string = '?_limit=5';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}${this.tasksLimit}`);
  }

  checkBoxChangeCompleted(task: Task): Observable<any> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put(url, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.delete<Task>(url, httpOptions);
  }
}
