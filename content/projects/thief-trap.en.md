---
title: Create an IoT thief trap
draft: false
featured: false
handbook: starter kit
date: 2019-11-08T13:34:02.585Z
description: >-
  Use the Motion Detector Kit to set up a burglar alarm in your room. We have prepared a simple guide for you.
meta_title: Create an IoT thief trap
meta_description: >-
  Use the Motion Detector Kit to set up a thief alarm in your room. We have prepared a simple guide for you.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573640189/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/2-domaci-alarm.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573640189/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/2-domaci-alarm.jpg
tags:
  - Smart Home
modules: ["core","pir","mini_battery","usb_dongle"]
---
## Introduction

{{< perex >}}
Is your younger brother entering your room? Are you going on holiday and afraid someone will steal your treasure? Set up an alarm against all thieves. 👮
{{< /perex >}}

Under this project, you will learn how to create a **detector that sends notifications to your mobile if someone else is in your room**. 👁️

If you already have the Starter Kit, you will only need the [**PIR Module**](https://shop.hardwario.com/pir-module/). Alternatively, the [Motion Detector Kit](https://shop.hardwario.com/motion-detector-kit/) contains all the equipment you need.

{{< modules >}}

## Download the new firmware

1. If you haven´t done so yet, put the Motion Detector Kit together.

2. Load special firmware onto the Core Module, namely bcf-radio-burglar-alarm (you will find it among the other firmware in Playground). With this firmware the box will reveal intruders and burglars.👂

![Assembling the Motion Detector Kit](https://res.cloudinary.com/lukasfabik/image/upload/v1573157109/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image20.png)

**Our tip**: You don’t know how to download the firmware or what is it? [You'll find out here](/academy/how-to-flash-firmware/).

3. Pair the Core Module with a USB Dongle. Right after pairing, you will see that your Core Module has changed the Alias to **Burglar alarm**.

![Burglar alarm](https://res.cloudinary.com/lukasfabik/image/upload/v1573157099/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image10.png)

❓ **Did you know**? In English, a burglar is a sort of thief. For example, Bilbo Baggins from the Hobbit was a thief. He stole from the dragon's treasury! 🐉

## Start the app on your mobile

1. **Continue on your mobile.**. The box connects to your smartphone thanks to the **Blynk app**. 📱 [Find out how Blynk works.](/academy/how-to-connect-blynk/)

2. Select the embellished **Styled button** from the menu. 🚨 The button is placed on the project desktop and switches the motion detector on and off.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573157119/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image22.png" alt = "spuštění aplikace" >}}
{{< /middle >}}

3. Clicking on the button takes you to settings.

**Name** the detector in the upper line.

Directly below this, select the **PIN**. Click on it. Choose **virtual** and **select the number as you wish**. Make sure you remember it! You will need to enter it on your computer. Save the PIN and continue setting the button.

The rest is up to your artistic talents. 🎨 You can choose the color of the button when it is off and on, its shape and other details.

When you have completed everything,<b> </b>**return to the desktop** by clicking on the arrow in the top left.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573157108/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image18.png" alt = "virtuální tlačítko" >}}
{{< /middle >}}

4. Click on the desktop to add another feature. In this case, it concerns the **notification**.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573157088/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image4.png" alt = "notifikace" >}}
{{< /middle >}}

5. Your desktop now looks like this. Start the project with the **Play** button in the top right. ▶️

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573157116/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image25.png" alt = "spuštění projektu" >}}
{{< /middle >}}

6. **Tap the button**, it should switch from ON mode to OFF mode.

## Set the switching button in Node-RED

1. In Playground, click the **Functions tab** where the [Node-RED](/academy/what-is-node-red/) programming desktop is.🤖
2. Start programming and jump right in. The first node will contain a small javascript code. Place it on the desktop using the ** Function node** from under the section of the same name.

Double-click on it and type the node name in the Label field: Int parser.

Subsequently, copy the following simple javascript code into the Function field:

```
msg.payload = parseInt(msg.payload); return msg;
```

![Node-RED programming desktop](https://res.cloudinary.com/lukasfabik/image/upload/v1573157099/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image12.png)

3. Now add a node with which you can turn the thief monitoring on and off. This is to keep the phone from bleeping when you are home. 🔕 Do it using the **Switch node** under the Dashboard section.

![](https://res.cloudinary.com/lukasfabik/image/upload/v1573157095/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image8.png)

4. Double-click on the node and change its **Label** to Trigger. Then adjust **On Payload** and **Off Payload** to 1 and 0 (as shown in the screenshot).

Confirm with the **Done** button.

![Trigger](https://res.cloudinary.com/lukasfabik/image/upload/v1573157095/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image3.png)

5. Behind this node, place the **Write** **node** from under the Blynk ws section.

![Write node from Blynk](https://res.cloudinary.com/lukasfabik/image/upload/v1573157114/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image15.png)

6. Double-click on it. Fill in the **PIN** you entered for the project in Blynk. Enter the number without the initial V.

![Programming](https://res.cloudinary.com/lukasfabik/image/upload/v1573157096/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image5.png)

Then click on the small pencil symbol.✏

![Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1573157090/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image1.png)

7. The connection settings will open. In the **URL** field, enter the web address from the field below. In the **Token** field, copy and paste the code you received by e-mail from Blynk.

Finally, name the project in the **Label** field for better orientation.

Confirm everything and return to the programming desktop.

![Setting the connection](https://res.cloudinary.com/lukasfabik/image/upload/v1573157110/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image17.png)

8. Add a node a bit lower down with a similar name but a different function. This should be a **Write Event node** from under the Blynk ws section. Set the same **PIN** in it again. You do not have to click on the small pencil again, the nodes are connected and everything is set up by itself.

![Write Event node](https://res.cloudinary.com/lukasfabik/image/upload/v1573157114/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image23.png)

9. Behind this node, place another javascript **Function node**. With it, the project will show whether the button in Blynk is currently on or off.

In the **Name** line, fill in the Notification setting status and copy the following code into the **Function** field:

```
if(msg.payload == "1") { flow.set("alarmOn", 1); } else { flow.set("alarmOn", 0); } return msg;
```

![Setting the notification](https://res.cloudinary.com/lukasfabik/image/upload/v1573157103/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image11.png)

10. Now connect the whole flow. Don't go just yet though. You still need to set up two more miniflows.

![Setting the miniflows](https://res.cloudinary.com/lukasfabik/image/upload/v1573157120/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image21.png)

## Program the main sensor

1. The whole project works on the principle of a motion sensor – when an intruder or thief enters your room, the box notices it and activates the alarm.

By measuring the ambient temperature, the alarm can change its status to keep itself in a low power mode in order to not drain the batteries in the box too much.🔋

In the next flow, start with the good old **MQTT node** from under the Input section. In the node, set the temperature measurement as **Topic**:

```
node/burglar-alarm:0/thermometer/0:1/temperature
```

![Temperature measurement](https://res.cloudinary.com/lukasfabik/image/upload/v1573157098/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image7.png)

2. Place another Function node right behind it. In the Name field, write the Alarm Status and use the following code:


```
msg.payload = flow.get("alarmOn"); return msg;
```

Due to this node, the sensor will only be active if you trigger it by a button in Blynk or on a computer.

![Alarm status](https://res.cloudinary.com/lukasfabik/image/upload/v1573157118/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image19.png)

3. For the best bit of all, place the MQTT node from under the

**Output** section onto the desktop (watch it ❗).

In the node, set _node/burglar-alarm:0/alarm/-/set/state_ as the Topic, through which the sensor sends its status to the alarm. If the switch in Blynk or Dashboard is turned on, the alarm is activated. 👮

![Alarm activation](https://res.cloudinary.com/lukasfabik/image/upload/v1573157095/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image2.png)

4. Subsequently **connect** these three elements together.

![Node connecting](https://res.cloudinary.com/lukasfabik/image/upload/v1573157111/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image14.png)

## Set up your message

1. In the last miniflow, you set up the message that is sent to your mobile when the alarm detects someone. 📩

Place the **MQTT node from under the Input section** onto your desktop. In the node, set the **Topic** as node/burglar-alarm:0/pir/-/event-count. This means that the node will be activated if it is active and someone passes by it. Simply, a smart motion sensor.

![MQTT Node](https://res.cloudinary.com/lukasfabik/image/upload/v1573157123/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image26.png)

2. A short javascript code should follow it, namely a **Function node**. As the **Name** set _Message_ with this code right here:

```
msg.payload = "Someone's in your room" return msg;
```

**Our tip**: Feel free to rewrite the message in the code, but remember that Blynk does not read hooks (háčky) and accent marks (čárky). Otherwise it´s double Dutch! 🤷

![Message](https://res.cloudinary.com/lukasfabik/image/upload/v1573157116/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image16.png)

3. Finally, place here the **Notify node** from under the Blynk ws section. This communicates with the mobile app notification. You'll find a Token filled in. Just make sure it matches the one that Blynk sent to your e-mail.

![Notify node](https://res.cloudinary.com/lukasfabik/image/upload/v1573157090/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image6.png)

4. **Connect** these elements. Finally, press the **Deploy** button.

![Connection of nodes and Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1573157122/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image24.png)

## Ready, steady… go!

1. When you want to trigger the alarm, **set the switch** on your computer (in the Dashboard tab) or on your mobile. Both buttons work together, so you can set either one or the other.

![Set the switch](https://res.cloudinary.com/lukasfabik/image/upload/v1573157102/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image13.png)

2. Place your box near the door. When the box detects movement, **it will send a notification to your mobile**.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573157092/projects/pohlidej-si-kdyz-nejsi-doma-jestli-ti-nekdo-neleze-do-pokoje/image9.png" alt = "upozornění v mobilu" >}}
{{< /middle >}}

Thieves beware! The law is here! 😱
