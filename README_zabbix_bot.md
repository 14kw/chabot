Zabbix bot
======

## Zabbix bot

ChabotのZabbix通知用のbotスクリプトです。

### bot/zabbix

通常メールでもらうアラートメールと同じ内容をChatWorkへ通知します。

使い方はZabbixアクションの実行内容にて、リモートコマンドでChabotを叩きます。

```bash
curl -sS -H 'Content-type: application/json' -X POST -d "{\"TRIGGER\":{\"NAME\":\"{TRIGGER.NAME}\",\"STATUS\":\"{TRIGGER.STATUS}\",\"SEVERITY\":\"{TRIGGER.SEVERITY}\",\"URL\":\"{TRIGGER.URL}\"},\"ITEM\":{\"NAME1\":\"{ITEM.NAME1}\",\"KEY1\":\"{ITEM.KEY1}\",\"VALUE1\":\"{ITEM.VALUE1}\"},\"HOST\":{\"NAME1\":\"{HOST.NAME1}\"},\"EVENT\":{\"ID\":\"{EVENT.ID}\"}}" https://***.herokuapp.com/zabbix/hooks/{room_id}
```

ただ通知するだけなら、別にChabot使わなくても直にChatWrok APIを叩けばできます。
メンテナンス制は悪いですが。

```bash
curl -X POST -H "X-ChatWorkToken: 自分のAPIトークン" -d "body=[info][title]{TRIGGER.STATUS}: {TRIGGER.NAME}[/title]Trigger status: {TRIGGER.STATUS} Trigger severity: {TRIGGER.SEVERITY} Item values: [code]{ITEM.NAME1} ({HOST.NAME1}:{ITEM.KEY1}): {ITEM.VALUE1}[/code][/info]" "https://api.chatwork.com/v1/rooms/{room_id}/messages"
```

### bot/zabbix-plus

Zabbixのエラー内容から関連情報がないかアラートと一緒に通知します。

サンプルではConfluenceを叩いてますが、そこは適宜変えてください。

```bash
curl -sS -H 'Content-type: application/json' -X POST -d "{\"TRIGGER\":{\"NAME\":\"{TRIGGER.NAME}\",\"STATUS\":\"{TRIGGER.STATUS}\",\"SEVERITY\":\"{TRIGGER.SEVERITY}\",\"URL\":\"{TRIGGER.URL}\"},\"ITEM\":{\"NAME1\":\"{ITEM.NAME1}\",\"KEY1\":\"{ITEM.KEY1}\",\"VALUE1\":\"{ITEM.VALUE1}\"},\"HOST\":{\"NAME1\":\"{HOST.NAME1}\"},\"EVENT\":{\"ID\":\"{EVENT.ID}\"}}" https://***.herokuapp.com/zabbix-plus/hooks/{room_id}
```
