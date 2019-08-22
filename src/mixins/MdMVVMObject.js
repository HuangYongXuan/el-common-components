export default {
    props: {
        value: {
            type: Object | String | Number | Array | Boolean
        },
        formRef: {
            type: String,
            default: 'form'
        },
        showValidatorFailMsg: {
            type: Boolean,
            default: true
        },
        failMsg: {
            type: String,
            default: '表单数据不完整'
        }
    },
    data() {
        return {
            data: this.value
        };
    },
    methods: {
        onSubmit(e) {
            this.$refs[this.formRef].validate(valid => {
                if (valid) {
                    this.$emit('submit', e);
                } else {
                    this.$emit('fail', this);
                    if (this.showValidatorFailMsg) {
                        this.$message.warning(this.failMsg)
                    }
                }
            })
        }
    },
    watch: {
        async value(n) {
            await this.$nextTick();
            this.data = n;
        },
        async data() {
            await this.$nextTick();
            this.$emit('input', this.data);
        }
    }
};