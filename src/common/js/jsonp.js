/**
 * Created by zl on 2017/8/31 0031.
 * 封装jsonp去抓取数据
 */
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?')<0 ? '?' : '&') + param(data);

  //es6 Promise对象
  return new Promise((resolve,reject) => {
    originJSONP(url, option, (err, data) => {
      if(!err) {
        resolve(data);
      }else {
        reject(err);
      }
    })
  })
}

function param(data) {
  let url = '';
  for(var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : "";
}
