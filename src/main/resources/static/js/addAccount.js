$(document).ready(function () {
    var ListAcc = [];
    var Acc = {};

    function getDonVi() {
        $("#select-donvi").empty();
        $.ajax({
            url: '/getDonVi',
            dataType: 'json',
            type: 'GET',
            cache: false,
            contentType: 'application/json',

            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#select-donvi").append(new Option(data[i].name, data[i].id));
                    $("#donvi").append(new Option(data[i].name, data[i].id));
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    }

    getDonVi()

    function getList() {
        $("#listAccount").empty();
        $.ajax({
            url: '/getAllAccount',
            dataType: 'json',
            type: 'GET',
            cache: false,
            contentType: 'application/json',

            success: function (data) {
                ListAcc = data;
                for (var i = 0; i < data.length; i++) {
                    var listData;
                    if (data[i].status == 1) {
                        listData = " <tr id='account' data-toggle=\"modal\" data-target=\"#myModal\">\n" +
                            "                            <td id='accountID' style='display:none;'>" + data[i].id + "</td>\n" +
                            "                            <td>" + data[i].userName + "</td>\n" +
                            "                            <td>" + data[i].name + "</td>\n" +
                            "                            <td>" + data[i].phoneNumber + "</td>\n" +
                            "                            <td>" + data[i].donVi + "</td>\n" +
                            "                            <td>Admin</td>\n" +
                            "                        </tr>"
                    } else {
                        listData = " <tr id='account' data-toggle=\"modal\" data-target=\"#myModal\">\n" +
                            "                            <td id='accountID' style='display:none;'>" + data[i].id + "</td>\n" +
                            "                            <td>" + data[i].userName + "</td>\n" +
                            "                            <td>" + data[i].name + "</td>\n" +
                            "                            <td>" + data[i].phoneNumber + "</td>\n" +
                            "                            <td>" + data[i].donVi + "</td>\n" +
                            "                            <td>User</td>\n" +
                            "                        </tr>"
                    }

                    $("#listAccount").append(listData);
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    }

    getList();
    $("#listAccount").on("click", "#account", function (event) {
        Acc = {};
        Acc.id = $(this).find('#accountID').text().trim()
        console.log(Acc.id);
        for (var i = 0; i < ListAcc.length; i++) {
            if (ListAcc[i].id == Acc.id) {
                Acc = ListAcc[i];
            }
        }
        $('#hoten').val(Acc.name);
        $('#sodt').val(Acc.phoneNumber);
        $('#quyen').val(Acc.status);
        console.log(Acc.status);
        $('.modal-title').html("Cập nhật thông tin User: " + "'" + Acc.userName + "'");

    });


    $("#btn-addAccount").click(function () {
        var userName = $("#edit-username").val();
        var pass = $("#edit-pass").val();
        var hoten = $("#edit-hoten").val();
        var donvi = $("#select-donvi").val();
        var soDT = $("#edit-soDT").val();
        var status = $("#select-status").val();

        if (status == "admin")
            status = 1
        else
            status = 0
        if (userName == "") {
            $.toaster('Username không được để trống', 'Thông báo', 'warning');
        } else if (pass == "") {
            $.toaster('Mật khẩu không được để trống', 'Thông báo', 'warning');
        } else if (hoten == "") {
            $.toaster('Họ tên không được để trống', 'Thông báo', 'warning');
        } else if (donvi == "") {
            $.toaster('Đơn vị không được để trống', 'Thông báo', 'warning');
        } else if (soDT == "" ){
            $.toaster('Số điện thoại không được để trống', 'Thông báo', 'warning');
        } else if (status == "") {
            $.toaster('Quyền không được để trống', 'Thông báo', 'warning');
        } else {
            console.log(donvi);
            $.ajax({
                url: '/addAccount',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    userName: userName,
                    passWord: pass,
                    name: hoten,
                    phoneNumber: soDT,
                    idDonVi: donvi,
                    status: status
                }),

                success: function (data) {
                    console.log(data);
                    if (data == true) {
                        $.toaster('Thêm mới thành công 1 Account', 'Thông báo', 'success');
                        getList();
                    } else {
                        $.toaster({
                            message: 'Có lỗi xảy ra: UserName có thể đã tồn tại',
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


    $("#editAccount").click(function () {
            var name = $("#hoten").val();
            var phoneNumber = $("#sodt").val();
            var idDonVi = $("#donvi").val();
            var status = $("#quyen").val();
            var id = Acc.id;
            console.log(name + " " + phoneNumber + " " + idDonVi + " " + status + " " + id)

            if (name == "") {
                $.toaster('Họ tên không được để trống', 'Thông báo', 'warning');
            } else if (idDonVi == "") {
                $.toaster('Đơn vị không được để trống', 'Thông báo', 'warning');
            } else if (phoneNumber == "") {
                $.toaster('Số điện thoại không được để trống', 'Thông báo', 'warning');
            } else if (status == "") {
                $.toaster('Quyền không được để trống', 'Thông báo', 'warning');
            } else {
                $.ajax({
                    url: '/updateAccount',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        name: name,
                        phoneNumber: phoneNumber,
                        idDonVi: idDonVi,
                        status: status
                    }),

                    success: function (data) {
                        if (data == true) {
                            $.toaster('Cập nhật thành công 1 Account', 'thông báo', 'success');
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

    $("#changePass").click(function () {
        var newPass = $("#newpass").val();
        var rePass = $("#renew").val();
        console.log(newPass + " " + rePass);
        if (newPass == "") {
            $.toaster('Bạn chưa nhập mật khẩu', 'Thông báo', 'warning');
        } else if (rePass == "") {
            $.toaster('Bạn chưa nhập lại mật khẩu', 'Thông báo', 'warning');
        } else if (newPass != rePass) {
            $.toaster('Mật khẩu nhập lại không khớp', 'Thông báo', 'warning');
        } else {
            $.ajax({
                url: '/changePass',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: Acc.id,
                    passWord: newPass
                }),

                success: function (data) {
                    if (data == true) {
                        $.toaster('Đổi mật khẩu thành công cho tài khoản ' + Acc.userName, 'thông báo', 'success');
                        window.location.href = '#';
                    } else {
                        $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                    }

                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra: ', title: 'Thất bại', priority: 'danger'});
                }
            })
        }

    })

    $("#deleteAccount").click(function () {
        var r = confirm("Bạn có chắc chắn muốn xóa tài khoản '" + Acc.userName + "'");
        if (r == true) {
            $.ajax({
                url: '/deleteAccount',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: Acc.id,
                }),

                success: function (data) {
                    if (data == true) {
                        $.toaster('Xóa thành công tài khoản ' + Acc.userName, 'thông báo', 'success');
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
    })
});
