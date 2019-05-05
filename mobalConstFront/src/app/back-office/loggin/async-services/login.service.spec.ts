import { LoginService } from './login.service';
import { TestBed, inject } from '@angular/core/testing';

describe('AuthentificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});