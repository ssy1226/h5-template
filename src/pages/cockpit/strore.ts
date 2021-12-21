import request from '@/api/request'

const api = 'manager-mp-server'

class Store {
  static getMDepartment = ()  => {
    return request(`/${api}/api/v1/revenue/month/department-values`,'GET',{}, true);
  }
  static getMPointerValues = (params) => {
    return request(`/${api}/api/v1/revenue/month/pointer-values`,'GET',params, true);
  }
  static getMVSLp = () => {
    return request(`/${api}/api/v1/revenue/month/vs-lp`,'GET',{}, true);
  }
  static getMPointerValue = () => {
    return request(`/${api}/api/v1/revenue/month/pointer-value`,'GET',{}, true);
  }
  static getYDepartment = () => {
    return request(`/${api}/api/v1/revenue/ytd/department-values`,'GET',{}, true);
  }
  static getYFinishRate = () => {
    return request(`/${api}/api/v1/revenue/ytd/finish-rate`,'GET',{}, true);
  }
  static getYPointerValues = () => {
    return request(`/${api}/api/v1/revenue/ytd/pointer-value`,'GET',{}, true);
  }
  static getYVSSply = () => {
    return request(`/${api}/api/v1/revenue/ytd/vs-sply`,'GET', {}, true);
  }
  static getProgress = () => {
    return request(`/${api}/api/v1/revenue/time-progress`,'GET', {}, true);
  }
  static getProfitMVslp = () => {
    return request(`/${api}/api/v1/net-profit/vs-lp`,'GET', {}, true);
  }
  static getProfitYFinishRate = () => {
    return request(`/${api}/api/v1/net-profit/finish-rate`,'GET', {}, true);
  }
  static getProfitYPointerValue = () => {
    return request(`/${api}/api/v1/net-profit/pointer-value`,'GET', {}, true);
  }
  static getProfitYVSSply = () => {
    return request(`/${api}/api/v1/net-profit/vs-sply`,'GET', {}, true);
  }
}

export default Store
