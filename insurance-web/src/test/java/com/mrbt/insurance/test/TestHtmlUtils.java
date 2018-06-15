package com.mrbt.insurance.test;

import org.junit.Test;  
import org.springframework.web.util.HtmlUtils;  
  
/** 
 * Html代码与字符串转换，解决String类型数据返回后无法正常解析问题 
 * 
 * 2012-12-27 下午11:22:53 
 */  
public class TestHtmlUtils {  
  
    String html = "<ul class=\"nav\"><li><a href=\"http://www.mkfree.com\">首 页</a></li>"+  
            "<li class=\"active\"><a href=\"http://blog.mkfree.com\">博客</a></li>"+  
            "<li><a href=\"#\">RSS</a></li></ul>";  
    /** 
     * 把html的标签特殊字符转换成普通字符 
     */  
    @Test  
    public void testhtmlEscape(){  
        String value = HtmlUtils.htmlEscape(html);  
        System.out.println(value);  
    }  
    /** 
     * 把html的特殊字符转换成普通数字 
     */  
    @Test  
    public void testhtmlEscapeDecimal(){  
        String value = HtmlUtils.htmlEscapeDecimal(html);  
        System.out.println(value);  
    }  
    /** 
     * 把html的特殊字符转换成符合Intel HEX文件的字符串 
     */  
    @Test  
    public void htmlEscapeHex(){  
        String value = HtmlUtils.htmlEscapeHex(html);  
        System.out.println(value);  
    }  
    /** 
     * 把html的特殊字符反转换成html标签 
     * 以上三种方法都可以反转换 
     */  
    @Test  
    public void htmlUnescape(){  
        String tmp = HtmlUtils.htmlEscapeDecimal(html);  
        System.out.println(tmp);  
  
        String value = HtmlUtils.htmlUnescape(tmp);  
        System.out.println(value);  
    }  
} 
