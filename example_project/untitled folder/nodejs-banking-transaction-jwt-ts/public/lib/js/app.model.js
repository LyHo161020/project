class LocationRegion {
    constructor(id, provinceId, provinceName, districtId, districtName, wardId, wardName, address) {
        this.id = id;
        this.provinceId = provinceId;
        this.provinceName = provinceName;
        this.districtId = districtId;
        this.districtName = districtName;
        this.wardId = wardId;
        this.wardName = wardName;
        this.address = address;
    }
}

class Customer {
    constructor(id, fullName, email, phone, locationRegion, balance, ts) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.locationRegion = locationRegion;
        this.balance = balance;
        this.ts = ts;
    }
}

class Sender extends Customer {
    constructor() {
        super()
    }
}

class Recipient extends Customer {
    constructor() {
        super()
    }
}

class Deposit {
    constructor(customerId, fullName, balance, transactionAmount) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.balance = balance;
        this.transactionAmount = transactionAmount;
    }
}

class Withdraw {
    constructor(customerId, fullName, balance, transactionAmount) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.balance = balance;
        this.transactionAmount = transactionAmount;
    }
}

class Transfer {
    constructor(senderId, senderName, email, recipientId, recipientName, balance, transferAmount, fees, feesAmount, transactionAmount) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.email = email;
        this.recipientId = recipientId;
        this.recipientName = recipientName;
        this.balance = balance;
        this.transferAmount = transferAmount;
        this.fees = fees;
        this.feesAmount = feesAmount;
        this.transactionAmount = transactionAmount;
    }
}

export {
    LocationRegion,
    Customer,
    Sender,
    Recipient,
    Deposit,
    Withdraw,
    Transfer
};