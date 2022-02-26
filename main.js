// Screenshot authorication is required.
// requestScreenCapture();
"ui";
ui.layout(
    <vertical bg="#A8DAFC">
        <appbar>
            <toolbar title="暴走英雄壇跑環腳本" id="title" align="center" size="20em">
                <button bg="#FF00CED1" id="exitBtn" layout_gravity="right" textColor="#ffffff" text="離開" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
            </toolbar>
        </appbar>
        <horizontal marginTop="15">
            <text layout_weight="1" marginTop="5" gravity="center">請先打開無障礙服務以確保腳本能正常運行</text>
            <card bg="#FCEDA9">
                <Switch layout_weight="1" radius="80" marginRight="15" layout_gravity="right" paddingLeft="10" w="130dp" id="autoService" text="無障礙服務" checked="{{auto.service != null}}"></Switch>
            </card>
        </horizontal>

        <horizontal gravity="center" marginTop="150">
            <text textColor="#0f3140">自動跑環在老乞丐出現的那30分鐘會無法運行，請稍後再試。</text>
        </horizontal>
        <horizontal gravity="center" marginTop="10">
            <text textColor="#0f3140">請打開遊戲，進入鎮長家後再點選自動跑環按鈕。</text>
        </horizontal>
        <button id="autoDailyBtn" layout_gravity="center" w="80" text="自動跑環"></button>
        <button id="testBtn" layout_gravity="center" w="80" text="測試按鈕"></button>
        <button id="stopTestBtn" layout_gravity="center" w="80" text="停止測試按鈕"></button>
    </vertical>
);


let clickButton = (() => {
    var o_shouquan = text("允許").findOnce()
    if(o_shouquan){
        click(o_shouquan.bounds().centerX(), o_shouquan.bounds().centerY());
        sleep(500);
    }
});

var thread = threads.start(function(){
    setInterval(function(){
        
    }, 5000)
})

ui.testBtn.on("click", () => {
    thread.setTimeout(function(){
        log("当前线程(子线程):" + threads.currentThread());
        requestScreenCapture();
    }, 1000);
})

ui.stopTestBtn.on("click", () => {
    the_thread.interrupt();
    log("停止主線程");
})

ui.exitBtn.on("click", () => {
    threads.shutDownAll();
    ui.finish();
});

ui.autoService.on("check", function(checked){
    if(checked && auto.service == null){
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

ui.emitter.on("resume", function(){
    ui.autoService.checked = auto.service != null;
});

ui.autoDailyBtn.on("click", ()=>{
    if (ui.autoService.checked == false){
        alert("請先打開無障礙模式")
    }
    else{
        app.launchApp("暴走英雄壇");
        PickUpMission();
    }
});

// var declaration
let source = require('./source.js');
let ratio = (device.height * 0.5625 > device.width) ? device.width / 1080 : device.height / 1920;
const height = device.height * ratio;
const width = device.width * ratio;
const bigMap = [Math.round(device.width / 2 + width * 0.34), Math.round(device.height - height + height * 0.052)];
const closeBigMap = [Math.round(device.width / 2 + width * 0.426), Math.round(device.height - height + height * 0.265)];
let closeNpcWindow = [Math.round(device.width / 2 + width * 0.437), Math.round(device.height - height + height * 0.745)];

function readImages(selectedObject){
    let npc = images.read(source.npcObjectImages[selectedObject]);
    // the game's ratio is fixed. So the actual ratio depends on whether height * 0.5625 > width
    npc = images.scale(npc, ratio, ratio);
    return [npc, selectedObject]
}

function findThenClickObject(npc){
    let isNpcFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 20 times every 0.3sec before giving up
    while(countsForFindNPC < 20 && !isNpcFound){
        // isNpcFound returns both the XY coordinates and a boolean
        isNpcFound = findImage(captureScreen(), npc[0]);
        sleep(300);
        countsForFindNPC += 1;
    }
    
    if(isNpcFound){
        toast("已找到對象: " + npc[1]);
        isNpcFound = "" + isNpcFound;
        let coordinates = isNpcFound.substring(1, isNpcFound.length-1).split(".0, ");
        click(parseInt(coordinates[0]), parseInt(coordinates[1]));
    }
    else{
        toast("未找到對象");
        engines.stopAll();
    }
}

// This override function is for mission
function findObject(object){
    let isObjectFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 20 times every 0.3sec before giving up
    while(countsForFindNPC < 2 && !isObjectFound){
        // isObjectFound returns both the XY coordinates and a boolean
        isObjectFound = findImage(captureScreen(), object[0], {
            threshold: 0.99
        });
        countsForFindNPC += 1;
    }
    
    if(isObjectFound){
        isObjectFound = "" + isObjectFound;
        let coordinates = isObjectFound.substring(1, isObjectFound.length-1).split(".0, ");
        return object[1];
    }
}

function talkToObject(){
    findThenClickObject(readImages("交談"), 300);
}

function swipeLeft(){
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    0, Math.round(device.height * ratio * 0.5), 500);
}

function swipeRight(){
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    Math.round(device.width * ratio), Math.round(device.height * ratio * 0.5), 500);
}

// 在鎮長家使用 
function PickUpMission(){
    findThenClickObject(readImages("鎮長"));
    talkToObject();
    sleep(500);
    click(device.width/2, device.height/2);
    let town = GetTown();
    return GetNPC(town);
}

function GetTown(){
    let town;
    let count = 0;
    while(count < source.allPossibleTowns.length * 2 && town == undefined){
        town = findObject(readImages(source.allPossibleTowns[count % source.allPossibleTowns.length]), true);
        count++;
    }
    return town.slice(0, town.length-1);
}

function GetNPC(town){
    let NPC;
    let count = 0;
    let possibleNPCs = [];
    for(var place in source.allNPCLocation[town]){ 
        for(var npc in source.allNPCLocation[town][place]){
            possibleNPCs.push([town, place, npc]);
        }
    }
    while(count < possibleNPCs.length && NPC == undefined){
        NPC = findObject(readImages(possibleNPCs[count][2] + "環"));
        count++;
    }
    click(bigMap[0], bigMap[1]);
    return possibleNPCs[count-1];
}


// toast(PickUpMission());