package com.mrbt.insurance.webset.service;

import java.util.List;

import com.mrbt.insurance.webset.model.CompanyInfo;
import com.mrbt.insurance.webset.model.CompanyInfoExample;
import com.mrbt.insurance.webset.model.CompanyType;
import com.mrbt.insurance.webset.model.CompanyTypeExample;

public interface CompanyService {
	
	public List<CompanyInfo> selectByPrimaryKey(CompanyInfoExample example);

	public Integer countCompanyInfo(CompanyInfoExample example);

	public List<CompanyType> selectCompanyType(CompanyTypeExample example);
	
}
