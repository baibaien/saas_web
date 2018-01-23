/**
 * Created by Bonan on 2017/11/2.
 */


export class StaffCalcEchartsClass {

    constructor(staff_calc) {
        let max = 5;
        [...staff_calc.hires, ...staff_calc.quit_elt_60, ...staff_calc.quit_gt_60]
            .map((val) => {
                max = val > max ? val > 5 ? val : 5 : max;
            });
        return {
            tooltip: {
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: '#dcdcdc',
                trigger: 'axis',
                formatter: (params) => {
                    let res = '';
                    for (let i = 0; i < params.length; i++) {
                        if (i === 0) {
                            res += `<p class="grey">${params[i].seriesName}</p><p class="black">${(params[i].data * 100000000).toFixed(2)}%</p>`;
                        } else if (i === 3 || i === 4) {
                            res += `<p class="grey">${params[i].seriesName}${params[i].marker}</p><p class="black">${params[i].data}</p>`;
                        } else if (i === 1 || i === 5) {
                            res += `<p class="grey">${params[i].seriesName}</p><p class="black">${(params[i].data * 100000000).toFixed(0)}</p>`;
                        } else {
                            res += `<p class="grey">${params[i].seriesName}${params[i].marker}</p><p class="black">${params[i].data}</p>`;
                        }
                    }
                    return res;
                }
            },
            legend: {
                bottom: 0,
                data: ['新入职员工数', '离职员工数(司龄≤60天)', '离职员工数(司龄>60天)'],
                selectedMode: false
            },
            grid: {
                top: 20,
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: staff_calc.month
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    minInterval: 1,
                    max: max
                }
            ],
            series: [
                {
                    name: '当月离职率',
                    type: 'bar',
                    stack: '1',
                    itemStyle: new DashboardColorClass('#47e64a'),
                    data: staff_calc.quit_rate
                },
                {
                    name: '期初人数',
                    type: 'bar',
                    stack: '1',
                    itemStyle: new DashboardColorClass('#505050'),
                    data: staff_calc.start_jobs
                },
                {
                    name: '新入职员工数',
                    type: 'bar',
                    stack: '1',
                    barMaxWidth: 20,
                    itemStyle: new DashboardColorClass('#35ad37'),
                    data: staff_calc.hires,
                },
                {
                    name: '离职员工数(司龄≤60天)',
                    type: 'bar',
                    stack: '2',
                    barMaxWidth: 20,
                    itemStyle: new DashboardColorClass('#8d8d8d'),
                    data: staff_calc.quit_elt_60
                },
                {
                    name: '离职员工数(司龄>60天)',
                    type: 'bar',
                    stack: '2',
                    itemStyle: new DashboardColorClass('#505050'),
                    data: staff_calc.quit_gt_60
                },
                {
                    name: '期末人数',
                    type: 'bar',
                    stack: '1',
                    data: staff_calc.end_jobs
                },
            ]
        };
    }
}


export class OutsourceCostEchartsClass {
    constructor(outsource_cost) {
        return {
            tooltip: {
                borderWidth: 1,
                borderColor: '#dcdcdc',
                backgroundColor: '#fff',
                trigger: 'axis',
                formatter: (params) => {
                    let res = '';
                    for (let i = 0; i < params.length; i++) {
                        if (i === 0) {
                            res += `<p class="grey">${params[i].seriesName}</p><p class="black">${Number(params[i].data).toFixed(2)}</p>`;
                        } else {
                            res += `<p class="grey">${params[i].seriesName}${params[i].marker}</p><p class="black">${params[i].data}</p>`;
                        }
                    }
                    return res;
                }
            },
            legend: {
                bottom: 0,
                data: ['五险一金支出', '工资支出', '其它费用', '服务费'],
                selectedMode: false
            },
            grid: {
                top: 20,
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: outsource_cost.month
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '总支出',
                    type: 'bar',
                    barGap: '-100%',
                    barMaxWidth: 20,
                    itemStyle: new DashboardColorClass('white'),
                    data: outsource_cost.total_cost,
                },
                {
                    name: '五险一金支出',
                    type: 'bar',
                    barMaxWidth: 20,
                    stack: '总支出',
                    itemStyle: new DashboardColorClass('#206621'),
                    data: outsource_cost.social_fund_cost
                },
                {
                    name: '工资支出',
                    type: 'bar',
                    stack: '总支出',
                    itemStyle: new DashboardColorClass('#35ad37'),
                    data: outsource_cost.base_salary_cost
                },
                {
                    name: '其它费用',
                    type: 'bar',
                    stack: '总支出',
                    itemStyle: new DashboardColorClass('#47e64a'),
                    data: outsource_cost.other_cost
                },
                {
                    name: '服务费',
                    type: 'bar',
                    stack: '总支出',
                    itemStyle: new DashboardColorClass('#505050'),
                    data: outsource_cost.service_cost
                },
            ]
        };
    }
}


export class StaffAvgCostEchartsClass {
    constructor(staff_avg_cost) {
        staff_avg_cost.avg_total_cost.map((val, i, arr) => {
            arr[i] = (Number(val) / 1000).toFixed(2);
            console.log(val);
        });
        staff_avg_cost.avg_base_salary_cost.map((val, i, arr) => {
            arr[i] = (Number(val) / 1000).toFixed(2);
        });
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                bottom: 0,
                data: ['员工人均成本', '员工人均基本工资'],
                selectedMode: false
            },
            grid: {
                top: 20,
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: staff_avg_cost.month
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '员工人均成本',
                    type: 'line',
                    data: staff_avg_cost.avg_total_cost,
                    itemStyle: new DashboardColorClass('#35ad37')
                },
                {
                    name: '员工人均基本工资',
                    type: 'line',
                    data: staff_avg_cost.avg_base_salary_cost,
                    itemStyle: new DashboardColorClass('#b0dfb1')
                }
            ]
        };

    }
}


export class EmployeeAgeDistEchartsClass {
    private color_config = {
        1: 'rgba(53, 173, 55, 0.2)',
        2: 'rgba(53, 173, 55, 0.4)',
        3: 'rgba(53, 173, 55, 0.65)',
        4: '#35ad37'
    };
    public series;

    constructor(employee_age_dist) {
        const data = [];
        for (let item of employee_age_dist) {
            data.push({
                value: item.count, name: item.group_name,
                itemStyle: {
                    normal: {
                        color: this.color_config[item.group]
                    },
                    emphasis: {
                        color: this.color_config[item.group]

                    }
                },
            });
        }
        this.series = {
            series: [

                {
                    selectedMode: false,
                    hoverAnimation: false,
                    legendHoverLink: false,
                    animation: false,
                    cursor: 'default',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: [
                                '{title|{b}}',
                                '{content|{c}人\({d}\)%}'
                            ].join('\n'),
                            rich: {
                                title: {
                                    color: 'rgba(80, 80, 80, 0.4)',
                                    fontSize: 12
                                },
                                content: {
                                    color: '#505050',
                                    fontSize: 14
                                }
                            }

                        }
                    },
                    data: data,
                }
            ]
        };
    }
}


class DashboardColorClass {
    constructor(color) {
        return {
            normal: {
                color: color
            }
        };
    }
}