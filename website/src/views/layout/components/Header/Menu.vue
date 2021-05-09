<template>
    <div class="header-menu-wrapper" :class="{ 'header-menu-wrapper-mobile': mobile }">
        <div class="header-menu-col" v-for="menu in menus" :key="menu.title">
            <!-- <IconFont :type="icon" /> -->
            <span :class="{ strong: strong, 'light-title': light }">{{ menu.title }}</span>
            <el-divider v-if="divider"></el-divider>
            <p v-else />
            <div class="header-menu-links" v-for="(link, i) in menu.links" :key="i">
                <div class="header-menu-link" v-for="(l, j) in link" :key="j">
                    <div class="header-menu-link-text" v-if="isLink(menu.routes[i][j])">
                        <el-badge type="success" :value="menu.hightlights[i][j] ? hint : ''" class="menu-badge">
                            <a class="header-menu-link-text" :href="menu.routes[i][j]" target="_blank">
                                <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                            </a>
                        </el-badge>
                    </div>
                    <div class="header-menu-link-text" v-else-if="isDocs(menu.routes[i][j])">
                        <el-badge type="success" :value="menu.hightlights[i][j] ? hint : ''" class="menu-badge">
                            <a class="header-menu-link-text" :href="menu.routes[i][j]">
                                <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                            </a>
                        </el-badge>
                    </div>
                    <router-link v-else :to="menu.routes[i][j]">
                        <div class="header-menu-link-text">
                            <el-badge type="success" :value="menu.hightlights[i][j] ? hint : ''" class="menu-badge">
                                <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                            </el-badge>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';

export default {
    name: 'HeaderMenu',
    props: {
        icon: {
            type: String
        },
        title: {
            type: String
        },
        menus: {
            type: Array
        },
        divider: {
            type: Boolean,
            default: true
        },
        strong: {
            type: Boolean,
            default: false
        },
        light: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mobile: isMobile(),
            hint: '新'
        };
    },
    methods: {
        isLink(link) {
            if (link.indexOf('http') >= 0 || link.indexOf('storybook') >= 0) {
                return true;
            }
            return false;
        },
        isRoute(link) {
            if (link.indexOf('helper') >= 0) {
                return true;
            }
            return false;
        },
        isDocs(link) {
            if (link.indexOf('docs') >= 0) {
                return true;
            }
            return false;
        }
    }
};
</script>

<style lang="scss">
.header-menu-wrapper {
    display: flex;
    flex-wrap: wrap;
    // width: fit-content;
    width: calc(100vw - 51px);
    padding: 0 175px;
    height: 600px;
    max-width: 100vw;
    overflow: auto;
    background: #1c1c1c;
    box-shadow: 0px 1px 9px 0px rgba(0, 0, 12, 0.1);
    opacity: 0.9;
    .menu-badge {
        /*  padding-top: -30px !important;
    padding-right: -30px !important;
    margin-right: -30px !important; */
    }
    .el-divider--horizontal {
        display: block;
        height: 1px;
        width: 100%;
        margin: 16px 0;
    }
    .header-menu-col {
        margin: 19px 30px;
        width: fit-content;
        height: fit-content;
        span {
            margin-left: 10px;
            width: 60px;
            height: 14px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
        }
    }
    .strong {
        font-weight: bold !important;
    }
    .light-title {
        color: #ffffff !important;
    }
    .light-subtitle {
        color: #ffffff88 !important;
    }
    .header-menu-links {
        display: inherit;
        float: left;
        height: fit-content;
    }
    .header-menu-link {
        width: 160px;
        height: 30px;
        span {
            margin-left: 10px;
            width: 61px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: 30px;
        }
    }
    .header-menu-link:hover {
        width: 160px;
        height: 30px;
        // border-radius: 4px;
        background: linear-gradient(90deg, rgba(71, 148, 250, 1), rgba(49, 225, 230, 1));
    }
    .header-menu-link-text {
        width: 160px;
        height: 30px;
        display: block;
    }
}

.header-menu-wrapper-mobile {
    .header-menu-link {
        width: 120px !important;
    }
}

.el-popover {
    border: 1px solid #062f52 !important;
    background: #1c1c1c !important;
}

.popper__arrow {
    border-bottom-color: #062f52 !important;
    opacity: 0.9;
}

.popper__arrow::after {
    border-bottom-color: #062f52 !important;
    opacity: 0.9;
}
</style>
