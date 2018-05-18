export function thousandth(val) {
  if(typeof val==="number"){
    val+='';
  }
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
