import { IngresoEgresoService } from './ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egresos.models';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

    forma: FormGroup
    tipo = 'ingreso'

    constructor(public ingresoEgresoService: IngresoEgresoService) { }

    ngOnInit() {
        this.forma = new FormGroup({
            'description': new FormControl('', Validators.required),
            'monto': new FormControl(0, Validators.min(0))
        })
    }

    crearIngresoEgreso() {
        const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo })
        this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
        .then(() => {
            Swal('Creado', ingresoEgreso.description, 'success' )
            this.forma.reset({ monto: 0 })
        })
        .catch(err => console.log(err))
    }

}
