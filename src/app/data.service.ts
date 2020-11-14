import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  redirectUrl: string;
  baseUrl: string = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  createTable(tableName) {
    return this.httpClient.post(this.baseUrl + '/createTable', { 'tableName': tableName });
  }

  createAll() {
    return this.httpClient.get(this.baseUrl + '/createAll');
  }

  deleteTable(tblName) {
    return this.httpClient.post(this.baseUrl + '/deleteTable', { 'tableName': tblName });
  }

  deleteRecord(script) {
    return this.httpClient.post(this.baseUrl + '/deleteRecord', { 'script': script });
  }

  deleteAll() {
    return this.httpClient.get(this.baseUrl + '/deleteAll');
  }

  getUsers() {
    return this.httpClient.get(this.baseUrl + '/getUsers');
  }

  getGuests() {
    return this.httpClient.get(this.baseUrl + '/getGuests');
  }

  getStaff() {
    return this.httpClient.get(this.baseUrl + '/getStaff');
  }

  getPayRates() {
    return this.httpClient.get(this.baseUrl + '/getPayRates');
  }

  getRooms() {
    return this.httpClient.get(this.baseUrl + '/getRooms');
  }

  getVisits() {
    return this.httpClient.get(this.baseUrl + '/getVisits');
  }

  getPayments() {
    return this.httpClient.get(this.baseUrl + '/getPayments');
  }

  getHotelServices() {
    return this.httpClient.get(this.baseUrl + '/getHotelServices');
  }

  getHotelServicesBookings() {
    return this.httpClient.get(this.baseUrl + '/getHotelServicesBookings');
  }

  populateTable(tblName) {
    return this.httpClient.post(this.baseUrl + '/populateTable', { 'tableName': tblName });
  }

  populateAll() {
    return this.httpClient.get(this.baseUrl + '/populateAll');
  }

  executeScript(script) {
    console.log('here');
    return this.httpClient.post(this.baseUrl + '/executeScript', { 'script': script });
  }
}
