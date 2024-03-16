import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitPagePage } from './init-page.page';

describe('InitPagePage', () => {
  let component: InitPagePage;
  let fixture: ComponentFixture<InitPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InitPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
