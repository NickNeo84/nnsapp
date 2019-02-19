import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resp} from './resp';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    postData(resp: Resp, first: number, second: number){         
        const body = {answ: resp.num, one: first, two: second};
        // console.log(body);
        return this.http.post('http://localhost:8080/test', body); 
    }
}