import axios from './methods.js';

const GetTags = params => axios.get('admin/tags',params); // 获取所有标签
const CreateTag = params => axios.post('admin/tags',params); // 创建新标签
const DeleteTag = params => axios.delete('admin/tags',params); // 删除某个标签
const GetAbout = params => axios.get('admin/aboutme',params); // 获取我的基本信息
const UpadteAbout = params => axios.put('admin/aboutme',params); // 修改我的基本信息
const GetCategories = params => axios.get('admin/categories', params); // 获取所有分类信息
const GetArticle = url => axios.get(url); // 获取所有分类信息
const DeleteArticle =  params => axios.delete('admin/article', params);
const CreateArticle = params => axios.post('admin/article', params); // 创建新文章
const UpdateCategories = params => axios.put('admin/categories', params); // 更新分类信息
const CreateCategories = params => axios.post('admin/categories', params); // 新建分类信息
const DeleteCategories = params => axios.delete('admin/categories', params); // 新建分类信息
const LoginReq = params => axios.post('admin/login', params); // 新建分类信息

export {
    GetTags,
    CreateTag,
    DeleteTag,
    GetAbout,
    UpadteAbout,
    GetCategories,
    GetArticle,
    DeleteArticle,
    CreateArticle,
    UpdateCategories,
    CreateCategories,
    DeleteCategories,
    LoginReq
}