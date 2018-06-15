//6-16位，数字+英文+_组成的用户名
function regUserName(id){
    var username=$(id).val();
    var regUerName=/^(?![0-9]+$)[a-zA-Z0-9_]+$/;
    if(username.length < 6 || username.length > 16){
        showPop('<p style="text-align: center;padding:.2rem 0">请输入6-16位用户名</p>');
        return false;
    }else if(!regUerName.test(username)){
        showPop('<p style="text-align: center;padding:.2rem 0">用户名必须由字母、数字、_组成</p>');
        return false;
    }else{
        return true;
    }
}

//手机号
function regPhone(id){
    var phone=$(id).val();
    var regPhone=/^[1][34578][0-9]{9}$/;/*phone*/
    if(phone==""){
        showPop('<p style="text-align: center;padding:.2rem 0">手机号不能为空</p>');
        return false;
    }else if(!regPhone.test(phone)){
        showPop('<p style="text-align: center;padding:.2rem 0">手机号有误</p>');
        return false;
    }else{
        return true
    }
}

//6-16位密码
function regPassword(id){
    var pass=$(id).val();
    var regPass=/^[a-zA-Z0-9_!@#$%^&]+$/;
    if(pass.length < 6 || pass.length > 16){
        showPop('<p style="text-align: center;padding:.2rem 0">请输入6-16位密码</p>');
        return false;
    }else if(!regPass.test(pass)){
        showPop('<p style="text-align: center;padding:.2rem 0">密码有误</p>');
        return false;
    }else{
        return true
    }
}

//确认密码
function regPassword2(id_this,id_pass){
    var rePass=$(id_this).val();
    var pass=$(id_pass).val();
    if( rePass== "" || rePass == null){
		showPop('<p style="text-align: center;padding:.2rem 0">请输入确认密码</p>');
		return false;
	}else if(rePass!=pass){
		showPop('<p style="text-align: center;padding:.2rem 0">确认密码有误</p>');
		return false;
	}else{
		return true;
	}
}

//倒计时 60s
var timeinter=null;
function setTime(id){
	clearInterval(timeinter);
    var time=60;
    $(id).addClass('click');
    $(id).text(time+"s");
    timeinter=setInterval(function(){
        time=time-1;
        $(id).text(time+"s");
        if(time<=0){
            $(id).text("重新获取");
            $(id).removeClass("click");
            clearInterval(timeinter);
        }
    },1000);
}

//银行卡号
function luhmCheck(id){
	var number=$(id).val();
	if (number.length < 16 || number.length > 19) {
		showPop('<p style="text-align: center;padding:.2rem 0">银行卡号长度必须在16到19之间</p>');
	    return false;
	}
	var num = /^\d*$/; //全数字
	if (!num.exec(number)) {
	   showPop('<p style="text-align: center;padding:.2rem 0">银行卡号必须全为数字</p>');
	   return false;
	}
	//开头6位
	var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
	if (strBin.indexOf(number.substring(0, 2))== -1) {
		showPop('<p style="text-align: center;padding:.2rem 0">银行卡号开头6位不符合规范</p>');
	   return false;
	}
	var lastNum=number.substr(number.length-1,1);//取出最后一位（与luhm进行比较）
	var first15Num=number.substr(0,number.length-1);//前15或18位
	var newArr=new Array();
	for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
	   newArr.push(first15Num.substr(i,1));
	}
	var arrJiShu=new Array(); //奇数位*2的积 <9
	var arrJiShu2=new Array(); //奇数位*2的积 >9
	var arrOuShu=new Array(); //偶数位数组
	for(var j=0;j<newArr.length;j++){
		if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
			arrJiShu.push(parseInt(newArr[j])*2);
			else
			arrJiShu2.push(parseInt(newArr[j])*2);
	    } else{ //偶数位
	        arrOuShu.push(newArr[j]);
	    }
	  }
	var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
	for(var h=0;h<arrJiShu2.length;h++){
		jishu_child1.push(parseInt(arrJiShu2[h])%10);
		jishu_child2.push(parseInt(arrJiShu2[h])/10);
	}
	var sumJiShu=0; //奇数位*2 < 9 的数组之和
	var sumOuShu=0; //偶数位数组之和
	var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal=0;
	for(var m=0;m<arrJiShu.length;m++){
		sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
	}
	for(var n=0;n<arrOuShu.length;n++){
		sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
	}
	for(var p=0;p<jishu_child1.length;p++){
		sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
		sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
	//计算Luhm值
	var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
	var luhm= 10-k;
	if(lastNum==luhm){
		return true;
	}
	else{
		showPop('<p style="text-align: center;padding:.2rem 0">银行卡号有误</p>');
		return false;
	}
}
//姓名
function regName(id){
	var name=$(id).val();
	var regName = /^[\u4e00-\u9fa5]{0,}$/;
	if(name=="" || name==null){
		showPop('<p style="text-align: center;padding:.2rem 0">姓名不能为空</p>');
		return false;
	}else if(!regName.test(name)){
		showPop('<p style="text-align: center;padding:.2rem 0">姓名有误</p>');
		return false;
	}else {
		return true
	}
}

//昵称
function regNick(id){
	var nickname=$(id).val();
	var regNickname=/^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/;
	if(nickname){
		if(nickname.length<4 || nickname.length>20){
			showPop('<p style="text-align: center;padding:.1rem 0">昵称长度必须在4到20位之间</p>');
			return false;	
		}else if(!regNickname.test(nickname)){
			showPop('<p style="text-align: center;padding:.1rem 0">昵称必须由汉字、字母、数字、_及-组成</p>');
			return false;
		}else{
			return true
		}
	}else{
		return true
	}
	
}

//身份证号
function regID(id) {
	var idCard=$(id).val();
	//(15位)
	var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	//(18位)
	var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	var ret1 = isIDCard1.test(idCard);
	var ret2 = isIDCard2.test(idCard);
	if(idCard!=="" && idCard!==null){
		if (!ret1 && !ret2) {
			showPop('<p style="text-align: center;padding:.2rem 0">身份证号有误</p>');
			return false;
		} else {
			return true;
		}
	}else{
		showPop('<p style="text-align: center;padding:.2rem 0">身份证号不能为空</p>');
		return false;
	}
	
}

//邮箱
function regEmail(id){
	var idEmail=$(id).val();
	var regEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //email目前不区分大小写
	if(idEmail=="" || idEmail==null){
		showPop('<p style="text-align: center;padding:.2rem 0">邮箱不能为空</p>');
		return false;
	}else if(!regEmail.test(idEmail)){
		showPop('<p style="text-align: center;padding:.2rem 0">邮箱有误</p>');
		return false;
	}else{
		return true;
	}
}

//验证不为空
function regNull(id,name){
	var value=$(id).val();
	if(value=="" || value==null){
		showPop('<p style="text-align: center;padding:.2rem 0">'+name+'不能为空</p>');
		return false;
	}else{
		return true;
	}
}
//验证具体地址不含特殊字符
function regAddress(id){
	var address=$(id).val();
	var reg= /^[\u4e00-\u9fa5a-z0-9A-Z_-]+$/gi;
	if(address){
		if(!reg.test(address)){
			showPop('<p style="text-align: center;padding:.2rem 0">具体地址不能含有特殊字符</p>');
			return false;
		}else{
			return true
		}
	}else{
		showPop('<p style="text-align: center;padding:.2rem 0">具体地址不能为空</p>');
		return false
	}
}
