package com.example.demo.dao;

import com.example.demo.dao.config.MyConnectionSql;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ImportDataSQL {
    static MyConnectionSql myConnectionSQL = new MyConnectionSql();
    public static Connection connection = myConnectionSQL.getConnection();

    public Boolean updateLinkFileCV(String link) {
        if (getLateId() == 0){
            return false;
        }
        int id = getLateId();

        try {
            Statement statement = connection.createStatement();
            String sql = "update cv set fileCV = '" + link + "' where id = " + id;
            statement.executeUpdate(sql);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    private int getLateId() {
        int id = 0;
        try {
            Statement statement = connection.createStatement();
            String sql = "select id from cv ORDER BY id DESC limit 1";
            ResultSet resultSet = statement.executeQuery(sql);

            if (!resultSet.next()) {
                return id;
            }
            id = resultSet.getInt(1);

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        return id;
    }
}
