package com.example.demo;

import com.example.demo.dao.ManageSQL;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Test
    public void aaa(){
        ManageSQL manageSQL = new ManageSQL();
        assertEquals(manageSQL.getCV(), new ArrayList<>());
    }

}
