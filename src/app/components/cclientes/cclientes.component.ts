import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
@Component({
  selector: 'app-cclientes',
  templateUrl: './cclientes.component.html',
  styleUrls: ['./cclientes.component.scss']
})
export class CclientesComponent implements OnInit {
  pageActual = 1;
  formGroup: FormGroup;
  lista_clientes = [];
  lista_clientes_ = [];
  sniper = true;
  modal_clientes = false;
  palabra = '';
  IDCliente = '';
  constructor(
    private http: ClientesService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellido_Pat: ['', Validators.required],
      Apellido_Mat: ['', Validators.required],
      RFC: ['', Validators.required],
      Calle: ['', Validators.required],
      No_Exterior: ['', Validators.required],
      No_Interior: [''],
      Municipio: ['', Validators.required],
      Estado: ['', Validators.required],
      CP: ['', Validators.required],
      Tel: ['', Validators.required],
      Correo: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.nggetall();
  }
  nggetall() {
    this.http.getall_()
      .subscribe(data => {
        this.lista_clientes = data['data'];
      }, error => {
        this.sniper = false;
        Swal.fire('Error ' + error.status, error.message, 'error');
        console.log(error);
      });
  }
  decicion() {
    if (this.formGroup.valid) {
      if (this.IDCliente !== '') {
        this.update();

      } else {
        this.save();
      }
    }

  }
  save() {
    this.http.save_(this.formGroup.value)
      .subscribe(data => {
        Swal.fire('Exito', 'Datos registrados', 'success');
        this.formGroup.reset();
        this.modal_clientes = false;
        this.nggetall();
      }, error => {
        this.sniper = false;
        Swal.fire('Error ' + error.status, error.message, 'error');
        console.log(error);
      });
  }
  update() {
    this.formGroup.addControl('IDCliente', new FormControl(this.IDCliente));
    this.http.update_(this.formGroup.value)
      .subscribe(data => {
        Swal.fire('Exito', 'Datos actualizados', 'success');
        this.formGroup.reset();
        this.modal_clientes = false;
        this.IDCliente = '';
        this.nggetall();
      }, error => {
        this.sniper = false;
        Swal.fire('Error ' + error.status, error.message, 'error');
        console.log(error);
      });
  }
  ir(ruta) {
    this.route.navigateByUrl('/' + ruta);
  }
  editar(id) {
    console.log(id);
    const datos = { IDCliente: id };
    this.http.getid(datos)
      .subscribe(data => {
        this.formGroup.controls['Nombre'].setValue(data['data']['Nombre']);
        this.formGroup.controls['Apellido_Pat'].setValue(data['data']['Apellido_Pat']);
        this.formGroup.controls['Apellido_Mat'].setValue(data['data']['Apellido_Mat']);
        this.formGroup.controls['RFC'].setValue(data['data']['RFC']);
        this.formGroup.controls['Calle'].setValue(data['data']['Calle']);
        this.formGroup.controls['No_Interior'].setValue(data['data']['No_Interior']);
        this.formGroup.controls['No_Exterior'].setValue(data['data']['No_Exterior']);
        this.formGroup.controls['CP'].setValue(data['data']['CP']);
        this.formGroup.controls['Municipio'].setValue(data['data']['Municipio']);
        this.formGroup.controls['Estado'].setValue(data['data']['Estado']);
        this.formGroup.controls['Tel'].setValue(data['data']['Tel']);
        this.formGroup.controls['Correo'].setValue(data['data']['Correo']);
        this.IDCliente = id;
        this.modal_clientes = true;
    }, error => {
      this.sniper = false;
      Swal.fire('Error ' + error.status, error.message, 'error');
      console.log(error);
    });
  }
  buscar() {
    const datos = { Palabra: this.palabra };
    this.http.buscar(datos)
      .subscribe(data => {
        Swal.fire('Exito', 'Datos localizados', 'success');
        this.lista_clientes = data['data'];
      }, error => {
        this.sniper = false;
        Swal.fire('Error ' + error.status, error.message, 'error');
        console.log(error);
      });
  }
  baja(cliente) {
    const datos = { IDCliente: cliente };
    this.http.delete(datos)
      .subscribe(data => {
        Swal.fire('Exito', 'Datos Eliminados', 'success');
        this.ngOnInit();
      }, error => {
        this.sniper = false;
        Swal.fire('Error ' + error.status, error.message, 'error');
        console.log(error);
      });
  }
}
