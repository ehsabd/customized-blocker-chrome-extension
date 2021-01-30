console.log('custom block init');

//TODO fix hanging problem;
var elCount = 0;
var allEls = [];
var parentSelectors = ['ytd-video-renderer', 'ytd-grid-video-renderer', 'div.ProfileCard', 'div.tweet', '.trend-item',
    '.related-question-pair', 'g-inner-card', '.scrollerItem', 'div'];

function checkAndRemove() {

    chrome.storage.sync.get('settings', function (data) {
        var keywords = data.settings.keywords || [];
        //console.log(keywords);
        var disable_until = data.settings.disable_until;
        
        if (disable_until=="forever") return;
        
        if ((new Date()).getTime() < disable_until) return;
        
        allEls = jQuery().add("p").add("a");//.add("div")
        if (allEls.length > elCount) {
            // prevCount = elCount;
            elCount = allEls.length;
            for (var i = elCount - 1; i >= 0; i--) {

                var el = allEls[i];
                if (~el.innerHTML.indexOf('<div')) continue;
                var jqEl = jQuery(el);
                
                for (var j = 0; j < keywords.length; j++) {
                    if (~((jqEl.attr('href') || "").indexOf(keywords[j])) || ~(jqEl.text().toLowerCase().indexOf(keywords[j]))) {


                        for (var k = 0; k < parentSelectors.length; k++) {
                            var parent = jQuery(el).parents(parentSelectors[k]).eq(0);
                            parent.remove();
                            console.log("REMOVED:" + parent);
                            elCount--;
                        }


                    }
                }
            }
        }
    });

}

checkAndRemove();

setInterval(checkAndRemove, 1000);
