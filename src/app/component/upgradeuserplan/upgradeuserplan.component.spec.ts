import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeuserplanComponent } from './upgradeuserplan.component';

describe('UpgradeuserplanComponent', () => {
  let component: UpgradeuserplanComponent;
  let fixture: ComponentFixture<UpgradeuserplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeuserplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeuserplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
