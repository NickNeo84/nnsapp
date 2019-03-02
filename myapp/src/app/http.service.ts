import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resp} from './resp';
import {Answ} from './answ';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    postData(answ: Answ, first: number, second: number){         
        const body = {answ: answ.num, one: first, two: second};
        // console.log(body);
        return this.http.post('/test', body); 
    }

    postNumber(num: number){
        const body = {'num': num};
        return this.http.post('/num', body);
    }

    postTextNumber(num: number){
        const body = {'num':num};
        return this.http.post('/textNum', body);
    }
}