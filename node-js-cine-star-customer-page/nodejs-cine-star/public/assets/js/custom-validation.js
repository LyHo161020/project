$( function () {
    page.dialogs.element.frmCreate.validate({
        rules: {
            username: {
                required: true,
                minlength: 8,
                maxlength: 32
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 32
            },
            fullName: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            phone: {
                required: true
            },
            email: {
                required: true,
                minlength: 5,
                maxlength: 32,
                email : true
            },
            address: {
                required: true
            },
            dateOfBirth: {
                required: true,
            }
        },
        messages: {
            username: {
                required: "Vui lòng nhập tên đăng nhập!",
                minlength: $.validator.format("Tên đăng nhập tối thiểu {0} ký tự"),
                maxlength: $.validator.format("Tên đăng nhập tối đa {0} ký tự")
            },
            password: {
                required: "Vui lòng nhập mật khẩu",
                minlength: $.validator.format("Mật khẩu tối thiểu {0} ký tự"),
                maxlength: $.validator.format("Mật khẩu tối đa {0} ký tự")
            },
            fullName: {
                required: "Vui lòng nhập tên đầy đủ",
                minlength: $.validator.format("Họ tên tối thiểu {0} ký tự"),
                maxlength: $.validator.format("Họ tên tối đa {0} ký tự")
            },
            phone: {
                required: "Vui lòng nhập số điện thoại"
            },
            email: {
                required: "Vui lòng nhập email đầy đủ",
                minlength: $.validator.format("Email tối thiểu lượng {0} ký tự "),
                maxlength: $.validator.format("Email tối đa {0} ký tự  "),
                email: "Vui lòng nhập đúng định dạng email"
            },
            address: {
                required: "Vui lòng nhập địa chỉ"
            },
            dateOfBirth: {
                required: "Vui lòng nhập ngày sinh"
            }
        },
        errorLabelContainer: "#modalCreateAccount .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#modalCreateAccount .modal-alert-danger");
        },
        showErrors: function(errorMap, errorList) {
            if (this.numberOfInvalids() > 0) {
                page.dialogs.element.mdAlertDangerCre.removeClass("hide").addClass("show");
            } else {
                page.dialogs.element.mdAlertDangerCre.removeClass("show").addClass("hide").empty();
                page.dialogs.element.inputErrorCre.removeClass("error");
            }
            this.defaultShowErrors();
        },
        submitHandler: function () {
            page.commands.doCreate();
        }
    });

    page.dialogs.element.frmUpdate.validate({
        rules: {
            fullNameUp: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            phoneUp: {
                required: true
            },
            emailUp: {
                required: true,
                minlength: 5,
                maxlength: 255,
                email : true
            },
            addressUp: {
                required: true
            },
            dateOfBirthUp: {
                required: true,
            }
        },
        messages: {
            fullNameUp: {
                required: "Vui lòng nhập tên đầy đủ",
                minlength: $.validator.format("Họ tên tối thiểu {0} ký tự"),
                maxlength: $.validator.format("Họ tên tối đa {0} ký tự")
            },
            phoneUp: {
                required: "Vui lòng nhập số điện thoại"
            },
            emailUp: {
                required: "Vui lòng nhập email đầy đủ",
                minlength: $.validator.format("Email tối thiểu lượng {0} ký tự "),
                maxlength: $.validator.format("Email tối đa {0} ký tự  "),
                email: "Vui lòng nhập đúng định dạng email"
            },
            addressUp: {
                required: "Vui lòng nhập địa chỉ"
            },
            dateOfBirthUp: {
                required: "Vui lòng nhập ngày sinh"
            }
        },
        errorLabelContainer: "#modalUpdateAccount .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#modalUpdateAccount .modal-alert-danger");
        },
        showErrors: function(errorMap, errorList) {
            if (this.numberOfInvalids() > 0) {
                page.dialogs.element.mdAlertDangerUp.removeClass("hide").addClass("show");
            } else {
                page.dialogs.element.mdAlertDangerUp.removeClass("show").addClass("hide").empty();
                page.dialogs.element.inputErrorUp.removeClass("error");
            }
            this.defaultShowErrors();
        },
        submitHandler: function () {
            page.commands.doUpdate();
        }
    });
})