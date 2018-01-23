import {Injectable} from '@angular/core';

@Injectable()
export class AttendanceTokenService {

    constructor() {
    }

    getAttendanceToken() {
        return 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL3NhYXMuaHIuY29tXC91c2VyXC91c2Vyc1wvYXV0aGVudGljYXRlIiwiaWF0IjoxNDk3NDEwNjM2LCJleHAiOjE0OTg2MjAyMzYsIm5iZiI6MTQ5NzQxMDYzNiwianRpIjoiY3lDRzI5ZEhCUDlIUWJkVSJ9.JWr3Aea808eh9I820y_kEuVeCCDlwG8iNCUkwccoS20';
    }
}
