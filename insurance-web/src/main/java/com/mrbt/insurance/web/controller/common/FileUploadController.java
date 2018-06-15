package com.mrbt.insurance.web.controller.common;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mrbt.insurance.admin.commons.annotation.DataSourceChange;
import com.mrbt.insurance.admin.commons.base.BaseController;
import com.mrbt.insurance.service.FileUploadServer;
import com.mrbt.insurance.service.ImageUploadServer;

/**
 * 上传类
 * 
 * @author ruochen.yu
 *
 */
@Controller
@RequestMapping("/fileUpload")
public class FileUploadController extends BaseController {

	@Autowired
	private ImageUploadServer imageUploadServer;
	
	@Autowired
	private FileUploadServer fileUploadServer;

	private String pictureUrl = "compayImage";
	
	private String path = "d:/upload/";

	/**
	 * 图片上传 compay_image:公司图片
	 * 
	 * @return
	 */
	@RequestMapping("/saveImage")
	public @ResponseBody Object saveImage(HttpServletRequest request, HttpServletResponse response,String picUrl,
			@RequestParam(value = "image_input", required = true) MultipartFile file) {
		try {
			if (file != null) {
				String imageFileName="";
				if(picUrl!=null&&!picUrl.isEmpty()){
					imageFileName = imageUploadServer.uploadFileToFtp(file, picUrl);
				}else{
					imageFileName = imageUploadServer.uploadFileToFtp(file, pictureUrl);
				}
				if (imageFileName != null) {
					return renderSuccess(imageFileName);
				} else {
					return renderError("上传的不是图片");
				}
			} else {
				return renderError("上传文件为空");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return renderError("服务器内部错误");
		}
	}
	
	
	/**
	 * 上传保险行业信息，并入库
	 * @return
	 */
	@DataSourceChange(slave = true)
	@RequestMapping("/saveExcel")
	public @ResponseBody Object saveExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "excel_input", required = true) MultipartFile file) {
		try {
			String batchName = request.getParameter("batchName");
			if (file != null) {
		        try {
		        	File f = new File(path);
		        	if(!f.exists()){
		        		f.mkdirs();
		        	}
		            //写入到磁盘中
		        	fileUploadServer.uploadJodExcel(file, batchName);
		            return renderSuccess("上传完成");
		        } catch (Exception e) {
		        	e.printStackTrace();
		        	return renderError("上传失败");
		        }
			} else {
				return renderError("上传文件为空");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return renderError("服务器内部错误");
		}
	}
	
	/**
	 * 模板上传  
	 * 放到admin
	 * @return
	 */
	/*@RequestMapping("/saveFile")
	public @ResponseBody Object saveFile(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "file", required = true) MultipartFile file) {
		try {
			if (file != null) {
				 fileUploadServer.uploadFile(file);
			} else {
			}
		} catch (Exception e) {
			e.printStackTrace();
			return renderError("服务器内部错误");
		}
		return null;
	}*/
	
}
