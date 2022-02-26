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
    var o_shouquan = text("允許").findOne()
    if(o_shouquan){
        click(o_shouquan.bounds().centerX(), o_shouquan.bounds().centerY());
        sleep(500);
    }
});

setTimeout(clickButton, 3000);
threads.start(function(){
    // Screenshot authorication is required.

});

ui.testBtn.on("click", () => {
    the_thread = threads.start(function() {
        while(true) {
            sleep(3000);
            log("我是主線程");
        }
    })
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
    }
});