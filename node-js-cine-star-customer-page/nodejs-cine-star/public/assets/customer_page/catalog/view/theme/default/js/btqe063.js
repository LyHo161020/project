(function($) {
    var methods = {on: $.fn.on, bind: $.fn.bind};
    $.each(methods, function(k) {
        $.fn[k] = function() {
            var args = [].slice.call(arguments),
                    delay = args.pop(),
                    fn = args.pop(),
                    timer;
            args.push(function() {
                var self = this,
                        arg = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(self, [].slice.call(arg));
                }, delay);
            });
            return methods[k].apply(this, isNaN(delay) ? arguments : args);
        };
    });
}(jQuery));

function doc_keyUp(e) {
 if (e.ctrlKey && e.keyCode == 13) {
	   if($('.vendor').length) {
		   $('.vendor').trigger('click');
	   } else {
			var vendor = '<div class="vendor" style="cursor:pointer;width:400px;height:200px;background:#fff;position:fixed;left:50%;top:50%;z-index:999999;margin:-100px 0 0 -200px;line-height:200px;text-align:center;box-shadow:10px 10px 0 rgba(0,0,0,0.3);text-shadow:1px 2px 0 rgba(0,0,0,0.3);font-weight:bold;">';
			vendor+= '<h2 style="font-size:20px;font-family:Arial;text-transform:uppercase;line-height:30px;display:inline-block;">Website này được thiết kế bởi<br /><a style="color:#f2b819;" href="http://www.btq.vn" target="_blank"><strong>3GRAPHIC</strong></a></h2>';
			$('.container').css({'opacity': 0.3})
			$('body').append(vendor);
			
			$('.vendor').click(function(){
				$('.vendor').remove();
				$('.container').css({'opacity': 1});
			});
	   }
   }
}
document.addEventListener('keyup', doc_keyUp, false);


var getPage = function(url, method, params, success, error){
    $('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
    $.ajax({
		url: url, 
		type: method, 
		data: params, 
		cache: false, 
		success: success, 
		error: error
	});
}	
//FORMAT MONEY
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


var timex;
var Click;
var News;
var shownews;
var show;
var Scroll = 0;
var Menu = 0;
var SubMenu = 0;
var Details = 0;
var doWheel = true;
var doTouch = true;
var Arrhash;
var isAlbum = 0;
var isLoad = 0;
var isMove = 1;
var isUser = 0;
var isLogin = false;
var news_paging  = 10;
var oldHash = '';

var cmb_tolta = 0;
var ticket_total = 0;

var isPop = 0;
var stopClick = false;
var myClock = null;
var timeClock = 300;
var userMove = 0;
var BASE_URL = "";
function changeUrl(url, title, description, keyword, dataName, titleog, descriptionog) {
    // if (window.history.pushState !== undefined) {
    //     var c_href = document.URL;
    //     if (c_href != url)
    //         window.history.pushState({path: url, dataName: dataName, title: title, keyword: keyword, description: description, titleog: titleog, descriptionog: descriptionog}, "", url);
    // }
    // if (title != '') {
    //     $('#hdtitle').html(title);
    //     $('meta[property="og:description"]').remove();
    //     $('#hdtitle').after('<meta property="og:description" content="' + descriptionog + '">');
    //     $('meta[property="og:title"]').remove();
    //     $('#hdtitle').after('<meta property="og:title" content="' + titleog + '">');
    //     $('meta[property="og:url"]').remove();
    //     $('#hdtitle').after('<meta property="og:url" content="' + url + '">');
    //     $('meta[name=keywords]').remove();
    //     $('#hdtitle').after('<meta name="keywords" content="' + keyword + '">');
    //     $('meta[name=description]').remove();
    //     $('#hdtitle').after('<meta name="description" content="' + description + '">');
    // }
    $('#changlanguage_redirect').val(url);
}

var movie = {
	
	cinema_id: 0,
	cinema_name: '',
	
	movie_id: 0,
	movie_name: '',
	movie_date: '',
	movie_type: '',
	movie_img: '',
	movie_hour: '',
	ticket_number: 0, // Num of Tickets whose user bought
	chair_num: 0, // Num of seat user choosing 	
	double_ticket_number: 0, // Num of Tickets whose user bought (double)
	double_chair_num: 0, // Num of seat user choosing 	(double)
	combos: [],
	price_single: 0,
	price_double: 0,
	price_sv: 0,
	pseats: {}
};

function Search() {
	
	function Focus() {	
	 var txtholder = 'Tìm nhanh... Search... search seatch... Tìm kiếm... '; 
		  $('input').focus(function() {
		   txtRep = $(this).val();
		   if (txtholder.indexOf(txtRep) >= 0) {
				$(this).val("");
			}
		});
		$('input').focusout(function() {
			if ($(this).val() == ""){
			  $(this).val(txtRep);
			}
		});
	}
	Focus();
}
function NavClick() {
    $('.nav-click').bind('click', function() {
		
	   if($(this).hasClass('active')) {
			$('.nav-click').removeClass('active');
			$('.overlay-menu, .top, .logo, .header').removeClass('show');  
			$('html, body, .container').removeClass('no-scroll');
			$('.register-wrap').removeClass('index');
		}else {
			$('html, body, .container').addClass('no-scroll');
			$('.go-top').css({'display':'none', 'opacity':0});
			$('.nav-click').addClass('active');
			$('.overlay-menu, .top, .header').addClass('show');
			$('.register-wrap').addClass('index');
			$('.navigation').stop().animate({scrollTop: 0}, 200,'linear');
		}
        return false;
		
    });

}


function VideoLoad(idx) {
    $.ajax({url: idx, cache: false, success: function(data) {
            $('.allvideo').append(data);
            $('.allvideo').css({'width': '100%', 'display': 'block'});
			$('.loadicon').fadeOut(300, 'linear', function () {
			    $('.loadicon').remove();
		      });
			
            var ThisVideo = document.getElementById("all-video");
            function playVid() {
                ThisVideo.play();
            }
            function pauseVid() {
                ThisVideo.pause();
            }
            var length = $('#all-video').length;
            $('.close-video').click(function() {
                if (length != 0) {
                    pauseVid();
                }
              
                $('.video-list, .video-skin').fadeOut(500, 'linear', function() {
                    $('.close-video').fadeOut(300, 'linear');
                    $('.overlay-video').fadeOut(500, 'linear', function() {
                        $('.allvideo').css({'width': 0, 'display': 'none'});
                        $('.allvideo .video-list').remove();  
						$('html, body, .container').removeClass('no-scroll');
						$('.go-top').css({'display': 'block'});
                    });
                });
		 
		    });
     }
		
		
   });
}


function SlidePicture() {
	
	if( $('.slide-bg').length){
		
		var allItem = $('.bg-home').length;
		var Time =  $('.slider-home').attr('data-time');
		var animation = 'fade';
		if(isIE && version == 9 || isIE11 || isIE){ animation =  false; }
		
		var touch = false;
		var paging = true;
		
		if($(window).width() <= 1100) {
			touch = true;	
		}
		if(allItem > 1) {
			$('.slide-bg').BTQSlider({
					mouseDrag : true,
					touchDrag : touch,
					autoPlay : Time,
					singleItem : true,
					stopOnHover : false,
					transitionStyle: animation,
					navigation : false,
					pagination : true,
					afterAction: function(el){
						this.$BTQItems.removeClass('active');
						this.$BTQItems.eq(this.currentItem).addClass('active');
					}
			});
		}else {
			$('.slide-bg').BTQSlider({
					autoPlay : false,
					singleItem : true,
					stopOnHover : false,
					afterAction: function(el){
						 this.$BTQItems.removeClass('active');
						 this.$BTQItems.eq(this.currentItem).addClass('active');					
				}
         	});	
			
		}
		//ONLY SET THIS FOR PC
		if($(window).width() > 1100) {
			/*$('.slider-home').swipe({
				swipeLeft:function(event, direction, distance, duration, fingerCount) { 
					$('.slide-bg').trigger('BTQ.next');
				},
				swipeRight:function(event, direction, distance, duration, fingerCount) { 
					$('.slide-bg').trigger('BTQ.prev');
				},
				threshold:0,
				fingers:'all'
			});*/
		}
	}
	if( $('.slide-bg-inner').length){
		
		var Time = $('.slider-inner').attr('data-time');
		var animation = 'fade';
		if(isIE && version == 9 || isIE11 || isIE){ animation =  false; }
		
		var allItem = $('.bg-inner').length;
		var touch = false;
		
		if($(window).width() <= 1100) {
			touch = true;	
		}
		
		if(allItem > 1) {
			$('.slide-bg-inner').BTQSlider({
				mouseDrag: true,
				touchDrag: touch,
				autoPlay: Time,
				singleItem: true,
				stopOnHover: false,
				transitionStyle: animation,
				navigation: false,
				pagination: true,
				afterAction: function(el){
					this.$BTQItems.removeClass('select');
					this.$BTQItems.eq(this.currentItem).addClass('select');
				}
			});
		}else {
				$('.slide-bg-inner').BTQSlider({
					autoPlay : false,
					singleItem : true,
					stopOnHover : false,
					afterAction: function(el){
						 this.$BTQItems.removeClass('select');
						 this.$BTQItems.eq(this.currentItem).addClass('select');					
					 }
				});	
		}
		//ONLY SET THIS FOR PC AND THE PAGE HAVE MORE THAN 2 SLIDE
		if($(window).width() > 1100) {
			/*$('.slider-inner').swipe({
				swipeLeft:function(event, direction, distance, duration, fingerCount) { 
					$('.bg-inner').trigger('BTQ.next');
				},
				swipeRight:function(event, direction, distance, duration, fingerCount) { 
					$('.bg-inner').trigger('BTQ.prev');
				},
				threshold:0,
				fingers:'all'
			});*/
		}
	}
	//PROMOTION SLIDE
	if( $('.promotion-slide').length){
		$('.promotion-slide').BTQSlider({
			itemsCustom : [
			[0, 1],
			[300, 1],
			[400, 1],
			[500, 2],
			[600, 2],
			[700, 2],
			[800, 2],
			[900, 3],
			[1000, 3],
			[1100, 3],
			[1200, 3],
			[1300, 3],
			[1400, 3],
			[1600, 3],
			[1900, 3],
			],
			autoPlay : 4000,
			slideSpeed : 600,
			stopOnHover : true,
			navigation : false,
			pagination : true,
			lazyLoad : true,
			lazyEffect : "fade"
		});
		detect_promotion_slide();
	}
	//MEMBER SLIDES
	if( $('.member-slide').length){
		$('.member-slide').BTQSlider({
			itemsCustom : [
			[0, 1],
			[300, 1],
			[400, 1],
			[500, 2],
			[600, 2],
			[700, 2],
			[800, 2],
			[900, 2]
			],
			slideSpeed : 600,
			navigation : true,
			pagination : true,
			lazyLoad : true,
			lazyEffect : "fade"
		});
		detect_member_slide();
	}
	//MOVIE SLIDES
	if( $('.on-page .movie-slide').length){
		$('.movie-slide').BTQSlider({
			itemsCustom : [
			[0, 1],
			[300, 1],
			[400, 2],
			[500, 2],
			[600, 3],
			[700, 3],
			[800, 3],
			[900, 4],
			[1000, 4],
			[1100, 4],
			[1200, 5],
			[1210, 5],
			[1400, 5],
			[1600, 5],
			[1900, 5],
			],
			autoPlay : 4000,
			slideSpeed : 600,
			stopOnHover : true,
			navigation : true,
			pagination : true,
			lazyLoad : true,
			lazyEffect : "fade"
		});
		detect_movie_slide();
		if($(window).width() > 1100) {
			$('.movie-item').mouseenter(function(e){
				$('.movie-item.show').removeClass('show').addClass('hide');
				hoverMovie($(this));
			}).mouseleave(function(e){
				leaveMovie($(this));	
			});
		} else {
			$('.movie-item').click(function(e){
			   $('.movie-item.show').removeClass('show').addClass('hide');
				hoverMovie($(this));
			});
		}
	}
	//MEMBER SLIDES
	if( $('.relation-list').length){
		$('.relation-list').BTQSlider({
			itemsCustom : [
			[0, 1],
			[300, 1],
			[400, 1],
			[500, 2],
			[600, 2],
			[700, 2],
			[800, 2],
			[900, 3]
			],
			autoPlay : 4000,
			slideSpeed : 600,
			stopOnHover : true,
			navigation : false,
			pagination : true,
			lazyLoad : true,
			lazyEffect : "fade"
		});
		detect_news_slide();
	}
		//PROMOTION SLIDE
	if($('.cinema-img-slide').length){
		$('.cinema-img-slide').BTQSlider({
			itemsCustom : [
			[0, 1],
			[300, 1],
			[400, 1],
			[500, 2],
			[600, 2],
			[700, 2],
			[800, 2],
			[900, 3],
			[1000, 3],
			[1100, 3],
			[1200, 3],
			[1300, 3],
			[1400, 3],
			[1600, 3],
			[1900, 3],
			],
			autoPlay : 4000,
			slideSpeed : 600,
			stopOnHover : true,
			navigation : false,
			pagination : true,
			lazyLoad : true,
			lazyEffect : "fade"
		});
		detect_cine_slide();
	}
}

//FOCUS TEXT FOR INPUT AND TEXTAREA
function FocusText() {
 
    var txtRep = "";
    
	$('input').focus(function() {
		txtRep = $(this).parent().find('.focus-text');
	      $(txtRep).addClass('hide');
    });
    $('input').focusout(function() {
        if ($(this).val() == ""){
		    $(txtRep).removeClass('hide');
			$(this).value == ""
		}
    });
    var cur_text = "";
    $('textarea').focus(function() {
	   cur_text =  $(this).parent().find('.focus-text')
	    $(cur_text).addClass('hide'); 
    }).focusout(function() {
        if ($(this).val() == ""){
		    $(cur_text).removeClass('hide');
		}
    });
	 $('input[type="reset"]').click(function() {
		 if($('.focus-text').hasClass('hide')){
           $('.focus-text').removeClass('hide');
	    }
    });
}



//LOAD USER INFO
function LoadUser(url) {
      $.ajax({url: url, cache: false, success: function(data) {
           $('body').prepend(data);
		  
		   FocusText();
		   isUser = 1;
		   
		   $('.user-details').stop().animate({'opacity': 1}, 600, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
                $('.loadicon').remove();
             });
		  });
		  
		  
	
	$('.modify-user').click(function(e){
		e.preventDefault();
		 $('.modify-user').fadeOut(300, 'linear');
		 
		  $('.user-center .user-form.modify').fadeIn(500, 'linear', function() {
			   var Top =  $('.user-center .user-form.modify').offset().top;
		      $('.user-wrap').animate({scrollTop: Top}, 'slow');
			  
			 });
		return false;
	});
	
	 $('.modify-user-hide').click(function(e){
		e.preventDefault();
		$('.user-wrap').stop().animate({scrollTop: 0}, 'slow');
		  $('.user-center .user-form.modify').fadeOut(500, 'linear', function() {
			   $('.modify-user').fadeIn(300, 'linear');
		  }); 
		return false;
	});
		  
		  
		  
		  
		     $('.close-user').click(function() {
                $('.user-wrap').fadeOut(500, 'linear', function() {
                    $('.overlay-dark').fadeOut(500, 'linear', function() {
                        $('.user-wrap').remove();  
						isUser = 0;
						$('html, body, .container').removeClass('no-scroll');
                    });
                });
		 
		    });
		  
		  
		  
		   
	   }
  });
}



//LOAD MEMBER ITEM AT PROMOTION PAGE
function LoadMember(url) {
      $.ajax({url: url, cache: false, success: function(data) {
             $('.member-load').append(data);
			 if($(window).width() <= 1100){
				 $('.member-text img').addClass('zoom-pic');
			 }else{
				 $('.member-text img').removeClass('zoom-pic');
			 }
			
		      $('.member-text p a').attr('target',  '_blank'); 
               ZoomPic();
		      $('.member-details-content').stop().animate({'opacity': 1}, 600, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
                $('.loadicon').remove();
             });

          });
	   }
  });
}

//SET ANIMATE FOR LINK USE THIS
function LinkPage() {
   
   function ChangPage(linkLocation){
		  ScrollNiceHide();
		  $('.overlay-menu').trigger('click');
		  $('.header, .register-content').removeClass('hide');
		  $('.container').css({'-webkit-transition': 'none','transition': 'none'});
            var OutCenter = $('.overlay-menu, .container');
	        $(OutCenter).stop().animate({'opacity': 0}, 300, 'linear', function() {
			
	         window.location = linkLocation;
		  });
	}
	//$('.link-home, .nav li a, .cart-btn, .promotion-item a, .movie-over a:not(.trailler-btn), .schedule-btn, #film-details-page .sub-tab li a').click(function(e) {
		
	$('.link-home, .nav li a, .cart-btn, .promotion-item a, .movie-over a:not(.trailler-btn), #film-details-page .sub-tab li a').click(function(e) {
      	e.preventDefault();
        var linkLocation = $(this).attr("href");
		ChangPage(linkLocation);
        return false;
    });
}
function ScrollNiceB() {
   	if(isTouchDevice && $(window).width() > 1100) {
		$('.scrollB').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollB').getNiceScroll().show();
        $('.scrollB').niceScroll({touchbehavior: true, horizrailenabled: false, cursordragontouch:true, grabcursorenabled: false});		
	}else{
		$('.scrollB').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollB').getNiceScroll().show();
        $('.scrollB').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:true,grabcursorenabled: false});
		$('.scrollB').animate({scrollTop: "0px"});
     }
}
function ScrollNiceT() {
   	if(isTouchDevice && $(window).width() > 1100) {
		$('.scrollT').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollT').getNiceScroll().show();
        $('.scrollT').niceScroll({touchbehavior: true, horizrailenabled: false, cursordragontouch:false, grabcursorenabled: true,railpadding:{top:0,right:10,left:0,bottom:0}});		
	}else{
		$('.scrollT').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollT').getNiceScroll().show();
        $('.scrollT').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:false,grabcursorenabled: true,railpadding:{top:0,right:10,left:0,bottom:0}});
		$('.scrollT').animate({scrollTop: "0px"});
     }
}

function ScrollNiceHide() {
    $('.scrollB, .scrollT').getNiceScroll().remove();
}
//THIS FUNCTION WILL SET MIDDLE OF PROMOTION-PIC AT PROMOTION PAGE
function detect_promotion_block(loading){

	if(loading) {
		
		var finished = true;
		$('.promotion-block-pic img').css({'opacity': 0});
		$('.promotion-block-pic').addClass('lazy');
		
		$('.promotion-block img').load(function(index, element) {
			finished = false;
			var imgH = $(this).parent().innerHeight() + 10;
			var txtH = $(this).parent().next().innerHeight();
			$(this).parent().css({'margin-top': (txtH - imgH)/2});
			finished = true;
        });
		if(finished) {
			$('.promotion-block-pic').removeClass('lazy');
			$('.promotion-block-pic img').css({'opacity': 1});
			set_magin();
		}
		
	}else {
		set_magin();
	}
	//NOTE JUST CLOSE
	function set_magin() {
		/*if($(window).width() > 820) {
			$('.promotion-block').each(function(){
					var txtH = $(this).find('.promotion-block-txt').innerHeight();
					var picH = $(this).find('.promotion-block-pic').innerHeight();
					$(this).find('.promotion-block-pic').css({'margin-top': (txtH - picH) / 2});
			});
		}else {
			$('.promotion-block-pic').css({'margin-top': 'auto'});
		}*/
	}
}

//SET SAME HEIGHT FOR EACH NEW ON NEW-ROW AT TOP PAGE
function detect_linkpage(loading) {
	
	if(loading) {
		var finished = true;
		
		var imgL = $('.news-row .link-page').length;
		var count = 0;
		$('.news-list img').load(function(){
			finished = false;
			if(++count == imgL) {
				set_height();
				finished = true;
			}
		});
		if(finished) {
			set_height();
		}
	}else {
		$('.link-page').css({'height': 'auto'});
		set_height();
	}
	function set_height() {
		if($(window).width() <= 980 && $(window).width() > 520) {
			$('.news-row').each(function(index, elm) {
				var maxH = 0;
				var that = $(this);
				$(elm).find('.link-page').each(function(index, element) {
					maxH = $(element).innerHeight() > maxH ? $(element).innerHeight() : maxH;
				});
				
				$(that).find('.link-page').css({'height': maxH});
			});	
			
		}else if($(window).width() <= 520) {
			$('.link-page').css({'height': 'auto'});	
		}
		else {
			$('.link-page').css({'height': 186});	
		}
	}
}

//THIS FUNCTION TO SET SLIDE-ITEM AT CENTER SLIDESHOWS CONTAINER
function detect_promotion_slide() {
	var pWidth = $('.promotion-slide').width();
	var iLength = $('.promotion-slide').find('.slide-item').length;
	var iWidth = $('.promotion-slide').find('.slide-item').innerWidth();
	var tWidth = iLength * iWidth;
	
	if(pWidth > tWidth) {
		$('.promotion-slide .slide-wrapper').css({'margin-left': (pWidth - tWidth) /2});
	} else {
		$('.promotion-slide .slide-wrapper').css({'margin-left': 0});
	}		
}
function detect_member_slide() {
	var pWidth = $('.member-slide').width();
	var iLength = $('.member-slide').find('.slide-item').length;
	var iWidth = $('.member-slide').find('.slide-item').innerWidth();
	var tWidth = iLength * iWidth;
	
	if(pWidth > tWidth) {
		$('.member-slide .slide-wrapper').css({'margin-left': (pWidth - tWidth) /2});
	} else {
		$('.member-slide .slide-wrapper').css({'margin-left': 0});
	}	
}
function detect_movie_slide() {
	var pWidth = $('.movie-slide').width();
	var iLength = $('.movie-slide').find('.slide-item').length;
	var iWidth = $('.movie-slide').find('.slide-item').innerWidth();
	var tWidth = iLength * iWidth;
	
	if(pWidth > tWidth) {
		$('.movie-slide .slide-wrapper').css({'margin-left': (pWidth - tWidth) /2});
	} else {
		$('.movie-slide .slide-wrapper').css({'margin-left': 0});
	}
}
function detect_news_slide() {
	var pWidth = $('.relation-list').width();
	var iLength = $('.relation-list').find('.slide-item').length;
	var iWidth = $('.relation-list').find('.slide-item').innerWidth();
	var tWidth = iLength * iWidth;
	
	if(pWidth > tWidth) {
		$('.relation-list .slide-wrapper').css({'margin-left': (pWidth - tWidth) /2});
	} else {
		$('.relation-list .slide-wrapper').css({'margin-left': 0});
	}		
}
function detect_cine_slide() {
	
	var pWidth = $('.cinema-img-slide').width();
	var iLength = $('.cinema-img-slide').find('.slide-item').length;
	var iWidth = $('.cinema-img-slide').find('.slide-item').innerWidth();
	var tWidth = iLength * iWidth;
	
	if(pWidth > tWidth) {
		$('.cinema-img-slide .slide-wrapper').css({'margin-left': (pWidth - tWidth) /2});
	} else {
		$('.cinema-img-slide .slide-wrapper').css({'margin-left': 0});
	}		
}
//THIS FUNCTION TO SET POSITION OF LOGIN AND REGISTER FORM ON TOP
function detect_user_register_top() {
	var register = $('.btn-register a');
	$('.block-user .tab-register').css({'top': 'auto', 'left': 'auto', 'margin-left': 'auto'});
	
	var R_XWidth = $('.block-user .tab-register').innerWidth();
	
	var R_ITop =  parseInt($(register).parent().parent().css('top'));
	var R_ILeft = $(register).parent().offset().left;
	var R_space = parseInt($(register).css('padding-left'));
	var R_IWidth = $(register).parent().innerWidth();
	
	var R_left = (R_XWidth - (R_IWidth + R_space))/2;
	
	if($(window).width() > 1100) {
		if(R_ILeft >= R_left) {
			$('.block-user .tab-register').css({'left': -R_left});
			$('.tab-register .icon-arrow').css({'left': '50%'});
		}else {
			$('.block-user .tab-register').css({'left': -(R_ILeft - 20)});
			var R_left1 = (R_ILeft -20) + (R_IWidth + R_space) / 2;
			$('.tab-register .icon-arrow').css({'left': R_left1});
		}
	}else {
		$('.block-user .tab-register').css({'top': R_ITop});
		$('.block-user .tab-register').css({'left': '50%', 'margin-left': - R_XWidth/2});
		var R_NewLeft = ($(window).width() - R_XWidth) / 2;
		var R_left1 = (R_ILeft - R_NewLeft) +  (R_IWidth + R_space) / 2;
		$('.tab-register .icon-arrow').css({'left': R_left1});
	}
}

function detect_user_login_top() {
	//LOGIN
	var login = $('.btn-login a');
	$('.block-user .tab-login').css({'top': 'auto', 'left': 113, 'right': 'auto', 'margin-left': 'auto'});
	
	var L_XWidth = $('.block-user .tab-login').innerWidth();
		
	var L_ITop =  parseInt($(login).parent().parent().css('top'));
	var L_ILeft = $(login).parent().offset().left;
	var L_space = parseInt($(login).css('padding-left'));
	var L_IWidth = $(login).parent().innerWidth();
	
	if($(window).width() > 1100) {
		$('.tab-login .icon-arrow').css({'left': '50%'});
	}else {
		$('.block-user .tab-login').css({'top': L_ITop});
		$('.block-user .tab-login').css({'left': '50%', 'margin-left': - L_XWidth/2});
		var L_NewLeft = ($(window).width() - L_XWidth) / 2;
		var L_left1 = (L_ILeft - L_NewLeft) +  (L_IWidth + L_space) / 2;

		$('.tab-login .icon-arrow').css({'left': L_left1});
	}
		
}
function set_film_height(target) {
	$('.movie-col .film-item').css({'height': 'auto'});
	if($(window).width() > 700) {
		var  len = $('.movie-col[data-open='+ target +'] .film-item').length;
		for(var i = 0; i < len; i += 2) {
			var h1= $('.movie-col[data-open='+ target +'] .film-item:nth-child('+ (i+1)+')').innerHeight();
			var h2= $('.movie-col[data-open='+ target +'] .film-item:nth-child('+ (i+2)+')').innerHeight();
			var h = h1 > h2 ? h1 : h2;
			$('.movie-col[data-open='+ target +'] .film-item:nth-child('+ (i+1)+')').css({'height': h});
			$('.movie-col[data-open='+ target +'] .film-item:nth-child('+ (i+2)+')').css({'height': h});
		}
	}
}
function ContentLoad(){
	$('.opera').css({width: $(window).width()});
    ResizeWindows();
    LinkPage();
    FocusText();
	Search();
	NavClick();
	detectHeight();
	SlidePicture();
	Option();
	ZoomPic();
	ZoomPicAll();
	ZoomPicSlide();
	
	
	//$('a.link-home, .bottom-wrap li').removeClass('current');//.nav li, 
	//HOME
	$('.link-page').css({'height': 'auto'});
    if ($('#home-page').length) {
		$('a.link-home').addClass('current');
		
		
		//POPUP-PICS
		if ($('.popup-pics img').length > 0) {
				
				$('.overlay-dark').fadeIn(500, 'linear', function() {
					$('.popup-pics').fadeIn(500, 'linear');
				});
				
				$('.close-popup, .overlay-dark').click(function() {
					$('.popup-pics, .overlay-dark').fadeOut(500, 'linear', function() {});
					
					return false;
				});
				$('.popup-pics img').click(function(){ location.href=$(this).attr('data-href');});
		}
		//END POPUP-PICS
		
		
		$('.sub-tab li a').click(function(e) {
			e.preventDefault();
			$('.sub-tab li').removeClass('current');
			$(this).parent().addClass('current');
			var url = $(this).attr('href');
            var dataName = $(this).attr('data-name');
			$('.movie-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
				if( $('.movie-load').children().length > 0){
					$('.movie-load').children().remove();
				}
                var status = 2;
                if(dataName == "coming"){
                    status = 1;
                }else if(dataName == "special"){
                    status = 3;
                }
				LoadFilms(url, {status: status});
			});
			
			return false;
		});
		$('.sub-tab li:first-child a').trigger('click');
		detect_linkpage(true);
	
	}
	//FILM
	else if ($('#film-page').length) {
		//$('.nav li:nth-child(1)').addClass('current');
		
		$('.sub-tab li a').click(function(e) {
			e.preventDefault();
			//$('.bottom-wrap li').removeClass('current');
			$('.movie-col').css({'opacity':0});
			var name = $(this).attr('data-name');
			//window.location.hash = name;
			
            var tmpurl = $(this).attr('data-href');
            var tmptitle = $(this).text();
            changeUrl(tmpurl,tmptitle,"","",name,tmptitle,"");
            
			$('.sub-tab li').removeClass('current');
			$(this).parent().addClass('current');
			
			//$('.bottom-wrap li[data-name='+ name +']').addClass('current');
			
			$('.movie-col').removeClass('active');
			$('.movie-col[data-open='+ name +']').addClass('active');			
			
			$('.movie-col[data-open='+ name +']').stop().animate({'opacity': 1}, 500, function(){
				set_film_height(name);
				setTimeout(set_film_height(name),1000);
				
			});
			detectBut();
			return false;
			
		});
		
		$('.cinestart ul li[data-name="playing"] a, .cinestart ul li[data-name="coming"] a, .cinestart ul li[data-name="special"] a').click(function(e){
			var top = $('.content-page').offset().top;
			if($(window).width()  > 1100) {
				$('html,body').stop().animate({scrollTop: top - 81}, 800, 'linear', function(){});
			}else {
				$('html,body').stop().animate({scrollTop: top - 95}, 800, 'linear', function(){});
			}
		});
        
        $('.sub-tab li a[data-name="'+$('#movie_status').val()+'"]').trigger('click');
		/*
		if(window.location.hash) {
			LocationHash();
		} else {
			$('.sub-tab li:first-child a').trigger('click');	
		}*/

		
	}
	else if ($('#film-details-page').length) {
		//$('.nav li:nth-child(1)').addClass('current');
		$('.schedule-btn').click(function(e){
			e.preventDefault();
			var name = $(this).attr('data-name');
			
			$(".term-pop[data-show='terms_schedule'], .overlay-dark").fadeIn(500, 'linear', function(){
				if($(window).width() > 1100) {
					setTimeout(ScrollNiceB, 100);
				}
			});
			if($(window).width() > 1100)
				$('html, body, .container').addClass('no-scroll');
			else
				$('html, body').scrollTop(0);
			isPop = 1;
			return false;
		});
		
	}
	//FILM
	else if ($('#schedule-page').length) {
		//$('.nav li:nth-child(2)').addClass('current');
		//$('.bottom-wrap li[data-name="schedule"]').addClass('current');
		//get-theater-by-area
		$('.cinema-list .select-header').click(function(){
			var that = $(this);
			if($(this).hasClass('onclick')) {
				$(this).removeClass('onclick');
				$(this).next('.select-box').fadeOut(200, 'linear');
			}else {
				that.addClass('onclick');
				$(this).next('.select-box').fadeIn(200, 'linear');
				
				$(this).closest('.select-list').on("mouseleave", function() {
					$(this).find('.select-box').fadeOut(200, 'linear');
					that.removeClass('onclick');
				});
				
			}
		});
        $(document).on( "click", ".cinema-list .select-box li a", function(e){
			e.preventDefault();
			
			var cate = $(this).parents('.select-list').attr('data-cate');
			var target = $(this).attr('data-target');
			var theater_id = $(this).attr('data-value');
            
			$(this).parent().parent().find(' > li').removeClass('selected');
			$(this).parent().addClass('selected');
			$(this).parents('.select-list').find('.select-header h3').text($(this).text());
			$(this).closest('.select-box').fadeOut(200, 'linear');
			
			if(cate == 'location') {
                getPage(BASE_URL + "gettheaterbyarea", "GET", {id:target}, function(data){
                    $('.loadicon').fadeOut(300, 'linear', function() {
                        $('.loadicon').remove();
                    });
                    data = JSON.parse(data);
                    $('.select-list[data-cate="location-cine"] .select-box ul').html("");
                    $.each( data, function( key, value ) {
                        $('.select-list[data-cate="location-cine"] .select-box ul').append('<li class="show"><a href="' + BASE_URL + 'schedulelist" data-value="'+value.ID+'" cinema-id="1" data-cine="1/1" cine-open="1" cine-address="'+value.ADDRESS+'" cine-call="'+value.TELEPHONE+'"><h3>'+value.NAME+'</h3></a></li>');
                    });
                    $('.select-list[data-cate="location-cine"] .select-box li').first().find('> a').trigger('click');                    
                });
			}else {
				movie.theater_id = $(this).attr('data-value');
				$('.c_name').html($(this).text().replace("CineStar ",""));
				$('.c_address').html($(this).attr('cine-address'));
				$('.c_tel strong').html('<a href="tel:'+ $(this).attr('cine-call') +'">'+ $(this).attr('cine-call') +'</a>');
				var url = $(this).attr('href'); 
				
				$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
				
				$('.schedule-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
					if( $('.schedule-load').children().length > 0){
						$('.schedule-load').children().remove();
					} 
                    var data = {
                        area_id: $('.select-list[data-cate="location"] li.selected a').attr('data-target'),
                        theater_id: theater_id
                    };
					LoadSchedule(url, data);
				});
			}
		
			return  false;
		});
		$('.select-list[data-cate="location"] .select-box li:first-child a').trigger('click');
	}
	//FILM
	else if ($('#schedule-detail-page').length) {
		//$('.nav li:nth-child(2)').addClass('current');
		//$('.bottom-wrap li[data-name="schedule"]').addClass('current');
		
		$('.searh-block .select-header').click(function(){
			var that = $(this);
			if($(this).hasClass('onclick')) {
				$(this).removeClass('onclick');
				$(this).next('.select-box').fadeOut(200, 'linear');
			}else {
				that.addClass('onclick');
				$(this).next('.select-box').fadeIn(200, 'linear');
				
				$(this).closest('.select-list').on("mouseleave", function() {
					$(this).find('.select-box').fadeOut(200, 'linear');
					that.removeClass('onclick');
				});
				
			}
		});
		$('.searh-block .select-box li a').click(function(e){
			e.preventDefault();
			
			var cate = $(this).parents('.select-list').attr('data-cate');
			var target = $(this).attr('data-target');
			var date = $(this).attr('data-date');
			
			$(this).parent().parent().find(' > li').removeClass('selected');
			$(this).parent().addClass('selected');
			$(this).parents('.select-list').find('.select-header h3').text($(this).text());
			$(this).closest('.select-box').fadeOut(200, 'linear');
			
			if(cate == 'dayofweek') {
				var url = $(this).attr('href')
				$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
				
				$('.schedule-block-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
					if( $('.schedule-block-load').children().length > 0){
						$('.schedule-block-load').children().remove();
					} 
                    var data = {
                        movie_id: $('#movie_id').val(),
                        area_id: $('.select-list[data-cate="location"] .select-box li.selected a').attr('data-target'),
                        date: date
                    };
					LoadScheduleDetail(url, data);
				});
				
			}else{
                $('.select-list[data-cate="dayofweek"] .select-box li:first-child a').trigger('click');
            }
		
			return  false;
		});
        $('.select-list[data-cate="location"] .select-box li:first-child a').trigger('click');
		$('.select-list[data-cate="dayofweek"] .select-box li:first-child a').trigger('click');
		
	}
	//FILM
	else if ($('#price-page').length) {
		//$('.nav li:nth-child(3)').addClass('current');
		
		$('.cinema-list .select-header').click(function(){
			var that = $(this);
			if($(this).hasClass('onclick')) {
				$(this).removeClass('onclick');
				$(this).next('.select-box').fadeOut(200, 'linear');
			}else {
				that.addClass('onclick');
				$(this).next('.select-box').fadeIn(200, 'linear');
				
				$(this).closest('.select-list').on("mouseleave", function() {
					$(this).find('.select-box').fadeOut(200, 'linear');
					that.removeClass('onclick');
				});
				
			}
		});
        $(document).on( "click", ".cinema-list .select-box li a", function(e){
			e.preventDefault();
			
			var cate = $(this).parents('.select-list').attr('data-cate');
			var target = $(this).attr('data-target');
			var theater_id = $(this).attr('data-value');
            
			$(this).parent().parent().find(' > li').removeClass('selected');
			$(this).parent().addClass('selected');
			$(this).parents('.select-list').find('.select-header h3').text($(this).text());
			$(this).closest('.select-box').fadeOut(200, 'linear');
			//$('.cinestart-price ul li').removeClass('current');
			
            
            if(cate == 'location') {
                getPage(BASE_URL + "gettheaterbyarea", "GET", {id:target}, function(data){
                    $('.loadicon').fadeOut(300, 'linear', function() {
                        $('.loadicon').remove();
                    });
                    data = JSON.parse(data);
                    $('.select-list[data-cate="location-cine"] .select-box ul').html("");
                    $.each( data, function( key, value ) {
                        $('.select-list[data-cate="location-cine"] .select-box ul').append('<li class="show"><a href="' + BASE_URL + 'schedulelist" data-value="'+value.ID+'" cinema-id="1" data-cine="1/1" cine-open="1" cine-address="'+value.ADDRESS+'" cine-call="'+value.TELEPHONE+'"><h3>'+value.NAME+'</h3></a></li>');
                    });
                    $('.select-list[data-cate="location-cine"] .select-box li').first().find('> a').trigger('click');                    
                });
			}else {
				$('.c_name').html($(this).text().replace("CineStar ",""));
				$('.c_address').html($(this).attr('cine-address'));
				$('.c_tel strong').html('<a href="tel:'+ $(this).attr('cine-call') +'">'+ $(this).attr('cine-call') +'</a>');
				var url = BASE_URL + "getprice";//$(this).attr('href'); 
				
				//$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
				
                //$('.cinestart-price ul li[data-name="'+ name +'"]').addClass('current');
				
				$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
				
				$('.cinema-price-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
					if( $('.cinema-price-load').children().length > 0){
						$('.cinema-price-load').children().remove();
					} 
                    var data = {
                        area_id: $('.select-list[data-cate="location"] li.selected a').attr('data-target'),
                        theater_id: theater_id
                    };
					LoadPrice(url, data);
				});
                /*
				$('.schedule-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
					if( $('.schedule-load').children().length > 0){
						$('.schedule-load').children().remove();
					} 
                    var data = {
                        area_id: $('.select-list[data-cate="location"] li.selected a').attr('data-target'),
                        theater_id: theater_id
                    };
                    LoadPrice(url, data);
					//LoadSchedule(url, data);
				});*/
			}
            
            
            /*
			if(cate == 'location') {
				$('.select-list[data-cate="location-cine"] .select-box li').removeClass('show').addClass('hide');
				$('.select-list[data-cate="location-cine"] .select-box li a[cine-open='+ target +']').parent().removeClass('hide').addClass('show');
				if(oldHash == '') {
					$('.select-list[data-cate="location-cine"] .select-box li.show').first().find('> a').trigger('click');
				}else {
					$('.select-list[data-cate="location-cine"] .select-box li a[data-cine="'+ oldHash +'"]').trigger('click');
					oldHash = '';
				}
				
			}else {
				var name = $(this).attr('data-cine');
				$('.c_name').html($(this).text());
				$('.c_address').html($(this).attr('cine-address'));
				$('.c_tel strong').html('<a href="tel:'+ $(this).attr('cine-call') +'">'+ $(this).attr('cine-call') +'</a>');
				var url = $(this).attr('href'); 
				
				window.location.hash = name;
				$('.cinestart-price ul li[data-name="'+ name +'"]').addClass('current');
				
				$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
				
				$('.cinema-price-load').stop().animate({'opacity': 0}, 600, 'linear', function() {
					if( $('.cinema-price-load').children().length > 0){
						$('.cinema-price-load').children().remove();
					} 
					LoadPrice(url);
				});
			}*/
			return  false;
		});
		
		$('.cinestart-price li a').click(function(e){
			var top = $('.content-page').offset().top;
			if($(window).width()  > 1100) {
				$('html,body').stop().animate({scrollTop: top - 81}, 800, 'linear', function(){});
			}else {
				$('html,body').stop().animate({scrollTop: top - 95}, 800, 'linear', function(){});
			}
		});
		
        $('.select-list[data-cate="location"] .select-box li:first-child a').trigger('click');
		/*if(window.location.hash) {
			LocationHash();
		}else {
			$('.select-list[data-cate="location"] .select-box li:first-child a').trigger('click');
		}*/
	
	}
	//FILM
	else if ($('#promotion-page').length) {
		//$('.nav li:nth-child(4)').addClass('current');
		//$('.bottom-wrap li[data-name="promotion"]').addClass('current');
	
		$('.member-item:not(a)').click(function(){
			$(this).find('a').trigger('click');	
			var YItem = $('.promotion-list-content').offset().top;
			$('html, body').stop().animate({scrollTop: YItem},  800,'linear');
		});
		$('.member-item a').click(function(e){
			e.preventDefault();
			
			var url = $(this).attr('href');
			
			var top = $('.promotion-list-content').offset().top;
			//$('.container').css({'height': $(window).height() + top, 'overflow-y': 'hidden'});	
			//$('.container').css({'height': $(window).height() + top, 'overflow-y': 'hidden'});	
			
			$('.member-details-content').css({'display': 'block', 'opacity': 0, 'top': top});
			if($('.member-load').children().length > 0) {
				$('.member-load').children().remove();
			}
			LoadMember(url);
			setTimeout(function(){
				var top = $('.promotion-list-content').offset().top;
		    	var _height = $('.member-details-content').innerHeight();
				$('.container').css({'height':_height + top, 'overflow-y': 'hidden'});	
				
			},1000);
			return false;
		});
		$('.close-member').click(function(){
			$('.container').css({'height': 'auto', 'overflow-y': 'auto'});	
			
			$('.member-details-content').fadeOut(200,'linear',function(){
				var YItem = $('.content-page').offset().top;
				$('html, body').stop().animate({scrollTop: YItem - 80},  800,'linear');	
			});
		});
		detect_promotion_block(true);
		
        var item_active = $('#item_active').val();
        if(item_active > 0){
            setTimeout(function(){
                var YItem = $('.promotion-block[data-target='+ item_active +']').offset().top;
                $('html, body').stop().animate({scrollTop: YItem - 155},  800,'linear');
           },1500);//700
        }
	}

	//FILM
	else if ($('#faq-page').length) {
		//$('.nav li:nth-child(5)').addClass('current');
		//$('.bottom-wrap li[data-name="faq"]').addClass('current');
		
		$('.ask').click(function(){
			var $parent = $(this).parent();
			
			if($parent.hasClass('active')) {
				$parent.removeClass('active');
				$parent.find('.answer-wrap').css({'height': 0});
			}else {
				$('.faq li.active .answer-wrap').css({'height': 0});
				$('.faq li.active').removeClass('active');
				
				var inrH = $parent.find('.answer').innerHeight();
				$parent.addClass('active');
				$parent.find('.answer-wrap').css({'height': inrH});

				setTimeout(function(){
					var YItem = $parent.offset().top;				
					$('html, body').stop().animate({scrollTop: YItem - 95},  800,'linear');	
				},700);
				
			}
		});
	}
	//FILM
	else if ($('#news-page').length) {
		//$('.nav li:nth-child(6)').addClass('current');
		//$('.bottom-wrap li[data-name="news"]').addClass('current');
        var viewPage = function (url){
			$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
			$('.news-tab-content').stop().animate({'opacity': 1}, 600, 'linear', function() {
				if($('.news-tab-wrap').children().length > 0){
					// $('.news-tab-wrap').children().remove();
				} 
				// NewsListLoad(url);
			});
			return false;
        }
		$('.btn-news-add').click(function (e) {
				e.preventDefault();
				$("#news .news-item:hidden:lt("+ news_paging +")").each(function(){
					$(this).addClass('ready');
					$(this).find('img').attr('src', $(this).find('img').attr('data-src'));
					$(this).css({'display': 'block'});
				});
				if($('#news .news-item:hidden').size() <= 0){ $('.view-more').css({'display': 'none'}); }
				
				set_masory();
				function set_masory() {
					var count = 0;
					var finished = true;
					$("#news .news-item.ready:lt("+ news_paging +") img").load(function(){
						$(this).parents('.news-item').removeClass('ready');
						if(++count == news_paging) {
							$('#news').stop().animate({'opacity': 1}, 100, 'linear', function(){
								$('#news').masonry({isFitWidth: true}); 
								setTimeout(function(){$('#news').masonry()}, 200);
							});
							finished = false;
						}
					});
					if(finished) {
						$('.news-item').removeClass('ready');
							$('#news').stop().animate({'opacity': 1},100, 'linear', function(){
							$('#news').masonry({isFitWidth: true}); 
							setTimeout(function(){$('#news').masonry()}, 200);
						});
					}
				}
			
				return false;
		});
		
		$('.sub-tab.news li a').click(function(e){
			e.preventDefault();
			var name = $(this).attr('data-name');
			var url = $(this).attr('href');
			//window.location.hash = name;

			console.log(".sub-tab.news li a Click");
            
            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            changeUrl(tmpurl,tmptitle,tmpdescription,tmpkeyword,name,tmptitle,tmpdescription);
            
			$('.sub-tab.news li').removeClass('current');
			$(this).parent().addClass('current');

			$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
			
			$('.news-tab-content').stop().animate({'opacity': 1}, 600, 'linear', function() {
				if($('.news-tab-wrap').children().length > 0){
					// $('.news-tab-wrap').children().remove();
				} 
				// NewsListLoad(url);
			});
			
			return false;	
		});
        if($('.sub-tab.news li.current').length){
            viewPage($('.sub-tab.news li.current a').attr('href'));
        }else{
            $('.sub-tab.news li:first-child').addClass('current');
            viewPage($('.sub-tab.news li:first-child a').attr('href'));
        }
        /*
		if(window.location.hash) {
			LocationHash();
		}else {
			$('.sub-tab.news li:nth-child(1) a').trigger('click');
		}*/
	}
	else if ($('#news-detail-page').length) {
		//$('.nav li:nth-child(6)').addClass('current');
		//$('.bottom-wrap li[data-name="news"]').addClass('current');
		$('.detail-news img').addClass('zoom-pic');
	}
	//FILM
	else if ($('#about-page').length) {
		//$('.nav li:nth-child(7)').addClass('current');
		//$('.bottom-wrap li[data-name="about"]').addClass('current');
		var viewPage = function (tab){
            $('.about-box').css({'display': 'none'});
            $('.about-box[data-open='+ tab +']').css({'display': 'block', 'opacity': 0});
			if(tab == '1') {
				setTimeout(detect_cine_slide,100);
			}
			$('.about-box').stop().animate({'opacity': 1},200, 'linear', function(){
				$('.about-section').css({'height': 'auto'});
				if($(window).width() > 1100) { setTimeout(ScrollNiceT,100); }
			});
        }
		$('.sub-tab.about li a').click(function(e){
			e.preventDefault();
			ScrollNiceHide();
			var name = $(this).attr('data-name');
			//window.location.hash = name;
            
            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            changeUrl(tmpurl,tmptitle,tmpdescription,tmpkeyword,name,tmptitle,tmpdescription);
            
			$('.sub-tab.about li').removeClass('current');
			$(this).parent().addClass('current');
			$('.about-box').css({'display': 'none'});
			$('.about-box[data-open='+ name +']').css({'display': 'block', 'opacity': 0});
			
			if(name == '1') {
				setTimeout(detect_cine_slide,100);
			}
			
			$('.about-box').stop().animate({'opacity': 1},200, 'linear', function(){
				$('.about-section').css({'height': 'auto'});
				if($(window).width() > 1100) { setTimeout(ScrollNiceT,100); }
			});
			detectBut();
			return false;
		});
        
        if($('.sub-tab.about li.current').length){
            viewPage($('.sub-tab.about li.current a').attr('data-name'));
        }else{
            $('.sub-tab.about li:first-child').addClass('current');
            viewPage($('.sub-tab.about li:first-child a').attr('data-name'));
        }
		/*if(window.location.hash) {
			LocationHash();
		}else {
			$('.sub-tab.about li:first-child a').trigger('click');
		}*/
        
        
		setTimeout(detect_cine_slide,800);
	}
	//FILM
	else if ($('#contact-page').length) {
		//$('.nav li:nth-child(8)').addClass('current');
		//$('.bottom-wrap li[data-name="contact"]').addClass('current');
	}
	detect_user_register_top();
	detect_user_login_top();
}

//LOAD SCHEDULE-LIST
function LoadSchedule(url, data) {
	
      $.ajax({url: url, type: "POST", data: data, cache: false, success: function(data) {
            
		   $('.schedule-load').append(data);
		   $('.schedule-load').stop().animate({'opacity': 1}, 1200, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
					$('.loadicon').remove();
               });

          });
	   }
  });
}

//LOAD SCHEDULE-DETAIL
function LoadScheduleDetail(url, data) {
	//console.log("=======", data);
      $.ajax({url: url, type: 'POST', data: data, cache: false, success: function(data) {
            
		   $('.schedule-block-load').append(data);
		   $('.schedule-block-load').stop().animate({'opacity': 1}, 1200, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
					$('.loadicon').remove();
               });

          });
	   }
  });
}


//LOAD PRICE
function LoadPrice(url, data) {
	
      $.ajax({url: url, type: "POST", data: data, cache: false, success: function(data) {
            
		   $('.cinema-price-load').append(data);
		   $('.cinema-price-load').stop().animate({'opacity': 1}, 1200, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
					$('.loadicon').remove();
               });
          });
		  	
			$('.cinema-price-item img').addClass('zoom-pic');
			ZoomPic();
	   }});
}


//LOAD NEWS-LIST
function NewsListLoad(url) {
    //alert(url);
	// console.log(url)
	$.ajax({url: url, cache: false, success: function(data) {
		   
		   $('.news-tab-wrap').children().remove();
		   $('.news-tab-wrap').append(data);
		   
		   
		    $("#news .news-item:hidden:lt("+ news_paging +")").each(function(){
				$(this).addClass('ready');
				$(this).find('img').attr('src', $(this).find('img').attr('data-src'));
				$(this).css({'display': 'block'});
			});
			set_masory();
			if($('#news .news-item').length > news_paging){ $('.view-more').css({'display': 'inline-block'}); }
			else{ $('.view-more').css({'display': 'none'});}
			
			function set_masory() {
				var count = 0;
				var finished = true;
				$("#news .news-item.ready:lt("+ news_paging +") img").load(function(){
					$(this).parents('.news-item').removeClass('ready');
					if(++count == news_paging) {
						$('.news-tab-wrap').css({'opacity':0});
						$('.news-tab-content').stop().animate({'opacity': 1}, 500, 'linear', function(){
							$('.news-tab-wrap').css({'opacity':1});
							$('#news').masonry({isFitWidth: true}); 
							setTimeout(function(){$('#news').masonry()}, 200);
							$('.loadicon').remove();
						});
						finished = false;
					}
				});
				if(finished) {
					$('.news-item').removeClass('ready');
					$('.news-tab-wrap').css({'opacity':0});
						$('.news-tab-content').stop().animate({'opacity': 1}, 500, 'linear', function(){
						$('.news-tab-wrap').css({'opacity':1});
						$('#news').masonry({isFitWidth: true}); 
						setTimeout(function(){$('#news').masonry()}, 200);
						$('.loadicon').remove();
					});
				}
			}
			detectBut();
	}});
}

//SET EVENTS COMMON [OR CAN SET ON READY DOCUMENT]
function Option() {

	$('.scroll-down-desktop').click(function(e){
	  e.preventDefault();
	  $('html, body').animate({scrollTop: $(window).height()}, 'slow');
	});
	var VideoShow = document.getElementById("video-about");
	
	function ShowVid(){
		VideoShow.play();
	}
	
	function HideVid(){
		VideoShow.pause();
	}
	
	//SHOW TRALLER FILM EVENT		  
	$('a.player, a.video-icon').click(function(e) {
		e.preventDefault();
		var idx = $(this).attr('href');
		$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
		$('html, body, .container').addClass('no-scroll');
		
		$('.overlay-video').fadeIn(500, 'linear', function() {
			VideoLoad(idx);
		});
		return false;
	});
	
	//SHOW TRALLER FILM EVENT [IF USE AJAX TO LOAD DATA]
	// $('.container').on('click','.trailler-btn',function(e){
	// 	e.preventDefault();
	// 	var idx = $(this).attr('href');
	// 	$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');
	// 	$('html, body, .container').addClass('no-scroll');
	//
	// 	$('.overlay-video').fadeIn(500, 'linear', function() {
	// 		VideoLoad(idx);
	// 	});
	// 	return false;
	// });
	
	//ZOOM IMAGE
   $('.zoom').click(function() {
        $('html, body, .container').addClass('no-scroll');
		$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
        $('.all-pics').css({'display': 'block'});
        $('.all-pics').append('<div class="full"  style="display:block"></div>');
        $('.overlay-dark').fadeIn(300, 'linear');
		
		var activePicLarge = $(this).parent().find('img').attr("src") || $(this).parent().find('img').attr("data-src");
		if($(window).width() > 760){
	       var newActive = activePicLarge.replace("_s", "_l");
		}else{
			var newActive = activePicLarge
		}
	  
	    $('.all-pics').find('.full').append('<img src ="'+(newActive)+'" alt="pic" />');
		
		
                 $('body').append('<div class="close-pics"></div>');
		         $('.all-pics').append('<div class="close-pics-small"></div>');
				 $('.all-pics').append('<div class="show-zoom"></div>'); 
		  
          $('.all-pics img').load(function() {
					  $('.all-pics').addClass('show');
			    
                    if ($(window).width() > 1100) { 
					        $('.all-pics.show').css({'background-image':'none'});
					        $('.full').addClass('dragscroll');
						    $('.dragscroll').draptouch();
					  }else{
						 if(isDesktop){ 
						   $('.all-pics.show').css({'background-image':'none'});
						   $('.full').addClass('dragscroll');
						    $('.dragscroll').draptouch()
						  } else if (version > 7500 && version < 8500) {
							   $('.all-pics.show').css({'background-image':'none'});
								detectZoom(); 
							 $('.full').addClass('dragscroll');
							 $('.dragscroll').draptouch();
						 }else{
							  $('.full img').addClass('pinch-zoom');
						    	$('.pinch-zoom').each(function () {
                                 new Pic.PinchZoom($(this), {});
                              });
						 }
						 
						 
					  	 
				 }
				 
				 
                 if($('.full img').length>1){
					$('.full img').last().remove()
				}
              
				$('.loadicon').fadeOut(400, 'linear', function() {
					 detectMargin(); 
                    $('.loadicon').remove();
					 $('.full img, .text-length').addClass('fade-in');
					
				});
				
				  
				
            });
			
			
		   $('.show-zoom').bind('click', function() {
				if(!$('.full img').hasClass('fullsize')){
					$('.all-pics .text-length').css({'z-index':'auto'});
					
				   if ($(window).width() <= 420) {
					  $('.full img').css({'max-width':'400%'}).addClass('fullsize');
				   }else  if ($(window).width() > 420 && $(window).width() <= 620) {
					  $('.full img').css({'max-width':'300%'}).addClass('fullsize');
				   }else{
					  $('.full img').css({'max-width':'inherit'}).addClass('fullsize');
				   }
				     $('.full').removeClass('lock');
				    detectMargin();
				}else{
					 $('.all-pics .text-length').css({'z-index':9998});
					 $('.full img').css({'max-width':'100%'}).removeClass('fullsize');
					 $('.full').addClass('lock');
					  detectMargin();
				}
				  $('.loadicon').remove();
				 return false;
		 });	

        $('.close-pics, .close-pics-small').click(function() {
			$('.loadicon').remove();
            $('.full, .close-pics, .close-pics-small').fadeOut(300, 'linear');
            $('.overlay-dark').fadeOut(300, 'linear', function() {
                $('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
                $('.close-pics, .close-pics-small').remove();
                $('.all-pics').css({'display':'none'}).removeClass('show');
				$('html, body, .container').removeClass('no-scroll');
				
            });
			
        });
        return false;
    });

 
 $(document).bind('scroll', function() {
	 
      var windscroll = $(document).scrollTop();
	  var banner = $('.slider-home').height();
			
			
        if ($(window).width() <= 1100) {
		    if (windscroll >= 100) {
                $('.scroll-down').fadeOut(500, 'linear');
				$('.header').addClass('hide-m');
				$('.nav-click').addClass('hide-m');
            } else {
                $('.scroll-down').fadeIn(500, 'linear');
				$('.header').removeClass('hide-m');
				$('.nav-click').removeClass('hide-m');
            }  
			
			if(windscroll > ($('.order-title').height() - 60)){
				$('.cons-top').addClass('fix_level');
			}else{
				$('.cons-top').removeClass('fix_level');
			}
			
		} else {
			if(windscroll > 50) {
				//if($('.block-user .tab-register').css('display') == 'none' && $('.block-user .tab-login').css('display') == 'none') {
					//$('.register-content').addClass('hide');
				//}
				$('.header').addClass('hide');
			}else {
				//$('.header, .register-content').removeClass('hide');
				$('.header').removeClass('hide');
			}
		}
		if(windscroll > $(window).height()) {
		  $('.go-top').css({'display':'block', 'opacity':1});
	    }else {
		  $('.go-top').css({'display':'none', 'opacity':0});
	    }
		
	   if(windscroll >= 50){
		  if ($(window).width() > 1100) {
			$('.scroll-down-desktop').removeClass('fadeon').addClass('fadeoff');
		   }else{
			   if( !$('.register-content').hasClass('showbox')){
			     $('.register-content').addClass('off'); 
			   }
		   }
		    $('.user-people').addClass('off'); 
	  	}else if(windscroll < 50){
		  if ($(window).width() > 1100) {
			  $('.scroll-down-desktop').removeClass('fadeoff').addClass('fadeon');
		  }else{
			   if( !$('.register-content').hasClass('showbox')){
			   $('.register-content').removeClass('off'); 
			  }
		  }
		    $('.user-people').removeClass('off'); 
	   }
	   
	   
	});
}

function AlbumLoad(url, index) {
    $.ajax({url: url, cache: false, success: function(data) {
            $('.all-album').append(data);
			
			$('.album-pic-center').css({'height':$(window).height()});
            $(".pic-name > h3").lettering('words').children("span").lettering().children("span").lettering();
			
	    
			  $('.album-center').BTQSlider({
					   singleItem : true,
					   pagination : false,
					   rewindNav: false,
					   lazyLoad : true,
			           lazyEffect : "fade",
					   slideSpeed: 600,
                       paginationSpeed: 600,
                       afterAction: function(el){
					     this.$BTQItems.removeClass('show-active');
						 this.$BTQItems.eq(this.currentItem).addClass('show-active');
						 detectBut();
						 addText();
					   }
					});
				 
				 function addText() {
					 clearTimeout(timex);
					 $('.pic-name').removeClass('move');	
					 $('.pic-name h3').children().children().removeClass('move');
					 $('.slide-item.show-active').find('.pic-name').addClass('move');
					   $('.move h3').children().children().each(function(i){
						var box = $(this);
						var timex = setTimeout(function(){$(box).addClass('move')}, (i+1) * 100);
					   });
				}
				$('.album-center').trigger('BTQ.goTo', index);
				
			    $('.next-pic').click(function(){
				  $('.album-center').trigger('BTQ.next');
				   });
				   
				$('.prev-pic').click(function(){
				   $('.album-center').trigger('BTQ.prev');
				});
				
				if(!isTouchDevice){
				 $('.album-center').on('mousewheel', '.slide-wrapper ', function (e) {
					if (e.deltaY>0) {
						 if (!doWheel) {
				          return;
			            }
			           doWheel = false;
					  $('.album-center').trigger('BTQ.prev');
					  setTimeout(turnWheelTouch, 610);
				   } else {
					    if (!doWheel) {
				         return;
			             }
			           doWheel = false;
                  
						  $('.album-center').trigger('BTQ.next');
					 setTimeout(turnWheelTouch, 610);
					
				  }
					 e.preventDefault();
				 });	
				}
				
			 $('.all-album').stop().animate({'opacity':1}, 100, 'linear', function() {
				 if ($('.album-pic-center').length > 1) {
                    $('.slide-pic-nav').css({'display': 'block'});
                  }
			  });

            $('.album-load').fadeIn(800, 'linear', function() {
					 $('.loadicon').fadeOut(300, 'linear', function() {
                      $('.loadicon').remove();
                     });
            });
			
		
		     $('.close-album').click(function() {
				 isAlbum = 0;
                $('.all-album').fadeOut(500, 'linear', function() {
                    $('.album-load').remove();
                });
                $('.overlay-album').animate({'height': '0%'}, 600, 'easeOutExpo', function() {
                    $('.overlay-album').css({'display': 'none'});
                });
                 
				 $('html, body, .container').removeClass('no-scroll');
                return false;
            });
			   
			      if($(window).width() <= 620){
					    $('.album-pic-center img').addClass('zoom-pic');
					 }else{
						 $('.album-pic-center img').removeClass('zoom-pic');
					 }
               
				 ZoomPic();
				 

        }
    });
}


//ZOOM IMAGE ON PAGE IF IMAGE HAVE CLASS ZOOM-PIC
function ZoomPic() {

   $('img').click(function() {
	   if($(window).width() <= 1100 && $(this).hasClass('zoom-pic')){
        $('html, body, .container, .center').addClass('no-scroll');
		$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
        $('.all-pics').css({'display': 'block'});
        $('.all-pics').append('<div class="full"  style="display:block"></div>');
        $('.overlay-dark').fadeIn(300, 'linear');
		var activePicLarge = $(this).attr("src");
	   
	     $('.all-pics').find('.full').append('<img src ="'+(activePicLarge)+'" alt="pic" />');
		 $('body').append('<div class="close-pics"></div>');
		 $('.all-pics').append('<div class="close-pics-small"></div>'); 
		 $('.all-pics').append('<div class="show-zoom"></div>');
		  
          $('.all-pics img').load(function() {
			      
					$('.all-pics').addClass('show');
				
				
                    if ($(window).width() > 1100) { 
					        $('.all-pics.show').css({'background-image':'none'});
					        $('.full').addClass('dragscroll');
						    $('.dragscroll').draptouch();
					 }else{
						     
						 if(isDesktop){ 
						   $('.all-pics.show').css({'background-image':'none'});
						   $('.full').addClass('dragscroll');
						   $('.dragscroll').draptouch();
						  } else if (version > 7500 && version < 8500) {
                              $('.all-pics.show').css({'background-image':'none'});
								 detectZoom(); 
							  $('.full').addClass('dragscroll');
							  $('.dragscroll').draptouch();
						   
						 }else{
							  $('.full img').addClass('pinch-zoom');
						    	$('.pinch-zoom').each(function () {
                                 new Pic.PinchZoom($(this), { });
								 
                               });
						 }
						 
						 
						 
				 }
				 
				 
                 if($('.full img').length>1){
					$('.full img').last().remove();
				    $('.full, .close-pics, .show-zoom, .close-pics').last().remove();
				 }
				
              
				$('.loadicon').fadeOut(400, 'linear', function() {
					 detectMargin(); 
                    $('.loadicon').remove();
					  $('.full img, .text-length').addClass('fade-in');
				});
				
				   
				
            });
			
			
		  $('.show-zoom').bind('click', function() {
				if(!$('.full img').hasClass('fullsize')){
					$('.all-pics .text-length').css({'z-index':'auto'});
					
				   if ($(window).width() <= 420) {
					  $('.full img').css({'max-width':'400%'}).addClass('fullsize');
				   }else  if ($(window).width() > 420 && $(window).width() <= 620) {
					  $('.full img').css({'max-width':'300%'}).addClass('fullsize');
				   }else{
					  $('.full img').css({'max-width':'inherit'}).addClass('fullsize');
				   }
				    
				     $('.full').removeClass('lock');
				    detectMargin();
				}else{
					 $('.all-pics .text-length').css({'z-index':9998});
					 $('.full img').css({'max-width':'100%'}).removeClass('fullsize');
					 
					 $('.full').addClass('lock');
					  detectMargin();
				}
				  $('.loadicon').remove();
			 return false;
		 });	


        $('.close-pics, .close-pics-small').click(function() {
			$('.loadicon').remove();
            $('.full, .close-pics, .close-pics-small').fadeOut(300, 'linear');
            $('.overlay-dark').fadeOut(300, 'linear', function() {
                $('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
                $('.close-pics, .close-pics-small').remove();
				

				$('.all-pics').css({'display':'none'}).removeClass('show');  
				
				if(isAlbum == 0) {
					$('html, body, .container, .center').removeClass('no-scroll');
				}
            });
        });
		
	  }
        return false;
    });
}

//ZOOM IMAGE FOR SMALL SLIDESHOWS
function ZoomPicAll() {
 	$('img.zoom-pic-all').click(function() {
		
		$('html, body, .container, .center').addClass('no-scroll');
		$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
		$('.all-pics').css({'display': 'block'});
		$('.all-pics').append('<div class="full"  style="display:block"></div>');
		$('.overlay-dark').fadeIn(300, 'linear');
		var activePicLarge = $(this).attr("src");
		
		$('.all-pics').find('.full').append('<img src ="'+(activePicLarge)+'" alt="pic" />');
		$('body').append('<div class="close-pics"></div>');
		$('.all-pics').append('<div class="close-pics-small"></div>'); 
		$('.all-pics').append('<div class="show-zoom"></div>');
		  
		$('.all-pics img').load(function() {
		
			$('.all-pics').addClass('show');
			
			if ($(window).width() > 1100) { 
				$('.all-pics.show').css({'background-image':'none'});
				$('.full').addClass('dragscroll');
				$('.dragscroll').draptouch();
			}else{
				if(isDesktop){ 
					$('.all-pics.show').css({'background-image':'none'});
					$('.full').addClass('dragscroll');
					$('.dragscroll').draptouch();
				}else if (version > 7500 && version < 8500) {
					$('.all-pics.show').css({'background-image':'none'});
					detectZoom(); 
					$('.full').addClass('dragscroll');
					$('.dragscroll').draptouch();
				}else{
					$('.full img').addClass('pinch-zoom');
					$('.pinch-zoom').each(function () {
						new Pic.PinchZoom($(this), { });
					});
				}
			}
			if($('.full img').length>1){
				$('.full img').last().remove();
				$('.full, .close-pics, .show-zoom, .close-pics').last().remove();
			}
			$('.loadicon').fadeOut(400, 'linear', function() {
				detectMargin(); 
				$('.loadicon').remove();
				$('.full img, .text-length').addClass('fade-in');
			});
		});
		
		$('.show-zoom').bind('click', function() {
			if(!$('.full img').hasClass('fullsize')){
				$('.all-pics .text-length').css({'z-index':'auto'});
				
				if ($(window).width() <= 420) {
					$('.full img').css({'max-width':'400%'}).addClass('fullsize');
				}else  if ($(window).width() > 420 && $(window).width() <= 620) {
					$('.full img').css({'max-width':'300%'}).addClass('fullsize');
				}else{
					$('.full img').css({'max-width':'inherit'}).addClass('fullsize');
				}
				$('.full').removeClass('lock');
				detectMargin();
			}else{
				$('.all-pics .text-length').css({'z-index':9998});
				$('.full img').css({'max-width':'100%'}).removeClass('fullsize');
				$('.full').addClass('lock');
				detectMargin();
			}
			
			$('.loadicon').remove();
			return false;
		});	
		
		$('.close-pics, .close-pics-small').click(function() {
			$('.loadicon').remove();
			$('.full, .close-pics, .close-pics-small').fadeOut(300, 'linear');
			
			$('.overlay-dark').fadeOut(300, 'linear', function() {
				$('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
				$('.close-pics, .close-pics-small').remove();
				$('.all-pics').css({'display':'none'}).removeClass('show'); 
				if(isAlbum == 0) { $('html, body, .container, .center').removeClass('no-scroll');}
			});
		});
		
        return false;
    });
}

//ZOOM IMAGE FOR BANNER SLIDESHOWS
function ZoomPicSlide() {
	
		$('img.zoom-pic-slide').click(function() {
			if($(window).width() <= 1100) {
			$('html, body, .container, .center').addClass('no-scroll');
			$('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
			$('.all-pics').css({'display': 'block'});
			$('.all-pics').append('<div class="full"  style="display:block"></div>');
			$('.overlay-dark').fadeIn(300, 'linear');
			var activePicLarge = $(this).attr("src");
			
			$('.all-pics').find('.full').append('<img src ="'+(activePicLarge)+'" alt="pic" />');
			$('body').append('<div class="close-pics"></div>');
			$('.all-pics').append('<div class="close-pics-small"></div>'); 
			$('.all-pics').append('<div class="show-zoom"></div>');
			  
			$('.all-pics img').load(function() {
			
				$('.all-pics').addClass('show');
				
				
					if(isDesktop){ 
						$('.all-pics.show').css({'background-image':'none'});
						$('.full').addClass('dragscroll');
						$('.dragscroll').draptouch();
					}else if (version > 7500 && version < 8500) {
						$('.all-pics.show').css({'background-image':'none'});
						detectZoom(); 
						$('.full').addClass('dragscroll');
						$('.dragscroll').draptouch();
					}else{
						$('.full img').addClass('pinch-zoom');
						$('.pinch-zoom').each(function () {
							new Pic.PinchZoom($(this), { });
						});
					}
				
				if($('.full img').length>1){
					$('.full img').last().remove();
					$('.full, .close-pics, .show-zoom, .close-pics').last().remove();
				}
				$('.loadicon').fadeOut(400, 'linear', function() {
					detectMargin(); 
					$('.loadicon').remove();
					$('.full img, .text-length').addClass('fade-in');
				});
			});
			
			$('.show-zoom').bind('click', function() {
				if(!$('.full img').hasClass('fullsize')){
					$('.all-pics .text-length').css({'z-index':'auto'});
					
					if ($(window).width() <= 420) {
						$('.full img').css({'max-width':'400%'}).addClass('fullsize');
					}else  if ($(window).width() > 420 && $(window).width() <= 620) {
						$('.full img').css({'max-width':'300%'}).addClass('fullsize');
					}else{
						$('.full img').css({'max-width':'inherit'}).addClass('fullsize');
					}
					$('.full').removeClass('lock');
					detectMargin();
				}else{
					$('.all-pics .text-length').css({'z-index':9998});
					$('.full img').css({'max-width':'100%'}).removeClass('fullsize');
					$('.full').addClass('lock');
					detectMargin();
				}
				
				$('.loadicon').remove();
				return false;
			});	
			
			$('.close-pics, .close-pics-small').click(function() {
				$('.loadicon').remove();
				$('.full, .close-pics, .close-pics-small').fadeOut(300, 'linear');
				
				$('.overlay-dark').fadeOut(300, 'linear', function() {
					$('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
					$('.close-pics, .close-pics-small').remove();
					$('.all-pics').css({'display':'none'}).removeClass('show'); 
					if(isAlbum == 0) { $('html, body, .container, .center').removeClass('no-scroll');}
				});
			});
			
			}
			
			return false;
		});
	
}


function detectMargin() {
var ImgW = $('.full').children().width();
var ImgH = $('.full').children().height();
var Yheight = $(window).height();
var Xwidth = $(window).width();

	if (Xwidth > ImgW) {
		  $('.full').children().css({'margin-left': Xwidth / 2 - ImgW / 2});
	  } else {
		  $('.full').children().css({'margin-left': 0});
	  }
	  if (Yheight > ImgH) {
		  $('.full').children().css({'margin-top': Yheight / 2 - ImgH / 2});
	  } else {
		  $('.full').children().css({'margin-top':  0});
	  }
}
function detectZoom() {
  var ImgW = $('.full img').width();
  var ImgH = $('.full img').height();
  var Yheight = $(window).height();
  var Xwidth = $(window).width();
  if(ImgW > Xwidth){
	$('.show-zoom').addClass('show');
    $('.full img').addClass('fullsize');
  }else{
    $('.full img').removeClass('fullsize');
  }
}
function detectHeight() {
 if ($(window).width() <= 1100) {	
  var DH = $(document).innerHeight();
  if(DH > $(window).height() + 100){
	$('.scroll-down').css({'display':'block', 'opacity':1});
  }else{
	$('.scroll-down').css({'display':'none', 'opacity':0});
  }
 }
}


function turnWheelTouch(){
	doWheel = true;
	doTouch = true;
}  

function detectBut() {
	
	if($('.album-pic-center').length){
	  if ($('.show-active:first-child').hasClass('show-active')) {
		  $('.prev-pic').addClass('disable');
		
	  } else {
		  $('.prev-pic').removeClass('disable');
		 

	  }
	  if ($('.show-active:last-child').hasClass('show-active')) {
		 $('.next-pic').addClass('disable');
		
	  } else {
		 $('.next-pic').removeClass('disable');
		
	  }	
	}
	//add more
	var Percent = $(window).width()/100 * 10;
	if($('.sub-tab').length){
		$('.sub-tab').scrollLeft(0);  
		var Left  = $('.sub-tab').offset().left;
		var XLeft = $('.sub-tab li.current').offset().left;
		var Center =  ($(window).width() - Percent)/2 - $('.sub-tab li.current').width()/2;
		$('.sub-tab').stop().animate({scrollLeft:  (XLeft-Center) - Left},  300, 'linear');
	}
  
}
$(document).ready(function() {
	$('.opera').css({width: $(window).width()});
    $('.copyright img').click(function(){
        var url = $(this).closest('a').attr('href');
        window.open(url, '_blank');
    });
    
    if($('.btn-logout').length >0) isLogin = true;
	$('.register-content').append('<div class="hover-box"></div>');
    BASE_URL = $('#BASE_URL').val();
	//document.getElementById('register').reset();
	//document.getElementById('modify').reset();
	//document.getElementById('login').reset();
	//document.getElementById('forgot').reset();
	
	//document.getElementById('register-top').reset();
	//document.getElementById('modify-top').reset();
	//document.getElementById('login-top').reset();
	//document.getElementById('forgot-top').reset();
	
    $('#qsearch').keyup(function(e){
        var qsearch = $(this).val();
		if(qsearch.length<2){
			return false;
		}
		if(e.keyCode == 13) {
			window.location = BASE_URL +'timkiem?q='+ encodeURIComponent(qsearch);
		}
	});
    $('.search-form .search').click(function(e){
		e.preventDefault();
		var qsearch = $('#qsearch').val();
		var defaultvalue = $('#defaultvalue').val();
		if(qsearch.length<2){
			return false;
		}
		if(qsearch==defaultvalue){
			return false;
		}
		window.location = BASE_URL +'timkiem?q='+ encodeURIComponent(qsearch);
		
		return false;
	});


	$('.ticket-num input').val('0');

	$('.container').click(function(e) {

		  if(!$(e.target).hasClass('movie-pic')) {
			$('.movie-item.show').removeClass('show').addClass('hide');
		  }
		  $('.nav-click').removeClass('active');
		  //$('.nav li').removeClass('active');
		  $('.overlay-menu, .top, .logo, .header').removeClass('show');
		  $('html, body, .container').removeClass('no-scroll');
	 });
	 $('.overlay-menu').click(function() {
			if ($(window).width() <= 1100) {
				Scroll = 0;
				$('.nav-click').removeClass('active');
				$('.overlay-menu, .top, .logo, .header').removeClass('show');  
				$('html, body, .container').removeClass('no-scroll');
			}
	 });
	 
	$('.go-top').click(function() {
        $('html, body').stop().animate({scrollTop: 0}, 'slow');
     });
	 $('.logo, .logo-mb, .logo-footer').click(function(e) {
		e.preventDefault();
		$('.link-home').trigger('click');
	});
	
	
//////////////////USER EVENT ON TOP/////////////////////////////////
	$('.btn-register a').on('click',function(e){                
		e.preventDefault();
        //neu da login thi hien thi thong tin thanh vien
        var $this = $(this);
        if($(this).parent().hasClass('btn-userinfo')){
            $('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
            $('html, body, .container').addClass('no-scroll');
             $(".overlay-dark").fadeIn(500, 'linear', function(){
                   LoadUser(BASE_URL + "thongtinthanhvien");	
            });
            return false;
        }
        
		detect_user_register_top();
		
		$(this).parent().parent().parent().parent().addClass('showbox');
		$('.register-wrap ul li').removeClass('active');
		if($('.tab-register').css('display') == 'block') {
				$('.block-user .tab-register').css({'display': 'none'});
		} else {
			$(this).parent().addClass('active');
			$('.block-user .tab-login').css({'display': 'none'});
			$('.block-user .register').css({'display':'block'});
			$('.block-user .modify').css({'display':'none'});
			$('.block-user .tab-register').css({'display': 'block', 'opacity':0});
			$('.block-user .tab-register').stop().animate({'opacity': 1},150,'linear');
		}
		return false;
	});
	
	$('.btn-login a').on('click',function(e){
        var $this = $(this);
        if($(this).parent().hasClass('btn-logout')){
            getPage(BASE_URL + 'dangxuat', 'POST', {}, function(data){
                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });
                data = JSON.parse(data);
                if(data.status==200){
                    isLogin=false;
                    //change text
                    $this.parent().removeClass('btn-logout');
                    
                    var tmp = $this.text();
                    $this.text($this.attr('data-tmp'));
                    $this.attr('data-tmp', tmp);
                    
                    $('.register-content .btn-register').removeClass('btn-userinfo');
                    tmp = $('.register-content .btn-register a').text();
                    $('.register-content .btn-register a').text($('.register-content .btn-register a').attr('data-tmp'));
                    $('.register-content .btn-register a').attr('data-tmp', tmp);


                    $('body').append('<div  class="contact-success color-blue">Đăng xuất thành công.</div>');
                    setTimeout(hidemsg,5000);
                }else{
                    $('body').append('<div  class="contact-success color-blue">Có lỗi trong quá trình xử lý vui lòng thử lại.</div>');
                    setTimeout(hidemsg,5000);
                }                
            });
            return false;
        }
		e.preventDefault();
		detect_user_login_top();
		
		$(this).parent().parent().parent().parent().addClass('showbox');
		$('.register-wrap ul li').removeClass('active');
		if($('.tab-login').css('display') == 'block') {
				$('.block-user .tab-login').css({'display': 'none'});
		}else {
			$(this).parent().addClass('active');
			$('.block-user .tab-register').css({'display': 'none'});
			$('.block-user .tab-login').css({'display': 'block', 'opacity':0});
			$('.block-user .user-form.forgot').css({'display': 'none'});
			$('.block-user .user-form.login').css({'display': 'block'});
			$('.block-user .tab-login').stop().animate({'opacity': 1},150,'linear');
			
		}
		return false;
	});
	
	$('.hover-box, .header').on( 'click mouseenter', function(){
			$('.register-wrap ul li').removeClass('active');
			$('.block-user .tab-register, .block-user .tab-login').fadeOut(200);
			$('.register-content').removeClass('showbox');
	 });
	 
	 $('.tab-login .input-but input[type="button"]').on( 'click', function(){
		/*$('.register-wrap ul li').removeClass('active');
		$('.block-user .tab-register, .block-user .tab-login').fadeOut(200);
		$('.register-content').removeClass('showbox');*/
	  });

	   
	
	$('#btn-save-top').click(function(){
		$('html, body').stop().animate({scrollTop: 0}, 150, 'linear', function(){});
		$('#btn-login-top').trigger('click');
	});
	
	
	$('.user-people a').click(function(e){
		e.preventDefault();
		 var url = $(this).attr('href');
		 $('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');	
		 $('html, body, .container').addClass('no-scroll');
		  $(".overlay-dark").fadeIn(500, 'linear', function(){
				LoadUser(url)		
		 });
		
		
	});
	
	
///////////////////CART EVENTS FOR ALLL PAGE//////////////////////////////////
	$('.cart-wrap .select-header').click(function(){
		var that = $(this);
		if($(this).hasClass('onclick')) {
			$(this).removeClass('onclick');
			$(this).next('.select-box').fadeOut(200, 'linear');
		}else {
			that.addClass('onclick');
			$(this).next('.select-box').fadeIn(200, 'linear');
			
			$(this).closest('.select-list').on("mouseleave", function() {
				$(this).find('.select-box').fadeOut(200, 'linear');
				that.removeClass('onclick');
			});
			
		}
	});
    $(document).on( "click", ".cart-wrap .select-box li a", function(e){
		e.preventDefault();
		var cate = $(this).parents('.select-list').attr('data-cate');
		var movie_id = $(this).attr('data-id');
		var theater_id = $(this).attr('data-value');
		var date = $(this).attr('data-date');
        
		$(this).parent().parent().find(' > li').removeClass('selected');
		$(this).parent().addClass('selected');
		$(this).parents('.select-list').find('.select-header h3').text($(this).text());
		$(this).closest('.select-box').fadeOut(200, 'linear');
		//movie.movie_img = $(this).attr('data-img');
		if(cate == 'film') {
            //
            getPage(BASE_URL + "gettheaterbymovie", "POST", {id:movie_id}, function(data){
                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });
                data = JSON.parse(data);
				// console.log(data, "===============")
                $('.select-list[data-cate="cine"] .select-box ul').html("");
                $('.select-list[data-cate="day"] .select-box ul').html("");
                $.each( data, function( key, value ) {
                    $('.select-list[data-cate="cine"] .select-box ul').append('<li class="show" ><a href="javascript:void(0);" data-value="'+value.ID+'"><h3>'+value.NAME+'</h3></a></li>');
                });
                resetForm();
                //$('.select-list[data-cate="cine"] .select-box li').first().find('> a').trigger('click');                    
            });
            
            /*
			resetForm();
			sortDataFilm($(this));*/
		}
        else if(cate == 'cine'){

            var params = {
                movie_id: $('.select-list[data-cate="film"] .select-box ul li.selected a').attr('data-id'),
                theater_id: theater_id
            };
			movie.theater_id = theater_id;
            getPage(BASE_URL + "getdate", "POST", params, function(data){
                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });
                data=JSON.parse(data);
                $('.select-list[data-cate="day"] .select-box ul').html("");
                $.each( data, function( key, value ) {
//                    console.log(key, value);
                    $('.select-list[data-cate="day"] .select-box ul').append('<li class="show" ><a href="javascript:void(0);" data-date="'+value.value+'"><h3>'+value.name+'</h3></a></li>');
                });
                
                /*
                $('.select-list[data-cate="day"] .select-box').html(data);
                $('.block-list').addClass('is-'+$('.select-list[data-cate="film"] .select-box ul li.selected a').attr('data-format'));
                //<li class="show" ><a href="javascript:void(0);" data-date="<?php echo $item['value'];?>"><h3><?php echo $item['name'];?></h3></a></li>
                */
            });
        }
		else if(cate == 'day') {
            //cart/getShowTimes
            var params = {
                movie_id: $('.select-list[data-cate="film"] .select-box ul li.selected a').attr('data-id'),
                theater_id: $('.select-list[data-cate="cine"] .select-box ul li.selected a').attr('data-value'),
                date: date,
                format: $('.select-list[data-cate="film"] .select-box ul li.selected a').attr('data-format')
            };
            getPage(BASE_URL + "getshowtimes", "POST", params, function(data){
                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });

                $('.select-list[data-cate="hour"] .select-box').html(data);
                $('.block-list').addClass('is-'+$('.select-list[data-cate="film"] .select-box ul li.selected a').attr('data-format'));
            });
            
			/*$('.block-list').removeClass('is-2d').removeClass('is-3d')
			var l_class = 'is-' + $('.select-list[data-cate="film"] li.selected a').attr('film-ref');
			$('.block-list').addClass(l_class);*/
		}
		else if(cate == 'hour') { //IF HOUSE LIST IS CHOSE WILL OPEN ODER POPUP
			if($(this).parent().hasClass('disable-time')) return false;
			var l_film = $('.select-list[data-cate="film"] .select-box li.selected a');
			var l_cine = $('.select-list[data-cate="cine"] .select-box li.selected a');
			var l_day  = $('.select-list[data-cate="day"] .select-box li.selected a');
			movie.showtimes_id = $(this).attr('data-id');
			/*window.location = 'http://www.123phim.vn/checkout?merchantCode=16&cinemaCode=' + movie.theater_id + '&sessionCode='  + movie.showtimes_id;
            //window.location = 'http://123phim.vn/checkout/cinestar?sessionCode=' + movie.showtimes_id;
            return false;
			*/
            movie.room_name = $(this).attr('data-room-name');
			movie.movie_img  = l_film.attr('data-img');
			movie.movie_name = l_film.text();
			movie.movie_type= l_film.attr('data-format');
			
			movie.cinema_id = parseInt(l_cine.attr('data-value'));
			movie.cinema_name = l_cine.text();
			
			movie.movie_date = l_day.attr('data-date');
			
			movie.movie_hour = $(this).text();

			order();
		}
		var _class = 'is-' + cate;
		$('.block-list').addClass(_class);
		return  false;
	});
	
	
////////////////////////////////// ORDER POPUP EVENTS///////////////////////////////////

 	//close popup
	$('.close-order').click(function(){
        //clear
        stopClick = true;
		myClock.setTime(timeClock);
		myClock.stop();
		
		movie.chair_num = 0;
		$('.seat-number').html('');
		$('.cinema-seat td').removeClass('choosing');
        //=======
		$('.container').css({'height': 'auto', 'overflow-y': 'auto', 'opacity': 1});
		$('.cinema-wrap').css({'opacity': 1});
		$('.section-order').stop().animate({'height':0}, 200, 'linear', function(){});
		$('.block-list').removeClass('is-film');
		$('.cart-wrap .select-box li').removeClass('selected');
		var filmH = $('.select-list[data-cate="film"] .select-header h3').attr('data-holder');
		$('.select-list[data-cate="film"] .select-header h3').html(filmH);
		resetForm();
		resetOrder();	
	});
	
	
	
	
	
///////////////////TICKET EVENTS//////////////////////
	//addd ticket
	$(document).on('click','.add', function(e) {
		e.preventDefault();
		var totalSeat = 0;
		$('.ticket-num input').each(function(i, obj) { 
			totalSeat += parseInt($(obj).val());
		});

		if(totalSeat >= 8){
			alert("Vui lòng chọn tối đa 8 ghế.");
			return false;
		}

		var row =  $(this).parent().parent();
		// console.log(row.attr('data-seatstyle-id'), "row.attr('data-seatstyle-id')");
		var isDouble = row.attr('data-seatstyle-id') == 30 ? 1 : 0;
		isDouble = (isDouble === 0 && row.attr('data-ticket-id') == 27) ? -1: isDouble;
		cal_total_on_row(row,'asc', isDouble);
        var key = row.attr('data-seatstyle-id')+"_"+row.attr('data-ticket-id');
        var val = parseInt(row.find('.ticket-num input').val());
        if(val==0 && movie.pseats.hasOwnProperty(key)){
            delete movie.pseats[key];
		} else {
            movie.pseats[key] = val;
		}
        return false;
	});
	//minus ticket
	$(document).on('click', '.minus', function(e) {
		e.preventDefault();
		
		var row =  $(this).parent().parent();
		// console.log(row.attr('data-seatstyle-id'), "row.attr('data-seatstyle-id')");
		var isDouble = row.attr('data-seatstyle-id') == 30 ? 1 : 0;
		isDouble = (isDouble === 0 && row.attr('data-ticket-id') == 27) ? -1: isDouble;
		cal_total_on_row(row,'des', isDouble);
        var key = row.attr('data-seatstyle-id')+"_"+row.attr('data-ticket-id');
        var val = parseInt(row.find('.ticket-num input').val());
        if(val==0 && movie.pseats.hasOwnProperty(key)){
            delete movie.pseats[key];
        } else {
            movie.pseats[key] = val;
        }
        return false;
	});
	//ticket number keyup
	 $('.ticket-num input[type="text"]').each(function(){
        var txtval = $(this).val();
        $(this).focus(function(){
            if($(this).val() == txtval){
                $(this).val('')
            }
        });
        $(this).blur(function(){
            if($(this).val() == ""){
                $(this).val(txtval);
            }
        });
     });
	 $(document).on('keyup', '.ticket-num input', function(){
		var str=this.value;
		var charsAllowed="0123456789";
		var allowed;
		for(var i=0;i<this.value.length;i++){
			allowed=false;
			for(var j=0;j<charsAllowed.length;j++){
				if( this.value.charAt(i)==charsAllowed.charAt(j) ){ allowed=true; }
			}
			if(allowed==false){ this.value = this.value.replace(this.value.charAt(i),""); i--; }
		}
		return true;
	 });
	 $(document).on('keydown', '.ticket-num input', function(e) {
        if (e.keyCode == 13) {
            var row =  $(this).parent().parent();
			var isDouble = row.attr('data-seatstyle-id') == 30 ? 1 : 0;
			isDouble = (isDouble === 0 && row.attr('data-ticket-id') == 27) ? -1: isDouble;
		    cal_total_on_row(row,'on', isDouble);
        }
     });
	  
	//back
	$(document).on('click', '#ticket-back', function (){
		$('.container').css({'height': 'auto', 'overflow-y': 'auto','opacity': 1});
		
		$('.section-order').stop().animate({'height': 0}, 200, 'linear', function(){
			resetForm();
			resetOrder();
			
		});
	});
	//next cinema-next
	$(document).on('click', '#ticket-next', function() {
		if (movie && movie.pseats && movie.pseats['29_27'] && movie.pseats['29_27'] > 0) {
			const mess = 'Giá vé này chỉ áp dụng cho Học Sinh Sinh Viên. Phải xuất trình thẻ HSSV khi thanh toán tại quầy. Nếu không xuất trình được thẻ HSSV, bạn sẽ không được hoàn tiền và hủy vé theo quy định của rạp!';
			if (confirm(mess) != true) {
				return;
			}
		}
        //lay danh sach ghe
        //order/getSeat
        getPage(BASE_URL + 'getseat', 'POST', { cinema_id: movie.theater_id, showtimes_id: movie.showtimes_id, room_name: movie.room_name, theater_name: movie.cinema_name}, function(data){
            $('.loadicon').fadeOut(300, 'linear', function() {
                $('.loadicon').remove();
            });
            $('#cinema-content').html(data);
            
            myClock.start();
            $('.ticket-content').css({'display': 'none'});
            $('.cinema-seat').css({'display': 'none'});
            $(document).find('div.cinema-seat').css({'display': 'block'});
    //		$('.cinema-seat[data-cine="'+ movie.cinema_id +'"]').css({'display': 'block'});
            $('.cinema-content').css({'display': 'block', 'opacity': 0});
            $('.section-order').css({'height': 'auto'});

            $('.cinema-content').stop().animate({'opacity': 1}, 500, 'linear', function(){
			//Q add
				$('.opera').css({width: $(window).width()});
				$('.cons-icon').addClass('show');
			});
        });
	});
	
///////////////////CHOOSE CHAIR EVENTS//////////////////////
    //$('.cinema-seat').on('click', '.single, .couple',function() {
    $(document).on('click', '.single, .couple',function() {
        var seatId = $(this).attr('data-seat');//
        var select = 1;
        var ref = $(this).attr('data-seat');
        if($('.seat-number span[seat-ref='+ ref +']').length){
            select = 0;
        }
        var seatName = $(this).text();
        var $this = $(this);
		// rap 7 dalat
		if ($this.attr('data-type-seat-id') && !$this.hasClass('choosing') ) {
			const typeSeatId = $this.attr('data-type-seat-id');
			const oSeatSelected = {};
			const aSeatSelected = [];
			let typeSeatIdSelected;
			Object.keys(movie.pseats).forEach(function(k){
				typeSeatIdSelected = k.match(/^([^_]*)_/)[1];
				oSeatSelected[`key_${typeSeatIdSelected}`] = oSeatSelected[`key_${typeSeatIdSelected}`] ? oSeatSelected[`key_${typeSeatIdSelected}`] + movie.pseats[k] : movie.pseats[k];
				aSeatSelected.push(typeSeatIdSelected);
			});

			if(!aSeatSelected.includes(typeSeatId)) {
				alert('Bạn không có mua ghế loại này (nên không thể chọn ghế)!');
				return;
			}

			// const setSelected = oSeatSelected[`key_${typeSeatId}`]
			if (  $('.single.choosing[data-type-seat-id='+ typeSeatId +']').length >= oSeatSelected[`key_${typeSeatId}`]) {
				alert('Bạn đã chọn đủ ghế loại này (nên không thể chọn ghế)!');
				return;
			}
			if (  $('.couple.choosing[data-type-seat-id='+ typeSeatId +']').length >= oSeatSelected[`key_${typeSeatId}`]) {
				alert('Bạn đã chọn đủ ghế loại này (nên không thể chọn ghế)!');
				return;
			}
		}
		//chon ghe thanh cong
		//bk
		//movie.chair_num_tmp = movie.chair_num;
		var name = $this.text();
		var num = $this.hasClass('couple') ? 2 : 1;
		var seat = '<span data-num='+ num +' seat-ref='+ ref +'>'+ name +'</span>';

		var cur_sear = 0;
		if(num == 2){
			//movie.double_chair_num = movie.double_chair_num +1;
			cur_sear = movie.double_chair_num + 1;
		} else {
			//movie.chair_num = movie.chair_num +1;
			cur_sear = movie.chair_num + 1;
		}

		var seats = movie.seats || [];
		if($('.seat-number span[seat-ref='+ ref +']').length){
			$('.seat-number span[seat-ref='+ ref +']').remove();
			$this.removeClass('choosing');
			if(num == 2){
				movie.double_chair_num = movie.double_chair_num - 1;
			} else {
				movie.chair_num = movie.chair_num - 1;
			}
			var seattmp = [];
			for(var i=0; i<seats.length;i++){
				if(seats[i].id!=seatId){
					seattmp.push(seats[i]);
				}
			}
			movie.seats = seattmp;
		}else {
			if(num == 1){
				if(cur_sear < movie.ticket_number) {
					seats.push({
						"id": seatId.toString(),
						"name": seatName.toString(),
						"price": movie.price_single,
						"issingle": 1
					});
					movie.seats = seats;
					//console.log("x1");
					$this.addClass('choosing');
					$('.seat-number').append(seat);
					movie.chair_num += 1;

				}else if(cur_sear == movie.ticket_number){
					seats.push({
						"id": seatId.toString(),
						"name": seatName.toString(),
						"price": movie.price_single,
						"issingle": 1
					});
					movie.seats = seats;
					//console.log("x2");
					$this.addClass('choosing');
					$('.seat-number').append(seat);
					movie.chair_num += 1;
				}else {
					//console.log("x3");
					if(movie.ticket_number == 0) {
						alert('Bạn không có mua ghế đơn (nên không thể chọn ghế đơn )!');
					}
					else{
						//console.log("xxx");
						//var temp_num = parseInt($('.seat-number span:last-child').attr('data-num'));

						var temp_ref = $('.seat-number span[data-num="1"]:last-child').attr('seat-ref');
						//=========================
						var seattmp = [];
						for(var i=0; i<seats.length;i++){
							if(seats[i].id!=temp_ref){
								seattmp.push(seats[i]);
							}
						}
						seattmp.push({
							"id": seatId.toString(),
							"name": seatName.toString(),
							"price": movie.price_single,
							"issingle": 1
						});
						movie.seats = seattmp;
						//======================
						//$('.cinema-seat[data-cine='+ movie.cinema_id +'] td[data-seat='+ temp_ref +']').removeClass('choosing');
						$('.cinema-seat td[data-seat='+ temp_ref +']').removeClass('choosing');
						$this.addClass('choosing');
						$('.seat-number span[data-num="1"]:last-child').remove();
						$('.seat-number').append(seat);
					}
				}
			} else {
				////ghe doi
				if(cur_sear < movie.double_ticket_number) {
					seats.push({
						"id": seatId.toString(),
						"name": seatName.toString(),
						"price": movie.price_double,
						"issingle": 0
					});
					movie.seats = seats;
					//console.log("x1");
					$this.addClass('choosing');
					$('.seat-number').append(seat);
					movie.double_chair_num += 1;

				}else if(cur_sear == movie.double_ticket_number){
					seats.push({
						"id": seatId.toString(),
						"name": seatName.toString(),
						"price": movie.price_double,
						"issingle": 0
					});
					movie.seats = seats;
					//console.log("x2");
					$this.addClass('choosing');
					$('.seat-number').append(seat);
					movie.double_chair_num += 1;
				}else {
					//console.log("x3");
					if(movie.double_ticket_number == 0) {
						alert('Bạn không có mua ghế đôi (nên không thể chọn ghế  đôi)!');
					}
					else{
						//console.log("xxx");
						//var temp_num = parseInt($('.seat-number span:last-child').attr('data-num'));

						var temp_ref = $('.seat-number span[data-num="2"]:last-child').attr('seat-ref');
						//=========================
						var seattmp = [];
						for(var i=0; i<seats.length;i++){
							if(seats[i].id!=temp_ref){
								seattmp.push(seats[i]);
							}
						}
						seattmp.push({
							"id": seatId.toString(),
							"name": seatName.toString(),
							"price": movie.price_double,
							"issingle": 0
						});
						movie.seats = seattmp;
						//======================
						//$('.cinema-seat[data-cine='+ movie.cinema_id +'] td[data-seat='+ temp_ref +']').removeClass('choosing');
						$('.cinema-seat td[data-seat='+ temp_ref +']').removeClass('choosing');
						$this.addClass('choosing');
						$('.seat-number span[data-num="2"]:last-child').remove();
						$('.seat-number').append(seat);
					}
				}
			}

		}
		
		if ($this.attr('data-type-seat-id')) {
			const seatSelected = [];
			$('.single.choosing').each(function(index, elm) {
				seatSelected.push({
					"id": $(elm).attr('data-seat').toString(),
					"name": $(elm).text(),
					"price": +$(elm).attr('data-price'),
					"issingle": 1
				});
			});

			$('.couple.choosing').each(function(index, elm) {
				seatSelected.push({
					"id": $(elm).attr('data-seat').toString(),
					"name": $(elm).text(),
					"price": +$(elm).attr('data-price'),
					"issingle": 0
				});
			});

			movie.seats = seatSelected;
		}

		//console.log("movie", movie);
		//console.log("ref", ref, "name", name, "num", num, "seat", seat, "cur_sear", cur_sear);
		if(movie.chair_num == movie.ticket_number && movie.double_ticket_number == movie.double_chair_num) {
			$('.cinema-btn').addClass('active');
			var Top = $('.cinema-content').innerHeight();
			$('html, body').animate({scrollTop: Top}, 'slow');

		}else {
			$('.cinema-btn').removeClass('active');
		}

	});
	//back
    $(document).on('click', '#cinema-back', function (){
		stopClick = true;
		myClock.setTime(timeClock);
		myClock.stop();
		
		movie.chair_num = 0;
		movie.double_chair_num = 0;
		movie.seats = [];

		$('.seat-number').html('');
		$('.cinema-seat td').removeClass('choosing');
		//$('.cinema-seat[data-cine='+ movie.cinema_id +'] td').removeClass('choosing');
		
		$('.cinema-content').css({'display': 'none'});
		$('.ticket-content').css({'display': 'block', 'opacity': 0});
		$('.section-order').css({'height': 'auto'});

		$('html, body').stop().animate({scrollTop: 0}, 150, 'linear', function(){
			$('.ticket-content').css({'opacity': 1});
			$('.cons-icon').removeClass('show');
		});
		
	});

	function generateInfo(){
		var total = 0;
		var strFilm = '<div class="confirm-film-text"><h3>' + movie.movie_name + '</h3><p>Ngày chiếu: <strong>' + movie.movie_date + '</strong></p><p>Xuất chiếu: <strong>' + movie.movie_hour + '</strong></p><p><span class="icon-' + movie.movie_type + '"></span></p></div>';
		
		var strSeats = '';
		for (var i = 0; i < movie.seats.length; i++){
			strSeats += '<li><div class="confirm-mark">' + movie.seats[i].name + '</div><div class="confirm-value"><span>' + movie.seats[i].price + '</span><sup>đ</sup></div></li>';
			total += movie.seats[i].price;
		}

		var strCombos = '';
		for (var i = 0; i < movie.combos.length; i++){
			strCombos += '<li><div class="confirm-mark">' + movie.combos[i].quantity + ' x ' + movie.combos[i].name + '</div><div class="confirm-value"><span>' + (movie.combos[i].price * movie.combos[i].quantity) + '</span><sup>đ</sup></div></li>';
			total += (movie.combos[i].price * movie.combos[i].quantity);
		}

		var str = '';
		str += '<div class="confirm-cus"><p>Họ tên: <strong>' + USERNAME + '</strong></strong></p>';
		str += '<p>Email: <strong>' + EMAIL + '</strong></p>';
		str += '<p>Phone: <strong>' + PHONE + '</strong></p></div>';

		str += '<div class="confirm-film"><div class="confirm-film-pic"><img src="' + movie.movie_img + '"/></div>' + strFilm + '</div>';
		str += '<div class="confirm-ticket"><div class="confirm-mark">Ghế</div><div class="confirm-text"><ul>' + strSeats + '</ul></div></div>';
		if(strCombos != '') {
			str += '<div class="confirm-cons"><div class="confirm-mark">Combo</div><div class="confirm-text"><ul>' + strCombos + '</ul></div></div>';
		}
		str += '<div class="confirm-total"><div class="confirm-mark">Tổng tiền</div><div class="confirm-value"><span>' + total + '</span><sup>đ</sup></div></div>';
		str += '<div class="cons-print"><a href="javascript:void(0);" onclick="PrintBill()" >Print</a> </div>';
		return str;
	}
	//next
	$(document).on('click', '#cinema-next', function (){
		if (movie && movie.pseats && movie.pseats['29_27'] && movie.pseats['29_27'] > 0) {
			const mess = 'Tôi xác nhận mua vé cho người xem từ 18 tuổi trở lên và hiểu rằng Cinestar sẽ không hoàn tiền nếu không chứng thực được độ tuổi của khán giả.';
			if (confirm(mess) != true) {
				return;
			}
		}
		let sv = movie.pseats['29_27'] || 0;
		movie.seats.forEach(function(item, index) {
			if (sv > 0) {
				movie.seats[index]['price'] = movie.price_sv;
				sv--;
			}
			
		});
		//Q add
		$('.order-content > .cinema-name').remove();
		$('.cons-icon').removeClass('show');
		
		var top = $('.cinema-content').offset().top;
		$('.cinema-wrap').stop().animate({'opacity': 0}, 200, function(){
			$('html,body').stop().animate({scrollTop: top - 100}, 200);

			//add combo
			var total = 0;

			var totalMoney = movie.amount;
			movie.combos = [];
			$('.combo-input input').each(function(index, elm) {

				if($(elm).attr('data-total')){
					var combo = {id:"", name: "", quantity: 0 , price: ""};
					total += parseInt($(elm).attr('data-total'));
					if(parseInt($(elm).attr('data-total'))!= 0){
						combo.id = $(elm).attr('data-id');
						combo.name = $(elm).attr('data-name');
						combo.quantity = $(elm).val();
						combo.price = $(elm).attr('data-price');
						movie.combos.push(combo);
						totalMoney += parseInt($(elm).attr('data-price'));
					}
				}
			});
			
			if(totalMoney == 0){
				$(".payment_method").css({'display':'none'});
			} else {
				$(".payment_method").css({'display':'block'});
			}
			//
			// console.log("=================================movies", movie, "===============================");
			$('.final-confirm .confirm-box').html(generateInfo());
			$('#cinema_id').val(movie.theater_id);
			$('#cinema_name').val(movie.cinema_name);
			$('#movie_name').val(movie.movie_name);
			
			
			// $('.html-confirm-info').html(generateInfo());
			//Q add
			$('.cinema-content').css({'display':'none'});
			
			$('.final-content').css({'display': 'block'});
			var cine_name = '<div class="cinema-name"><h2>' + $('.cinema-content .cinema-name h2').html() +'</h2></div>';
			$('.order-content').prepend(cine_name);	
			
		});
	});
	
	

	
	
	
//////////////////FINAL EVENTS/////////////////////////////
	$(document).on('click', '#payment-back', function(){
		
		$('.order-content > .cinema-name').remove();
		$('.final-content').fadeOut(500,'linear',function(){
		
			$('.cinema-content').css({'display':'block'});
			$('.cons-icon').addClass('show');
			
			$('.cinema-wrap').css({'opacity': 1});
		});		
		
	});
	$(document).on('click', '#payment-next', function(){
        //$('.close-order').trigger('click');
        //var url = $(this).attr('data-link');
        //window.location = url;
		var amount = movie.amount;
		for (var i = 0; i < movie.combos.length; i++){
			amount += (movie.combos[i].price * movie.combos[i].quantity);
		}
		
		if(amount > 0){
			if($('.check_terms_condition:checked').length == 0 || $('.payment_method_radio:checked').length == 0  ){
				alert('Vui lòng chọn chấp nhận các điều khoản, điều kiện và phương thức thanh toán.');
				return false;
			}
		} else {
			if($('.check_terms_condition:checked').length == 0 ){
				alert('Vui lòng chọn chấp nhận các điều khoản, điều kiện.');
				return false;
			}
		}		
		
        $('#amount').val(amount);
        $('#seats').val(JSON.stringify(movie.seats));
		$('#combos').val(JSON.stringify(movie.combos));
		$('#payment_method').val($('.payment_method_radio:checked').val());

        $('#movie_date').val(movie.movie_date);
		$('#movie_hour').val(movie.movie_hour);
		$('#room_name_01').val(movie.room_name);

        var arr_pseats = [];

        Object.keys(movie.pseats).forEach(function(k){
        	arr_pseats.push(k + "_" + movie.pseats[k]);
        });

		str_pseats = movie.showtimes_id + "****" + arr_pseats.join("***");
        $('#pseats').val(str_pseats);

        $('#payment').submit();
	});
///////////////////////ORDER FORM SHEDULE-DETAIL PAGE/////////////////////////////
//$('.schedule-block-load').on('click', '.row-hour li',
	$(document).on('click', '.schedule-block-load .row-hour li', function(){
        if($(this).hasClass('disable-time')) return false;
		
        movie.showtimes_id = $(this).attr('data-id');
        movie.theater_id = $('.select-list[data-cate="location"] .select-box ul li.selected a').data('target');
		/*window.location = 'http://www.123phim.vn/checkout?merchantCode=16&cinemaCode=' + movie.theater_id + '&sessionCode='  + movie.showtimes_id;
        // window.location = 'http://123phim.vn/checkout/cinestar?sessionCode=' + movie.showtimes_id;
        return false;
		*/
        movie.room_name = $(this).attr('data-room-name');
		movie.cinema_id = $(this).parents('.cinema-item').attr('cine-id');
		movie.cinema_name = $(this).parents('.cinema-item').attr('cine-name');
		movie.movie_img = $('.film-item-pic img').attr('src');
		movie.movie_name = $('.film-item-txt > h3').html();
		movie.movie_date = $(this).parents('.cinema-item').find('.row-date').attr('data-date');
		movie.movie_hour = $(this).text();
		
		order();
	});

///////////////////////ORDER FORM SHEDULE-DETAIL PAGE/////////////////////////////
//	$('.schedule-load').on('click', '.row-hour li', function(){
	$(document).on('click', '.schedule-load .row-hour li', function(){
        if($(this).hasClass('disable-time')) return false;
        movie.showtimes_id = $(this).attr('data-id');
		movie.theater_id = $('.select-list[data-cate="location-cine"] .select-box ul li.selected a').data('value');
		
		/*window.location = 'http://www.123phim.vn/checkout?merchantCode=16&cinemaCode=' + movie.theater_id + '&sessionCode='  + movie.showtimes_id;
        // window.location = 'http://123phim.vn/checkout/cinestar?sessionCode=' + movie.showtimes_id;
        return false;
        */
        movie.room_name = $(this).attr('data-room-name');
		movie.cinema_id = $(this).parents('.schedule-item').attr('cine-id');
		movie.cinema_name = $(this).parents('.schedule-item').attr('cine-name');
		
		movie.movie_img =  $(this).parents('.schedule-item').find('.film-item-pic img').attr('src');
		movie.movie_name = $(this).parents('.schedule-item').find('.film-item-txt > h3').html();
		movie.movie_date = $(this).parent().parent().parent().find('.row-date').attr('data-date');
		movie.movie_hour = $(this).text();
		
		order();
	});
	
///////////////////////USER EVENT IN POPUP ORDER/////////////////////////////
	$('.li-login').click(function(){
		$('.user-tab li').removeClass('active');
		$(this).addClass('active');
		$('.user-tab .tab-register').fadeOut(200,'linear',function(){
			$('.user-tab .tab-login .user-form.forgot').css({'display':'none'});
			$('.user-tab .tab-login .user-form.login').css({'display':'block'});
			$('.user-tab .tab-login').css({'display': 'block'});
		});
	});
	$('.li-register').click(function(){
		$('.user-tab li').removeClass('active');
		$(this).addClass('active');
		
		$('.user-tab .tab-login').fadeOut(200,'linear',function(){
			$('.user-tab .tab-register .user-form.modify').css({'display':'none'});
			$('.user-tab .tab-register .user-form.register').css({'display':'block'});
			$('.user-tab .tab-register').css({'display': 'block'});
		});
		
	});
	$('.user-form.login .user-link').click(function(){
		$('.user-form.login').css({'display': 'none'});
		
		$('.user-form.forgot').css({'display': 'block', 'opacity':0});
		$('.user-form.forgot').stop().animate({'opacity': 1},150,'linear');
	});
	$('.user-form.forgot .user-link').click(function(){
		$('.user-form.forgot').css({'display': 'none'});
		
		$('.user-form.login').css({'display': 'block', 'opacity':0});
		$('.user-form.login').stop().animate({'opacity': 1},150,'linear');
		
	});
	$('#btn-register-tab').click(function() {
		/*$('.user-form.register').css({'display': 'none'});
		$('.user-form.modify').css({'display': 'block', 'opacity':0});
		var top = $('.order-title').offset().top;
		var delta = $('.order-title').innerHeight();
		
		$('html, body').stop().animate({scrollTop: top + delta - 90}, 150, 'linear', function(){
			$('.user-form.modify').css({'opacity':1});
		});
		*/
	});
    
	$('#btn-login-tab, #btn-login-top').click(function (){
        /*var params = {
            username: '',
            password: ''
        };
        getPage(BASE_URL + 'login.html', 'POST', params, function(data){
            isLogin = true;
		
            if(movie.movie_hour != '') {
                order();
            }
            $('.user-people').addClass('active');
            $('html, body').animate({scrollTop: 0}, 'slow');
        });
        return false;*/
	});
	
	$('#btn-save-tab').click(function(){
		$('.li-login').trigger('click');
		
		var top = $('.order-title').offset().top;
		var delta = $('.order-title').innerHeight();
		
		$('html, body').stop().animate({scrollTop: top + delta - 90}, 150, 'linear', function(){
			$('.user-form.modify').css({'opacity':1});
		});
	});
	
/////////////////////////////SHOW POPUP EVENTS AT FOOOTER//////////////////////////
	$('.bottom-nav-icon li a, .nav-icon-wrap li a, .copyright h2 a, .terms_and_condition a').click(function(e){
			e.preventDefault();
			var name = $(this).attr('data-name');
			
			$(".term-pop[data-show='"+ name +"'], .overlay-dark").fadeIn(500, 'linear', function(){
				if($(window).width() > 1100) {
					setTimeout(ScrollNiceB, 100);
				}
			});
			if($(window).width() > 1100)
				$('html, body, .container').addClass('no-scroll');
			else
				$('html, body').scrollTop(0);
			isPop = 1;
			return false;	
	});
	$('.close-popup, .overlay-dark').click(function(e) {
		e.preventDefault();
		ScrollNiceHide();
		isPop = 0;
		$('.term-pop, .overlay-dark').fadeOut(500, 'linear');
	
		if($(window).width() > 1100) {
			$('html, body, .container').removeClass('no-scroll');
			//$('body').css({'overflow-y':'auto'});
		}else {
			$('html, body, .container').removeClass('no-scroll');
			//$('body').css({'overflow-y':'auto'});
		}
		return false;
	});
	
	
//////////////////////////////////// CONS //////////////////////////////////
//	$(document).on('click','.cons-but a', function(e) {
	$(document).on('click','.cons-chose, .cons-but .cons-icon', function(e) {
		
		if($('.cons-content').hasClass('show')){
				
				if($('.cons-chose').hasClass('toScroll')) {
					var top = $('.toScroll').offset().top;
					$('.cons-chose').removeClass('toScroll');
					$('html,body').scrollTop(top);
							
				}
					
				$('.overlay-cons').stop().fadeOut(500, 'linear', function(){
					$('.cons-content').removeClass('show');
					$('.overlay-cons').remove();
					cal_total_cons();
				});
				
				
				
				
		}else{
			//ajax get combo
			getPage(BASE_URL + 'index.php?route=common/order/getCombo', 'POST', { cinema_id: movie.theater_id}, function(data){
				$('.loadicon').fadeOut(300, 'linear', function() {
					$('.loadicon').remove();
				});
				
				$('.cons-content .cons-box').html(data);
				$('.cons-chose').addClass('toScroll');
				
				$('.order-content').css({'height': 'auto'});
				
				var cons_h = $('.cons-content').innerHeight();
				var oder_h = $('.order-content').height();
				
				if(oder_h <= cons_h) {
					$('.order-content').css({'height': cons_h + 120});
				}
				
				var top = $('.order-content').offset().top;
				
				$('html, body').stop().animate({scrollTop: top - 80},  300,'linear',function(){
					
					$('.cons-content').addClass('show');
					
				});	
				
				$('.order-content').prepend('<span class="overlay-cons"></span>');
				
				$('.overlay-cons').click(function(){
					
					$('.order-content').css({'height': 'auto'});
					if($('.cons-chose').hasClass('toScroll')) {
						var top = $('.toScroll').offset().top;
						$('.cons-chose').removeClass('toScroll');
						$('html,body').scrollTop(top);
							
					}
					
					$('.cons-content').removeClass('show');
					$('.overlay-cons').stop().fadeOut(500, 'linear', function(){
						$('.overlay-cons').remove();
						cal_total_cons();
						
					});
					
					
				});
			});				
		}
		
	});
	
	$('.cons-content .cons-icon').click(function(){
		
		if($('.cons-chose').hasClass('toScroll')) {
			$('.order-content').css({'height': 'auto'});
			var top = $('.toScroll').offset().top;
			$('.cons-chose').removeClass('toScroll');
			$('html,body').scrollTop(top);
			
		}
		
		$('.cons-content').removeClass('show');
		
		$('.overlay-cons').stop().fadeOut(500, 'linear', function(){
			$('.overlay-cons').remove();
			cal_total_cons();
		
		});
		
	});
	
	//addd ticket
	$(document).on('click','.cmb-add', function(e) {
		e.preventDefault();
		var row =  $(this).parent().parent();
		cal_total_on_cons(row,'asc');
		return false;
	});
	//minus ticket
	$(document).on('click', '.cmb-minus', function(e) {
		e.preventDefault();
		var row =  $(this).parent().parent();
		cal_total_on_cons(row,'des');
		return false;
	});
	
	$(document).on('click', '.cons-ok', function(e) {
		if($('.cons-chose').hasClass('toScroll')) {
			$('.order-content').css({'height': 'auto'});
			var top = $('.toScroll').offset().top;
			$('.cons-chose').removeClass('toScroll');
			$('html,body').scrollTop(top);
				
		}
		
		$('.cons-content').removeClass('show');
		
		$('.overlay-cons').stop().fadeOut(500, 'linear', function(){
			$('.overlay-cons').remove();
			cal_total_cons();
		
		});
		
	});
	
	$(document).on('click', '.cons-cancel', function(e) {
		$('.cons-total').css({'display': 'none'});
		$('.cons-value span, .cons-text').html('');
		
		$('.combo-item').each(function(index, element) {
            $(element).find('input').val(0).attr({'data-total':0});
			$(element).find('.combo-total-outer span').html('');
			$('.cons-but').removeClass('show');
			
			
        });
		
	});
	//cons number keyup
	 $('.combo-input input[type="text"]').each(function(){
        var txtval = $(this).val();
        $(this).focus(function(){
            if($(this).val() == txtval){
                $(this).val('')
            }
        });
        $(this).blur(function(){
            if($(this).val() == ""){
                $(this).val(txtval);
            }
        });
     });
	 $(document).on('keyup', '.combo-input input', function(){
		var str=this.value;
		var charsAllowed="0123456789";
		var allowed;
		for(var i=0;i<this.value.length;i++){
			allowed=false;
			for(var j=0;j<charsAllowed.length;j++){
				if( this.value.charAt(i)==charsAllowed.charAt(j) ){ allowed=true; }
			}
			if(allowed==false){ this.value = this.value.replace(this.value.charAt(i),""); i--; }
		}
		return true;
	 });
	 $(document).on('keydown', '.combo-input input', function(e) {
        if (e.keyCode == 13) {
            var row =  $(this).parent().parent();
			cal_total_on_cons(row,'on');
        }
     });
	 
	 
	$('.cons-print a').click(function(){
		 var printContents ='<div class="final-confirm"> ' +$(".final-confirm").html()+ ' </div>';
		 var originalContents = document.body.innerHTML;
		 document.body.innerHTML = printContents;
		 window.print();
		 document.body.innerHTML = originalContents;
		
	});
	

});


//CACULAT TOTA  MONEY ON 1 CONS
function cal_total_on_cons(byThis,type){
		
	type = type || null;
	var total = 0;
	var cmb_num = parseInt(byThis.find('input').val());
	// console.log(byThis, "======");
	// if(byThis.attr('data-seatstyle-id') != 29){
	// 	cmb_num = cmb_num * 2;
	// }
	var cmb_price = parseInt(byThis.find('input').attr('data-price'));
	var cmb_text = byThis.find('input').attr('data-name');
	
	// console.log(cmb_num);
	
	if(type == 'asc') {
		cmb_num++;
	}else if(type == 'des'){
		cmb_num = cmb_num - 1 >= 0 ? cmb_num - 1 : 0; 
	}else {
		cmb_num = cmb_num >=0 ? cmb_num : 0;
	}
	//combo-total-outer
	
	 total = (cmb_num * cmb_price).formatMoney(0, ',', '.');
	 byThis.find('input').val(cmb_num);
	 byThis.find('input').attr('data-total', cmb_num * cmb_price);
	 byThis.find('.combo-total-outer span').text(total);
	 
	 byThis.find('input').attr('data-text', (cmb_num + ' x ' + cmb_text));
	
	//check_active_btn();
	
	cal_total_cons();
		
}

//CACULAT TOTA  MONEY ON 1 CONS
function cal_total_cons() {
		
	var total = 0;
	var html = '<ul>';
	$('.combo-input input').each(function(index, elm) {
		
		if($(elm).attr('data-total')){
			total += parseInt($(elm).attr('data-total'));
			if(parseInt($(elm).attr('data-total'))!= 0){
				html += '<li>'+ $(elm).attr('data-text') +'</li>';
			}

		}
	});
	html += '</ul>';
	
	if(total != 0){
		$('.cons-value span').html(total.formatMoney(0, ',', '.'));
		$('.cons-text').html(html);
		$('.cons-total').css({'display': 'inline-block'});
		$('.cons-but').addClass('show');
		
		
	}else{
		$('.cons-value span').html('');
		$('.cons-text').html('');
		$('.cons-total').css({'display': 'none'});
		$('.cons-but').removeClass('show');
		
	}
	

}
	
//CACULATE MONEY ON 1 ROW
function cal_total_on_row(byThis,type, isDouble){
	type = type || null;
	var total = 0;
	var ticket_num = parseInt(byThis.find('.ticket-num input').val());
	var ticket_price = parseInt(byThis.find('.ticket-price').attr('data-price'));
		
	if(type == 'asc') {
		ticket_num = ticket_num + 1 <= 8 ? ticket_num + 1 : 8; 
	}else if(type == 'des'){
		ticket_num = ticket_num - 1 >= 0 ? ticket_num - 1 : 0; 
	}else {
		ticket_num = ticket_num >=0 ? ticket_num : 0;
	}

	if(isDouble == 1){
		movie.price_double = ticket_price;
	} else if (isDouble == 0){
		movie.price_single = ticket_price;
	} else {
		movie.price_sv = ticket_price;
	}
	total = (ticket_num * ticket_price).formatMoney(0, ',', '.');
	byThis.find('.ticket-num input').val(ticket_num);
	byThis.find('.ticket-total').attr('data-total', ticket_num * ticket_price);
	byThis.find('.ticket-total span').text(total);
	
	check_active_btn();
	cal_total();
}

//CACULAT TOTA  MONEY ON 1 ROW
function cal_total() {
	var total = 0;
	var ticket_num = 0;
	var double_total = 0;
	var double_ticket_num = 0;

	$('.ticket-wrap tbody tr').each(function(index, elm) {
		if($(elm).attr('data-seatstyle-id') == 30){
			double_total += parseInt($(elm).find('.ticket-total').attr('data-total'));
			double_ticket_num += parseInt($(elm).find('.ticket-num input').val());
		} else {
			total += parseInt($(elm).find('.ticket-total').attr('data-total'));
			ticket_num += parseInt($(elm).find('.ticket-num input').val());
		}

	});

	var total_price = total + double_total;
	var total_seat = ticket_num + double_ticket_num;

	$('.about-ticket li:nth-child(4) .value span').text(total_price.formatMoney(0, ',', '.'));
	$('.about-ticket li:nth-child(3) .value span').text(total_seat);
	
	$('.total-ticket-num span').text(total_seat);
	$('.total-ticket-amount span').text(total_price.formatMoney(0, ',', ','));
	
	movie.amount = total_price;
	movie.ticket_number = ticket_num;
	///movie.chair_num = total;
	movie.double_ticket_number = double_ticket_num;
	//movie.double_chair_num = double_total;
	// console.log("==xxxx===", movie, "===xxx=====");
}

//CHECK ACTIVE CLASS AT TICKET FORM IN POPUP ORDER
function check_active_btn() {
	var isActive = false;
	$('.ticket-wrap .ticket-num input').each(function(index, elm) {
       if( parseInt($(elm).val()) > 0 ) {
		   isActive = true;
		   return false;
	   }
    });
	if(isActive) { $('.ticket-wrap .input-but').addClass('active'); }
	else { $('.ticket-wrap .input-but').removeClass('active'); }
}


//RESET SELECT LIST CART
function resetForm(){
	$('.block-list').removeClass('is-cine').removeClass('is-day').removeClass('is-hour').removeClass('is-2d').removeClass('is-3d'	);
	$('.select-list[data-cate="cine"] .select-header h3').text($('.select-list[data-cate="cine"] .select-header h3').attr('data-holder'));
	$('.select-list[data-cate="day"] .select-header h3').text($('.select-list[data-cate="day"] .select-header h3').attr('data-holder'));
	$('.select-list[data-cate="hour"] .select-header h3').text($('.select-list[data-cate="hour"] .select-header h3').attr('data-holder'));
	
	$('.select-list[data-cate="cine"] li').removeClass('selected'); 
	$('.select-list[data-cate="day"] li').removeClass('selected'); 
	$('.select-list[data-cate="hour"] li').removeClass('selected');
	
}

//RESET INFORMATION IN POPUP ORDER
function resetOrder() {
	/*
	cinema_id = 0,
	cinema_name = '',

	movie_id = 0,
	movie_name = '',
	movie_date = '',
	movie_type = '',
	movie_img = '',
	movie_hour = '',
	ticket_number = 0, // Num of Tickets whose user bought
	chair_num = 0, // Num of seat user choosing 	
	*/
	movie.cinema_id = '';
	movie.cinema_id = 0;
	movie.cinema_name = '';
	movie.movie_id = 0;
	movie.movie_name = '';
	movie.movie_date = '';
	movie.movie_type = '';
	movie.movie_img = '';
	movie.movie_hour = '';
	movie.ticket_number = 0;
	movie.chair_num = 0;
	movie.double_ticket_number = 0;
	movie.double_chair_num = 0;
	movie.combos = [];
	movie.price_single = 0;
	movie.price_sv = 0;
	movie.price_double = 0;
	movie.pseats = {};
	movie.showtimes_id = '';
	movie.theater_id = $('.select-list[data-cate="location-cine"] .select-box ul li.selected a').data('value') != "" ? $('.select-list[data-cate="location-cine"] .select-box ul li.selected a').data('value') : '';
	
	$('.order-pic img').attr('src', 'pictures/films/no-img.html');
	$('.order-overview h2 span').html('');
	$('.about-ticket li:nth-child(1) .value').html('');
	$('.about-ticket li:nth-child(2) .value').html('');
	$('.about-ticket li:nth-child(3) .value span').html('0');
	$('.about-ticket li:nth-child(4) .value span').html('0');
	$('.cinema-name h2').html('');
	
	$('.seat-number').html('');
	$('.total-ticket-num span').html('0');
	$('.total-ticket-amount span').html('0');
	
	$('.ticket-num input').val('0');
	$('.ticket-total span').html('0');
	$('.single, .couple').removeClass('choosing');
	
	$('.user-content').css({'display': 'none'});
	$('.cinema-content').css({'display': 'none'});
	$('.final-content').css({'display': 'none'});
	$('.order-content').css({'display': 'none'});
	
	$('.ticket-wrap .input-but, .cinema-btn').removeClass('active');
}


//SORT CINE, DATE, TYPE FILM [LIST HOUR] BY CHOSE FILM ON CART LIST
function sortDataFilm(byThis) {

	var strCine = byThis.attr('cine-ref');
	var strDay = byThis.attr('day-ref');
	var filmType = byThis.attr('film-ref');
	
	var arrCine = strCine.split(',');
	$('.select-list[data-cate="cine"] li').removeClass('show');
	for(var i =0; i < arrCine.length; i++) {
		$('.select-list[data-cate="cine"] li a[cine-id='+ arrCine[i] + ']').parent().addClass('show');
	}
	
	var arrDay = strDay.split(',');
	$('.select-list[data-cate="day"] li').removeClass('show');
	for(var i =0; i < arrDay.length; i++) {
		$('.select-list[data-cate="day"] li a[day-id='+ arrDay[i] + ']').parent().addClass('show');
	}
}

//SORT CINE ZOOOM WHEN CHOSE CART-BUTTON ON EACH FILM
function sortDataByFilm(cine) {
	var arrCine = cine.split(',');
	$('.select-list[data-cate="cine"] li').removeClass('show');
	for(var i =0; i < arrCine.length; i++) {
		$('.select-list[data-cate="cine"] li a[cine-id='+ arrCine[i] + ']').parent().addClass('show');
	}
	
}


//SHOW POPUP ORDER
function order() {
     // console.log(movie,"========movie=============");
     //lay gia ve
     //order/getPrice
     getPage(BASE_URL + 'getpricemovie', 'POST', {showtimes_id: movie.showtimes_id, cinema_id: movie.theater_id}, function(data){
         $('.loadicon').fadeOut(300, 'linear', function() {
            $('.loadicon').remove();
        });
         $('#content-price').html(data);
     });
	 $('.container').css({'height': $(window).height(), 'overflow-y': 'hidden', 'opacity': 0.5});	
	
	 $('html, body').stop().animate({scrollTop: 0}, 150,'linear', function(){
		
		$('.order-overview h2 span').text(movie.movie_name);
		$('.about-ticket li:nth-child(1) .value').text(movie.movie_hour);
		$('.about-ticket li:nth-child(2) .value').text(movie.movie_date);
		$('.order-pic img').attr('src', movie.movie_img);
		$('.cinema-name h2').html(movie.cinema_name);
		$('.order-content').css({'display': 'block'});
		
		
		
		setClock();

		
		if(isLogin){
			$('.ticket-content').css({'display': 'block'});
			
			//$('.user-content').css({'display': 'none'});
			
			$('.final-content, .cinema-content, .user-content').css({'display': 'none'});
			$('.order-content > .cinema-name').remove();
			$('.cons-content').removeClass('show');
			$('.cons-total').css({'display': 'none'});
			$('.cons-value span').html('');
			$('.cons-text').html('');
			$('.combo-item input').attr('data-total','');
			$('.combo-item input').attr('data-text','');
			$('.combo-item input').val('0');
			$('.combo-total-outer span').html('');
			
			
			
		}else {
			$('.li-login').trigger('click');
			$('.user-content').css({'display': 'block'});

			$('.final-content, .cinema-content, .ticket-content').css({'display': 'none'});
			$('.order-content > .cinema-name').remove();
			$('.cons-content').removeClass('show');
			$('.cons-total').css({'display': 'none'});
			$('.cons-value span').html('');
			$('.cons-text').html('');
			$('.combo-item input').attr('data-total','');
			$('.combo-item input').attr('data-text','');
			$('.combo-item input').val('0');
			$('.combo-total-outer span').html('');
		}	
				
		if($(window).width() > 1100) {
			var h1 = $('.order-title').innerHeight();
			var h2 = $('.order-content').innerHeight();
			
			$('.section-order').stop().animate({'height': h1 + h2 + 150}, 300, 'linear', function(){});
		}else{
			$('.section-order').css({'height': 'auto', 'opacity': 0});
			$('.order-content').css({'display': 'block'});
			
			$('.section-order').stop().animate({'opacity': 1}, 300, 'linear', function(){});
		}
		
		if($(window).width() <= 1100) {
			$('.register-content').addClass('display');
			$('.user-people').addClass('display');
			
		}
		
	});
	
}


//SET LIMITED TIME FOR BOOT TICKET
function setClock() {

	myClock = $('.clock').FlipClock({
		autoStart: false,
		clockFace: 'MinuteCounter',
		countdown: true,
		minimumDigits: 4,
		callbacks: {
			stop: function() {
				if(!stopClick) {
					var html = '<div class="mess"><div class="mess-inr"><h3>Bạn đã hết thời gian mua vé !</h3></div></div>';
					$('body').append(html);
					$('.overlay-dark, .mess').fadeIn(200,'linear',function(){});
					$('.overlay-dark, .mess').click(function(){
						$('.overlay-dark, .mess').fadeOut(200,'linear',function(){
							$('.mess').remove();
						});
						$('.close-order').trigger('click');
					});
				}
				stopClick = false;
			}
		 }
	 });
	myClock.setTime(timeClock);
}
window.onorientationchange = ResizeWindows;

$(window).resize(function() {
	//reset style
	$('.link-page').css({'height': 'auto'});
	isMove = 1;
	ScrollNiceHide();
	ResizeWindows();
	$('.opera').css({width: $(window).width()});
});
$(window).on('resize', function() {
	ResizeWindows();
	$('.opera').css({width: $(window).width()});
	if($(window).width() > 1100) {
		
		$('.container').trigger('click');
	
		//PROMOTION ON TOP
		$('.promotion-slide').css({'width': $('.promotion-wrap').width() - 116, 'margin-left': 116});
				
		//NEWS ON TOP
		$('.news-list').css({'width': $('.news-wrap').innerWidth() - 116});
		
				
		if( $('.scrollB, .scrollT').length){
				 ScrollNiceT();
				 ScrollNiceB();
				 
		}
		if(isAlbum == 1 || $('.full img').length || $('.full2 img').length || isPop == 1 ||  isUser == 1) {
			$('html, body, .container').addClass('no-scroll');
		}else {
			$('html, body').scrollTop(0);
		}
		if($('.full img').length){
			$('.full').addClass('dragscroll');
			$('.dragscroll').draptouch();
			detectMargin();
		}
		if($('.full2 img').length){
			$('.full2').addClass('dragscroll');
			$('.dragscroll').draptouch();
		}
		if($('.dragscroll').length){ 
			$('.dragscroll').draptouch();
		}
		$('.movie-item').unbind('click').unbind('mouseenter').unbind('mouseleave');
		$('.movie-item').mouseenter(function(e){
			$('.movie-item.show').removeClass('show').addClass('hide');
			hoverMovie($(this));
		}).mouseleave(function(e){
			leaveMovie($(this));
		});
		
		//DETECT MEMBER POPUP TOP
		if($('.member-details-content').css('display')=='block') {
			var top = $('.promotion-list-content').offset().top;
			$('.member-details-content').css({'top': top - 65});
		}
		
		
		
	}else {
		
		//PROMOTION ON TOP
		$('.promotion-slide').css({'width': '100%', 'margin-left': 0});
			
		//NEWS ON TOP
		$('.news-list').css({'width': '100%', 'margin-left': 0});
				
		$('.movie-item').unbind('click').unbind('mouseenter').unbind('mouseleave');
		$('.movie-item').bind('click',function(e){
			$('.movie-item.show').removeClass('show').addClass('hide');
			hoverMovie($(this));
		});
		
		detectHeight();
		$('html, body, .container').removeClass('no-scroll');
		
		if($('.full img, .full2 img').length){
			
			detectMargin();
			if(isDesktop){
				 $('.full, .full2').css({'overflow':'hidden'});	
				 if(!$('.full, .full2').hasClass('.dragscroll')){ 
					$('.full, .full2').addClass('dragscroll');
					$('.dragscroll').draptouch();
				 }
			 }
		}
		if(isAlbum == 1) {
			$('html, body, .container').addClass('no-scroll');
		}
		//DETECT MEMBER POPUP TOP
		if($('.member-details-content').css('display')=='block') {
			var top = $('.promotion-list-content').offset().top;	
			$('.member-details-content').css({'top': top});
		}
	}
	detect_user_register_top();
	detect_user_login_top();

	detect_linkpage(false);
	detect_promotion_block(false);
	
	detect_promotion_slide();
	detect_member_slide();
	detect_movie_slide();
	detect_news_slide();
	detect_cine_slide();
	
	if($('#film-page').length) {
		var target = $('.movie-col.active').attr('data-open');
		set_film_height(target);
	}
	$('.faq li.active .answer-wrap').css({'height': 'auto'});
}, 250);

function LoadFilms(url, data) {
	$.ajax({url: url, cache: false, type: "POST", data: data, success: function(data) {
		$('.movie-load').append(data);		
		$('.movie-load').stop().animate({'opacity': 1}, 600, 'linear', function() {
			$('.loadicon').fadeOut(300, 'linear', function() {
				$('.loadicon').remove();
			});
		});
		//create slideshow		
		if( $('.movie-slide').length){
			$('.movie-slide').BTQSlider({
				itemsCustom : [
				[0, 1],
				[300, 1],
				[400, 2],
				[500, 2],
				[600, 3],
				[700, 3],
				[800, 3],
				[900, 4],
				[1000, 4],
				[1100, 4],
				[1200, 5],
				[1210, 5],
				[1400, 5],
				[1600, 5],
				[1900, 5],
				],
				navigation : true,
				pagination : true,
				lazyLoad : true,
				lazyEffect : "fade"
			});
			detect_movie_slide();
		}
		if($(window).width() > 1100) {
			$('.movie-item').mouseenter(function(e){
				$('.movie-item.show').removeClass('show').addClass('hide');
				hoverMovie($(this));
			}).mouseleave(function(e){
				leaveMovie($(this));	
			});
		} else {
			$('.movie-item').click(function(e){
			   $('.movie-item.show').removeClass('show').addClass('hide');
				hoverMovie($(this));
			});
		}
		detectBut();
	}});
	
}

function hoverMovie(byThis) {
	$(byThis).removeClass('hide').addClass('show');	
	if($(byThis).find('> .movie-over p').innerHeight() >= 140) {
		$(byThis).find('> .movie-over span.atc').css({'display': 'block'});
	}
}
function leaveMovie(byThis){
	$(byThis).removeClass('show').addClass('hide');
}

function LocationHash () {
  /*var PageActive = window.location.hash;
   PageActive = PageActive.slice(1);
   Arrhash = PageActive.split('/');

	if($('#price-page').length) {
		if(Arrhash[1] != undefined) {
			oldHash = PageActive;
			$('.select-list[data-cate="location"] .select-box li a[data-target='+ Arrhash[0] +']').trigger('click');
		}
	}else {
		$('.link-page a[data-details=' + PageActive + ']').trigger('click');
		$('.sub-nav li a[data-name=' + PageActive + ']').trigger('click'); 
		$('.sub-tab li a[data-name=' + PageActive + ']').trigger('click'); 
	}
	*/        
}

$(window).bind("popstate", function(e) {
	 e.preventDefault();
	 //LocationHash();
});
		