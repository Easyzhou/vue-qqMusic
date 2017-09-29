/**
 * Created by Administrator on 2017/8/31 0031.
 * 为轮播item添加class
 */
export function addClass(el, className) {
  //先判断是否有这个className,如果有直接return，没有就往上添加
  if(hasClass(el,className)){
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');

}

//判断是否含有这个class名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

//获取data-index的值，暴露的方法
export function getData(el, name, val) {
  let prefix = "data-"
  name = prefix + name
  if(val) {
    return el.setAttribute(name, val)
  }else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

//定义一个工具箱
let vendor  = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for(let key in transformNames) {
    if(elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function profixStyle(style) {
  if(vendor === false) {
    return false
  }

  if(vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}
