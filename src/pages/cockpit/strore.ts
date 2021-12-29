import request from '@/api/request'

const api = '/manager-mp-server/api/v1'

class Store {
  static getMDepartment = ()  => {
    return request(`${api}/revenue/month/department-values`,'GET',{}, true);
  }
  static getMPointerValues = (params) => {
    return request(`${api}/revenue/month/pointer-values`,'GET',params, true);
  }
  static getMVSLp = () => {
    return request(`${api}/revenue/month/vs-lp`,'GET',{}, true);
  }
  static getMPointerValue = () => {
    return request(`${api}/revenue/month/pointer-value`,'GET',{}, true);
  }
  static getNetProfitValues = () => {
    return request(`${api}/net-profit/month/pointer-values`,'GET',{}, true);
  }
  static getYDepartment = () => {
    return request(`${api}/revenue/ytd/department-values`,'GET',{}, true);
  }
  static getYFinishRate = () => {
    return request(`${api}/revenue/ytd/finish-rate`,'GET',{}, true);
  }
  static getYPointerValues = () => {
    return request(`${api}/revenue/ytd/pointer-value`,'GET',{}, true);
  }
  static getYVSSply = () => {
    return request(`${api}/revenue/ytd/vs-sply`,'GET', {}, true);
  }
  static getProgress = () => {
    return request(`${api}/revenue/time-progress`,'GET', {}, true);
  }
  static getProfitMVslp = () => {
    return request(`${api}/net-profit/month/vs-lp`,'GET', {}, true);
  }
  static getProfitYFinishRate = () => {
    return request(`${api}/net-profit/finish-rate`,'GET', {}, true);
  }
  static getProfitYPointerValue = () => {
    return request(`${api}/net-profit/pointer-value`,'GET', {}, true);
  }
  static getProfitYVSSply = () => {
    return request(`${api}/net-profit/vs-sply`,'GET', {}, true);
  }
}

export default Store
