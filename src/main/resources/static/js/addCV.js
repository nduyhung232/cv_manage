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
// get Vitri option
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getViTriOp",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#select-vitri").append(new Option(data[i].name, data[i].id));
            }
            $('#select-vitri').multiselect({
                nonSelectedText: 'Chọn vị trí',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                buttonWidth:'100%'
            });
        }
    });


    $("#btn-addCV").click(function () {
        f().then(function (result) {

            // Get form
            var form = $('#singleUploadForm1')[0];
            var data = new FormData(form);
            console.log(data);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/upload/filecv",
                data: data,

                // prevent jQuery from automatically transforming the data into a query string
                processData: false,
                contentType: false,
                cache: false,
                timeout: 1000000,
                success: function (data) {
                    alert("Thanh Cong");
                },
                error: function (data) {
                    alert(data.responseText);

                }
            })
        });
    })

    async function f() {
        var hoten = $("#edit-hoten").val();
        // var vitri = $("#edit-vitri").val();
        var soDT = $("#edit-soDT").val();
        var diadiem = $("#select-diadiem").val();
        var donviup = localStorage.getItem('iddonvi');
        var nguoiThayDoi = localStorage.getItem('id');

        if (hoten == "" || soDT == "") {
            alert("họ tên hoặc số điện thọai trống !!")
        } else {
            await $.ajax({
                url: '/createCV',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: hoten,
                    // vitri: vitri,
                    soDT: soDT,
                    diaDiem: diadiem,
                    donViUp: donviup,
                    idNguoiThayDoi: nguoiThayDoi
                }),

                success: function (data) {

                },
                error: function (data) {
                    alert(data.responseText);
                }
            })
        }
    }
});
