module.exports = function (chabot) {

    // WebHook で受けたデータをセット
    var payload = chabot.data;
    // ChatWork API の endpoint をセット
    var endpoint = '/rooms/' + chabot.roomid + '/messages';
    // templats/ 内のメッセージテンプレートを読み込む
    var template = chabot.readTemplate('zabbix.ejs');
    // WebHook で受けたデータでメッセージテンプレートを描画
    var message_body = chabot.render(template, payload);
    // Confluenceから対応手順を取ってくる
    // 検索ワードはTRIGGER.NAMEにしていますが適宜変更してください
    if (payload.TRIGGER.NAME) {
        getTroubleshooting(payload.TRIGGER.NAME, function(search_data){
            if (search_data.size != 0) {
               var template2 = chabot.readTemplate('zabbix-plus.ejs');
               message_body += chabot.render(template2, search_data) + '[/info]';
            } else {
               message_body += '[/info]';
            }
            send_chabot(endpoint, message_body);
        });
    } else {
        message_body += '[/info]';
        send_chabot(endpoint, message_body);
    }

    // ChatWork API でメッセージ送信
    function send_chabot(endpoint, message_body) {
      chabot.client
        .post(endpoint, {
            body: message_body
        })
        .done(function (res) {
            chabot.log('done');
        })
        .fail(function (err) {
            chabot.error(err);
        });
    }

    function getTroubleshooting(text, callback) {
      // Confluenceから障害対応方法を引っぱってくる
      var url = 'https://confluence.atlassian.com/rest/api/content/search?cql=Text~%22' + encodeURI(text) + '%22&limit=3';
      var options = {
        url: url
      };
      var request = require('request');
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(JSON.parse(body));
        } else {
          console.log('nof found troubleshooting : status code '+ response.statusCode);
        }
      });
    }

};
