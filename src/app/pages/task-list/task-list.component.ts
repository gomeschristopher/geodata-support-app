import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskFormComponent } from "src/app/shared/components/task-form/task-form.component";
import { Task } from "src/app/shared/models/task";
import { TaskService } from "src/app/shared/services/task.service";

@Component({
    templateUrl: './task-list.component.html'
})
export class TaskListComponent {
    isLoading = false;
    errMsg: string;
    tasks: Task[];

    constructor(private taskService: TaskService,
        private modalService: NgbModal) {}

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks() {
        this.isLoading = true;
        this.taskService.getTasks()
        .subscribe(tasks => {
            this.tasks = tasks;
            this.isLoading = false;
        }, errMsg => {
            this.errMsg = errMsg;
            this.isLoading = false;
        });
    }

    onOpenTaskFormModal(task: Task = new Task) {
        const modalRef = this.modalService.open(TaskFormComponent);
        modalRef.componentInstance.task = { ...task };
        modalRef.result.then(() => {
            this.getTasks();
        }, () => {});
    }
}