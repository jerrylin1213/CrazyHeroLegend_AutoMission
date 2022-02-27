// Screenshot authorication is required.
requestScreenCapture();

// app.launchApp("暴走英雄壇");

// var declaration
let source = require('./source.js');
let path = require('./path.js');
let ratio = (device.height * 0.5625 > device.width) ? device.width / 1080 : device.height / 1920;
const height = device.height * ratio;
const width = device.width * ratio;
let LocationLabelRegion = [740, 38, 331, 127];
const bigMap = [Math.round(device.width / 2 + width * 0.34), Math.round(device.height - height + height * 0.052)];
const closeBigMap = [Math.round(device.width / 2 + width * 0.426), Math.round(device.height - height + height * 0.265)];
const closeNpcWindow = [Math.round(device.width / 2 + width * 0.437), Math.round(device.height - height + height * 0.745)];
// Declarations for the paths in each of the towns.
let yuNv = new path.Town();
let yuNv_1 = new path.Place("百花門");
let yuNv_2 = new path.Place("十裏畫廊");
let yuNv_3 = new path.Place("琴部");
let yuNv_4 = new path.Place("萬花亭");
let yuNv_5 = new path.Place("書部");
let yuNv_6 = new path.Place("後花園");
let yuNv_7 = new path.Place("畫部");
let yuNv_8 = new path.Place("棋部");
yuNv.root = yuNv_1;
yuNv_1.next = yuNv_2;
yuNv_2.next = yuNv_3;
yuNv_3.next = yuNv_4;
yuNv_4.next = yuNv_5;
yuNv_5.next = yuNv_6;
yuNv_4.left = yuNv_7;
yuNv_4.right = yuNv_8;
yuNv_8.prev = yuNv_4;
yuNv_7.prev = yuNv_4;
yuNv_6.prev = yuNv_5;
yuNv_5.prev = yuNv_4;
yuNv_4.prev = yuNv_3;
yuNv_3.prev = yuNv_2;
yuNv_2.prev = yuNv_1;
// 太極
let taiChi = new path.Town();
let taiChi_1 = new path.Place("太極山腳");
let taiChi_2 = new path.Place("太極山腰");
let taiChi_3 = new path.Place("紫霄大殿");
let taiChi_4 = new path.Place("玉清宮");
let taiChi_5 = new path.Place("上清宮");
let taiChi_6 = new path.Place("太清宮");
let taiChi_7 = new path.Place("山間盆地");
taiChi.root = taiChi_1;
taiChi_1.next = taiChi_2;
taiChi_2.next = taiChi_3;
taiChi_3.next = taiChi_4;
taiChi_2.right = taiChi_7;
taiChi_4.left = taiChi_5;
taiChi_4.right = taiChi_6;
taiChi_5.prev = taiChi_4;
taiChi_6.prev = taiChi_4;
taiChi_7.prev = taiChi_2;
taiChi_4.prev = taiChi_3;
taiChi_3.prev = taiChi_2;
taiChi_2.prev = taiChi_1;
// 雪山
xueShan = new path.Town();
let xueShan_1 = new path.Place("大雪山腳");
let xueShan_2 = new path.Place("大雪山腰");
let xueShan_3 = new path.Place("淩霄大殿");
let xueShan_4 = new path.Place("西廂房1");
let xueShan_5 = new path.Place("天池");
xueShan_1.next = xueShan_2;
xueShan_2.next = xueShan_3;
xueShan_3.left = xueShan_4;
xueShan_4.prev = xueShan_3;
xueShan_5.prev = xueShan_3;
xueShan_3.right = xueShan_5;
xueShan_3.prev = xueShan_2;
xueShan_2.prev = xueShan_1;



//take in npcObjectImages key. return coordinate and key
function ReadImages(selectedObject) {
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
function FindThenClickObject(npc, regionToSearch) {
    let isNpcFound = false;
    let countsForFindNPC = 0;
    let reg = regionToSearch == undefined ? [Math.round((device.width - width) / 2), (device.height - height), Math.round((device.width - width) / 2) + width, device.height] : regionToSearch;
    // find npc for 20 times every 0.3sec before giving up
    while(countsForFindNPC < 20 && !isNpcFound) {
        // isNpcFound returns both the XY coordinates and a boolean
        isNpcFound = findImage(captureScreen(), npc[0], {
            threshold: 0.8,
            region: regionToSearch
        });
        sleep(300);
        countsForFindNPC += 1;
    }
    if(isNpcFound) {
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
function FindObject(object, regionToSearch) {
    let isObjectFound = false;
    let countsForFindNPC = 0;
    let reg = regionToSearch == undefined ? [Math.round((device.width - width) / 2), (device.height - height), Math.round((device.width - width) / 2) + width, device.height] : regionToSearch;
    // find npc for 2 times every 0.3sec before giving up
    while(countsForFindNPC < 2 && !isObjectFound) {
        // isObjectFound returns both the XY coordinates and a boolean
        isObjectFound = findImage(captureScreen(), object[0], {
            threshold: 0.99,
            region: reg
        });
        countsForFindNPC += 1;
    }
    if(isObjectFound) {
        isObjectFound = "" + isObjectFound;isObjectFound.substring(1, isObjectFound.length-1).split(".0, ");
        return object[1];
    }
}

function TalkToObject() {
    FindThenClickObject(ReadImages("交談"), 300);
}

function SwipeLeft() {
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    0, Math.round(device.height * ratio * 0.5), 500);
}

function SwipeRight() {
    sleep(5000);
    swipe((device.width * ratio * 0.5), (device.height * ratio * 0.5), 
    Math.round(device.width * ratio), Math.round(device.height * ratio * 0.5), 500);
}
// 在鎮長家使用 
function PickUpMission() {
    checkMenuIsAccessible();
    FindThenClickObject(ReadImages("鎮長"));
    TalkToObject();
    sleep(500);
    click(device.width/2, device.height/2);
    let town, npc;
    let count = 0;
    while(town == undefined && count < 3) {
        town = GetTown();
        sleep(1000);
        count++;
    }
    while(npc == undefined && count < 3) {
        npc = GetNPC(town.slice(0, town.length-1));
        sleep(1000);
        count++;
    }
    return npc;
}

// Loop thru list of possible towns
function GetTown() {
    let town;
    let count = 0;
    while(count < source.allPossibleTowns.length && town == undefined) {
        town = FindObject(ReadImages(source.allPossibleTowns[count], [387, 373, 569, 209]));
        count++;
    }
    return town;
}

function GetNPC(town) {
    let NPC;
    let count = 0;
    let possibleNPCs = [];
    for(var place in source.allNPCLocation[town]) { 
        for(var npc in source.allNPCLocation[town][place]) {
            possibleNPCs.push([town, place, npc]);
        }
    }
    while(count < possibleNPCs.length * 3 && NPC == undefined) {
        // toast(possibleNPCs[count][2])
        NPC = FindObject(ReadImages(possibleNPCs[count][2] + "環"));
        count++;
    }
    click(bigMap[0], bigMap[1]);
    return possibleNPCs[count-1];
} 

function checkMenuIsAccessible() {
    if(FindObject(ReadImages("鎮長家")) == undefined) {
        swipe(Math.round(device.width / 2), 
        Math.round(device.height * 2 / 3), 
        Math.round(device.width / 2),
        Math.round(device.height / 3), 500)
    }
}

function MoveByWorldMap(current_location, destination) {
    FindThenClickObject(ReadImages(current_location));
    FindThenClickObject(ReadImages(destination));
    click(closeBigMap[0], closeBigMap[1]);
}

function MayorHouseToTowns(wayToStation, destination_town) {
    if(destination_town != "平安") {
        MoveByWorldMap("鎮長家", "出鎮長家");
        MoveByWorldMap("鎮東", "鎮東進中心");
        MoveByWorldMap("中心", "平安驛站");
        sleep(5000);
        while (FindObject(ReadImages("確認已到達平安驛站")) == undefined){
            sleep(700);
        }
        FindThenClickObject(ReadImages("驛站"));
        FindThenClickObject(wayToStation);
    }
}

function NavigateToPlace(missionContent) {
    let object;
    let condition = source.firstPlaceOfTownAndTownMap[missionContent[0]];
    switch(condition) {
        case "鎮長家":
            break;
        case "太極山腳":
            object = taiChi;
            break;
        case "百花門":
            object = yuNv;
            break;
        case "大雪山腳":
            object = xueShan;
            break;
    }
    FindPlace(missionContent, object);
    FinishMission(missionContent[2]);
}

function FindPlace(missionContent, object) {
    let curr_place =  object.root;
    while (true) {
        toast(curr_place.value);
        if (curr_place.value == missionContent[1])
        return;
        if (curr_place.left != null) {
            if (curr_place.left.value == missionContent[1]) {
                MoveByWorldMap(curr_place.value, "進" + curr_place.left.value);
                return;
            }
        }
        if (curr_place.right != null) {
            if (curr_place.right.value == missionContent[1]) {
                MoveByWorldMap(curr_place.value, "進" + curr_place.right.value);
                return;
            }
        }        
        MoveByWorldMap(curr_place.value, "進" + curr_place.next.value);
        curr_place = curr_place.next;
        while (!FindObject(ReadImages(curr_place.value), LocationLabelRegion)) {
            sleep(1000);
        }
    }
}
function FinishMission(NPCToFind) {
    FindThenClickObject(ReadImages(NPCToFind));
    TalkToObject();
    sleep(300);
    click(closeNpcWindow[0], closeNpcWindow[1]);
    sleep(500);
    click(closeNpcWindow[0], closeNpcWindow[1]);
}

function main() {
    let missionContent = PickUpMission(); // [town, place, npc]
    toast(missionContent);
    MayorHouseToTowns(ReadImages(["驛站" + missionContent[0]]), missionContent[0]);
    NavigateToPlace(missionContent);
}
main();
