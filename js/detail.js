// 入口函数
window.addEventListener('load',function(){
    var preview = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var bigImg = document.querySelector('.bigImg');
           /*  1.鼠标移动到，显示左边遮挡层，右边大图;鼠标离开，隐藏 */
    preview.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        bigImg.style.display ='block';
         
    })
    preview.addEventListener('mouseout', function(){
        mask.style.display = 'none';
        bigImg.style.display = 'none';
    })

    /* 遮挡层和大图显示，让遮挡层跟着鼠标移动
            mask.style.top=?
            mask.style.left=? */
    preview.addEventListener('mousemove',function(e){
        // 1.获得鼠标在盒子的坐标
        var x = e.pageX - this.offsetLeft
        var y = e.pageY - this.offsetTop;
        //2.获取--遮挡层中心，在盒子的绝对定位的坐标
        var maskx = x - mask.offsetWidth  / 2;
        var masky = y - mask.offsetHeight / 2;
       
        // 3.获取遮挡层最小，最大移动区域
        var maskx_Max =this.offsetWidth - mask.offsetWidth;
        var masky_Max =this.offsetHeight - mask.offsetHeight;
        if (maskx <= 0) {
            maskx = 0;
        }else if (maskx >= maskx_Max){
            maskx = maskx_Max;
        }
        if (masky <=0) {
            masky = 0;
        }else if(masky >= masky_Max){
            masky = masky_Max;
        }
        // 4.设置坐标
        mask.style.left = maskx + 'px';
        mask.style.top = masky + 'px';
        // 5.获取，设置大图的移动坐标，相对于遮挡层。
                // 1.获取大图最大移动距离       
                     //----如果大图片比大盒子还要大呢？？？----为了让大图片边框超出部分，不显示出来
        var pic = document.querySelector('.bigImg_pic');
        var picx_Max = bigImg.offsetWidth - pic.offsetWidth;
        var picy_Max = bigImg.offsetHeight - pic.offsetHeight;

                // 2.获取大图片的坐标
        var picX =  picx_Max / maskx_Max * maskx;
        var picY =  picy_Max / masky_Max * masky;
                //3.设置大图移动坐标
                         //----如果大图片比大盒子还要大呢？？？----为了让大图片边框超出部分，不显示出来
                         //所以这里不用加负号
        pic.style.left = picX + 'px';
        pic.style.top = picY + 'px';      
                        //大小盒子的比例来移动图片，可能会让大图片边框外部露出来（露出大盒子的背景）
        /* var bigImgx = pic.offsetWidth / this.offsetWidth *  maskx;
        var bigImgy = pic .offsetHeight / this.offsetHeight * masky;
        pic.style.left = -bigImgx + 'px';
        pic.style.top = -bigImgy + 'px'; */
    })  
})