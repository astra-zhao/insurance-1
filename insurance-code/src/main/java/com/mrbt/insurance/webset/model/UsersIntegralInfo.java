package com.mrbt.insurance.webset.model;

import java.util.Date;

public class UsersIntegralInfo {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users_integral_info.id
     *
     * @mbggenerated
     */
    private String id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users_integral_info.u_id
     *
     * @mbggenerated
     */
    private String uId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users_integral_info.integral
     *
     * @mbggenerated
     */
    private Integer integral;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users_integral_info.istate
     *
     * @mbggenerated
     */
    private Integer istate;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users_integral_info.modify_time
     *
     * @mbggenerated
     */
    private Date modifyTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users_integral_info.id
     *
     * @return the value of users_integral_info.id
     *
     * @mbggenerated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users_integral_info.id
     *
     * @param id the value for users_integral_info.id
     *
     * @mbggenerated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users_integral_info.u_id
     *
     * @return the value of users_integral_info.u_id
     *
     * @mbggenerated
     */
    public String getuId() {
        return uId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users_integral_info.u_id
     *
     * @param uId the value for users_integral_info.u_id
     *
     * @mbggenerated
     */
    public void setuId(String uId) {
        this.uId = uId == null ? null : uId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users_integral_info.integral
     *
     * @return the value of users_integral_info.integral
     *
     * @mbggenerated
     */
    public Integer getIntegral() {
        return integral;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users_integral_info.integral
     *
     * @param integral the value for users_integral_info.integral
     *
     * @mbggenerated
     */
    public void setIntegral(Integer integral) {
        this.integral = integral;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users_integral_info.istate
     *
     * @return the value of users_integral_info.istate
     *
     * @mbggenerated
     */
    public Integer getIstate() {
        return istate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users_integral_info.istate
     *
     * @param istate the value for users_integral_info.istate
     *
     * @mbggenerated
     */
    public void setIstate(Integer istate) {
        this.istate = istate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users_integral_info.modify_time
     *
     * @return the value of users_integral_info.modify_time
     *
     * @mbggenerated
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users_integral_info.modify_time
     *
     * @param modifyTime the value for users_integral_info.modify_time
     *
     * @mbggenerated
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}