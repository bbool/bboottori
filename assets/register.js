import $ from 'jquery';
import './styles/register.scss';

$(document).ready(function() {
	$('#subscribeBtn').click(function() {
		subscribe();
	});
	
	$('#pwd').keyup(function(event) {
		verifyPwd(event.target.value);
	});
	
	$('#eyePwd').click(function() {
		togglePwd($(this));
	});
});

function subscribe() {
	if (checkFields()) {
		$.post('/ajax/register', {
			name : $('#firstname')[0].value,
			surname : $('#lastname')[0].value,
			email : $('#email')[0].value,
			username : $('#username')[0].value,
			pwd : $('#pwd')[0].value
		}, (response) => {
			if (response.error) {
				console.log('Une erreur est survenue pendant l\'enregistrement');
			} else {
				document.location = '/';
			}
		}, 'json');
	}
}

function checkFields() {
	// TODO : Gérer un highlight + tooltip box avec message en cas d'erreur
	let flag = true;
	let username = $('#username')[0];
	let firstname = $('#firstname')[0];
	let lastname = $('#lastname')[0];
	let email = $('#email')[0];
	let pwd = $('#pwd')[0];
	
//	username.removeClass('hasError');
	if (!username.value) {
//		username.addClass('hasError');
		flag = false;
	}
	
//	firstname.removeClass('hasError');
	if (!firstname.value || firstname.value.length < 2) {
//		firstname.addClass('hasError');
		flag = false;
	}
	
//	lastname.removeClass('hasError');
	if (!lastname.value || lastname.value.length < 2) {
//		lastname.addClass('hasError');
		flag = false;
	}
	
//	email.removeClass('hasError');
	if (!email.value || email.value.length < 7) {
//		email.addClass('hasError');
		flag = false;
	} else if (!verifyEmail(email.value)) {
//		email.addClass('hasError');
		flag = false;
	}
	
//	pwd.removeClass('hasError');
	if (!pwd.value) {
//		pwd.addClass('hasError');
		flag = false;
	}
	
	return flag;
}

function verifyEmail(mail) {
	let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return regex.test(mail);
}

function verifyPwd(pwd) {
	let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return regex.test(pwd);
}

function togglePwd(elt) {
	elt.toggleClass('fa-eye fa-eye-slash');
	let pwdInput = $('#' + elt.attr('toggle'));
	let type = 'password';
	if (pwdInput.attr('type') == 'password') {
		type = 'text';
	}
	pwdInput.attr('type', type);
}