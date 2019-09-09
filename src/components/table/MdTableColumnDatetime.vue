<template>
    <el-table-column :label="label" :width="width" :prop="prop" :align="align">
        <template slot-scope="scope">
            <div v-html="html(scope.row)"></div>
        </template>
    </el-table-column>
</template>

<script>
	export default {
		name: "MdTableColumnDatetime",
		props: {
			label: String,
			width: String,
			prop: String,
			align: String
		},
		methods: {
			html (row) {
				let datetime = row[this.prop];
				let arr = datetime.split(' ');
				let html = '';
				for (let k in arr) {
					html += `<p class="__p">${arr[k]}</p>`
				}
				return html;
			}
		}
	}
</script>

<style>
    .__p {
        margin: 0;
    }
</style>