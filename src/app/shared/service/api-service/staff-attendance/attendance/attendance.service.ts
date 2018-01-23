import { Injectable } from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class AttendanceService {

  constructor(public rootApiService: RootApiService) { }
  // 获取出勤列表
  getAttendance() {
    return `${this.rootApiService.getRootUrl()}/attendance`;
  }
  // 获取某个员工的年假月
  getStaffHoliday() {
    return `${this.rootApiService.getRootUrl()}/holiday`;
  }
  // 获取假期列表
  getHolidays() {
    return `${this.rootApiService.getRootUrl()}/holiday/lists`;
  }
  // 获取时薪和剩余年假数据
  getHolidaysAndSalary() {
    return `${this.rootApiService.getRootUrl()}/attendance/salary`;
  }
  // 假期类型
  getHolidayType() {
    return `${this.rootApiService.getRootUrl()}/holiday/holiday-type`;
  }


  // -->获取实际请假日
  getAbsenceDuration() {
    return `${this.rootApiService.getRootUrl()}/holiday/compute`;
  }
  // <-----
  // // -->删除假期
  // getHolidayDelete() {
  //   return `${this.rootApiService.getRootUrl()}/holiday`;
  // }
  // // <-----
}
