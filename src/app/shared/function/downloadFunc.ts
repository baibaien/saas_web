/**
 * Created by Bonan on 2017/12/1.
 */

// -->
/**
 * downloadFuncApi
 * 函数描述
 * 下载文件使用的中间函数
 * @params: url-----下载的url，数组为批量下载
 * @return:
 */
export function downloadFuncApi(url: string) {
    console.log(url);
    const f = document.createElement('form');
    document.body.appendChild(f);
    f.appendChild(downloadAddInput());
    f.target = '_blank';
    f.method = 'get';
    f.action = url;
    f.submit();


    /**
     * downloadAddInput
     * 函数描述
     * 添加单一下载用input
     * @params: url
     * @return: 单个input
     */
    function downloadAddInput() {
        const i = document.createElement('input');
        i.type = 'hidden';
        return i;
    }
}
//
// function downloadAddInput() {
//     const i = document.createElement('input');
//     i.type = 'hidden';
//     return i;
// }
// <-----