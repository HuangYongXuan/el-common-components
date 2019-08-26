import validator from 'el-form-validator';
import {Message} from 'element-ui';

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
 * @return                  {Array}
 */
export const generateRule = (required, rules, requiredMsg = '请输入', customMessages = {}, customNames = {}) => {
	return [
		{
			required: required,
			message: requiredMsg,
			trigger: 'blur'
		}, {
			rules: rules,
			customMessages: customMessages,
			customNames: customNames,
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
 * @param conditions        {Function}
 * @param response          {Object}
 * @param showSuccess       {boolean}
 * @param successMsg        {string}
 * @param showError         {boolean}
 * @param errorMsg          {string}
 * @return                  {Promise<Promise<*>|*>}
 */
export const handelHttpResponse = async (conditions, response, showSuccess = false, successMsg = undefined, showError = true, errorMsg = undefined) => {
	if (conditions && conditions()) {
		if (showSuccess) {
			Message.success(successMsg || response.data.msg || response.data.data || '操作成功');
		}
		return await response.data;
	} else {
		if (showError) {
			Message.error(errorMsg || response.data.msg || response.data.data || response.data.message);
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
 * 获取当前月的UNIX时间戳
 * @return {number}
 */
export const getToMonthUnix = () => {
	let dateStr = new Date().format('yyyy.MM.01');
	return new Date(dateStr).getTime();
};

export default {
	generateRule,
	generateUuid,
	handelHttpResponse,
	deepClone,
	objectDiff,
    getToMonthUnix
};