import {
    API_ROOT
} from './config.js'
var zhihu_api = {
    startimage: '/4/start-image/1080*1776',
    news: '/4/news/latest',
    newsbyid: '/4/news/',
    newsbydate: '/4/news/before/',
    newsinfo: '/4/story-extra',
    topics: '/4/themes',
    topicbyid: '/4/theme/',
    sections: '/3/sections',
    sectionbyid: '/3/section',
}
//export const 设置为跨模块的常量
export const NewsAxios = API_ROOT.concat(zhihu_api.news)
export const NewsIdAxios = API_ROOT.concat(zhihu_api.newsbyid)
export const NewsDateAxios = API_ROOT.concat(zhihu_api.newsbydate)
export const NewsInfoAxios = API_ROOT.concat(zhihu_api.newsinfo)
export const TopicsAxios = API_ROOT.concat(zhihu_api.topics)
export const TopicsIdAxios = API_ROOT.concat(zhihu_api.topicbyid)
export const SectionsAxios = API_ROOT.concat(zhihu_api.sections)
export const SectionsIdAxios = API_ROOT.concat(zhihu_api.sectionbyid)