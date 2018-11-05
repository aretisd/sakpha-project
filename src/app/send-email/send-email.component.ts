import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  endpoint = 'https://us-central1-sakpha-thailand.cloudfunctions.net/httpEmail';

  constructor(private http: HttpClient) { }



  ngOnInit() {
  }

  sendEmail() {


    // const msg = {
    //   to: 'test@example.com',
    //   from: 'test@example.com',
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    // SGMail.send(msg);

    //  const url = `https://us-central1-sakpha-thailand.cloudfunctions.net/httpEmail`;
    //  const params: URLSearchParams = new URLSearchParams();
    //  const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    //  const options = new RequestOptions( { headers: headers } );

    //  params.set('to', 'noby8229@gmail.com');
    //  params.set('from', 'sakpha-thailand@gmail.com');
    //  params.set('subject', 'test-email');
    //  params.set('content', 'Hello World');

    //  return this.http.post(url, params, options)
    //                  .toPromise()
    //                  .then( res => {
    //                    console.log(res);
    //                  })
    //                  .catch(err => {
    //                    console.log(err);
    //                  });

    const data = {
      toEmail: 'noby8229@gmail.com',
      toName: 'Jeff Delaney'
    };
    this.http.post(this.endpoint, data).subscribe();
  }

}
