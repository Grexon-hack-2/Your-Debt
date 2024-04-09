import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OthersDebtsPage } from './others-debts.page';

describe('OthersDebtsPage', () => {
  let component: OthersDebtsPage;
  let fixture: ComponentFixture<OthersDebtsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersDebtsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
