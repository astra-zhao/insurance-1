package com.mrbt.insurance.web.controller.tradorders;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.OrderService;
import com.mrbt.insurance.web.model.OrdersInfo;
import com.mrbt.insurance.web.model.OrdersInfoExample;
import com.mrbt.insurance.web.model.UsersInfoView;


/**
 * 订单管理
 * 
 * @author yjq
 *
 */
@Controller
@RequestMapping("/orders")
public class OrdersController {

	private static final Logger LOGGER = LogManager.getLogger(OrdersController.class);
	
	@Autowired
	private OrderService orderService;
	
	/**
	 * GET 测试
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(HttpServletRequest re) {
		LOGGER.info("GET请求-测试页");
		//taskService.createOrderFileForSpecial();
		//return "testCreateOrderFile";
		return "orderTest";
	}
	
	/**
	 * 提交订单
	 * @param re
	 * @param proId
	 * @param proName
	 * @param term 
	 * @param email
	 * @param province
	 * @param provinceName
	 * @param city
	 * @param cityName
	 * @param address
	 * @param birthday
	 * @param sex
	 * @param insuredList
	 * @return
	 */
	@RequestMapping(value = "/submitOrder", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo createOrder(HttpServletRequest re,String insuredObject,String insuredList) {
		LOGGER.info("POST请求-产品购买-提交订单");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
		try {
			if (loginState != null && loginState.equals("1")) {
				
				pageInfo=orderService.createOrder(uiv,insuredObject, insuredList);
				
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 提交订单(针对大疆保险)
	 * @param re
	 * @param orderInfo 存放订单信息的json字符串
	 * @return
	 */
	@RequestMapping(value = "/submitOrderForDaJiang", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo createOrderForDaJiang(HttpServletRequest re,String orderInfo) {
		LOGGER.info("POST请求-产品购买-提交订单[大疆]");
		PageInfo pageInfo = new PageInfo();
		pageInfo=orderService.createOrderForDaJiang(orderInfo);
		return pageInfo;
	}
	
	/**
	 * 根据状态查询订单
	 * @param re
	 * @param status 0未支付，1支付完成，2处理中，3失败，4删除，5生效  ，6 已失效
	 * 注：多个状态间用逗号隔开。eg： 1,5  
	 * @return
	 */
	@RequestMapping(value = "/getOrderByStatus", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo getOrderByStatus(Integer page, Integer rows,HttpServletRequest re,String status) {
		LOGGER.info("POST请求-产品购买-查询订单");
		PageInfo pageInfo = new PageInfo(page, rows);
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
		try {
			if (loginState != null && loginState.equals("1")) {
				OrdersInfoExample example=new OrdersInfoExample();
				example.setStart(pageInfo.getFrom());
				example.setLimit(pageInfo.getSize());
				pageInfo=orderService.getOrderList(example,status,uiv.getId());
				
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 获取订单详情
	 * @param re
	 * @param orderId
	 * @return
	 */
	@RequestMapping(value = "/getOrderDetail", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo getOrderDetail(HttpServletRequest re,String orderId) {
		LOGGER.info("POST请求-产品购买-查询订单");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		
		try {
			if (loginState != null && loginState.equals("1")) {
				OrdersInfo ordersInfo=orderService.getOrderDetail(orderId);
				if(ordersInfo!=null){
					pageInfo.setObj(ordersInfo);
					pageInfo.setMsg("查询成功");
					pageInfo.setCode(200);
				}else{
					pageInfo.setMsg("订单不存在");
					pageInfo.setCode(1003);
				}
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 *修改订单状态
	 * @param re
	 * @param orderId
	 * @return
	 */
	@RequestMapping(value = "/updateOrderStatus", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo updateOrderStatus(HttpServletRequest re,String orderId,Integer status) {
		LOGGER.info("POST请求-产品购买-修改订单状态");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				OrdersInfo ordersInfo=new OrdersInfo();
				ordersInfo.setId(orderId);
				ordersInfo.setStatus(status);
				pageInfo=orderService.updateOrderInfo(ordersInfo);
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 验证手机号验证码是否匹配
	 * @param mobileNumber 手机号
	 * @param vailCode 验证码
	 * @return
	 */
	@RequestMapping(value = "/verifyMobile", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo verifyMobile(HttpServletRequest re,String mobileNumber,String vailCode) {
		LOGGER.info("POST请求-订单填写-验证手机号验证码是否匹配");
		PageInfo pageInfo = new PageInfo();
		try {
			pageInfo=orderService.verifyMobile(mobileNumber,vailCode);

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}

	/**
	 * 通过手机号查询订单概况列表
	 * @param page
	 * @param rows
	 * @param re
	 * @param mobileNumber 手机号
	 * @param vailCode 验证码
	 * @return
	 */
	@RequestMapping(value = "/getOrderPolicyNoByMobile", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo getOrderFlowByMobile(Integer page, Integer rows,String mobileNumber,String vailCode) {
		LOGGER.info("POST请求-订单查询[大疆]-通过手机号查询订单信息");
		PageInfo pageInfo = new PageInfo(page, rows);
		try {
			OrdersInfoExample example=new OrdersInfoExample();
			example.setStart(pageInfo.getFrom());
			example.setLimit(pageInfo.getSize());
			pageInfo=orderService.getOrderFlowByMobile(mobileNumber,vailCode,example);

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
}
