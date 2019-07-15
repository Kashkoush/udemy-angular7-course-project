import * as firebase from 'firebase'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    isAuthenticatedUser = new Subject<boolean>();

    constructor(private router: Router) { }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            response => this.router.navigate([''])
        ).catch(
            error => alert(error.message)
        )
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token) => {
                                this.token = token;
                                this.isAuthenticatedUser.next(true);
                            }
                        )
                }
            )
            .catch(
                error => alert(error.message)
            )
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.isAuthenticatedUser.next(false);
        this.router.navigate(['']);
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token) => {
                    this.token = token;
                }
            );
        return this.token
    }

    isAuthenticated() {
        return this.token != null;
    }
}