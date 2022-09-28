import { App } from './app.base.js';
import { 
    LocationRegion, 
    Customer, 
    Sender, 
    Recipient, 
    Deposit, 
    Withdraw,
    Transfer 
} from "./app.model.js";

import { page } from './app.page.js';
import { appValidate } from './app.validation.js';

let socket = io('http://localhost:3500');

let clientId = null;

page.elements.logout = $(".profile-dropdown a.logout");
page.elements.username = $("#username");
page.elements.loading = true;
page.elements.loader = $(".loader");
page.elements.currentRow = $("#currentRow");
page.elements.tempCustomer = $("#tempCustomer");
page.elements.footer = $(".footer");
page.elements.tempFooter = $("#tempFooter");
page.elements.footerButton = $(".footer button");

page.elements.tempCustomer = $("#tempCustomer");
page.elements.frmListCustomer = $("#tbListCustomers tbody");
page.elements.btnShowCreateForm = $("a.create-modal");

page.dialogs.elements.modalCreateCustomer = $("#modalCreateCustomer");
page.dialogs.elements.modalUpdateCustomer = $("#modalUpdateCustomer");
page.dialogs.elements.modalDeposit = $("#modalDeposit");
page.dialogs.elements.modalWithdraw = $("#modalWithdraw");
page.dialogs.elements.modalTransfer = $("#modalTransfer");

page.dialogs.elements.frmCreateCustomer = $("#frmCreateCustomer");
page.dialogs.elements.frmUpdateCustomer = $("#frmUpdateCustomer");
page.dialogs.elements.frmDeposit = $("#frmDeposit");
page.dialogs.elements.frmWithdraw = $("#frmWithdraw");
page.dialogs.elements.frmTransfer = $("#frmTransfer");
page.dialogs.elements.tempOption = $("#tempOption");

page.dialogs.elements.fullName = $("#fullName");
page.dialogs.elements.email = $("#email");
page.dialogs.elements.phone = $("#phone");
page.dialogs.elements.province = $("#province");
page.dialogs.elements.district = $("#district");
page.dialogs.elements.ward = $("#ward");
page.dialogs.elements.address = $("#address");
page.dialogs.elements.btnCreateCustomer = $("#btnCreateCustomer");

page.dialogs.elements.fullNameUp = $("#fullNameUp");
page.dialogs.elements.emailUp = $("#emailUp");
page.dialogs.elements.phoneUp = $("#phoneUp");
page.dialogs.elements.provinceUp = $("#provinceUp");
page.dialogs.elements.districtUp = $("#districtUp");
page.dialogs.elements.wardUp = $("#wardUp");
page.dialogs.elements.addressUp = $("#addressUp");
page.dialogs.elements.btnUpdateCustomer = $("#btnUpdateCustomer");

page.dialogs.elements.customerIdDep = $("#customerIdDep");
page.dialogs.elements.fullNameDep = $("#fullNameDep");
page.dialogs.elements.balanceDep = $("#balanceDep");
page.dialogs.elements.transactionAmountDep = $("#transactionAmountDep");
page.dialogs.elements.btnDepositMoney = $("#btnDepositMoney");

page.dialogs.elements.customerIdWd = $("#customerIdWd");
page.dialogs.elements.fullNameWd = $("#fullNameWd");
page.dialogs.elements.balanceWd = $("#balanceWd");
page.dialogs.elements.transactionAmountWd = $("#transactionAmountWd");
page.dialogs.elements.btnWithdrawMoney = $("#btnWithdrawMoney");

page.dialogs.elements.recipientIdTrf = $("#recipientIdTrf");
page.dialogs.elements.senderIdTrf = $("#senderIdTrf");
page.dialogs.elements.senderNameTrf = $("#senderNameTrf");
page.dialogs.elements.emailTrf = $("#emailTrf");
page.dialogs.elements.balanceTrf = $("#balanceTrf");
page.dialogs.elements.transferAmountTrf = $("#transferAmountTrf");
page.dialogs.elements.transactionAmountTrf = $("#transactionAmountTrf");
page.dialogs.elements.btnTransferMoney = $("#btnTransferMoney");

page.dialogs.alertDanger.modalCreate = $("#modalCreateCustomer .modal-body .modal-alert-danger");
page.dialogs.alertDanger.modalUpdate = $("#modalUpdateCustomer .modal-body .modal-alert-danger");
page.dialogs.alertDanger.modalDeposit = $("#modalDeposit .modal-body .modal-alert-danger");
page.dialogs.alertDanger.modalWithdraw = $("#modalWithdraw .modal-body .modal-alert-danger");
page.dialogs.alertDanger.modalTransfer = $("#modalTransfer .modal-body .modal-alert-danger");


let locationRegion = new LocationRegion();
let customer = new Customer();
let sender = new Sender();
let recipient = new Recipient();
let deposit = new Deposit();
let withdraw = new Withdraw();
let transfer = new Transfer();

let openModalUpdateCustomer = false;
let customerId = null;
let ts = null;
let senderId = null;

let tempFooter = $.validator.format($.trim(page.elements.tempFooter.val().toString()));
let tempCustomer = $.validator.format($.trim(page.elements.tempCustomer.val().toString()));
let tempOption = $.validator.format($.trim(page.dialogs.elements.tempOption.val().toString()));

page.commands.addRow = () => {
    let str = $(tempCustomer(
        customer.id, 
        customer.fullName, 
        customer.email, 
        customer.phone, 
        customer.balance,
        locationRegion.provinceName, 
        locationRegion.districtName, 
        locationRegion.wardName, 
        locationRegion.address,
        customer.ts
    ));

    page.elements.frmListCustomer.prepend(str);
}

page.commands.updateRow = () => {
    let currentRow = $("#tr_" + customer.id);

    let updateRow = $(tempCustomer(
        customer.id, 
        customer.fullName, 
        customer.email, 
        customer.phone, 
        customer.balance, 
        locationRegion.provinceName, 
        locationRegion.districtName, 
        locationRegion.wardName, 
        locationRegion.address,
        customer.ts
    ));

    currentRow.replaceWith(updateRow);
}

page.dialogs.commands.getErrorList = (jsonData) => {
    let str = ``;

    if (jsonData.statusCode === 401) {
        str += `<label id="message-error" class="error" for="message">${App.AlertMessageEn.ERROR_401}</label>`;
    } else {
        if (jsonData.statusCode === 403) {
            str += `<label id="message-error" class="error" for="message">${App.AlertMessageEn.ERROR_403}</label>`;
        } else {
            if (jsonData.errors) {
                if (jsonData.errors.message) {
                    str += `<label id="message-error" class="error" for="message">${jsonData.errors.message}</label>`;
                } else {
                    $.each(jsonData.errors, function (key, value) {
                        str += `<label id="${key}Up-error" class="error" for="${key}Up">${value}</label>`;
                        $("#" + key + "Up").addClass("error");
                    });
                }
            } else {
                str += `<label id="message-error" class="error" for="message">${App.AlertMessageEn.ERROR_500}</label>`;
            }
        }
    }

    return str;
}

page.commands.formatNumber = () => {

    $("table tbody").on("click", "tr td", function () {
        $("table tbody tr td").find(".select-tab.selected").removeClass("selected").addClass("unselected");
        $(this).parent().find(".select-tab").removeClass("unselected").addClass("selected");
        page.elements.currentRow.val($("table tbody tr td").find(".select-tab.selected").closest("tr").attr("id"));
        customerId = page.elements.currentRow.val().replace("tr_", "");

        customer.id = customerId;
        ts = $("table tbody tr td").find(".select-tab.selected").closest("tr").data('ts');

        page.elements.footer.html(tempFooter());
    });

    $(document).on('input', '.num-space', function (e) {
        $(this).val(App.formatNumberSpace($(this).val()));
    });

    $('input.num-space').on("keypress", function (e) {

        let charCode = (e.which) ? e.which : e.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))
            return false;
    });
}


page.commands.showCreateModal = () => {
    page.dialogs.elements.modalCreateCustomer.modal('show');
}

page.commands.showUpdateModal = () => {
    console.log(customer);
    socket.emit('get-customer', { customer, clientId });
}

page.commands.showDepositModal = () => {
    socket.emit('get-customer-deposit', { customer, clientId });
}

page.commands.showWithdrawModal = () => {
    socket.emit('get-customer-withdraw', { customer, clientId });
}

page.commands.showTransferModal = () => {
    socket.emit('get-transfer', { transfer, clientId });
}

page.commands.showDeactivateModal = () => {
    App.SweetAlert.showDeactivateConfirmDialog()
        .then((result) => {
            if (result.isConfirmed) {
                page.dialogs.commands.deactivateCustomer();
            }
        });
}


page.dialogs.loadData.getAllProvinces = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getAllProvinces
    }).done((data) => {

        $.each(data.results, (i, item) => {
            page.dialogs.elements.province.append($(tempOption(item.province_id, item.province_name)));
            page.dialogs.elements.provinceUp.append($(tempOption(item.province_id, item.province_name)));
        });

    }).fail(function () {
        App.IziToast.showErrorAlert(App.AlertMessageEn.ERROR_LOADING_PROVINCE);
    });
}

page.dialogs.loadData.getAllDistricts = (provinceId) => {
    page.elements.loader.removeClass("hide");

    return $.ajax({
        type: "GET",
        url: page.urls.getAllDistricts + "/" + provinceId
    }).done((data) => {

        $.each(data.results, (i, item) => {
            page.dialogs.elements.district.append($(tempOption(item.district_id, item.district_name)));
            page.dialogs.elements.districtUp.append($(tempOption(item.district_id, item.district_name)));
        });

    }).fail(function () {
        App.IziToast.showErrorAlert(App.AlertMessageEn.ERROR_LOADING_DISTRICT);
    }).always(function () {
        page.elements.loader.addClass("hide");
    });
}

page.dialogs.loadData.getAllWards = (districtId) => {
    page.elements.loader.removeClass("hide");

    return $.ajax({
        type: "GET",
        url: page.urls.getAllWards + "/" + districtId
    }).done((data) => {

        $.each(data.results, (i, item) => {
            page.dialogs.elements.ward.append($(tempOption(item.ward_id, item.ward_name)));
            page.dialogs.elements.wardUp.append($(tempOption(item.ward_id, item.ward_name)));
        });

    }).fail(function () {
        App.IziToast.showErrorAlert(App.AlertMessageEn.ERROR_LOADING_WARD);
    }).always(function () {
        page.elements.loader.addClass("hide");

        if (page.elements.loading) {
            page.elements.loader.removeClass("hide");
        }
    });
}

page.dialogs.commands.provinceChange = () => {
    page.elements.loader.removeClass("hide");

    return $.ajax({
        type: "GET",
        url: page.urls.getAllDistricts + "/" + locationRegion.provinceId
    }).done((data) => {
        page.dialogs.elements.district.empty();
        page.dialogs.elements.districtUp.empty();

        $.each(data.results, (i, item) => {
            page.dialogs.elements.district.append($(tempOption(item.district_id, item.district_name)));
            page.dialogs.elements.districtUp.append($(tempOption(item.district_id, item.district_name)));
        });

    }).fail(function () {
        App.SweetAlert.showErrorAlert(App.AlertMessageEn.ERROR_LOADING_DISTRICT);
    }).always(function () {
        page.elements.loader.addClass("hide");
    });
}

page.dialogs.commands.districtChange = () => {
    page.elements.loader.removeClass("hide");

    $.ajax({
        type: "GET",
        url: page.urls.getAllWards + "/" + locationRegion.districtId
    }).done((data) => {
        page.dialogs.elements.ward.empty();
        page.dialogs.elements.wardUp.empty();

        $.each(data.results, (i, item) => {
            page.dialogs.elements.ward.append($(tempOption(item.ward_id, item.ward_name)));
            page.dialogs.elements.wardUp.append($(tempOption(item.ward_id, item.ward_name)));
        });

    }).fail(function () {
        App.SweetAlert.showErrorAlert(App.AlertMessageEn.ERROR_LOADING_WARD);
    }).always(function () {
        page.elements.loader.addClass("hide");
    });
}


page.dialogs.commands.createCustomer = () => {

    customer.id = 0;
    locationRegion.id = 0;

    locationRegion.provinceId = page.dialogs.elements.province.val();
    locationRegion.provinceName = page.dialogs.elements.province.find('option:selected').text();
    locationRegion.districtId = page.dialogs.elements.district.val();
    locationRegion.districtName = page.dialogs.elements.district.find('option:selected').text();
    locationRegion.wardId = page.dialogs.elements.ward.val();
    locationRegion.wardName = page.dialogs.elements.ward.find('option:selected').text();
    locationRegion.address = page.dialogs.elements.address.val();

    customer.fullName = page.dialogs.elements.fullName.val();
    customer.email = page.dialogs.elements.email.val();
    customer.phone = page.dialogs.elements.phone.val();
    customer.balance = 0;
    customer.locationRegion = locationRegion;

    page.elements.loader.removeClass("hide");

    socket.emit('create-customer', { customer, clientId });
}

page.dialogs.commands.updateCustomer = () => {

    locationRegion.provinceId = page.dialogs.elements.provinceUp.val();
    locationRegion.provinceName = page.dialogs.elements.provinceUp.find('option:selected').text();
    locationRegion.districtId = page.dialogs.elements.districtUp.val();
    locationRegion.districtName = page.dialogs.elements.districtUp.find('option:selected').text();
    locationRegion.wardId = page.dialogs.elements.wardUp.val();
    locationRegion.wardName = page.dialogs.elements.wardUp.find('option:selected').text();
    locationRegion.address = page.dialogs.elements.addressUp.val();

    customer.locationRegion = locationRegion;
    customer.fullName = page.dialogs.elements.fullNameUp.val();
    customer.email = page.dialogs.elements.emailUp.val();
    customer.phone = page.dialogs.elements.phoneUp.val();
    customer.balance = App.removeFormatNumberSpace(customer.balance);

    page.elements.loader.removeClass("hide");

    socket.emit('update-customer', { customer, clientId });
}

page.dialogs.commands.depositMoney = () => {
    deposit.customerId = page.dialogs.elements.customerIdDep.val();
    deposit.transactionAmount = page.dialogs.elements.transactionAmountDep.val();
    deposit.balance = App.removeFormatNumberSpace(deposit.balance);
    deposit.transactionAmount = App.removeFormatNumberSpace(deposit.transactionAmount);

    socket.emit('deposit', { deposit, clientId });
}

page.dialogs.commands.withdrawMoney = () => {
    withdraw.customerId = page.dialogs.elements.customerIdWd.val();
    withdraw.transactionAmount = page.dialogs.elements.transactionAmountWd.val();
    withdraw.balance = App.removeFormatNumberSpace(withdraw.balance);
    withdraw.transactionAmount = App.removeFormatNumberSpace(withdraw.transactionAmount);
    
    socket.emit('withdraw', { withdraw, clientId });
}

page.dialogs.commands.transferMoney = () => {
    transfer.balance = App.removeFormatNumberSpace(transfer.balance);
    transfer.transferAmount = App.removeFormatNumberSpace(page.dialogs.elements.transferAmountTrf.val());
    transfer.recipientId = page.dialogs.elements.recipientIdTrf.val();

    socket.emit('transfer', { transfer, clientId });
}

page.dialogs.commands.deactivateCustomer = () => {
    page.elements.loader.removeClass("hide");

    socket.emit('deactive-customer', { customer, clientId });
}

page.dialogs.close.modalCreateCustomer = () => {
    page.dialogs.alertDanger.modalCreate.empty().removeClass("show").addClass("hide");
    page.dialogs.elements.frmCreateCustomer.find("input.error").removeClass("error");
    page.dialogs.elements.frmCreateCustomer[0].reset();
    page.dialogs.elements.frmCreateCustomer.validate().resetForm();
}

page.dialogs.close.modalUpdateCustomer = () => {
    page.dialogs.alertDanger.modalUpdate.empty().removeClass("show").addClass("hide");
    page.dialogs.elements.frmUpdateCustomer.find("input.error").removeClass("error");
    page.dialogs.elements.frmUpdateCustomer[0].reset();
    page.dialogs.elements.frmUpdateCustomer.validate().resetForm();

    openModalUpdateCustomer = false;
}

page.dialogs.close.modalDeposit = () => {
    page.elements.currentRow.val("");
    $("table tr td").find(".select-tab.selected").removeClass("selected").addClass("unselected");
    page.dialogs.alertDanger.modalDeposit.empty().removeClass("show").addClass("hide");
    page.dialogs.elements.frmDeposit.find("input.error").removeClass("error");
    page.dialogs.elements.frmDeposit[0].reset();
    page.dialogs.elements.frmDeposit.validate().resetForm();
}

page.dialogs.close.modalWithdraw = () => {
    page.elements.currentRow.val("");
    $("table tr td").find(".select-tab.selected").removeClass("selected").addClass("unselected");
    page.dialogs.alertDanger.modalWithdraw.empty().removeClass("show").addClass("hide");
    page.dialogs.elements.frmWithdraw.find("input.error").removeClass("error");
    page.dialogs.elements.frmWithdraw[0].reset();
    page.dialogs.elements.frmWithdraw.validate().resetForm();
}

page.dialogs.close.modalTransfer = () => {
    page.elements.currentRow.val("");
    $("table tr td").find(".select-tab.selected").removeClass("selected").addClass("unselected");
    page.dialogs.alertDanger.modalTransfer.empty().removeClass("show").addClass("hide");
    page.dialogs.elements.frmTransfer.find("input.error").removeClass("error");
    page.dialogs.elements.frmTransfer[0].reset();
    page.dialogs.elements.frmTransfer.validate().resetForm();
}


page.initializeControlEvent = () => {

    $("a.nav-user").on("click", function (event) {
        event.stopPropagation();
        $(".profile-dropdown").slideToggle(250);
    });

    $(document).on("click", function () {
        $(".profile-dropdown").hide();
    });

    page.dialogs.elements.province.on("change", function () {
        locationRegion.provinceId = page.dialogs.elements.province.val();

        page.dialogs.commands.provinceChange().done(function () {
            locationRegion.districtId = page.dialogs.elements.district.prop("selectedIndex", 0).val();
            page.dialogs.commands.districtChange();
        });
    });

    page.dialogs.elements.district.on("change", function () {
        locationRegion.districtId = page.dialogs.elements.district.val();
        page.dialogs.commands.districtChange();
    });


    page.dialogs.elements.provinceUp.on("change", function () {
        locationRegion.provinceId = page.dialogs.elements.provinceUp.val();

        page.dialogs.commands.provinceChange().done(function () {
            locationRegion.districtId = page.dialogs.elements.districtUp.prop("selectedIndex", 0).val();
            page.dialogs.commands.districtChange();
        });
    });

    page.dialogs.elements.districtUp.on("change", function () {
        locationRegion.districtId = page.dialogs.elements.districtUp.val();
        page.dialogs.commands.districtChange();
    });

    page.elements.btnShowCreateForm.on("click", function () {
        page.commands.showCreateModal();
    });

    page.elements.footer.on("click", "button", function () {
        page.elements.footer.empty();
    });

    page.elements.footer.on("click", "button.edit", function () {
        page.commands.showUpdateModal();
    });

    page.elements.footer.on("click", "button.deposit", function () {
        deposit.customerId = customer.id;
        senderId = customer.id;
        page.commands.showDepositModal();
    });

    page.elements.footer.on("click", "button.withdraw", function () {
        withdraw.customerId = customer.id;
        senderId = customer.id;
        page.commands.showWithdrawModal();
    });

    page.elements.footer.on("click", "button.transfer", function () {
        transfer.senderId = customer.id;
        senderId = customer.id;
        page.commands.showTransferModal();
    });

    page.elements.footer.on("click", "button.deactivate", function () {
        page.commands.showDeactivateModal();
    });


    page.dialogs.elements.btnCreateCustomer.on("click", function () {
        page.dialogs.elements.frmCreateCustomer.trigger("submit");
    });

    page.dialogs.elements.btnUpdateCustomer.on("click", function () {
        page.dialogs.elements.frmUpdateCustomer.trigger("submit");
    });

    page.dialogs.elements.btnDepositMoney.on("click", function () {
        page.dialogs.elements.frmDeposit.trigger("submit");
    });

    page.dialogs.elements.btnWithdrawMoney.on("click", function () {
        page.dialogs.elements.frmWithdraw.trigger("submit");
    });

    page.dialogs.elements.btnTransferMoney.on("click", function () {
        page.dialogs.elements.frmTransfer.trigger("submit");
    });

    page.dialogs.elements.transferAmountTrf.on("change", function () {
        let transferAmount = App.removeFormatNumberSpace($(this).val());
        let fees = 10;
        let feeAmount = transferAmount * fees / 100;
        let transactionAmount = parseInt(transferAmount) + feeAmount;
        page.dialogs.elements.transactionAmountTrf.val(App.formatNumberSpace(transactionAmount));
    });

    page.dialogs.elements.modalCreateCustomer.on("hidden.bs.modal", function () {
        page.dialogs.close.modalCreateCustomer();
    });

    page.dialogs.elements.modalUpdateCustomer.on("hidden.bs.modal", function () {
        page.dialogs.close.modalUpdateCustomer();
    });

    page.dialogs.elements.modalDeposit.on("hidden.bs.modal", function () {
        page.dialogs.close.modalDeposit();
    });

    page.dialogs.elements.modalWithdraw.on("hidden.bs.modal", function () {
        page.dialogs.close.modalWithdraw();
    });

    page.dialogs.elements.modalTransfer.on("hidden.bs.modal", function () {
        page.dialogs.close.modalTransfer();
    });

    page.elements.logout.on("click", function () {
        $.removeCookie('JWT', { path: '/', domain: location.hostname });
    });
}


socket.on("server-connection", () => {
    clientId = socket.id;
    // console.log(clientId);
});

socket.on("get-all-customers-success", (data) => {
    if (data.length) {
        data.map((item) => {
            customer = item;
            locationRegion = customer.locationRegion;
            customer.balance = App.formatNumberSpace(customer.balance);
            page.commands.addRow();
        });

        page.commands.formatNumber();
    }
});

socket.on("get-all-customers-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

socket.on("get-customer-success", (data) => {
    let jsonData = JSON.parse(data);

    customer = jsonData.customer;
    locationRegion = customer.locationRegion;

    page.dialogs.elements.fullNameUp.val(customer.fullName);
    page.dialogs.elements.emailUp.val(customer.email);
    page.dialogs.elements.phoneUp.val(customer.phone);

    page.dialogs.elements.provinceUp.val(locationRegion.provinceId);

    page.dialogs.elements.districtUp.empty();

    page.dialogs.loadData.getAllDistricts(locationRegion.provinceId).then(function () {
        page.dialogs.elements.districtUp.val(locationRegion.districtId);

        page.dialogs.elements.wardUp.empty();

        page.dialogs.loadData.getAllWards(locationRegion.districtId).then(function () {
            page.dialogs.elements.wardUp.val(locationRegion.wardId);
        });
    });

    page.dialogs.elements.addressUp.val(locationRegion.address);

    page.dialogs.elements.modalUpdateCustomer.modal('show');

    openModalUpdateCustomer = true;
});

socket.on("get-customer-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

socket.on("create-customer-success", (resp) => {
    let jsonData = JSON.parse(resp);

    customer = jsonData.customer;
    page.commands.addRow();

    page.commands.formatNumber();

    if (clientId == jsonData.clientId) {
        App.Notify.showSuccessAlert(App.AlertMessageEn.SUCCESS_CREATED);
        page.dialogs.elements.modalCreateCustomer.modal('hide');
    }

});

socket.on("create-customer-error", (jqXHR) => {
    page.dialogs.alertDanger.modalCreate.empty().removeClass("hide").addClass("show");

    let jsonData = JSON.parse(jqXHR);

    let str = page.dialogs.commands.getErrorList(jsonData);

    page.dialogs.alertDanger.modalCreate.html(str);
});

socket.on("update-customer-success", (data) => {
    let jsonData = JSON.parse(data);

    customer = jsonData.customer;
    locationRegion = customer.locationRegion;

    customer.balance = App.formatNumberSpace(customer.balance);

    page.commands.updateRow();

    page.commands.formatNumber();

    if (clientId == jsonData.clientId) {
        page.elements.currentRow.val("");
        page.dialogs.elements.frmUpdateCustomer[0].reset();
        page.dialogs.elements.frmUpdateCustomer.validate().resetForm();

        App.Notify.showSuccessAlert(App.AlertMessageEn.SUCCESS_UPDATED);
        page.dialogs.elements.modalUpdateCustomer.modal('hide');
    }
    else {
        customer.id = customerId;
        customer.ts = ts;
    }
});

socket.on("update-customer-error", (jqXHR) => {
    let jsonData = JSON.parse(jqXHR);

    if (jsonData.ts == false) {
        App.SweetAlert.showErrorAlertConfirm(App.AlertMessageEn.ERROR_TS)
            .then((result) => {
                if (result.isConfirmed) {
                    page.dialogs.alertDanger.modalUpdate.empty().removeClass("show").addClass("hide");
                    socket.emit('get-customer', { customer, clientId });
                }
            });   
    }
    else {
        page.dialogs.alertDanger.modalUpdate.empty().removeClass("hide").addClass("show");

        let str = page.dialogs.commands.getErrorList(jsonData);

        page.dialogs.alertDanger.modalUpdate.html(str);
    }
});

socket.on("get-deposit-success", (data) => {
    let jsonData = JSON.parse(data);

    deposit = jsonData.customer;

    deposit.balance = App.formatNumberSpace(deposit.balance);
    page.dialogs.elements.customerIdDep.val(deposit.customerId);
    page.dialogs.elements.fullNameDep.val(deposit.fullName);
    page.dialogs.elements.balanceDep.val(deposit.balance);

    page.dialogs.elements.modalDeposit.modal('show');
});

socket.on("get-deposit-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

socket.on("deposit-success", (data) => {
    let jsonData = JSON.parse(data);

    customer = jsonData.customer;
    locationRegion = customer.locationRegion;

    customer.balance = App.formatNumberSpace(customer.balance);

    page.commands.updateRow();

    page.commands.formatNumber();

    if (senderId == customer.id) {
        page.dialogs.elements.balanceTrf.val(App.formatNumberSpace(customer.balance));
        page.dialogs.elements.balanceDep.val(App.formatNumberSpace(customer.balance));
        page.dialogs.elements.balanceWd.val(App.formatNumberSpace(customer.balance));
    }

    if (clientId == jsonData.clientId) {
        App.IziToast.showSuccessAlert(App.AlertMessageEn.SUCCESS_DEPOSIT);
        page.dialogs.elements.modalDeposit.modal('hide');
    }

});

socket.on("deposit-error", (jqXHR) => {
    page.dialogs.alertDanger.modalDeposit.empty().removeClass("hide").addClass("show");

    let jsonData = JSON.parse(jqXHR);

    let str = page.dialogs.commands.getErrorList(jsonData);

    page.dialogs.alertDanger.modalDeposit.html(str);
});

socket.on("get-withdraw-success", (data) => {
    let jsonData = JSON.parse(data);

    withdraw = jsonData.customer;

    withdraw.balance = App.formatNumberSpace(withdraw.balance);
    page.dialogs.elements.customerIdWd.val(withdraw.customerId);
    page.dialogs.elements.fullNameWd.val(withdraw.fullName);
    page.dialogs.elements.balanceWd.val(withdraw.balance);

    page.dialogs.elements.modalWithdraw.modal('show');
});

socket.on("get-withdraw-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

socket.on("withdraw-success", (resp) => {
    let jsonData = JSON.parse(resp);

    customer = jsonData.customer;
    locationRegion = customer.locationRegion;

    customer.balance = App.formatNumberSpace(customer.balance);

    page.commands.updateRow();

    page.commands.formatNumber();

    if (senderId == customer.id) {
        page.dialogs.elements.balanceTrf.val(App.formatNumberSpace(customer.balance));
        page.dialogs.elements.balanceDep.val(App.formatNumberSpace(customer.balance));
        page.dialogs.elements.balanceWd.val(App.formatNumberSpace(customer.balance));
    }

    if (clientId == jsonData.clientId) {
        App.IziToast.showSuccessAlert(App.AlertMessageEn.SUCCESS_WITHDRAW);
        page.dialogs.elements.modalWithdraw.modal('hide');
    }

});

socket.on("withdraw-error", (jqXHR) => {
    page.dialogs.alertDanger.modalWithdraw.empty().removeClass("hide").addClass("show");

    let jsonData = JSON.parse(jqXHR);

    let str = page.dialogs.commands.getErrorList(jsonData);

    page.dialogs.alertDanger.modalWithdraw.html(str);
});

socket.on("get-transfer-success", (data) => {
    let jsonData = JSON.parse(data);

    transfer = jsonData.transfer;

    let recipients = [];
    recipients = jsonData.recipients;

    let str = '';

    $.each(recipients, (i, item) => {
        str += `<option value="${item.recipientId}">(${item.recipientId}) ${item.recipientName}</option>`;
    });

    page.dialogs.elements.recipientIdTrf.html(str);

    page.dialogs.elements.senderIdTrf.val(transfer.senderId);
    page.dialogs.elements.senderNameTrf.val(transfer.senderName);
    page.dialogs.elements.emailTrf.val(transfer.email);
    transfer.balance = App.formatNumberSpace(transfer.balance);
    page.dialogs.elements.balanceTrf.val(transfer.balance);

    page.dialogs.elements.modalTransfer.modal('show');
});

socket.on("get-transfer-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

socket.on("transfer-success", (resp) => {

    let jsonData = JSON.parse(resp);

    sender = jsonData.sender;
    recipient = jsonData.recipient;

    if (senderId == sender.id) {
        page.dialogs.elements.balanceTrf.val(App.formatNumberSpace(sender.balance));
        page.dialogs.elements.balanceDep.val(App.formatNumberSpace(sender.balance));
        page.dialogs.elements.balanceWd.val(App.formatNumberSpace(sender.balance));
        page.dialogs.elements.transactionAmountTrf.val("");
    }

    if (senderId == recipient.id) {
        page.dialogs.elements.balanceTrf.val(App.formatNumberSpace(recipient.balance));
        page.dialogs.elements.balanceDep.val(App.formatNumberSpace(recipient.balance));
        page.dialogs.elements.balanceWd.val(App.formatNumberSpace(recipient.balance));
    }
    
    sender.balance = App.formatNumberSpace(sender.balance);
    customer = sender;
    page.commands.updateRow();

    recipient.balance = App.formatNumberSpace(recipient.balance);
    customer = recipient;
    page.commands.updateRow();

    page.dialogs.elements.transferAmountTrf.val("");

    page.commands.formatNumber();

    if (clientId == jsonData.clientId) {
        App.SweetAlert.showSuccessAlert(App.AlertMessageEn.SUCCESS_TRANSFER);
    }
});

socket.on("transfer-error", (jqXHR) => {
    page.dialogs.alertDanger.modalTransfer.empty().removeClass("hide").addClass("show");

    let jsonData = JSON.parse(jqXHR);

    let str = page.dialogs.commands.getErrorList(jsonData);

    page.dialogs.alertDanger.modalTransfer.html(str);
});


socket.on("deactive-customer-success", (resp) => {

    let jsonData = JSON.parse(resp);

    customer = jsonData.customer;

    $("#tr_" + customer.id).remove();
    
    if (clientId == jsonData.clientId) {
        App.SweetAlert.showSuccessAlert(App.AlertMessageEn.SUCCESS_DEACTIVATE);
    }
});

socket.on("deactive-customer-error", (statusCode) => {
    if (statusCode === 401) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_401);
    }

    if (statusCode === 403) {
        App.Notify.showErrorAlert(App.AlertMessageEn.ERROR_403);
    }
});

$(() => {
    socket.emit('create-room', 'CodeGym');
    socket.emit('get-all-customers');

    page.dialogs.loadData.getAllProvinces().then(function () {

        let province_id = page.dialogs.elements.province.prop("selectedIndex", 0).val();

        if (province_id != null) {
            page.dialogs.loadData.getAllDistricts(province_id).then(function () {

                let district_id = page.dialogs.elements.district.prop("selectedIndex", 0).val();

                if (district_id != null) {
                    page.dialogs.loadData.getAllWards(district_id);
                }
            });
        }
    });

    page.initializeControlEvent();

    appValidate();
});