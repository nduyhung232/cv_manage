$(document).ready(function () {
    if (localStorage.getItem('status') == 1) {
        $("#ul-nav").append("<li class=\"nav-item\">\n" +
            "                        <a class=\"nav-link active\" href=\"AddAccount.html\">\n" +
            "                            Thêm account\n" +
            "                        </a>\n" +
            "                    </li>")
    }

    $("#signout").click(function () {
        localStorage.clear();
        window.location.href = '/Login.html';
    })
});