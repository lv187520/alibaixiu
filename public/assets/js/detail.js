var aticleId=getParamsUrl('id');

// 向服务器端发送请求 根据文章id获取文章详细信息
$.ajax({
	type: 'get',
	url: '/posts/' + aticleId,
	success: function (response) {
		console.log(response);
		
		var html = template('postTpl', response);
		$('#article').html(html)
	}
})