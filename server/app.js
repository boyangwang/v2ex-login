const req = require('request-promise');

const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.8,en-GB;q=0.6,zh;q=0.4',
    'cache-control': 'no-cache',
    'cookie': 'PB3_SESSION="2|1:0|10:1474422055|11:PB3_SESSION|36:djJleDoyMTkuNzUuNDEuMTc2Ojk0MTIwNTc0|68b2d7f60f5bbf3ad88c6f681f0c113d27e07d787db7b41f8a5c3d341ac9ce62"; A2="2|1:0|10:1474422066|2:A2|56:NmNlMDAyMzY3Y2I1Yjk1ODU4NDBmZDk5MDdhODY4MmZjOTg3MWYzNw==|3ecb70fb2737d56090e6f01abbefa73c0f9337e68bcc602c595bc4cdc38e811d"; V2EX_TAB="2|1:0|10:1474604356|8:V2EX_TAB|8:dGVjaA==|4b0c5054f108e6ce4422b4ca5a2caa9c1261b77b11b364df02717bf8d3401917"; V2EX_REFERRER="2|1:0|10:1474604368|13:V2EX_REFERRER|8:ZmlyZTU=|e3db677fcdd52fcb771a8d397c027313c7578458a811706a51c1169b3a90e92e"; _ga=GA1.2.331978947.1474422070; V2EX_LANG=zhcn',
    'pragma': 'no-cache',
    'referer': 'https://www.v2ex.com/mission/daily',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
};
function main() {
    function checkAlreadyCollectedOrErr(htmlString) {
        if (htmlString.includes('每日登录奖励已领取')) {
            console.log('Today already collected, go to sleep');
        } else {
            console.log('UNKNOWN', htmlString);
        }
    }
    function collect(uri) {
        req({
            uri: `https://www.v2ex.com${uri}`,
            headers,
        })
            .then((htmlString) => {
                checkAlreadyCollectedOrErr(htmlString);
            })
            .catch((err) => {
                console.log('failed', err);
            });
    }
    req({
        uri: 'https://www.v2ex.com/mission/daily',
        headers,
    })
        .then((htmlString) => {
            const m = /铜币" ?onclick="location.href ?= ?'(.*)';" ?\/>/.exec(htmlString);
            if (m) {
                collect(m[1]);
            } else {
                checkAlreadyCollectedOrErr(htmlString);
            }
        })
        .catch((err) => {
            console.log('failed', err);
        });
}
setInterval(main, 6 * 3600 * 1000);
// main();
