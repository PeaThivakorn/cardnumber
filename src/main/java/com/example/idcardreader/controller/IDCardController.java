package com.example.idcardreader.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.example.idcardreader.service.IDCardService;
import com.example.idcardreader.model.IDCardData;

@RestController
public class IDCardController {

    private final IDCardService idCardService;

    public IDCardController(IDCardService idCardService) {
        this.idCardService = idCardService;
    }

    @GetMapping("/api/read-id-card")
    public ResponseEntity<?> readIDCard() {
        try {
            IDCardData data = idCardService.readCard();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}
