<template>
    <div class="plugins-group-card">
        <div v-for="(g, i) in Object.keys(list)" :key="i" class="group">
            <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(l, index) in list[g].list" :key="index">
                    <el-card v-bind:style="list[g].styleObject" class="little-card">
                        <div class="info-title">{{ l.name }}</div>
                        <div class="info-detail">{{ l.info }}</div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Object
    }
};
</script>

<style lang="scss" scoped>
.plugins-group-card {
    .group {
        .el-card {
            width: 90%;
            height: 200px;
            // display: inline-block;
            margin: 12px;
            border-radius: 20px;
        }
    }
    a {
        span {
            color: #3a85c6;
        }
    }
}
.info-title {
    padding: 0 0 16px 0;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #3a85c6;
    line-height: 36px;
}
.info-detail {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #6c7582;
    line-height: 24px;
}
</style>
