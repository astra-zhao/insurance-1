package com.mrbt.insurance.web.controller.tradorders;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.cache.RedisDelete;
import com.mrbt.cache.RedisGet;
import com.mrbt.cache.RedisSet;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.TradingProcessService;
import com.mrbt.insurance.web.model.UsersInfoView;
import com.mrbt.pay.jd.QuickJdPay;

@Controller
@RequestMapping("/trading")
public class TradingProcessController {
	
	private static final Logger LOGGER = LogManager.getLogger(TradingProcessController.class);
	
	@Autowired
	private TradingProcessService tradingProcessService;
	
	@Autowired
	public QuickJdPay qjdPay;
	
	@Autowired
	private RedisGet redisGet;

	@Autowired
	private RedisSet redisSet;

	@Autowired
	private RedisDelete redisDelete;
	
	/**
	 * 购买，跳转到支付页面
	 * 
	 * http://192.168.1.170:8090/user/login?loginName=ruochen&password=ruochen&vailCode=7895&loginType=0
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/active", method = RequestMethod.POST)
	public @ResponseBody Object active(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();
		LOGGER.info("确认支付，跳转到支付页面");
		
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			String orders_id = request.getParameter("orders_id");//订单号
			
			if(loginState != null && loginState.equals("1")){
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				pageInfo = tradingProcessService.transactionProcessing(orders_id, uiv.getId());
			}else{
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
	 * 快捷支付签约
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/quickPaySign", method = RequestMethod.POST)
	public @ResponseBody Object quickPaymentSign(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();
		String userBankId = request.getParameter("userBankId");//用户选择的绑定银行卡ID

		// 验证redis中是否存储请求状态
		Object requestStatus = redisGet.getRedisStringResult(userBankId + "_requestStatus_paySign");
		if (requestStatus != null && requestStatus.equals("1")) {
			pageInfo.setCode(1014);
			pageInfo.setMsg("请勿重复提交");
			return pageInfo;
		}
		
		redisSet.setRedisStringResult(userBankId + "_requestStatus_paySign", "1");// 请求状态存入redis
		
		try {
			
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			String orders_id = request.getParameter("orders_id");//订单ID
			String payment_amount = request.getParameter("payment_amount");//交易金额
			
			if(loginState != null && loginState.equals("1")){
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				LOGGER.info("\n用户：[" + uiv.getId() + "]快捷支付签约,参数：userBankId=" + userBankId + "\torders_id=" + orders_id + "\tpayment_amount=" + payment_amount);
				pageInfo = tradingProcessService.quickpaymentSign(userBankId, orders_id, payment_amount);
			}else{
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}finally {
			redisDelete.delete(null, userBankId + "_requestStatus_paySign", null);
		}
		return pageInfo;
	}
	
	/**
	 * 快捷支付-支付
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/quickPayRequest", method = RequestMethod.POST)
	public @ResponseBody Object quickPaymentRequest(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();
		String userBankId = request.getParameter("userBankId");//用户选择的绑定银行卡ID

		// 验证redis中是否存储请求状态
		Object requestStatus = redisGet
				.getRedisStringResult(userBankId + "_requestStatus_payment");
		if (requestStatus != null && requestStatus.equals("1")) {
			pageInfo.setCode(1014);
			pageInfo.setMsg("请勿重复提交");
			return pageInfo;
		}
		redisSet.setRedisStringResult(userBankId + "_requestStatus_payment", "1");// 请求状态存入redis
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			String orders_id = request.getParameter("orders_id");//订单ID
			String payment_amount = request.getParameter("payment_amount");//交易金额
			String vailCode = request.getParameter("vailCode");
			
			
			if(loginState != null && loginState.equals("1")){
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				LOGGER.info("\n用户：[" + uiv.getId() + "]快捷支付申请,参数：userBankId=" + userBankId + "\torders_id=" + orders_id + "\tpayment_amount=" + payment_amount);
				pageInfo = tradingProcessService.quickpaymentRquest(userBankId, orders_id, payment_amount, vailCode, uiv.getId());
			}else{
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}finally {
			redisDelete.delete(null, userBankId + "_requestStatus_payment", null);
		}
		return pageInfo;
	}
	
	/**
	 * 快捷支付-通知
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/quickPayNotice/{note}", method = RequestMethod.GET)
	public @ResponseBody String quickPaymentNotice(@PathVariable String note, HttpServletRequest request, HttpServletResponse response) {
		try {
			LOGGER.info("快捷支付通知接口note=" + note);
			boolean res = tradingProcessService.quickPaymentNotice(note);
			if(res){
				return "ok";
			}else{
				return "error";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 网银支付-申请
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/onlinePayRequest", method = RequestMethod.GET)
	public @ResponseBody Object onlinePayRequest(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();
		
		String orders_id = request.getParameter("orders_id");//订单ID
		String bankId = request.getParameter("bankId");//用户选择的银行ID
		
		// 验证redis中是否存储请求状态
		Object requestStatus = redisGet
				.getRedisStringResult(orders_id + "_requestStatus_onlinePay");
		if (requestStatus != null && requestStatus.equals("1")) {
			pageInfo.setCode(1014);
			pageInfo.setMsg("请勿重复提交");
			return pageInfo;
		}
		redisSet.setRedisStringResult(orders_id + "_requestStatus_onlinePay", "1");// 请求状态存入redis
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			String payment_amount = request.getParameter("payment_amount");//交易金额
			
			if(loginState != null && loginState.equals("1")){
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				
				String onlinePage = tradingProcessService.onlinePayRequest(bankId, orders_id, payment_amount, uiv.getId());
				if(onlinePage != null && !onlinePage.equals("")){
					pageInfo.setCode(200);
					pageInfo.setMsg("网银交易跳转URL申请成功");
				}else{
					pageInfo.setCode(1012);
					pageInfo.setMsg("网银交易跳转URL申请失败");
				}
			}else{
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}finally {
			redisDelete.delete(null, orders_id + "_requestStatus_onlinePay", null);
		}
		return pageInfo;
	}
	
	
	/**
	 * 网银支付-回调
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/onlinePayCallback/{note}", method = RequestMethod.GET)
	public @ResponseBody Object onlinePayCallback(@PathVariable String note, HttpServletRequest request, HttpServletResponse response) {
		try {
			// 获取参数
			String v_oid = request.getParameter("v_oid"); // 订单号
			String v_pmode = request.getParameter("v_pmode"); // 支付方式中文说明，如"中行长城信用卡"
			String v_pstatus = request.getParameter("v_pstatus"); // 支付结果，20支付完成；30支付失败；
			String v_pstring = request.getParameter("v_pstring"); // 对支付结果的说明，成功时（v_pstatus=20）为"支付成功"，支付失败时（v_pstatus=30）为"支付失败"
			String v_amount = request.getParameter("v_amount"); // 订单实际支付金额
//			String v_moneytype = request.getParameter("v_moneytype"); // 币种
			String v_md5str = request.getParameter("v_md5str"); // MD5校验码
			
			LOGGER.info("网银支付回调结果:" + note + "\t" + v_pmode + "\t" + v_pstatus + "\t" + v_pstring );
			
			boolean res = tradingProcessService.onlinePayVail(note, v_oid, v_pstatus, new BigDecimal(v_amount), v_md5str, 1);
			if(res){
				return "ok";
			}else{
				return "error";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	
	/**
	 * 网银支付-通知
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/onlinePayNotice/{note}", method = RequestMethod.GET)
	public @ResponseBody Object onlinePayNotice(@PathVariable String note, HttpServletRequest request, HttpServletResponse response) {
		try {
			// 获取参数
			String v_oid = request.getParameter("v_oid"); // 订单号
			String v_pmode = request.getParameter("v_pmode"); // 支付方式中文说明，如"中行长城信用卡"
			String v_pstatus = request.getParameter("v_pstatus"); // 支付结果，20支付完成；30支付失败；
			String v_pstring = request.getParameter("v_pstring"); // 对支付结果的说明，成功时（v_pstatus=20）为"支付成功"，支付失败时（v_pstatus=30）为"支付失败"
			String v_amount = request.getParameter("v_amount"); // 订单实际支付金额
//			String v_moneytype = request.getParameter("v_moneytype"); // 币种
			String v_md5str = request.getParameter("v_md5str"); // MD5校验码
			
			LOGGER.info("网银支付通知结果:" + note + "\t" + v_pmode + "\t" + v_pstatus + "\t" + v_pstring );
			
			boolean res = tradingProcessService.onlinePayVail(note, v_oid, v_pstatus, new BigDecimal(v_amount), v_md5str, 0);
			if(res){
				return "ok";
			}else{
				return "error";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
}
