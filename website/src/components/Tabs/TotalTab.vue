<template>
    <div class="overview-header">
        <div class="title">概述<span>SUMMARY</span></div>
        <div class="overview-nav">
            <router-link to="/total/core" :class="{ select: $route.path === '/total/core' }">
                <div class="item">核心服务</div>
                <div class="triangle"></div>
            </router-link>
            <router-link to="/total/detail" :class="{ select: $route.path === '/total/detail' }">
                <div class="item">详细服务</div>
                <div class="triangle"></div>
            </router-link>
            <router-link to="/total/use" :class="{ select: $route.path === '/total/use' }">
                <div class="item">调用方式</div>
                <div class="triangle"></div>
            </router-link>
            <router-link to="/total/select" :class="{ select: $route.path === '/total/select' }">
                <div class="item">四大引擎选择 </div>
                <div class="triangle"></div>
            </router-link>
            <router-link to="/total/download" :class="{ select: $route.path === '/total/download' }">
                <div class="item">选择下载</div>
                <div class="triangle"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'total-tab'
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.overview-header {
    width: 100%;
    height: 240px;
    background-image: url('../../../public/static/assets/total/totallogo.png');
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
        padding: 0 10vw;
        background-color: rgba(255, 255, 255, 0.13);
        box-shadow: -1px 4px 8px 0px rgba(0, 0, 0, 0.1);

        a {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;

            &.select {
                background-color: rgba(255, 255, 255, 0.14);

                .triangle {
                    position: absolute;
                    bottom: 0;
                    width: 0;
                    height: 0;
                    margin: 0 auto;
                    border-top: 10px solid transparent;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid #ffffff;
                }
            }

            .item {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
            }
        }
    }
}
</style>
