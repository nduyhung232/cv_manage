$(document).ready(function () {
    var staffInfo = [];
    var ListDiaDiem = [];
    var ListDonVi = [];
    var id = 0;
    var idDiaDiem = 0;
    var idDonVi = 0;
    var CV = {};
    getList();

    function getList() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getStaffInfo",
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function (data) {
                staffInfo = data;
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].viTri);
                    var linkCV = data[i].fileCV != null ? "<b><a style='color: #337ab7' href='/getfile?link=" + data[i].fileCV + "' target=\\\"_blank\\\">Xem CV</a></b>" : "";
                    var able = "<li class='row cvinfo-ele-able' style='border-bottom: 1px solid #878787;' data-toggle=\"modal\" data-target=\"#myModal\">" +
                        " <div class='col-lg-2'>\n" +
                        "<div class='id' style='display: none;'>" + data[i].id + "</div>" +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div class='name' style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div class='vitri'><i class=\"fas fa-calculator\"></i>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-map-marker-alt\"></i>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-phone\"></i>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p><i class=\"fas fa-calendar-alt\"></i> Ngày Update: " + data[i].ngayTao +
                        "</p>" +
                        "<p>" + linkCV + "</p> </div>" +
                        "</li>";

                    var disAble = "<li class='row'style='background: #d6d6d6;border-bottom: 1px solid #878787;'>" +
                        "<div class=\"col-lg-2\">\n " +
                        "<div class='id' style='display: none;'>" + data[i].id + "</div>" +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div><i class=\"fas fa-calculator\"></i>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-map-marker-alt\"></i>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-phone\"></i>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p><i class=\"fas fa-calendar-alt\"></i> Ngày Update: " + data[i].ngayTao +
                        "</p>" +
                        "<p>" + linkCV + "</p> </div>" +
                        "</li>";

                    if (data[i].idNguoiThayDoi == localStorage.getItem('id')) {
                        $("#cv-list").append(able);
                    } else {
                        $("#cv-list").append(disAble);
                    }
                }
            }
        });
    }

// get DiaDiem option
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getDiaDiemOp",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            ListDiaDiem = data;
            for (var i = 0; i < data.length; i++) {
                $("#select-diadiem").append(new Option(data[i].name, data[i].id));
                $("#diadiem").append(new Option(data[i].name, data[i].id));
            }
            $('#select-diadiem').multiselect({
                nonSelectedText: 'Chọn địa điểm',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                buttonWidth: '100%'
            });

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
                buttonWidth: '100%'
            });
        }
    });

// get DonVi option
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getDonViOp",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            ListDonVi = data;
            for (var i = 0; i < data.length; i++) {
                $("#select-donvi").append(new Option(data[i].name, data[i].id));
                $("#donvi").append(new Option(data[i].name, data[i].id));
            }
            $('#select-donvi').multiselect({
                nonSelectedText: 'Chọn đơn vị',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                buttonWidth: '100%'
            });
        }
    });

    $("#btn-search").click(function () {
        var data = {};

        var editHoTen = $("#edit-hoten").val();

        var donvi = [];
        for (var i = 0; i < $("#select-donvi option:selected").length; i++) {
            donvi.push($("#select-donvi option:selected").get(i).value);
        }

        var diadiem = [];
        for (var i = 0; i < $("#select-diadiem option:selected").length; i++) {
            diadiem.push($("#select-diadiem option:selected").get(i).value);
        }

        var selectViTri = [];
        for (var i = 0; i < $("#select-vitri option:selected").length; i++) {
            selectViTri.push($("#select-vitri option:selected").get(i).value);
        }

        data['hoten'] = editHoTen;
        data['idDiaDiem'] = diadiem;
        data['idDonVi'] = donvi;
        var vitri = [];
        for (var i = 0; i < selectViTri.length; i++) {
            vitri.push(selectViTri[i]);
        }
        data['idViTri'] = vitri;

        console.log("vitri: " + selectViTri);
        console.log(data)

        $.ajax({
            url: '/search',
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: 'application/json',
            data: JSON.stringify(data),

            success: function (data) {
                console.log(data)
                $("#cv-list").empty();
                for (var i = 0; i < data.length; i++) {
                    var linkCV = data[i].fileCV != null ? "<b><a style='color: #337ab7' href='/getfile?link=" + data[i].fileCV + "' target=\\\"_blank\\\">file CV</a></b>" : "";
                    var able = "<li  style='border-bottom: 1px solid #878787;' class='row cvinfo-ele-able'data-toggle=\"modal\" data-target=\"#myModal\"> " +
                        " <div class='col-lg-2'>\n" +
                        "<div class='id' style='display: none;'>" + data[i].id + "</div>" +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div class='name' style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div class='vitri'><i class=\"fas fa-calculator\"></i>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-map-marker-alt\"></i>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-phone\"></i>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p><i class=\"fas fa-calendar-alt\"></i> Ngày Update: " + data[i].ngayTao +
                        "</p>" +
                        "<p>" + linkCV + "</p> </div>" +
                        "</li>";

                    var disAble = "<li class='row'style='background: #d6d6d6;border-bottom: 1px solid #878787;'>" +
                        "<div class=\"col-lg-2\">\n " +
                        "<div class='id' style='display: none;'>" + data[i].id + "</div>" +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div class='vitri'><i class=\"fas fa-calculator\"></i>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-map-marker-alt\"></i>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div><i class=\"fas fa-phone\"></i>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p><i class=\"fas fa-calendar-alt\"></i> Ngày Update: " + data[i].ngayTao +
                        "</p>" +
                        "<p>" + linkCV + "</p> </div>" +
                        "</li>";

                    if (data[i].idNguoiThayDoi == localStorage.getItem('id')) {
                        $("#cv-list").append(able);
                    } else {
                        $("#cv-list").append(disAble);
                    }
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    })
    var idViTriSelected = [];
    $("#cv-list").on("click", ".cvinfo-ele-able", function (event) {

        $("#singleUploadForm1").empty();
        $("#singleUploadForm1").append(" <input type=\"file\" name=\"file\" class=\"file-input form-control\" required/>")

        id = $(this).find('.col-lg-2').find('.id').text().trim()
        for (var i = 0; i < staffInfo.length; i++) {
            if (staffInfo[i].id == id) {
                CV = staffInfo[i];
            }
        }


        idViTriSelected = [];
        $(".modal-title").html("<b>" + $(this).find('.col-lg-8').find('.name').text().trim() + "</b>");
        $("#hoten").val($(this).find('.col-lg-8').find('.name').text().trim());
        $('#sodt').val(CV.soDT);
        //diadiem
        for (var i = 0; i < ListDiaDiem.length; i++) {
            if (CV.diaDiem == ListDiaDiem[i].name) {
                idDiaDiem = ListDiaDiem[i].id;
            }
        }
        $("#diadiem").val(idDiaDiem);


        //donvi
        for (var i = 0; i < ListDonVi.length; i++) {
            if (CV.donViUp == ListDonVi[i].name) {
                idDonVi = ListDonVi[i].id;
                console.log(idDonVi);
            }
        }
        var localstorage_idDonVi = localStorage.getItem("iddonvi");
        $("#donvi").val(localstorage_idDonVi);
        var vitriSelected = $(this).find('.col-lg-8').find('.vitri').text().split(',')
        for (var i = 0; i < vitriSelected.length; i++) {
            vitriSelected[i] = vitriSelected[i].trim();
        }
        console.log(CV.fileCV);
        //file
        var linkCV = CV.fileCV != null ? "<a class='btn btn-primary' style=\"color: white\" href='/getfile?link=" + CV.fileCV + "' target=\\\"_blank\\\">Xem CV</a>" : "";
        $(".fileCV").empty();
        $(".fileCV").append(linkCV);

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getViTriOp",
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function (data) {
                $("#div-vitri").empty();
                $("#div-vitri").append("<label >Vị trí: </label><select id=\"vitri\" name=\"framework[]\" multiple=\"multiple\" class=\"form-control\" >")

                for (var i = 0; i < data.length; i++) {
                    $("#vitri").append(new Option(data[i].name, data[i].id));
                    for (var j = 0; j < vitriSelected.length; j++) {
                        if (data[i].name == vitriSelected[j]) {
                            $("#vitri").get(0).options[i].selected = true;
                        }
                    }
                }

                $('#vitri').multiselect(
                    {
                        nonSelectedText: 'Chọn vị trí',
                        enableFiltering: true,
                        enableCaseInsensitiveFiltering: true,
                        buttonWidth: '100%'
                    }
                );
            }
        });

        // var values = "Test,Prof,Off";
        // var splitValues = values.split(',');


    });

    $('#editCV').click(function () {
        var Vitri = [];
        for (var i = 0; i < $("#vitri option:selected").length; i++) {
            Vitri.push($("#vitri option:selected").get(i).value);
        }
        var editName = $("#hoten").val();
        var editSDT = $("#sodt").val();
        var editIdDiaDiem = $("#diadiem").val();
        var editIdDonVi = $("#donvi").val();

        console.log("id " + id);
        console.log(Vitri);
        console.log("idDiaDiem " + editIdDiaDiem);
        console.log("idDonVi " + editIdDonVi);
        console.log(editSDT);
        console.log(editName);
        if (editName == "") {
            $.toaster('Họ tên không được để trống', 'thông báo', 'warning');
        } else if (editSDT == "") {
            $.toaster('Số điện thoại không được để trống', 'thông báo', 'warning');
        } else if (editIdDiaDiem == "") {
            $.toaster('Địa điểm không được để trống', 'thông báo', 'warning');
        } else if (editIdDonVi == "") {
            $.toaster('Đơn vị không được để trống', 'thông báo', 'warning');
        } else if (Vitri.length <= 0) {
            $.toaster('Vị trí không được để trống', 'thông báo', 'warning');
        } else {
            $.ajax({
                url: '/updateCV',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id,
                    name: editName,
                    viTri: Vitri,
                    soDT: editSDT,
                    diaDiem: editIdDiaDiem,
                    donViUp: editIdDonVi,
                    idNguoiThayDoi: localStorage.getItem('id')

                }),

                success: function (data) {
                    // Get form


                    $.toaster('Cập nhật thành công 1 CV', 'thông báo', 'success');

                    //uploadfile
                    var form = $('#singleUploadForm1')[0];
                    console.log(form);
                    var data = new FormData(form);
                    console.log(data);
                    var url = "/upload/updateFilecv?id=" + id;
                    $.ajax({
                        type: "POST",
                        enctype: 'multipart/form-data',
                        url: url,
                        data: data,

                        // prevent jQuery from automatically transforming the data into a query string
                        processData: false,
                        contentType: false,
                        cache: false,
                        timeout: 1000000,
                        success: function (data) {
                            $("#cv-list").empty();
                            getList();
                        },
                        error: function (data) {
                            $.toaster({message: 'Có lỗi xảy ra: khi upload CV', title: 'Thất bại', priority: 'danger'});

                        }
                    })
                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra:' + data.responseText, title: 'Thất bại', priority: 'danger'});
                }
            })
        }

    })

    //xoaCV
    $("#deleteCV").click(function () {
        var r = confirm("Bạn có chắc chắn muốn xóa CV '" + CV.name + "'");
        if (r == true) {
            $.ajax({
                url: '/deleteCV',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id,

                }),

                success: function (data) {
                    // Get form

                    $("#cv-list").empty();
                    getList();
                    $.toaster('Xóa thành công 1 CV', 'thông báo', 'success');
                },
                error: function (data) {
                    $.toaster({message: 'Có lỗi xảy ra:' + data.responseText, title: 'Thất bại', priority: 'danger'});
                }
            })
        } else {
            console.log("cancel");
        }
    })
});