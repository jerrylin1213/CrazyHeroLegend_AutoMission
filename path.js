function Town() {
    this.root = null;
}

// (all parameters are place obj except tail(bool))
function Place(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
    this.prev = null;
}
// 玉女
let yuNv = new Town();
let yuNv_1 = new Place("百花門");
let yuNv_2 = new Place("十裏畫廊");
let yuNv_3 = new Place("琴部");
let yuNv_4 = new Place("萬花亭");
let yuNv_5 = new Place("書部");
let yuNv_6 = new Place("後花園");
let yuNv_7 = new Place("畫部");
let yuNv_8 = new Place("棋部");
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
let taiChi = new Town();
let taiChi_1 = new Place("太極山腳");
let taiChi_2 = new Place("太極山腰");
let taiChi_3 = new Place("紫霄大殿");
let taiChi_4 = new Place("玉清宮");
let taiChi_5 = new Place("上清宮");
let taiChi_6 = new Place("太清宮");
let taiChi_7 = new Place("山間盆地");
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
xueShan = new Town();
let xueShan_1 = new Place("大雪山腳");
let xueShan_2 = new Place("大雪山腰");
let xueShan_3 = new Place("淩霄大殿");
let xueShan_4 = new Place("西廂房1");
let xueShan_5 = new Place("天池");
xueShan_1.next = xueShan_2;
xueShan_2.next = xueShan_3;
xueShan_3.left = xueShan_4;
xueShan_4.prev = xueShan_3;
xueShan_5.prev = xueShan_3;
xueShan_3.right = xueShan_5;
xueShan_3.prev = xueShan_2;
xueShan_2.prev = xueShan_1;



function traverse(node){
    while (node.next != null) {
        node = node.next;
    }
    return node;
}
function traverseBack(node) {
    while (node.prev != null) {
        node = node.prev;
    }
    return node;
}

last = traverse(taiChi.root)
toast(last.value);
first = traverseBack(last);
toast(first.value);