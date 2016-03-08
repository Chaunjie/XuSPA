/**
 * Created by xudao on 16/3/8.
 */
(function () {
    function XuSPA() {

    }

    XuSPA.prototype.start = function (config) {
        this.mainView = config.view;
        this.routerMap = config.router;
        this.defaultRoute = this.routerMap.defaults;

        initRouter();
        window.onhashchange = function () {
            initRouter();
        };
    };

    XuSPA.prototype.parse = function (routerHash) {
        var hash = typeof routerHash === 'undefined' ? location.hash : routerHash;
        var obj = {
            url: '',
            param: {}
        };
        var param = {}, url = '';
        var pIndex = hash.indexOf('?');
        if (hash === '') {
            return obj;
        }

        if (pIndex > -1) {
            url = hash.substring(1, pIndex);
            var paramStr = hash.substring(pIndex + 1);
            var paramArr = paramStr.split('&');
            paramArr.map(function(r){
                var item = r.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if (key !== '') {
                    param[key] = decodeURIComponent(val);
                }
            });
        }
        else {
            url = hash.substring(1);
            param = {};
        }
        return {
            url: url,
            param: param
        };
    };

    XuSPA.prototype.append = function (parent, text) {
        if (typeof text === 'string') {
            var temp = document.createElement('div');
            temp.innerHTML = text;
            var frag = document.createDocumentFragment();
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            parent.appendChild(frag);
        }
        else {
            parent.appendChild(text);
        }
    };

    XuSPA.prototype.html = function(parent, text){
        parent.innerHTML = text;
    };

    XuSPA.prototype.changeState = function(stateName, params){
        var paramsToString = '';
        for(var i in params){
            paramsToString+=(paramsToString.length > 1 ? '&' : '')+i+'='+params[i];
        }

        paramsToString = paramsToString !== '' ? '?'+paramsToString : paramsToString;

        window.location.hash = stateName + paramsToString;
    };

    function initRouter() {
        var hash = location.hash;
        var routeObj = xuSPA.parse(hash);

        loadSelfController(routeObj, function(){
            var router;
            var pIndex = hash.indexOf('?');
            if (pIndex > -1) {
                router = hash.substring(1, hash.indexOf('?'))
            }
            else {
                router = hash.substring(1);
            }

            var ctr = xuSPA.routerMap[router];

            //this.call(ctrs[ctr.controller]());
            loadScript(ctr.jsCtr);

        });
    }

    function loadSelfController(router, callback) {
        var routerUrl = router.url ? router.url : xuSPA.defaultRoute;
        var url = xuSPA.routerMap[routerUrl].templateUrl;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    xuSPA.html(document.querySelector(xuSPA.mainView), xhr.responseText);
                    callback && callback();
                }
            }
        }
        xhr.send();

    }

    function loadScript(src, callback) {

        var script = document.createElement('script'),
            loaded;
        script.setAttribute('src', src);
        script.onreadystatechange = script.onload = function() {
            script.onreadystatechange = null;
            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if(typeof callback==='function')
                    callback();
            }
            loaded = true;
        };
        document.documentElement.appendChild(script);
    }


    window.xuSPA = new XuSPA();

})();