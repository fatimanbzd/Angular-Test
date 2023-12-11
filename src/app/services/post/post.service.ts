import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/interfacs/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }

  deletePost(post: Post) {
    return this.http.delete(`https://jsonplaceholder.typicode/posts/${post.id}`);
  }

   updatePost(post: Post) {
    return this.http.post(`https://jsonplaceholder.typicode/posts`, post);
  }
 
}
