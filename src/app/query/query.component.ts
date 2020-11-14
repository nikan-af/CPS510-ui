import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'query-component',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  script = "";
  tblColumns = [];
  isSelect = false;
  dataSource;
  tblData = [];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService) {

  }

  executeQuery() {
    const typeOfQuery = this.script.split(' ')[0];
    switch (typeOfQuery.toLowerCase()) {
      case 'select':
        this.isSelect = true;
        break;
    }
    this.dataService.executeScript(this.script).subscribe(success => {
      console.log(success);
      this.tblColumns = [];
      this.tblData = [];
      this.toastr.success('The query was executed successfully.');
      success['result']['metaData'].map(attr => {
        if (this.tblColumns.indexOf(attr['name']) < 0) {
          this.tblColumns.push(attr['name']);
        }
      })
      success['result']['rows'].map(row => {
        var object = {};
        this.tblColumns.map((column, i) => {
          object[`${column}`] = row[i];
        })
        this.tblData.push(object);
      })
      this.dataSource = new MatTableDataSource<Object>(this.tblData);
      this.dataSource.paginator = this.paginator;
      console.log(this.tblColumns);
      console.log(this.tblData);
    }, fail => {
      console.log(fail);
      this.toastr.error('Failed to execute the query.');
    });
    console.log(this.script);
  }

  reset() {
    this.isSelect = false;
    this.script = "";
  }
}
