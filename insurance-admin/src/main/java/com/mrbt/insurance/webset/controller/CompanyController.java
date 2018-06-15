package com.mrbt.insurance.webset.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.insurance.admin.commons.base.BaseController;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.code.RespondBean;
import com.mrbt.insurance.webset.model.CompanyInfo;
import com.mrbt.insurance.webset.model.CompanyInfoExample;
import com.mrbt.insurance.webset.model.CompanyType;
import com.mrbt.insurance.webset.model.CompanyTypeExample;
import com.mrbt.insurance.webset.service.CompanyService;

/**
 * 
 * @author Administrator
 * 保险公司信息管理
 * server实现类中如果访问的是从库的内容要加上注释“@DataSourceChange(slave = true)”
 */
@Controller
@RequestMapping("/company")
public class CompanyController extends BaseController  {
	
	private static final Logger LOGGER = LogManager.getLogger(CompanyController.class);
	
	@Autowired
	private CompanyService companyService;
	
	/**
	 * 保险公司管理页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/manager", method = RequestMethod.GET)
    public String manager(Model model) {
        return "webset/company";
    }
	
	/**
	 * 加载增加保险公司页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/addPage", method = RequestMethod.GET)
    public String addPage(Model model) {
        return "webset/companyAdd";
    }
	
	/**
	 * 添加保险公司
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
    public @ResponseBody Object add(HttpServletRequest request) {
		System.out.println("添加保险公司操作！");
        return renderSuccess("添加成功");
    }
	
	
	
	/**
	 * 公司列表
	 * @param page
	 * @param rows
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/dataList")
	public @ResponseBody Object dataList(Integer page, Integer rows, String sort, String order){
		LOGGER.info("获取保险公司列表....");
		PageInfo pageInfo = new PageInfo(page, rows);
		CompanyInfoExample example = new CompanyInfoExample();
		
		List<CompanyInfo> rowsList = companyService.selectByPrimaryKey(example);
		Integer total = companyService.countCompanyInfo(example);
		
		pageInfo.setRows(rowsList);
		pageInfo.setTotal(total);
		
		return pageInfo;
	}
	
	/**
	 * 公司类型列表
	 * @param page
	 * @param rows
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/queryCompanyType")
	public @ResponseBody Object queryCompanyType(){
		LOGGER.info("获取公司类型列表....");
		RespondBean respandBean = new RespondBean();
		List<CompanyType> dataList = null;
		try {
			CompanyTypeExample example = new CompanyTypeExample();
			
			dataList = companyService.selectCompanyType(example);
		} catch (Exception e) {
			e.printStackTrace();
			respandBean.setResCode(500);
			respandBean.setResMsg("服务器内部错误");
		}
		return dataList;
	}
	
}
