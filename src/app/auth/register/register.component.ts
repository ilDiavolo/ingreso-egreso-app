import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

    cargando: boolean
    subscription: Subscription

    constructor(public authService: AuthService,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.store.select('ui')
        .subscribe( ui => this.cargando = ui.isLoading )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    onSubmit(data) {
    this.authService.crearUsuario(data.nombre, data.email, data.password)
    }

}
