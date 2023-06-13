"use strict";

var io = require('socket.io')(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

var users = [];

var addUser = function addUser(userId, socketId, userInfo) {
    var checkUser = users.some(function(u) {
        return u.userId === userId;
    });

    if (!checkUser) {
        users.push({
            userId: userId,
            socketId: socketId,
            userInfo: userInfo
        });
    }
};

var userRemove = function userRemove(socketId) {
    users = users.filter(function(u) {
        return u.socketId !== socketId;
    });
};

var findFriend = function findFriend(id) {
    return users.find(function(u) {
        return u.userId === id;
    });
};

var userLogout = function userLogout(userId) {
    users = users.filter(function(u) {
        return u.userId !== userId;
    });
};

io.on('connection', function(socket) {
    console.log('user is connected.....');
    socket.on('addUser', function(userId, userInfo) {
        addUser(userId, socket.id, userInfo);
        io.emit('getUser', users);
        var us = users.filter(function(u) {
            return u.userId !== userId;
        });
        var con = 'new_user_add';

        for (var i = 0; i < us.length; i++) {
            socket.to(us[i].socketId).emit('new_user_add', con);
        }
    });
    socket.on('sendMessage', function(data) {
        var user = findFriend(data.reseverId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('getMessage', data);
        }
    });
    socket.on('messageSeen', function(msg) {
        var user = findFriend(msg.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgSeenResponse', msg);
        }
    });
    socket.on('delivaredMessage', function(msg) {
        var user = findFriend(msg.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgDelivaredResponse', msg);
        }
    });
    socket.on('seen', function(data) {
        var user = findFriend(data.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('seenSuccess', data);
        }
    });
    socket.on('typingMessage', function(data) {
        var user = findFriend(data.reseverId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('typingMessageGet', {
                senderId: data.senderId,
                reseverId: data.reseverId,
                msg: data.msg
            });
        }
    });
    socket.on('logout', function(userId) {
        userLogout(userId);
    });
    socket.on('disconnect', function() {
        console.log('user disconnect....');
        userRemove(socket.id);
        io.emit('getUser', users);
    });
});