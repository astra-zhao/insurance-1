package com.mrbt.insurance.test;

import java.net.URLEncoder;

import com.mrbt.pay.jd.vo.BankFourElementsVo;

public class Test {
	public static void main(String[] args) {
		
		String a = "abc=123";
		System.out.println(URLEncoder.encode(a));
		
//		BankFourElementsVo vo = new BankFourElementsVo();
//		vo.setResultCode("000");
//		System.out.println(vo.isOk());
		
	}
}
