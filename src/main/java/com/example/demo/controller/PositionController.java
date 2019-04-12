package com.example.demo.controller;

import com.example.demo.controller.object.Search;
import com.example.demo.dao.ManageSQL;
import com.example.demo.model.Position;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
public class PositionController {
    ManageSQL manageSQL = new ManageSQL();

    @GetMapping("/getPosition")
    public ResponseEntity getPosition() {
        return ResponseEntity.ok(manageSQL.getPosition());
    }


    @PostMapping("/createPosition")
    public ResponseEntity createDonVi(@RequestBody String position) {
        System.out.println(position);
        return ResponseEntity.ok(manageSQL.createPosition(position));
    }

    @PostMapping("/updatePosition")
    public ResponseEntity updatePosition(@RequestBody Position position) {
        System.out.println(position.toString());
            return ResponseEntity.ok(manageSQL.updatePosition(position));
    }
    @PostMapping("/deletePosition")
    public ResponseEntity deletePostion(@RequestBody Position position) {
        System.out.println("id cần xóa"+position);
        return ResponseEntity.ok(manageSQL.deletePosition(position));
    }

}
