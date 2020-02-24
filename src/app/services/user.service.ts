import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string = environment.urlserver;
  public datos_usuario: any = [];
  public headers: any;

  constructor(
    private http: HttpClient,
    private cookie_service: CookieService
  ) { }

  // funcion para el login
  login_(datos) {
    return this.http.post(this.url + 'login', datos);
  }
}
