
# Telegam Notification VSTS Extension

Telegram Notification task uses [Telegram Bot API](https://core.telegram.org/bots) and allows you to send customizable notifications to your Telegram chats and groups.
This task has some predifined options of what info (e.g build/release status, ID etc.) to include to the message about your build/release process.

# Getting started
Follow the instructions below to configure the Telegram Notifications task to send messages to a group or chat.

## Create a Bot
First of all you need to create a Telegram bot which will later send all the notifications to your chats.

* **Talk to Bot Father**: follow [Bot Father's](https://core.telegram.org/bots#6-botfather) instructions and create a bot
* **Save Bot Token**: this token will be used by the task
![Bot Token](https://raw.githubusercontent.com/JackB1ack/telegram-notification/master/Screenshots/botfather.PNG)

*Having a bot allows you to fully customize its appearance (nickname, user picture) and add it to as many chats or groups as you want*

## Obtain chat IDs
Currently Telegram does't offer a convinient way to obtain all chat ids from bot API. 
So there are two ways to do it:

### 1. Add  [@RawDataBot](https://t.me/RawDataBot) to your group

Upon joining it will send a JSON where your chat id will be located at message.chat.id.
![RawDataBot]()

### 2. Use built-in "Get chat ID" feature *Preview*

If you want the bot to send notifications directly to you (not a group), trick with [@RawDataBot](https://t.me/RawDataBot) won't work.

* **Check "Get chat Id" in task properties**
![GetChatId]()
* **Queue build or release**: please make sure that this action won't affect any of your production processes. I suggest creating empty build\release definition just to get chat ID and then paste them to real task.
* **Type /chat**: while task is running type /chat in every chat where bot is present
* **Type /stop**: type this command to finish task execution
* **Paste your chat IDs to task properties**: copy all your ID to task propety (use coma as delimeter *e.g -123456678,321654987*)

