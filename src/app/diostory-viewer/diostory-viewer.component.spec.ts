import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiostoryViewerComponent } from './diostory-viewer.component';

describe('DiostoryViewerComponent', () => {
  let component: DiostoryViewerComponent;
  let fixture: ComponentFixture<DiostoryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiostoryViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiostoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
