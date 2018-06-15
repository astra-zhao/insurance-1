package com.mrbt.insurance.test;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.mrbt.myutils.secret.SecretFactory;
import com.mrbt.pay.ValidResultVo;
import com.mrbt.pay.face.PayMentIF;
import com.mrbt.pay.face.QuickPayMentIF;
import com.mrbt.pay.jd.PaySecret;
import com.mrbt.pay.jd.QuickJdPay;
import com.mrbt.pay.jd.vo.QuickJdPayVo;

/**
 * 快捷支付
 * 
 * @author ruochen.yu
 *
 */
public class TestqjdPay {
	@Autowired
	public QuickJdPay qjdPay;
	
	@Test
	public void test() throws Exception {
		//签约
		qianYue();
		
		//支付
		zhifu();
		
		//支付查询
		query();
	}
	
	private void query() {
		try {
			/**
			 * e8a7422a812706da41480397489007
cb79d4629174c897b1480398664345
896443b7ed7a6d0411480402584352
			 */
			//快捷支付查询
			QuickJdPayVo rel = qjdPay.queryByNet("e8a7422a812706da41480397489007");
			System.out.println(JSON.toJSON(rel));
			
			rel = qjdPay.queryByNet("cb79d4629174c897b1480398664345");
			System.out.println(JSON.toJSON(rel));
			
			rel = qjdPay.queryByNet("896443b7ed7a6d0411480402584352");
			System.out.println(JSON.toJSON(rel));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	public void zhifu(){
		QuickJdPayVo vo = qjdPay.quickSell(
				"ICBC", 
				"6212260200109616512", 
				"喻龙", 
				"210181198412136131", 
				"13683173295",
				"68024d085e91e2eb21471857151832", 
				new BigDecimal("100"), 
				"583137", 
				null, 
				getDateStr(),
				getTimeStr());

		System.out.println("=====================" + JSON.toJSONString(vo) + "==========");
	}

	public void qianYue() {
		QuickJdPayVo vo = qjdPay.signBank(
				"ICBC", 
				"6212260200109616512", 
				"喻龙", 
				"210181198412136131", 
				"13683173295",
				"aaa902120639e48ac1471855865367", 
				new BigDecimal("100"));

		System.out.println(JSON.toJSON(vo));

		if (!vo.isOk()) {
			System.out.println("=====================" + vo.getResultInfo() + "==========");
		}
	}
	
	public static SimpleDateFormat sf_m = new SimpleDateFormat("yyyyMMdd");
	public static SimpleDateFormat sf_t = new SimpleDateFormat("HHmmss");
	/**
	 * 返回订单生成日期 yyyyMMdd
	 */
	public static String getDateStr(){
		return sf_m.format(new Date());
	}
	
	/**
	 * 返回当前时间
	 */
	public static String getTimeStr(){
		return sf_t.format(new Date());
	}
}
