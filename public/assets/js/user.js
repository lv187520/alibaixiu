$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        url: '/users',
        type: 'post',
        data: formData,
        success: function (res) {
            // console.log(res);
            location.reload();
        },
        error: function (res) {
            console.log(res);
            alert('添加失败')
        }
    })
    return false;
})

$("#modifyBox").on('change', '#avatar', function () {
    //formdata在ajax第二天
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);

            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function () {
            alert('图片上传失败')
        }
    })
})

$.ajax({
    url: '/users',
    type: 'get',
    success: function (res) {
        var html = template('userTpl', {
            data: res
        });
        $('#userBox').html(html);
    }
})

$("#userBox").on('click', '.edit', function () {
    var id = $(this).attr('data-id');

    $.ajax({
        url: '/users/' + id,
        type: 'get',
        success: function (res) {
            // console.log(res);
            var html = template('modifyUserTpl', res);
            $("#modifyBox").html(html);
        }
    })
})
$("#userBox").on('click', '.delUser', function () {
    var id = $(this).attr('data-id');
    var isConfirm = confirm('您真的要删除么？');
    if (isConfirm) {
        $.ajax({
            url: '/users/' + id,
            type: 'delete',
            success: function (res) {
                // console.log(res);
                location.reload();
            }
        })
    }
})

$('#modifyBox').on('submit', '#modifyUser', function () {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        url: '/users/' + id,
        type: 'put',
        data: formData,
        success: function (res) {
            location.reload();
        }
    })

    return false;
})

$('#all').on('click', function () {
    $('#userBox input').prop('checked', $(this).prop('checked'));
    if ($('#all').prop('checked')) {
        $('#delbtn').css('display', 'inline-block');
    } else {
        $('#delbtn').css('display', 'none');
    }
})
$('#userBox').on('click', 'input', function () {
    if ($("#userBox input").length == $('#userBox input:checked').length) {
        $('#all').prop('checked', true);
    } else {
        $('#all').prop('checked', false);
    }
    if ($('#userBox input:checked').length) {
        $('#delbtn').css('display', 'inline-block');
    } else {
        $('#delbtn').css('display', 'none');
    }
})
$('#delbtn').on('click', function () {
    //value是一个DOM对象
    var params = '';
    $('#userBox input:checked').each(function (index, value) {
        params += $(value).attr('data-id')+'-';
        // console.log($(value).attr('data-id'));
    })
    
    if(params){
        params=params.substr(0,params.length-1);
    }
    var isConfirm = confirm('您真的要删除么？');
    if(isConfirm){
        $.ajax({
            type:'delete',
            url:'/users/'+params,
            success:function(res){
                location.reload();
            }
        })
    }
})