!function($s) {

  'use strict';

  var $ = $s.$;

  // unit size
  var unit = $s.unit;
    
    $s.registerDevice('Clk', function(device){
      var period = device.deviceDef.period || 500;
      var out1 = device.addOutput();
      
      device.$ui.on('deviceAdd', function() {
        $s.connectDeviceToClock(device);
      });
      
      device.$ui.on('deviceRemove', function() {
        $s.disconnectDeviceFromClock(device);
      });
    
      var super_createUI = device.createUI;
      device.createUI = function() {
        super_createUI();
        device.$ui.addClass('simcir-basicset-osc');
        device.doc = {
          params: [
            {name: 'freq', type: 'number', defaultValue: '10',
              description: 'frequency of an oscillator.'}
          ],
          code: '{"type":"' + device.deviceDef.type + '","freq":10}'
        };
      };
    });
    
    
    //
    
  $s.clockFrequency = 2;
  $s.clock = false;
  $s.clockSignal = 1;
  $s.clockDevices = [];
  
  var turnOn, turnOff;
  turnOn = function(){
    $s.clockDevices.forEach(device => device.getOutputs()[0].setValue(1));
    console.log("on")
    if($s.clock) window.setTimeout(turnOff,100);
  };
  turnOff = function(){
    $s.clockDevices.forEach(device => device.getOutputs()[0].setValue(null));
    console.log("off")
    if($s.clock) window.setTimeout(turnOn,(1000/$s.clockFrequency)-100);
  };
  
  $s.enableClock = function(){
    $s.clock = true;
    turnOn();
  }
  
  $s.disableClock = function(){
    $s.clock = false;
  }
  
  $s.connectDeviceToClock = function(device){
    $s.clockDevices.push(device);
  };
  
  $s.disconnectDeviceFromClock = function(device){
    const index = $s.clockDevices.indexOf(device);
    if (index > -1) {
      $s.clockDevices.splice(index, 1);
    }
  };
  
  $s.setClockFrequency = function(value){
    $s.clockFrequency = value;
  };
  //
    
}(simcir);

