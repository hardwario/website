---
title: Did you oversleep? Send an apology to your teacher by pressing a smart button
draft: false
featured: false
handbook: Starter Kit
date: 2019-11-09T15:06:49.642Z
description: >-
  How to create a smart button with the Big Clown Starter Kit. It sends an apology to your teacher if your alarm clock lets you down.
meta_title: Did you oversleep? Send an apology to your teacher by pressing the button
meta_ description: >-
  How to create a smart button with the Big Clown Starter Kit. It sends an apology to your teacher if your alarm clock lets you down.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573639907/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/Nocni-lampa.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573639907/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/Nocni-lampa.jpg
tags:
  - Indoor
levels:
  - Beginner
places:
  - Home
devices:
  - Starter Kit
modules: ["core","pir","mini_battery","usb_dongle"]
---

## Introduction

{{< perex >}} Even a mobile phone isn´t infallible! It may sometimes let you down and not wake you up. If it happens to you, don't despair. Press 👇 the smart button to apologize to your teacher before they inform your parents. {{< /perex >}}

Under this project, you will learn **how to send an e-mail using a smart button**. 📩

All you need for this is the basic HARDWARIO [**Starter Kit**](https://shop.hardwario.com/starter-kit/).

{{< modules >}}

## Make it happen in Node-RED

1. Put the Starter Kit together and pair it: If you are doing this for the first time, [we've prepared a simple guide for you](/handbook/). You need the radio push button firmware for the Core Module. If you don't know how to download the firmware or what it is,[you can find out here](/academy/how-to-flash-firmware/).
2. In Playground, click the **Functions tab** where the [Node-RED](/academy/what-is-node-red/) programming area is.🤖
3. Place the **MQTT** node from the Input section on the Node-RED area.
![MQTT](https://res.cloudinary.com/lukasfabik/image/upload/v1573312451/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image6.png)

4. In the node, set the key function, i.e. push button. Double-click on the node and **copy the following line into the Topic field**:

```
node/push-button:0/push-button/-/event-count
```

Confirm with the **Done** button.

## Set content of the apology

1. You also determine the content of the apology in Node-RED. Place **Change node** from the Functions section next to the MQTT node. This determines what e-mail is sent.
![Change](https://res.cloudinary.com/lukasfabik/image/upload/v1573312451/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image5.png)

2. Double-click on the node and set two rules in the **Rules** field (see screenshot below).

The first rule will be **msg. payload **: this sets the message content. Keep in mind that the node is not familiar with Czech accent marks (čárky) and hooks (háčky) and don't forget to sign it. The message may read like this:

_Dear Mr. Woodpecker, I'm sorry, but unfortunately my dog ate my alarm clock. I'll come a.s.a.p. Evzen (your favorite pupil, who does not deserve to have a note sent home to his parents)._

In the second rule, which you add by pressing the **\+ add** button below, you fill in **msg. topic**. This will be the subject matter of the e-mail. For example _Apology_ for _being late_.

![Rules](https://res.cloudinary.com/lukasfabik/image/upload/v1573312453/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image11.png)

Confirm with the **Done** button.👏

## Start the app on your mobile

1. **Continue on your mobile.**. The e-mail is sent to the teacher at the touch of the button via the **Blynk** app. 📱 If you don't know Blynk yet from other projects, [ find out how to start it](/academy/how-to-connect-blynk/).

2. Select **E-mail** from the menu. ✉️ The button is placed on the project desktop.
{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573312453/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image4.jpg" alt = "E-mail" >}}
{{< /middle >}}

3. Clicking on the button takes you to settings. Here, set up your teacher's e-mail address to send your apology.

{{< middle >}} {{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573312451/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image1.jpg" alt = "nastavení e-mailu" >}} {{< /middle >}}

When you are finished, return to the desktop via the top left arrow and activate Blynk with the Play button in the top right.

## Set up sending e-mails

1. Now return to Playground. Add **E-mail node** from Blynk ws after your flow. 📮
![E-mail node](https://res.cloudinary.com/lukasfabik/image/upload/v1573312453/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image9.png)

2. Double-click on the node and fill in the teacher's e-mail address on the **E-mail** line.
![E-mail](https://res.cloudinary.com/lukasfabik/image/upload/v1573312453/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image8.png)

3. Then click on **the pencil** next to the **Connection** line and set some more details. In the **Auth Token** field, copy the code that Blynk sent to your e-mail account.
**In the URL field, copy the address** from the bottom of the window (see screenshot) and give the function a name in the Name field, for example _Apology_.
![URL](https://res.cloudinary.com/lukasfabik/image/upload/v1573312452/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image7.png)

4. Connect the nodes, press the **Deploy** button and relax: the e-mail that will save your life if you are late is ready! 🙏
![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1573312452/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image2.png)

## Ready, steady… go!

1. Do you want to try it? **Change the e-mail address to your own for testing purposes**.
2. Confirm with Deploy again, then just press the button and ... hey presto, **someone's writing you**! 💌

![E-mail](https://res.cloudinary.com/lukasfabik/image/upload/v1573312452/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image10.png)
