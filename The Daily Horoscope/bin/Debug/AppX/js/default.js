// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var articlesList;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

        

            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("RSSData", publicMembers);
            

            args.setPromise(WinJS.UI.processAll().then(downloadFeed));
        }
    };
    
    function downloadFeed() {
        WinJS.xhr({ url: "C:\Users\Matt\horoscopes.rss" }).then(function (rss) {
            var items = rss.responseXML.querySelectorAll("item");

            for (var n = 0; n < items.length; n++) {
                var article = {};
                var date;
                article.title = items[n].querySelector("title").textContent;
                article.title = article.title.substring(0, article.title.search(" Daily Horoscope"));
                article.desc = items[n].querySelector("description");
                article.desc.textContent = article.desc.textContent.substring(0, article.desc.textContent.search("More horoscopes"));
                switch (article.title) {
                    case "Aries":
                        date = "3/21 - 4/19";
                        break; 
                    case "Taurus":
                        date = "4/20 - 5/20";
                        break;
                    case "Gemini":
                        date = "5/21 - 6/20";
                        break;
                    case "Cancer":
                        date = "6/21 - 7/22";
                        break;
                    case "Leo":
                        date = "7/23 - 8/22";
                        break;
                    case "Virgo":
                        date = "8/23 - 9/22";
                        break;
                    case "Libra":
                        date = "9/23 - 10/22";
                        break;
                    case "Scorpio":
                        date = "10/23 - 11/21";
                        break;
                    case "Sagittarius":
                        date = "11/22 - 12/21";
                        break;
                    case "Capicorn":
                        date = "12/22 - 1/19";
                        break;
                    case "Aquarius":
                        date = "1/20 - 2/18";
                        break;
                    case "Pisces":
                        date = "2/19 - 3/20";
                        break;
                }
                article.date = date;
                            
                
                articlesList.push(article);
            }
        });
    }
   

   
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    }

    app.start();
    
    
   
})();

