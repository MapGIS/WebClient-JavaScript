<template>
    <div class="sidebar-gallery-wrapper">
        <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleOpen"
        >
            <sidebar-item
                v-for="child in configList.childs"
                :key="child.name"
                :active="defaultActive"
                :item="child"
                :base-path="child.path"
                :type="configList.mapmode"
            ></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
    components: {
        SidebarItem
    },
    props: {
        configList: {
            type: Object,
            required: true
        },
        scrollActive: Array
    },
    data() {
        return {
            defaultOpeneds: [],
            defaultActive: ''
        };
    },
    computed: {},
    watch: {
        scrollActive(/* next */) {
            // this.defaultOpeneds = next
            // this.defaultActive = next.length > 0 ? next[next.length - 1] : ''
        }
    },
    mounted() {
        const keys = window.location.href.split('#');
        const anchors = keys.slice(2, keys.length);
        this.defaultOpeneds = anchors;
        this.defaultActive = anchors[anchors.length - 1];
    },
    methods: {
        handleSelect(key) {
            /* var href = window.location.href.split("#");
      var localte = "/" + key.replace('#', '/');
      if (href.length >= 2) {
        let newHref = href[0] + "#" + href[1].replace('gallery', 'demo') + localte;
        window.location.href = newHref;
      } */
            return key;
        },
        handleOpen(key, keys) {
            let href = window.location.href.split('#');
            let localte = '';
            keys.forEach((k) => {
                localte = localte + '#' + k;
            });
            if (href.length >= 2) {
                let newHref = href[0] + '#' + href[1] + localte;
                window.location.href = newHref;
            }
        }
    }
};
</script>

<style lang="scss">
.sidebar-gallery-wrapper {
    .el-menu {
        background: #f4f7fb;
    }
    .el-submenu .el-menu {
        border-left: 1px solid #c8cdd4;
        margin-left: 30px;
    }
    .el-menu-item {
        font-size: 12px;
        height: 36px !important;
        line-height: 36px !important;
        border-left: 7px solidrgba(49, 225, 230, 1);
    }
    .is-opened:first-child {
        // background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
        outline: 0;
        color: #ffffff;
        background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-menu-item.is-active {
        /* background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31)); */
        color: #3a85c6;
    }
    .el-menu-item {
        .is-active {
            color: #ffffff !important;
        }
    }
    .el-submenu .is-opened {
        // background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-submenu__title {
        padding-left: 20px !important;
    }
    .submenu-item-span {
        padding-left: 4px !important;
    }
    .el-submenu .el-menu-item {
        min-width: 156px;
    }
}
</style>
