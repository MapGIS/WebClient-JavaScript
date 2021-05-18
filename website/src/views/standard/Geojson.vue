<template>
    <div class="webclient-geojson-wrapper">
        <standard-tab />
        <div class="standard-content">
            <div class="standard-content-link">
                <a href="http://epsg.io/">GeoJSON官方网址</a>
            </div>
            <el-table
                border
                :header-cell-style="{ background: '#F5F7FA', fontFamily: 'Microsoft YaHei', fontWeight: 'bold', color: '#606266' }"
                :cell-style="{ fontFamily: 'Microsoft YaHei' }"
                style="width: 100%; margin: 32px 0"
                :data="tableData"
            >
                <el-table-column label="图解" prop="img" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" min-width="70" height="70" />
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="type" width="150"></el-table-column>
                <el-table-column label="格式" prop="format">
                    <template slot-scope="scope">
                        <div v-html="formatMethod(scope.row.format)"></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { isMobile } from '@/utils/mobile';
import geojson from '../../config/config-geojson';
import StandardTab from '@/components/Tabs/StandardTab';

export default {
    components: {
        StandardTab
    },
    data() {
        return {
            mobile: isMobile(),
            tableData: geojson.data
        };
    },
    methods: {
        formatMethod(data) {
            return data.replace(/\n/g, '<br />');
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.standard-content {
    min-height: 70vh;
    padding: 0 10vw;
    .standard-content-link {
        margin: 24px 0;
        width: 100%;
        height: 48px;
        background: #ebf7fe;
        font-size: 14px;
        line-height: 48px;
        text-indent: 17px;
        color: #3a85c6;
    }
}
</style>
