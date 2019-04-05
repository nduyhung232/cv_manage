package com.example.demo.controller.object;

import java.util.ArrayList;

public class Search {
    private String hoten;
    private ArrayList<Integer> idViTri;
    private int idDiaDiem;
    private int idDonVi;

    public Search(String hoten, int idDiaDiem, int idDonVi) {
        this.hoten = hoten;
        this.idDiaDiem = idDiaDiem;
        this.idDonVi = idDonVi;
    }

    public Search() {
    }

    public String getHoten() {
        return hoten;
    }

    public void setHoten(String hoten) {
        this.hoten = hoten;
    }

    public ArrayList<Integer> getIdViTri() {
        return idViTri;
    }

    public void setIdViTri(ArrayList<Integer> idViTri) {
        this.idViTri = idViTri;
    }

    public int getIdDiaDiem() {
        return idDiaDiem;
    }

    public void setIdDiaDiem(int idDiaDiem) {
        this.idDiaDiem = idDiaDiem;
    }

    public int getIdDonVi() {
        return idDonVi;
    }

    public void setIdDonVi(int idDonVi) {
        this.idDonVi = idDonVi;
    }

    @Override
    public String toString() {
        return "Search{" +
                "hoten='" + hoten + '\'' +
                ", idViTri=" + idViTri +
                ", idDiaDiem=" + idDiaDiem +
                ", idDonVi=" + idDonVi +
                '}';
    }
}
