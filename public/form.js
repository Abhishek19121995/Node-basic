const baseUrl = 'http://localhost:1234/';

document.addEventListener('click',(e)=>{
	if (e.target.classList.contains('ajax')) {
		var formdata = new FormData(e.target.form);
		var posturl = baseUrl + e.target.form.getAttribute('action');
		 var objectArr = [];
	      formdata.forEach((value, key)=>{
	      	 objectArr[key] = value;
	      });
          var object = Object.assign({},objectArr);
		fetch(posturl,{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method : "post",
			body :JSON.stringify(object)
		}).then((response)=>{
			response.json().then((response)=>{
			  var err = document.getElementsByClassName('errors');
			  for (var i = err.length - 1; i >= 0; i--) {
			  	// console.log(err[i])
			  	err[i].remove();
			  }
              if (response.status=='failure') {
              	 for(var prop in response.errors){
              	 	var div = document.createElement('div');
              	 	div.setAttribute('class','errors');
              	 	div.innerText = response.errors[prop].message;
              	 	div.class = 'errors';
              	 	div.style.color = 'red';
              	 	document.getElementsByName(prop)[0].parentNode.insertBefore(div, document.getElementsByName(prop)[0].nextSibling);
              	 	// console.log(prop,response.errors[prop].message);
              	 }
              }else if (response.status=='success') {
              	// alert('1 Record inserted in database');
              	window.location.href = baseUrl + 'admin/login';
              }else if(response.status =='login'){
              	window.location.href = baseUrl + 'admin/homepage';
              }
              else{
              	alert(response.message);
              }
			})
		})
	}
})