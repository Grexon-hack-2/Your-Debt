import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalTotalPage } from './capital-total.page';

describe('CapitalTotalPage', () => {
  let component: CapitalTotalPage;
  let fixture: ComponentFixture<CapitalTotalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapitalTotalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
