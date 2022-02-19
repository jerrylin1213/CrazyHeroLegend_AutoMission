// Screenshot authorication is required.
if(!requestScreenCapture()){
toast("请求截图失败");
exit();
}
app.launchApp("暴走英雄壇");



// var declaration

let ratio = (device.height * 0.5625 > device.width) ? device.width / 1080 : device.height / 1920;
const bigMap = [Math.round((device.width * ratio) * 0.84), Math.round((device.height * ratio)) * 0.052];
const closeBigMap = [Math.round((device.width * ratio) * 0.926), Math.round((device.height * ratio)) * 0.265];
let closeNpcWindow = [Math.round((device.width * ratio) * 0.937), Math.round((device.height * ratio)) * 0.745];








function readImages(selectedObject){
    let npc = images.read(npcObjectImages[selectedObject]);
    // the game's ratio is fixed. So the actual ratio depends on whether height * 0.5625 > width
    npc = images.scale(npc, ratio, ratio);
    return [npc, selectedObject]
}

function findObject(npc, wait){
    let isNpcFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 20 times before giving up
    while(countsForFindNPC < 20 && !isNpcFound){
        // isNpcFound returns both the XY coordinates and a boolean
        isNpcFound = findImage(captureScreen(), npc[0]);
        sleep(wait);
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

function talkToObject(){
    findObject(readImages("交談"), 300);
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

sleep(500);
// Dictionary for NPCs' locations. (Key=NPC_name, Value=NPC_Img)
const npcObjectImages = {
    //平安
    神秘人: "./1.JPG",
    李白: "./2.JPG",
    鎮長: "./3.JPG",
    交談: "./4.JPG",
    鞭龍: "./bian.JPG",
    戰鬥: "./fight.JPG",
    進客棧: "./p1.JPG",
    進雜貨店: "./p2.JPG",
    進古董店: "./p3.JPG",
    進鐵匠鋪: "./p4.JPG",
    進當鋪: "./p5.JPG",
    進北郊: "./p6.JPG",
    進南郊: "./p7.JPG",
    北郊進中心: "./p8.JPG",
    南郊進中心: "./p9.JPG",
    瘋老頭官兵位置: "./pfg.JPG",
    //驛站
    平安驛站: "./paStation.JPG",
    驛站: "./station.JPG",
    驛站苗疆: "./ptaichi.JPG",
    驛站少林: "./pdaxueshan.JPG",
    驛站大雪: "./pshaolin.JPG",
    驛站太極: "./pmiaojiang.JPG",
    驛站藏血: "./pcang.JPG",
    驛站丐幫: "./pgai.JPG",
    驛站雪焰: "./pxue.JPG",
    驛站百花: "./pbai.JPG",
}
// findObject(readImages("鎮長"), 300);
// talkToObject();
click(bigMap[0], bigMap[1]);
// findObject(readImages("平安驛站"), 300)
// click(closeBigMap[0], closeBigMap[1]);
// sleep(5000);
// findObject(readImages("驛站"), 300)
// findObject(readImages("驛站百花"), 300)
swipeLeft();
engines.stopAll();
