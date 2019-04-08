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
        var hoten = $("#edit-hoten").val();

        var vitri = [];
        for (var i = 0; i < $("#select-vitri option:selected").length; i++) {
            vitri.push($("#select-vitri option:selected").get(i).value);
        }

        var soDT = $("#edit-soDT").val();
        var diadiem = $("#select-diadiem").val();
        var donviup = localStorage.getItem('iddonvi');
        var nguoiThayDoi = localStorage.getItem('id');

        if (hoten == "" ) {
            $.toaster('Họ tên không được để trống', 'thông báo', 'warning');
        }
        else if(soDT==""){
            $.toaster('Số điện thoại không được để trống', 'thông báo', 'warning');
        }
        else if($("#select-vitri option:selected").length<=0){
            $.toaster('Vị trí không được để trống', 'thông báo', 'warning');
        }
        else {
             $.ajax({
                url: '/createCV',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: hoten,
                    vitri: vitri,
                    soDT: soDT,
                    diaDiem: diadiem,
                    donViUp: donviup,
                    idNguoiThayDoi: nguoiThayDoi

                }),

                success: function (data) {
                    // Get form
                    $.toaster('Tạo thành công 1 CV', 'thông báo', 'success');
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

                        },
                        error: function (data) {
                            $.toaster({ message : 'Có lỗi xảy ra: khi upload CV', title : 'Thất bại', priority : 'danger' });

                        }
                    })
                },
                error: function (data) {
                    $.toaster({ message : 'Có lỗi xảy ra:'+data.responseText, title : 'Thất bại', priority : 'danger' });
                }
            })
        }


        });


});
