import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';
  value1: string = ''; 
  value2: string = ''; 
  result: string =''; 
  r1:string="";
  amount1: number = 0; 
  today=new Date(); 
  handle(sortoption1: any,sortoption2: any,amount1: any){
    console.log(sortoption1,sortoption2,amount1);
    this.result=(Math.round((sortoption2/sortoption1)*amount1)).toFixed(2)
    this.r1=this.result;
     
  }
}