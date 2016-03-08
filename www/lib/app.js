/**
 * Created by xudao on 16/3/8.
 */
(function(){
    xuSPA.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'index': {
                templateUrl: 'template/tab-index.html',
                controller: 'IndexCtr',
                jsCtr: 'js/index.js'
            },
            'circle': {
                templateUrl: 'template/tab-circle.html',
                controller: 'CircleCtr',
                jsCtr: 'js/circle.js'
            },
            'news': {
                templateUrl: 'template/tab-news.html',
                controller: 'NewsCtr',
                jsCtr: 'js/news.js'
            },
            'defaults': 'index' //默认路由
        }
    });
})()
