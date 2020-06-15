//入口函数
window.addEventListener("load",function(){

// 案例1：实现固定右侧侧边栏，跟随屏幕移动到某位置改为固定定位，显示返回顶部功能
    var main = document.querySelector('.main')
    var fixedtoll = document.querySelector('.fixedtool');
    var maintop  = main.offsetTop;
    var fixedtop = fixedtoll.offsetTop;
    var scrooltop = fixedtop - maintop;

    var goback = document.querySelector('.goback')
    var floor = document.querySelector('.floor'); 
    var floortop = floor.offsetTop;
    //页面绑定滚屏事件
    document.addEventListener('scroll',function(){
        //当页面滑动到mian时，改为固定定位，设置top
       if(window.pageYOffset >= maintop ){
        fixedtoll.style.position = 'fixed';
        fixedtoll.style.top = scrooltop + 'px';
       }
        //当页面返回滑动到mian时，改为绝对定位定位，设置top
        else{
            fixedtoll.style.position = 'absolute';
                        //动态获取fixedtoll的top值
            fixedtoll.style.top = fixedtop + 'px';
       }
        //当页面下滑到floor时候，侧边栏显示返回顶部
       if (window.pageYOffset >= floortop) {
           goback.style.display = 'block';
        //当页面上滑到floor以上时候，侧边栏的返回顶部隐藏
       } else {
           goback.style.display = 'none';
       }
    })





// 案例2：实现轮播图(焦点图)切换---调用封装好的animate动画js文件
    //1.鼠标悬停focus，上一张、下一张按钮显示
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 11.1鼠标经过，取消图片自动播放功能，取消定时器;清除定时器变量
        clearInterval(timer);
        timer=null;
    })
    // 2.，鼠标未经过focus，两个按钮隐藏
    focus.addEventListener('mouseleave', function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 11.2鼠标离开，让图片接着自动播放，重新开启定时器
        timer = setInterval(function(){
            arrow_r.click();
        },3000)
    })
    // 3.根据图片数量，动态生成小圆圈--为小圆点绑定单击切换图片事件
    var focus_img = document.querySelector('.focus_img');
    var circle = document.querySelector('.circle');
    var focus_width = focus.offsetWidth;
    var ul = document.querySelector('.focus_img');
        //全局变量，num用来记录上下一张图片的位置标记；circle_num用来记录小圆圈位置的标记；
        // 因为小圆圈和图片色ul里面的li个数不一样多的
    var num =0;
    var circle_num = 0;
    for(var i = 0; i <focus_img.children.length; i++){
        var li = document.createElement('li');
        li.setAttribute('index', i);
        circle.appendChild(li);
        // 4.为每一个li添加鼠标点击事件,为点击点小圆点设置样式（排他思想），切换图片；
        li.addEventListener('click', function(){
           for(var i = 0; i < circle.children.length; i++){
            circle.children[i].className = '';
           }
           this.className = 'current';
            //点击事件触发，让定位的ul相应的移动focus的宽度....sd..xcv,,,mmcxvnxcdsmdjfsj为单位的距离【this代表当前的li】
            num = this.getAttribute('index');
           circle_num = this.getAttribute('index');
           animate(ul, -num * focus_width)
        })
    }
    // 未点击圆圈按钮，默认让第一个为current样式
    circle.children[0].className = 'current';
    
    //【克隆第一张图片，作为最后一张图片】
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var flag = true;    //节流阀
    // 5.为右侧arrow_r绑定单击事件--下一张
    arrow_r.addEventListener('click', function(){
        console.log(flag);
        if(true){
            flag = false;
                //  6.最后一张和第一张切换时候：无缝滚动：如果图片是最后一张（克隆），则切换作为为第一张坐标
        if(num == ul.children.length-1){
            ul.style.left = 0;
            num = 0;
        }
        num ++;
                // ul左侧移动，目标值为负数,除了第一张，其余相对于有定位的父盒子坐标都是负数（在左边）
        animate(ul, -num * focus_width, function(){
            flag = true;
        });

        // 7.下一张按钮切换的同时，下面的小圆圈跟着改变当前current样式,（排他思想）
        circle_num ++;
        if (circle_num == circle.children.length) {
            circle_num =0;
        }                   
        changeCurrent();
        }
    })

    // 8.为左侧的arrow_l绑定单击事件，切换上一张
    arrow_l.addEventListener('click', function(){
        if (true) {
            flag = false;
            if(num == 0){
                ul.style.left = -(ul.children.length-1) * focus_width + 'px';
                num = ul.children.length-1;
            }
            num --;
            // 除了第一张，其余相对于有定位的父盒子坐标都是负数（在左边）
            animate(ul, -num*focus_width, function(){
                flag = true;
            });
            
            // 9.上一张切换的同时，下面的小圆圈跟着改变当前current样式,（排他思想）
            circle_num --;
            if (circle_num == -1) {
                circle_num = circle.children.length-1;            
            }
            changeCurrent();
        }
    })
    // 10.为重复的代码--改变当前小圆点样式---封装方法
    function changeCurrent (){
                        //小于，不包含最后一个
        for(var i = 0; i < circle.children.length; i++){
            circle.children[i].className = '';
        }
        circle.children[circle_num].className = 'current';
    }
    // 11.focus鼠标未悬停，图片自动隔3000ms时间切换【所以定时器先设置在外面全局变量】
        // 当鼠标经过，取消定时器；当鼠标离开，重新开启定时器；
    var timer = setInterval(function(){
            //手动调用---点击事件
        arrow_r.click()
    },5000);
    


// 案例3：goTop按钮点击返回页面的顶部
    var goTop = document.querySelector('.goTop');
    goTop.addEventListener('click', function(){
        animatePageY(window, 0,)
    })


// 案例4：模仿津筋斗云案例
    var cloud = document.querySelector('.cloud');
    var nav = document.querySelector('.navitems');
    var lis = nav.querySelectorAll('li');
    var current = 0;
    for(var i = 0; i < lis.length; i ++ ){
            // 鼠标经过事件---mouseenter不会冒泡，子盒子不会触发事件
        lis[i].addEventListener('mouseenter', function(){
            animate(cloud, this.offsetLeft);
        })
            // 鼠标离开事件
        lis[i].addEventListener('mouseout', function(){
            animate(cloud, current);
        })
            //鼠标点击事件，让精斗云的初始位置改为在当前位置
        lis[i].addEventListener('click', function(){
            current = this.offsetLeft;
        })
    }

})