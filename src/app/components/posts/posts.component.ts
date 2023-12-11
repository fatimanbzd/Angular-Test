import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfacs/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { }
  
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts(): void {
    this.postService.getPosts().subscribe(data => this.posts = data);

   }

  delete(model: Post): void {
    this.posts = this.posts.filter(post => post.id != model.id);
    this.postService.deletePost(model).subscribe();
   }
}
