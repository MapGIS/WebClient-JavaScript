<template>
    <div class="header-menu-wrapper" :class="{ 'header-menu-wrapper-mobile': mobile }">
        <div class="header-menu-col" v-for="menu in menus" :key="menu.title">
            <!-- <IconFont :type="icon" /> -->
            <div>
                <IconFont :type="menu.icon" class="menu-icon" />
                <span :class="{ strong: strong, 'light-title': light }">{{ menu.title }}</span>
            </div>
            <el-divider v-if="divider"></el-divider>
            <p v-else />
            <div class="header-menu-links" v-for="(link, i) in menu.links" :key="i">
                <div class="header-menu-link" v-for="(l, j) in link" :key="j">
                    <div class="header-menu-link-text" v-if="isLink(menu.routes[i][j])">
                        <el-badge type="success" :is-dot="menu.hightlights[i][j]"  class="menu-badge">
                            <a class="header-menu-link-text" :href="menu.routes[i][j]" target="_blank">
                                <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                            </a>
                        </el-badge>
                    </div>
                    <div class="header-menu-link-text" v-else-if="isDocs(menu.routes[i][j])">
                        <el-badge type="success" :is-dot="menu.hightlights[i][j]"  class="menu-badge">
                            <a class="header-menu-link-text" :href="menu.routes[i][j]">
                                <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                            </a>
                        </el-badge>
                    </div>
                    <router-link v-else :to="menu.routes[i][j]">
                        <div class="header-menu-link-text">
                            <el-badge type="success" :is-dot="menu.hightlights[i][j]" 
                             class="menu-badge">
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
import IconFont from '@/components/IconFont/iconfront';

export default {
    components: {
        IconFont
    },
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
@media (max-width: 640px) {
    .header-menu-wrapper {
        padding: 0 0vw;
    }
}
@media (min-width: 720px) {
    .header-menu-wrapper {
        padding: 0 3vw;
    }
}
@media (min-width: 960px) {
    .header-menu-wrapper {
        padding: 0 5vw;
    }
}

@media (min-width: 1280px) {
    .header-menu-wrapper {
        padding: 0 8vw;
    }
}

.header-menu-wrapper {
    display: flex;
    flex-wrap: wrap;
    // width: fit-content;
    width: 100vw;
    height: calc(100vh - 180px);
    overflow: auto;
    background: #062f52;
    box-shadow: 0px 1px 9px 0px rgba(0, 0, 12, 0.1);
    opacity: 0.9;
    .menu-badge {
        /*  padding-top: -30px !important;
    padding-right: -30px !important;
    margin-right: -30px !important; */
    }
    .el-badge__content {
        border: 0px solid transparent;
    }
    .el-badge__content--success {
        background-color: #3a85c6;
        top: 5px;
        right: 0px;
    }
    .el-badge__content.is-fixed.is-dot {
     top: 5px;
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
            font-weight: bold;
            color: #ffffff;
            line-height: 36px;
        }
    }
    .menu-icon {
        color: #47abff;
        font-size: 16px;
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
        height: 36px;
        span {
            margin-left: 0px;
            width: 61px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 500;
            color: #ffffff;
            line-height: 36px;
        }
    }
    .header-menu-link:hover {
        width: 160px;
        height: 36px;
        // border-radius: 4px;
    }
    .header-menu-link-text {
        width: 160px;
        height: 36px;
        display: block;
    }
    .header-menu-link-text:hover{
      span{
        color: #47abff !important;
      }
    }
}

.header-menu-wrapper-mobile {
    .header-menu-link {
        width: 120px !important;
    }
}

.el-popover {
    overflow: hidden;
    border: 1px solid #062f52 !important;
    background: #062f52 !important;
    opacity: 0.9;
    border-radius: 4px;
    box-shadow: 0px 1px 9px 0px rgba(0, 0, 12, 0.1);
    width: 100vw !important;
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
