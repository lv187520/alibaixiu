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