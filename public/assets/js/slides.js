$("#image").on('change', function () {
    var formdata = new FormData();
    formdata.append('image', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#luji').val(res[0].image);
            $(".thumbnail").attr('src', res[0].image).show();
        }
    })
})
$("#addslides").on('submit', function () {
    var formdata = $(this).serialize();

    $.ajax({
        url: "/slides",
        type: 'post',
        data: formdata,
        success: function (res) {
            location.reload();
        }
    })
    return false;
})
$.ajax({
    url: '/slides',
    type: 'get',
    success: function (res) {
        // console.log(res);
        var html = template('slideslist', {
            data: res
        })
        $('#slides-list').html(html);
    }
})

$('#slides-list').on('click','.delsli',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        url:'/slides/'+id,
        type:'delete',
        success:function(res){
            location.reload();
        }
    })
})