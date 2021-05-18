<template>
    <div class="website-bug-commit">
        <plugin-tab />
        <el-row type="flex" justify="center">
            <el-col :span="mobile ? 22 : 12">
                <div class="bug-title">提交BUG说明</div>
                <h3>{{ subQuestion.title }}</h3>
                <div class="tip">
                    <p>
                        {{ subQuestion.detail }}
                        <a :href="'https://github.com/MapGIS/WebClient-JavaScript/issues'" target="_blank"
                            >https://github.com/MapGIS/WebClient-JavaScript/issues</a
                        >
                    </p>
                </div>
                <el-divider></el-divider>

                <h3>{{ funRequire.title }}</h3>
                <div class="tip">
                    <p>{{ funRequire.detail }}</p>
                    <br />
                    <el-image :class="{ 'image-mobile': mobile }" :src="funRequire.img" :preview-src-list="[funRequire.img]" />
                </div>
                <el-divider></el-divider>

                <h3>{{ bugReport.title }}</h3>
                <div class="tip">
                    <p>{{ bugReport.detail }}</p>
                    <br />
                    <el-image :class="{ 'image-mobile': mobile }" :src="bugReport.img" :preview-src-list="[bugReport.img]" />
                </div>
                <el-divider></el-divider>

                <h3>{{ estimate.title }}</h3>
                <div class="tip">
                    <p>{{ estimate.detail }}</p>
                    <br />
                    <el-image :class="{ 'image-mobile': mobile }" :src="estimate.img" :preview-src-list="[estimate.img]" />
                </div>
                <el-divider></el-divider>

                <h3>{{ applyBug.title }}</h3>
                <div class="tip">
                    <p>{{ applyBug.detail }}</p>
                    <br />
                    <el-image :class="{ 'image-mobile': mobile }" :src="applyBug.img" :preview-src-list="[applyBug.img]" />
                </div>
                <el-divider></el-divider>

                <h3>{{ assignees.title }}</h3>
                <div class="tip">
                    <p>{{ assignees.detail }}</p>
                    <br />
                    <el-image :class="{ 'image-mobile': mobile }" :src="assignees.img" :preview-src-list="[assignees.img]" />
                </div>
                <el-divider></el-divider>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import imgfunRequire from './bug-img/funRequire.png';
import imgbugReport from './bug-img/bugReport.png';
import imgestimate from './bug-img/estimate.png';
import imgapplyBug from './bug-img/applyBug.png';
import imgassignees from './bug-img/assignees.png';
import { isMobile } from '@/utils/mobile';
import PluginTab from '@/components/Tabs/PluginTab';

export default {
    components: { PluginTab },
    data() {
        return {
            mobile: isMobile(),
            subQuestion: {
                title: '新的问题',
                detail: '用户点击新问题，有两种方式可供选择。分别是功能需求、bug报告。其中功能需求更侧重于添加新的功能，完善此前不足；bug报告则是对功能本身存在不足提出要求。提交bug的网址为:'
            },
            funRequire: {
                title: '功能需求',
                detail: '提出问题的类型之一是功能需求，以下截图则为功能需求模板，可以根据给出的模板做相应的调整。',
                img: imgfunRequire
            },
            bugReport: {
                title: '问题报告',
                detail: '提出问题的类型之二是bug报告，当工程中存在bug未解决时，可以选择此模式，具体模板见下面截图。',
                img: imgbugReport
            },
            estimate: {
                title: '问题标签',
                detail: '当用户向维护者提出一个问题后，可以给此问题拟定一个可以表达此问题含义的标题，方便维护者查找。',
                img: imgestimate
            },
            applyBug: {
                title: '问题难度系数',
                detail: '给问题一定描述后，可以给此问题选择一个与此匹配的难度系数。',
                img: imgapplyBug
            },
            assignees: {
                title: '维护者',
                detail: '首先选择问题类型，然后给出问题的相关描述，最后给问题指定具体负责人。',
                img: imgassignees
            }
        };
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bug-title {
    margin: 48px 0 24px 0;
    width: 100%;
    height: 48px;
    background: #ebf7fe;
    font-size: 14px;
    line-height: 48px;
    text-indent: 17px;
    color: #333333;
}
.website-bug-commit {
    // margin: 30px 0px;
    h1 {
        font-size: 30px;
        text-align: center;
    }
    .tip {
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #50bfff;
        margin: 20px 0;
        .image-mobile {
            width: 80vw;
        }
    }
    .image-mobile {
        width: 90vw;
    }
}
</style>
