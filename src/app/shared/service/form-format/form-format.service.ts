import {Injectable} from '@angular/core';

// 服务请求得到数据格式化为表单格式数据
@Injectable()
export class FormFormatService {
  public formatted_data;

  constructor() {
  }

  sourceToForm(source_data) {
    let formatted_data: Object = {};
    for (let obj in source_data) {
      let id_index = obj.indexOf('_id');
      let name_index = obj.indexOf('_name');
      let name_obj = obj.substring(0, name_index);
      let id_obj = id_index ? obj.substring(0, id_index) : null;
      let test_obj;
      if ((/_id$/.test(obj) && obj.length > 5)) {
        // 结尾字符串为_id
        test_obj = `${id_obj}_name`;
        if (source_data.hasOwnProperty(test_obj)) {
          // 字符串去掉_id后有_name类对应字符串
          formatted_data[obj] = {
            id: source_data[obj],
            name: source_data[test_obj]
          };
        }
      } else if (!(/_id$/.test(obj) ) && source_data.hasOwnProperty(`${obj}_name`)) {
        // 如果字符串不以_id结尾，但有对应_name结尾的字符串
        formatted_data[obj] = {
          id: source_data[obj],
          name: source_data[`${obj}_name`]
        };
      } else if (/_name$/.test(obj) && obj.length > 7 && (source_data.hasOwnProperty(`${name_obj}`) || source_data.hasOwnProperty(`${name_obj}_id`))) {
        // 如果字符串以_name结尾，且长度大于7 且存在去掉_name对应的字符串，因为已经赋过值 ，所以跳过
        continue;
      } else {
        formatted_data[obj] = source_data[obj];
      }
    }
    this.formatted_data = formatted_data;
    console.log('formatted', this.formatted_data);
    return this.formatted_data;
  }
}
