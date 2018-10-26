import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


const routes = {
  currentUser: () => `/users/current`,
  users: () => `/users`,
};

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient
      .cache()
      .get(routes.currentUser())
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get logged in user'))
      );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .cache()
      .get(routes.users())
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not get users'))
      );
  }
}
