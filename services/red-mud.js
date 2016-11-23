var RedMudServices = angular.module('RedMudServices', []);

RedMudServices.factory('MUDVerify', [function() {
    var socket = io.connect('http://localhost:8080');
    var verifyHandlers = [];

    socket.on('verify', function(success) {
        verifyHandlers.forEach(function(callback) {
            callback(success);
        });
    });

    function on(callback) {
        verifyHandlers.push(callback);
    }

    function verify(username, code) {
        console.log(username);
        console.log(code);
        socket.emit('verify', { username: username, code: code });
    }

    return {
        on: on,
        verify: verify
    };
}]);

RedMudServices.factory('MUDCommand', [function() {

}]);

RedMudServices.factory('MUDLogin', ['$http', function($http) {
    function login(username, password) {
        return new Promise(function(resolve, reject) {
            var pwhash = CryptoJS.SHA256(password).toString();
            $http.post('http://localhost:8080/api/login', { username: username, pwhash: pwhash })
                .then(function(response) {
                    console.log(response.data);
                    if (response.data.success) {
                        resolve(response.data.clientCode);
                    } else {
                        reject("nope");
                    }
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    }

    return {
        login: login
    };
}]);