// Screenshot authorication is required.
if(!requestScreenCapture()){
    toast("請求截圖失敗");
    exit();
}
app.launchApp("暴走英雄壇");



// var declaration

let ratio = (device.height * 0.5625 > device.width) ? device.width / 1080 : device.height / 1920;
const height = device.height * ratio;
const width = device.width * ratio;
const bigMap = [Math.round(device.width / 2 + width * 0.34), Math.round(device.height - height + height * 0.052)];
const closeBigMap = [Math.round(device.width / 2 + width * 0.426), Math.round(device.height - height + height * 0.265)];
let closeNpcWindow = [Math.round(device.width / 2 + width * 0.437), Math.round(device.height - height + height * 0.745)];




const allNPCLocation = {
    "平安":{
        "衙門":{
            "豬葛神猴": "豬葛神猴"
        },
        "學館":{
            "顧炎武": "顧炎武",
            "小書童": "小書童"
        },
        "武館":{
            "林教頭": "林教頭"
        },
        "東郊":{
            "承包商": "承包商",
            "上官衫": "上官衫",
            "鎮中高手": "鎮中高手"
        },
        "中心":{
            "瘋老頭": "瘋老頭",
            "官兵": "官兵",
            "奇貨商": "奇貨商",
            "西門廣": "西門廣",
            "小商販": "小商販",
            "賣花妞": "賣花妞",
            "胡屠夫": "胡屠夫"
        },
        "鐵匠鋪":{
            "鐵匠": "鐵匠"
        },
        "古董店":{
            "古董商": "古董商"
        },
        "賭坊":{
            "賭神": "賭神",
            "荷官": "荷官"
        },
        "當鋪":{
            "葛朗臺": "葛朗臺"
        },
        "客棧":{
            "店小二": "店小二",
            "食太郎": "食太郎",
            "佟鑲玉": "佟鑲玉",
            "強盜": "強盜",
            "獨行大俠": "獨行大俠",
            "廚師": "廚師"
        },
        "雜貨舖":{
            "雜貨商": "雜貨商"
        },
        "北郊":{
            "采花大盜": "采花大盜",
            "黑衣大盜": "黑衣大盜"
        },
        "南郊":{
            "包工頭": "包工頭",
            "跛腳大盜": "跛腳大盜"
        },
        "鎮東":{
            "李白": "李白"
        },
        "鎮西":{
            "小寶": "小寶"
        },
        "西郊":{
            "流氓頭子": "流氓頭子",
            "流氓": "流氓"
        },
        "豆腐店":{
            "潘小蓮": "潘小蓮"
        },
        "裁縫店":{
            "小裁縫": "小裁縫",
            "老裁縫": "老裁縫"
        },
        "老婆婆家":{
            "老婆婆": "老婆婆",
            "小饞鬼": "小饞鬼"
        }
    },
    "百花":{
        "百花門":{
            "花童": "花童"
        },
        "十里畫廊":"十里畫廊",
        "琴部":{
            "蔡文姬": "蔡文姬",
            "聽琴": "聽琴" 
        },
        "萬花亭":{
            "卓文君": "卓文君",
            "李清照": "李清照",
            "聶隱娘": "聶隱娘"
        },
        "畫部":{
            "入畫": "入畫",
            "李師師": "李師師"
        },
        "棋部":{
            "柳如是": "柳如是",
            "司棋": "司棋"
        },
        "書部":{
            "侍書": "侍書",
            "上官婉兒": "上官婉兒"
        },
        "後花園":{
            "茶花女": "茶花女",
            "紅拂女": "紅拂女"
        }
    },
    "太極":{
        "太極山腳":{
            "采藥道人": "采藥道人"
        },
        "太極山腰":{
            "燒飯道童": "燒飯道童"
        },
        "山間盆地":{
            "土匪": "土匪",
            "土匪頭子": "土匪頭子",
            "迎客道童": "迎客道童",
            "迎客道人": "迎客道人"
        },
        "紫霄大殿":{
            "淡菊道士": "淡菊道士",
            "堅竹道士": "堅竹道士",
            "蒼槐道人": "蒼槐道人",
            "古柳道人": "古柳道人"
        },
        "玉清宮":{
            "傲梅道士": "傲梅道士",
            "幽蘭道士": "幽蘭道士",
            "清虛道長": "清虛道長"
        },
        "上清宮":{
            "古松道長": "古松道長",
            "勁松道人": "勁松道人"
        },
        "太清宮":{
            "蒼月道長": "蒼月道長",
            "寒柏道人": "寒柏道人"
        }
    },
    "雪山":{
        "大雪山腳":{
            "解煙袋": "解煙袋"
        },
        "大雪山腰":"大雪山腰",
        "淩霄大殿":{
            "金萬山": "金萬山",
            "白自劍": "白自劍"
        },
        "西廂房1":{
            "秀兒": "秀兒"
        },
        "西廂房2":"西廂房2",
        "囚室":"囚室",
        "天池":{
            "天池怪俠": "天池怪俠"
        }
    },
    "少林":{
        "少室山腳":"少室山腳",
        "知客堂":"知客堂",
        "羅漢堂":"羅漢堂",
        "般若堂":"般若堂",
        "戒律堂":"戒律堂",
        "大雄寶殿":"大雄寶殿",
        "達摩院":"達摩院",
        "夥房":"夥房",
        "藏經閣":"藏經閣"
    },
    "藏血":{
        "浴血道":"浴血道",
        "祭刀壇":"祭刀壇",
        "剮刑壇":"剮刑壇",
        "血刀總壇":"血刀總壇",
        "祭血壇":"祭血壇",
        "大雪穀":"大雪穀"
    },
    "雪焰":{
        "雪焰島渡口":"雪焰島渡口",
        "雪焰島中心":"雪焰島中心",
        "亂石礁":"亂石礁",
        "拉麵店":"拉麵店",
        "忍者學院":"忍者學院",
        "影部":"影部",
        "陷地島":"陷地島"
    },
    "丐幫":{
        "君山廣場":"君山廣場",
        "演武壇":"演武壇",
        "廚房":"廚房",
        "聚義堂":"聚義堂",
        "洞庭湖":"洞庭湖",
        "嶽洋樓":"嶽洋樓"
    }
};

function readImages(selectedObject){
    let npc = images.read(npcObjectImages[selectedObject]);
    // the game's ratio is fixed. So the actual ratio depends on whether height * 0.5625 > width
    npc = images.scale(npc, ratio, ratio);
    return [npc, selectedObject]
}

function findObject(npc){
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
function finddObject(object, isForMission){
    let isObjectFound = false;
    let countsForFindNPC = 0;
    
    // find npc for 20 times every 0.3sec before giving up
    while(countsForFindNPC < 5 && !isObjectFound){
        // isObjectFound returns both the XY coordinates and a boolean
        isObjectFound = findImage(captureScreen(), object[0], {
            threshold: 0.99
        });
        sleep(300);
        countsForFindNPC += 1;
    }
    
    if(isObjectFound){
        isObjectFound = "" + isObjectFound;
        let coordinates = isObjectFound.substring(1, isObjectFound.length-1).split(".0, ");
        return object[1];
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

// All possible towns that may assigned. 平安鎮最容易出人,機率最高。 所以擺前面
// 平安鎮 has the highest chance to be assigned, so place it at index 0.
const allPossibleTowns = ["平安環", "太極環", "百花環", "雪山環"];
// Dictionary for NPCs' locations. (Key=NPC_name, Value=NPC_Img)
const npcObjectImages = {
    //接到的環任務地點
    "太極環": "./images/太極環.JPG",
    "雪山環": "./images/雪山環.JPG",
    "平安環": "./images/平安環.JPG",
    "百花環": "./images/百花環.JPG",

    //接到的環任務NPC
    "秀兒環": "./images/秀兒環.JPG",
    "李白環": "./images/李白環.JPG",
    "李清照環": "./images/李清照環.JPG",
    "柳如是環": "./images/柳如是環.JPG",
    "天池怪俠環": "./images/天池怪俠環.JPG",
    "豬葛神猴環": "./images/豬葛神猴環.JPG",
    "老婆婆環": "./images/老婆婆環.JPG",
    "西門廣環": "./images/西門廣環.JPG",
    "小裁縫環": "./images/小裁縫環.JPG",
    "茶花女環": "./images/茶花女環.JPG",
    "聽琴環": "./images/聽琴環.JPG",
    "店小二環": "./images/店小二環.JPG",
    "荷官環": "./images/荷官環.JPG",
    "流氓環": "./images/流氓環.JPG",
    "花童環": "./images/花童環.JPG",
    "土匪環": "./images/土匪環.JPG",
    "雜貨商環": "./images/雜貨商環.JPG",
    "獨行大俠環": "./images/獨行大俠環.JPG",
    "紅拂女環": "./images/紅拂女環.JPG",
    "賣花妞環": "./images/賣花妞環.JPG",
    "金萬山環": "./images/金萬山環.JPG",
    "傲梅道士環": "./images/傲梅道士環.JPG",
    "小商販環": "./images/小商販環.JPG",
    "鎮中高手環": "./images/鎮中高手環.JPG",
    "堅竹道士環": "./images/堅竹道士環.JPG",
    "包工頭環": "./images/包工頭環.JPG",
    "古柳道人環": "./images/古柳道人環.JPG",
    "采藥道人環": "./images/采藥道人環.JPG",
    "迎客道童環": "./images/迎客道童環.JPG",
    "采花大盜環": "./images/采花大盜環.JPG",
    "解煙袋環": "./images/解煙袋環.JPG",
    "流氓頭子環": "./images/流氓頭子環.JPG",
    "淡菊道士環": "./images/淡菊道士環.JPG",
    "小饞鬼環": "./images/小饞鬼環.JPG",
    "土匪頭子環": "./images/土匪頭子環.JPG",
    "小寶環": "./images/小寶環.JPG",
    "古松道長環": "./images/古松道長環.JPG",
    "蒼槐道人環": "./images/蒼槐道人環.JPG",
    "小書童環": "./images/小書童環.JPG",
    "迎客道人環": "./images/迎客道人環.JPG",
    "蔡文姬環": "./images/蔡文姬環.JPG",
    "白自劍環": "./images/白自劍環.JPG",
    "佟鑲玉環": "./images/佟鑲玉環.JPG",
    "葛朗臺環": "./images/葛朗臺環.JPG",
    "古董商環": "./images/古董商環.JPG",
    "潘小蓮環": "./images/潘小蓮環.JPG",
    "跛腳大盜環": "./images/跛腳大盜環.JPG",
    "入畫環": "./images/入畫環.JPG",
    "寒柏道人環": "./images/寒柏道人環.JPG",
    "奇貨商環": "./images/奇貨商環.JPG",
    "李師師環": "./images/李師師環.JPG",
    "林教頭環": "./images/林教頭環.JPG",
    "廚師環": "./images/廚師環.JPG",
    "賭神環": "./images/賭神環.JPG",
    "侍書環": "./images/侍書環.JPG",
    "官兵環": "./images/官兵環.JPG",
    "強盜環": "./images/強盜環.JPG",
    "上官婉兒環": "./images/上官婉兒環.JPG",
    "司棋環": "./images/司棋環.JPG",

    //當前場景
    "鎮東": "./images/鎮東.JPG",
    "中心": "./images/中心.JPG",
    "鎮西": "./images/鎮西.JPG",
    "西郊": "./images/西郊.JPG",
    "南郊": "./images/南郊.JPG",
    "北郊": "./images/北郊.JPG",
    "東郊": "./images/東郊.JPG",
    "古董店": "./images/古董店.JPG",
    "當鋪": "./images/當鋪.JPG",
    "老婆婆家": "./images/老婆婆家.JPG",
    "裁縫店": "./images/裁縫店.JPG",
    "豆腐店": "./images/豆腐店.JPG",
    "鐵匠鋪": "./images/鐵匠鋪.JPG",
    "雜貨鋪": "./images/雜貨鋪.JPG",
    "客棧": "./images/客棧.JPG",
    "學館": "./images/學館.JPG",
    "武館": "./images/武館.JPG",
    "賭坊": "./images/賭坊.JPG",
    "衙門": "./images/衙門.JPG",
    
    //平安
    "神秘人": "./images/神秘人.JPG",
    "李白": "./images/李白.JPG",
    "鎮長": "./images/鎮長.JPG",
    "鞭龍": "./images/鞭龍.JPG",
    "刀龍": "./images/刀龍.JPG",
    
    "交談": "./images/交談.JPG",
    "戰鬥": "./images/fight.JPG",
    
    "進客棧": "./images/進客棧.JPG",
    "出客棧": "./images/出客棧.JPG",
    "進鎮長家": "./images/進鎮長家.JPG",
    "出鎮長家": "./images/出鎮長家.JPG",
    "進北郊": "./images/進北郊.JPG",
    "北郊進中心": "./images/北郊進中心.JPG",
    "進南郊": "./images/進南郊.JPG",
    "南郊進中心": "./images/南郊進中心.JPG",
    
    "進鎮東": "./images/進鎮東.JPG",
    "鎮東進東郊": "./images/鎮東進東郊.JPG",
    "東郊進鎮東": "./images/東郊進鎮東.JPG",
    "鎮東進中心": "./images/鎮東進中心.JPG",
    
    "進鎮西": "./images/進鎮西.JPG",
    "鎮西進西郊": "./images/鎮西進西郊.JPG",
    "西郊進鎮西": "./images/西郊進鎮西.JPG",
    "鎮西進中心": "./images/鎮西進中心.JPG",
    
    "進衙門": "./images/進衙門.JPG",
    "進武館": "./images/進武館.JPG",
    "進學館": "./images/進學館.JPG",
    "出衙門學館武館": "./images/出衙門學館武館.JPG",
    
    "進鐵匠鋪": "./images/進鐵匠鋪.JPG",
    "進雜貨鋪": "./images/進雜貨鋪.JPG",
    "進古董店": "./images/進古董店.JPG",
    "進當鋪": "./images/進當鋪.JPG",
    "進賭坊": "./images/進賭坊.JPG",
    "出鐵匠鋪雜貨鋪古董店當鋪賭坊": "./images/出鐵匠鋪雜貨鋪古董店當鋪賭坊.JPG",
    
    "進老婆婆家": "./images/進老婆婆家.JPG",
    "進裁縫店": "./images/進裁縫店.JPG",
    "進豆腐店": "./images/進豆腐店.JPG",
    "出老婆婆家裁縫店豆腐店": "./images/出老婆婆家裁縫店豆腐店.JPG",
    
    "小商販賣花妞西門廣位置": "./images/小商販賣花妞西門廣位置.JPG",
    "瘋老頭官兵位置": "./images/瘋老頭官兵位置.JPG",
    //驛站
    "平安驛站": "./images/平安驛站.JPG",
    "驛站": "./images/驛站.JPG",
    "驛站苗疆": "./images/驛站苗疆.JPG",
    "驛站少林": "./images/驛站少林.JPG",
    "驛站大雪": "./images/驛站大雪.JPG",
    "驛站太極": "./images/驛站太極.JPG",
    "驛站藏血": "./images/驛站藏血.JPG",
    "驛站丐幫": "./images/驛站丐幫.JPG",
    "驛站雪焰": "./images/驛站雪焰.JPG",
    "驛站百花": "./images/驛站百花.JPG",
    "驛站平安": "./images/驛站平安.JPG"
}


// 在鎮長家使用 
function PickUpMission(){
    findObject(readImages("鎮長"));
    talkToObject();
    let town = GetTown();
    return GetNPC(town);
}

function GetTown(){
    let town;
    let count = 0;
    while(count < allPossibleTowns.length && town == undefined){
        town = finddObject(readImages(allPossibleTowns[count]), true);
        count++;
    }
    toast(town);
    return town.slice(0, town.length-1);
}

function GetNPC(town){
    let NPC;
    let count = 0;
    let possibleNPCs = [];
    for(var place in allNPCLocation[town]){
        for(var npc in allNPCLocation[town][place]){
            possibleNPCs.push(allNPCLocation[town][place][npc]);
        }
    }
    while(count < possibleNPCs.length && NPC == undefined){
        NPC = finddObject(readImages(possibleNPCs[count]+"環"), true);
        count++;
    }
    return NPC;
}

toast(PickUpMission());
