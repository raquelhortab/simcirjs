!function($s) {

  'use strict';

  var $ = $s.$;

  // unit size
  var unit = $s.unit;
  
    function createLogicInputFactory(value){
      return function(device){
        var val = value ? 1 : null;
        var style = value ? "true" : "false";
        var text = value ? "1" : "0";
        device.addOutput();
        var super_createUI = device.createUI;
        var size = device.getSize();
        device.createUI = function() {
          super_createUI();
          device.$ui.addClass('simcir-logic-input');
          device.$ui.addClass(style);
          var g = $s.graphics(device.$ui);
          g.drawText((size.width/2 - 5), (size.height/2 + 5),size.width,size.height, text, "18px");
        };
        device.$ui.on('deviceAdd', function() {
          device.getOutputs()[0].setValue(val);
        });
        device.$ui.on('deviceRemove', function() {
          device.getOutputs()[0].setValue(null);
        });
      }
    }
    
    
    simcir.registerDevice('High', createLogicInputFactory(true) );
    simcir.registerDevice('Low', createLogicInputFactory(false) );
    
}(simcir);

