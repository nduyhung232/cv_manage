package com.example.demo.controller;

import com.example.demo.dao.AccountSQL;
import com.example.demo.model.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    AccountSQL accountSQL = new AccountSQL();

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Account account) {
        Account account1 = accountSQL.checkLogin(account.getUserName(), account.getPassWord());
        if (account1 == null) {
            System.out.println("login fail");
            account1 = new Account();
        } else {
            System.out.println("login successful");
        }
        return ResponseEntity.ok(account1);
    }

    @GetMapping("/getDonVi")
    public ResponseEntity getDonVi() {
        return ResponseEntity.ok(accountSQL.getAllDonVi());
    }

    @PostMapping("/addAccount")
    public ResponseEntity searchByHoten(@RequestBody Account account) {
        System.out.println(account.toString());
        return ResponseEntity.ok(accountSQL.createAccount(account));
    }

    @GetMapping("/getAllAccount")
    public ResponseEntity getAllAccount() {
        return ResponseEntity.ok(accountSQL.getAllAccount());
    }
}
