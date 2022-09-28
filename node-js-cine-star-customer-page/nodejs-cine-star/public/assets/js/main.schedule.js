import { AppBase } from "./AppBase.js";


let socket = io();
let clientId = null;




function drawBranchOnSchedulePage(){
    socket.emit("get-all-branch");
}

drawBranchOnSchedulePage();

socket.on("get-all-branch-success", (data) => {
    if(data.length) {
        $.each(data, (i, item) => {
                        let str = AppBase.drawBranchesOnShowSchedulePage(item.id, item.name);
                        $('.select-box ul').append(str);
                    })

                    $(`.cinema-list .select-box li a[data-target = ${data[0].id}]`).click();


    }
})

socket.on("get-all-branch-error" , (statusCode) => {

    if (statusCode === 401) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_401);
    }

    if (statusCode === 403) {
        AppBase.SweetAlert.showErrorAlert(AppBase.ERROR_403);
    }
})



$(document).on( "click", ".cinema-list .select-box li a", function(e){
    e.preventDefault();
    console.log("1234");

    var cate = $(this).parents('.select-list').attr('data-cate');
    var target = $(this).attr('data-target');
    var theater_id = $(this).attr('data-value');

    $(this).parent().parent().find(' > li').removeClass('selected');
    $(this).parent().addClass('selected');
    $(this).parents('.select-list').find('.select-header h3').text($(this).text());
    $(this).closest('.select-box').fadeOut(200, 'linear');

    if(cate == 'location') {
        LoadScheduleMovie(target);

        // getPage(BASE_URL + "gettheaterbyarea", "GET", {id:target}, function(data){
        //     $('.loadicon').fadeOut(300, 'linear', function() {
        //         $('.loadicon').remove();
        //     });
        //     data = JSON.parse(data);
        //     $('.select-list[data-cate="location-cine"] .select-box ul').html("");
        //     $.each( data, function( key, value ) {
        //         $('.select-list[data-cate="location-cine"] .select-box ul').append('<li class="show"><a href="' + BASE_URL + 'schedulelist" data-value="'+value.ID+'" cinema-id="1" data-cine="1/1" cine-open="1" cine-address="'+value.ADDRESS+'" cine-call="'+value.TELEPHONE+'"><h3>'+value.NAME+'</h3></a></li>');
        //     });
        //     $('.select-list[data-cate="location-cine"] .select-box li').first().find('> a').trigger('click');
        // });
    }else {
        movie.theater_id = $(this).attr('data-value');
        $('.c_name').html($(this).text().replace("CineStar ",""));
        $('.c_address').html($(this).attr('cine-address'));
        $('.c_tel strong').html('<a href="tel:'+ $(this).attr('cine-call') +'">'+ $(this).attr('cine-call') +'</a>');
        var url = $(this).attr('href');

        $('body').append('<div class="loadicon" style="display:block"><span class="circle"></span></div>');

    }

    return  false;
});

function LoadScheduleMovie(branchId) {  
	$('.schedule-load').html("");
    

	$.ajax({
		"headers": {
			"accept": "application/json",
			"content-type": "application/json"
		},
		"type": "GET",
		"url": AppBase.BASE_URL_API + "/show-schedules/branch/" + branchId,
	})
		.done((data) => {
			$('.c_name').html(data[0].branchName);
			$('.c_address').html(data[0].branchAddress);

			$.each(data, (i, item) => {
				let str = AppBase.drawScheduleDetails(item.movie.id, item.movie.title, item.movie.fileUrl, item.movie.description);
				$('.schedule-load').append(str);

				$.ajax({
					"headers": {
						"accept": "application/json",
						"content-type": "application/json"
					},
					"type": "GET",
					"url": AppBase.BASE_URL_API + "/show-schedules/branch/showdate/" + branchId + "/" + item.movie.id,
				})
					.done((data) => {
						$.each(data, (i, item) => {
							let year = item.showDate.substring(0, 4);
							let day = item.showDate.substring(5, 7) + "/" + item.showDate.substring(8);
							let str = AppBase.drawShowDate(item.showDate, day, year);
							$('#schedule-' + item.movie.id).prepend(str);
							$.ajax({
								"headers": {
									"accept": "application/json",
									"content-type": "application/json"
								},
								"type": "GET",
								"url": AppBase.BASE_URL_API + "/show-schedules/branch/showtimeslot/" + branchId + "/" + item.movie.id + "/" + item.showDate,
							})
								.done((data) => {

									let str = `
									<div class="row-hour">
										<ul>
								`;
									$.each(data, (i, item) => {
										str += AppBase.drawShowTimeSlot(item.movie.id, item.roomId, item.showTimeSlot)

									})
									str += `
											</ul>
										</div>
								`;

									$('#schedule-' + item.movie.id + ' .' + item.showDate).prepend(str);
								})
						})

					})

			})

		})
}
