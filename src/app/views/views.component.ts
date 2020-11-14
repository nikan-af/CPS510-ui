import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RecordUpdateDialog } from '../record-update-dialog/record-update-dialog.component';
import { RecordAddDialog } from '../add-record-dialog/add-record-dialog.component';

@Component({
  selector: 'user-control',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  usersColumns: string[] = ['USERID', 'FNAME', 'LNAME', 'PASSWORD', 'EMAIL', 'ADDRESS', 'TEL', 'USERTYPE', 'CREATEDAT', 'UPDATEDAT', 'DELETE', 'UPDATE'];
  guestsColumns: string[] = ['USERID', 'LOYALCUSTOMER', 'DISCOUNTRATE', 'DELETE', 'UPDATE'];
  staffColumns: string[] = ['USERID', 'TITLE', 'DEPARTMENT', 'MANAGERID', 'DELETE', 'UPDATE'];
  payratesColumns: string[] = ['TITLE', 'PAYRATE', 'DELETE', 'UPDATE'];
  roomsColumns: string[] = ['ROOMID', 'STAFFID', 'PRICE', 'BEDNUMBER', 'BATHNUMBER', 'WINDOWNUMBER', 'ROOMSTATUS', 'DELETE', 'UPDATE'];
  visitsColumns: string[] = ['RESERVEID', 'ROOMID', 'GUESTID', 'STATUS', 'ADULTSNUMBER', 'CHILDRENNUMBER', 'DEPOSIT', 'CHECKOUTTIME', 'CHECKINTIME', 'DELETE', 'UPDATE'];
  paymentsColumns: string[] = ['PAYMENTID', 'PAYMENTTYPE', 'AMOUNT', 'VISITID', 'TIMESTAMP', 'DELETE', 'UPDATE'];
  hotelservicesColumns: string[] = ['SERVICEID', 'STATUS', 'REQUIRESBOOKING', 'STAFFID', 'SERVICENAME', 'SERVICERATE', 'DELETE', 'UPDATE'];
  hotelservicesbookingsColumns: string[] = ['BOOKINGID', 'RESERVEID', 'SERVICEID', 'BOOKEDTO', 'BOOKEDFROM', 'DELETE', 'UPDATE'];

  users: Array<User> = new Array();
  guests: Array<Guest> = new Array();
  visits: Array<Visits> = new Array();
  staff: Array<Staff> = new Array();
  hotelservices: Array<HotelServices> = new Array();
  hotelservicesbookings: Array<HotelServicesBookings> = new Array();
  payments: Array<Payments> = new Array();
  rooms: Array<Rooms> = new Array();
  payrates: Array<PayRates> = new Array();

  dataSource;
  guestsDataSource;
  staffDataSource;
  payratesDataSource;
  roomsDataSource;
  visitsDataSource;
  paymentsDataSource;
  hotelservicesDataSource;
  hotelservicesbookingsDataSource;

  @ViewChild('users_paginator') users_paginator: MatPaginator;
  @ViewChild('guests_paginator') guests_paginator: MatPaginator;
  @ViewChild('staff_paginator') staff_paginator: MatPaginator;
  @ViewChild('payrates_paginator') payrates_paginator: MatPaginator;
  @ViewChild('rooms_paginator') rooms_paginator: MatPaginator;
  @ViewChild('visits_paginator') visits_paginator: MatPaginator;
  @ViewChild('payments_paginator') payments_paginator: MatPaginator;
  @ViewChild('hotelservices_paginator') hotelservices_paginator: MatPaginator;
  @ViewChild('hotelservicesbookings_paginator') hotelservicesbookings_paginator: MatPaginator;

  constructor(private dataService: DataService, private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit() {
    this.retrieveRecord();
  }

  deleteRecord(tblName, primaryKey, element) {
    console.log(tblName);
    console.log(primaryKey);
    console.log(element);

    var script = `DELETE FROM ${tblName} WHERE ${primaryKey} = '${element[primaryKey]}'`;
    console.log(script);
    this.dataService.deleteRecord(script).subscribe(
      success => {
        console.log(success);
        this[tblName].splice(this[tblName].indexOf(element), 1);
        switch (tblName) {
          case 'users':
            this.dataSource = new MatTableDataSource<User>(this.users);
            break;
          case 'guests':
            this.guestsDataSource = new MatTableDataSource<Guest>(this.guests);
            break;
          case 'staff':
            this.staffDataSource = new MatTableDataSource<Staff>(this.staff);
            break;
          case 'payrates':
            this.payratesDataSource = new MatTableDataSource<PayRates>(this.payrates);
            break;
          case 'rooms':
            this.roomsDataSource = new MatTableDataSource<Rooms>(this.rooms);
            break;
          case 'visits':
            this.visitsDataSource = new MatTableDataSource<Visits>(this.visits);
            break;
          case 'payments':
            this.paymentsDataSource = new MatTableDataSource<Payments>(this.payments);
            break;
          case 'hotelservices':
            this.hotelservicesDataSource = new MatTableDataSource<HotelServices>(this.hotelservices);
            break;
          case 'hotelservicesbookings':
            this.hotelservicesbookingsDataSource = new MatTableDataSource<HotelServicesBookings>(this.hotelservicesbookings);
            break;
        }
        this.toastr.success('Record was deleted.');
      },
      fail => {
        console.log(fail);
        this.toastr.error('Failed to delete the record.');
      }
    );
  }

  updateRecord(tblName, primaryKey, element): void {
    const dialogRef = this.dialog.open(RecordUpdateDialog, {
      width: '600px',
      data: {'tblName': tblName, 'primaryKey': primaryKey, 'formData': element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addRecord(tblName, primaryKey, includePK): void {
    var record = {};
    const columns = this[`${tblName}Columns`];

    for (var i = 0; i < columns.length; i++) {
      record[`${columns[i]}`] = '';
    }

    const dialogRef = this.dialog.open(RecordAddDialog, {
      width: '600px',
      data: {'tblName': tblName, 'primaryKey': primaryKey, 'includePK': includePK, 'formData': record}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  retrieveRecord() {
    this.dataService.getUsers().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.users.push({ USERID: record.USERID, FNAME: record.FNAME, LNAME: record.LNAME, PASSWORD: record.PASSWORD, EMAIL: record.EMAIL, ADDRESS: record.ADDRESS, TEL: record.TEL, USERTYPE: record.USERTYPE, CREATEDAT: record.CREATEDAT, UPDATEDAT: record.UPDATEDAT });
        });
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.users_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getGuests().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.guests.push({ USERID: record.USERID, LOYALCUSTOMER: record.LOYALCUSTOMER, DISCOUNTRATE: record.DISCOUNTRATE });
        });
        this.guestsDataSource = new MatTableDataSource<Guest>(this.guests);
        this.guestsDataSource.paginator = this.guests_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getStaff().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.staff.push({ USERID: record.USERID, TITLE: record.TITLE, DEPARTMENT: record.DEPARTMENT, MANAGERID: record.MANAGERID });
        });
        this.staffDataSource = new MatTableDataSource<Staff>(this.staff);
        this.staffDataSource.paginator = this.staff_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getPayRates().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.payrates.push({ TITLE: record.TITLE, PAYRATE: record.PAYRATE });
        });
        this.payratesDataSource = new MatTableDataSource<PayRates>(this.payrates);
        this.payratesDataSource.paginator = this.payrates_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getRooms().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.rooms.push({ ROOMID: record.ROOMID, STAFFID: record.STAFFID, PRICE: record.PRICE, BEDNUMBER: record.BEDNUMBER, BATHNUMBER: record.BATHNUMBER, WINDOWNUMBER: record.WINDOWNUMBER, ROOMSTATUS: record.ROOMSTATUS });
        });
        this.roomsDataSource = new MatTableDataSource<Rooms>(this.rooms);
        this.roomsDataSource.paginator = this.rooms_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getVisits().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.visits.push({ RESERVEID: record.RESERVEID, ROOMID: record.ROOMID, GUESTID: record.GUESTID, STATUS: record.STATUS, ADULTSNUMBER: record.ADULTSNUMBER, CHILDRENNUMBER: record.CHILDRENNUMBER, DEPOSIT: record.DEPOSIT, CHECKOUTTIME: record.CHECKOUTTIME, CHECKINTIME: record.CHECKINTIME });
        });
        this.visitsDataSource = new MatTableDataSource<Visits>(this.visits);
        this.visitsDataSource.paginator = this.visits_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getPayments().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.payments.push({ PAYMENTID: record.PAYMENTID, PAYMENTTYPE: record.PAYMENTTYPE, AMOUNT: record.AMOUNT, VISITID: record.VISITID, TIMESTAMP: record.TIMESTAMP });
        });
        this.paymentsDataSource = new MatTableDataSource<Payments>(this.payments);
        this.paymentsDataSource.paginator = this.payrates_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getHotelServices().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.hotelservices.push({ SERVICEID: record.SERVICEID, STATUS: record.STATUS, REQUIRESBOOKING: record.REQUIRESBOOKING, STAFFID: record.STAFFID, SERVICENAME: record.SERVICENAME, SERVICERATE: record.SERVICERATE });
        });
        this.hotelservicesDataSource = new MatTableDataSource<HotelServices>(this.hotelservices);
        this.hotelservicesDataSource.paginator = this.hotelservices_paginator;
      }, fail => {
        console.log(fail);
      }
    )

    this.dataService.getHotelServicesBookings().subscribe(
      success => {
        console.log(success);
        success['result'].map(record => {
          this.hotelservicesbookings.push({ BOOKINGID: record.BOOKINGID, SERVICEID: record.SERVICEID, RESERVEID: record.RESERVEID, BOOKEDTO: record.BOOKEDTO, BOOKEDFROM: record.BOOKEDFROM });
        });
        this.hotelservicesbookingsDataSource = new MatTableDataSource<HotelServicesBookings>(this.hotelservicesbookings);
        this.hotelservicesbookingsDataSource.paginator = this.hotelservicesbookings_paginator;
      }, fail => {
        console.log(fail);
      }
    )
  }
}

export interface UpdateDialogData {
  tblName: string;
  primaryKey: string;
  formData: [any]
}

export interface AddDialogData {
  tblName: string;
  primaryKey: string;
  includePK: boolean;
  formData: [any];
}

export interface User {
  USERID: string;
  FNAME: string;
  LNAME: string;
  PASSWORD: string;
  EMAIL: string;
  ADDRESS: string;
  TEL: string;
  USERTYPE: string;
  CREATEDAT: string;
  UPDATEDAT: string;
}

export interface Guest {
  USERID: string;
  LOYALCUSTOMER: string;
  DISCOUNTRATE: string;
}

export interface HotelServices {
  SERVICEID: string;
  STATUS: string;
  REQUIRESBOOKING: string;
  STAFFID: string;
  SERVICENAME: string;
  SERVICERATE: string;
}

export interface Visits {
  RESERVEID: string;
  ROOMID: string;
  GUESTID: string;
  STATUS: string;
  ADULTSNUMBER: string;
  CHILDRENNUMBER: string;
  DEPOSIT: string;
  CHECKOUTTIME: string;
  CHECKINTIME: string;
}

export interface Staff {
  USERID: string;
  TITLE: string;
  DEPARTMENT: string;
  MANAGERID: string;
}

export interface Rooms {
  ROOMID: string;
  STAFFID: string;
  PRICE: string;
  BEDNUMBER: string;
  BATHNUMBER: string;
  WINDOWNUMBER: string;
  ROOMSTATUS: string;
}

export interface PayRates {
  TITLE: string;
  PAYRATE: string;
}

export interface Payments {
  PAYMENTID: string;
  PAYMENTTYPE: string;
  AMOUNT: string;
  VISITID: string;
  TIMESTAMP: string;
}

export interface HotelServicesBookings {
  BOOKINGID: string;
  SERVICEID: string;
  RESERVEID: string;
  BOOKEDTO: string;
  BOOKEDFROM: string;
}


