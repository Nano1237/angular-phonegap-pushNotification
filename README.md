# angular-phonegap-pushNotification

An `AngularJS` Module for the [PushPlugin](https://github.com/phonegap-build/PushPlugin/blob/1979d972b6ab37e28cf2077bc7ebfe706cc4dacd/README.md)

#####Dependencies
- It's build for the [phonegap-build/PushPlugin](https://github.com/phonegap-build/PushPlugin/blob/1979d972b6ab37e28cf2077bc7ebfe706cc4dacd/README.md)
- The Phonegap [Device Plugin](https://github.com/apache/cordova-plugin-device/blob/c6e23d8a61793c263443794d66d40723b4d04377/doc/index.md) (it expects the device to be an android if not set)
- [AngularJS](https://angularjs.org/) (*Who would have thought it?*)

##Usage

- Install the `Cordova Push Notifications Plugin`
- Install the `Device Plugin`
- Install the `angular-phonegap-pushNotification Plugin`
- Add the `angular-phonegap-pushNotification Plugin` to the Apps Dependencies:
```
angular.module('app', ['angular-phonegap-pushNotification']);
```
- Require the `pushNotification` factory:
```
myApp.controller('ExampleCtrl',[
    'pushNotification',
    function(pushNotification){
        //the following code goes here
    }
]);
```
- Set the `registered` Event **BEFORE** the `pushNotification.init` (*see next point*)
```
 pushNotification.addListener('registered',function(e){
    e.regid;//The RegistrationId for the Device (needed to send Push Notifications)
 });
```
- Initalize the Plugin with the `pushNotification.init` Method **AFTER** the Cordovas `deviceready` Event (see previous point)
```
...
document.addEventListener('deviceready', function() {
    pushNotification.init('0000000000');//The google senderID
});
...
```
- Now add Listeners for (*for example*) incoming Messages (you can add this Listener Anytime, its not neccesary that you add it after the two pints before)
```
pushNotification.addListener('message',function(e){
    e;//The Message Object
 });
```

For more Information read the [Cordova Push Notifications Plugin Documentation](https://github.com/phonegap-build/PushPlugin/blob/1979d972b6ab37e28cf2077bc7ebfe706cc4dacd/README.md)