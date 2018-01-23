SaaS项目 组件整理(预定制)
===========
#与筛选功能相关插件的全局函数及服务
##GlobalFuncService
实现原理：流订阅

|函数名            |参数             |返回值   |
|:---:|:---:|:---:|
|getInfoListEmit |无                        |流发射器|
|getInfoListSource|无                        |请求流|
|setInfoListSource|type: string ,http类型     |设置请求流|
|                  |url: string ,http链接     ||
|                  |submit_data: any ,提交参数 ||
|emitInfoListSource|无                     |无|




----------------
#mayihr-paging
##分页器组件
###\<mayihr-paging\>
@Input字段

1. page_info需包含

|字段             |含义             |
|:---:|:---:|
|current_page    |当前页数|
|total_pages     |总页数|
|per_page        |每页显示条目数量|
|count           |数量|
|total           |总数|

2. list_info_url

    用于发送请求的域名设定
   
3. list_info_type

    用于发送请求的method设定

 
 
#mayihr-searching
##搜索框组件
###\<mayihr-searching\>
####@Input
1. list_info_url

    用于发送请求的域名设定
    
2. list_info_type

     用于发送请求的method设定
 
3. placeholder_type

    placeholder中默认显示内容
    
|值|placeholder中的文本|
|:---:|:---:|
|yg_name|输入员工姓名进行搜索|
|all|输入员工工号，手机号，姓名，岗位进行搜索|

    
    