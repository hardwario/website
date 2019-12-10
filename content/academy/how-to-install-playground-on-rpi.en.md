---
title: How to install HARDWARIO Playground on Raspberry Pi
draft: false
date: 2019-11-09T12:57:09.976Z
weight: 90
description: To keep your projects running even when your notebook is switched off, you need the help of Raspberry Pi. This article will tell you how to install HARDWARIO Playground on it.
meta_title: How to install HARDWARIO Playground on Raspberry Pi
meta_description: To keep your projects running even when your notebook is switched off, you need the help of a Raspberry Pi. This article will tell you how to install HARDWARIO Playground on it.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1573641721/academy/jak-nainstalovat-playground-na-raspberry-pi/pouzivani-bigclown-playground.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1573641721/academy/jak-nainstalovat-playground-na-raspberry-pi/pouzivani-bigclown-playground.jpg
---

You've created cool projects, but are annoyed that when you switch off your notebook the box stops working? The smart Raspberry Pi mini-computer, which can run Playground 24/7, will help you. 🌃 We'll explain what a Raspberry Pi is and how to install Playground on it.

If you don't have a Raspberry Pi at home or at school yet, [acquire it through the HARDWARIO shop](https://shop.hardwario.com/raspberry-pi-4b-4gb-set/) and skip this tutorial and get programming right away. You will receive it pre-set, tuned and with Playground already installed on it.

## What is a Raspberry Pi?

Raspberry Pi is a small **single-board computer** that is roughly the size of a cell phone. Unlike conventional computers, it has neither a screen nor a large cabinet. On its sides you will find **ports for connecting other devices**. You can connect your notebook or mouse to a Raspberry Pi. 🐭

![Single-board computer](https://res.cloudinary.com/lukasfabik/image/upload/v1573304484/academy/jak-nainstalovat-playground-na-raspberry-pi/image1.jpg)

_This is how a Raspberry Pi looks like. Who would think that such a tiny object is actually a complete computer, right?_

In addition to households and businesses where Raspberry Pi´s control IoT networks, it is also used in IT lessons where teachers show students how **to use the computer to control the electronics around them** \- such as a washing machine, toaster or an entire smart home.

This powerful little machine does not enable you to surf the Internet or play games, but to control smart devices **all day and night**.

So, if you have programmed the [Fridge Thieve Guard](/projects/catch-the-mist/) in Playground, it will run non-stop on a Raspberry Pi without you having to have your personal computer switched on to catch thieves - after all, fridge raiders are the most active at night. 🎂

Now that you know what a Raspberry Pi is used for, **let's install** [HARDWARIO Playground](/academy/what-is-bigclown-playground/) onto it. 💪 Since it's not a classic computer, the procedure is slightly different to installing a video game on your computer.

If you already have your own Raspberry Pi, follow the instructions below. If you don't have one yet, you can purchase a Raspberry Pi through the [clown’s e-shop ](https://shop.hardwario.com/raspberry-pi-4b-4gb-set/)and skip this tutorial - we'll send it to you **completely pre-set and tuned**.

## To install Playground on a Raspberry Pi you will need:

* Raspberry Pi
* MicroSD card with a minimum capacity of 4 GB
* Network cable to connect to a Wi-Fi router (the one you have at home will do)
* Desktop or notebook computer running Windows, macOS or Ubuntu (simply put, your computer)
* Your adventurous HARDWARIO Kit

Are you fully armed? ⚔️ **Great, so let's install it**!

## How to install the operating system with HARDWARIO Playground

1. First of all, you need to download **two programs** onto your computer: [balenaEtcher](https://www.balena.io/etcher/) and [HARDWARIO Raspbian](https://github.com/bigclownlabs/bc-raspbian/releases). **HARDWARIO Raspbian** is an operating system that runs everything needed to start HARDWARIO, including Playground, while **balenaEtcher** enables you to upload Raspbian to your MicroSD card.
2. Insert the MicroSD card into your computer. If your computer does not have a slot for it, use an external SD card reader.
3. **Open and install** the downloaded file with balenaEtcher. The process only takes a minute at most.
4. When completed, run balenaEtcher and click **Select Image**. Find the folder where you downloaded HARDWARIO Raspbian to and open it.

![Installation](https://res.cloudinary.com/lukasfabik/image/upload/v1573304484/academy/jak-nainstalovat-playground-na-raspberry-pi/image3.png)

_The balenaEtcher program is easy to work with. It only has three buttons that you can click on._

1. Click **Select target** and select the MicroSD card you inserted into your computer.
2. Then click **Flash**! ⚡ To the accompaniment of flashes and thunder, HARDWARIO Raspbian uploads to your MicroSD card (the first two things only happen when the weather outside is right).
3. Now insert the MicroSD into the slot in your **Raspberry Pi**.

**Done**! Now all that remains for you to do is to connect your Raspberry Pi to the Internet to make everything work as it should.

## How to connect your Raspberry Pi to the Internet

If you have a free network cable at home, it will be a breeze. However, this depends on whether you connect to the Internet at home via **network cables** or a **Wi-Fi router**. If you connect via network cables, ask at home if there is a spare one. If so, attach your Raspberry Pi to it **and you´re done**!

If you do not have spare network cables, but only a Wi-Fi router, the process will be a bit more tricky. Don't worry though, we can do it. 💪 Check the instructions in the separate article.

Connect the **Radio Dongle** from your HARDWARIO Kit to the Raspberry Pi's USB port and create your own **HARDWARIO Hub**, fine-tuned to the smallest detail. 🤡

## And with that, it´s installed!

Whenever you want to work on your Raspberry Pi, just type **hub.local** into your web browser. This will open an interface that looks just like Playground, but doesn't have a Firmware tab (therefore always upload [firmware](/academy/how-to-flash-firmware/) to Core Module or Dongle on your computer).

![Firmware](https://res.cloudinary.com/lukasfabik/image/upload/v1573304484/academy/jak-nainstalovat-playground-na-raspberry-pi/image2.png)

On a Raspberry Pi you program **exactly as you would do on your computer.** 🤓 Open [Node-RED](/academy/what-is-node-red/) and go for it.

When you want to start a project on your Raspberry Pi, don't forget to **connect it to the USB Dongle** from your HARDWARIO Kit. Simply plug it into any USB port.

Congratulations! 🎉 You have just turned your home into a **smart home**.
