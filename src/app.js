/**
 * Title     : Master Control Program: Graphical
 * Author    : Mark Heckler
 * Date      : 20160701
 * Revisions : 
 *
 */

var UI = require('ui');
var Vector2 = require('vector2');
var serverMCP = "wss://mcp.cfapps.io:4443";
var wsData = serverMCP + "/data";
var wsCtrl = serverMCP + "/control";
var statusNum = -1;
var readingStatus = {
  autoMode: false,
  powerOn: false,
  statusLamp: false,
  windowsOpen: false,
  intLightOn: false
};
var TXTOFFSET = 6;
var LABEL_FONT = 'gothic-14';
var READING_FONT = 'leco-36-bold-numbers';
var TMIN = -15;
var TMAX = 45;
var HMIN = 0;
var HMAX = 100;
var VMIN = 11;
var VMAX = 16;
var LMIN = 0;
var LMAX = 4;
var WSMIN = 0;
var WSMAX = 100;
var RMIN = 0;
var RMAX = 10;
var PMIN = 90000;
var PMAX = 110000;

var TLABEL = ' ˚C';
var HLABEL = ' %';
var VLABEL = ' v';
var LLABEL = ' w';
var WSLABEL = ' mph';
// var WDLABEL = '';
var RLABEL = ' in';
var PLABEL = ' Pa';

var page1 = new UI.Window({
  status: false
});
var page2 = new UI.Window({
  status: false
});
var statusMenu = new UI.Menu();
var gaugeSize = page1.size()
  .divideScalar(2);
var xSize = gaugeSize.x - 2;
var ySize = gaugeSize.y - 2;
// console.log("xSize=" + xSize);
// console.log("ySize=" + ySize);
var radOffset = new Vector2(0,0);
var txtOffset = new Vector2(0,0);

/*
 *
 * PAGE 1 CONFIGURATION
 *
 */
/*
 * Temperature
 */
var tRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
// No radial offset for temp; it's still (0, 0) where it belongs
txtOffset.set(0, TXTOFFSET);

// Center the temperature Radial in its segment
var radPos = tRad.position()
  .addSelf(gaugeSize)
  .subSelf(tRad.size())
  .multiplyScalar(0.5);
tRad.position(radPos);

var tLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
var txtPos = tLabel.position()
  .addSelf(gaugeSize)
  .subSelf(tLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
tLabel.position(txtPos);

// Add it to the window!
page1.add(tRad);
page1.add(tLabel);

/*
 * Humidity
 */
var hRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
radOffset.set(gaugeSize.x, 0);
txtOffset.set(gaugeSize.x, TXTOFFSET);

// Center the humidity Radial in its segment
radPos = hRad.position()
  .addSelf(gaugeSize)
  .subSelf(hRad.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
hRad.position(radPos);

var hLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = hLabel.position()
  .addSelf(gaugeSize)
  .subSelf(hLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
hLabel.position(txtPos);

// Add it to the window!
page1.add(hRad);
page1.add(hLabel);

/*
 * Voltage
 */
var vRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
radOffset.set(0, gaugeSize.y);
txtOffset.set(0, gaugeSize.y + TXTOFFSET);

// Center the humidity Radial in its segment
radPos = vRad.position()
  .addSelf(gaugeSize)
  .subSelf(vRad.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
vRad.position(radPos);

var vLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = vLabel.position()
  .addSelf(gaugeSize)
  .subSelf(vLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
vLabel.position(txtPos);

// Add it to the window!
page1.add(vRad);
page1.add(vLabel);

/*
 * Lumens
 */
var lRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
radOffset.set(gaugeSize.x, gaugeSize.y);
txtOffset.set(gaugeSize.x, gaugeSize.y + TXTOFFSET);

// Center the humidity Radial in its segment
radPos = lRad.position()
  .addSelf(gaugeSize)
  .subSelf(lRad.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
lRad.position(radPos);

var lLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = lLabel.position()
  .addSelf(gaugeSize)
  .subSelf(lLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
lLabel.position(txtPos);

// Add it to the window!
page1.add(lRad);
page1.add(lLabel);

/*
 *
 * PAGE 2 CONFIGURATION
 *
 */
/*
 * Wind speed
 */
var wsRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
// No radial offset for windspeed; it's still (0, 0) where it belongs
txtOffset.set(0, TXTOFFSET);

// Center the temperature Radial in its segment
var radPos = wsRad.position()
  .addSelf(gaugeSize)
  .subSelf(wsRad.size())
  .multiplyScalar(0.5);
wsRad.position(radPos);

var wsLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
var txtPos = wsLabel.position()
  .addSelf(gaugeSize)
  .subSelf(wsLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
wsLabel.position(txtPos);

// Add it to the window!
page2.add(wsRad);
page2.add(wsLabel);

/*
 * Wind Direction
 */
var wdReadout = new UI.Text({
  size: new Vector2(xSize, ySize * 0.75),
  font: READING_FONT,
  text: '',
  textAlign: 'center'
});

// Adjust offsets to position controls
radOffset.set(gaugeSize.x, 0);
txtOffset.set(gaugeSize.x, TXTOFFSET);

// Center the humidity Radial in its segment
radPos = wdReadout.position()
  .addSelf(gaugeSize)
  .subSelf(wdReadout.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
wdReadout.position(radPos);

var wdLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = wdLabel.position()
  .addSelf(gaugeSize)
  .subSelf(wdLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
wdLabel.position(txtPos);

// Add it to the window!
page2.add(wdReadout);
page2.add(wdLabel);

/*
 * Rainfall
 */
var rRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
radOffset.set(0, gaugeSize.y);
txtOffset.set(0, gaugeSize.y + TXTOFFSET);

// Center the humidity Radial in its segment
radPos = rRad.position()
  .addSelf(gaugeSize)
  .subSelf(rRad.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
rRad.position(radPos);

var rLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = rLabel.position()
  .addSelf(gaugeSize)
  .subSelf(rLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
rLabel.position(txtPos);

// Add it to the window!
page2.add(rRad);
page2.add(rLabel);

/*
 * Atmospheric Pressure
 */
var pRad = new UI.Radial({
  size: new Vector2(xSize, ySize),
  angle: -90,
  angle2: 90,
  radius: 10,
  backgroundColor: 'cyan',
  borderColor: 'celeste',
  borderWidth: 1,
});

// Adjust offsets to position controls
radOffset.set(gaugeSize.x, gaugeSize.y);
txtOffset.set(gaugeSize.x, gaugeSize.y + TXTOFFSET);

// Center the humidity Radial in its segment
radPos = pRad.position()
  .addSelf(gaugeSize)
  .subSelf(pRad.size())
  .multiplyScalar(0.5)
  .addSelf(radOffset);
pRad.position(radPos);

var pLabel = new UI.Text({
  size: new Vector2(xSize * 0.75, ySize * 0.5),
  font: LABEL_FONT,
  text: '',
  textAlign: 'center'
});

// Center the temperature label in its segment
txtPos = pLabel.position()
  .addSelf(gaugeSize)
  .subSelf(pLabel.size())
  .multiplyScalar(0.5)
  .addSelf(txtOffset);
pLabel.position(txtPos);

// Add it to the window!
page2.add(pRad);
page2.add(pLabel);

/*
 * Set up navigation
 */
page1.on('click', 'down', function(e) {
  page2.show();
});

page2.on('click', 'up', function(e) {
  page1.show();
});

/*
 * Show Page 1
 */
page1.show();

/*
 * Data functionality
 */
function populateStatus(status) {
  if (status > 31) {
    readingStatus.autoMode = true;
    status -= 32;
  } else {
    readingStatus.autoMode = false;
  }
  
  if (status > 15) {
    readingStatus.powerOn = true;
    status -= 16;
  } else {
    readingStatus.powerOn = false;
  }
  
  if (status > 7) {
    readingStatus.statusLamp = true;
    status -= 8;
  } else {
    readingStatus.statusLamp = false;    
  }
  
  if (status > 3) {
    readingStatus.windowsOpen = true;
    status -= 4;
  } else {
    readingStatus.windowsOpen = false;
  }
  
  if (status > 1) {
    readingStatus.intLightOn = true;
    status -= 2;
  } else {
    readingStatus.intLightOn = false;
  }
}

var webSocketData = new WebSocket(wsData);

webSocketData.onopen = function(event) {
  console.log("Data websocket open.");
};

webSocketData.onclose = function(event) {
  console.log("Data websocket closed.");
};

webSocketData.onmessage = function(event) {
  //console.log("Message received: " + event.data);
  console.log("Data received.");
  
  var json = JSON.parse(event.data);
  //var time = new Date().getTime();

  // Extract data
  //var temp = json.temp.toFixed(1) + ' C';
  var temp = json.temp.toFixed(1);
  var hum = json.hum.toFixed(1);
  var volts = json.volts.toFixed(2);
  var lum = json.lum.toFixed(2);
  var windDir = json.windDir;
  var windSpeed = json.windSpeed.toFixed(2);
  var rainfall = json.rainfall.toFixed(1);
  var pressure = json.pressure.toFixed(0);
  //var status = json.status;

  if (json.status !== null) {
    var st = parseInt(json.status);
    if (st !== parseInt(statusNum)) {
      // Store newly-received status as current
      statusNum = st;
      
      // Populate readingStatus object with current values for physical interfaces
      populateStatus(st);
    }
  }

  tRad.angle2(((temp - TMIN) / (TMAX-TMIN) * 180) - 90);
  hRad.angle2(((hum - HMIN) / (HMAX-HMIN) * 180) - 90);
  vRad.angle2(((volts - VMIN) / (VMAX-VMIN) * 180) - 90);
  lRad.angle2(((lum - LMIN) / (LMAX-LMIN) * 180) - 90);
  wsRad.angle2(((windSpeed - WSMIN) / (WSMAX-WSMIN) * 180) - 90);
  wdReadout.text(windDir);
  rRad.angle2(((rainfall - RMIN) / (RMAX-RMIN) * 180) - 90);
  pRad.angle2(((pressure - PMIN) / (PMAX-PMIN) * 180) - 90);
  
  tLabel.text(temp + TLABEL);
  hLabel.text(hum + HLABEL);
  vLabel.text(volts + VLABEL);
  lLabel.text(lum + LLABEL);
  wsLabel.text(windSpeed + WSLABEL);
  // No label for wind direction, just the readout
  rLabel.text(rainfall + RLABEL);
  pLabel.text(pressure + PLABEL);
};

/*
 * Data+Control functionality
 */
var populateStatusMenu = function(currentStatus) {
  var items = [];

  items.push({
    title: 'Control Mode',
    subtitle: (currentStatus.autoMode ? 'Autonomous' : 'Manual Override')
  });
  items.push({
    title: 'Power',
    subtitle: (currentStatus.powerOn ? 'ON' : 'off')
  });
  items.push({
    title: 'Status Lamp',
    subtitle: (currentStatus.statusLamp ? 'ON' : 'off')
  });
  items.push({
    title: 'Windows',
    subtitle: (currentStatus.windowsOpen ? 'OPEN' : 'closed')
  });
  items.push({
    title: 'Interior Light',
    subtitle: (currentStatus.intLightOn ? 'ON' : 'off')
  });

  //console.log("items=" + JSON.stringify(items, null, 4));
  
  // Finally return whole array
  return items;
};

var showMenu = function() {
  // Construct Menu to show to user
  statusMenu.items(0,populateStatusMenu(readingStatus));
  statusMenu.show();
};

page1.on('click', 'select', function(e) {
  showMenu();
});
page2.on('click', 'select', function(e) {
  showMenu();
});

/*
 * Control functionality
 */
var updateStatusWithCommand = function(command) {
    switch (command) {
    case "A":
      readingStatus.autoMode = true;
      //auto();  MAH - have to disable others when in "auto"
      break;
    case "a":
      readingStatus.autoMode = false;
      //manual();  MAH - have to enable others when in "manual"
      break;
    case "P":
      readingStatus.powerOn = true;
      break;
    case "p":
      readingStatus.powerOn = false;
      break;
    case "L":
      readingStatus.statusLamp = true;
      break;
    case "l":
      readingStatus.statusLamp = false;
      break;
    case "W":
      readingStatus.windowsOpen = true;
      break;
    case "w":
      readingStatus.windowsOpen = false;
      break;
    case "I":
      readingStatus.intLightOn = true;
      break;
    case "i":
      readingStatus.intLightOn = false;
      break;
  }
};

var webSocketCtrl = new WebSocket(wsCtrl);

webSocketCtrl.onopen = function(event) {
  console.log("Control websocket opened.");
};

webSocketCtrl.onclose = function(event) {
  console.log("Control websocket closed.");
};

webSocketCtrl.onmessage = function(event) {
  var command = event.data;
  console.log("Control websocket event received: " + command);
  updateStatusWithCommand(command.substring(1, 2));
  showMenu();
};

statusMenu.on('select', function(e) {
  var command = "";

  if (readingStatus.autoMode) {
    if (e.itemIndex === 0) {
      command = "a";
    }
  } else {
    switch(e.itemIndex) {
      case 0:
        command = "A";
        break;
      case 1:
        command = (readingStatus.powerOn ? "p" : "P");
        break;
      case 2:
        command = (readingStatus.statusLamp ? "l" : "L");
        break;
      case 3:
        command = (readingStatus.windowsOpen ? "w" : "W");
        break;
      case 4:
        command = (readingStatus.intLightOn ? "i" : "I");
        break;
        //default:
    }      
  }
  console.log("Sending control command: " + command);
  
  webSocketCtrl.send('0' + command);
  updateStatusWithCommand(command);
  showMenu();
});
