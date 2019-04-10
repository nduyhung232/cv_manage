$(document).ready(function () {
    $.ajax({
        url: '/getDonVi',
        dataType: 'json',
        type: 'GET',
        cache: false,
        contentType: 'application/json',

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#select-donvi").append(new Option(data[i].name, data[i].id));
            }
        },
        error: function (data) {
            alert(data)
        }
    })

    function getList() {
        $("#listAccount").empty();
        $.ajax({
            url: '/getAllAccount',
            dataType: 'json',
            type: 'GET',
            cache: false,
            contentType: 'application/json',

            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var listData;
                    if (data[i].status ==1) {
                        listData = " <tr>\n" +
                            "                            <td>"+data[i].userName+"</td>\n" +
                            "                            <td>"+data[i].name+"</td>\n" +
                            "                            <td>"+data[i].phoneNumber+"</td>\n" +
                            "                            <td>"+data[i].donVi+"</td>\n" +
                            "                            <td>Admin</td>\n" +
                            "                        </tr>"
                    }
                   else {
                        listData = " <tr>\n" +
                            "                            <td>"+data[i].userName+"</td>\n" +
                            "                            <td>"+data[i].name+"</td>\n" +
                            "                            <td>"+data[i].phoneNumber+"</td>\n" +
                            "                            <td>"+data[i].donVi+"</td>\n" +
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
                alert("thanh cong")
            },
            error: function (data) {
                alert(data)
            }
        })
    })

    $("#btn-addDonVi").click(function () {
        var editDonVi = $("#edit-addDonVi").val();
        $.ajax({
            url: '/createDonVi',
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: 'application/json',
            data: editDonVi,

            success: function (data) {
                alert("Thêm đơn vị thành công");
                window.location.href = '#';
            },
            error: function (data) {
                alert(data)
            }
        })
    })
});
