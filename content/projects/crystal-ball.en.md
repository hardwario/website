---
title: Tell your fortune with IoT
draft: false
featured: false
handbook: Starter Kit
date: 2019-11-09T14:36:10.628Z
description: >-
  Create an IoT fortune-telling cube or magic 8-ball with the HARDWARIO Starter Kit. When you shake it, it gives you an answer to everything you want to know.
meta_title: Tell your fortune with IoT
meta_description: >-
  Create an IoT fortune-telling cube or magic 8-ball with the HARDWARIO Starter Kit. When you shake it, it gives you an answer to everything you want to know.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573640047/projects/project_placeholder.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573640047/projects/project_placeholder.jpg
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

{{< perex >}}
Even young programmers want to know what their future holds. The box will tell you. IoT magic will answer all the questions that come into your head. 🔮 😱
{{< /perex >}}

Under this project, you will learn to turn the box into an oracle or **magic 8-ball**. ️🎱 Set it to randomly choose one of a number of options when it is shaken.

You will need the **box with button and a USB Dongle**. The basic HARDWARIO [**Starter Kit**](https://shop.hardwario.com/starter-kit/) is sufficient for this.

{{< modules >}}

## Make it happen in Node-RED

1. Put the Starter Kit [together and pair it](/handbook/). You need the **radio-8-ball** firmware for the Core Module. If you don't know how to download the firmware or what it is,[you can find out here](/academy/how-to-flash-firmware/).

After downloading the firmware, you will see that the Alias of your device under the Devices tab has changed to **Future teller**.

![Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1573310716/projects/vestici-koule/image9.png)

2. In Playground, click on the **Functions tab** \- this is where you will find the programming desktop.

3. Place an **MQTT node** from the Input section onto the desktop.
![MQTT](https://res.cloudinary.com/lukasfabik/image/upload/v1573310714/projects/vestici-koule/image3.png)

4. Double-click on the node and set the key function to fortune-telling. 🔮 **Copy this line to the Topic field**:

```
node/future-teller:0/future/trigger
```

![Topic](https://res.cloudinary.com/lukasfabik/image/upload/v1573310714/projects/vestici-koule/image4.png)

Confirm with the **Done** button.

## Leave it to chance

1. The box works by providing one of the preset answers. It works on the basis of **random selection**. Now let's set it up.
You can program the random selection process according to a simple javascript. How? Behind the MQTT node, place a **Function node**, which you will find under the section of the same name.

![Function node](https://res.cloudinary.com/lukasfabik/image/upload/v1573310716/projects/vestici-koule/image11.png)

2. Double-click on the node to open it. Name the node in the **Name** line (for example 8-ball). Copy the following code into the **Function line**, as you can see in the screenshot.

```
var answers = ["Nejspíš ano", "S tím nepočítej", "Možná", "Určitě ano"] var num = Math.floor(Math.random() * Math.floor(answers.length)); msg.payload = answers[num]; return msg;
```

![Name node](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image5.png)

This code selects **one of four options**:
- Probably yes,
- Don't count on it,
- Maybe,
- Definitely yes.
Confirm with the **Done** button.

3. Next to the Random node, add a **Text node**, which can be found under the Dashboard section.
![Text](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image2.png)

4. In the node, set **Label** to Answer.

![Label](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image6.png)

Confirm with the **Done** button.

5. Add a robot to your desktop to read the result out loud. This will make the experience just that little bit creepier. 🤖 You do this by using the Audio Out node, which can also be found under the Dashboard section.

![Dashboard](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image1.png)
Set the voice in the node to read the message.

![Voice setting](https://res.cloudinary.com/lukasfabik/image/upload/v1573310716/projects/vestici-koule/image10.png)
Confirm with the **Done** button.

6. **Connect the nodes** as shown in the screenshot.
![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image8.png)

Start the flow with the **Deploy** button in the top right.

## Let the Great One tell you what your future holds.

1. Lift the box and **ask it the question** that is burning inside you. For example:

- Will David from the higher class return my love?
- Will there be blueberry dumplings for lunch tomorrow at school?
- Will I become a successful circus artist?
- Will the sun rise in the morning?
- Will I finally learn to eat with chopsticks?
- Will I work at Google someday?
- Should I dye my hair green?

2. **Shake the box** and find out the answer in Playground under the Dashboard tab.🎱 Be sure to turn on the speakers so that you hear it too. Hallelujah!

![Dashboard](https://res.cloudinary.com/lukasfabik/image/upload/v1573310715/projects/vestici-koule/image7.png)

P.S. The box does not guarantee that the answer it gives is right. 🤡
