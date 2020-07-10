// 执行下列两个命令，安装 eslint 和 prettier 工具
// npm add --dev prettier
// npm i -D eslint-plugin-prettier

module.exports = {
    // 超过最大值换行
    printWidth: 150,

    // 缩进为4个空格
    tabWidth: 4,

    // 不使用缩进符，而使用空格
    useTabs: false,

    // 是否在语句末尾加分号
    semi: true,

    // 单引号
    singleQuote: true,

    // 数组 对象尾随不需要逗号
    trailingComma: 'none',

    // 对象空格 { foo: bar }, false=> {foo:bar}
    bracketSpacing: true,

    // jsx闭标签是否另起一行 <Test></Test>
    jsxBracketSameLine: true,

    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',

    // 不需要写文件开头的 @prettier
    requirePragma: false,

    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,

    // 使用默认的折行标准
    proseWrap: 'preserve',

    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',

    // 换行符使用 lf
    endOfLine: 'lf'
};
