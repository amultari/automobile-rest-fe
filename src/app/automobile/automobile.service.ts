import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Automobile } from './automobile';

@Injectable({
  providedIn: 'root'
})
export class AutomobileService {


  private apiServer = 'http://localhost:8080/api/automobile';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  //questo metodo viene usato dal list ed è fatto in modo da caricare 100 elementi (senza paginazione)
  //se non viene specificato il max l'api rest ne espone solo 10 e non verrebbero caricate le altre voci
  //inoltre vengono ordinati i risultati per nome ascendente
  // getAutori(): Observable<Autore[]> {
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.set('max', '100');
  //   httpParams = httpParams.set('offeset', '0');
  //   httpParams = httpParams.set('sort', 'nome');
  //   httpParams = httpParams.set('order', 'asc');
  //   return this.http.get<Autore[]>(this.apiServer, { params: httpParams }).pipe(
  //     tap(data => console.log('All: ' + JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );

  // }

  searchAutomobili(automobileInput: Automobile, paginationCriteria: Map<string, string>): Observable<any> {
    //siccome i parametri sulla paginazione sono nell'url:
    //http://localhost:8080/api/automobile/search?pageSize=5&pageNo=0&sortBy=dataImmatricolazione
    //ma i criteri sull'oggetto sono nel body della post, bisogna spezzettare le cose
    let searchBaseUrl: string = `/search?pageSize=${paginationCriteria.get('pageSize')}&pageNo=${paginationCriteria.get('pageNo')}&sortBy=${paginationCriteria.get('sortBy')}`;
    return this.http.post<any>(this.apiServer + searchBaseUrl, JSON.stringify(automobileInput), this.httpOptions).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );

  }

  // getAutore(idAutoreInput: number): Observable<Autore> {
  //   return this.http.get<Autore>(this.apiServer + '/' + idAutoreInput.toString()).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  create(automobileInput: Automobile): Observable<Automobile> {
    return this.http.post<Automobile>(this.apiServer, JSON.stringify(automobileInput), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // edit(idAutoreInput: number): Observable<Autore> {
  //   return this.http.get<Autore>(this.apiServer + '/' + idAutoreInput.toString() + '/edit').pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // update(autoreInput: Autore): Observable<Autore> {
  //   return this.http.put<Autore>(this.apiServer + '/' + autoreInput.id.toString(), autoreInput, this.httpOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // delete(autoreInput: Autore): Observable<Autore> {
  //   return this.http.delete<Autore>(this.apiServer + '/' + autoreInput.id.toString(), this.httpOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach(element => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
