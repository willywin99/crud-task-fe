import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // to fetch all task lists
  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiConfigService.getTaskLists('tasklists');
  }

  // to fetch all task lists
  getAllTasks(taskListId: string): Observable<TaskModel[]> {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  // create a task list bucket
  createTaskList(title: string): Observable<TaskListModel> {
    let data = { 'title': title };
    return this.apiConfigService.post('tasklists', data);
  }

  // to fetch all tasks inside a task list object
  // http://localhost:3000/tasklists/61ff6d627d308415d72e6a4f/tasks
  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  // create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string, title: string) {
    let data = { 'title': title };
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, { title });
  }

  // delete a task list
  deleteTaskList(taskListId: string): Observable<TaskListModel> {
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  // delete a task inside a particular task list
  deleteATaskInsideATaskList(taskListId: string, taskId: string): Observable<TaskModel> {
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  // update the status of a task whether its completed or not
  updateTaskStatus(taskListId: string, taskObject: TaskModel): Observable<TaskModel> {
    let updateData = { 'completed': !taskObject.completed };    // toggle the database value
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }
}
