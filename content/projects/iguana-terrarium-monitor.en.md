---
title: 'IoT project: Terrarium guard for iguana and other reptiles'
draft: false
featured: false
handbook: starter-kit
date: 2019-11-06T14:07:29.153Z
description: >-
  Use IoT in your room. Build a device with the HARDWARIO Climate Monitor to show you whether the climate in your green buddy´s terrarium is just right.
meta_title: 'IoT project: Terrarium guard for iguana and other reptiles'
meta_description: >-
  Use IoT in your room. Build a device with the HARDWARIO Climate Monitor to show you whether the climate in your green buddy´s terrarium is just right.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573632812/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/1148307889691628.MOu57c2tmKxDlZFXOp8i_height640.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573632812/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/1148307889691628.MOu57c2tmKxDlZFXOp8i_height640.png
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

{{< perex >}}
Whether you have an iguana, turtle, snake or gecko, you definitely want them to be as comfortable as possible at home. 👌🦎 Monitor the climate in their terrarium and make sure your green buddy has ideal living conditions.
{{< /perex >}}

Under this project, you will learn **how to measure four climate values and display them in graphs** \- temperature, humidity, luminosity and air pressure. Who knows? Your green buddies may reward you with a few the stories about their dinosaur ancestors! 🦖 Or something like that.

If you already have the Starter Kit, you will only need the [Climate Module](https://shop.hardwario.com/climate-module/). Alternatively, the [Climate Monitor Kit](https://shop.hardwario.com/climate-monitor-kit/) contains **all the equipment** you need.

{{< modules >}}

## Prepare the box

1. Put the Climate Monitor Kit together and pair it. If you are doing this for the first time, [we've prepared a simple guide for you](/handbook/) - the procedure is the same as for the Starter Kit. You need the **radio climate monitor** firmware for the Core Module. If you don't know how to download the firmware or what it is, [you can find out here](/academy/how-to-flash-firmware/).

2. You can monitor changes in temperature, light, humidity and air pressure under the **Messages** tab in Playground.

![Messages](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image4.png)

## Set up Node-RED

1. Start programming in Node-RED. First, click on the **Functions** tab in Playground.

2. Drag a light purple **MQTT node** (bubble) onto the empty desktop. You can find it under the Input section.

3. Double-click the node. In the **Topic** line you specify what you want the color indicator to display. On this occasion it will be temperature. Copy the temperature message from the Messages tab (without a number) to the line. Alternatively, just use this:

```
node/climate-monitor:0/thermometer/0:0/temperature
```

![Node](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image6.png)
Confirm with the **Done** button.

4. Next to the node place a second one, this time light blue named **Gauge** (pointer). You will find it under the Dashboard section. This node determines how the measured temperature will be displayed on the screen.

5. Double-click on the Gauge node. In the **Range** line set the temperature range you would like to see on the pointer. 0 to 40 °C should be sufficient.
In the **Label** line, rename the graph as you please and in the **Value format** line fill in the temperature unit, i.e. °C. If you want, you can also choose the color of the pointer in the **Colour gradient** line .

![Label](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image8.png)
Confirm with the **Done** button.

6. The temperature measurement is ready, so let´s move on to setting the other values. Under the temperature measuring nodes, add two more identical nodes, namely **MQTT** and **Gauge**.

7. This time copy the Topic for measuring humidity to the **MQTT node**. It looks like this: node/climate-monitor:0/hygrometer/0:4/relative-humidity.
In the new **Gauge node** set the **Range** to 0 to 100 and enter % in the **Value format** line (humidity is measured as a percentage). Do not forget to name the pointer or select a color.

![Value format](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image7.png)

8. Now we go to the light pointer. 💡 The procedure is exactly the same - one **MQTT node** and one **Gauge node**.

9. Copy the following Topic into the **MQTT node**: node/climate-monitor:0/lux-meter/0:0/illuminance. In the **Gauge node**, set the time range to 0 to 10,000 and enter light unit lx (so-called lux) in the **Value format** line. As before, you can choose the name and color again.

![Value format setting](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image14.png)

10. Three of the four steps have already been covered. All that remains to do is to add the last value to measure: air pressure. Once again, add one **MQTT node** and one **Gauge node**.

11. Copy the **Topic** to measure the air pressure into the MQTT node:

```
node/climate-monitor:0/barometer/0:0/pressure
```
In the new **Gauge**, add the 0 to 10,000 range again. This time you do not have to set the unit, but feel free to add a name and choose a color.

![](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image9.png)

12. In order that you don't only see the current numbers, also add graphs to the three values to clearly show how humidity, luminosity and air pressure have evolved over the last hour. 📈

Under the Gauge nodes for humidity, luminosity and pressure, add one **Chart node** from under the Dashboard section.

13. Gradually click through all three nodes and name them in **Label** just like the adjacent Gauge nodes. For the**X-axis** always set what time interval you want to display the results for (every hour should already be set automatically there).

For the **Y-axis** fill in the same ranges that you entered for the adjacent Gauges, i.e. for humidity 0 to 100, for temperature and luminance 0 to 10,000.

![Y-axis](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image5.png)
Done! Before you start measuring, add one more clever feature - a virtual guard.

## Add the ideal temperature indicator

The virtual guard will alert you whenever the temperature in your lizard´s terrarium is not right. 🐍 You will need several nodes to build it.

1. Above everything you've created, add a **Numeric node** from under the Dashboard section - 123 is written on it.
Click on it and fill in the **Range** and ** Value format** lines just like for the first Gauge. If you can't remember, check out the screenshot below. Do not forget to name the node in the Label, e.g. Ideal temperature.

![Value format](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image13.png)

2. Add another node next to it, but this time a **Change node** from under the Function section.
Click on it and set it to **flow.optimal** and **msg.payload** (as shown in the screenshot).
**What this is for**: These two nodes (Numeric and Change) allow you to set the ideal temperature; the guard will alert you if it is exceeded. 👮 The Numeric node is used to determine the optimal temperature in the Dashboard and the Change node for setting it to the flow. optimal. Other nodes, which we will now add, work with it.

![Optimal temperature](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image12.png)

3. Now place a **Switch node**, which can also be found under the **Function** section. Drag and place it next to the MQTT node for temperature measurement and click on it.

In it, set three different situations that can occur when monitoring the ideal temperature. That is, the temperature is just right, too low or too high.

4. Double-click on the small **\+ add** button to create three possible situations in the node. Then adjust them exactly as shown in the screenshot below. Notice that on each line there is “**flow.optimal**”. The program always checks what the value of the variable is and knows the right situation accordingly.

![Flow optimal](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image10.png)

5. Now is the time to set up messages to alert you to all three possible situations. To do this, place three **Change nodes** below each other next to the Switch node.

6. One by one click on all three Change nodes and write messages in them, such as ‘Temperature too high / low / just right’.
If you want to set the **Switch node** exactly according to our screenshot, then write a message in the upper **Change node** for too high temperature, in the middle node for too low temperature and in the lower node for the optimal temperature.

![Change node](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image11.png)

7. Just one more node to go and you can run the program! 🏎️ Add a **Text node** from under the **Dashboard** section after the three Change nodes. This is for displaying the messages you set up in the previous step.

8. Click on the node and name it on the **Label** line, e.g. Temperature status.

![Temperature status label](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image1.png)

9. Done! Now connect the whole flow according to our screenshot. Alternatively, if you feel up to it, connect it yourself, and then just check it according to our screenshot.💪

![Connecting the flow](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image2.png)

10. Click the **Deploy** button in the top right to start the entire mega flow. In the Dashboard, you will see the measured values roughly like this:

![Deploy](https://res.cloudinary.com/lukasfabik/image/upload/v1573049733/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image3.png)

## Ready, steady… go!

1. Securely attach the box **to the terrarium of your reptile brother or sister** with adhesive tape. 🏡

2. In the Dashboard, find the **optimal temperature setting** and use the two arrows to select the one that your iguana, snake or turtle needs. Find the ideal value for your pet on the Internet.

![Optimal temperature setting](https://res.cloudinary.com/lukasfabik/image/upload/v1573049734/projects/Hlidej-prostredi-v-terarku-pro-sveho-leguana/image15.png)

3. Check if your buddy's terrarium is at the ideal temperature, and monitor **increases and decreases** in pressure, luminosity and humidity.
4. If the measured temperature is too different from the one in the terrarium, go to a pet store or your vet to make sure your reptile is **fit, healthy and happy**. 👌
