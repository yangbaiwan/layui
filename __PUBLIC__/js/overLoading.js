document.getElementById('overLoading').addEventListener('click', function () {
    // alert(1);

    function clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
        }
    };

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    }

    $.ajax({
        url: $('#urlOgin').val(),
        type: 'POST',
        data: {
            adminPhone: getCookie('adminPhone')
        },
        success: function (res) {
            console.log(res);
            if (res == 2000) {
                clearCookie();
                history.go(0);
            }
        }
    });
    // $.post(U('Login/loginSign'), {
    //     adminPhone: getCookie('adminPhone')
    // }, function (res) {
    //     console.log(res);
    // })
})