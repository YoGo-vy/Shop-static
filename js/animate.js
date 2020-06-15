//js动画封装
function animate(obj, target, callback ) {
    //清除定时器，多次调用也保证只有一个动画执行
    clearInterval(obj.timer);
    //赋值对象属性方式设定定时器,没30ms循环执行
    obj.timer = setInterval(function () {
        //获取步长，往移动方向坐标轴取整数
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

            //算法有问题，当元素与目标值位置相差小于10px，不会移动，死循环！！！
        //判断当前位置是否已达目标位置，到达停止定时器
        if (obj.offsetLeft == target){
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
            
        }
        //else省略，没有达到目标距离，再进行设定对象移动left
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30)

}


    // 类似封装动画函数，缓慢返回也面顶部，也面别卷去的部分
function animatePageY(obj, target, callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(window.pageYOffset == target){
            clearInterval(obj.timer);
            callback && callback();
        }
        window.scroll(0, window.pageYOffset + step);
    }, 30);

}