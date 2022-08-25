---
title: Zephyr RTOS for the win!
meta_title: Zephyr RTOS for the win!
meta_description: Today, I would like to share our story about technology from the world of embedded programming. So many people are still unaware of this, and I think it is revolutionary in many aspects - its name is Zephyr.
draft: false
date: 2021-12-22
description: Today, I would like to share our story about technology from the world of embedded programming. So many people are still unaware of this, and I think it is revolutionary in many aspects - its name is Zephyr.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/c_fill,h_900,w_900/v1645036472/blog/2021-12-22-zephyr-rtos.en/zephyr.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1581950249/blog/wide_placeholder.jpg
image_meta: https://res.cloudinary.com/lukasfabik/image/upload/c_fill,h_900,w_900/v1645036472/blog/2021-12-22-zephyr-rtos.en/zephyr.png
author: pavel_hubner
---

Zephyr is an RTOS for resource-constrained devices (32-bit MCUs) which embraces portability, code reusability, functional safety, and security. Its development started more than five years ago, and its design principles inherit some excellent ideas from the Linux kernel (and yes, many Linux developers are working on Zephyr).

The first great concept is called Device Tree - a declarative language to describe hardware configuration. This mechanism makes it possible to have an embedded project that can be used across multiple boards carrying compatible Device Tree definition. And the best part? It does not add any overhead - the Device Tree disappears during build time, and the driver references are simply pointers to particular device instances.

The second idea is called Kconfig. The way you can perceive it is a set of rules defining constraints between #define directives. If you have a complex ecosystem of drivers, stacks, kernel options, etc., you probably need a mechanism that helps you to avoid conflicting definitions and solves cross-dependencies. Kconfig is a solution. As a bonus, you get a friendly GUI tool called "menuconfig" with help texts explaining the effects of the individual options. Remember tweaking and building Linux kernel? :)

Zephyr has many more aspects, subsystems, and tools, turning the whole thing into a framework that guides you to implement future-proof embedded firmware projects. It is no wonder why big names such as Intel, Facebook, Google, NXP, Nordic Semiconductor, and others back this project and invest resources into this technology.

In HARDWARIO, we make CHESTER IoT Gateway which uses Nordic Semiconductor's chips (specifically nRF52840 + nRF9160). We are so happy that Nordic Semiconductor went all-in with software support for their MCUs to Zephyr RTOS. Indeed they have based their nRF Connect SDK as a layer on top of Zephyr. In our case, for CHESTER SDK, we inherit nRF Connect SDK as another later on top of it (thanks to the Zephyr's meta-tool "west", it is so easy to create these layers). In CHESTER SDK, we implement NB-IoT, LTE-M, and LoRaWAN stacks, hardware drivers, and many samples as a layer on top of it.

Our goal is straightforward - for HARDWARIO partners, we want to make it simple to create professional embedded IoT projects with low friction. Yes, there is a learning curve, but we can already see excellent results with our partners, so it works! And if they get stuck, we are always there for them to help.

I have always had a feeling the embedded space is lacking behind the pace we can see in the IT industry. Of course, many details are beyond the scope of this article, but I can tell this Zephyr technology is my best hope to close this gap as it changes traditional embedded programming paradigms.

Last but not least, I would like to express my gratitude to all people in the Zephyr community working on the project. Thanks to Nordic Semiconductor for their great nRF Connect SDK - you provide a solid foundation for us.

And finally, my HUGE thanks go to Caspar Friedrich, our friend from Cologne. Thank you, Caspar, for mentoring me and helping us to shape our CHESTER SDK.

Thanks for reading this article. And now, let's make this world a better place by properly doing great IoT projects!
