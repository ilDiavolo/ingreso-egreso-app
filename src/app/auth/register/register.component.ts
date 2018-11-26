import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    cargando: boolean

    constructor(public authService: AuthService,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.store.select('ui')
        .subscribe( ui => this.cargando = ui.isLoading )
    }

    onSubmit(data) {
    this.authService.crearUsuario(data.nombre, data.email, data.password)
    }

}
