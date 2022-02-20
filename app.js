// Screenshot authorication is required.
if(!requestScreenCapture()){
    toast("请求截图失败");
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
            "葛朗台": "葛朗台"
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
            "採花大盜": "採花大盜",
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
            "採藥道人": "採藥道人"
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
    "大雪":{
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

let NpcInput = "李白";

for(var town in allNPCLocation){
    for (var place in allNPCLocation[town]){
        for (var NPC in allNPCLocation[town][place]){
            if(NPC == NpcInput){
                toast(town + " " + place + " " + allNPCLocation[town][place][NpcInput]);
            }
        }
    }
}

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


// Dictionary for NPCs' locations. (Key=NPC_name, Value=NPC_Img)
const npcObjectImages = {
    //接到的環任務地點
    太極環: "./太極環.JPG",
    雪山環: "./雪山環.JPG",
    平安環: "./平安環.JPG",
    百花環: "./百花環.JPG",

    //當前場景
    鎮東: "./鎮東.JPG",
    中心: "./中心.JPG",
    鎮西: "./鎮西.JPG",
    西郊: "./西郊.JPG",
    南郊: "./南郊.JPG",
    北郊: "./北郊.JPG",
    東郊: "./東郊.JPG",
    古董店: "./古董店.JPG",
    當鋪: "./當鋪.JPG",
    老婆婆家: "./老婆婆家.JPG",
    裁縫店: "./裁縫店.JPG",
    豆腐店: "./豆腐店.JPG",
    鐵匠鋪: "./鐵匠鋪.JPG",
    雜貨鋪: "./雜貨鋪.JPG",
    客棧: "./客棧.JPG",
    學館: "./學館.JPG",
    武館: "./武館.JPG",
    賭坊: "./賭坊.JPG",
    衙門: "./衙門.JPG",

    //平安
    神秘人: "./神秘人.JPG",
    李白: "./李白.JPG",
    鎮長: "./鎮長.JPG",
    鞭龍: "./鞭龍.JPG",
    刀龍: "./刀龍.JPG",

    交談: "./交談.JPG",
    戰鬥: "./fight.JPG",

    進客棧: "./進客棧.JPG",
    出客棧: "./出客棧.JPG",
    進鎮長家: "./進鎮長家.JPG",
    出鎮長家: "./出鎮長家.JPG",
    進北郊: "./進北郊.JPG",
    北郊進中心: "./北郊進中心.JPG",
    進南郊: "./進南郊.JPG",
    南郊進中心: "./南郊進中心.JPG",

    進鎮東: "./進鎮東.JPG",
    鎮東進東郊: "./鎮東進東郊.JPG",
    東郊進鎮東: "./東郊進鎮東.JPG",
    鎮東進中心: "./鎮東進中心.JPG",
    
    進鎮西: "./進鎮西.JPG",
    鎮西進西郊: "./鎮西進西郊.JPG",
    西郊進鎮西: "./西郊進鎮西.JPG",
    鎮西進中心: "./鎮西進中心.JPG",

    進衙門: "./進衙門.JPG",
    進武館: "./進武館.JPG",
    進學館: "./進學館.JPG",
    出衙門學館武館: "./出衙門學館武館.JPG",
    // 以上進出都完成了

    進鐵匠鋪: "./進鐵匠鋪.JPG",
    進雜貨鋪: "./進雜貨鋪.JPG",
    進古董店: "./進古董店.JPG",
    進當鋪: "./進當鋪.JPG",
    進賭坊: "./進賭坊.JPG",
    出鐵匠鋪雜貨鋪古董店當鋪賭坊: "./出鐵匠鋪雜貨鋪古董店當鋪賭坊.JPG",
    
    進老婆婆家: "./進老婆婆家.JPG",
    進裁縫店: "./進裁縫店.JPG",
    進豆腐店: "./進豆腐店.JPG",
    出老婆婆家裁縫店豆腐店: "./出老婆婆家裁縫店豆腐店.JPG",
    
    小商販賣花妞西門廣位置: "./小商販賣花妞西門廣位置.JPG",
    瘋老頭官兵位置: "./瘋老頭官兵位置.JPG",
    //驛站
    平安驛站: "./平安驛站.JPG",
    驛站: "./驛站.JPG",
    驛站苗疆: "./驛站苗疆.JPG",
    驛站少林: "./驛站少林.JPG",
    驛站大雪: "./驛站大雪.JPG",
    驛站太極: "./驛站太極.JPG",
    驛站藏血: "./驛站藏血.JPG",
    驛站丐幫: "./驛站丐幫.JPG",
    驛站雪焰: "./驛站雪焰.JPG",
    驛站百花: "./驛站百花.JPG",
    驛站平安: "./驛站平安.JPG",
}


// findObject(readImages("驛站平安"), 300);

engines.stopAll();