---
date: "2022-01-03"
title: "How to connect Blynk IoT mobile app"
slug: how-to-connect-blynk-iot
meta_title: How to connect HARDWARIO to Blynk IoT app
meta_description: In order for your HARDWARIO IoT device to send information to your mobile, you need to pair it with Blynk. Check out our simple tutorial.
description: In order for your HARDWARIO IoT device to send information to your mobile, you need to pair it with Blynk. Check out our simple instructions.
image_preview: /upload/mobile-phone.jpg
image_main: /upload/mobile-phone.jpg
weight: 55
---

Simply connect your TOWER kit to your mobile phone. Once paired, you can send notifications or view graphs of the temperature in your home. You need the Blynk IoT app to do this and in this article we'll show you how.

## Start by registering on Blynk.cloud
The first step is to create an account on the Blynk app. You need a new account even if you have used a previous version of the app. 

Open [blynk.cloud](https://blynk.cloud) in your browser and click **Create new account**. Then fill in your email and a message will be sent to you with a link to create a password. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641212994/academy/how-to-connect-blynk-iot/new-account.png" alt = "Blynk IoT - new account" >}}

## Create a template - template
You can skip the introductory tutorial and save it for later.

Select **Templates** in the left menu and click **+ Create template** on the right. Fill in the name of the template in the form, the hardware and connection type you choose does not matter now. Click the **Done** button to finish creating the template.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/add-template.png" alt = "Blynk IoT - new account" >}}

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/add-template-2.png" alt = "Blynk IoT - new account" >}}


## Add data streams
For each value you want to write to Blynk, you need to create a data stream. In this manual we will use the same principle as in the previous version of Blynk - **virtual pins**.

On the open page of the created template, click on **Datastreams** in the menu. After clicking on the **+ New Datastream** button, select the **Virtual Pin** option. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213844/academy/how-to-connect-blynk-iot/datastream.png" alt = "Blynk IoT - new datastream">}}

Fill in the datastream name, color, assign it a number (each datastream will have a unique number), select the datatype, and if necessary, the unit and other parameters. Click **Create** to finish adding. 

If you want to add more datastreams, repeat the same procedure.

## Create a device from the template
Navigate to the home page of Blynk by clicking on the magnifying glass on the left. Click the **+ New Device** button to open the window to create a new device. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/new-device.png" alt = "Blynk IoT - new device" >}}

In the creation method selection, choose **From template**. In the next form, select your template and assign a name to the device. Click **Create** to complete the process.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/new-device-2.png" alt = "Blynk IoT - new device" >}}

Notice that you have a notification on the right with information about the new device. They contain information about **TEMPLATE ID** and **AUTH TOKEN**, both of which you will need to load in Playground in a moment.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/new-device-3.png" alt = "Blynk IoT - new device" >}}

## Move to Playground
For a functional connection, we recommend updating Playground to the latest version, it includes the pre-installed Blynk IoT plugin (`node-red-contrib-blynk-iot`). Alternatively, install this plugin. 

In the **Functions** tab, find the nodes that work with the new version of Blynk - they are marked with the **Blynk IoT** section. 

1. Select the **write** node to write values to the datastream you created. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/playground.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

2. Double click to get to its settings. 
3. Right click on the small pencil, click to open a new window. In the **Url** field, enter ``blynk.cloud``, in the **Auth Token** and **Template ID** fields, copy the values from the device details in the web application on your computer.

{{< b-image src="https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/playground-2.png" alt="Blynk IoT - HARDWARIO Playground">}}

4. Confirm the settings by clicking **Add**.  
5. Fill in the Virtual Pin number of your datastream and click **Done** to save everything.

Now you can set up your flow in Node-RED. For example, it may look as simple as this.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/playground-4.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

## Set up your mobile app

**You can download the Blynk IoT** app from the [App store](https://apps.apple.com/us/app/blynk-iot/id1559317868) or [Google Play](https://play.google.com/store/apps/details?id=cloud.blynk). Log in with your details. 

{{< middle >}}
{{< img src="https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-1.png" alt="Blynk IoT mobile dashboard">}}
{{< /middle >}}

Right on the home page you will see the device you created. 

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214289/academy/how-to-connect-blynk-iot/blynk-2.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

Open it by clicking and set up your dashboard:

1. Under the **key** on the top right you will find the dashboard setup page.

{{{< middle >}}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214289/academy/how-to-connect-blynk-iot/blynk-3.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

2. Use the **+** button , or click somewhere on the desktop to add a new widget. In the demo we use **Labeled Value**.

{{< middle >}}
{{< img src="https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-4.png" alt="Blynk IoT mobile dashboard" >}}
{{< /middle >}}

3. Press the added widget to display its settings window. The most important thing is to add the ***Datastream*** from your template for the selected Virtual Pin. 

{{< middle >}}
{{< img src="https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-5.jpg" alt="Blynk IoT mobile dashboard" >}}
{{< /middle >}}

4. You're done. Your widget in the Blynk IoT app will now start saving the data sent from Playground.
