function changeToState(state, params, dom){
    xuSPA.changeState(state, params);
    document.querySelector('.aui-bar-tab .active-primary').classList.remove('active-primary');
    dom.classList.add('active-primary');
}

function siblings(elem) {
    var a = [];
    var b = elem.parentNode.children;
    for(var i =0;i < b.length;i++) {
        if(b[i] !== elem) a.push(b[i]);
    }
    return a;
}