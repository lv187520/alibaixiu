$.ajax({
    url: '/posts',
    type: 'get',
    success: function (res) {
        var html = template('aticlelist', res);
        $("#aticlebody").html(html);
        var page = template('pagelist', res);
        $("#page-list").html(page);
    }
})

function changePage(page) {
    $.ajax({
        url: '/posts',
        type: 'get',
        data: {
            page: page
        },
        success: function (res) {
            var html = template('aticlelist', res);
            $("#aticlebody").html(html);
            var page = template('pagelist', res);
            $("#page-list").html(page);
        }
    })
}
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (res) {
        var html = template('catelist', {
            data: res
        });
        $("#cate").html(html);
    }
})
$("#shaixuan").on('submit', function () {
    var formdata = $(this).serialize();
    console.log(formdata);
    
    $.ajax({
        url: '/posts',
        type: 'get',
        data: formdata,
        success: function (res) {
            var html = template('aticlelist', res);
            $("#aticlebody").html(html);
            var page = template('pagelist', res);
            $("#page-list").html(page);
        }
    })
    return false;
})