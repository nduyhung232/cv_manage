$(document).ready(function () {
    var ListPos = [];
    var Pos = {};
    var ListDonVi=[];
    var DonVi={};
    function getList() {
        $("#listPosition").empty();
        $.ajax({
            url: '/getPosition',
            dataType: 'json',
            type: 'GET',
            cache: false,
            contentType: 'application/json',

            success: function (data) {
                ListPos = data;
                for (var i = 0; i < data.length; i++) {
                    var listData;
                        listData = " <tr id='positon'  data-toggle=\"modal\" data-target=\"#myModal\">\n" +
                            "                            <td id='posID' style='display:none;'>" + data[i].id + "</td>\n" +
                            "                            <td>" + data[i].name + "</td>\n" +
                            "                        </tr>"

                    $("#listPosition").append(listData);
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    }
    function getListDonVi() {
        $("#listDonVi").empty();
        $.ajax({
            url: '/getDonVi',
            dataType: 'json',
            type: 'GET',
            cache: false,
            contentType: 'application/json',

            success: function (data) {
                ListDonVi = data;
                for (var i = 0; i < data.length; i++) {
                    var listData;
                    listData = " <tr id='donvi'  data-toggle=\"modal\" data-target=\"#myModalDV\">\n" +
                        "                            <td id='IDdonvi' style='display:none;'>" + data[i].id + "</td>\n" +
                        "                            <td>" + data[i].name + "</td>\n" +
                        "                        </tr>"

                    $("#listDonVi").append(listData);
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    }
    getList();
    getListDonVi();
    $("#listPosition").on("click", "#positon", function (event) {
        Pos = {};
        Pos.id = $(this).find('#posID').text().trim();
        console.log(ListPos);
        for (var i = 0; i < ListPos.length; i++) {
            if (ListPos[i].id == Pos.id) {
                Pos = ListPos[i];
            }
        }
        console.log(Pos);
        $('#editVitri').val(Pos.name);

    });

    $("#listDonVi").on("click", "#donvi", function (event) {
        DonVi = {};
        DonVi.id = $(this).find('#IDdonvi').text().trim();
        for (var i = 0; i < ListDonVi.length; i++) {
            if (ListDonVi[i].id == DonVi.id) {
                DonVi = ListDonVi[i];
            }
        }
        console.log(DonVi);
        $('#editDonVi').val(DonVi.name);

    });
    $("#addPosition").click(function () {
        var name = $("#vitri").val();

        if (name.trim() == "") {
            $.toaster('Tên vị trí không được để trống', 'Thông báo', 'warning');
        } else {
            $.ajax({
                url: '/createPosition',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: name,

                success: function (data) {
                    console.log(data);
                    if (data == true) {
                        $.toaster('Thêm mới thành công 1 Vị trí', 'Thông báo', 'success');
                        getList();
                    } else {
                        $.toaster({
                            title: 'Thất bại',
                            priority: 'danger'
                        });
                    }
                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra: ' + data, title: 'Thất bại', priority: 'danger'});
                }
            })
        }

    })

    $("#btnEdit").click(function () {
            var name = $("#editVitri").val();
            var id = Pos.id;

            if (name.trim() == "") {
                $.toaster('Tên vị trí không được để trống', 'Thông báo', 'warning');
            } else {
                $.ajax({
                    url: '/updatePosition',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        name: name
                    }),

                    success: function (data) {
                        if (data == true) {
                            $.toaster('Cập nhật thành công 1 Vị trí', 'Thông báo', 'success');
                            getList();
                        } else {
                            $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                        }
                        window.location.href = '#';
                    },
                    error: function (data) {
                        $.toaster({message: 'Có lỗi xảy ra: ' + data, title: 'Thất bại', priority: 'danger'});
                    }
                })
            }
        }
    )

    $("#btnDelete").click(function () {
        var r = confirm("Bạn có chắc chắn muốn xóa vị trí '" + Pos.name + "'");
        if (r == true) {
            $.ajax({
                url: '/deletePosition',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: Pos.id,
                }),

                success: function (data) {
                    if (data == true) {
                        $.toaster('Xóa thành công vị trí ' + Pos.name, 'thông báo', 'success');
                        window.location.href = '#';
                        getList();
                    } else {
                        $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                    }

                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                }
            })
        }
    });

    $("#addDonVi").click(function () {
        var donvi = $("#donvi").val();
        if (donvi.trim() == "") {
            $.toaster('Tên đơn vị không được để trống', 'Thông báo', 'warning');
        } else {
            $.ajax({
                url: '/createDonVi',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: donvi,

                success: function (data) {
                    $.toaster('Thêm mới thành công 1 Đơn Vị', 'thông báo', 'success');
                    window.location.href = '#';
                    getListDonVi();
                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra: ' + data, title: 'Thất bại', priority: 'danger'});
                }
            })
        }

    })
    $("#btnEditDonVi").click(function () {
            var name = $("#editDonVi").val();
            var id = DonVi.id;

            if (name.trim() == "") {
                $.toaster('Tên đơn vị không được để trống', 'Thông báo', 'warning');
            } else {
                $.ajax({
                    url: '/updateDonvi',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        name: name
                    }),

                    success: function (data) {
                        if (data == true) {
                            $.toaster('Cập nhật thành công 1 đơn vị', 'Thông báo', 'success');
                            getListDonVi();
                        } else {
                            $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                        }
                        window.location.href = '#';
                    },
                    error: function (data) {
                        $.toaster({message: 'Có lỗi xảy ra: ' + data, title: 'Thất bại', priority: 'danger'});
                    }
                })
            }
        }
    )

    $("#btnDeleteDonVi").click(function () {
        var r = confirm("Bạn có chắc chắn muốn xóa đơn vị '" + DonVi.name + "'");
        if (r == true) {
            $.ajax({
                url: '/deleteDonvi',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: DonVi.id,
                }),

                success: function (data) {
                    if (data == true) {
                        $.toaster('Xóa thành công đơn vị ' + DonVi.name, 'thông báo', 'success');
                        window.location.href = '#';
                        getListDonVi();
                    } else {
                        $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                    }

                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                }
            })
        }
    });

});
