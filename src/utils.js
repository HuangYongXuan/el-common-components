import validator from 'el-form-validator';
import {Message, MessageBox} from 'element-ui';

Date.prototype.format = function (mask) {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
        'H+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    let week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    };
    if (/(y+)/.test(mask)) {
        mask = mask.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(mask)) {
        mask = mask.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + '']);
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(mask)) {
            mask = mask.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return mask;
};

/**
 * 生成form验证规则
 *
 * @param required          {Boolean}           是否必须
 * @param rules             {string | Array}    规则 仅使用 el-form-validator 验证 https://www.npmjs.com/package/el-form-validator
 * @param customMessages    {Object}            自定义错误消息
 * @param customNames       {Object}            自定义字段名称
 * @param requiredMsg       {string}            必须的错误消息
 * @param messages            {String}            统一的错误提示
 * @return                  {Array}
 */
export const generateRule = (required, rules, requiredMsg = '请输入', messages = undefined, customMessages = {}, customNames = {}) => {
    return [
        {
            required,
            message: requiredMsg,
            trigger: 'blur'
        }, {
            rules,
            customMessages,
            customNames,
            messages,
            validator: validator.verification,
            trigger: 'blur'
        }
    ];
};

/**
 * 简单生成最长10位的Uuid
 *
 * @param prefix    {string}    default: ''     前缀
 * @param size      {number}    default: 6      uuid长度 最长10位
 * @return          {string}
 */
export const generateUuid = (prefix = '', size = 6) => {
    return prefix + Math.random().toString(36).slice(2, size + 2);
};

/**
 * 处理http返回结果
 *
 * @param conditions        {Function|Boolean}          从外部判断返回结果
 * @param response          {Object}                    响应
 * @param showSuccess       {boolean}                   是否显示返回成功的消息 默认false
 * @param successMsg        {string}                    自定义成功消息的文本 默认 undefined
 * @param showError         {boolean}                   是否显示错误消息 默认 true
 * @param errorMsg          {string}                    自定义错误消息 默认 undefined
 * @param msgKey            {string}                    响应返回结果中的消息key
 * @return                  {Promise<Promise<*>|*>}
 */
export const handelHttpResponse = async (conditions, response, showSuccess = false, successMsg = undefined, showError = true, errorMsg = undefined, msgKey = 'msg') => {
    if ((conditions && conditions(response)) || conditions === true) {
        if (showSuccess) {
            Message.success(successMsg || response.data[msgKey] || response.data.data || '操作成功');
        }
        return await response.data;
    } else {
        if (showError) {
            Message.error(errorMsg || response.data[msgKey] || response.data.data || response.data.message);
        }
        return Promise.reject(response);
    }
};

/**
 * 克隆数据
 *
 * @param object    {Object | Array}
 * @return          {Object | Array}
 */
export const deepClone = (object) => {
    let result = Array.isArray(object) ? [] : {};
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key] instanceof File) {
                result[key] = object[key];
            } else if (typeof object[key] === 'object' && object[key]) {
                result[key] = deepClone(object[key]);
            } else {
                result[key] = object[key];
            }
        }
    }
    return result;
};

/**
 *  已第一个参数对比obj
 *
 * @param object        {Object | Array}
 * @param diffObject    {Object | Array}
 * @return              {Object | Array}
 */
export const objectDiff = (object, diffObject) => {
    let newObject = typeof object !== 'object' ? [] : {};
    if (typeof object === typeof diffObject) {
        for (let key in object) {
            if (object[key] !== diffObject[key]) {
                newObject[key] = object[key];
            }
        }
    }
    return newObject;
};

/**
 * 获取前月开始的UNIX时间戳
 *
 * @return {number}
 */
export const getToMonthUnix = () => {
    let dateStr = new Date().format('yyyy.MM.01');
    return new Date(dateStr).getTime();
};

/**
 * 获取object的长度
 *
 * @param o        {Object}
 * @return            {number}
 */
export const objectLength = (o) => {
    return Object.keys(o).length;
};

/**
 * confirm 确认框
 *
 * @param message            {string}
 * @param title                {string}
 * @param type                {string}
 * @return {Promise<MessageBoxData>}
 */
export const confirmMessage = (message, title = '提示！', type = 'warning') => {
    return MessageBox.confirm(
        message,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type
        }
    );
};

/**
 * 将vue-router的query转换里面数据的类型 并返回一个新的Object
 * @param query            {Object}        需要转换的数据
 * @param types            {Object}        转换数据的值的类型
 * @return                {Object}
 */
export const urlQueryDataTransferToData = (query = {}, types = {}) => {
    let format = (val, type) => {
        if (val === undefined || val === null) return val;
        switch (type) {
            case 'int':
                return parseInt(val);
            case 'float':
                return parseFloat(val);
            case 'string':
                return val + '';
            case 'bool':
                return ['true', '1', 'on', 'yes', 'accept'].indexOf(val) !== -1;
            default:
                return val;
        }
    };
    let newData = {};
    for (let key in types) {
        let data = format(query[key], types[key]);
        if (data === undefined || isNaN(data)) {
            continue;
        }
        newData[key] = data;
    }
    return newData;
};

/**
 * 格式化page
 *
 * @param params
 * @returns {any}
 */
export const formatQueryPage = (params) => {
    let data = Object.assign({}, params);

    if (data.page) {
        data.page -= 1;
    }

    return data;
};

export default {
    generateRule,
    generateUuid,
    handelHttpResponse,
    deepClone,
    objectDiff,
    getToMonthUnix,
    objectLength,
    confirmMessage,
    urlQueryDataTransferToData,
    formatQueryPage
};