import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubApiService } from './github-api.service';
import { User, SearchResults } from './github-api.model';

describe('GithubApiService', () => {
      let injector: TestBed;
      let service: GithubApiService;
      let httpMock: HttpTestingController;
      
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [GithubApiService]
        });
        injector = getTestBed();
        service = injector.get(GithubApiService);
        httpMock = injector.get(HttpTestingController);
      });

      describe('#getUsers', () => {
        it('should return an Observable<User[]>', () => {
          const dummyUsers: User[] = [
            new User(0, 'John'),
            new User(1, 'Doe')
          ];

          service.getUsers().subscribe((users: any) => {
            console.log('Service executed, testing fake response');
            expect(users.length).toBe(2);
            expect(users).toEqual(dummyUsers);
          });

          const req = httpMock.expectOne(`${service.API_URL}/users`);
          expect(req.request.method).toBe('GET');
          req.flush(dummyUsers);
        });
      });
});
