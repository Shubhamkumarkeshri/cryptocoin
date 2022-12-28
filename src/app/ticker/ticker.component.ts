import { Component, OnInit } from '@angular/core';
import { CryptoServiceService } from '../Service/crypto-service.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ListOfExchanges = ['bitcoin', 'ethereum', 'tether', 'usd-coin', 'binance-coin'];
  // listOfMarket: any = [];
  cardList: any = [];

  constructor(private _cryptoService : CryptoServiceService) { }

  ngOnInit(): void {
    for(let item of this.ListOfExchanges){
      this.getMarket(item);
    }
  }

  getMarket(id: string){
    this._cryptoService.getmarkets(id).subscribe((result) => {
      if(result){
        let data: any = result;
        // this.listOfMarket.push(data[0]);
        this.getTicker(data[0].exchange, data[0].pair);
      }
    })
  }

  getTicker(exchange: any, pair: string){
    pair = pair.replace("/","-");
    this._cryptoService.getTicker(exchange, pair).subscribe((result) => {
      if(result){
        this.cardList.push(result.tickers[0]);
        console.log(this.cardList);
      }
    })
  }
}
