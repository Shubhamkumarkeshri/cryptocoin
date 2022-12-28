import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CryptoServiceService } from '../Service/crypto-service.service';

@Component({
  selector: 'app-coin-market-detail',
  templateUrl: './coin-market-detail.component.html',
  styleUrls: ['./coin-market-detail.component.scss']
})
export class CoinMarketDetailComponent implements OnInit {

  displayedColumns: string[] = ['price', 'exchange', 'pair', 'volume'];
  dataSource = new MatTableDataSource<any>();
  cryptoDetails: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cryptoService: CryptoServiceService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = this.dialogData.CoinMarketDetails;
    this.cryptoDetails = this.dialogData.CoinDetail;
  }
}
