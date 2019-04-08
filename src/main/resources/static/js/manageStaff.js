$(document).ready(function () {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getStaffInfo",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            console.log("list CV:" + data);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].viTri);
                var linkCV = data[i].fileCV != null ? "<a href='/getfile?link=" + data[i].fileCV + "' target=\\\"_blank\\\">file CV</a>" : "";
                var able = "<li class='row cvinfo-ele-able' data-toggle=\"modal\" data-target=\"#myModal\">" +
                    " <div class='col-lg-2'>\n" +
                    "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                    "                </div>\n" +
                    "                <div class=\"col-lg-8\">\n" +
                    "                    <div class='name' style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                    data[i].name +
                    "                   </strong></div>\n" +
                    "                    <div class='vitri'>\n" +
                    data[i].viTri +
                    "                    </div>\n" +
                    "                    <div>\n" +
                    data[i].diaDiem +
                    "                    </div>\n" +
                    "                    <div>\n" +
                    data[i].soDT +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                    "<p>Ngày Update: " + data[i].ngayTao +
                    "</p>" +
                    "<p>" + linkCV + "</p> </div>" +
                    "</li>";

                var disAble = "<li class='row'style='background: #d6d6d6'>" +
                    "<div class=\"col-lg-2\">\n " +
                    "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                    "                </div>\n" +
                    "                <div class=\"col-lg-8\">\n" +
                    "                    <div style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                    data[i].name +
                    "                   </strong></div>\n" +
                    "                    <div>\n" +
                    data[i].viTri +
                    "                    </div>\n" +
                    "                    <div>\n" +
                    data[i].diaDiem +
                    "                    </div>\n" +
                    "                    <div>\n" +
                    data[i].soDT +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                    "<p>Ngày Update: " + data[i].ngayTao +
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
                    $("#select-diadiem").append(new Option(data[i].name, data[i].id));
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
                for (var i = 0; i < data.length; i++) {
                    $("#select-donvi").append(new Option(data[i].name, data[i].id));
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
                    var linkCV = data[i].fileCV != null ? "<a href='/getfile?link=" + data[i].fileCV + "' target=\\\"_blank\\\">file CV</a>" : "";
                    var able = "<li class='row cvinfo-ele-able'>" +
                        " <div class='col-lg-2'>\n" +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div class='name' style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p>Ngày Update: " + data[i].ngayTao +
                        "</p>" +
                        "<p>" + linkCV + "</p> </div>" +
                        "</li>";

                    var disAble = "<li class='row'style='background: #d6d6d6'>" +
                        "<div class=\"col-lg-2\">\n " +
                        "                    <img src=\"images/avata.png\" style=\"height: 110px;margin: 10px;border: 1px solid\">\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-8\">\n" +
                        "                    <div style=\"font-size: 28px;margin-top: 10px\">\n <strong>" +
                        data[i].name +
                        "                   </strong></div>\n" +
                        "                    <div>\n" +
                        data[i].viTri +
                        "                    </div>\n" +
                        "                    <div>\n" +
                        data[i].diaDiem +
                        "                    </div>\n" +
                        "                    <div>\n" +
                        data[i].soDT +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-lg-2\" style='color: #929292'>\n" +
                        "<p>Ngày Update: " + data[i].ngayTao +
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

    $("#cv-list").on("click", ".cvinfo-ele-able", function (event) {
        $(".modal-title").html("<b>"+$(this).find('.col-lg-8').find('.name').text()+"</b>");
        $("#hoten").val($(this).find('.col-lg-8').find('.name').text());
        // $("#vitri").val($(this).find('.col-lg-8').find('.vitri').text());
        console.log($(this).find('.col-lg-8').find('.name').text());
        var a = [
            {
                "id":1,
                "name":"ruby"
            },
            {
                "id":2,
                "name":"php"
            },
            {
                "id":3,
                "name":"sql"
            },
            {
                "id":4,
                "name":"C++"
            }
        ];
        var b =[3,4];
        // for (var i = 0; i < a.length; i++) {
        //     $("#vitri").append(new Option(a[i].name, a[i].id));
        // }
        $('#vitri').multiselect({
            nonSelectedText: 'Chọn vị trí',
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: '100%'
        });
        // $("#vitri option:selected").push(b);
        // console.log($('#vitri').options.length);
        // $.each(b, function(i,e){
        //     if (b.indexOf( $('#vitri').options[i].value) >= 0) {
        //         $('#vitri').options[i].selected = true;
        //     }
        // })
        var values = "Test,Prof,Off";
        var splitValues = values.split(',');
        var multi = document.getElementById('vitri');
        console.log(multi.options[0].value);
        multi.value = null; // Reset pre-selected options (just in case)
        var multiLen = multi.options.length;
        // for (var i = 0; i < multiLen; i++) {
        //     if (splitValues.indexOf(multi.options[i].value) >= 0) {
        //         multi.options[i].selected = true;
        //     }
        // }
        for (var i = 0; i < multiLen; i++) {
            for(var j=0; j<splitValues.length;j++){
                if(multi.options[i].value==splitValues[j]){
                    multi.options[i].selected = true;
                }
            }
        }
    });


});