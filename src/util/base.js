const dev = process.env.NODE_ENV !== 'production';

export const getDomain = () => {
  return dev ? 'http://127.0.0.1:7001' : 'http://120.25.245.87:7001'
}

export const getLocalIp = () => {
  return dev ? 'http://127.0.0.1:3000' : 'http://127.0.0.1:3000'
}

// http://www.xiesmallxie.cn:1996