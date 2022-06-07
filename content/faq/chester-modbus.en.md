---
title: How are Modbus peripherals connected to CHESTER?
weight: 50
---

The condition is that the peripheral provides the Modbus RTU communication protocol via RS-485 interface. Another important condition is that the CHESTER must behave as MASTER and the peripheral as SLAVE. For integration we need the peripheral specification (datasheet), in particular a table of Modbus registers to be read together with the read interval specification. We will modify the CHESTER firmware for your application according to this data.