package com.mrbt.insurance.web.controller.index;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mrbt.insurance.service.UsersService;
import com.mrbt.insurance.web.model.UsersInfoView;
import com.mrbt.insurance.web.utils.GetAPIResult;

/**
 * 域名直接跳转
 * @author ruochen.yu
 *
 */
@Controller
public class IndexController {
	@Resource
	private UsersService usersService;

	private static final Logger LOGGER = LogManager.getLogger(IndexController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(HttpServletRequest request, HttpServletResponse response,String code) {
		LOGGER.info("打开主页");
		if(!StringUtils.isEmpty(code)){
			//处理code 并将openid存入session
			HttpSession session=request.getSession();
			try {
				Object openIdobj = GetAPIResult.getToken(code).get("openid");
				if(!StringUtils.isEmpty(openIdobj)){
					session.removeAttribute("loginState");
					session.removeAttribute("usersInfo");
					
					//通过微信用户openId查询用户信息(用户信息在关注微信号时已经入库)
					session.setAttribute("openId", openIdobj.toString());
					UsersInfoView uiv = usersService.queryUsersInfoByOpenId(openIdobj.toString());
					if(uiv != null && uiv.getMobileNumber() != null && !uiv.getMobileNumber().equals("")){
						session.setAttribute("loginState", "1");
						session.setAttribute("usersInfo", uiv);
					}
//					//修改用户登录时间
//					usersService.updateLoginTime(openIdobj.toString());
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "index";
	}
}
