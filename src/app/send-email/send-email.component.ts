import { Component, OnInit } from '@angular/core';
import { HttpModule, Headers, Response, URLSearchParams, RequestOptions, Http } from '@angular/http';
// import { toPromise } from 'rxjs/add/operator/';
// import { Observable } from 'rxjs';
 import 'rxjs/add/operator/toPromise';
// import 'rxjs/Rx';
import * as SGMail from '@sendgrid/mail';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor(private http: Http) { }
  // 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


  ngOnInit() {
  }

  sendEmail() {

    // SGMail.setApiKey('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');
    // const msg = {
    //   to: 'test@example.com',
    //   from: 'test@example.com',
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    // SGMail.send(msg);

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
