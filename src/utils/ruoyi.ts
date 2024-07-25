
/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params: any) {
  let result = ''
  for (let propName of Object.keys(params)) {
    const value = params[propName];
    if(propName === 'current') {
      propName = 'pageNum'
    }
    const part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}
