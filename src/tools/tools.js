export const formatDate = (date) => {
  let month = date.getMonth();
  const year = date.getFullYear(),
      day = date.getDate();

  switch(month) {
      case 0:
          month = '一月';
          break;
      case 1:
          month = '二月';
          break;
      case 2:
          month = '三月';
          break;
      case 3:
          month = '四月';
          break;
      case 4:
          month = '五月';
          break;
      case 5:
          month = '六月';
          break;
      case 6:
          month = '七月';
          break;
      case 7:
          month = '八月';
          break;
      case 8:
          month = '九月';
          break;
      case 9:
          month = '十月';
          break;
      case 10:
          month = '十一月';
          break;
      case 11:
          month = '十二月';
          break;
      default:
          break;
  }

  return `${month} ${padDay(day)}, ${year}`;
}

export const padDay = (day) => {
  return day < 10 ? '0' + day : day;
}

// 保存 localStorage
export const saveLs = (key, value) => {
    localStorage.setItem(key, value)
}
// 删除 localStorage
export const rmLs = (key) => {
    localStorage.removeItem(key)
}
// 获取 localStorage
export const getLs = (key) => {
    return localStorage.getItem(key)
}

// 移除所有 LocalStorage
export const rmAllLs = () => {
    localStorage.clear()
}

export const  BMPGL = (ak) => {
    return new Promise(function(resolve, reject) {
        window.init = function() {
          // eslint-disable-next-line
          resolve(BMapGL)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
}