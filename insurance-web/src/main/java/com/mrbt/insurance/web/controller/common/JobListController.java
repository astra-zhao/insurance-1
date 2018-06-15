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

import com.mrbt.insurance.service.JobListService;
import com.mrbt.insurance.web.model.JobList;
import com.mrbt.insurance.web.vo.JobListVo;

/**
 * 查询行业列表，用于网站
 * 
 * @author ruochen.yu
 *
 */
@Controller
@RequestMapping("/jobList")
public class JobListController {
	
	private static final Logger LOGGER = LogManager.getLogger(JobListController.class);

	@Autowired
	private JobListService jobListService;

	/**
	 * 根据产品信息中的行业批次查询行业列表，或通过上层基本查询行业列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/queryJobListByBatch", method = RequestMethod.GET)
	public @ResponseBody Object queryJobListByBatch(HttpServletRequest request, HttpServletResponse response) {
		String batch = request.getParameter("batch");
		String parentId = request.getParameter("parentId");
		
		//如果批次为空，上级ID不能为空或为0（没有批次查询上级ID会出问题的）
		if(batch == null && (parentId == null || parentId.equals("0"))){
			return null;
		}

		LOGGER.info("购买保险-行业列表batch=" + batch + ",parentId=" + parentId);

		List<JobList> jobList = jobListService.queryJobListByBatch(batch, parentId);

		if (jobList != null && jobList.size() > 0) {
			List<JobListVo> jobListVo = new ArrayList<JobListVo>();

			for (int i = 0; i < jobList.size(); i++) {
				JobList job = jobList.get(i);
				JobListVo jobVo = new JobListVo();

				jobVo.setJobId(job.getJobId());
				jobVo.setJobName(job.getJobName());

				jobListVo.add(jobVo);
			}
			return jobListVo;
		} else {
			return null;
		}
	}
}
