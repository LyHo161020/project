$( function () {
    page.dialogs.element.frmCreate.validate({
        rules: {
            showDate: {
                required: true,
            },
            showTimeSlot: {
                required: true,
            }
        },
        messages: {
            showDate: {
                required: "Vui lòng nhập ngày khởi chiếu!",
            },
            showTimeSlot: {
                required: "Vui lòng nhập khung giờ chiếu",
            }
        },
        errorLabelContainer: "#modalCreateShowSchedule .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#modalCreateShowSchedule .modal-alert-danger");
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
            showDateUp: {
                required: true,
            },
            showTimeSlotUp: {
                required: true,
            }
        },
        messages: {
            showDateUp: {
                required: "Vui lòng nhập ngày khởi chiếu!",
            },
            showTimeSlotUp: {
                required: "Vui lòng nhập khung giờ chiếu",
            }
        },
        errorLabelContainer: "#modalUpdateShowSchedule .modal-alert-danger",
        errorPlacement: function (error, element) {
            error.appendTo("#modalUpdateShowSchedule .modal-alert-danger");
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