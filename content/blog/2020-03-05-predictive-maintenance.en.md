---
title: 'Industry 4.0 Pilots: Noninvasive predictive maintenance'
meta_title: Noninvasive predictive maintenance with IoT
meta_description: The biggest nightmare in production operation is having an unexpected production line outage or other machine outage. Such outage usually has enormous economic impact.
draft: false
date: 2020-03-05
description: The biggest nightmare in production operation is having an unexpected production line outage or other machine outage. Such outage usually has enormous economic impact.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1583414823/blog/2020-03-05-predictive-maintenance/preview.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1583414826/blog/2020-03-05-predictive-maintenance/main.jpg
author: lukas_fabik
---

The biggest nightmare in production operation is having an unexpected production line outage or other machine outage. Such outage usually has enormous economic impact, especially in situations when you can’t immediately react, because:

* you have to call a service technician,
* who has to diagnose the source of the problem,
* you don’t have the necessary spare parts.

The result is a production halt, delays but also lost profits and high repair costs. **Digital transformation** and **IoT capabilities** open new ways of preventing these problems.

## Maintenance in the Fourth Industrial Revolution

Outage can be prevented by planned maintenance. One way of planning is so-called preventive maintenance. You probably know this well from your own life. The manufacturer of your car has put service intervals in your service book, so your car gets checked and car fluids exchanged or filled up. But that doesn’t always prevent break down between the service intervals. You can plan preventive machine maintenance in your company in the same way.
![TPCA manufacture](https://res.cloudinary.com/lukasfabik/image/upload/v1583415882/blog/2020-03-05-predictive-maintenance/tpca.jpg)

With the dawn of **Industry** 4.0 and **digital transformation**, a sophisticated method has emerged: **predictive maintenance**. It is meant to anticipate outages based on statistical analysis from sensor data that monitor whole machines as well as their individual parts. An example of such data is vibration monitoring or engine temperature. In the long term, compared to reactive and preventive maintenance, predictive maintenance brings significant savings and prevents unexpected production outages.

## How to Start Using Predictive Maintenance?
The most frequent argument we hear against implementing predictive maintenance is the expectation of high costs associated with the machines and the people who will work on evaluating the data. Modern times have brought ways of collecting data noninvasively and wirelessly. **Thanks to IIoT and LPWAN technology**, it’s not necessary to buy new machines or strenuously innovate the existing ones. You also don’t have to lay down new internet, intranet or power cables on new places.

Our experience can be seen in the case study of the [TPCA car manufacturer](https://www.hardwario.com/case-studies/tpca/) in Cologne, where our HARDWARIO IoT kits have helped prevent production outages with **investments under 500 EUR**.

The team behind this project have come with a simple plan – measure fitting line engine temperature and plan engine maintenance based on temperature development and its dynamics.

The line had not been equipped with engine temperature sensors and replacing the line or innovating would had been an enormous cost. That’s why we used the **HARDWARIO IoT Kit** as an noninvasive solution to predictive maintenance.

![temperature sensor, just like the one monitoring fitting line engines](https://res.cloudinary.com/lukasfabik/image/upload/v1583414464/blog/2020-03-05-predictive-maintenance/thermometer.jpg)

Each engine has been equipped with a [temperature sensor](https://shop.hardwario.com/ds18b20-temperature-sensor/) connected to the HARDWARIO kit in an industrial casing. Also, there was no need to lay down internet cables to the motors, because the data are transmitted through a radio network to an industrial minicomputer, which is running the [Grafana](https://grafana.com/) visualization platform. The platform is set to automatically send out email alerts when temperature exceeds set limits.

Using your own radio network is an important security feature. It enables the project to operate in a separate network layer, shielded from the company internet.

## You Can Start Using Predictive Maintenance Tomorrow
You can try piloting predictive maintenance on just a couple of machines without the need for complex infrastructure. In most cases, all you need for verifying its usefulness are a few sensors and a Google Sheet or other visualization method, for example the aforementioned Grafana.

![data are visualized and evaluated in Grafana](https://res.cloudinary.com/lukasfabik/image/upload/v1583414824/blog/2020-03-05-predictive-maintenance/grafana.jpg)

### Launching predictive maintenance in 7 steps:

1. Choose a machine and a unit you want to monitor. You can draw inspiration from TPCA and start with engine temperature. Or maybe from our [sensor portfolio](https://shop.hardwario.com/modules-tags/), [case studies](/case-studies/) and Industry 4.0 [sample projects](https://www.hackster.io/hardwario/projects?category_id=208).
2. Choose the data transmission method – either use a radio network like TPCA or some LPWAN network (network for internet of things – NB-IoT, LoRa, Sigfox). In case of LPWAN, you won’t need a computer for data collection, because data are sent directly to the cloud.
3. Choose a platform for saving, visualizing and evaluating data.
4. Purchase HARDWARIO kits based on what will be measured and on how many places.
5. Install the device on your machine and start measuring.
6. Set limit alerts.
7. Evaluate a project and decide on its success.

<br/>

After verifying the pilot, you can choose to expand measuring to other machines or measure different units and eventually cover all critical production parts. You can also use advanced data evaluation tools such as BitSwan, which can evaluate data in real time and search for patterns in performance and deviations from normal operation.

## We Will Help You with the Pilots
You don’t want to start your first predictive maintenance 4.0 project on your own, do you? Drop us a line, we will find you a HARDWARIO partner, who will help you implement and evaluate the project.
