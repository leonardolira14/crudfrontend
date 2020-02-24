import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public url: string = environment.urlserver;
  public datos_usuario: any = [];
  public headers: any;
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService
  ) {
    if (this.cookie_service.get('datos_usuario')) {
      this.datos_usuario = JSON.parse(this.cookie_service.get('datos_usuario'));
      this.headers = new HttpHeaders({
        'Authorization': this.datos_usuario['token']
      });
    }
  }
  
  // funcion para traer todos los registros de la base de datos

  getall_() {
    console.log(this.headers);
    return this.http.get(environment.urlserver + 'client/getall', { headers: this.headers });

  }

  getid(datos) {
    return this.http.post(environment.urlserver + 'client/get',datos, { headers: this.headers });

  }

  save_(datos) {
    return this.http.post(environment.urlserver + 'client/save', datos, { headers: this.headers });

  }

  update_(datos) {
    return this.http.post(environment.urlserver + 'client/update', datos, { headers: this.headers });

  }

  delete(datos) {
    return this.http.post(environment.urlserver + 'client/delete', datos, { headers: this.headers });

  }

  buscar(datos) {
    return this.http.post(environment.urlserver + 'client/search', datos, { headers: this.headers });
  }




}
