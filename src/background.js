function addParam(requestDetails) {
    if (requestDetails.method === "GET") {
        // Check to see if any other parameters have been added
        let paramStart = requestDetails.url.indexOf("?");

        if (paramStart > 0) {
            let params = requestDetails.url.substring(paramStart + 1).split("&");
            if (params.includes("share=1")) {
                return; // parameter already exits. Nothing to do
            }
            else {
                // Chain share parameter at the end
                return {
                    redirectUrl: requestDetails.url + "&share=1"
                };
            }
        }

        // Add parameter indicator and share parameter
        return {
            redirectUrl: requestDetails.url + "?share=1"
        };
    }    
}

// Only examine requests to Quora
let filter = {
    urls: ["*://*.quora.com/*"]
}
 
browser.webRequest.onBeforeRequest.addListener(
    addParam, 
    filter,
    ["blocking"]);
