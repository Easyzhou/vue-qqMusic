/**
 * Created by Administrator on 2017/8/31 0031.
 */
//暴露抓取数据时公用的 data
export const commonParams = {
  g_tk:5381,
  format:'jsonp',
  inCharset:'utf-8',
  outCharset:'utf-8',
}

//暴露公用的options
export const options = {
  param : 'jsonpCallback'
}

//暴露增强语义化的code
export const ERR_OK = 0;
