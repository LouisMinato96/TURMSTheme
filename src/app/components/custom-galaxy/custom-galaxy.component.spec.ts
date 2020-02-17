import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGalaxyComponent } from './custom-galaxy.component';

describe('CustomGalaxyComponent', () => {
  let component: CustomGalaxyComponent;
  let fixture: ComponentFixture<CustomGalaxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGalaxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
