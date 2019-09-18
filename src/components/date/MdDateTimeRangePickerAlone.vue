<template>
    <div class="md-date-time-range-picker-alone">
        <el-date-picker v-model="data[startKey]" :type="type" :value-format="valueFormat" :format="format"
                        :placeholder="startPlaceholder" :size="size" :disabled="disabled" :picker-options="options"/>
        <span>{{rangeSeparator}}</span>
        <el-date-picker v-model="data[endKey]" :type="type" :value-format="valueFormat" :format="format"
                        :placeholder="endPlaceholder" :size="size" :disabled="disabled" :picker-options="options"/>
    </div>
</template>

<script>
	import MdMVVMObject from '../../mixins/MdMVVMObject';

	export default {
		name: "MdDateTimeRangePickerAlone",
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
				default: 'date',
				validator: (val => {
					return ['date', 'datetime'].indexOf(val) !== -1;
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
			format: {
				type: String,
                default: 'yyyy-MM-dd'
            },
			valueFormat: {
				type: String,
				default: 'yyyy-MM-dd'
			},
			rangeSeparator: {
				type: String,
				default: '至'
			},
			startPlaceholder: {
				type: String,
                default: '开始时间'
            },
			endPlaceholder: {
				type: String,
				default: '结束时间'
            },
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
			return {}
		}
	}
</script>

<style scoped lang="scss">
    .md-date-time-range-picker-alone {
        span {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
</style>