import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiQueryBuilder } from '../api-query-builder';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadUsers = (data: any) => {
    const query = apiQueryBuilder(data);
    return this.http.get(`http://localhost:3000/users${query}`, { observe: 'response' }).pipe(
      map(res => ({ users: res.body, totalCount: +res.headers.get('x-total-count') }))
    );
  }

  loadPosts = (data: any) => {
    const query = apiQueryBuilder(data);
    return this.http.get(`http://localhost:3000/posts${query}`, { observe: 'response' }).pipe(
      map(res => ({ posts: res.body, totalCount: +res.headers.get('x-total-count') }))
    );
  }
}
