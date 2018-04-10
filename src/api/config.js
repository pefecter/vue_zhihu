var config = {
    site:'zhihu-agent.herokuapp.com',
    method:'/get?api='
}
//concat(arrayX,arrayX,......,arrayX)连接数组
export const API_ROOT = 'http://'.concat(config.site,config.method)