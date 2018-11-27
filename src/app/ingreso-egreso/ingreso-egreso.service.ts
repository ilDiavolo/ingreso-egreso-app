import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egresos.models';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

    constructor(  private afDB: AngularFirestore, 
                public authService: AuthService ) {}

    crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

        return this.afDB.doc(`${this.authService.getUsuario().uid}/ingreso-egreso`)
        .collection('item').add({...ingresoEgreso})
        
    }
}
