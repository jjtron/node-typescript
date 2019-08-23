import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNgContentComponent } from './demo-ng-content.component';

describe('DemoNgContentComponent', () => {
  let component: DemoNgContentComponent;
  let fixture: ComponentFixture<DemoNgContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoNgContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
