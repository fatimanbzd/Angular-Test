import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { Post } from 'src/app/interfacs/post';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!: Post;
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private location: Location) { }
  
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.postService.getPost(+id).subscribe((post: Post)=> this.post = post);

  }

  save(): void {
    this.postService.updatePost(this.post).subscribe(()=>
      this.goBack()
    )
}

  goBack(): void {
    this.location.back();
   }
}
