package com.mrbt.insurance.admin.service.impl;

import com.mrbt.insurance.admin.mapper.SysLogMapper;
import com.mrbt.insurance.admin.model.SysLog;
import com.mrbt.insurance.admin.service.LogService;
import com.mrbt.insurance.admin.commons.utils.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description：
 * @author：ruochen.yu
 * @date：2015/10/30 10:40
 */
@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private SysLogMapper sysLogMapper;

    @Override
    public void insertLog(SysLog sysLog) {
        sysLogMapper.insert(sysLog);
    }

    @Override
    public void findDataGrid(PageInfo pageInfo) {
        pageInfo.setRows(sysLogMapper.findDataGrid(pageInfo));
        pageInfo.setTotal(sysLogMapper.findDataGridCount(pageInfo));
    }
}
