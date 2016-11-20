var app = angular.module('RedMudPrimitiveClient', []);

app.controller('RedMudPrimitiveController', function($scope, $http) {
    //$scope.gameState = GameState();
    //$scope.communicationHandler = ServerCommHandler($scope.gameState.addText);

    $scope.gameState = {};
    $scope.gameState.currentCommand = "";
    $scope.gameState.text = [];

    var socket = io("http://localhost:3000");

    function sendCommand() {
        new Promise(function(resolve, reject) {
                try {
                    socket.emit('chat message', $scope.gameState.currentCommand);
                    resolve();
                } catch (err) {
                    $scope.gameState.text.push(err);
                    reject(err);
                }
            })
            .then(function() {
                $scope.gameState.currentCommand = "";
            });
    }
    $scope.sendCommand = sendCommand;

    socket.on('chat message', function(msg) {
        new Promise(function(resolve, reject) {
                try {
                    $scope.gameState.text.push(msg);
                    resolve();
                } catch (err) {
                    $scope.gameState.text.push(err);
                    reject(err);
                }
            })
            .then(function() {
                $scope.$apply();
            });
    });
});