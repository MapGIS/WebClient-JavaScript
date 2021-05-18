<template>
    <el-container>
        <el-header :class="{ 'webclient-three-header-mobile': mobile, 'webclient-three-header': true }">
            <Header></Header>
        </el-header>
        <el-main class="webclient-three-layout">
            <div class="overview-header">
                <div class="title">概述<span>SUMMARY</span></div>
                <div class="overview-nav">
                    <router-link to="/total/core">
                        <div :class="['item',{select:$route.path === '/total/core'}]">
                            核心服务
                            <div class="triangle"></div>
                        </div>
                    </router-link>
                    <router-link to="/total/detail">
                        <div :class="['item',{select:$route.path === '/total/detail'}]">
                            详细服务
                            <div class="triangle"></div>
                        </div>
                    </router-link>
                    <router-link to="/total/use">
                        <div :class="['item',{select:$route.path === '/total/use'}]">
                            调用方式
                            <div class="triangle"></div>
                        </div>
                    </router-link>
                    <router-link to="/total/select">
                        <div :class="['item',{select:$route.path === '/total/select'}]">
                            四大引擎选择
                            <div class="triangle"></div>
                        </div>
                    </router-link>
                    <router-link to="/total/download">
                        <div :class="['item',{select:$route.path === '/total/download'}]">
                            选择下载
                            <div class="triangle"></div>
                        </div>
                    </router-link>
                </div>
            </div>
            <app-main></app-main>
        </el-main>
        <el-footer :height="mobile ? '300' : '250'" style="padding: 0px">
            <main-footer></main-footer>
        </el-footer>
    </el-container>
</template>

<script>
import { Header, AppMain, MainFooter } from './components';
import { isMobile } from '@/utils/mobile';

export default {
    name: 'layoutthree',
    components: {
        Header,
        AppMain,
        MainFooter
    },
    data() {
        return {
            mobile: isMobile()
        };
    },
    computed: {},
    methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-three-header-mobile {
    padding: 0px;
    height: 48px !important;
}
.webclient-three-header {
  padding: 0px;
  height: 72px !important;
}
.webclient-three-layout {
    padding: 0px;
    min-height: 80vh;
    // height: fit-content;
    margin: 0px 0px;

    .overview-header {
        width: 100%;
        height: 240px;
        background-image: url('../../../public/static/assets/total/overview.png');
        background-size: 100% 240px;

        .title {
            height: 176px;
            font-size: 30px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            font-style: italic;
            color: #ffffff;
            line-height: 176px;
            margin-left: 130px;

            span {
                margin-left: 15px;
                color: rgba(255, 255, 255, 0.3);
            }
        }

        .overview-nav {
            display: flex;
            height: 64px;
            padding: 0 122px;
            background-color: rgba(255, 255, 255, 0.13);
            box-shadow: -1px 4px 8px 0px rgba(0, 0, 0, 0.1);

            a {
                flex: 1;

                .item {
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 64px;
                    text-align: center;

                    &.select {
                        background-color: rgba(255, 255, 255, 0.14);

                        .triangle {
                            width: 0;
                            height: 0;
                            margin: -20px auto 0;
                            border-top: 10px solid transparent;
                            border-left: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-bottom: 10px solid #ffffff;
                        }
                    }
                }
            }
        }
    }
}
.el-footer {
    padding: 0 0px;
}
</style>
