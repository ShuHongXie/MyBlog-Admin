import WriteArticle from '../component/article/writeArticle'
import ArticleList from '../component/article/list'
import CategoryList from '../component/category/categoryList'
import CategoryEdit from '../component/category/categoryEdit'
import TagsList from '../component/tags/list'
import AboutMe from '../component/aboutme/index'
import AboutMeBaseInfo from '../component/aboutme/base'

export const route = [
  {
    key: '发布博客',
    path: '/index/blog/publish',
    component : WriteArticle
  },
  {
    key: '博客列表',
    path: '/index/blog/list',
    component : ArticleList
  },
  {
    key: '分类操作',
    path: '/index/catalog/list',
    component : CategoryList
  },
  {
    key: '具体操作',
    path: '/index/catalog/edit',
    component : CategoryEdit
  },
  {
    key: '标签列表',
    path: '/index/tags/list',
    component : TagsList
  },
  {
    key: '关于我',
    path: '/index/aboutme/index',
    component : AboutMe
  },
  {
    key: '关于我 基本信息',
    path: '/index/aboutme/base',
    component : AboutMeBaseInfo
  }
]