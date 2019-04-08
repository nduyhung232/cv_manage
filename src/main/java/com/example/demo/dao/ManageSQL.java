package com.example.demo.dao;

import com.example.demo.controller.object.Search;
import com.example.demo.dao.config.MyConnectionSql;
import com.example.demo.model.CV;
import com.example.demo.model.Container;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class ManageSQL {
    static MyConnectionSql myConnectionSQL = new MyConnectionSql();
    public static Connection connection = myConnectionSQL.getConnection();

    public ArrayList<CV> getCV() {
        ArrayList<CV> cvArrayList = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select cv.name,cv.ngayTao,cv.soDT,cv.fileCV,diadiem.diadiem, donvi.donvi," +
                    " cv.id, cv.idNguoiThayDoi\n" +
                    "from cv \n" +
                    "join diadiem on cv.idDiaDiem = diadiem.id \n" +
                    "join donvi on cv.idDonViUp = donvi.id";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                CV cv = new CV(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4),
                        resultSet.getString(5),
                        resultSet.getString(6),
                        resultSet.getInt(7),
                        resultSet.getInt(8));

                cvArrayList.add(cv);
            }

            for (CV cv : cvArrayList) {
                String sql1 = "SELECT vitri.vitri FROM cv \n" +
                        "join cv_vitri on cv.id = cv_vitri.idcv \n" +
                        "join vitri on vitri.id = cv_vitri.idVitri \n" +
                        "where cv.soDT = '" + cv.getSoDT() + "'";
                ResultSet resultSet1 = statement.executeQuery(sql1);
                while (resultSet1.next()) {
                    cv.getViTri().add(resultSet1.getString(1));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvArrayList;
    }

    ////////////////////////////// SEARCH
    public ArrayList<CV> search(Search search) {
        ArrayList<CV> cvWebArrayList = new ArrayList<>();
        ArrayList<Integer> idList = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select cv.id from  cv \n" +
                    "join diadiem on cv.idDiaDiem = diadiem.id \n" +
                    "join donvi on cv.idDonViUp = donvi.id \n" +
                    "join cv_vitri on cv.id = cv_vitri.idcv \n" +
                    "join vitri on cv_vitri.idVitri = vitri.id\n" +
                    "where cv.name like '%" + search.getHoten() + "%'\n";

            // add code --DiaDiem-- sql
            for (int i = 0; i < search.getIdDiaDiem().size(); i++) {
                if (i == 0) {
                    sql += " and (cv.idDiaDiem = " + search.getIdDiaDiem().get(0);
                } else {
                    sql += " or cv.idDiaDiem = " + search.getIdDiaDiem().get(i);
                }
                if (i == search.getIdDiaDiem().size() - 1)
                    sql = sql + ")\n";
            }

            // add code --DonViUp-- sql
            for (int i = 0; i < search.getIdDonVi().size(); i++) {
                if (i == 0) {
                    sql += " and (idDonViUp = " + search.getIdDonVi().get(0);
                } else {
                    sql += " or idDonViUp = " + search.getIdDonVi().get(i);
                }
                if (i == search.getIdDonVi().size() - 1)
                    sql = sql + ")\n";
            }

            // add code --ViTri-- sql
            for (int i = 0; i < search.getIdViTri().size(); i++) {
                if (i == 0) {
                    sql += " and (vitri.id = " + search.getIdViTri().get(0);
                } else {
                    sql += " or vitri.id = " + search.getIdViTri().get(i);
                }
                if (i == search.getIdViTri().size() - 1)
                    sql = sql + ")\n";
            }

            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                if (!idList.contains(resultSet.getInt(1))) {
                    idList.add(resultSet.getInt(1));
                }
            }

            for (Integer id : idList) {
                cvWebArrayList.add(getCVById(id));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvWebArrayList;
    }

    // get CV By Id
    public CV getCVById(int id) {
        CV cvOut = new CV();
        try {
            Statement statement = connection.createStatement();
            String sql = "select cv.name,cv.ngayTao,cv.soDT,cv.fileCV,diadiem.diadiem, donvi.donvi," +
                    " cv.id, cv.idNguoiThayDoi\n" +
                    "from cv \n" +
                    "join diadiem on cv.idDiaDiem = diadiem.id \n" +
                    "join donvi on cv.idDonViUp = donvi.id where cv.id = " + id;
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
                cvOut = new CV(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4),
                        resultSet.getString(5),
                        resultSet.getString(6),
                        resultSet.getInt(7),
                        resultSet.getInt(8));
            }

            String sql1 = "SELECT vitri.vitri FROM cv \n" +
                    "join cv_vitri on cv.id = cv_vitri.idcv \n" +
                    "join vitri on vitri.id = cv_vitri.idVitri \n" +
                    "where cv.soDT = '" + cvOut.getSoDT() + "'";
            ResultSet resultSet1 = statement.executeQuery(sql1);
            while (resultSet1.next()) {
                cvOut.getViTri().add(resultSet1.getString(1));
            }


        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvOut;
    }

    /////////////////////////////////////////////////
    public ArrayList<Container> getOptionDiaDiem() {
        ArrayList<Container> cvWebArrayList = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select * from diadiem";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Container container = new Container(
                        resultSet.getInt(1),
                        resultSet.getString(2));

                cvWebArrayList.add(container);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvWebArrayList;
    }

    public ArrayList<Container> getViTri() {
        ArrayList<Container> cvWebArrayList = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select * from vitri";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Container container = new Container(
                        resultSet.getInt(1),
                        resultSet.getString(2));

                cvWebArrayList.add(container);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvWebArrayList;
    }

    public ArrayList<Container> getOptionDonVi() {
        ArrayList<Container> cvWebArrayList = new ArrayList<>();
        try {
            Statement statement = connection.createStatement();
            String sql = "select * from donvi";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                Container container = new Container(
                        resultSet.getInt(1),
                        resultSet.getString(2));

                cvWebArrayList.add(container);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cvWebArrayList;
    }

    public boolean createDonVi(String donvi) {
        try {
            Statement statement = connection.createStatement();

            String sql = "insert into donvi (donvi.name) values ('" + donvi + "')";
            statement.executeUpdate(sql);


        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public boolean createCV(CV cv) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            String strDate = formatter.format(new Date());

            Statement statement = connection.createStatement();
            String sql = "insert into cv (name, idDiaDiem, soDT, idNguoiThayDoi, ngayTao,idDonViUp)" +
                    " values ('" + cv.getName() + "'," +
                    cv.getDiaDiem() + "," +
                    "'" + cv.getSoDT() + "'," +
                    cv.getIdNguoiThayDoi() + "," +
                    "'" + strDate + "'," +
                    cv.getDonViUp() + ")";
            statement.executeUpdate(sql);

            // set id -> new CV
            cv.setId(getIdByphoneNumber(cv.getSoDT()));

            for (int i = 0; i < cv.getViTri().size(); i++) {
                String addVitri = "insert into cv_vitri (cv_vitri.idcv, cv_vitri.idVitri) \n" +
                        "values (" + cv.getId() + "," + cv.getViTri().get(i) + ")";
                statement.executeUpdate(addVitri);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public static boolean updateCV(CV cv) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            String strDate = formatter.format(new Date());

            Statement statement = connection.createStatement();
            String sql = "update cv " +
                    " set name ='" + cv.getName() + "',\n" +
                    " idDiaDiem = " + cv.getDiaDiem() + ",\n" +
                    " soDT ='" + cv.getSoDT() + "',\n" +
                    " idNguoiThayDoi= " + cv.getIdNguoiThayDoi() + " ,\n" +
                    " ngayTao='" + strDate + "',\n" +
                    " idDonViUp=" + cv.getDonViUp() + "\n" +
                    " where cv.id = " + cv.getId();
            statement.executeUpdate(sql);

            // delete old relationship cv_vitri
            for (int i = 0; i < cv.getViTri().size(); i++) {
                String delete = "delete from cv_vitri where idcv = " + cv.getId();
                statement.executeUpdate(delete);
            }

            // create new relationship cv_vitri
            for (int i = 0; i < cv.getViTri().size(); i++) {
                String addVitri = "insert into cv_vitri (cv_vitri.idcv, cv_vitri.idVitri) \n" +
                        "values (" + cv.getId() + "," + cv.getViTri().get(i) + ")";
                statement.executeUpdate(addVitri);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    // get id By phoneNumber
    public int getIdByphoneNumber(String soDT) {
        int id = 0;
        try {
            Statement statement = connection.createStatement();
            String sql = "select cv.id from cv where cv.soDT = '" + soDT + "'";
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
                id = resultSet.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return id;
    }

    public boolean checkPhonenumberExist(String soDT) {
        try {
            Statement statement = connection.createStatement();
            String sql = "select soDT from cv where soDT = '" + soDT + "'";
            ResultSet resultSet = statement.executeQuery(sql);

            if (!resultSet.next()) {
                return false;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return true;
    }
}