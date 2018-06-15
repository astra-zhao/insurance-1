package com.mrbt.insurance.admin.test;
import com.mrbt.insurance.admin.commons.utils.DigestUtils;

public class test {
	public static void main(String[] args) {
		System.out.println(DigestUtils.md5Hex("123456").toCharArray());
	}
}
