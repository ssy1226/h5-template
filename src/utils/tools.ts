const setTitle = title => {
  document.title = title || '';
};
const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
const isQX =()=>{
  let ua = window.navigator.userAgent.toLowerCase() || '';
  if(ua.match(/MicroMessenger/i) && ua.match(/wxwork/i)){
    return true;
  }else{
    return false;
  }
}
const cookie = () => {
  const _cookie = 'cookie';
  const _exp = '; expires=';
  const doc = document;
  return {
    /**
     * 获取cookie的值
     *
     * @method get
     * @param a {String} cookie中得key
     * @param b [placeholder]
     * @return {String}
     */
    get(a) {
      let b = doc[_cookie].match(`(?:;|^)\\s*${a}\\s*=\\s*([^;]+)\\s*(?:;|$)`);
      return b && b[1];
    },
    /**
     * 设置cookie的值
     *
     * @method set
     * @param a {String} key
     * @param b {String|Number} value
     * @param c {Date} expiration time(s)
     * @param d {String} domain
     */
    /*  */
    set(a, b, c) {
      let d = new Date();
      d.setTime(d.getTime()+((c)*24*60*60*1000));
      // @ts-ignore
      let expires = `${_exp}${d.toGMTString()}`;
      doc[_cookie] = `${a}=${b}${expires};path=/`;
    },
    /**
     * 删除cookie的值
     *
     * @method set
     * @param a {String} key
     */
    remove(a) {
      // @ts-ignore
      doc[_cookie] = `${a}=${_exp}${new Date().toGMTString()}`;
    },
  };
};

export {setTitle, getQueryString, isQX, cookie};