import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/v1/todo';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }

  getById(id: string) {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  create(todo: Todo) {
    return this.http.post(`${this.apiUrl}`, todo);
  }

  update(todo: Todo, id: string) {
    return this.http.patch(`${this.apiUrl}/${id}`, todo);
  }

  complete(id: string) {
    return this.http.patch(`${this.apiUrl}/complete/${id}`, {})
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
