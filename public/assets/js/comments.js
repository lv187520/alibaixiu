$.ajax({
    url: '/comments',
    type: 'get',
    success: function (res) {
        console.log(res);
        var html = template('commentlist', res);
        $("#combody").html(html);
        $('#page-list').twbsPagination({
            totalPages: res.pages,
            visiblePages: 3,
            onPageClick: function (event, page) {
                changePage(page);
            }
        });
    }
})

function changePage(page) {
    $.ajax({
        url: '/comments',
        type: 'get',
        data: {
            page: page
        },
        success: function (res) {
            var html = template('commentlist', res)
            $("#combody").html(html);
            // var page = template('pagelist', res);
            // $("#page-list").html(page);
        }
    })
}

$("#combody").on('click', '.status', function () {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    })
})
$('#combody').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    if (confirm('Are you sure delete?')) {
        $.ajax({
            url: '/comments/' + id,
            type: 'delete',
            success: function (res) {
                location.reload();
            }
        })
    }
})