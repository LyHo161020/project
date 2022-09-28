class User {
    constructor(id, username, password, fullName, phone, email, address, dateOfBirth, status, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.role = role;
    }
}




class ShowSchedule {
    constructor(id, movieId, movieName, roomId,roomName, branchId, branchName, showDate, showTimeSlot) {
        this.id = id;
        this.movieId = movieName;
        this.movieName = movieName;
        this.roomId = roomId;
        this.roomName = roomName;
        this.branchId = branchId;
        this.branchName = branchName;
        this.showDate = showDate;
        this.showTimeSlot = showTimeSlot;
    }
}

class Branch {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}


class Room {
    constructor(id, name, capacity, numberOfRows) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.numberOfRows = numberOfRows;
    }
}


class Status {
    constructor(id, status) {
        this.id = id;
        this.statusName = status;
    }
}

class Role {
    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}


class Movie {
    constructor(id, title, premiereDate, showDuration, categories, fileUrl, director, actor, language, description) {
        this.id = id;
        this.title = title;
        this.premiereDate = premiereDate;
        this.showDuration = showDuration;
        this.categories = categories;
        this.fileUrl = fileUrl;
        this.director = director;
        this.actor = actor;
        this.language = language;
        this.description = description;
    }
}


class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Food {
    constructor(id, name, price, size, deleted) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.sizes = size;
        this.deleted = deleted;

    }
}

class Size {
    constructor(id, size) {
        this.id = id;
        this.size = size;
    }
}

class Seat {
    constructor(id, name, seatType, room) {
        this.id = id;
        this.name = name;
        this.seatType = seatType;
        this.room = room;
    }
}

class SeatType {
    constructor(id , name , price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Invoice {
    constructor(id, customer, createAt, createBy, updatedAt , updatedBy, grandTotal) {
        this.id = id;
        this.customer = customer;
        this.createAt = createAt;
        this.createBy = createBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.grandTotal = grandTotal;
    }
}

class Ticket {
    constructor(id , showSchedule, invoice , seat , price , createAt, createBy) {
        this.id = id;
        this.showSchedule = showSchedule;
        this.invoice = invoice;
        this.seat = seat;
        this.price = price;
        this.createAt = createAt;
        this.createBy = createBy;
    }
}

export {
    User,
    Seat,
    SeatType,
    ShowSchedule,
    Status,
    Role,
    Room,
    Size,
    Food,
    Category,
    Movie,
    Branch,
    Invoice,
    Ticket
};