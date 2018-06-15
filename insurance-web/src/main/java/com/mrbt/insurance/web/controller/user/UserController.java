package com.mrbt.insurance.web.controller.user;

import java.text.SimpleDateFormat;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.admin.commons.utils.Validation;
import com.mrbt.insurance.service.ImageUploadServer;
import com.mrbt.insurance.service.UsersService;
import com.mrbt.insurance.web.model.UserApplicantInfo;
import com.mrbt.insurance.web.model.UsersInfoView;

/**
 * 用户相关controller
 * 
 * @author YJQ
 *
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {

	private static final Logger LOGGER = LogManager.getLogger(UserController.class);

	@Resource
	private UsersService usersService;
	@Resource
	private ImageUploadServer imageUploadServer;

	/**
	 * GET 测试页
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String addBankcardPage(HttpServletRequest re) {
		LOGGER.info("GET请求-测试页");
		return "personalCenter/test";
	}

	/**
	 * GET 请求用户登录状态
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/getUserLoginState", method = RequestMethod.GET)
	@ResponseBody
	public PageInfo personalCenterPage(HttpServletRequest re, String url) {
		LOGGER.info("GET请求-请求用户登录状态");
		PageInfo pf = new PageInfo();
		HttpSession session = re.getSession();
		UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
		if (uiv != null) {
			// session中保存的登录状态和微信登录状态一个满足则返回用户登录成功
			pf.setObj(url);
			pf.setCode(200);
			pf.setMsg("请求成功,用户已登录");
		} else {
			pf.setCode(1010);
			pf.setMsg("用户未登录或session已过期");
		}
		return pf;
	}

	/**
	 * 获取验证码
	 * 
	 * @param key
	 *            用户手机号
	 * @return 验证码
	 */
	@RequestMapping(value = "/getValidateCode", method = RequestMethod.POST)
	@ResponseBody
	public Object validateCode(HttpServletRequest re, String key) {
		PageInfo pageInfo = new PageInfo();
		try {
			HttpSession session = re.getSession();
			UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
			if (uiv != null) {
				// session中保存的登录状态和微信登录状态一个满足则返回用户登录成功
				pageInfo = usersService.validateCode(uiv.getMobileNumber());
			} else {
				pageInfo = usersService.validateCode(key);
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("系统错误");
		}
		return pageInfo;
	}

	/**
	 * 判断手机号是否被绑定过
	 * 
	 * @param mobileNumber
	 *            手机号
	 * @return
	 */
	@RequestMapping("/isMobileNumExist")
	@ResponseBody
	public PageInfo isMobileNumExist(String mobileNumber) {
		LOGGER.info("POST请求-判断手机号是否被绑定过");
		PageInfo pageInfo = new PageInfo();
		try {
			pageInfo = usersService.isMobileNumExist(mobileNumber);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}

	/**
	 * POST 请求个人中心
	 * 
	 * @return {String}
	 */
	@RequestMapping(value = "/personalCenter", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo personalCenter(HttpServletRequest re) {
		LOGGER.info("POST请求-个人中心主页");
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");

		PageInfo pageInfo = new PageInfo();
		try {
			if (loginState != null && loginState.equals("1")) {
				// 获取用户信息
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				pageInfo = usersService.getUserInfo(uiv.getId(), "web");
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
	 * POST 修改用户信息
	 * 
	 * @param re
	 * @param image_input
	 *            头像url
	 * @param nickName
	 *            昵称
	 * @param sex
	 *            性别id 0-女 1-男 [int]
	 * @param birthdate
	 *            出生日期
	 * @param email
	 *            电子邮箱
	 * @param jobId
	 *            职业id [int]
	 * @param income
	 *            收入 [int]
	 * @param city
	 *            城市id
	 * @param province
	 *            省id
	 * @param county
	 *            县id
	 * @param address
	 *            详细地址
	 * @return
	 */
	@RequestMapping(value = "/changeAvatar", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo changeAvatar(HttpServletRequest re, String image_input, String nickName, Integer sex,
			String birthdate, String email, Integer jobId, Integer income, String city, String province, String county,
			String address) {
		LOGGER.info("POST请求-个人中心-修改头像");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				UserApplicantInfo userApp = new UserApplicantInfo();
				userApp.setuId(uiv.getId());

				if (!StringUtils.isEmpty(image_input))
					userApp.setAvatar(image_input);

				if (!StringUtils.isEmpty(nickName))
					userApp.setNickName(nickName);

				if (!StringUtils.isEmpty(sex))
					userApp.setSex(sex);

				if (!StringUtils.isEmpty(birthdate))
					userApp.setBirthDate(formatter.parse(birthdate));

				if (!StringUtils.isEmpty(email))
					userApp.setEmail(email);

				if (!StringUtils.isEmpty(jobId))
					userApp.setJobId(jobId);

				if (!StringUtils.isEmpty(income))
					userApp.setIncome(income);

				if (!StringUtils.isEmpty(city))
					userApp.setCity(city);

				if (!StringUtils.isEmpty(province))
					userApp.setProvince(province);

				if (!StringUtils.isEmpty(county))
					userApp.setCounty(county);

				if (!StringUtils.isEmpty(address))
					userApp.setAddress(address);

				pageInfo = usersService.changeAvatar(userApp);

				// 修改成功，重新配置用户session
				if (pageInfo.getCode() == 200) {
					session.removeAttribute("usersInfo");
					session.setAttribute("usersInfo", pageInfo.getObj());
				}
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}

		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}

	/**
	 * 修改密码
	 * 
	 * @param uid
	 * @param newPwd
	 * @param mobileNumber
	 * @param vailCode
	 * @param flag
	 *            1-通过登录验证
	 * @return
	 */
	@RequestMapping("/changePWD")
	@ResponseBody
	public PageInfo changePWD(HttpServletRequest re, String newPwd, String mobileNumber, String vailCode, String flag) {
		LOGGER.info("POST请求-个人中心-修改密码");
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				pageInfo = usersService.changePWD(newPwd, uiv.getMobileNumber(), vailCode, uiv.getId());
			} else if (flag != null && !flag.isEmpty() && flag.equals("1")) {

			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}

	/**
	 * 修改密码
	 * 
	 * @param uid
	 * @param newPwd
	 * @param mobileNumber
	 * @param vailCode
	 * @return
	 */
	@RequestMapping("/forgetPWD")
	@ResponseBody
	public PageInfo forgetPWD(HttpServletRequest re, String newPwd, String mobileNumber, String vailCode) {
		LOGGER.info("POST请求-个人中心-忘记密码");
		PageInfo pageInfo = new PageInfo();
		try {
			pageInfo = usersService.forgetPWD(newPwd, mobileNumber, vailCode);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}

	/**
	 * 获取证件类型列表 POST
	 * 
	 * @return
	 */
	@RequestMapping("/getCertTypeList")
	@ResponseBody
	public PageInfo getCertTypeList() {
		PageInfo pageInfo = new PageInfo();
		try {
			pageInfo = usersService.getCertTypeList();
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 发送验证邮箱邮件 POST
	 * @param re
	 * @param email
	 * @return
	 */
	@RequestMapping("/sendVailEmail")
	@ResponseBody
	public PageInfo sendVailEmail(HttpServletRequest re,String email) {
		PageInfo pageInfo = new PageInfo();
		HttpSession session = re.getSession();
		Object loginState = session.getAttribute("loginState");
		try {
			if (loginState != null && loginState.equals("1")) {
				UsersInfoView uiv = (UsersInfoView) session.getAttribute("usersInfo");
				if(Validation.MatchMail(email)){
					pageInfo=usersService.sendVailEmail(email, uiv.getId());
				}else{
					pageInfo.setCode(1001);
					pageInfo.setMsg("邮箱格式有误");
				}
			} else {
				pageInfo.setCode(1010);
				pageInfo.setMsg("用户未登录或session已过期");
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 验证邮箱 POST
	 * @param re
	 * @param key
	 * @return
	 */
	@RequestMapping("/vailEmail")
	@ResponseBody
	public PageInfo vailEmail(HttpServletRequest re,String code) {
		PageInfo pageInfo = new PageInfo();
		try {
			pageInfo=usersService.vailEmail(code);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
}
