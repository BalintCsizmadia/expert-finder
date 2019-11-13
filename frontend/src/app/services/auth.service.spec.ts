import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should get user from localStorage', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user = createUser('0', 'false');
    localStorage.setItem('user', user.id);
    localStorage.setItem('isLoggedIn', user.isLoggedIn);
    const userFromLocalStorage = service.getCurrentUser();
    expect(user).toEqual(userFromLocalStorage);
  });

  it('should remove user from localStorage', () => {
    const service: AuthService = TestBed.get(AuthService);
    const user = createUser('0', 'false');
    localStorage.setItem('user', user.id);
    localStorage.setItem('isLoggedIn', user.isLoggedIn);
    const userFromLocalStorage = service.getCurrentUser();
    expect(user).toEqual(userFromLocalStorage);
    service.removeUserFromLocalStorage();
    expect(service.getCurrentUser()).toEqual(createUser(null, null));
  });

  function createUser(id: string | null, isLoggedIn: string | null) {
    return { id, isLoggedIn };
  }

});
