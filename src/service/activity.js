import request from '@/utils/request'

export function getWheelLoad () {
    return request({
      url: "/mock/wheel/load",
      method: 'post',
    //   data: parameter
    })
  }