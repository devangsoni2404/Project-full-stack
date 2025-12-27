import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMaster } from './test-master';

describe('TestMaster', () => {
  let component: TestMaster;
  let fixture: ComponentFixture<TestMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
