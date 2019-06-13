import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedComponent } from './mentioned.component';

describe('MentionedComponent', () => {
  let component: MentionedComponent;
  let fixture: ComponentFixture<MentionedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
