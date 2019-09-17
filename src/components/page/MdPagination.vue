<template>
    <div class="md-pagination">
        <el-pagination
            :total="total"
            :page-size.sync="pageSize"
            :current-page.sync="pageNum"
            :layout="layout"
            :page-sizes="sizes"
            ref="pageInfo"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
    </div>
</template>

<script>
	export default {
		name: 'MdPagination',
		props: {
			page: {type: Number, default: 1},
			size: {type: Number, default: 15},
			total: {type: Number, default: 0},
			layout: {type: String, default: 'total, sizes, prev, pager, next, jumper'},
			sizes: {type: Array, default: () => [5, 10, 15, 20, 30, 50]}
		},
		data() {
			return {
				pageNum: this.page,
				pageSize: this.size
			};
		},
		watch: {
			async pageNum() {
				await this.$nextTick();
				this.$emit('update:page', this.pageNum);
                this.$emit('change');
			},
			async pageSize() {
				await this.$nextTick();
				this.$emit('update:size', this.pageSize);
                this.$emit('change');
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.pageNum = val;
			}
		}
	};
</script>

<style scoped>
    .md-pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
    }
</style>