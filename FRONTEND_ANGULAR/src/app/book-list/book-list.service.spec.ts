import { TestBed } from '@angular/core/testing';

import { BookListService } from './book-list.service';

describe('BookListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookListService = TestBed.get(BookListService);
    expect(service).toBeTruthy();
  });
});
