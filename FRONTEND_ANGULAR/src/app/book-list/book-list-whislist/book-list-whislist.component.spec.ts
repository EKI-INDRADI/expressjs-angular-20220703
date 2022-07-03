import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListWhislistComponent } from './book-list-whislist.component';

describe('BookListWhislistComponent', () => {
  let component: BookListWhislistComponent;
  let fixture: ComponentFixture<BookListWhislistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListWhislistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListWhislistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
