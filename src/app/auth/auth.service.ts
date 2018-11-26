import { User } from './user.model'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import * as fronFirebase from 'firebase'

import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'

import { Store } from '@ngrx/store'
import { AppState } from './../app.reducer'
import { ActicarLoadingAction, DesacticarLoadingAction } from './../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router,
                private store: Store<AppState>,
                private afDB: AngularFirestore,
                private afAuth: AngularFireAuth) { }

    initAuthListener() {
        this.afAuth.authState.subscribe( (fbUser: fronFirebase.User) => {
            console.log(fbUser)
        })
    }

    crearUsuario(nombre: string, email: string, password: string) {

        this.store.dispatch( new ActicarLoadingAction() )

        this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(resp => {

            const user: User = {
                nombre: nombre,
                uid: resp.user.uid,
                email: resp.user.email
            }

            this.afDB.doc(`${user.uid}/usuario`)
            .set(user)
            .then(() => {
                this.store.dispatch( new DesacticarLoadingAction() )
                this.router.navigate(['/'])
            })
        })
        .catch(err => {
            console.error(err)
            this.store.dispatch( new DesacticarLoadingAction() )
            Swal('Error en el login', err.message, 'error')
        })          
    }

    login(email: string, password: string) {

        this.store.dispatch( new ActicarLoadingAction() )

        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            // console.log(resp)
            this.router.navigate(['/'])
            this.store.dispatch( new DesacticarLoadingAction() )
        })
        .catch(err => {
            console.error(err)
            this.store.dispatch( new DesacticarLoadingAction() )
            Swal('Error en el login', err.message, 'error')
        })
    }

    logout() {
        this.router.navigate(['/login'])
        this.afAuth.auth.signOut()
    }

    isAuth() {
        return this.afAuth.authState
        .pipe(
            map( fbUser => {

                if (fbUser == null) {
                    this.router.navigate(['/login'])
                }

                return fbUser !== null
            })
        )
    }

}
