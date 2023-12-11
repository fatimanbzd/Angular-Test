import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';

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
      imports: [],
    });

    fixture = TestBed.createComponent(PostDetailComponent);

    mockActivatedRouteSpy = TestBed.inject(ActivatedRoute);
    mockLocationSpy = TestBed.inject(Location);
    mockPostService= TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should create', () => {});
});
