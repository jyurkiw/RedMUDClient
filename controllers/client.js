var app = angular.module('RedMudPrimitiveClient', ['RedMudServices']);

app.controller('RedMudPrimitiveController', function($scope, $http, MUDLogin, MUDCommand, MUDVerify) {
    //$scope.gameState = GameState();
    //$scope.communicationHandler = ServerCommHandler($scope.gameState.addText);

    $scope.gameState = {};
    $scope.gameState.currentCommand = "";
    $scope.gameState.text = [];

    MUDVerify.on(function(success) { console.log('verify was ' + success); });

    MUDLogin.login('testUser1', '12345')
        .then(function(confirmationCode) {
            MUDVerify.verify('testUser1', confirmationCode);
        });

    function sendCommand() {
        new Promise(function(resolve, reject) {
                try {
                    MUDCommand.raw($scope.gameState.currentCommand);
                    console.log('sent: ' + $scope.gameState.currentCommand);
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

    socket.on('instant', function(msg) {
        console.log('received instant message');
        console.log(msg);
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