package com.mrbt.insurance.web.controller.tradorders;

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
import org.springframework.web.util.HtmlUtils;

import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.ProductService;
import com.mrbt.insurance.web.model.ProductInfo;
import com.mrbt.insurance.web.vo.product.ProductCriteria;
import com.mrbt.insurance.web.vo.product.ProductDetailsVo;


/**
 * 产品信息接口
 * @author ruochen.yu
 *
 */
@Controller
@RequestMapping("/product")
public class ProductInfoController {
		
	private static final Logger LOGGER = LogManager.getLogger(OrdersController.class);
	
	@Autowired
	private ProductService productService;
	
	/**
	 * 根据场景ID查询产品列表
	 * @param page
	 * @param rows
	 * @param request
	 * @param response
	 * @return , method = RequestMethod.GET
	 */
	@RequestMapping(value = "/listBySceneId")
	public @ResponseBody Object listBySceneId(Integer platform, Integer scene_id, String sort_name, 
			Integer page, Integer rows, 
			HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("查询产品列表");	
		
		String dstatus = request.getParameter("status");//产品状态,可以查询历史产品
		String ptype = request.getParameter("type");//产品类型
		String cId = request.getParameter("c_id");//公司ID
		
		PageInfo pageInfo = new PageInfo(page, rows);//参数，分页
		try {
			
			ProductCriteria criteria = new ProductCriteria();
			criteria.setStart(pageInfo.getFrom());
			criteria.setLimit(pageInfo.getSize());
			criteria.setSceneId(scene_id);
			criteria.setPlatform(platform);
			criteria.setSort(sort_name + " desc");
			
			if(dstatus != null && !dstatus.equals("")){
				criteria.setDstatus(Integer.parseInt(dstatus));
			}else{
				criteria.setDstatus(1);
			}
			
			if(ptype != null && !ptype.equals("")){
				criteria.setPtype(Integer.parseInt(ptype));
			}
			
			if(cId != null && !cId.equals("")){
				criteria.setcId(Integer.parseInt(cId));
			}
			
			criteria.setPurpose(0);
			
			pageInfo = productService.queryProductList(criteria, pageInfo);
			
			if(pageInfo != null && pageInfo.getTotal() > 0){
				pageInfo.setCode(200);
				pageInfo.setMsg("查询成功");
			}else{
				pageInfo.setCode(1003);
				pageInfo.setMsg("查询数据为空");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("查询失败，服务器内部错误，请与服务商联系！");
		}
		return pageInfo;
	}
	
	/**
	 * 产品详情
	 * @param id
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/detailsById", method = RequestMethod.POST)
	public @ResponseBody Object detailsById(String id, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("查询产品列表");
		PageInfo pageInfo = new PageInfo();
		try {
			ProductInfo p_info = productService.selectByPrimaryKey(id);
			if(p_info != null){
				//字段转换
				ProductDetailsVo pdv = new ProductDetailsVo();
				pdv.setDetailsCss(HtmlUtils.htmlUnescape(p_info.getDetailsCss()));
				pdv.setDetailsJs(HtmlUtils.htmlUnescape(p_info.getDetailsJs()));
				pdv.setDetailsInfo1(HtmlUtils.htmlUnescape(p_info.getDetailsInfo1()));
				pdv.setDetailsInfo2(HtmlUtils.htmlUnescape(p_info.getDetailsInfo2()));
				pdv.setGrade(p_info.getGrade());
				pdv.setId(p_info.getId());
				pdv.setIntegralRatio(p_info.getIntegralRatio());
				pdv.setJobList(p_info.getJobList());
				pdv.setOverview(p_info.getOverview());
				pdv.setPname(p_info.getPname());
				pdv.setPrice(p_info.getPrice());
				pdv.setRate(p_info.getRate());
				pdv.setReleaseCity(p_info.getReleaseCity());
				pdv.setStartRange(p_info.getStartRange());
				pdv.setUnit(p_info.getUnit());
				
				pageInfo.setCode(200);
				pageInfo.setMsg("查询成功");
				pageInfo.setObj(pdv);
			}else{
				pageInfo.setCode(1003);
				pageInfo.setMsg("请求的数据不存在");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("服务器内部错误");
		}
		return pageInfo;
	}
	
	/**
	 * 购买
	 * @param id
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/buyById", method = RequestMethod.POST)
	public @ResponseBody Object buyById(String id, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("查询产品列表");
		PageInfo pageInfo = new PageInfo();
		try {
			HttpSession session = request.getSession();
			Object loginState = session.getAttribute("loginState");
			
			if(loginState != null && loginState.equals("1")){
				ProductInfo p_info = productService.selectByPrimaryKey(id);
				if(p_info != null){
					//字段转换
					ProductDetailsVo pdv = new ProductDetailsVo();
					pdv.setBuyCss(HtmlUtils.htmlUnescape(p_info.getBuyCss()));
					pdv.setBuyJs(HtmlUtils.htmlUnescape(p_info.getBuyJs()));
					pdv.setBuyInfo1(HtmlUtils.htmlUnescape(p_info.getBuyInfo1()));
					pdv.setBuyInfo2(HtmlUtils.htmlUnescape(p_info.getBuyInfo2()));
					pdv.setGrade(p_info.getGrade());
					pdv.setId(p_info.getId());
					pdv.setIntegralRatio(p_info.getIntegralRatio());
					pdv.setJobList(p_info.getJobList());
					pdv.setOverview(p_info.getOverview());
					pdv.setPname(p_info.getPname());
					pdv.setPrice(p_info.getPrice());
					pdv.setRate(p_info.getRate());
					pdv.setReleaseCity(p_info.getReleaseCity());
					pdv.setStartRange(p_info.getStartRange());
					pdv.setUnit(p_info.getUnit());
					
					pageInfo.setCode(200);
					pageInfo.setMsg("查询成功");
					pageInfo.setObj(pdv);
				}else{
					pageInfo.setCode(1003);
					pageInfo.setMsg("请求的数据不存在");
				}
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
}
