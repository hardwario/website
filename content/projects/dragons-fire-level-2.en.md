---
title: 'Upgrade IoT party games: Do you have a dragon´s fire or freezing breath in you?'
draft: false
featured: false
handbook:
date: 2019-10-20T05:51:56.151Z
description: >-
  IoT game with BigClown Starter Kit. Create two competitions under one project and switch between them. The highest level - only for those who have no fear!
meta_title: 'Upgrade IoT party games: Do you have a dragon´s fire or freezing breath in you?'
meta_description: >-
  IoT hra se Starter Kitem od BigClown. Create two competitions under one project and switch between them. The highest level - only for those who have no fear!
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1571563534/projects/hardcore-upgrade-of-iot-party-game/4-soutez-s-kamarady-o-nejteplejsi-vydech-se-stickerem.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1571563534/projects/hardcore-upgrade-of-iot-party-game/4-soutez-s-kamarady-o-nejteplejsi-vydech-se-stickerem.png
tags:
  - Game
modules: ["core","button","mini_battery","usb_dongle"]
---
## Introduction

{{< perex >}}
Do you dare? Create two of your favorite competitions by building just one project, switching between them as you like! Everyone will have fun at your party. 🕺
{{< /perex >}}

Under this project, you will learn how to **save the highest measured value and determine different competitions in one project and switch between them**.

The basic version of this project can be found here: [IoT party game: Do you have a dragon´s fire or freezing breath in you?](/projects/dragons-fire/)

All you need is the basic BigClown [**Starter Kit**](https://shop.hardwario.com/starter-kit/).

{{< modules >}}

## Prepare Node-RED

1. Put the Starter Kit together and pair it. On the Core Module you will need the familiar **bcf-radio-push-button** firmware again.
![Firmware to the Core Module](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image6.png)

## Measure the hottest breath

Build this flow to detect which of your party buddies has the **hottest dragon´s breath**. 🐉 To start measuring the highest temperature, **briefly press and release the button**.
![Measure the hottest breath](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image9.png)

**Do you need advice on how to do this?**

- The **MQTT node** under the Input section hides Topic with a short press of the button:

```
node/push-button:0/push-button/-/event-count
```

- The javascript code under the **Function node** looks like this

```
var hottestTemp = flow.get("hottestTemp");
var pressed = flow.get("pressed") || false;

flow.set("holded", false);
flow.set("pressed", !pressed);

if(!flow.get("pressed")) {
  if(flow.get("contestantTemp") > hottestTemp) {
    flow.set("hottestTemp", flow.get("contestantTemp"));
    msg.payload = flow.get("hottestTemp");
    return msg;
  }
}
```
- The highest temperature is recorded under the **Text node**. Do not forget to enter the value {{msg.payload}}°C in the Value format line.
- The **Change node** lists the participant with the hottest breath; you have to set the flow in it. contestantName
The ![Change node](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image8.png)
- flow closes the ordinary **Text node**.

## Measure the coldest breath

Place the next flow below the previous one. With this, you'll be able to measure which one of you has the coldest breath to be anointed the **Night King.** ❄ To start measuring the coldest temperature, **press and hold the button**.

**Our tip**: Avoid generating a similar flow from scratch by simply copying and rewriting the nodes. Copy and paste with **CRTL + C & CTRL + V**; this can be applied to several nodes at once. Hurray! 🙌

![Measure the coldest breath](https://res.cloudinary.com/lukasfabik/image/upload/v1571551046/projects/hardcore-upgrade-of-iot-party-game/image1.png)

**Do you need advice on how to do this?**

- Under Topic in the **MQTT node** there is a press and hold button:

```
node/push-button:0/push-button/-/hold-count
```

- The javascript code under the **Function node** looks like this:

```
var coldestTemp = flow.get("coldestTemp");
var holded = flow.get("holded") || false;

flow.set("pressed", false);

flow.set("holded", !holded);

if(!flow.get("holded")) {
  if(flow.get("contestantTemp") < coldestTemp) {
    flow.set("coldestTemp", flow.get("contestantTemp"));
    msg.payload = flow.get("coldestTemp"); return msg;
  }
}

```

- **Both Text nodes are the same as in the previous flow**, with the only change that needs to be made being that the hottest is changed to the coldest.

- **The Change node is the same as in the previous flow**.

❗ **Our tip**: Something isn't working as it should? Add the Debug node to your desktop to help remove any bugs. 🐞

## Set continuous measurement

Create a new flow and place it under both previous ones. With this flow, you measure every attempt. In addition, the table remembers the names of the participants.

![Continuous measurement flow](https://res.cloudinary.com/lukasfabik/image/upload/v1571551048/projects/hardcore-upgrade-of-iot-party-game/image15.png)

**Do you need advice on how to do this?**

- The temperature measurement is under Topic in the **MQTT node**:

```
node/push-button:0/thermometer/0:1/temperature
```

- The javascript code under the **Function node** looks like this:

```
var temp = msg.payload;

if(flow.get("pressed")) {
  if(flow.get("contestantTemp") < temp) {
    flow.set("contestantTemp", temp); return msg;
  }
}
else if(flow.get("holded")) {
  if(flow.get("contestantTemp") > temp) {
    flow.set("contestantTemp", temp);
    return msg;
  }
}
```

- The dark blue **Text node** shows the temperature measured by the box for the current competitor in degrees Celsius: {{msg.payload}}°C

- If the **Text Input node** (the light blue one) has zero in the Delay line, then you must confirm the name of the competitor in the table by pressing Enter.

- The **Change node** has two rules. The first rule leaves the value empty until it registers the first temperature. The second one sets the average temperature to 30 °C, meaning that warmer results will be above 30 °C and cooler ones below it.

![Continuous measurement](https://res.cloudinary.com/lukasfabik/image/upload/v1571551046/projects/hardcore-upgrade-of-iot-party-game/image3.png)

- Under the **Function node**, the javascript code for storing names looks like this:

```
flow.set("contestantName", msg.payload);
return msg;
```

- The last **Text node ** is simply a text node that announces the current competitor. Voilà!

## Set type of competition

Easy peasy? Just add one **timestamp flow** to change the game type! A short press on the button measures the hottest breath and a long press on the button measures the coldest breath. Fantastic! 👍

![Timestamp flow](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image4.png)

### Do you need advice on how to do this?

- The first node is called **Inject**, which can be found under the Input section. It checks every second which competition is running. By pressing the button for a long or short time, it will determine whether the competition is for the coldest or hottest breath, and will open the competition accordingly.

![Inject](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image12.png)

Set it to repeat after one second.

![Interval setting](https://res.cloudinary.com/lukasfabik/image/upload/v1571551046/projects/hardcore-upgrade-of-iot-party-game/image5.png)

- The upper **Switch node** responds to a short press of the button and contains _is true_.

![Switch node](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image7.png)

- The lower **Switch node** responds to the button being pressed and held and also contains _is true_.

![Lower Switch node](https://res.cloudinary.com/lukasfabik/image/upload/v1571551046/projects/hardcore-upgrade-of-iot-party-game/image2.png)

- All three Change nodes contain a message. The upper node contains a message announcing the **hottest breath competition**:

![Hottest breath competition](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image13.png)

The middle Change node contains a message announcing **no competition is running at the moment**:

![No competition running](https://res.cloudinary.com/lukasfabik/image/upload/v1571551048/projects/hardcore-upgrade-of-iot-party-game/image14.png)

The lower Change node announces the **coldest breath competition**:

![Coldest breath competition](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image10.png)

- The closing **Text node** announces the type of competition.

## Set default values

Hold onto your hat, we're heading into the final stretch. The last flow sets the **default values**: 30 °C as an optimum temperature, pretty cool lowest temperature and pretty hot highest temperature. The actual measured temperatures are then compared with these temperatures.

![Timestamp value setting](https://res.cloudinary.com/lukasfabik/image/upload/v1571551048/projects/hardcore-upgrade-of-iot-party-game/image17.png)


### Do you need advice on how to do this?

- The **Inject node** contains a checked box with which the default values are set just a moment after pressing the Deploy button.

The ![Inject node](https://res.cloudinary.com/lukasfabik/image/upload/v1571551047/projects/hardcore-upgrade-of-iot-party-game/image11.png)

-  and the **Function node** contain javascript code that sets the default values.

```
flow.set("contestantTemp", 30);
flow.set("hottestTemp", 0);
flow.set("coldestTemp", 100);
return msg;
```

## Look at the result.

That's how sexy your desktop looks now. Enjoy it, just like when you saw the sea for the first time ... 🌊 Just one more second ... and another ... and then press your old good friend **Deploy** in the top right.

![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1571551049/projects/hardcore-upgrade-of-iot-party-game/image18.png)

## Let's compete!

As you may have noticed, the box reacts to a short press of the button: which starts the **hottest breath competition**, and press and hold: which starts the **coldest breath competition**.

### How to compete?
- Open the **Dashboard** tab in Playground.
- First write the name of the competitor
- and confirm it with **Enter**.
- Subsequently, **briefly press or press and hold** to select the type of competition. 👇
- When the first competitor has tried their luck, **briefly press or press and hold the button** to end the current competition and save the results.
- For the next competitors follow the same procedure, one at a time.
![Competitors](https://res.cloudinary.com/lukasfabik/image/upload/v1571551048/projects/hardcore-upgrade-of-iot-party-game/image16.png)

At this difficulty level, **all help is permitted**! Try what makes your breath hotter or colder. May the best Dragon or Night King win! Fingers crossed it´s you! 💪
