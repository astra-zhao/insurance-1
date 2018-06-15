package com.mrbt.insurance.webset.mapper;

import com.mrbt.insurance.webset.model.EmployeeordersNexus;
import com.mrbt.insurance.webset.model.EmployeeordersNexusExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface EmployeeordersNexusMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int countByExample(EmployeeordersNexusExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int deleteByExample(EmployeeordersNexusExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(String employeeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int insert(EmployeeordersNexus record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int insertSelective(EmployeeordersNexus record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    List<EmployeeordersNexus> selectByExample(EmployeeordersNexusExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    EmployeeordersNexus selectByPrimaryKey(String employeeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") EmployeeordersNexus record, @Param("example") EmployeeordersNexusExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") EmployeeordersNexus record, @Param("example") EmployeeordersNexusExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(EmployeeordersNexus record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_orders_nexus
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(EmployeeordersNexus record);
}