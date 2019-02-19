import { Component } from '@angular/core';
import {Resp} from './resp';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {
  title = 'myapp';

  resp: Resp=new Resp();

  receivedResp: Resp;

  done: boolean = false;
  
  constructor(private httpService: HttpService){}

  sign = 'Сложи 2 числа: ';
  firstNumber = Math.floor(Math.random() * 1000);
  secondNumber = Math.floor(Math.random() * 1000);

  submit(resp: Resp, one: number, two: number){
    this.httpService.postData(resp, one, two)
            .subscribe(
                (data: Resp) => {this.receivedResp=data; this.done=true;},
                error => console.log(error)
            );
}
}
