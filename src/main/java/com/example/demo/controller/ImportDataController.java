package com.example.demo.controller;

import com.example.demo.dao.ImportDataSQL;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class ImportDataController {
    ImportDataSQL importDataSQL = new ImportDataSQL();

    @PostMapping("/createFilecv")
    public ResponseEntity CreateFileResponse(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            System.out.println("file cv don't exist");
            return ResponseEntity.ok("Không có file CV");
        } else {
            String genFileName = UUID.randomUUID().toString();
            String fileName = "../file_cv/" + genFileName + ".pdf";
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            byte[] filecv = file.getBytes();
            fileOutputStream.write(filecv);

            System.out.println("impot data success");

            if (importDataSQL.createLinkFileCV(fileName)) {
                return ResponseEntity.ok("thanh cong");
            } else {
                return ResponseEntity.ok("that bai");
            }
        }
    }

    @PostMapping("/updatefFilecv")
    public ResponseEntity UpdateFileResponse(@RequestParam int id ,@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            System.out.println("file cv don't exist");
            return ResponseEntity.ok("Không có file CV");
        } else {
            String genFileName = UUID.randomUUID().toString();
            String fileName = "../file_cv/" + genFileName + ".pdf";
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            byte[] filecv = file.getBytes();
            fileOutputStream.write(filecv);

            System.out.println("impot data success");

            if (importDataSQL.updateLinkFileCV(id,fileName)) {
                return ResponseEntity.ok("thanh cong");
            } else {
                return ResponseEntity.ok("that bai");
            }
        }
    }

}
