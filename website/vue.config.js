module.exports = {
    css: {
        loaderOptions: {
            less: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px'
                },
                javascriptEnabled: true
            }
        }
    }
};
