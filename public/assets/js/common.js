$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出么？');
    if (isConfirm) {
        $.ajax({
            url: '/logout',
            type: 'post',
            success: function () {
                location.href = 'login.html';
            },
            error: function () {
                alert('退出失败');
            }
        })
    }
})