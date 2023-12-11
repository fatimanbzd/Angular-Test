import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/services/post/post.service';

describe('PostService (HttpClientTestingModule)', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;
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
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    postService = TestBed.inject(PostService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getPosts()', () => {
    it('should return getPosts() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS);
        done();
      });
        
      const requests = httpTestingController.expectOne( 'https://jsonplaceholder.typicode.com/posts');

      requests.flush(POSTS);

      expect(requests.request.method).toBe('GET');
    });
  });

  describe('getPost()', () => {
    it('should return single post when getPost() is called', (done: DoneFn) => {
        postService.getPost(1).subscribe();
        done();

        const request = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      expect(request.request.method).toBe('GET');
    });
  });

  afterEach(() => {
    httpTestingController.verify()
  });
});
