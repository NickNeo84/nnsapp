import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resp} from './resp';
import {Answ} from './answ';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    postData(answ: Answ, first: number, second: number, bonus: number = 1){         
        const body = {answ: answ.num, one: first, two: second, bonus: bonus};
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

    setPoints(points: number){
        var body = {'points': points};
        return this.http.post('/setPoints', body);
    }

    getPoints(){
        return this.http.get('/getPoints');
    }
}