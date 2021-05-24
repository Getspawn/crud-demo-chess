import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://190.210.222.36:8085//web/pdo/DemoWS/demo/';

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = this.apiURL + 'obtenerUsuarios';

    return this.http.put<User[]>(url, null);
  }

  createUser(user: User): Observable<User> {
    const url = this.apiURL + 'gestionarUsuarios';

    const data = {
      "request": {
        "pcaccion": "create",
        "dsUsuariosDemo": {
          "ttusuarios": [user]
        }
      }
    }

    return this.http.put<User>(url, data);
  }

  updateUser(user: User): Observable<User> {
    const url = this.apiURL + 'gestionarUsuarios';
    
    const data = {
      "request": {
        "pcaccion": "update",
        "dsUsuariosDemo": {
          "ttusuarios": [user]
        }
      }
    }

    return this.http.put<User>(url, data);
  }

  deleteUser(user: User): Observable<User> {
    const url = this.apiURL + 'gestionarUsuarios';
    
    const data = {
      "request": {
        "pcaccion": "delete",
        "dsUsuariosDemo": {
          "ttusuarios": [user]
        }
      }
    }

    return this.http.put<User>(url, data);
  }
}
