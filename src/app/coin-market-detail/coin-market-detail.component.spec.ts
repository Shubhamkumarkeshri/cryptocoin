import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinMarketDetailComponent } from './coin-market-detail.component';

describe('CoinMarketDetailComponent', () => {
  let component: CoinMarketDetailComponent;
  let fixture: ComponentFixture<CoinMarketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinMarketDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinMarketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
