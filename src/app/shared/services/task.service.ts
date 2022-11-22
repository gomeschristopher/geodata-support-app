import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from "../models/task";
import { TaskStatus } from "../models/task-status";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    getTaskStatus() {
        return this.http.get<TaskStatus[]>(`${environment.apiUrl}/tasks/status`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    getTasks() {
        return this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveTask(Task: Task) {
        return this.http.post(`${environment.apiUrl}/tasks`, Task).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateTask(Task: Task, id: number) {
        return this.http.put(`${environment.apiUrl}/tasks/${id}`, Task).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteTask(id: number) {
        return this.http.delete(`${environment.apiUrl}/tasks/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}