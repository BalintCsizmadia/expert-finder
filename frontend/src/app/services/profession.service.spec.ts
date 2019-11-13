import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfessionService } from './profession.service';

describe('ProfessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ProfessionService = TestBed.get(ProfessionService);
    expect(service).toBeTruthy();
  });
});
