$("#logo").on('change', function () {
    var formdata = new FormData();
    formdata.append('logo', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (res) {
            $("#image").attr('src', res[0].logo);
            $("#imlogo").val(res[0].logo);
        }
    })
})

function serializeObject(obj) {
    var result = {};
    var params = obj.serializeArray();
    // var res='';
    $.each(params, function (index, value) {
        result[value.name] = value.value;
    })
    if (result.comment) {
        result.comment = 'true';
    }else{
        result.comment = 'false';
    }
    if (result.review) {
        result.review = 'true';
    }else{
        result.review = 'false';
    }
    //遍历对象时i为对象中的key值，n为对象中的value
    // $.each(result,function(i,n){
    //     res+=i+'='+n+'&';
    // })
    // res=res.substr(0,res.length-1);
    // 将处理的结果返回到函数外部
    return result;
}
$("#setting").on('submit', function () {
    var formdata = serializeObject($(this));
    console.log(formdata);

    $.ajax({
        type: 'post',
        url: '/settings',
        
        data: formdata,
        success: function (res) {
            console.log(res);
        }
    })
    return false;
})
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        // console.log(response);

        if (response) {
            // 将logo地址存储在隐藏域中
            $('#imlogo').val(response.logo)
            // 将logo显示在页面中 
            $('#image').attr('src', response.logo)
            // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // 将是否开启评论功能显示在页面中


            $('input[name="comment"]').prop('checked', response.comment)
            // 将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', response.review);
        }
    }
})