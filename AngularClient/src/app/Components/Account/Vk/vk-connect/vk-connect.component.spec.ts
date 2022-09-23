import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VkConnectComponent } from './vk-connect.component';

describe('VkConnectComponent', () => {
  let component: VkConnectComponent;
  let fixture: ComponentFixture<VkConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VkConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VkConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
