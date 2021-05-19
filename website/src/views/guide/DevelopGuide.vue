<template>
    <el-container class="mapgis-guide-wrapper">
        <el-header style="padding: 0px" :height="mobile ? '48px' : '64px'">
            <Header></Header>
        </el-header>
        <div class="product-header">
            <!--      <img :src="imageUrl" class="img-class">-->
            <span class="product-span">开发指南</span>
        </div>
        <!--    <el-header class="product-header">-->
        <!--    </el-header>-->
        <el-container class="product-container">
            <el-aside class="aside-scroll-content">
                <el-scrollbar class="element-scroll-content" wrapStyle="overflow-x: hidden;" viewStyle="overflow-y: hidden;">
                    <span class="strong">{{ asideMenu.title }}</span>
                    <div class="header-menu-col">
                        <div id="develop-markdown-toc"></div>
                    </div>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <vue-markdown
                    :watches="['show', 'html', 'breaks', 'linkify', 'emoji', 'typographer']"
                    :style="{ padding: '2px 1vw' }"
                    :source="markdown"
                    :html="true"
                    :toc="true"
                    :toc-first-level="2"
                    toc-id="develop-markdown-toc"
                    toc-class="mapgis-toc-class"
                    :toc-anchor-link="true"
                    :linkify="true"
                    @rendered="markdownRendered"
                    @toc-rendered="tocRendered"
                ></vue-markdown>
                <el-backtop></el-backtop>
            </el-main>
        </el-container>
        <el-footer :height="mobile ? '300' : '250'" style="padding: 0px">
            <main-footer></main-footer>
        </el-footer>
    </el-container>
</template>

<script>
import axios from 'axios';
import { isMobile } from '@/utils/mobile';
import { Header, MainFooter } from '@/views/layout/components';
import Prism from 'prismjs';
import VueMarkdown from 'vue-markdown';
import 'prismjs/themes/prism-coy.css'; // theme
import 'prismjs/components/prism-javascript'; // language
// theme css
import '@/styles/markdown.css';
import '@/styles/prism.css';

export default {
    name: 'developGuide',
    data() {
        return {
            mobile: isMobile(),
            asideContent: '',
            asideMenu: '',
            light: true,
            imageUrl: './static/assets/product/component.png',
            hint: '新',
            markdown: '> `暂无说明`, 请检查改目录下的帮助说明是否存在',
            isContentFinish: false,
            isTocFinish: false
        };
    },
    components: {
        Header,
        MainFooter,
        VueMarkdown
    },
    mounted() {
        this.initConfig();
        this.initScroll();
    },
    methods: {
        initScroll() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    let id = entry.target.getAttribute('id');
                    id = encodeURI(id);
                    if (entry.intersectionRatio > 0) {
                        document.querySelector(`li a[href="#${id}"]`).parentElement.classList.add('active');
                    } else {
                        document.querySelector(`li a[href="#${id}"]`).parentElement.classList.remove('active');
                    }
                });
            });
            document.querySelectorAll('h2[id]').forEach((section) => {
                observer.observe(section);
            });
            document.querySelectorAll('h3[id]').forEach((section) => {
                observer.observe(section);
            });
        },
        initConfig() {
            let anchors = location.href.split('#');
            if (!anchors || anchors.length < 2) return;

            let hrefs = anchors[1].split('/').slice(2);
            let mode = this.getMapMode();
            let file = hrefs[hrefs.length - 1];
            this.resetHtml(mode, file);
            this.getAsideList();
        },
        getMapMode() {
            var mapMode = 'leaflet';
            if (this.$route.path.indexOf('leaflet') > 0) {
                mapMode = 'leaflet';
            } else if (this.$route.path.indexOf('openlayer') > 0) {
                mapMode = 'openlayers';
            } else if (this.$route.path.indexOf('cesium') > 0) {
                mapMode = 'cesium';
            } else if (this.$route.path.indexOf('mapboxgl') > 0) {
                mapMode = 'mapboxgl';
            } else if (this.$route.path.indexOf('component') > 0) {
                mapMode = 'component';
            }
            return mapMode;
        },
        resetHtml(mode, file) {
            this.loading = true;
            var self = this;

            window.console.log('reset', mode, file);

            var url = this.getHtmlUrl(mode, file);
            axios
                .get(url)
                .then((response) => {
                    self.markdown = response.data;
                })
                .catch(() => {
                    window.console.warn('暂无该帮助的markdown说明，后续持续补充......');
                });
        },
        getHtmlUrl(type, image) {
            var baseUrl = './static/demo/';
            var imageUrl = baseUrl + type + '/source/' + image + '.md';
            return imageUrl;
        },
        getAsideList() {
            let self = this;
            let asideUrl = './static/demo/config/config-headers.json';
            axios.get(asideUrl).then((response) => {
                let temp = response.data;
                for (let i in temp) {
                    if ('组件' === temp[i].title.toLowerCase()) {
                        self.asideContent = temp[i];
                        break;
                    }
                }
                self.asideMenu = self.asideContent.menus[1];
            });
        },
        markdownRendered() {
            this.isContentFinish = true;
            if (this.isTocFinish && this.isContentFinish) {
                this.initScroll();
            }
            this.$nextTick(() => {
                Prism.highlightAll();
            });
        },
        tocRendered() {
            this.isTocFinish = true;
            if (this.isTocFinish && this.isContentFinish) {
                this.initScroll();
            }
        }
    }
};
</script>

<style lang="less">
.mapgis-guide-wrapper {
    .mapgis-toc-class {
        ul {
            list-style-type: none;
            padding-left: 16px;
            margin: 8px 0px;
        }
        li {
            list-style-type: none;
            margin: 8px 0px;
        }
        a {
            color: #3f454d;
        }
        .active {
            border-left: 3px solid #000000;
            padding-left: 6px;
            color: #000000;
            font-weight: bold;
        }
    }
}

#develop-markdown-toc {
    width: fit-content;
}

.product-header {
    padding: 0;
    height: 240px !important;
    background-image: url('../../../public/static/assets/product/component.png');
    .product-span {
        width: fit-content;
        height: 240px;
        margin-left: 132px;
        color: rgba(255, 255, 255, 1);
        font-stretch: normal;
        letter-spacing: 1.5px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-style: italic;
        color: #ffffff;
        line-height: 240px;
    }
}
.img-class {
    height: 100%;
    width: 100%;
}
.product-container {
    height: fit-content;
    width: 100%;
    .aside-scroll-content {
        height: 100vh;
        // margin:36px 0px 36px 79px;
        overflow-x: hidden;
        background-color: #f5f7fb;
        top: 0px;
        position: sticky;
    }
}
.strong {
    font-weight: bold !important;
    margin: 4px 20px;
    width: 37px;
    height: 18px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    color: #333333;
    line-height: 48px;
}
.light-subtitle {
    color: #3c4858 !important;
}
.header-menu-link {
    margin: 4px 0px;
    width: fit-content;
    height: fit-content;
    span {
        width: 60px;
        height: 14px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 30px;
    }
}
.header-menu-col {
    padding: 5px 5px;
}
</style>
