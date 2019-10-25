$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
        var html=template('catelist',{data:res});
        $('#category').html(html);
    }
})

$("#feature").on('change',function(){
    var formdata=new FormData();
    formdata.append('cover',this.files[0]);
    $.ajax({
        url:'/upload',
        type:'post',
        data:formdata,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success:function(res){
            $("#pic").attr('src',res[0].cover).show();
            $("#pic").val(res[0].cover);
        }
    })
})

$("#addaticle").on('submit',function(){
    var formdata=$(this).serialize();
    console.log(formdata);
    
    $.ajax({
        url:'/posts',
        type:'post',
        data:formdata,
        success:function(res){
            console.log(res);
            
            location.href='/admin/posts.html';
        }
    })
    return false;
})