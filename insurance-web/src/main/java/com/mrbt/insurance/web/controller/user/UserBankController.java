package com.mrbt.insurance.web.controller.user;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.cache.RedisDelete;
import com.mrbt.cache.RedisGet;
import com.mrbt.cache.RedisSet;
import com.mrbt.insurance.admin.commons.annotation.DataSourceChange;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.admin.commons.utils.Validation;
import com.mrbt.insurance.service.BankService;
import com.mrbt.insurance.service.UserBankService;
import com.mrbt.insurance.service.UsersService;
import com.mrbt.insurance.web.model.BaseBankInfoExample;
import com.mrbt.insurance.web.model.BaseBankSixnumberExample;
import com.mrbt.insurance.web.model.UserBankcardInfoView;
import com.mrbt.insurance.web.model.UsersInfoView;
import com.mrbt.insurance.web.utils.StringOpertion;

@Controller
@RequestMapping(value = "/user")
public class UserBankController {

	private static final Logger LOGGER = LogManager.getLogger(UserController.class);
	@Resource
	private UserBankService userBankService;
	@Resource
	private BankService bankService;
	
	@Autowired
	private UsersService usersService;
	
	@Autowired
	private RedisGet redisGet;

	@Autowired
	private RedisSet redisSet;

	@Autowired
	private RedisDelete redisDelete;

	/**
	 * POST 请求我的银行卡页面
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/bankcard", method = RequestMethod.POST)
	@ResponseBody
	public Object bankcard(HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("POST请求个人中心-我的银行卡");
		PageInfo pageInfo = new PageInfo();

		HttpSession session = request.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {

				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				List<UserBankcardInfoView> res = userBankService.getBankCardList(uiv.getId());

				if (!res.isEmpty()) {
					List<UserBankcardInfoView> resVo = new ArrayList<UserBankcardInfoView>();
					for (int i = 0; i < res.size(); i++) {
						UserBankcardInfoView ubv = res.get(i);
						ubv.setCertCode(StringOpertion.hideIdenCard(ubv.getCertCode()));
						ubv.setBankNumber(StringOpertion.hideBankCard(ubv.getBankNumber()));
						resVo.add(ubv);
					}
					pageInfo.setCode(200);
					pageInfo.setMsg("请求成功");
					pageInfo.setRows(res);
				} else {
					pageInfo.setCode(1003);
					pageInfo.setMsg("请求的数据不存在，请检查参数");
				}
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}

		return pageInfo;
	}

	/**
	 * POST 将银行卡设置为默认银行卡
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/setDefault", method = RequestMethod.POST)
	@ResponseBody
	public Object setDefault(HttpServletRequest re, Integer ubId) {
		LOGGER.info("Post请求个人中心-设置银行卡为默认");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
		String uId = uiv.getId().toString();// 用户ID
		try {
			if (loginState != null && loginState.equals("1")) {
				String para = uId.toString();
				pageInfo = userBankService.setDefault(para, ubId);
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/**
	 * 删除银行
	 * 
	 * @param bankcard
	 *            银行卡号
	 * @return
	 */
	@RequestMapping(value = "/deleteBankcard", method = RequestMethod.POST)
	public @ResponseBody Object deleteBank(HttpServletRequest request, HttpServletResponse response, Integer ubId) {
		LOGGER.info("删除银行");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = request.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				String uId = uiv.getId().toString();// 用户ID

				pageInfo = userBankService.deleteBankcard(uId, ubId);
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/*
	 * 添加银行卡 1.银行列表 2.6位信息选出银行 3.验证码 4.四要素 5.添加银行
	 * 
	 */

	/**
	 * POST银行列表
	 * 
	 * @param request
	 * @param dtype
	 *            支付类型列表 0快捷，1网银，2全部
	 * @return
	 */
	@DataSourceChange(slave = true)
	@RequestMapping(value = "/bankList", method = RequestMethod.POST)
	public @ResponseBody Object getBankList(HttpServletRequest request, String dtype) {
		PageInfo pageInfo = new PageInfo();
		BaseBankInfoExample example = new BaseBankInfoExample();
		try {
			List<Integer> para = new ArrayList<Integer>();

			for (String dt : dtype.split(",")) {
				para.add(Integer.parseInt(dt));
			}
			example.createCriteria().andStateEqualTo(1).andDtypeIn(para);
			example.setOrderByClause("sort asc");
			pageInfo = bankService.getBankList(example);
		} catch (Exception e) {
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
			e.printStackTrace();
		}
		return pageInfo;
	}

	/**
	 * 前6位卡号选出银行
	 * 
	 * @param sixInfo
	 *            银行卡前六位
	 * @return
	 */
	@DataSourceChange(slave = true)
	@RequestMapping(value = "/getBankBySixInfo", method = RequestMethod.POST)
	public @ResponseBody Object getBankBySixInfo(Integer sixInfo) {
		PageInfo pageInfo = new PageInfo();
		BaseBankSixnumberExample example = new BaseBankSixnumberExample();
		try {
			example.createCriteria().andSixNumberEqualTo(sixInfo);
			pageInfo = bankService.getBankSixInfoList(example);
		} catch (Exception e) {
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
			e.printStackTrace();
		}
		return pageInfo;
	}

	/**
	 * 四要素验证获取验证码
	 * 
	 * @param key
	 * @return
	 */
	@DataSourceChange(slave = true)
	@RequestMapping(value = "/getValiBankCode", method = RequestMethod.POST)
	public @ResponseBody Object getValidateCodeFormJD(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();
		String bankNumber = request.getParameter("bankNumber");// 银行卡号
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			// 判断用户填写信息是否正确  若有误 不再执行后续操作
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				String uId = uiv.getId().toString();// 用户ID
				Integer isRealName=uiv.getRealName();
				String userName ="";// 姓名
				String idCard = "";// 身份号
				
				if(isRealName == null || isRealName==0){//没有实名过
					userName = request.getParameter("userName");// 姓名
					idCard = request.getParameter("idCard");// 身份号
				}else{
					userName = uiv.getUname();// 姓名
					idCard = uiv.getCertCode();// 身份号
				}
				
				String bankShortName  = request.getParameter("bankShortName");// 银行简称
				String userPhone =request.getParameter("userPhone");// 用户手机号，和银行卡绑定的
	
				if (userName == null || userName.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("用户名称不能为空");
					return pageInfo;
				}
	
				if (idCard != null && idCard.indexOf("****") > 0) {
	
				} else {
					if (idCard == null || !Validation.IdCardNo(idCard)) {
						pageInfo.setCode(1001);
						pageInfo.setMsg("身份证号为空或不正确");
						return pageInfo;
					}
				}
	
				if (bankNumber == null || bankNumber.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("银行卡号不能为空");
					return pageInfo;
				}
				if (bankShortName == null || bankShortName.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("请选择银行");
					return pageInfo;
				}
				if (userPhone == null || !Validation.MatchMobile(userPhone)) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("手机号不正确");
					return pageInfo;
				}
				// 验证redis中是否存储请求状态
				Object requestStatus = redisGet.getRedisStringResult(bankNumber + "_requestStatus_vailCode");
				if (requestStatus != null && requestStatus.equals("1")) {
					pageInfo.setCode(1014);
					pageInfo.setMsg("60秒内请勿重复请求验证码");
					return pageInfo;
				}
				redisSet.setRedisStringResult(bankNumber + "_requestStatus_vailCode", "1", 60, TimeUnit.SECONDS);// 请求状态存入redis
				pageInfo = userBankService.validateCode(userName, idCard, bankNumber, bankShortName, userPhone, uId);
	
			}else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
				return pageInfo;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
			LOGGER.error(e);
		}
		return pageInfo;
	}

	/**
	 * 四要素验证申请，绑定银行卡
	 * 
	 * @param bankcard
	 * @param mobileNumber
	 * @param vailCode
	 * @param userName
	 * @param idCard
	 * @return
	 */
	@RequestMapping(value = "/bindBankcard", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo vailBankcard(HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("请求四要素验证银行卡");
		PageInfo pageInfo = new PageInfo();
		String bankNumber = request.getParameter("bankNumber");// 银行卡号

		// 验证redis中是否存储请求状态
		Object requestStatus = redisGet.getRedisStringResult(bankNumber + "_requestStatus_bandCard");
		if (requestStatus != null && requestStatus.equals("1")) {
			pageInfo.setCode(1014);
			pageInfo.setMsg("请勿重复提交");
			return pageInfo;
		}
		redisSet.setRedisStringResult(bankNumber + "_requestStatus_bandCard", "1");// 请求状态存入redis
		HttpSession session = request.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				String uId = uiv.getId().toString();// 用户ID
				Integer isRealName=uiv.getRealName();
				String userName ="";// 姓名
				String idCard = "";// 身份号
				
				if(isRealName == null || isRealName == 0){//没有实名过
					userName = request.getParameter("userName");// 姓名
					idCard = request.getParameter("idCard");// 身份号
					
				}else{
					userName = uiv.getUname();// 姓名
					idCard = uiv.getCertCode();// 身份号
				}
				
				String bankShortName = request.getParameter("bankShortName");// 银行简称
				String userPhone = request.getParameter("userPhone");// 用户手机号，和银行卡绑定的
				String vailCode = request.getParameter("vailCode");// 验证码
				String b_id = request.getParameter("bId");
				String platformType = request.getParameter("platformType");

				if (vailCode == null || vailCode.equals("") || !Validation.Match("\\d+", vailCode)) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("手机验证码不能为空或验证码错误");
					return pageInfo;
				}
				if (userName == null || userName.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("用户名称不能为空");
					return pageInfo;
				}

				if (idCard != null && idCard.indexOf("****") > 0) {
					idCard = uiv.getCertCode();
				} else {
					if (idCard == null || !Validation.IdCardNo(idCard)) {
						pageInfo.setCode(1001);
						pageInfo.setMsg("身份证号为空或不正确");
						return pageInfo;
					}
				}

				if (bankNumber == null || bankNumber.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("银行卡号不能为空");
					return pageInfo;
				}
				if (bankShortName == null || bankShortName.equals("")) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("请选择银行");
					return pageInfo;
				}
				if (userPhone == null || !Validation.MatchMobile(userPhone)) {
					pageInfo.setCode(1001);
					pageInfo.setMsg("手机号不正确");
					return pageInfo;
				}

				if (platformType == null || platformType.equals("")) {
					platformType = "1";
				}

				Integer bId = 0;
				if (b_id != null && !b_id.equals("")) {
					bId = Integer.parseInt(b_id);
				}

				pageInfo = userBankService.vailBankcard(uId, bId, platformType, userName, idCard, bankNumber,
						bankShortName, userPhone, vailCode,1);
				
				if(isRealName == null){
					uiv = usersService.getUserInfoView(uiv.getId());
					session.setAttribute("usersInfo", uiv);
				}
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		} finally {
			redisDelete.delete(null, bankNumber + "_requestStatus_bandCard", null);
		}
		return pageInfo;
	}

}
