package com.mrbt.insurance.test;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.mrbt.myutils.type.FourElementsType;
import com.mrbt.pay.face.BankBindIF;
import com.mrbt.pay.jd.vo.BankFourElementsVo;

/**
 * 银行卡绑定
 * @author ruochen.yu
 *
 */
public class TestBankBind{
	@Autowired
	public BankBindIF bankBindByJd;
	
	@Test
	public void test() {

//		BankFourElementsVo vo = bankBindByJd.getToken("");
//		vo = bankBindByJd.getSignature("喻龙", "210181198412136131", "6225880140356857", "CMB", "13683173295", vo);
//		
//		
//		System.out.println(JSON.toJSON(vo));
//		System.out.println(vo.getToken());

		// =====================================================
		BankFourElementsVo vo = new BankFourElementsVo();
		vo.setToken("SbdzQR2ja0e8TzSyqBUVWT/cInW8h/waj9tCBjYRBlk=");
		vo.setVerfyCode("014285");
		vo.setElementsType(FourElementsType.verify);
		vo = bankBindByJd.confirmBankBind("喻龙", "210181198412136131","6225880440356867", "CMB", "13683173295", vo,	vo.getVerfyCode());
		
		if (vo.isOk()) {
			System.out
					.println("======================银行卡四要素成功===================");
		} else {
			System.out.println(vo.getResultInfo());
		}
	}
}
