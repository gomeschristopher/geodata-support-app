import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveUser(User: User) {
        return this.http.post(`${environment.apiUrl}/users`, User).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateUser(User: User, id: number) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, User).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}