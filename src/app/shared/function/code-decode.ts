/**
 * Created by Bonan on 2017/11/9.
 */
export function htmlDecodeByRegExp(str) {
    let s = '';
    if (str.length == 0) return '';
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, '\'');
    s = s.replace(/&quot;/g, '\'');
    return s;
}