import { TaskStatus } from "./task-status";
import { User } from "./user";

export class Task {
    id: number;
    status: TaskStatus = new TaskStatus;
    user: User;
    subject: string;
    description: string;
    is_urgent: number = 0;
}