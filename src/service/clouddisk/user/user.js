import { Zondy } from '../../common/Base';
import { CloudDiskService } from '../ServiceBase';

const LoginPath = 'login';

/**
 * @class module:CloudDisk.UserService
 * @description 云盘数据转换服务
 * @see 该方法强依赖clouddisk
 * @author 基础平台-潘卓然
 * @example
 * let service = new UserService({ domain: "http://192.168.199.53:9011"});
 * service.setHeaders({Authorization: 'pk.xxxxxx'});
 * service.login({
 *      username: 'pzr',
 *      password: '123456'
 * }, (res) => {}, (error) => {});
 */
export class UserService extends CloudDiskService {
    constructor(options) {
        super(options);
        /**
         * @member module:CloudDisk.UserService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/clouddisk/rest/users/';
    }

    /**
     * @function module:CloudDisk.UserService.prototype.login
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {String} options.username 用户名
     * @param  {String} options.password 密码
     * @param  {Number} [options.id] id
     * @param  {String} [options.descr] 描述信息
     * @param  {String} [options.path] 路径地址
     * @param  {String} [options.status] 状态
     * @param  {String} [options.email] E-mail
     * @param  {String} [options.telephone] 电话
     * @param  {String} [options.lastLogin] 上一次登录
     * @param  {String} [options.encryptPwd] 保密文件夹密码
     * @param  {String} [options.capacity]
     * @param  {String} [options.beizhu] 备注信息
     * @param  {String} [options.role] 角色
     * @param  {String} [options.role.id] 角色id
     * @param  {String} [options.role.name] 角色名字
     * @param  {String} [options.role.code] 角色代码
     * @param  {String} [options.role.descpt] 角色描述
     * @param  {String} [options.role.type] 角色类型
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/users/login  application/json
     * {
     *      username: 'pzr',
     *      password: '123456'
     * }
     */
    login(options, onSuccess, onError) {
        let { serviceUrl } = this;
        let baseurl = this.getBaseUrl();
        let url = `${baseurl}${serviceUrl}${LoginPath}`;
        this.post(url, options, onSuccess, onError);
    }
}

export default UserService;
Zondy.CloudDisk.UserService = UserService;
