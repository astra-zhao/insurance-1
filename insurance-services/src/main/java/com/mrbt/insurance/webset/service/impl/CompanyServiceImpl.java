package com.mrbt.insurance.webset.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mrbt.insurance.admin.commons.annotation.DataSourceChange;
import com.mrbt.insurance.webset.mapper.CompanyInfoMapper;
import com.mrbt.insurance.webset.mapper.CompanyTypeMapper;
import com.mrbt.insurance.webset.model.CompanyInfo;
import com.mrbt.insurance.webset.model.CompanyInfoExample;
import com.mrbt.insurance.webset.model.CompanyType;
import com.mrbt.insurance.webset.model.CompanyTypeExample;
import com.mrbt.insurance.webset.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
	
	@Autowired
	private CompanyInfoMapper companyInfoMapper;
	
	@Autowired
	private CompanyTypeMapper companyTypeMapper;
	
	@Override
	@DataSourceChange(slave = true)
	public List<CompanyInfo> selectByPrimaryKey(CompanyInfoExample example){
		return companyInfoMapper.selectByExample(example);
	}

	@Override
	@DataSourceChange(slave = true)
	public Integer countCompanyInfo(CompanyInfoExample example) {
		return companyInfoMapper.countByExample(example);
	}

	@Override
	@DataSourceChange(slave = true)
	public List<CompanyType> selectCompanyType(CompanyTypeExample example) {
		return companyTypeMapper.selectByExample(example);
	}
	
}
