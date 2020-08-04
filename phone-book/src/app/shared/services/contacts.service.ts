import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContact } from './../interfaces/contacts.interface';
import { Contact } from './../models/contacts.model';


@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  private contactArray: Array<IContact> = [];

  constructor(
   private http: HttpClient
  ) {}

getContacts(): Observable<Array<IContact>>{
  return this.http.get<Array<IContact>>(environment.url);
  }



addContact(contact: IContact): Observable<Array<IContact>>{
  return this.http.post<Array<IContact>>(environment.url, contact)
}

deleteContact(contact: IContact): Observable<Array<IContact>>{
  return this.http.delete<Array<IContact>>(environment.url + '/' + contact.id)
}

updateContact(contact: IContact): Observable<Array<IContact>>{
  return this.http.put<Array<IContact>>(environment.url + '/' + contact.id, contact)
}

}
