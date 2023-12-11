import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { Post } from 'src/app/interfacs/post';
import { PostService } from 'src/app/services/post/post.service';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let POSTS: Post[];
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;
  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        title: 'title 1',
        body: 'body 1',
        userId: 1,
      },
      {
        id: 2,
        title: 'title 2',
        body: 'body 2',
        userId: 2,
      },
      {
        id: 3,
        title: 'title 3',
        body: 'body 3',
        userId: 3,
      },
    ];

    mockPostService = jasmine.createSpyObj('PostService', [
      'getPosts',
      'deletePost',
    ]);

    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
      imports: [AppModule],
      // schemas:[NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();

    expect(component.posts.length).toBe(3);
  });

  it('should create exact same number of post component with posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    // ngOnInit

    fixture.detectChanges();
    const PostComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    expect(PostComponentDEs.length).toEqual(POSTS.length);
  });

  it('should check whether eaxct post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    // ngOnInit
    fixture.detectChanges();
    const PostComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    for (let i = 0; i < PostComponentDEs.length; i++) {
      let PostComponentInstance = PostComponentDEs[i]
        .componentInstance as PostComponent;
      expect(PostComponentInstance.post?.title).toEqual(POSTS[i].title);
    }
  });

  it('should create one post child Element for each post ', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugeElement = fixture.debugElement;
    const postsElement = debugeElement.queryAll(By.css('.posts'));
    expect(postsElement.length).toBe(3);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));

      component.posts = POSTS;
    });
    it('should delete the seleced post from list', () => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected post in posts', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });
    it('should call the delete method in post service only once', () => {
      // spyOn(postService, 'deletePost').and.callThrough();
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });

    it('should call the delete method when post component button is clicked ', () => {
      spyOn(component, 'delete');
      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );
      for (let i = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', { preventDefault: () => {} });
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });

    it('should call that method when the delete event is emitted in postComponent ', () => {
      spyOn(component, 'delete');
      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();
      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );
      for (let i = 0; i < postComponentDEs.length; i++) {
        (postComponentDEs[i].componentInstance as PostComponent).delete.emit(
          POSTS[i]
        );
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });
  });
});
