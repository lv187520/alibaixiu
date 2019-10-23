$("#modPass").on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        url:'/users/password',
        type:'put',
        data:formdata,
        success:function(res){
            location.href='login.html'
        }
    })
    return false;
})