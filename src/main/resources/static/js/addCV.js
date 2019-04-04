$(document).ready(function () {
    $("#edit-donviup").val(localStorage.getItem('donvi'));

    // get DiaDiem option
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getDiaDiemOp",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                for (var i = 0; i < data.length; i++) {
                    $("#select-diadiem").append(new Option(data[i].name, data[i].id));
                }
            }
        }
    });

    $("#btn-addCV").click(function () {
        var hoten = $("#edit-hoten").val();
        // var vitri = $("#edit-vitri").val();
        var soDT = $("#edit-soDT").val();
        var diadiem = $("#select-diadiem").val();
        var donviup = localStorage.getItem('iddonvi');
        var nguoiThayDoi = localStorage.getItem('id');

        if (hoten == "" || soDT == "") {
            alert("họ tên hoặc số điện thọai trống !!")
        } else {
            $.ajax({
                url: '/createCV',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: hoten,
                    // passWord: vitri,
                    soDT: soDT,
                    diaDiem: diadiem,
                    donViUp: donviup,
                    idNguoiThayDoi: nguoiThayDoi
                }),

                success: function (data) {
                    alert("thành công")
                },
                error: function (data) {
                    alert(data.responseText);
                }
            })
        }
    })
});
