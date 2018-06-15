package com.mrbt.insurance.web.controller.user;

import com.mrbt.insurance.admin.commons.base.BaseController;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.UsersService;
import com.mrbt.insurance.service.WeChatService;
import com.mrbt.insurance.web.model.BaseMsg;
import com.mrbt.insurance.web.model.OrderRequest;
import com.mrbt.insurance.web.model.UnifiedOrderRequest;
import com.mrbt.insurance.web.utils.Common;
import com.mrbt.insurance.web.utils.GetAPIResult;
import com.mrbt.insurance.web.utils.SignUtil;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.XmlFriendlyNameCoder;
import com.thoughtworks.xstream.io.xml.XppDriver;

import net.sf.json.JSONObject;

import com.mrbt.insurance.web.utils.MsgParserHandler;

import java.io.InputStream;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

/**
 * 微信接口controller
 * 
 * @author YJQ
 *
 */
@Controller
@RequestMapping(value = "/wechat")
public class WeChatController extends BaseController {
	
	private static final Logger LOGGER = LogManager.getLogger(WeChatController.class);
	
	@Resource
	private UsersService usersService;
	@Resource
	private WeChatService weChatService;
	
	/**
	 * GET 测试页
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/test/payPage", method = RequestMethod.GET)
	public String test(HttpServletRequest re,String code) {
		LOGGER.info("GET请求-测试页");
		if(!StringUtils.isEmpty(code)){
			//处理code 并将openid存入session
			HttpSession session=re.getSession();
			try {
				Object openIdobj = GetAPIResult.getToken(code).get("openid");
				if(openIdobj!=null){
					//通过微信用户openId查询用户信息(用户信息在关注微信号时已经入库)
					session.setAttribute("openId", openIdobj.toString());
					System.out.println(openIdobj.toString());
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "payTest";
	}
	
	/**
	 * POST 获取用户信息第一步，处理code，获取微信用户openId。 供微信端授权页面调用，在发开者平台配置此链接。
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/dealWechatCode", method = RequestMethod.POST)
	public void dealWechatCode(String code, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("GET微信端请求处理code");
		HttpSession session=request.getSession();
		try {
			Object openIdobj = GetAPIResult.getToken(code).get("openid");
			if(openIdobj!=null){
				session.setAttribute("openId", openIdobj.toString());
				System.out.println(openIdobj.toString());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 验证token
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/subscribe", method = RequestMethod.GET)
	public void vailToken(String signature,String timestamp,String nonce,String echostr, HttpServletRequest request, HttpServletResponse response) {
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			if(SignUtil.checkSignature(signature, timestamp, nonce)){
				writer.print(echostr);
			}else{
				writer.print("error");
			}
		} catch (Exception e) {
			e.printStackTrace();
			writer.print("error");
		}finally {
			writer.flush();
			writer.close();
		}
	}
	
	
	/**
	 * 消息处理
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/subscribe", method = RequestMethod.POST)
	public void subscribe(HttpServletRequest request, HttpServletResponse response) {
		try {
			InputStream stream=request.getInputStream();
			
			MsgParserHandler msgParserHandler = new MsgParserHandler();
			BaseMsg baseMsg = msgParserHandler.getBaseMsg(stream);
			String msgType=baseMsg.getMsgType();
			
			if (msgType.equals("event")) {
				String eventType = baseMsg.getEvent();
				if (eventType.equals("subscribe")) {
					LOGGER.info("微信端请求关注");
					// 获取用户微信帐号（open_id）
					String fromUserName =baseMsg.getFromUserName();
					if(StringUtils.isNotEmpty(fromUserName)){
						//usersService.addUser(fromUserName); 入库操作
						
						//推送消息
						weChatService.sendMessage(baseMsg, response);
						
					}else{
						LOGGER.info("获取用户微信信息失败");
					}
					
				} else if (eventType.equals("unsubscribe")) {
					LOGGER.info("微信端请求取消关注");
				}
			}else if(msgType.equals("text")){
				//String text=baseMsg.getObj();
				//推送消息
				weChatService.sendMessage(baseMsg, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 微信支付-生成预订单
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/test/pay", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo pay(HttpServletRequest request, HttpServletResponse response,String orderInfo) {
		request.setAttribute("Cache-Control", "no-cache");
		PageInfo pageInfo=new PageInfo();
		//接受支付信息
		JSONObject jsonObj=JSONObject.fromObject(HtmlUtils.htmlUnescape(orderInfo));
		UnifiedOrderRequest wechatPay=(UnifiedOrderRequest)JSONObject.toBean(jsonObj, UnifiedOrderRequest.class);
		//验证参数
		if(StringUtils.isBlank(wechatPay.getBody())){
			pageInfo.setCode(1001);
			pageInfo.setMsg("参数:商品描述[body]不可为空");
			return pageInfo;
		}
		if(StringUtils.isBlank(wechatPay.getOut_trade_no())){
			pageInfo.setCode(1001);
			pageInfo.setMsg("参数:订单号[out_trade_no]不可为空");
			return pageInfo;
		}
		if(wechatPay.getTotal_fee()==null&&wechatPay.getTotal_fee()==0){
			pageInfo.setCode(1001);
			pageInfo.setMsg("参数:订单金额[total_fee]不可为0或null");
			return pageInfo;
		}
		
		LOGGER.info("订单"+wechatPay.getOut_trade_no()+"请求支付");
		//获取用户orderId
		HttpSession session = request.getSession();
		Object openId=session.getAttribute("openId");  //为了测试暂时注释掉惹
		if(openId!=null){
			wechatPay.setOpenid(openId.toString());
		}else{
			pageInfo.setCode(1001);
			pageInfo.setMsg("openId未取到，请检查访问渠道");
			return pageInfo;
		}
		//Object openId="oE40FwG3KdNm8G-x7bklgtGH69Mw";
		wechatPay.setSpbill_create_ip(Common.getIpAddr(request));
		
		pageInfo=weChatService.pay(wechatPay);
		return pageInfo;
	}
	
	/**
	 * 支付回调[此接口配置在预订单的参数值，请求至微信]
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/payResponseNotice", method = RequestMethod.POST)
	public String payResponseNotice(HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("支付结果回调");
		String resXml=null;
		try {
			InputStream stream=request.getInputStream();
			//接收支付结果
			XStream xStream = new XStream(new XppDriver(new XmlFriendlyNameCoder("_-", "_")));
			xStream.alias("xml", OrderRequest.class);
			OrderRequest xmlStr = (OrderRequest)xStream.fromXML(stream);
			
			//处理
			resXml=weChatService.payResponseNotice(xmlStr);//service
			System.out.println(resXml);
			//返回处理结果给微信
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resXml;
	}
}
