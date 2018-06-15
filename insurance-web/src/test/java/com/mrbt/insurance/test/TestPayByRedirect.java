package com.mrbt.insurance.test;

import java.math.BigDecimal;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.mrbt.pay.face.PayMentIF;

/**
 * 网银支付
 * @author ruochen.yu
 *
 */
public class TestPayByRedirect {
	@Autowired
	public PayMentIF jdPay;
	@Test
	public void test() {
		System.out.println(jdPay.sendPayInfoToBank("20160823-110226189002-bbf208c6d75e98bf31471920036083",
				new BigDecimal("100"), "305", "http://www.sina.com.cn",
				"http://www.sina.com.cn"));
	}
}
