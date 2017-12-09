import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPostComponent } from './video-post.component';

describe('VideoPostComponent', () => {
  let component: VideoPostComponent;
  let fixture: ComponentFixture<VideoPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
