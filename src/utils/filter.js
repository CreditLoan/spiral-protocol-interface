

export function formateTime(val){
    // return val;
    if (val === -62135596800) {
      return '0000-00-00 00:00:00';
    } else {
      const date = new Date(val * 1000);
      const y = date.getFullYear();
      let m = (date.getMonth() + 1).toString();
      m = Number(m) < 10 ? ('0' + m) : m;
      let d = date.getDate().toString();
      d = Number(d) < 10 ? ('0' + d) : d;
      let h = date.getHours().toString();
      h = Number(h) < 10 ? ('0' + h) : h;
      let minute = date.getMinutes().toString();
      let second = date.getSeconds().toString();
      minute = Number(minute) < 10 ? ('0' + minute) : minute;
      second = Number(second) < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
  }
export function formatNumber(val,num) {
  return Number(val).toFixed(num)
}
export function  formatAddress (val)  {
  if(val.length>=16){
    return  val.substring(0,7)+"..."+ val.substring(val.length-4,val.length)
  }else{
    return val
  }
}

export function orderStatus(val) {
  switch(val)
  {
    case 1:
      return "未成交" 
    case 2:
      return "已成交"
    case 3:
      return "交易失败"
    case 4:
      return "已取消"
  }}