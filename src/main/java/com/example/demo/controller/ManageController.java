package com.example.demo.controller;

import com.example.demo.controller.object.Search;
import com.example.demo.dao.ManageSQL;
import com.example.demo.model.CV;
import com.example.demo.model.Container;
import com.example.demo.model.Organization;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.http.*;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
public class ManageController {
    ManageSQL manageSQL = new ManageSQL();

    @GetMapping("/getStaffInfo")
    public ResponseEntity getStaffInfo() {

        return ResponseEntity.ok(manageSQL.getCV());
    }

    @GetMapping("/getDiaDiemOp")
    public ResponseEntity getDiaDiemOp() {
        return ResponseEntity.ok(manageSQL.getOptionDiaDiem());
    }

    @GetMapping("/getViTriOp")
    public ResponseEntity getViTriOp() {
        return ResponseEntity.ok(manageSQL.getViTri());
    }

    @GetMapping("/getDonViOp")
    public ResponseEntity getDonViOp() {
        return ResponseEntity.ok(manageSQL.getOptionDonVi());
    }

    @PostMapping("/search")
    public ResponseEntity searchByHoten(@RequestBody Search search) {
        System.out.println(search.toString());
        return ResponseEntity.ok(manageSQL.search(search));
    }

    @PostMapping("/createDonVi")
    public ResponseEntity createDonVi(@RequestBody String donvi) {
        System.out.println(donvi);
        return ResponseEntity.ok(manageSQL.createDonVi(donvi));
    }

    @PostMapping("/updateDonvi")
    public ResponseEntity updateDonVi(@RequestBody Organization org) {
        System.out.println(org.toString());
        return ResponseEntity.ok(manageSQL.updateORG(org));
    }
    @PostMapping("/deleteDonvi")
    public ResponseEntity deleteORG(@RequestBody Organization org) {
        System.out.println("id cần xóa"+org);
        return ResponseEntity.ok(manageSQL.deleteORG(org));
    }

    @PostMapping("/createCV")
    public ResponseEntity createCV(@RequestBody CV cv) {
        System.out.println(cv.toString());
        if (manageSQL.checkPhonenumberExist(cv.getSoDT())) {
            return ResponseEntity.ok("Số điện thoại trùng");
        } else {
            return ResponseEntity.ok(manageSQL.createCV(cv));
        }
    }

    @PostMapping("/updateCV")
    public ResponseEntity updateCV(@RequestBody CV cv) {
        System.out.println(cv.toString());
            return ResponseEntity.ok(manageSQL.updateCV(cv));
    }
    @PostMapping("/deleteCV")
    public ResponseEntity deleteCV(@RequestBody CV cv) {
        System.out.println("id cần xóa"+cv);
        return ResponseEntity.ok(manageSQL.deleteCV(cv));
    }

    @RequestMapping(value = "/getfile", method = RequestMethod.GET)
    public ResponseEntity<byte[]> download1(HttpServletResponse response, @RequestParam String link) throws IOException {
        ResponseEntity<byte[]> responses = null;
        try {
            File file = ResourceUtils.getFile(link);

            byte[] data = FileUtils.readFileToByteArray(file);
            // Thiết lập thông tin trả về
            response.setContentType("application/octet-stream");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));

            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
            responses = new ResponseEntity<>(data, headers, HttpStatus.OK);


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return responses;
    }
}
