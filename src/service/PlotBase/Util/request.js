import axios from "axios";
import LogTool from "../../PlotUtilBase/Log/LogTool";

const apiBaseUrl = "http://localhost:8082";

// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 9000, // 请求超时时间
});

const err = (error) => {
  LogTool.error(error.message);
  return Promise.reject(error);
};

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, err);

/**
 * 发送post请求
 * @param {String} url
 * @param {*} parameter
 * @returns
 */
export function postAction(url, parameter) {
  return service({
    url: url,
    method: "post",
    data: parameter,
  });
}

/**
 * 发送get请求
 * @param {*} url 
 * @param {*} parameter 
 * @returns 
 */
export function getAction(url,parameter) {
  return service({
    url: url,
    method: 'get',
    params: parameter,
  })
}

/**
 * 发送delete请求
 * @param {*} url 
 * @param {*} parameter 
 * @returns 
 */
export function deleteAction(url,parameter) {
  return service({
    url: url,
    method: 'delete',
    params: parameter
  })
}

export { service as axios };
