---
title: Battery Chemistry for IoT Lifetime
meta_title: Battery Chemistry for IoT Lifetime
meta_description: If you ever face a challenge to design a battery-operated electronics device, one of the most crucial decisions is to select the correct battery type for the given project. Unfortunately, there is no silver bullet solution.
draft: false
date: 2022-06-24
description: If you ever face a challenge to design a battery-operated electronics device, one of the most crucial decisions is to select the correct battery type for the given project. Unfortunately, there is no silver bullet solution.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1655906515/blog/2022-06-22-battery-chemistry/preview.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1655906514/blog/2022-06-22-battery-chemistry/header.png
image_meta: https://res.cloudinary.com/lukasfabik/image/upload/v1655907545/blog/2022-06-22-battery-chemistry/meta.png
author: pavel_hubner
---

__**This arcticle has been originaly published by Pavel on [LinkedIn](https://www.linkedin.com/pulse/battery-chemistry-iot-lifetime-pavel-hübner/).**__

There are many factors to go through - the requirement for rechargeability, expected battery lifespan, demanded operating temperature span, size constraints, pulse current capability, etc.

Also, there are strict regulations about transportation for Lithium-based batteries (the document IATA Lithium Battery Guidance Document is an excellent place to start if you need to ship such batteries by air).

You have to decide how to get the chosen batteries to your customer. For example, will they be pre-installed in the devices, or are they supposed to be inserted by customers? If you don't ship the batteries with the devices, how is their availability at the particular destination?

Besides clarifying all these questions, you need to know the estimated power consumption of your to-be-born product. As you guessed, this can be a chicken-egg problem, and you have re-iterate your decision later in the design process. Your estimation might not have been necessarily wrong, but the application requirements have changed, and you are doomed to start over.

In HARDWARIO, we have made a lot of low-power designs, and we know there were not too many options for our [configurable IoT gateway CHESTER](/chester/). As the device often operates in outdoor conditions, only a few chemistry options can match the criteria for a wide operating temperature range. Welcome to lithium thionyl chloride (or LiSoCl2) - the primary lithium cell with a nominal voltage of 3.6 volts.

![HARDWARIO CHESTER](https://res.cloudinary.com/lukasfabik/image/upload/v1655906520/blog/2022-06-22-battery-chemistry/14.png)

This LiSoCl2 chemistry has several key characteristics - apart from its operating temperature range from -60 to +85 centigrades, it provides the highest energy density of all lithium batteries. Also, it is very well known for its ultra-low self-discharge rate (i.e., how much capacity will it lose on a shelf in time).

<div>
<img src="https://res.cloudinary.com/lukasfabik/image/upload/v1655905952/blog/2022-06-22-battery-chemistry/1649147988147.png" align="center" style="text-align:center; margin: 0 auto 20px auto; width:30%"/>
</div>

On the other hand, you have to cope with some challenging aspects of the LiSoCl2 batteries. One is the relatively high internal resistance. While several ohms might not be an issue for many devices, it certainly will for those featuring cellular IoT connectivity. In CHESTER, we use nRF9160 from Nordic Semiconductor (support both NB-IoT and LTE-M). Despite its leading power consumption parameters, you still have to provide at least 500 mA current capability.

If you start draining any current, the battery voltage will drop in the proportion of current and its internal resistance. As a hardware designer, you have to provide a minimum operating voltage to your circuits to ensure the device's proper functionality. Voltage drop during NB-IoT or LTE-M transmission might be big enough to cause a microcontroller to reset. Or it will get your cellular connectivity module unregistered from the carrier's network.

In CHESTER, we deal with it using supercapacitors. While the primary cell battery provides bulk energy reserve, the supercapacitors cover the demand for immediate high-current peaks. You cannot simply connect them in parallel as their typical cell voltage cannot go over 2.7 volts, though you can use special supercapacitor chargers. We selected Analog Devices' LTC4425. This chip can balance the voltage across the supercapacitors connected in series and limit the current from the battery. We source supercapacitors with a capacity of 5 farads from AVX, part number SCCS20B505PRBLE. This part features a typical leakage current of 15 microamps - a critical parameter to consider when choosing supercapacitors for your design.

Another LiSoCl2 chemistry challenge is its flat discharge curve. It will keep its voltage at approximately the same level for about 90 % of its lifetime (sure, it depends on how you discharge it, but we speak about low-power devices). While that sounds good as it provides surface area (read energy) under the voltage/current curve, it is ultimately difficult to give a reasonable estimation of the remaining power in the battery. I have even observed a temporary voltage increase before the sharp voltage fall at its end-of-life cycle. The battery voltage also varies with temperature. So measuring LiSoCl2 voltage on its own to deduct any conclusion is simply pointless.

![discharge curve of LiSoCl2 chemistry](https://res.cloudinary.com/lukasfabik/image/upload/v1655905952/blog/2022-06-22-battery-chemistry/1649148494733.png)

However, one way to go around this is to track its internal resistance. You can do it by measuring battery voltage "under the rest" and "under the load," and by a known load current, you can apply simple Ohm's law formula:

### R(batt) = | V(rest) - V(load) | / I(load)

You can observe resistance growth over time in your device and provide an alert to your product's users at least a few days before the battery dies when its internal resistance trips over a certain threshold. Or you can make your algorithm more sophisticated and track the speed of resistance change in time. Finally, suppose you want to go even more accurately. In that case, you can monitor battery voltage, current, and temperature in time and apply some sophisticated technical analysis / neural network models to get better state estimation. I have not implemented those, but some companies focus solely on such algorithms, e.g., BatteryCheck.

The second method is to monitor the total energy consumed by the device continuously. Such a method is called coulomb counting, and there are specialized integrated circuits (referred to as fuel gauge ICs) that can help you with such tracking. However, you must configure them properly and provide a battery model (parameters) to get any meaningful figures.

Last but not least, sometimes, a single battery cell will not do the job, and you have to use multiple batteries in your project. In HARDWARIO, customers often demand years of operation in the field and provide guarantees for the worst possible signal conditions. Therefore, installing multiple battery cells during deployments is usually more economical than sending technicians to replace them sooner than later.

How do you solve it? It might be tempting to connect multiple lithium in series to get a higher voltage and use step-down converters to reach all the energy potential. But, please, don't do that - NEVER. Before installation, you don't know the battery conditions, and the cells are always slightly imbalanced. Then, one of the cells will start being charged, and this is a forbidden zone for the LiSoCl2 chemistry for safety reasons!

What is the solution? Connect them parallel via a Schottky diode with a very low reverse current. Manufacturers like Saft do not permit more than a few microamps of reverse current to the battery, so the diode selection is critical. However, with this approach, you don't need to worry about the battery cell state at the time of installation for safety reasons.

![Schottky diod](https://res.cloudinary.com/lukasfabik/image/upload/v1655905951/blog/2022-06-22-battery-chemistry/1649148932356.png)

To make life easier for our customers and partners, we have designed a carrier board CHESTER-B1 with up to 6x D-cell sized or 8x C-cell sized battery holders. This array of battery holders can carry Saft LS 33600 (total capacity of 102 Ah) or Saft LS 26500 (total capacity of 47 Ah). Furthermore, the carrier board is inside a rugged IP-67 waterproof enclosure and ready to serve the IoT projects in the field in the years to come.

I hope this gave you some valuable tips and insights about your battery-powered IoT project. I will be happy to hear your thoughts and experience.

![CHESTER-B1](https://res.cloudinary.com/lukasfabik/image/upload/v1656059314/blog/2022-06-22-battery-chemistry/CHESTER-B1-1-transparent-2.png)