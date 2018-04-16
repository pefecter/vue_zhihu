import axios from 'axios'
import {
    NewsAxios,
    NewsIdAxios,
    NewsDateAxios,
    NewsInfoAxios,
    TopicsAxios,
    TopicsIdAxios,
    SectionsAxios,
    SectionsIdAxios
} from "./axios.js"
export default {
    getNews() {
        return axios.get(NewsAxios)
    },
    getNewsById(id) {
        return axios.get(NewsIdAxios + id)
    },
    getNewsByDate(date) {
        return axios.get(NewsDateAxios + date)
    },
    getNewsInfoById(id) {
        return axios.get(NewsInfoAxios, {
            params: {
                id: id
            }
        })
    },
    getTopics() {
        return axios.get(TopicsAxios)
    },
    getTopicsById(topic_id) {
        return axios.get(TopicsIdAxios + topic_id)
    },
    getSections() {
        return axios.get(SectionsAxios)
    },
    getSectionsById(section_id) {
        return axios.get(SectionsIdAxios, {
            params: {
                section_id: section_id
            }
        })
    },
}