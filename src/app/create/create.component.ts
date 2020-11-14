import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'create-component',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  tablesSelected = {
    Users: false,
    Guests: false,
    Staff: false,
    Rooms: false,
    Visits: false,
    Payments: false,
    PayRates: false,
    HotelServices: false,
    HotelServicesBookings: false
  }

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  createTable(tableName) {
    console.log(tableName);
    this.dataService.createTable(tableName).subscribe(
      success => {
        this.toastr.success(tableName + ' was created.');
        console.log(success);
      },
      fail => {
        console.log(fail);
        this.toastr.error('Failed to create the table.');
      }
    )
  }

  createAll() {
    this.dataService.createAll().subscribe(
      success => {
        this.toastr.success('All tables were created.');
        console.log(success);
      },
      fail => {
        console.log(fail);
        this.toastr.error('Failed to create the tables.');
      }
    )
  }

  deleteTable(tblName) {
    this.dataService.deleteTable(tblName).subscribe(
      success => {
        this.toastr.success(tblName + ' was deleted.');
        console.log(success);
      },
      fail => {
        console.log(fail);
        this.toastr.error('Failed to delete the table.');
      }
    )
  }

  populateTable(tblName) {
    this.dataService.populateTable(tblName).subscribe(success => {
      console.log(success);
      this.toastr.success(tblName + ' was populated.');
    }), fail => {
      console.log(fail);
      this.toastr.error('Failed to populate the table.');
    }
  }

  populateAll() {
    this.dataService.populateAll().subscribe(success => {
      console.log(success);
      this.toastr.success('All tables were populated.');
    }, fail => {
      console.log(fail);
      this.toastr.error('Failed to populate the tables.');
    })
  }

  deleteAll() {
    this.dataService.deleteAll().subscribe(
      success => {
        this.toastr.success('All tables were deleted.');
        console.log(success);
      },
      fail => {
        console.log(fail);
        this.toastr.error('Failed to delete the tables.');
      }
    )
  }
}
