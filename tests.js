if ((typeof GasTap) === 'undefined') {
    var cs = CacheService.getScriptCache().get('gast');
    if (!cs) {
        cs = UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText();
        CacheService.getScriptCache().put('gast', cs, 21600);
    }
    eval(cs);
}

var test = new GasTap();

function gastTestRunner() {

    test('FederNameByRegon valid', function (t) {
        var result = FederNameByRegon('000678239');
        t.equal(result, 'Bałtycka Galeria Sztuki Współczesnej w Słupsku')
    });

    test.finish()
}
