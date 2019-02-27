import { Component, OnInit, ViewChild } from '@angular/core';
import {Resp} from '../resp';
import {HttpService} from '../http.service';
import {Answ} from '../answ';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css'],
  providers: [HttpService]
})
export class QuestComponent implements OnInit {
  title: string = 'myapp';
  done: boolean = false;
  receivedResp: Resp;
  userSingCom: number = 2;
  sign: string = 'Сложи 2 числа: ';
  signId:number = 1;
  firstNumber = Math.floor(Math.random() * 80);
  secondNumber = Math.floor(Math.random() * (100-this.firstNumber));
  statistics: number = 0;
  butAvailable: boolean = true;

  answ: Answ=new Answ(); 
   
  constructor(private httpService: HttpService) { }

  setNumber(userSign: number){
    // console.log(userSign)
    this.userSingCom = userSign;
    if (this.signId == 1){
      this.sign = 'Сложи 2 числа: ';
      if (userSign == 2){
        this.firstNumber = Math.floor(Math.random() * 80);
        this.secondNumber = Math.floor(Math.random() * (100-this.firstNumber));
      } else{
        this.firstNumber = Math.floor(Math.random() * 800);
        this.secondNumber = Math.floor(Math.random() * (1000-this.firstNumber));
      };
    } 
    else {
      this.sign = 'Вычти из первого числа второе: ';
      if (userSign == 2){
        this.firstNumber = Math.floor(Math.random() * 99);
        this.secondNumber = this.firstNumber-Math.floor(Math.random() * (this.firstNumber));
      } else{
        this.firstNumber = Math.floor(Math.random() * 999);
        this.secondNumber = this.firstNumber-Math.floor(Math.random() * (this.firstNumber));
      };
    }
  };

  setSign(signId: number){
    this.signId = signId;
    this.setNumber(this.userSingCom);
  };

  answer(answ: Answ, one: number, two: number){
    this.butAvailable = false;
    if (this.signId == 1){
    this.httpService.postData(answ, one, two)
            .subscribe(
                (data: Resp) => {
                  this.receivedResp=data; this.done=true;
                      setTimeout(()=>{
                        if (this.receivedResp.checkID){ 
                          //если правильно то новое задание
                          this.setNumber(this.userSingCom);
                          this.statistics += 1;
                        }else {
                          //если не верно то стираем ответ
                          null;
                        };
                          this.answ.num = null;
                          this.done = false;
                          this.focusFild();
                          this.butAvailable = true;
                        },3000,[]);
                        
                },
                error => console.log(error)
            );
     } else if (this.signId == 2){
      console.log('userSign')
     }         
  };

  @ViewChild("inp") nameField: any;
  focusFild(): void {
    this.nameField.nativeElement.focus();
  }

  ngOnInit() {
  }

}
