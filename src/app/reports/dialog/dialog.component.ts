import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReportsComponent } from '../reports.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

export interface DialogData {
  id: string;
  status: string;
  date: string;
  price: number;
  remark: string;
  detailName: string;
  detailCount: string;
}
export interface Process {
  process: string;
  showProc: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  processes: Process[] = [
    {process: 'inprogress', showProc: 'In Process'},
    {process: 'ready', showProc: 'Ready to Pick'},
    {process: 'complete', showProc: 'Complete'}
];

  constructor(
    public dialogRef: MatDialogRef<ReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public db: AngularFireDatabase
  ) { }

  selectedProc: string;

  update(id, data) {
    console.log(id + '+' + data);
    const date = this.data.date;
    const day = date.slice(10, 15).split('/')[0];
    const month = date.slice(10, 15).split('/')[1];
    const year = date.slice(0, 4);
    console.log(day + month + year);
    this.db.list('OrderDetail/' + year + '/' + month + '/' + day).update(id, {status: data});
    alert('Update process of ' + id + ' is completed.');
    this.dialogRef.close();
  }

}
