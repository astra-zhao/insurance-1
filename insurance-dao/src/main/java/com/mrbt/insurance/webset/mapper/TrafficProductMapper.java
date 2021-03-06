package com.mrbt.insurance.webset.mapper;

import com.mrbt.insurance.webset.model.TrafficProduct;
import com.mrbt.insurance.webset.model.TrafficProductExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TrafficProductMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int countByExample(TrafficProductExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int deleteByExample(TrafficProductExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int insert(TrafficProduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int insertSelective(TrafficProduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    List<TrafficProduct> selectByExample(TrafficProductExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    TrafficProduct selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") TrafficProduct record, @Param("example") TrafficProductExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") TrafficProduct record, @Param("example") TrafficProductExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(TrafficProduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table traffic_product
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(TrafficProduct record);
}