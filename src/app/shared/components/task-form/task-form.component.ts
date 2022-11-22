import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

import { Task } from "../../models/task";
import { TaskStatus } from "../../models/task-status";
import { User } from "../../models/user";
import { TaskService } from "../../services/task.service";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
    @Input() task: Task;
    errMsg: string;
    isLoading = false;
    taskStatus: TaskStatus[];
    users: User[];

    constructor(private activeModal: NgbActiveModal,
        private taskService: TaskService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.taskService.getTaskStatus()
            .subscribe(status => {
                this.taskStatus = status;
                this.userService.getUsers()
                    .subscribe(users => {
                        this.users = users;
                        this.isLoading = false;
                    }, errMsg => {
                        this.errMsg = errMsg;
                        this.isLoading = false;
                    });
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.task.id) {
            this.taskService.updateTask(this.task, this.task.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.taskService.saveTask(this.task)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onDelete() {
        this.isLoading = true;
        this.taskService.deleteTask(this.task.id)
            .subscribe(() => {
                this.activeModal.close();
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }

    userFormatter = (user: User) => user.name;

    searchUsers: OperatorFunction<string, readonly { id; name }[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter((term) => term.length >= 1),
            map((term) => this.users.filter((user) => new RegExp(term, 'mi').test(user.name)).slice(0, 10)),
        );
}