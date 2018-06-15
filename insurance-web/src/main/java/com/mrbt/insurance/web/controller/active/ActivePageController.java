package com.mrbt.insurance.web.controller.active;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import com.mrbt.insurance.service.ActivePageService;
import com.mrbt.insurance.web.model.ActivePage;

/**
 * 
 * @author 罗鑫
 * @Date 2016年12月21日
 * @version 1.0
 */
@Controller
@RequestMapping(value="/activePage")
public class ActivePageController {

	@Autowired
	private ActivePageService activePageService;
	
	/**
	 * 获取活动页面
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getPageById",method = RequestMethod.POST)
	public @ResponseBody Object getPageById(String id){
		ActivePage page = activePageService.findActivePageById(id);
		page.setPageCss(HtmlUtils.htmlUnescape(page.getPageCss()));
		page.setPageJs(HtmlUtils.htmlUnescape(page.getPageJs()));
		page.setPageHtml(HtmlUtils.htmlUnescape(page.getPageHtml()));
		return page; 
	}
	
}
