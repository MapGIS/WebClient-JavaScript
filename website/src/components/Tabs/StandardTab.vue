<template>
    <div class="overview-header">
        <div class="title">协议<span>AGREEMENT</span></div>
        <div class="overview-nav">
            <router-link to="/standard/epsg">
                <div :class="['item', { select: $route.path === '/standard/epsg' }]">
                    epsg
                    <div class="triangle"></div>
                </div>
            </router-link>
            <!-- <router-link to="/standard/ogc">
                <div :class="['item', { select: $route.path === '/standard/ogc' }]">
                    ogc
                    <div class="triangle"></div>
                </div>
            </router-link> -->
            <router-link to="/standard/geojson">
                <div :class="['item', { select: $route.path === '/standard/geojson' }]">
                    geojson
                    <div class="triangle"></div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'plugin-tab'
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
</style>
