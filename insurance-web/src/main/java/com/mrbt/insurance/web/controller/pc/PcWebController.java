package com.mrbt.insurance.web.controller.pc;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pc")
public class PcWebController {
	private static final Logger LOGGER = LogManager.getLogger(PcWebController.class);
	
	//首页
	@RequestMapping("/index")
	public String pcIndex(){
		return "/pc/index";
	}
	
	//登录
	@RequestMapping("/login")
	public String pcLogin(){
		return "/pc/login";
	}
	
	//注册
	@RequestMapping("/regist")
	public String pcRegist(){
		return "/pc/regist";
	}
	
	//找回密码
	@RequestMapping("/retrievePassword")
	public String pcRetrievePassword(){
		return "/pc/retrievePassword";
	}
	
	//我的保单
	@RequestMapping("/my_policy")
	public String pcMyPolicy(){
		return "/pc/personalCenter/my_policy";
	}
	
	//个人信息
	@RequestMapping("/personalInformation")
	public String pcPersonalInformation(){
		return "/pc/personalCenter/personalInformation";
	}
	
	//我的银行卡
	@RequestMapping("/myBankCard")
	public String pcMyBankCard(){
		return "/pc/personalCenter/myBankCard";
	}
	
	//服务变更
	@RequestMapping("/serviceChange")
	public String pcServiceChange(){
		System.out.println("----------------------------");
		return "/pc/personalCenter/serviceChange";
	}
	
	
	
}
