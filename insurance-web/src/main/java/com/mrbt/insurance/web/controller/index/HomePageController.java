package com.mrbt.insurance.web.controller.index;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mrbt.insurance.admin.commons.utils.PageInfo;
import com.mrbt.insurance.service.BannerManagerService;
import com.mrbt.insurance.service.SceneButtonService;
import com.mrbt.insurance.service.WebFunButtonService;
import com.mrbt.insurance.web.model.WebBannerManager;
import com.mrbt.insurance.web.model.WebFunctionButton;
import com.mrbt.insurance.web.model.WebFunctionButtonExample;
import com.mrbt.insurance.web.model.WebSceneClassification;
import com.mrbt.insurance.web.model.WebSceneClassificationExample;
import com.mrbt.insurance.web.vo.WebBannerManagerVo;
import com.mrbt.insurance.web.vo.WebFunctionButtonVo;
import com.mrbt.insurance.web.vo.WebSceneClassificationVo;

@Controller
@RequestMapping("/home")
public class HomePageController {

	private static final Logger LOGGER = LogManager.getLogger(HomePageController.class);

	@Autowired
	private BannerManagerService bannerManagerService;

	@Autowired
	private WebFunButtonService webFunButtonService;

	@Autowired
	private SceneButtonService sceneButtonService;
	
	/**
	 * 查询banner
	 * 
	 * @param position
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/findBanner", method = RequestMethod.GET)
	public @ResponseBody Object findBanner(Integer position, HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();// 创建返回值对象

		LOGGER.info("查询BANNER列表，position=" + position);
		try {

			List<WebBannerManager> resList = bannerManagerService.findBannerList(position);

			if (resList != null && resList.size() > 0) {
				// 封装参数
				List<WebBannerManagerVo> rows = new ArrayList<WebBannerManagerVo>();
				for (int i = 0; i < resList.size(); i++) {
					WebBannerManagerVo vo = new WebBannerManagerVo();
					WebBannerManager d = resList.get(i);

					vo.setBackground(d.getBackground());
					vo.setDname(d.getDname());
					vo.setImage(d.getImage());
					vo.setUrl(d.getUrl());

					rows.add(vo);
				}

				pageInfo.setRows(rows);
				pageInfo.setTotal(resList.size());
				pageInfo.setCode(200);
				pageInfo.setMsg("查询成功");
			} else {
				pageInfo.setCode(1003);
				pageInfo.setMsg("查询成功,没有数据");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("查询失败，服务器内部错误，请与服务商联系！");
		}
		return pageInfo;
	}

	/**
	 * 查询功能按钮
	 * 
	 * @param position
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/findFunButton", method = RequestMethod.GET)
	public @ResponseBody Object findFunButton(HttpServletRequest request, HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();// 创建返回值对象

		LOGGER.info("查询功能按钮");
		try {
			// 创建查询条件
			WebFunctionButtonExample example = new WebFunctionButtonExample();
			example.createCriteria().andFstatusEqualTo(1);
			example.setOrderByClause("sort");

			List<WebFunctionButton> resList = webFunButtonService.findFunButtonList(example);

			if (resList != null && resList.size() > 0) {
				// 封装参数
				List<WebFunctionButtonVo> rows = new ArrayList<WebFunctionButtonVo>();
				for (int i = 0; i < resList.size(); i++) {
					WebFunctionButtonVo vo = new WebFunctionButtonVo();
					WebFunctionButton d = resList.get(i);

					vo.setFbname(d.getFbname());
					String[] icons = d.getIcon().split(",");
					vo.setIcon_static(icons[0]);
					vo.setIcon_active(icons[1]);
					vo.setSort(d.getSort());
					vo.setUrl(d.getUrl());

					rows.add(vo);
				}

				pageInfo.setRows(rows);
				pageInfo.setTotal(resList.size());
				pageInfo.setCode(200);
				pageInfo.setMsg("查询成功");
			} else {
				pageInfo.setCode(1003);
				pageInfo.setMsg("查询成功,没有数据");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("查询失败，服务器内部错误，请与服务商联系！");
		}
		return pageInfo;
	}

	/**
	 * 查询场景按钮
	 * 
	 * @param position
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/findSceneButten", method = RequestMethod.GET)
	public @ResponseBody Object findSceneButten(HttpServletRequest request,
			HttpServletResponse response) {
		PageInfo pageInfo = new PageInfo();// 创建返回值对象

		LOGGER.info("查询场景按钮");
		try {
			// 创建查询条件
			WebSceneClassificationExample example = new WebSceneClassificationExample();
			example.createCriteria().andDstatusEqualTo(1);
			example.setOrderByClause("sort");

			List<WebSceneClassification> resList = sceneButtonService.findsceneButtonList(example);

			if (resList != null && resList.size() > 0) {
				// 封装参数
				List<WebSceneClassificationVo> rows = new ArrayList<WebSceneClassificationVo>();
				for (int i = 0; i < resList.size(); i++) {
					WebSceneClassificationVo vo = new WebSceneClassificationVo();
					WebSceneClassification d = resList.get(i);

					vo.setId(d.getId());
					vo.setHeight(d.getHeight());
					vo.setImage(d.getImage());
					vo.setScname(d.getScname());
					vo.setSort(d.getSort());
					vo.setUrl(d.getUrl());
					vo.setWidth(d.getWidth());

					rows.add(vo);
				}

				pageInfo.setRows(rows);
				pageInfo.setTotal(resList.size());
				pageInfo.setCode(200);
				pageInfo.setMsg("查询成功");
			} else {
				pageInfo.setCode(1003);
				pageInfo.setMsg("查询成功,没有数据");
			}
		} catch (Exception e) {
			e.printStackTrace();
			pageInfo.setCode(500);
			pageInfo.setMsg("查询失败，服务器内部错误，请与服务商联系！");
		}
		return pageInfo;
	}

}
