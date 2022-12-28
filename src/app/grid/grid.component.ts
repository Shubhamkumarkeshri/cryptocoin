import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { CryptoServiceService } from '../Service/crypto-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CoinMarketDetailComponent } from '../coin-market-detail/coin-market-detail.component';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', minHeight: "*"})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GridComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = [];
  columnsToDisplay = ['rank', 'name', 'price', 'marketCap', 'volume', 'availableSupply', 'priceChange1d', 'priceChange1h', 'priceChange1w'];
  // column = [
  //   {
  //     name: 'rank',
  //     displayname : 'Rank'
  //   },
  //   {
  //     name: 'name',
  //     displayname : 'Name'
  //   },
  //   {
  //     name: 'price',
  //     displayname : 'Price'
  //   },
  //   {
  //     name: 'marketCap',
  //     displayname : 'Market Cap'
  //   },
  //   {
  //     name: 'volume',
  //     displayname : 'Volume'
  //   },
  //   {
  //     name: 'availableSupply',
  //     displayname : 'Available Supply'
  //   },
  //   {
  //     name: 'priceChange1d',
  //     displayname : 'Price Change(1d)'
  //   },
  //   {
  //     name: 'priceChange1h',
  //     displayname : 'Price Change(1h)'
  //   },
  //   {
  //     name: 'priceChange1w',
  //     displayname : 'Price Change(1w)'
  //   },
  // ];
  expandedElement: any | null;

  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageInitialVal = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;

  constructor(
    private _cryptoService : CryptoServiceService, 
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort as any;
  }

  ngOnInit(): void {
    this.getCoindata();
  }

  getCoindata(){
    this._cryptoService.getCoins(this.pageInitialVal, this.pageSize).subscribe((result)=>{
      if(result){
        this.dataSource = result.coins;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageInitialVal = e.pageSize * e.pageIndex;
    this.getCoindata();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
    this.getCoindata();
  }

  getMarketData(element: any){
    let id = element.id;
    this._cryptoService.getmarkets(id).subscribe((result) =>{
      let data = result;

      this.dialog.open(CoinMarketDetailComponent, {
        disableClose: true,
        autoFocus: false,
        data: {
          CoinDetail : element,
          CoinMarketDetails : data,
        },
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'full-screen-modal',
      });
    })
  }

  onSortChange(event: Sort) {
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    const data = this.dataSource.slice();
    if (!event.active || event.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource= data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'rank':
          return this.compare(a['rank'], b['rank'], isAsc);
        case 'name':
          return this.compare(a['name'], b['name'], isAsc);
        case 'price':
          return this.compare(a['price'], b['price'], isAsc);
        case 'marketCap':
          return this.compare(a['marketCap'], b['marketCap'], isAsc);
        case 'volume':
          return this.compare(a['volume'], b['volume'], isAsc);
        case 'availableSupply':
          return this.compare(a['availableSupply'], b['availableSupply'], isAsc);
        case 'priceChange1d':
          return this.compare(a['priceChange1d'], b['priceChange1d'], isAsc);
        case 'priceChange1h':
          return this.compare(a['priceChange1h'], b['priceChange1h'], isAsc);
        case 'priceChange1w':
          return this.compare(a['priceChange1w'], b['priceChange1w'], isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}