import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfacs/post';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockActivatedRouteSpy;
  let mockLocationSpy;

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj('PostService', [
      'getPost',
      'updatePost',
    ]);

    mockLocationSpy = jasmine.createSpyObj(['back']);

    mockActivatedRouteSpy = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRouteSpy,
        },
        {
          provide: Location,
          useValue: mockLocationSpy,
        },
        {
          provide: PostService,
          useValue: mockPostService        
      }
      ],
      schemas:[NO_ERRORS_SCHEMA],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(PostDetailComponent);

    mockActivatedRouteSpy = TestBed.inject(ActivatedRoute);
    mockLocationSpy = TestBed.inject(Location);
    mockPostService= TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(of({
      id: 3,
      title: 'title',
      body: 'body',
      userId:3
    } as Post))
    fixture.detectChanges();

    // const element = fixture.debugElement.query(By.css('h2'))
    //   .nativeElement as HTMLElement;
    const element = fixture.nativeElement.querySelector(('h2')) as HTMLElement;
    
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  });
});
