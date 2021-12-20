import request from '../request'
const api = 'manager-mp-server'

interface InfoListItem {
  name: string
  desc: string
}

class IndexApi {
  static getUserInfo = (code) =>{
    return request(`/${api}/api/v1/user/getUserInfo`,'GET', {code}, true);
  }

  static updateInfo = (params: {
    name: string
    phone: string
    password: string
  }): Promise<boolean> => request('/api/updateInfo', 'POST', params, true)
}

export default IndexApi
