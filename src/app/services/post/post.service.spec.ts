import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('Post Service', () => {
  let postService: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let POSTS = [
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
    beforeEach(() => {
      
        httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [PostService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
            }]
        });
        postService = TestBed.inject(PostService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>; ;
  });

  describe('getPosts()', () => {
    it('should  return expected posts when getPosts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: (posts) => {
          done();
          expect(posts).toEqual(POSTS);
        },
          error: () => {
              done.fail();
        },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
