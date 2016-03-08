/**
 * Created by xudao on 16/3/8.
 */
(function () {
    /*var controller = function(){

     };

     controller.prototype.IndexCtr = function(){
     console.log('index');
     function click(){
     alert('index');
     }
     };

     controller.prototype.CircleCtr = function(){
     console.log('circle');
     function click(){
     alert('circle');
     }
     };

     controller.prototype.NewsCtr = function(){
     console.log('news');
     function click(){
     alert('news');
     }
     };

     window.ctrs = new controller();*/
    var ctrs = {
        IndexCtr: function () {
            console.log('index');
            function click() {
                alert('index');
            }
        },

        CircleCtr: function () {
            console.log('circle');
            function click() {
                alert('circle');
            }
        },

        NewsCtr: function () {
            console.log('news');
            function click() {
                alert('news');
            }
        }
    };

    //return ctrs;
    window.ctrs = ctrs;
})();