---
title: 'Upgrading the button by which your parents call you to come and eat'
draft: false
featured: false
handbook: Starter Kit
date: 2019-11-09T12:09:03.400Z
description: >-
  Create an IoT button with the Big Clown Starter Kit that enables your parents to call you for breakfast, lunch or dinner, depending on the time of day. Higher level - only for those who have no fear!
meta_title: 'Upgrading the button by which your parents call you to come and eat'
meta_description: >-
  Create an IoT button with the Big Clown Starter Kit that enables your parents to call you for breakfast, lunch or dinner, depending on the time of day. Higher level - only for those who have no fear!
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573302989/projects/dalsi-level-projekt-tlacitko-pro-mamku/05.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573302989/projects/dalsi-level-projekt-tlacitko-pro-mamku/05.png
tags:
  - Indoor
levels:
  - Advanced
places:
  - Home
devices:
  - Starter Kit
modules: ["core","button","mini_battery","usb_dongle"]
---
## Introduction

{{< perex >}} Do you already have a basic version of the button that enables your mom to call you for dinner? Congratulations. 👍 With this enhancement, you can move the project even further forward - the message changes according to the time of day. You can even respond to it. {{< /perex >}}

Under this project, you will learn how to **set up a different message for different times of day**, send a special notification **by holding the button** and program a simple **response** option. 👌

The basic version of this project can be found here: [Create an IoT button that enables your mom to call you for dinner](/cs/projects/tlacitko-pro-rodice/).

You will need the **box with button** and a **USB Dongle**. The basic BigClown [**Starter Kit**](https://shop.bigclown.com/starter-kit/) is sufficient for this.

{{< modules >}}

## Prepare Node-RED

1. Put the Starter Kit together and pair it. On the Core Module you will need the familiar **bcf-radio-push-button** firmware again.

![sestavení-starter-kitu](https://res.cloudinary.com/lukasfabik/image/upload/v1573301763/projects/dalsi-level-projekt-tlacitko-pro-mamku/image2.png)

## Set up notification

1. Set up the flow of the notification in the same way as the [basic version of this project](https://www.bigclown.com/cs/projects/tlacitko-pro-rodice/).

Place the **MQTT node**, which has click counting in Topic, from the Input section onto the desktop. Next to it, place **mobile notification** connected to Blynk.

❗ **Skip the change node for now**, you'll soon find out why.

So far it looks like this:

![MQTT node](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image10.png)

2. This time, paste a different node, to which you copy javascript, between the two nodes. You will find it as the **Function node** under the section of the same name.

![Function node](https://res.cloudinary.com/lukasfabik/image/upload/v1573301763/projects/dalsi-level-projekt-tlacitko-pro-mamku/image1.png)

3. To this node add a **code with which to control the time**. ⏳ You set up from what time until what time you want to receive breakfast 🍳, lunch 🍗 and dinner 🍕 messages. Smart javascript, hey?

Copy the following code into the **Function** line in the node setting. If you look at the code, you will see that some parts are highlighted in color. In them, you set the **meal time** and **your own message**. Customize the colored parts of the code, bearing in mind that accent marks (čárky) and hooks (háčky) won't work.

\`\`\` var date = new Date(); var hour = date.getHours();

if(hour >= 8 && hour < 11) { msg.payload = "Pojd na snidani, ospalce"; return msg; } else if(hour >= 11 && hour < 17) { msg.payload = "Obidek na tebe uz ceka"; return msg; } else if(hour >= 17 && hour < 21) { msg.payload = "Podava se vrchol dne, vecere"; return msg; } \`\`\`

![Setting the message itself](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image8.png)

4. Name this node in the same window in the **Name** line. For example _Time & Message Setting_.

![ Setting time and message](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image6.png)

Confirm with the **Done** button.

## Set up press and hold button.

1. Let's quickly move on. Now it´s time to set up what the button does when your parents **hold it for a long time**. That can be controlled too. 👌

Place another **MQTT node** from the Input section onto the desktop.

![MQTT](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image7.png)

2. Set there a different **Topic** that causes the reaction of the button when you press it for a long time.

``` node/push-button:0/push-button/-/hold-count ```

![Topic](https://res.cloudinary.com/lukasfabik/image/upload/v1573301763/projects/dalsi-level-projekt-tlacitko-pro-mamku/image4.png)

3. Behind this, place the **Change node** that you already used in the basic version. In it, set your own message, which is sent when your parents hold the button for a long time. It can be used for different messages other than for eating 🙂. For example: _Come downstairs, you lazy so and so!_

![Change node](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image5.png)

4. Behind this node, place another one to unclick the message. In addition, you can make the message not only pop up on your mobile, but also on your computer.

You can do this through the **Notification node** under the Dashboard section.

![Notification node](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image11.png)

5. In the node, select OK/Cancel Dialog on the **Layout** line and confirm with the **Done** button.

![Layout](https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image9.png)

6. Connect everything as shown in the screenshot and press **Deploy**.

![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1573301763/projects/dalsi-level-projekt-tlacitko-pro-mamku/image3.png)

## Ready, steady... go!

1. Like before, put the improved box ** in the hands of your mom and dad**.
2. Instruct them to **short press** the button to call you to come and eat…

{{< middle >}} {{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573301764/projects/dalsi-level-projekt-tlacitko-pro-mamku/image12.png" alt = "vylepšená krabička" >}} {{< /middle >}}

3. ... and to **press and hold** 👇 the button if they want to call you for anything else.

{{< middle >}} {{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1573301765/projects/dalsi-level-projekt-tlacitko-pro-mamku/image13.png" alt = "zmáčknutí tlačítka" >}} {{< /middle >}}

At least you won't be disappointed when, instead of eating, there is a family discussion on the plate. Ugh, another menu, please!
