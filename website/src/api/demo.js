import request from '@/utils/requesttemp'

export function getHtml(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function getMarkdown(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function getHelpHtml(url) {
  return request({
    url: url,
    method: 'get'
  })
}

