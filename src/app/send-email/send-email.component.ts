import { Component, OnInit } from '@angular/core';
import { HttpModule, Headers, Response, URLSearchParams, RequestOptions, Http } from '@angular/http';
// import { toPromise } from 'rxjs/add/operator/';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/Rx';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor(private http: Http) { }


  ngOnInit() {
  }

  sendEmail() {

    const url = `https://us-central1-sakpha-thailand.cloudfunctions.net/httpEmail`;
    const params: URLSearchParams = new URLSearchParams();
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = new RequestOptions( { headers: headers } );

    params.set('to', 'noby8229@gmail.com');
    params.set('from', 'sakpha-thailand@gmail.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');

    return this.http.post(url, params, options)
                    .toPromise()
                    .then( res => {
                      console.log(res);
                    })
                    .catch(err => {
                      console.log(err);
                    });

  }

}
