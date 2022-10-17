import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G2048Component } from './g2048.component';

describe('G2048Component', () => {
  let component: G2048Component;
  let fixture: ComponentFixture<G2048Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ G2048Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(G2048Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
