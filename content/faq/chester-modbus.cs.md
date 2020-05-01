---
title: Jak se připojují Modbus periferie k CHESTERu?
weight: 50
---

Podmínkou je, že periferie poskytuje komunikační protokol Modbus RTU přes rozhraní RS-485. Další důležitou podmínkou také je, že se CHESTER musí chovat jako MASTER a periferie jako SLAVE. Pro integraci potřebujeme specifikaci periferie (datasheet), zejména tabulku Modbus registrů, které se budou vyčítat společně se specifikací vyčítacího intervalu. My podle těchto dat upravíme firmware CHESTERu pro vaši aplikaci. 
