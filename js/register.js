window.onload = function(){

    // 实现表单提交前验证功能
    // 原span元素内容为空，判断验证通过显示相应的内容

    var phonenumber = document.querySelector('.phoneNumber');
    var qq = document.querySelector('.qq');
    var usename = document.querySelector('.useName');
    var msg = document.querySelector('.msg');
    var password = document.querySelector('.password');
    var resure = document.querySelector('.resure');


    var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
    var regQQ =  /^[1-9]\d{4,}$/;
    var regUseName = /^[\u4e00-\u9fa5]{2,8}$/;
    var regMsg = /^\d{6}$/;
    var regPassword =  /^[a-zA-Z0-9_-]{6,16}$/;

    check(phonenumber,regPhone);
    check(qq,regQQ);
    check(usename, regUseName);
    check(msg, regMsg);
    check(password,regPassword);



    // 封装一个函数，多个input输入框分别调用
    function check(obj,reg){
        obj.onblur = function(){
            if(reg.test(obj.value)){
                    // 获得兄弟节点对象
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>信息输入正确';
            }else{
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>信息输入错误';
            }
        }
    }
    //  确认重新输入密码
    resure.onblur = function(){
        if(resure.value == password.value){
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>信息输入正确';
        }else{
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>信息输入错误'; 
        }
    }

}