import validator from 'el-form-validator';

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


export default {
    generateRule,
    generateUuid,
};