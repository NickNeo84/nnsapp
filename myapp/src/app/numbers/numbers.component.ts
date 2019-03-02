import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Answ} from '../answ';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
  providers: [HttpService]
})
export class NumbersComponent implements OnInit {

  number: number = Math.floor(Math.random() * 999);
  done: boolean = false;
  receivedResp: string;
  butAvailable: boolean = true;
  receivedCss: string;
  textNumber: Answ = {'num':""};

  myForm : FormGroup = new FormGroup({             
    answer: new FormControl()
  });

  constructor( private http: HttpService) { }

  getTextNum(num: number){
    console.log(this.number);
    this.http.postTextNumber(num).subscribe((value: Answ) =>{
       this.textNumber = value;
    })
  }

  anewer(num: number){
    this.butAvailable = false;
    this.http.postNumber(num).subscribe(value =>{
      if(+value == this.number){
        this.receivedResp = "Правильно!";
        this.receivedCss = "truetype";       
      } else{
        this.receivedResp = "Не верно!";
        this.receivedCss = "falsetype";  
      }
      this.done = true;
      this.timeoutFunc(2000);

    });

  };

  @ViewChild("answ") nameField: any;
  focusFild(): void {
    this.nameField.nativeElement.focus();
  }

  timeoutFunc(time: number){
    setTimeout(()=>{
      if (this.receivedResp == "Правильно!"){ 
        //если правильно то новое задание
        this.number = Math.floor(Math.random() * 999);
      }else {
        //если не верно то стираем ответ
        null;
      };
        this.myForm.patchValue({
          answer: null
        })
        this.done = false;
        this.focusFild();
        this.butAvailable = true;
        this.getTextNum(this.number);
      },time,[]);
   }

  ngOnInit() {
     this.getTextNum(this.number);
  };

}
