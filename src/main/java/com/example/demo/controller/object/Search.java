package com.example.demo.controller.object;

import java.util.ArrayList;

public class Search {
    private String hoten;
    private ArrayList<Integer> idViTri;
    private ArrayList<Integer> idDiaDiem;
    private ArrayList<Integer> idDonVi;

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

    public ArrayList<Integer> getIdDiaDiem() {
        return idDiaDiem;
    }

    public void setIdDiaDiem(ArrayList<Integer> idDiaDiem) {
        this.idDiaDiem = idDiaDiem;
    }

    public ArrayList<Integer> getIdDonVi() {
        return idDonVi;
    }

    public void setIdDonVi(ArrayList<Integer> idDonVi) {
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
