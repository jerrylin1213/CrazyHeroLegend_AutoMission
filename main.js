// Screenshot authorication is required.
requestScreenCapture();
app.launchApp("暴走英雄壇");

// var declaration
let source = require('./source.js');
let ratio = (device.height * 0.5625 > device.width) ? device.width / 1080 : device.height / 1920;
const height = device.height * ratio;
const width = device.width * ratio;
const bigMap = [Math.round(device.width / 2 + width * 0.34), Math.round(device.height - height + height * 0.052)];
const closeBigMap = [Math.round(device.width / 2 + width * 0.426), Math.round(device.height - height + height * 0.265)];
const closeNpcWindow = [Math.round(device.width / 2 + width * 0.437), Math.round(device.height - height + height * 0.745)];

//take in npcObjectImages key. return coordinate and key
function ReadImages(selectedObject){
    let npc;
    try {
        npc = images.read(source.npcObjectImages[selectedObject]);
    } catch (error) {
        toastLog(error + "\n" + selectedObject);
    }
    // the game's ratio is fixed. So the actual ratio depends on whether height * 0.5625 > width
    npc = images.scale(npc, ratio, ratio);
    return [npc, selectedObject]
}
// Work with readImages. take in coordinate and key.
function FindThenClickObject(npc){
    let isNpcFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 20 times every 0.3sec before giving up
    while(countsForFindNPC < 20 && !isNpcFound){
        // isNpcFound returns both the XY coordinates and a boolean
        isNpcFound = findImage(captureScreen(), npc[0], {
            threshold: 0.8
        });
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
    }
}

// Same as FindThenClickObject but without clicking
function FindObject(object){
    let isObjectFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 2 times every 0.3sec before giving up
    while(countsForFindNPC < 2 && !isObjectFound){
        // isObjectFound returns both the XY coordinates and a boolean
        isObjectFound = findImage(captureScreen(), object[0], {
            threshold: 0.99
        });
        countsForFindNPC += 1;
    }
    if(isObjectFound){
        isObjectFound = "" + isObjectFound;isObjectFound.substring(1, isObjectFound.length-1).split(".0, ");
        return object[1];
    }
}

function TalkToObject(){
    FindThenClickObject(ReadImages("交談"), 300);
}

function SwipeLeft(){
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    0, Math.round(device.height * ratio * 0.5), 500);
}

function SwipeRight(){
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    Math.round(device.width * ratio), Math.round(device.height * ratio * 0.5), 500);
}

// 在鎮長家使用 
function PickUpMission(){
    FindThenClickObject(ReadImages("鎮長"));
    TalkToObject();
    sleep(500);
    click(device.width/2, device.height/2);
    let town, npc;
    let count = 0;
    while(town == undefined && count < 3){
        town = GetTown();
        sleep(1000);
        count++;
    }
    while(npc == undefined && count < 3){
        npc = GetNPC(town.slice(0, town.length-1));
        sleep(1000);
        count++;
    }
    return npc;
}
// Loop thru list of possible towns
function GetTown(){
    let town;
    let count = 0;
    while(count < source.allPossibleTowns.length && town == undefined){
        town = FindObject(ReadImages(source.allPossibleTowns[count]));
        count++;
    }
    return town;
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
    while(count < possibleNPCs.length * 3 && NPC == undefined){
        NPC = FindObject(ReadImages(possibleNPCs[count][2] + "環"));
        count++;
    }
    click(bigMap[0], bigMap[1]);
    return possibleNPCs[count-1];
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function MayorHomeToTowns(destination_town){
    if(FindObject(ReadImages("鎮長家")) == undefined){
        swipe(Math.round(device.width / 2), 
        Math.round(device.height * 2 / 3), 
        Math.round(device.width / 2),
        Math.round(device.height / 3), 500)
    }
    MoveByWorldMap("鎮長家", "出鎮長家");
    MoveByWorldMap("鎮東", "鎮東進中心");
    MoveByWorldMap("中心", "平安驛站");
    sleep(1000);
    FindThenClickObject(ReadImages("驛站"));
    FindThenClickObject(destination_town);
}

function MoveByWorldMap(current_location, destination){
    FindThenClickObject(ReadImages(current_location));
    FindThenClickObject(ReadImages(destination));
    click(closeBigMap[0], closeBigMap[1]);
}

let missionContent = PickUpMission();
toast(missionContent);
MayorHomeToTowns(ReadImages(["驛站" + missionContent[0]]));