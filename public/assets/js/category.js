$(function () {
    $("#addcategory").on('submit', function () {
        var formdata = $(this).serialize();
        $.ajax({
            url: '/categories',
            type: 'post',
            data: formdata,
            success: function (res) {
                location.reload();
            }
        })
        return false;
    })
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (res) {
            var html = template('catelist', {
                data: res
            })
            $("#catebody").html(html);
        }
    })
    $('#catebody').on('click', '#editcate', function () {
        var id = $(this).attr('data-id');

        $.ajax({
            url: '/categories/' + id,
            type: 'get',
            success: function (res) {
                //res是一个类别对象
                var html = template('editca', res);
                $("#editcategory").html(html);
            }
        })
    })
    $('#catebody').on('click', '#delcate', function () {
        var id = $(this).attr('data-id');
        var isConfirm = confirm('您真的要删除么？');
        if (isConfirm) {
            $.ajax({
                url: '/categories/' + id,
                type: 'delete',
                success: function (res) {
                    location.reload();
                }
            })
        }
    })
    $("#editcategory").on('submit', '#editcatesub', function () {
        var data = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/categories/' + id,
            type: 'put',
            data: data,
            success: function (res) {
                location.reload();
            }
        })
        return false;
    })

    $('#all').on('click', function () {
        $('#catebody input').prop('checked', $(this).prop('checked'));
        if ($('#all').prop('checked')) {
            $('#delbtn').css('display', 'inline-block');
        } else {
            $('#delbtn').css('display', 'none');
        }
    })
    $('#catebody').on('click', 'input', function () {
        $('#all').prop('checked', $("#catebody input").length == $('#catebody input:checked').length);
        if ($('#catebody input:checked').length) {
            $('#delbtn').css('display', 'inline-block');
        } else {
            $('#delbtn').css('display', 'none');
        }
    })
    $('#delbtn').on('click', function () {
        //value是一个DOM对象
        var params = [];
        $('#catebody input:checked').each(function (index, value) {
            params.push($(value).attr('data-id'));
        })
        
        if(params){
            params=params.join('-');
            // params=params.substr(0,params.length-1);
        }
        var isConfirm = confirm('您真的要删除么？');
        if(isConfirm){
            $.ajax({
                type:'delete',
                url:'/categories/'+params,
                success:function(res){
                    location.reload();
                }
            })
        }
    })
})