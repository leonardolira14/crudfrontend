import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.scss']
})
export class CloginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private http: UserService,
    private cookie_service: CookieService,
    private route: Router,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {
  }
  login() {
    this.http.login_(this.formGroup.value)
      .subscribe(
        data => {
          if (data['status'] === true) {
            this.cookie_service.set('datos_usuario', JSON.stringify(data['data']));
            this.ir('clientes');
          }
        }
        , error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }
  ir(ruta) {
    this.route.navigateByUrl('/' + ruta);
  }
}
