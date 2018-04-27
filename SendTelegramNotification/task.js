"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
const Telegram = require('telegraf/telegram');
const Telegraf = require('telegraf');
const tgtools = require('./tgtools');

if (tl.getBoolInput('getChatId',false)) {
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("You now can get chat IDs from your chats \n Use /chat command to get the ID \n Then /stop to finish the task");
                const bot = new Telegraf(tl.getInput('botToken', true));
                bot.command('/chat', (ctx) => ctx.reply(ctx.chat));
                bot.command('/stop', function () { bot.stop(); });
                bot.startPolling();
            }
            catch (err) {
                tl.setResult(tl.TaskResult.Failed, err.message);
            }
        });
    };
    run();
}
else {
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
             var token = tl.getInput('botToken',true);
             var chats = tl.getDelimitedInput('chats',',',false);
             var body = "";
             
              if (tl.getBoolInput("taskStatus",false)) {             
                switch (tl.getVariable("Agent.JobStatus")) {
                 case "Succeeded":
                     body += "\n<b>✅ Task Succeeded</b>"
                     break;
                case "Failed":
                     body += "\n<b>⛔️ Task Failed</b>"
                     break;
                case "SucceededWithIssues":
                     body += "\n<b>⚠️ Task has some Issues</b>"
                     break;
                 default:
                     break;
             }
            }
            if (tl.getBoolInput('buildNumber', false)) {
                body += "\n<b>#Build-" + tl.getVariable("Build.BuildNumber")+"</b>";
            } else if (tl.getBoolInput('releaseName', false)) {
                body += "\n<b>#" + tl.getVariable("Release.ReleaseName")+"</b>";
            }
             if (tl.getInput('message', false) !== null) {
                 var message = tl.getInput('message', false);
                 body += "\n" + message;
             }     
             if (tl.getBoolInput('buildQueuedBy', false)) {
                 var buildQueuedBy = tl.getVariable("Build.QueuedBy");
                 body += "\n<b>Build queued by:</b> " + buildQueuedBy;
             }
             if (tl.getBoolInput('releaseRequestedFor', false)) {
                 var releaseRequestedFor = tl.getVariable("Release.RequestedFor");
                 body += "\n<b>Release queued by:</b> " + releaseRequestedFor;
             }
             if (tl.getBoolInput('teamUrl', false)) {
                var teamLink = tl.getVariable("System.TeamFoundationCollectionUri");
                var project = tl.getVariable("System.TeamProject");
                body += "\n<b>Project URL: </b>" + tgtools.tglinkbuilder(teamLink+project, project);
             }     


             const telegram = new Telegram(token);
             chats.forEach(chat => {
                 telegram.sendMessage(chat,body, {parse_mode: 'HTML'});   
             });         
             console.log('Message sent!');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
}