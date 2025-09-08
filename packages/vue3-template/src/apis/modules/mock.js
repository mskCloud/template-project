import request from '@/apis/request'

export const fetchMockTableList = async (params = {}) => {
    const { data, status } = await request({
        url: 'https://m1.apifoxmock.com/m1/1591182-721304-default/common/getTable',
        method: 'post',
        params
    }).catch((err) => {
        console.log(err)
        return {}
    })
    return { data, status }
}
