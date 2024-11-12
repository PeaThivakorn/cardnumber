package com.example.idcardreader.service;

import org.springframework.stereotype.Service;
import com.example.idcardreader.model.IDCardData;

@Service
public class IDCardService {

    public IDCardData readCard() throws Exception {
        // โค้ดเชื่อมต่อเครื่องอ่านบัตรที่ต้องการ
        // ดึงข้อมูลจากบัตร (ข้อมูลนี้เป็นตัวอย่างเท่านั้น)

        IDCardData data = new IDCardData();
        data.setFullName("สมชาย ใจดี");
        data.setCitizenId("1234567890123");
        data.setDob("01/01/1990");
        data.setAddress("123/45 ถนนสุขุมวิท กรุงเทพมหานคร");

        return data;
    }
}
