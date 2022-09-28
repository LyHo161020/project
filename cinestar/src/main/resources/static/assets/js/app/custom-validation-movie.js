$(()=>{
    $('#frmCreateMovie').validate({
        rules: {
            titleCre: {
                required: true,
                maxlength: 50
            },
            premiereDateCre: {
                required: true
            },
            showDurationCre: {
                required: true,
                max: 1000,
                min: 0
            },
            languageCre: {
                required: true
            },
            directorCre: {
                required: true,
            },
            actorCre: {
                required: true
            },
            descriptionCre: {
                required: true
            },
            imageCre: {
                required: true
            }
        },
        messages: {
            titleCre: {
                required: "Vui lòng nhập tiêu đề phim",
                maxlength: $.validator.format("Tiêu đề tối đa {0} ký tự")
            },
            premiereDateCre: {
                required: "Vui lòng nhập ngày khởi chiếu"
            },
            showDurationCre: {
                required: "Vui lòng nhập thời lượng chiếu",
                max: $.validator.format("Thời lượng chiếu nhỏ hơn {0} phút"),
                min: $.validator.format("Thời lượng chiếu không được âm")
            },
            languageCre: {
                required: "Vui lòng chọn ngôn ngữ"
            },
            directorCre: {
                required: "Vui lòng nhập tên đạo diễn"
            },
            actorCre: {
                required: "Vui lòng nhập tên diễn viên"
            },
            descriptionCre: {
                required: "Vui lòng nhập mô tả phim"
            },
            imageCre: {
                required: "Vui lòng chọn ảnh phim"
            }
        },
        errorLabelContainer: "#md_add_movie .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#md_add_movie .modal-alert-danger");
        },
        showErrors: function(errorMap, errorList) {
            if (this.numberOfInvalids() > 0) {
                $("#md_add_movie .modal-alert-danger").removeClass("hide").addClass("show");
            } else {
                $("#md_add_movie .modal-alert-danger").removeClass("show").addClass("hide").empty();
                $("#frmCreateMovie input.error").removeClass("error");
            }
            this.defaultShowErrors();
        },
        submitHandler: function () {

            createMovie();
        }
    });


    $('#frmUpdateMovie').validate({
        rules: {
            titleUp: {
                required: true,
                maxlength: 50
            },
            premiereDateUp: {
                required: true
            },
            showDurationUp: {
                required: true,
                max: 600,
                min: 0
            },
            languageUp: {
                required: true
            },
            directorUp: {
                required: true,
            },
            actorUp: {
                required: true
            },
            descriptionUp: {
                required: true
            }
        },
        messages: {
            titleUp: {
                required: "Vui lòng nhập tiêu đề phim",
                maxlength: $.validator.format("Tiêu đề tối đa {0} ký tự")
            },
            premiereDateUp: {
                required: "Vui lòng nhập ngày khởi chiếu"
            },
            showDurationUp: {
                required: "Vui lòng nhập thời lượng chiếu",
                max: $.validator.format("Thời lượng chiếu nhỏ hơn {0} phút"),
                min: $.validator.format("Thời lượng chiếu không được âm")
            },
            languageUp: {
                required: "Vui lòng chọn ngôn ngữ"
            },
            directorUp: {
                required: "Vui lòng nhập tên đạo diễn"
            },
            actorUp: {
                required: "Vui lòng nhập tên diễn viên"
            },
            descriptionUp: {
                required: "Vui lòng nhập mô tả phim"
            }
        },
        errorLabelContainer: "#md_update_movie .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#md_update_movie .modal-alert-danger");
        },
        showErrors: function(errorMap, errorList) {
            if (this.numberOfInvalids() > 0) {
                $("#md_update_movie .modal-alert-danger").removeClass("hide").addClass("show");
            } else {
                $("#md_update_movie .modal-alert-danger").removeClass("show").addClass("hide").empty();
                $("#frmUpdateMovie input.error").removeClass("error");
            }
            this.defaultShowErrors();
        },
        submitHandler: function () {
            updateMovie();
        }
    });
})