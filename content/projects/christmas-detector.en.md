---
title: 'IoT project: Create a Santa/Baby Jesus detector'
draft: false
featured: false
handbook: starter-kit
date: 2019-11-05T17:45:58.874Z
description: Catch Santa with the Big Clown PIR Module. They won’t believe it!
meta_title: 'IoT project: Create a Santa/Baby Jesus detector'
meta_description: Catch Santa/Baby Jesus with the Big Clown PIR Module. They won’t believe it!
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1572976435/projects/detektor-jeziska/image15.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1572976427/projects/detektor-jeziska/image12.png
tags:
  - Indoor
levels:
  - Beginner
places:
  - Home
devices:
  - Starter Kit
modules: ["core","climate","mini_battery","usb_dongle"]
---

## Introduction

{{< perex >}} Santa and Baby Jesus are highly secretive people, but with IoT you can catch either of them in the act of bringing presents. 🎄 The PIR Module: motion detector will help you {{< /perex >}}

Under this project, you will learn how to **detect motion in a remote room**. Thanks to this you can check whether Santa Claus, Baby Jesus, Grandpa Frost or someone else is in your home. 😲

If you already have the Starter Kit, you will only need the [PIR Module](https://obchod.bigclown.cz/pir-module/). Alternatively, the [Motion Detector Kit](https://obchod.bigclown.cz/pir-module/) contains **all the equipment** you need.

{{< modules >}}

## Prepare the box

1. Put your kit together. You need the **bcf-radio-motion-detector** firmware for the Core Module. If you don't know how to download the firmware or what it is,[you can find out here.](https://www.bigclown.com/cs/academy/jak-nahrat-firmware/) ![Radio motion detector](https://res.cloudinary.com/lukasfabik/image/upload/v1572976427/projects/detektor-jeziska/image12.png)

2. If the firmware is correctly installed, you will see the **motion detector** under the Devices Alias tab in Playground. ![Motion detector](https://res.cloudinary.com/lukasfabik/image/upload/v1572976419/projects/detektor-jeziska/image10.png)

## Set up Node-RED

1. Start programming in Node-RED. First, click on the **Functions** tab in Playground.
2. Drag a light purple **MQTT node** (bubble) onto the empty desktop. You can find it under the Input section.

![mqtt](https://res.cloudinary.com/lukasfabik/image/upload/v1572976412/projects/detektor-jeziska/image6.png)

3. Double-click the node. In the **Topic** line, specify the key value. It will now function as a counter of movements that are recorded:


``` node/motion-detector:0/pir/-/event-count ```

![Key value](https://res.cloudinary.com/lukasfabik/image/upload/v1572976432/projects/detektor-jeziska/image17.png)

Confirm with the **Done** button.

4. Behind this node, place a **Switch node** from the Function section. This allows the device to recognize that the detector is on and can report any movements. ![Switch](https://res.cloudinary.com/lukasfabik/image/upload/v1572976423/projects/detektor-jeziska/image9.png)

5. In the node, fill in the **Property** line as _flow_. _detectorActive_ and edit the condition in the field to _is true_ (take a look at the screenshot). **Our tip**: Read more about this feature. ![Property](https://res.cloudinary.com/lukasfabik/image/upload/v1572976425/projects/detektor-jeziska/image11.png)

Confirm with the **Done** button.

6. Behind the switch node, place a **Change node** from the same Function section. ![Change](https://res.cloudinary.com/lukasfabik/image/upload/v1572976442/projects/detektor-jeziska/image19.png)

7. In the node, you set the message that you want to pop up when our bearded friend (or Baby Jesus) brings their presents. 🎅 👼 For example: _Santa/Baby Jesus is in the living room_. **Our tip**: If you also want to set notifications for your mobile, do not use accent marks (čárky) or hooks (háčky), Blynk does not like them. ![Message setting](https://res.cloudinary.com/lukasfabik/image/upload/v1572976434/projects/detektor-jeziska/image14.png)

Confirm with the **Done** button.

8. Above this flow, start another one to be able to switch the detector on and off. It should consist of two nodes. The first is a **Switch node** from the Dashboard section. ![Switch node](https://res.cloudinary.com/lukasfabik/image/upload/v1572976410/projects/detektor-jeziska/image2.png)

9. In this node, edit **Label** to _Detector Status_. This is how your Dashboard project will be labelled. ![Detector Status](https://res.cloudinary.com/lukasfabik/image/upload/v1572976416/projects/detektor-jeziska/image3.png)

Confirm with the **Done** button.

10. Behind the switch node, place a **Change node** from the Dashboard section. That´s right, just like the one you already have a little lower down. 👍 ![Change node](https://res.cloudinary.com/lukasfabik/image/upload/v1572976415/projects/detektor-jeziska/image1.png)

11. In the **Rules** field, set the function to: _flow_. _detectorActive_ (see screenshot). This enables the device to recognize if the button is on or off. Beware of making typing errors! ![Rules](https://res.cloudinary.com/lukasfabik/image/upload/v1572976434/projects/detektor-jeziska/image14.png)

Confirm with the **Done** button.

12. Now connect all the nodes **as shown in the screenshot**, but don't press the Deploy button yet. The last node, which we will add shortly, is still missing. With the last node you set up a notification to your mobile. 🤳 ![Connection node](https://res.cloudinary.com/lukasfabik/image/upload/v1572976430/projects/detektor-jeziska/image13.png)


## Set up notification to mobile

1. Take your smartphone and turn on the Blynk app. If you turn it on for the first time, you can find out everything you need to know in our [Blynk manual](https://www.bigclown.com/cs/academy/jak-pripojit-blynk/).

2. Create a new project and a token will be sent to your e-mail. In Blynk, place **Notification** onto your desktop using the small plus in the wheel.

{{< middle >}} {{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1572976412/projects/detektor-jeziska/image7.png" alt = "notification" >}} {{< /middle >}}

3. Press the **Play** triangle in the upper right corner and **go to Playground on your computer**.

4. Here, place the last node for the whole project, i.e. the Notification node from the Blynk ws section. It should be placed directly behind the flow with the switch (see screenshot). 👀 ![Playground](https://res.cloudinary.com/lukasfabik/image/upload/v1572976443/projects/detektor-jeziska/image21.png)

5. Unclick it and click on the **little pencil** on the right. ![Little pencil](https://res.cloudinary.com/lukasfabik/image/upload/v1572976442/projects/detektor-jeziska/image20.png)

6. Fill in the URL here by simply copying it from the field below. Subsequently, copy and paste the token here that you received by e-mail from Blynk. ![Token copying](https://res.cloudinary.com/lukasfabik/image/upload/v1572976430/projects/detektor-jeziska/image8.png)

Confirm by pressing the **Add** and **Done** buttons.

7. Finally, **connect** this attractive green node to the previous flow and hit the **Deploy**button. ![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1572976425/projects/detektor-jeziska/image4.png)

## Ready, steady… go!

1. It's high time to spy on those who come bearing gifts. Under the **Dashboard** tab in Playground, **turn on your detector**. 🕵️ ![Turning on detector](https://res.cloudinary.com/lukasfabik/image/upload/v1572976428/projects/detektor-jeziska/image16.png)

2. The PIR Module senses even the slightest movement and sends the message that something is afoot to your mobile in no time. **Santa or Baby Jesus don´t stand a chance**! Quick! Catch them while you can!

{{< middle >}} {{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1572976411/projects/detektor-jeziska/image5.png" alt = "notifikace do mobilu" >}} {{< /middle >}}

3. Only keep in mind: After catching Santa or Baby Jesus, you will have to **placate them** in order for them to leave you any presents at all. 😜
