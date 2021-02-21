import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  userDetails: IUser;

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>('/api/user/' + id)
      .pipe(tap(data => {
        this.userDetails = <IUser>data;
      }))
      .pipe(catchError(this.handleError<IUser>()))
  }

  saveUser(user: IUser): Observable<IUser> {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<IUser>('/api/user', user, options)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
