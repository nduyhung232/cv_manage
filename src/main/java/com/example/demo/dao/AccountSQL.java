package com.example.demo.dao;

import com.example.demo.dao.config.MyConnectionSql;
import com.example.demo.model.Account;
import com.example.demo.model.Container;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class AccountSQL {
    static MyConnectionSql myConnectionSQL = new MyConnectionSql();
    public static Connection connection = myConnectionSQL.getConnection();

    public Account checkLogin(String userName, String userPass) {
        try {
            Statement statement = connection.createStatement();
            String sql = "select Account.id, Account.userName, Account.password, Account.name, Account.phoneNumber,\n" +
                    "donvi.donvi, Account.status, donvi.id from Account " +
                    "join donvi on Account.idDonVi = donvi.id \n" +
                    "WHERE userName = '" + userName + "'" +
                    "AND password = '" + userPass + "'";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Account accountDTO = new Account(
                        resultSet.getInt(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4),
                        resultSet.getString(5),
                        resultSet.getString(6),
                        resultSet.getInt(7),
                        resultSet.getString(8));

                return accountDTO;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public ArrayList<Container> getAllDonVi() {
        ArrayList<Container> list = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select * from donvi";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Container container = new Container(
                        resultSet.getInt(1),
                        resultSet.getString(2));

                list.add(container);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return list;
    }

    public boolean createAccount(Account account) {
        try {
            Statement statement = connection.createStatement();
            String sql = "insert into Account (userName,password,Account.name,phoneNumber,idDonVi,status) values " +
                    "('" + account.getUserName() +
                    "','" + account.getPassWord() +
                    "','" + account.getName() +
                    "','" + account.getPhoneNumber() +
                    "'," + account.getIdDonVi() +
                    ",'" + account.getStatus() +
                    "')";
            statement.executeUpdate(sql);

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public ArrayList<Account> getAllAccount() {
        ArrayList<Account> accounts = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select Account.id, Account.userName,Account.password, Account.name,\n" +
                    "Account.phoneNumber, donvi.id, donvi.donvi, Account.status \n" +
                    "from Account join donvi on donvi.id = Account.idDonVi";
            statement.execute(sql);
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Account account = new Account();
                account.setId(resultSet.getInt(1));
                account.setUserName(resultSet.getString(2));
                account.setPassWord(resultSet.getString(3));
                account.setName(resultSet.getString(4));
                account.setPhoneNumber(resultSet.getString(5));
                account.setIdDonVi(resultSet.getString(6));
                account.setDonVi(resultSet.getString(7));
                account.setStatus(resultSet.getInt(8));

                accounts.add(account);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return accounts;
        }

        return accounts;
    }
}

