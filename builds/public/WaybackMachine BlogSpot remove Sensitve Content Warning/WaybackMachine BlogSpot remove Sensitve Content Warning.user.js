// ==UserScript==
// @name WaybackMachine BlogSpot remove Sensitve Content Warning
// @description Removes the Sensitve Content Warning from Blogspot pages that are saved in the WaybackMachine
// @version 1.1
// @author Creepler13
// @match https://web.archive.org/web/*/https://*.blogspot.com/*
// @icon https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blogger_icon.svg/800px-Blogger_icon.svg.png
// ==/UserScript==

!function(){"use strict";setInterval((e=>{let t=document.getElementById("injected-iframe");if(t&&(t.style.visibility="hidden"),document.getElementById("removeAgeRestriction"))return;let i=document.createElement("style");i.innerText=" body * {  visibility:visible;} ",i.id="removeAgeRestriction",document.body.append(i)}),100)}();