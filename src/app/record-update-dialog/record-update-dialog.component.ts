import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateDialogData } from '../views/views.component';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'record-update-dialog',
  styleUrls: ['./record-update-dialog.component.css'],
  templateUrl: './record-update-dialog.component.html'
})
export class RecordUpdateDialog {
  tempData: UpdateDialogData;
  fieldNames;

  constructor(
    public dialogRef: MatDialogRef<RecordUpdateDialog>, @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData, private dataService: DataService, private toastr: ToastrService) {
      this.tempData = {...data};
      this.fieldNames = Object.keys(this.tempData['formData']);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateRecord() {
    var script = `UPDATE ${this.tempData.tblName} SET `
    for (var i = 0; i < this.fieldNames.length; i++) {
      if (this.fieldNames[i] !== 'CREATEDAT' && this.fieldNames[i] !== 'UPDATEDAT' && this.fieldNames[i] !== 'TIMESTAMP') {
        script += this.fieldNames[i] + ' = ' + `'${this.tempData['formData'][this.fieldNames[i]]}'`;
        if (i+1 < this.fieldNames.length && this.fieldNames[i+1] !== 'CREATEDAT' && this.fieldNames[i+1] !== 'UPDATEDAT' && this.fieldNames[i+1] !== 'TIMESTAMP') script += ', '
      }
    }
    script += ' WHERE ' + this.tempData.primaryKey + ' = ' + `'${this.tempData['formData'][this.tempData.primaryKey]}'`;

    console.log(script);
    console.log('updating the record');

    this.dataService.executeScript(script).subscribe(
      success => {
        this.dialogRef.close();
        this.toastr.success(this.tempData['tableName'] + ' was updated.');
      }, fail => {
        this.toastr.error('Failed to update ' + this.tempData['tableName']);
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
