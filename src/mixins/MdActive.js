export default {
    props: {
        mdActive: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: this.mdActive
        };
    },
    watch: {
        mdActive(n) {
            this.show = n;
        },
        show(n) {
            this.$emit('update:mdActive', n);
        }
    }
};