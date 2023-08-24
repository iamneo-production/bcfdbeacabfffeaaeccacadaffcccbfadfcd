import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { currencyCountriesName } from '../../../shared/constant';

@Component({
  selector: 'lib-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.css']
})
export class CurrencyMainComponent implements OnInit {
  public currencyRates: any = [];
  public convertedRates: any = [];
  public currencyCountry: any = [];
  myForm: FormGroup;
  constructor(private http: HttpClient) { }

  ngOnInit() {

    // Simple GET request with response type <any>
    this.http.get<any>('https://api.exchangeratesapi.io/latest?base=USD').subscribe( data => {
    if(data){
        for (var key in data['rates']) {
          if (data['rates'].hasOwnProperty(key)) {
            this.currencyRates.push({ country: key, rate: data['rates'][key] })
          }
        }
      }
    })

    // make form value blank
    this.myForm = new FormGroup({
      amount: new FormControl(''),
      countryRates: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    let amount = form.value.amount
    let base = form.value.countryRates.rate
    let baseCountryCode = form.value.countryRates.country
    let rateConversion;
    let rates;
    this.convertedRates = []

    for (var key in currencyCountriesName) {
      if (currencyCountriesName.hasOwnProperty(key)) {
        this.currencyCountry.push({ code: key, name: currencyCountriesName[key] })
      }
    }
    for (let index = 0; index < this.currencyRates.length; index++) {
      const countryName = this.currencyRates[index].country === this.currencyCountry[index].code ? this.currencyCountry[index].name: "Not Available"
      const country = this.currencyRates[index].country;
      rates = parseFloat(this.currencyRates[index].rate).toFixed(2);
      rateConversion = (amount * rates)/ base;
      let parsedConversionRate = parseFloat(rateConversion).toFixed(2);
      this.convertedRates.push({ countryName: countryName, baseCountryCode: baseCountryCode,countryCode: country,baseCountryRate: rates, convertedCountryRate: parsedConversionRate })
    }
    this.resetForm()
  }

  resetForm(){
    this.myForm = new FormGroup({
      amount: new FormControl(''),
      countryRates: new FormControl('')
    });
  }
}
