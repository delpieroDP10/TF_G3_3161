// src/app/services/messages.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/Messages';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private url = `${base_url}/messages`;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  list(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  create(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message, { headers: this.createAuthorizationHeader() });
  }

  update(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.url}/${message.messageId}`, message, { headers: this.createAuthorizationHeader() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
