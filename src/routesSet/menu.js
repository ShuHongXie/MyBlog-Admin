// 侧边导航栏的初始路由表
export const menuList = [
  {
    key: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    key: '/index/blog',
    title: '博客',
    icon: 'edit',
    sub: [
      {
        key: '/index/blog/publish',
        title: '发布博客',
        icon: ''
      },
      {
        key: '/index/blog/list',
        title: '博客列表',
        icon: ''
      },
    ],
  },
  {
    key: '/index/catalog',
    title: '分类',
    icon: 'exception',
    sub: [{
      key: '/index/catalog/list',
      title: '分类操作',
      icon: ''
    }]
  },
  {
    key: '/index/tags',
    title: '标签',
    icon: 'tags',
    sub: [{
      key: '/index/tags/list',
      title: '标签列表',
      icon: ''
    }]
  },
  {
    key: '/index/aboutme',
    title: '关于我',
    icon: 'bank',
    sub: [{
      key: '/index/aboutme/base',
      title: '基本信息',
      icon: ''
    }]
  },
]