package com.mrbt.insurance.web.controller.user;

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

import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.UserIntegralService;
import com.mrbt.insurance.web.model.UsersInfoView;

/**
 * 积分兑换相关
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/user")
public class UserIntegralController {

	private static final Logger LOGGER = LogManager.getLogger(UserController.class);

	@Resource
	private UserIntegralService userIntegralService;

	/**
	 * POST 请求积分商城
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/getIntegralPro", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo integralProList(Integer page, Integer rows, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("POST请求-个人中心-积分商城");
		
		PageInfo pageInfo = new PageInfo(page, rows);
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			if(loginState != null && loginState.equals("1")){
				// 获取积分商品列表
				pageInfo = userIntegralService.getIntegralProList(pageInfo);
			}else{
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			LOGGER.error(e);
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/**
	 * POST 请求用户兑换的商品列表
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/getExchangeIntegralPro", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo exchangeIntegralPro(Integer page, Integer rows, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("POST请求-个人中心-我的兑换");
		PageInfo pageInfo = new PageInfo(page, rows);
		
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			// 获取积分商品列表
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				// 获取积分商品列表
				pageInfo = userIntegralService.getIntegralProList(pageInfo, uiv.getId());
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/**
	 * POST 获取商品详情
	 * 
	 * @param proId
	 * @return
	 */
	@RequestMapping(value = "/getIntegralProByPK", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo integralPro(HttpServletRequest request, HttpServletResponse response, String proId) {
		LOGGER.info("POST请求-个人中心-积分商品详情");
		PageInfo pageInfo = new PageInfo();
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			if (loginState != null && loginState.equals("1")) {
				// 获取积分商品详情
				pageInfo = userIntegralService.getIntegralProByPK(proId);
			}else{
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) { 
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/**
	 * POST 积分兑换商品
	 * 
	 * @param uid
	 * @param proId
	 * @return
	 */
	@RequestMapping(value = "/exchange", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo exchange(HttpServletRequest re, String proId) {
		LOGGER.info("POST请求-个人中心-积分兑换");
		PageInfo pageInfo = new PageInfo();
		try {
			HttpSession session = re.getSession();
			Object loginState = session.getAttribute("loginState");
			UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
			
			if (loginState != null && loginState.equals("1")) {
				String href = "members-jfsc-duihuan.htm?proId=" + proId;
				// 获取积分商品列表
				pageInfo = userIntegralService.exchange(uiv.getId(), proId, href);
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

}
