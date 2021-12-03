<template>
    <div :class="{ 'mapgis-header': true, 'mapgis-header-mobile': mobile }">
        <router-link to="/">
            <div class="mapgis-webclient-header">
                <img :src="logo" class="mapgis-webclient-logo" />
                <span v-if="!mobile" class="mapgis-webclient-text"> Client for JavaScript </span>
            </div>
        </router-link>
        <IconFont :style="style" type="iconicon_commonly_barmenu" class="mapgis-webclient-menu-icon" @click="isShowMenu = !isShowMenu" />
        <div :class="['mapgis-webclient-menu', { 'is-show': isShowMenu }]">
            <div class="mapgis-webclient-nav">
                <div v-if="mobile">
                    <el-popover v-for="h in mobileSubheaders" :key="h.title" placement="top-start" trigger="hover">
                        <header-sub-menu :active="activeTabs[h.title]" :menus="h.menus" />
                        <el-button type="text" slot="reference">{{ h.title }}</el-button>
                    </el-popover>
                </div>
                <template v-else>
                    <el-popover v-for="(h, i) in mobile ? mobileHeaders : headers" :key="i" placement="bottom-start" trigger="hover">
                        <header-menu :menus="h.menus" :icon="h.icon" />
                        <el-button type="text" slot="reference" :class="{ active: isActiveMenu(h.title) }">
                            <IconFont :type="h.icon" class="menu-icon" />
                            <!-- <img :src="h.imgsrc" alt="" style="width:16px;height:16px;"> -->
                            {{ h.title }}
                        </el-button>
                    </el-popover>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import HeaderMenu from './Menu';
import HeaderSubMenu from './SubMenu';
import axios from 'axios';
import IconFont from '@/components/IconFont/iconfront';

export default {
    components: {
        IconFont,
        HeaderMenu,
        HeaderSubMenu
    },
    data() {
        return {
            mobile: isMobile(),
            logo: './static/assets/logo/mapgis_logo.png',
            activeMenu: '',
            activeTabs: {},
            urls: ['config-headers.json', 'config-headers-sub.json', 'config-headers-mobile.json', 'config-headers-sub-mobile.json'],
            headers: [],
            subheaders: [],
            mobileHeaders: [],
            mobileSubheaders: [],
            isShowMenu: false,
            style: {
                fontSize: '24px',
                color: '#000000',
                lineHeight: '72px'
            }
        };
    },
    created() {
        const vm = this;
        const { mobileSubheaders, subheaders } = this;
        const headers = isMobile() ? mobileSubheaders : subheaders;
        headers.forEach((h) => {
            this.activeTabs[h.title] = h.active ? h.active.toLowerCase() : undefined;
        });
        let nets = this.urls.map((url) => {
            return new axios(`../static/demo/config/${url}`);
        });
        Promise.all(nets).then((res) => {
            vm.headers = res[0].data;
            vm.subheaders = res[1].data;
            vm.mobileHeaders = res[2].data;
            vm.mobileSubheaders = res[3].data;
        });
    },
    mounted() {
        let mapmode = this.$route.params.mapmode;
        let active = mapmode ? mapmode.toLowerCase() : undefined;
        this.activeMenu = active;
    },
    watch: {
        $route(to, from) {
            // 对路由变化作出响应...
            const { mobileSubheaders, subheaders } = this;
            let mapmode = to.params.mapmode;
            if (mapmode !== from.params.mapmode) {
                const headers = this.mobile ? mobileSubheaders : subheaders;
                this.activeMenu = mapmode.toLowerCase();
                headers.forEach((header) => {
                    header.menus.forEach((m) => {
                        let active = m.title.toLowerCase();
                        if (active === mapmode) {
                            this.activeTabs[header.title] = active;
                        }
                    });
                });
            }
        }
    },
    methods: {
        isActiveTab(title) {
            title = title.toLowerCase();
            Object.keys(this.activeTabs).forEach((key) => {
                let active = this.activeTabs[key];
                if (title.indexOf(active) >= 0) {
                    return true;
                }
            });
            return false;
        },
        isActiveMenu(title) {
            if (!this.activeMenu || !title) return false;
            title = title.toLowerCase();
            if (title.indexOf(this.activeMenu) >= 0) {
                return true;
            }
            if (title === "组件" && this.activeMenu === "component"){
                return true
            }
            return false;
        }
    }
};
</script>

<style lang="scss">
.mapgis-header-mobile {
    height: 48px !important;
    .mapgis-webclient-logo {
        margin-left: 22px !important;
        height: 24px !important;
    }
    .mapgis-webclient-header {
        width: fit-content;
        height: 48px !important;
    }
    .mapgis-webclient-menu {
        margin-right: 22px !important;
    }

    .mapgis-webclient-menu {
        height: 48px !important;
        span {
            font-size: 13px !important;
            height: 48px !important;
            line-height: 48px !important;
        }
    }
}
.mapgis-header {
    font-family: Microsoft YaHei;
    width: 100%;
    padding: 0px !important;
    height: 71px;
    background: #ffffff;
    box-shadow: 0px 3px 7px 0px rgba(13, 43, 77, 0.15);

    .mapgis-webclient-header {
        width: fit-content;
        height: 71px;
        align-items: center;
        float: left;
        display: flex;

        .mapgis-webclient-logo {
            margin-left: 11px;
            margin-top: -2px;
            height: 38px;
        }
        .mapgis-webclient-text {
            width: fit-content;
            height: 24px;
            margin-left: 13px;
            color: #3a85c6;
            font-stretch: normal;
            letter-spacing: 1.5px;
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            font-style: italic;
            line-height: 24px;
        }
        .menu-icon {
            margin-right: 8px !important;
        }
    }

    .mapgis-webclient-menu-icon {
        float: right;
        height: 72px;
        margin-right: 48px;
        cursor: pointer;
        display: none;

        @media screen and (max-width: 1220px) {
            display: block;
        }
    }

    .mapgis-webclient-menu {
        z-index: 200;
        position: relative;
        display: flex;
        align-items: center;
        height: 72px;

        .mapgis-webclient-nav {
            margin-left: auto;
            margin-right: 92px;
        }

        @media screen and (max-width: 1220px) {
            width: 100%;
            flex-wrap: wrap;
            background-color: rgba(37, 45, 69, 0.5);
            display: none;

            &.is-show {
                display: flex;
            }
        }

        span {
            width: fit-content;
            margin: 0px 2px;
            padding: 0px 4px;
            // margin-let: 12.5px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            text-align: center;
            color: #3f454d;
            line-height: 45px;

            .el-button {
                padding: 0;
                border-width: 0;
            }
        }

        span:hover {
            color: #3a85c6 !important;
        }

        .active {
            border-radius: 0px;
            border-bottom: 3px solid #3a85c6 !important;
            //span {
            //    color: linear-gradient(90deg, #4794fa, #31e1e6) !important;
            //    font-size: bold;
            //}
        }
    }
}
</style>
