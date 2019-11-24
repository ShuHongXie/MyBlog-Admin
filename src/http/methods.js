import factory from './factory.js';

export default class http {
    static get(url,param){
        let params = { ...param }
        return factory.get(url,{ params })
    }
    static delete(url,param){
        let params = { ...param }
        return factory.delete(url,{ params })
    }
    static post(url,param){
        return factory.post(url,param)
    }
    static put(url,param){
        return factory.put(url,param)
    }
    static patch(url,param){
        return factory.patch(url,param)
    }
}