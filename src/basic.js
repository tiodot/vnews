const Vue = require('vue');
const fs = require('fs');
const app = new Vue({
    template: '<div> Hello World! </div>'
});

const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./basic.template.html', 'utf-8')
});

const context = {
    title: 'Basic Example'
};

renderer.renderToString(app, context, (err, html) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(html);
});