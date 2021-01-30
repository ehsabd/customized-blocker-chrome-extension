

var mysettings = {};

jQuery('.disable-time').click(function(){
    var t = (new Date()).getTime();
    var value = jQuery(this).val();
    if (value=="forever"){
        mysettings.disable_until=value;
    }else{
        var disable_mins = parseInt(value)
        mysettings.disable_until = t+ disable_mins*3600*1000;
    }
    
    saveSettings();
    loadSettingsToUI();
})  

jQuery('.keywords input.keywords').change(function(){
    mysettings.keywords =jQuery(this).val().split(',') ;
    saveSettings();
}) 

function saveSettings(){
chrome.storage.sync.set({ settings: mysettings });
console.log(mysettings);
}

function loadSettingsToUI(){
    chrome.storage.sync.get('settings', function(data) {
        console.log(data);
        mysettings = data.settings || {};
        var keywords = data.settings.keywords || [];
        jQuery('.keywords input.keywords').val(keywords.join());

        if (data.settings.disable_until=="forever"){
            jQuery('.note').text("The blocker is disabled forever.");
        }else{
            var disable_mins = Math.round((data.settings.disable_until - (new Date()).getTime())/3600/1000);
            if (disable_mins>0){
                var quotient = Math.floor(disable_mins/60);
                var remainder = disable_mins % 60;
                jQuery('.note').text("The blocker is disabled for "+quotient+ " hours and "+remainder+" minutes.");
            }else{
                jQuery('.note').text("The blocker is enabled now!");
            }
            
        }
        
    });
}

loadSettingsToUI();