<template>
    <el-date-picker v-model="datetime" :type="type" :value-format="valueFormat" :format="format"
                    :range-separator="rangeSeparator" :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder" :size="size" :disabled="disabled" :picker-options="options"
                    @change="onChange"/>
</template>

<script>
    import MdMVVMObject from '../../mixins/MdMVVMObject';

    export default {
        name: 'MdDateTimeRangePicker',
        mixins: [MdMVVMObject],
        props: {
            value: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            type: {
                type: String,
                default: 'daterange',
                validator: (val => {
                    return ['daterange', 'datetimerange'].indexOf(val) !== -1;
                })
            },
            startKey: {
                type: String,
                default: 'startTime'
            },
            endKey: {
                type: String,
                default: 'endTime'
            },
            format: String,
            valueFormat: {
                type: String,
                default: 'timestamp'
            },
            rangeSeparator: String,
            startPlaceholder: String,
            endPlaceholder: String,
            size: String,
            disabled: Boolean,
            options: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {
                datetime: []
            };
        },
        mounted() {
            this.datetime = [
                this.data[this.startKey] || '',
                this.data[this.endKey] || ''
            ];
        },
        methods: {
            onChange(date) {
                if (date && date.length >= 2) {
                    this.data[this.startKey] = date[0];
                    this.data[this.endKey] = date[1];
                } else {
                    this.data[this.startKey] = undefined;
                    this.data[this.endKey] = undefined;
                }
            }
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(n) {
                    this.datetime = [n[this.startKey] || '', n[this.endKey] || ''];
                }
            }
        }
    };
</script>

<style scoped>

</style>
