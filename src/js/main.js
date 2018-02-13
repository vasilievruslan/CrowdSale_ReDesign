//= jquery-ui.min.js
//= slick.js
//= swipe.jquery.js

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

$(function () {
	$('.carousel').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
	    {
	      breakpoint: 824,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }],
		prevArrow: $('.prev-arr'),
		nextArrow: $('.next-arr')
	});

	AOS.init({
      offset: 200,
      duration: 400,
      easing: 'ease-in-sine',
      disable: 'mobile'
    });

    $('#currency').click(function() {
    	$('#fiat').toggleClass('active');
    	$('#tokens').removeClass('active');
    });

    $('#crypto').click(function() {
    	$('#tokens').toggleClass('active');
    	$('#fiat').removeClass('active');
    });

    $('#instuctions').click(function() {
    	console.log('click');
    	$('.wallets-container').slideToggle(400);
    });
   	$('.currency-form').on('swipe', function(e, Dx, Dy){
   		if(Dx > 0){
			$('.currency-form').removeClass('active');
   		}
    });

	$( "#currency-form__date" ).datepicker({
	  altFormat: "yy-mm-dd"
	});


	$('#bonuses-submit').attr('disabled', '');

	$('#bunuces-mail, #opaddress, #address, #hash, #curency, #bonuses-submit').on('input', function() {
		
		if ($('#bunuces-mail').val().length == 0 || $('#opaddress').val().length == 0 || $('#address').val().length == 0) {
			$('#bonuses-submit').attr('disabled', '');
		}else{
			$('#bonuses-submit').removeAttr('disabled');
		}
	});


	$('#bonuses-submit').click(function(event) {
		event.preventDefault();
		if (localStorage.getItem('bonuses') == null) {
			$.post('https://api.telegram.org/bot542094442:AAFyvENP47ULWOKNCo7DJX2RPmpu-AhsSu8/sendMessage?chat_id=-303084742&text='+ "E-mail: "+ $('#bunuces-mail').val() + " OPL address: " + $('#opaddress').val() + " address: " + $('#address').val() + " TX hash: " + $('#hash').val() + " curency: " + $('#curency').val(),  function(data, textStatus, xhr) {
			}).done(function () {
				alert("Thank you!");
				$('#bunuces-mail, #opaddress, #address, #hash, #curency, #bonuses-submit').attr('disabled', '').val('');
				localStorage.setItem('bonuses', true);
			});
		}else{
			alert('Already done');
			$('#bunuces-mail, #opaddress, #address, #hash, #curency, #bonuses-submit').attr('disabled', '').val('');
		}
	});

	$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });


    //============================checklist scripts=============================

    $('#step2').hide();

	$('#tonextstep').attr('disabled', '');
	$('#submit').attr('disabled', '');

	function checkVal() {
		if($('.step1-input:checked').length == 1 && $('#agreement').is(':checked')){
			$('#tonextstep').removeAttr('disabled');
		}else{
			$('#tonextstep').attr('disabled', '');
		}



		if($('.step2-input:checked').length == $('.step2-input').length && $('#email').val().length >= 4 && $('#number').val().length >= 4){
			$('#submit').removeAttr('disabled');
		}else{
			$('#submit').attr('disabled', '');
		}
	}
	$('.checklists-steps input').keypress(function() {
		checkVal();
	});
	$('.checklists-steps input').click(function() {
		checkVal();
	});
	

	$('#tonextstep').click(function(e) {
		e.preventDefault();
		if($('#statusChoice6').is(':checked')){
			$('.pop-up').fadeIn(400);
		}else{
			$('#step1').fadeOut(400, function() {
				$('#step2').fadeIn(400);
			});
		}
	});

	$('.close-btn').click(function(event) {
		event.preventDefault();
		$('.pop-up').fadeOut(400);
	});

	$('#tonextstep').click(function(e) {
		e.preventDefault();
		if($('#statusChoice6').is(':checked')){
			$('.pop-up').fadeIn(400);
		}else{
			$('#step1').fadeOut(400, function() {
				$('#step2').fadeIn(400);
			});
		}
	});

	$('.close-btn').click(function(event) {
		event.preventDefault();
		$('.pop-up').fadeOut(400);
	});

	function relocate() {
		if (localStorage.getItem('to') == "account") {
			window.location.replace('https://account.onplace.io/')
		}
		if (localStorage.getItem('to') == "btc") {
			let a = window.location.origin + '/btc.html';
			window.location.replace(a);
		}
		if (localStorage.getItem('to') == "eth") {
			let a = window.location.origin + '/eth.html';
			window.location.replace(a);
		}
		if (localStorage.getItem('to') == undefined) {
			let a = window.location.origin;
			window.location.replace(a);
		}
	}

	$('#submit').click(function(event) {
		event.preventDefault();
		$.post('https://api.telegram.org/bot542094442:AAFyvENP47ULWOKNCo7DJX2RPmpu-AhsSu8/sendMessage?chat_id=-273407978&text='+ $('#name').val() + " " + $('#email').val() + " +" + $('#number').val(), function(data, textStatus, xhr) {
			/*optional stuff to do after success */
		}).done(function () {
			// relocate();
			if (localStorage.getItem('to') == "account") {
			window.location.replace('https://account.onplace.io/')
			}
			if (localStorage.getItem('to') == "btc") {
				let a = window.location.origin + '/btc.html';
				window.location.replace(a);
			}
			if (localStorage.getItem('to') == "eth") {
				let a = window.location.origin + '/eth.html';
				window.location.replace(a);
			}
			if (localStorage.getItem('to') == undefined) {
				let a = window.location.origin;
				window.location.replace(a);
			}
		});
	});


	$.get('https://api.telegram.org/bot542094442:AAFyvENP47ULWOKNCo7DJX2RPmpu-AhsSu8/getUpdates', function(data) {
		console.log(data)
	});
	$('#btc_list').hide();
	$('#btcsubmit').click(function(event) {
		event.preventDefault();
		$.post('https://api.telegram.org/bot542094442:AAFyvENP47ULWOKNCo7DJX2RPmpu-AhsSu8/sendMessage?chat_id=-258968205&text='+ 'BTC: ' + $('#btcaddress').val() + ' ETH: ' + $('#ethaddress').val() + ' email: ' + $('#emailbtc').val(), function(data, textStatus, xhr) {
		}).done(function () {
			$('#btcaddress').val('done');
			$('#ethaddress').val('done');

			$('#btc_form').fadeOut('400', function() {
				$('#btc_list').fadeIn(400);
			});
		});
	});

	$('#date-submit').click(function(event) {
		event.preventDefault();
		$.post('https://api.telegram.org/bot542094442:AAFyvENP47ULWOKNCo7DJX2RPmpu-AhsSu8/sendMessage?chat_id=-315434931&text='+ 'Name: ' + $('#currency-form__name').val() + '; E-mail: ' + $('#currency-form__email').val() + '; Phone number: ' + $('#currency-form__number').val() + "; Date:" + $('#currency-form__date') + '; Time:' + $('#currency-form__time') , function(data, textStatus, xhr) {
		}).done(function () {
			$('#currency-form__name').val('').attr('disabled', '');
			$('#currency-form__email').val('').attr('disabled', '');
			$('#currency-form__number').val('').attr('disabled', '');
			$('#currency-form__date').val('').attr('disabled', '');
			$('#currency-form__time').val('').attr('disabled', '');
		});
	});

	$('#toaccount').click(function(event) {
		localStorage.setItem('to', 'account')
		if(localStorage.getItem('to') !== undefined){

		}
	});
	$('#toeth').click(function(event) {
		localStorage.setItem('to', 'eth')
		if(localStorage.getItem('to') !== undefined){

		}
	});
	$('#tobtc').click(function(event) {
		localStorage.setItem('to', 'btc')
		if(localStorage.getItem('to') !== undefined){

		}
	});
		$('#check').click(function(e) {
			e.preventDefault();	
			if($('#toaccountradio').is(':checked')){
				if (localStorage.getItem('to') == "account") {
					window.location.replace('https://account.onplace.io/')
				}
				if (localStorage.getItem('to') == "btc") {
					let a = window.location.origin + '/btc.html';
					window.location.replace(a);
				}
				if (localStorage.getItem('to') == "eth") {
					let a = window.location.origin + '/eth.html';
					window.location.replace(a);
				}
				if (localStorage.getItem('to') == undefined) {
					let a = window.location.origin;
					window.location.replace(a);
				}
			}else{
				window.location.replace(window.location.origin + '/accreditation.html');
			}
		});

	$('#closebtn-account').click(function(event) {
		event.preventDefault();
		$('#contribute-account').fadeOut(500);
	});


	$('.agreement').click(function(event) {		
		if ($('.agreement:checked').length == 1) {
			$('.btn-check').removeAttr('disabled');
		}else{
			$('.btn-check').attr('disabled', '');
		}
	});

	//========================================================================================

	$('#showQr').click(function(event) {
		event.preventDefault();
		$('.qrpop-up').fadeIn(500);
	});
	$('#closebtn-qr').click(function(event) {
		event.preventDefault();
		$('.qrpop-up').fadeOut(500);

	});


	var $popUp = $('.pop-up');
	function ShowVideo() {
		if ($popUp.attr('lang-id') !== 'cn') {

			$popUp.html('<iframe id="video" src="https://www.youtube.com/embed/p1YiDKlSe8k?rel=0&autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><div class="close-btn">&#215;</div>')
			$popUp.fadeIn(400);
		}else{
			$popUp.html('<video id="video" autoplay controls src="img/onplace-china-subtitle.mp4"></video><div class="close-btn">&#215;</div>')
			$popUp.fadeIn(400);
		}

	}

	$('.whitepaperbtn').click(function(e) {
		e.preventDefault();
		$('.whitepapper').fadeIn(400);
		$('.whitepapper-overlay').fadeIn(400);
	});
	$('.close-button').click(function(e) {
		e.preventDefault();
		$('.whitepapper').fadeOut(400);
		$('.whitepapper-overlay').fadeOut(400);
	});
	$('.whitepapper-overlay').click(function() {
		$('.whitepapper').fadeOut(400);
		$('.whitepapper-overlay').fadeOut(400);
	});

	$('.main-video').click(function(e) {
		console.log('clicked');
		ShowVideo()
		$('.close-btn').click(function() {
			console.log('ok')
			$('.pop-up').fadeOut(400);
			setTimeout(function () {
				$('.pop-up').html('');
			},400);
		});
	});

})
