import {Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {MatTableDataSource} from '@angular/material';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  email: string;
  date: string;
  status: string;
  mobile: string;
  price: string;
  id: string;
  remark: string;
}
export interface DialogData {
  id: string;
  status: string;
  date: string;
  price: number;
  remark: string;
  detailName: string;
  detailCount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {date: '1', status: 'NaN', email: 'Hydrogen', mobile: '000', price: 'H'}
];

const DetailList = [];
const DetailCount = [];


/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})



export class ReportsComponent implements OnInit {

  orderList: AngularFireList<any>;
  mapTag: AngularFireList<any>;
  dataSource: any;
  selectedProc: string;

  displayedColumns: string[] = ['date', 'status', 'email', 'mobile', 'price', 'remark'];

  jsonObj = {
    date: '',
    status: '',
    email: '',
    mobile: '',
    price: '',
    remark: ''
  };
  order: any[];
  objectKey: any[];
  objectKey2: any[];
  detailCount: any[];
  detailName: any[];

  constructor(
    private db: AngularFireDatabase,
    public dialog: MatDialog
    // private http: Http
  ) { }

  ngOnInit() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const hour = now.getUTCHours();
    const min = now.getUTCMinutes();
    const timestamp = hour + ':' + min + '-' + day + '/' + month;

    // console.log(timestamp);

    // this.orderListRef = db.list('items');
    this.db.list('OrderDetail/').snapshotChanges(['child_added']).subscribe(yearRef => {
      yearRef.forEach(yearList => {
      // console.log(monthList.type);
      // console.log(monthList.key);
      const keyYear = yearList.key;
      // console.log('keyYear - ' + keyYear);
      // console.log(monthList.payload.val());

      this.db.list('OrderDetail/' + keyYear).snapshotChanges(['child_added']).subscribe(monthRef => {
        monthRef.forEach(monthList => {
          const keyMonth = monthList.key;
          // console.log('keyMonth = ' + keyMonth);

          this.db.list('OrderDetail/' + keyYear + '/' + keyMonth + '/').snapshotChanges(['child_added']).subscribe(dayRef => {
            dayRef.forEach(dayList => {
              const keyDay = dayList.key;
              // console.log('keyDay ==> ' + keyDay);

              this.db.list('OrderDetail/' + keyYear + '/' + keyMonth + '/' + '/' + keyDay)
              .snapshotChanges(['child_added']).subscribe(orderListRef => {
                orderListRef.forEach(orderList => {
                  const orderListKey = orderList.key;
                  // console.log('orderKey ===> ' + orderListKey);

                  this.db.list('OrderDetail/' + keyYear + '/' + keyMonth + '/' + '/' + keyDay + '/' + orderListKey)
                  .snapshotChanges(['child_added']).subscribe(orderRef => {
                    orderRef.forEach(snap => {
                      const snapKey = snap.key;
                      const snapVal = snap.payload.val();
                      if (snapKey === 'timestamp') {
                        this.jsonObj.date = keyYear + '/' + keyMonth + ' | ' + snapVal;
                        // console.log('WRITE status - '+this.jsonObj);
                        // console.log('status = '+this.jsonObj.position);
                        // console.log('position ==: ' + this.jsonObj.date + ' | email: ' + this.jsonObj.email +
                        // ' | mobile: ' + this.jsonObj.mobile + ' | remark: ' + this.jsonObj.remark + ' | price: ' + this.jsonObj.price +
                        // ' | id: ' + orderListKey);
                        ELEMENT_DATA.unshift({
                          date: this.jsonObj.date,
                          status: this.jsonObj.status,
                          email: this.jsonObj.email,
                          mobile: this.jsonObj.mobile,
                          price: this.jsonObj.price,
                          id: orderListKey,
                          remark: this.jsonObj.remark
                        });
                      } else if (snapKey === 'status') {
                        this.jsonObj.status = '' + snapVal;
                        // this.jsonObj.setElement(this.jsonObj.date,this.jsonObj.email,this.jsonObj.mobile,this.jsonObj.price);

                      } else if (snapKey === 'email') {
                        this.jsonObj.email = '' + snapVal;
                        // console.log('WRITE email - '+this.jsonObj);
                        // console.log('email = '+this.jsonObj.email);
                      } else if (snapKey === 'mobile') {
                        this.jsonObj.mobile = '' + snapVal;
                        // console.log('WRITE mobile - '+this.jsonObj);
                        // console.log('mobile = ' + this.jsonObj.mobile);
                      } else if (snapKey === 'price') {
                        this.jsonObj.price = '' + snapVal;
                        // console.log('WRITE price - '+this.jsonObj);
                        // console.log('price = '+this.jsonObj.price);
                      } else if ( snapKey === 'remark') {
                        this.jsonObj.remark = '' + snapVal;
                      } else if ( snapKey === 'detail') {
                        // this.jsonObj.detail = '' + snapVal;
                        // console.log('Order Detail =====>' + this.jsonObj.detail);
                      }

                      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
                      // console.log(snapKey+' - '+ snapVal);
                    });
                  });
                });
              });
              });
            });
          });
        });
      });
    });

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    // console.log(ELEMENT_DATA);

  }

  statusBtnClick(key, process, date, price, remark) {
    // console.log(key + process);
    const day = date.slice(10, 15).split('/')[0];
    const month = date.slice(10, 15).split('/')[1];
    const year = date.slice(0, 4);
    this.db.list(
      'OrderDetail/' + year + '/' + month + '/' + day + '/' + key + '/detail'
      ).valueChanges().subscribe((res: any[]) => {
        this.order = res;
        // console.log(this.order);
        this.objectKey = Object.keys(this.order).map(index => {
          const data = this.order[index];
          this.detailName = data;
          // console.log(this.detailName);
          Object.keys(this.detailName).forEach(function(childsnapshot) {
            DetailList.push(childsnapshot);
            console.log(DetailList);
          });
          Object.keys(this.detailName).map(index2 => {
            const data2 = data[index2];
            DetailCount.push(data2);
            console.log(DetailCount);
          });
        });
      });

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        id: key,
        status: process,
        date: date,
        price: price,
        remark: remark,
        detailName: DetailList,
        detailCount: DetailCount
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedProc = result;
      console.log('UPDATE TO: ' + result);
      // process = result;
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  test() {}
}
