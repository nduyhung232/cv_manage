$(document).ready(function () {

    $("#password").on('keypress', function (e) {
        if (e.which == 13) {

            var user = $("#username").val();
            var pass = $("#password").val();
            console.log(user)
            console.log(pass)

            $.ajax({
                url: '/login',
                dataType: 'json',
                type: 'POST',
                cache: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    userName: user,
                    passWord: pass
                }),

                success: function (data) {
                    console.log(data)

                    if (data.userName == null) {
                        $("#mess-error").text("Sai thông tin đăng nhập")
                    } else {
                        localStorage.setItem('id', data.id);
                        localStorage.setItem('user', data.userName);
                        localStorage.setItem('iddonvi', data.idDonVi);
                        localStorage.setItem('donvi', data.donVi);
                        localStorage.setItem('status', data.status);
                        window.location.href = '/Manage.html';
                    }
                },
                error: function (data) {
                    alert(data)
                }
            });
        }
    })

    $("#btn-login").click(function () {
        var user = $("#username").val();
        var pass = $("#password").val();
        console.log(user)
        console.log(pass)

        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: 'application/json',
            data: JSON.stringify({
                userName: user,
                passWord: pass
            }),

            success: function (data) {
                alert(data.donVi)

                if (data.userName == null) {
                    $("#mess-error").text("Sai thông tin đăng nhập")
                } else {
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('user', data.userName);
                    localStorage.setItem('iddonvi', data.idDonVi);
                    localStorage.setItem('donvi', data.donVi);
                    localStorage.setItem('status', data.status);
                    window.location.href = '/Manage.html';
                }
            },
            error: function (data) {
                alert(data)
            }
        })
    });

});

