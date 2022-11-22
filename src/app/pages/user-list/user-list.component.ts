import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { UserService } from "src/app/shared/services/user.service";
import { UserFormComponent } from "src/app/shared/components/user-form/user-form.component";

@Component({
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    isLoading = false;
    errMsg: string;
    users: User[];

    constructor(private userService: UserService,
        private modalService: NgbModal) {}

    ngOnInit(): void {
        this.getusers();
    }

    getusers() {
        this.isLoading = true;
        this.userService.getUsers()
        .subscribe(users => {
            this.users = users;
            this.isLoading = false;
        }, errMsg => {
            this.errMsg = errMsg;
            this.isLoading = false;
        });
    }

    onOpenUserFormModal(user: User = new User) {
        const modalRef = this.modalService.open(UserFormComponent);
        modalRef.componentInstance.user = { ...user };
        modalRef.result.then(() => {
            this.getusers();
        }, () => {});
    }
}