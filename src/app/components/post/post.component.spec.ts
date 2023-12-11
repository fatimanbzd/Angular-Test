import { Post } from 'src/app/interfacs/post';
import { PostComponent } from './post.component';
import { first } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('Post Component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let component: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule],
      schemas:[NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create post component using TestBed', () => {
    expect(component).toBeDefined();
  });

  it('should render the post title in the anchor element', () => {
    const post: Post = { id: 1, userId: 1, title: 'title 1', body: 'body 1' };
    component.post = post;
    fixture.detectChanges();

    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  });

  it('should render the post title in the anchor element using debug element ', () => {
    const post: Post = { id: 1, userId: 1, title: 'title 1', body: 'body 1' };
    component.post = post;
    fixture.detectChanges();

    const postDebugElement = fixture.debugElement;
    const aElement = postDebugElement.query(By.css('a')).nativeElement;
    expect(aElement.textContent).toContain(post.title);
  });
  it('should raise and event when the delete post is clicked', () => {
    const post: Post = { id: 1, userId: 1, title: 'title 1', body: 'body 1' };
    component.post = post;

    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });
    component.onDeletePost(new MouseEvent('click'));
  });
});
