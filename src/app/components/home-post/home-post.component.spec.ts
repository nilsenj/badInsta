import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostComponent } from './home-post.component';

describe('HomePostComponent', () => {
  let component: HomePostComponent;
  let fixture: ComponentFixture<HomePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
