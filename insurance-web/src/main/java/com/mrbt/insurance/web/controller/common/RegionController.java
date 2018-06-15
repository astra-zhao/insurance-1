package com.mrbt.insurance.web.controller.common;

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

import com.mrbt.insurance.service.RegionService;
import com.mrbt.insurance.web.model.Region;
import com.mrbt.insurance.web.vo.RegionVo;

/**
 * 购买保险调用的城市列表接口
 * @author ruochen.yu
 *
 */
@Controller
@RequestMapping("/region")
public class RegionController {
	
	private static final Logger LOGGER = LogManager.getLogger(RegionController.class);
	
	@Autowired
	private RegionService regionService;
	
	/**
	 * 查询省份列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/queryProvince", method = RequestMethod.GET)
	public @ResponseBody Object queryProvince(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");

		LOGGER.info("购买保险-省份列表id=" + id);
		
		List<Region> relRegion = regionService.queryRegionProvince(id);
		
		if(relRegion != null && relRegion.size() > 0){
			List<RegionVo> regionVoList = new ArrayList<RegionVo>();
			for (int i = 0; i < relRegion.size(); i++) {
				Region region = relRegion.get(i);
				RegionVo regionVo = new RegionVo();
				
				regionVo.setRegionId(region.getRegionId());
				regionVo.setRegionName(region.getRegionName());
				
				regionVoList.add(regionVo);
			}
			return regionVoList;
		}else{
			return null;
		}
	}
	
	/**
	 * 查询省份中的城市
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/queryCity", method = RequestMethod.GET)
	public @ResponseBody Object listBySceneId(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");

		LOGGER.info("购买保险-城市列表:id=" + id);
		
		if(id != null && !id.equals("") && !id.equals("1")){
			List<Region> relRegion = regionService.queryRegionByParentId(Integer.parseInt(id));
			if(relRegion != null && relRegion.size() > 0){
				List<RegionVo> regionVoList = new ArrayList<RegionVo>();
				for (int i = 0; i < relRegion.size(); i++) {
					Region region = relRegion.get(i);
					RegionVo regionVo = new RegionVo();
					
					regionVo.setRegionId(region.getRegionId());
					regionVo.setRegionName(region.getRegionName());
					
					regionVoList.add(regionVo);
				}
				return regionVoList;
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
}
