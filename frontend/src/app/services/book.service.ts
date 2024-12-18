import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookService {
    endpoint = 'http://localhost:8080/api/books';
    httpOptions = {
    headers: new HttpHeaders ({ 'Content-Type': 'application/json'} )
  };

  constructor( private httpClient: HttpClient ) { }
 
  createBook ( book, blob){
    let formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("file", blob);

    console.log('Bookservice - title= '+ book.title);
    console.log('Bookservice - author= '+ book.author);
    console.log('Bookservice - blob= '+ blob);
    console.log('Bookservice - formData= '+ formData);

    return this.httpClient.post(this.endpoint, formData);
    
  }

  getBook(id) {
    return this.httpClient.get (this.endpoint + '/' + id);
  }

  getBooks() {
    return this.httpClient.get (this.endpoint);
  }

  deleteBook(id){
    console.log (this.endpoint + '/' + id, this.httpOptions);
    return this.httpClient.delete(this.endpoint + '/' + id, this.httpOptions);
  }

  updateBook(id, book, blob): Observable<any> {
    let valores: string;
    valores = this.endpoint + '/' + id;
    console.log('Service ruta='+valores);
    return this.httpClient.put(this.endpoint + '/' + id, JSON.stringify( { ...book} ), this.httpOptions);
  }
}
