import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: './user-form.component.html'
})
export class UserFormComponent {
    @Input() user: User;
    errMsg: string;
    isLoading = false;

    constructor(private activeModal: NgbActiveModal,
        private userService: UserService) { }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.user.id) {
            this.userService.updateUser(this.user, this.user.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.userService.saveUser(this.user)
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
        this.userService.deleteUser(this.user.id)
            .subscribe(() => {
                this.activeModal.close();
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }
}