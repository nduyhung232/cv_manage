package com.example.demo.model;

import java.util.ArrayList;

public class CV {
    private int id;
    private String name;
    private String ngayTao;
    private String soDT;
    private String fileCV;
    private String diaDiem;
    private String donViUp;
    private int idNguoiThayDoi;
    private ArrayList<String> viTri = new ArrayList<>();

    public CV() {
    }

    public CV(String name, String ngayTao, String soDT, String fileCV, String diaDiem, String donViUp, int id, int idNguoiThayDoi) {
        this.name = name;
        this.ngayTao = ngayTao;
        this.soDT = soDT;
        this.fileCV = fileCV;
        this.diaDiem = diaDiem;
        this.donViUp = donViUp;
        this.id = id;
        this.idNguoiThayDoi = idNguoiThayDoi;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdNguoiThayDoi() {
        return idNguoiThayDoi;
    }

    public void setIdNguoiThayDoi(int idNguoiThayDoi) {
        this.idNguoiThayDoi = idNguoiThayDoi;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiaDiem() {
        return diaDiem;
    }

    public void setDiaDiem(String diaDiem) {
        this.diaDiem = diaDiem;
    }

    public String getDonViUp() {
        return donViUp;
    }

    public void setDonViUp(String donViUp) {
        this.donViUp = donViUp;
    }

    public String getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(String ngayTao) {
        this.ngayTao = ngayTao;
    }

    public String getSoDT() {
        return soDT;
    }

    public void setSoDT(String soDT) {
        this.soDT = soDT;
    }

    public String getFileCV() {
        return fileCV;
    }

    public void setFileCV(String fileCV) {
        this.fileCV = fileCV;
    }

    public ArrayList<String> getViTri() {
        return viTri;
    }

    public void setViTri(ArrayList<String> viTri) {
        this.viTri = viTri;
    }

    @Override
    public String toString() {
        return "CV{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ngayTao='" + ngayTao + '\'' +
                ", soDT='" + soDT + '\'' +
                ", fileCV=" + fileCV +
                ", diaDiem='" + diaDiem + '\'' +
                ", donViUp='" + donViUp + '\'' +
                ", idNguoiThayDoi=" + idNguoiThayDoi +
                ", viTri=" + viTri +
                '}';
    }
}
