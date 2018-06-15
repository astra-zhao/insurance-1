package com.mrbt.insurance.web.controller.user;

import com.mrbt.insurance.admin.commons.base.BaseController;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.UsersService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 登录注册controller
 * 
 * @author YJQ
 *
 */
@Controller
@RequestMapping(value = "/user")
public class LoginController extends BaseController {
	
	private static final Logger LOGGER = LogManager.getLogger(LoginController.class);
	
	@Resource
	private UsersService usersService;
	
	/**
	 * GET 测试页
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/testLogin", method = RequestMethod.GET)
	public String addBankcardPage(HttpServletRequest re) {
		LOGGER.info("GET请求-测试页");
		return "login/login";
	}
	
	/**
	 * POST 登录
	 * 
	 * @param loginName
	 *            用户名/手机号
	 * @param password
	 *            密码
	 * @param loginType
	 *            登录方式 0-用户名 1-手机号
	 * @param vailCode
	 *            验证码
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Object loginPost(HttpServletRequest request, HttpServletResponse response, String loginName, String password, String loginType,
			String vailCode) {
		LOGGER.info("POST请求登录");
		PageInfo pageInfo = new PageInfo();
		
		HttpSession session=request.getSession();
		
		try {
			Object openId = session.getAttribute("openId");
			
			pageInfo = usersService.userLogin(loginName, password, loginType, vailCode, openId);
			
			if (pageInfo.getCode() == 200) {
				
				session.removeAttribute("loginState");
				session.removeAttribute("usersInfo");
				
				session.setAttribute("loginState", "1");
				session.setAttribute("usersInfo", pageInfo.getObj());
				
				pageInfo.setObj(null);
				// session时间设置在web.xml中
			}
		} catch (Exception e) {
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
			e.printStackTrace();
			LOGGER.error(e);
		}
		return pageInfo;
	}

	/**
	 * 验证微信用户是否登入过 【与userController 中的获取用户登录状态合并了】
	 * 
	 * @param openId
	 *            微信用户唯一标识
	 * @return 0-未登入 1-登入
	 */
	/*
	 * @RequestMapping(value = "/getWxChatUserLoginState", method =
	 * RequestMethod.POST)
	 * 
	 * @ResponseBody public Object getWxChatUserLoginState(HttpServletRequest
	 * re) { PageInfo pageInfo = new PageInfo(); try { Object
	 * openId=re.getSession().getAttribute("openId");
	 * 
	 * } catch (Exception e) { pageInfo.setCode(500); pageInfo.setMsg("系统错误");
	 * LOGGER.error(e); } return pageInfo; }
	 */

	/**
	 * 注册
	 * 
	 * @param loginName
	 * @param password
	 * @param mobileNumber
	 * @param vailCode
	 * @param enterType
	 * @param openId
	 * @return
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public Object registerPost(HttpServletRequest re, String loginName, String password, String mobileNumber,
			String vailCode, String enterType) {
		LOGGER.info("POST请求注册");
		PageInfo pageInfo = new PageInfo();
		try {
			Object openId = re.getSession().getAttribute("openId");
			pageInfo = usersService.userRegister(loginName, password, mobileNumber, vailCode, enterType, openId);
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
			LOGGER.error(e);
		}
		return pageInfo;
	}

	
	/**
	 * 退出
	 * 
	 * @return {Result}
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@ResponseBody
	public Object logout(HttpServletRequest re) {
		LOGGER.info("GET登出");
		PageInfo pageInfo = new PageInfo();
		// 清空登录session
		re.getSession().removeAttribute("loginState");
		re.getSession().removeAttribute("usersInfo");
		pageInfo.setCode(200);
		pageInfo.setMsg("注销成功！");
		return pageInfo;
	}
}
