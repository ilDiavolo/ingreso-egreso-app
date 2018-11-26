import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.reducer'
import { AuthService } from './../auth.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    cargando: boolean

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store.select('ui')
        .subscribe( ui => this.cargando = ui.isLoading )
    }

    loginSubmit(data) {
    this.authService.login(data.email, data.password)
    }

}
