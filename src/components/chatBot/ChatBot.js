import React, { useEffect, useState } from "react";
const ChatBot = () => {

    useEffect(() => {
        (function(d, m){
            var kommunicateSettings = 
                {"appId":"6986573e57103938e020471430c5b462","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []);
}

export default ChatBot