import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDialogData } from '../views/views.component';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'record-update-dialog',
  styleUrls: ['./add-record-dialog.component.css'],
  templateUrl: './add-record-dialog.component.html'
})
export class RecordAddDialog {
  tempData: AddDialogData;
  FIELDS = {
    'users': ['FNAME', 'LNAME', 'PASSWORD', 'EMAIL', 'ADDRESS', 'TEL', 'USERTYPE'],
    'guests': ['USERID', 'LOYALCUSTOMER', 'DISCOUNTRATE'],
    'staff': ['USERID', 'TITLE', 'DEPARTMENT', 'MANAGERID'],
    'payrates': ['TITLE', 'PAYRATE'],
    'rooms': ['ROOMID', 'STAFFID', 'PRICE', 'BEDNUMBER', 'BATHNUMBER', 'WINDOWNUMBER', 'ROOMSTATUS'],
    'visits': ['ROOMID', 'GUESTID', 'STATUS', 'ADULTSNUMBER', 'CHILDRENNUMBER', 'DEPOSIT', 'CHECKOUTTIME', 'CHECKINTIME'],
    'payments': ['PAYMENTTYPE', 'AMOUNT', 'VISITID', 'TIMESTAMP'],
    'hotelservices': ['STATUS', 'REQUIRESBOOKING', 'STAFFID', 'SERVICENAME', 'SERVICERATE'],
    'hotelservicesbookings': ['RESERVEID', 'SERVICEID', 'BOOKEDTO', 'BOOKEDFROM']
  }
  fieldNames;

  constructor(
    public dialogRef: MatDialogRef<RecordAddDialog>, @Inject(MAT_DIALOG_DATA) public data: AddDialogData, private dataService: DataService, private toastr: ToastrService) {
      this.tempData = {...data};
      this.fieldNames = Object.keys(this.tempData['formData']);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRecord() {
    var script = `INSERT INTO ${this.tempData.tblName}(` + this.FIELDS[this.tempData.tblName].join(',') + ') VALUES(';
    for (var i = 0; i < this.FIELDS[this.tempData.tblName].length; i++) {
        script += `'${this.tempData.formData[this.FIELDS[this.tempData.tblName][i]]}'`;
        if (i+1 < this.FIELDS[this.tempData.tblName].length) script += ', ';
    }
    script += ') ';

    console.log(script);
    console.log('inserting the record');

    this.dataService.executeScript(script).subscribe(
      success => {
        this.dialogRef.close({'status': 'success', 'formData': this.tempData['formData']});
        this.toastr.success('Record was inserted into ' + this.tempData['tableName'] + '.');
      }, fail => {
        this.toastr.error('Failed insert the record into ' + this.tempData['tableName'] + '.');
      }
    )
  }

  resetForm() {
    // this.dataService.getUser(this.data['user'].id).subscribe(
    //   success => {
    //     console.log(success['message'][0]);
    //     this.tempData['user']['id'] = success['message'][0]['_id'];
    //     this.tempData['user']['fullName'] = success['message'][0]['fullName'];
    //     this.tempData['user']['emailAddress'] = success['message'][0]['email'];
    //     this.tempData['user']['userGroup'] = 'User';
    //     this.tempData['user']['isAdmin'] = success['message'][0]['isAdmin'];
    //     this.tempData['user']['createdAt'] = success['message'][0]['createdAt'];
    //     this.tempData['user']['updatedAt'] = success['message'][0]['updatedAt'];
    //   },
    //   fail => {
    //     console.log(fail);
    //   }
    // );
    // this.tempData = this.data;
  }

}
