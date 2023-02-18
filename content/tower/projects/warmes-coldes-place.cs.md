---
title: Hra pro celou třídu, Najděte nejchladnější a nejžhavější místo ve vaší škole
meta_title: IoT hra pro celou třídu, Změřte teplotu ve vaší škole
meta_description: Jeden z IoT projektů na rozšíření digitálních dovedností. Sestavte se Starter Kitem od HARDWARIOu zařízení, se kterým najdete nejchladnější a nejžhavější místo ve škole.
url: /cs/tower/projekty/nejteplejsi-nejchladnejsi-misto
draft: false
date: 2019-08-12
description: Jeden z IoT projektů na rozšíření digitálních dovedností. Sestavte se Starter Kitem od HARDWARIOu zařízení, se kterým najdete nejchladnější a nejžhavější místo ve škole.
tags:
  - Školní projekt
  - Hra
idea: false
image_preview: /upload/ilustrace-zmer-nejteplejsi-misto-ve-skole.png
image_main: /upload/ilustrace-zmer-nejteplejsi-misto-ve-skole.png
author: lukas_fabik
featured: true
modules: ["core","button","mini_battery","usb_dongle"]
handbook:
---

## Úvod

{{< perex >}}
Tenhle projekt odhalí všechna tajemství tvojí školy, ať už někdo loví duchy nebo chce najít žhavé místo pro svoje příští rande. Změř se svojí třídou teplotu v různých koutech školy a zkus být ten, kdo objeví ten největší extrém. 😱
{{< /perex >}}

S tímhle projektem se naučíš měřit teplotu s IoT a zobrazit ji na svém mobilu. Postačí ti základní HARDWARIO sada, tedy [**Starter Kit**](https://obchod.hardwario.cz/starter-kit/).

Hru **navrhni učiteli fyziky** jako super zpestření hodiny, nebo ji s kamarády podnikni jenom tak, po škole.

**Tahle hra je o vítězství**. Kdo najde nejchladnější nebo nejteplejší místo ve škole, je **king**! 👑 Pokud máš ve třídě krabiček několik, pracujte buď samostatně, nebo v malých skupinkách. A pokud máte jenom jednu, postupně se střídejte.

{{< modules >}}

## Připrav si krabičku

1. Starter Kit sestav a spáruj: jestli to děláš poprvé, [připravili jsme k tomu jednoduchou příručku]({{< ref "/tower/tutorials/handbook.cs.md" >}}). Na Core Module potřebuješ firmware **radio push button**. Pokud nevíš, jak si firmware stáhnout nebo co to je, [zjistíš to tady]({{< ref "/tower/tutorials/how-to-flash-firmware.cs.md" >}}).

2. Změny teploty uvidíš v Playgroundu v záložce **Messages**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566156994/projects/wormest-coldest-place/image10.png" alt = "MQTT messages in HARDWARIO Playground" >}}

## Nastav si Node-RED

1. Pro záznam nejnižší nebo nejvyšší teploty si nastav vlastní ukazatel. Začni v počítači s pomocí bublin v [Node-RED]({{< ref "/tower/tutorials/what-is-node-red.cs.md" >}}). Nejdřív v Playgroundu klikni na záložku **Functions**.

2. Na čistou plochu polož světle fialový node (bublinu) s názvem **MQTT**. Najdeš ho v sekci Input.

3. Node rozklikni dvojklikem. V řádku **Topic** určíš, co chceš, aby barevný ukazatel zobrazoval. Teď to bude teplota. Proto do řádku zkopíruj zprávu s teplotou ze záložky Messages (bez čísla). Nebo klidně použij tuhle:

```
node/push-button:0/thermometer/0:1/temperature
```

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566156994/projects/wormest-coldest-place/image9.png" alt = "MQTT input topic" >}}

Potvrď tlačítkem **Done**.

## Připrav si applikaci Blynk IoT

1. Pokud ještě nemáš, vytvoř si účet v aplikaci [Blynk IoT](https://blynk.io). Jak na to se podívej v [tomto návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Seznámíš se tam i s tím, jak se tvoří šablony a datastreamy. Obojí budeš potřebovat.

2. Druhým krokem je vytvoření šablony zařízení. Jak na to najdeš [ve stejném návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Klidně ale použij šablonu z předchozích projektů, pokud ji máš.

3. Teď si nastav nový Datastream. Na detailu šablony klikni na záložku **Datastreams**. Vpravo nahoře klikni na **Edit**. Objeví se ti tlačítko **+ New Datastream**, klikni na něj, vyber **Virtual Pin** a objeví se ti dialogové okno:

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642782841/projects/wormest-coldest-place/add-datastream-1.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

4. Nastav název pro nový Datastream a vyber jeden z volných Pinů. Teplotu budeš měřit jako desetinné číslo, proto zvol typ **Double** a jednotku (unit) nastav na **Celsius**. Nezapomeň nastavit rozpětí teplot, které budeš měřit, například **0 - 50**.

5. Datastream vytvoříš kliknutím na **Create**. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642782841/projects/wormest-coldest-place/add-datastream-2.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

6. Vpravo nahoře svou práci ulož tlačítkem **Save**.

## Založ zařízení

Pokud jej ještě nemáš, založ si zařízení z vytvořené šablony. Jak na to popisujeme [v návodu, který už znáš]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}).

## Rozjeď appku na mobilu

**Aplikaci Blynk IoT** si na mobil stáhni z [App store](https://apps.apple.com/us/app/blynk-iot/id1559317868), nebo [Google Play](https://play.google.com/store/apps/details?id=cloud.blynk). Přihlas se do ní s tvými údaji. 

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642786322/projects/wormest-coldest-place/blynk-1.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

Hned po přihlášení uvidíš své vytvořené zařízení:

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642786323/projects/wormest-coldest-place/blynk-2.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

Ťukni na něj prstem, teď si nastavíme dashboard, ve kterém budeme ukazovat naměřenou hodnotu:

1. Pod **klíčem** vpravo nahoře najdeš nastavovací stránku dashboardu.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642786323/projects/wormest-coldest-place/blynk-3.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

2. Tlačítkem **+** , nebo kliknutím někam na plochu přidáš nový graf nebo jiný prvek dashboardu. Teď použijeme **Gauge**.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642786200/projects/wormest-coldest-place/blynk-gauge.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

3. Stiskem přidaného widgetu otevřeš okno s jeho nastavením. Nejdůležitější je doplnit ***Datastream*** z tvé šablony pro vybraný virtuální Pin. Doplnit můžeš taky název a změnit barvu.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642786198/projects/wormest-coldest-place/blynk-temperature.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

4. Aplikaci máš hotovou. Teď do ní ještě začneme posílat data. 💪

## Propoj mobil s krabičkou

1. Vrať se k počítači. Na ploše Node-RED přidej za oba nody zelený **node Write**. Najdeš ho v levé části pod sekcí Blynk IoT.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642785777/projects/wormest-coldest-place/playground-0.png" alt = "Node-RED Blynk write" >}}

2. Node otevři dvojklikem. Vpravo uvidíš **malou tužku**. Klikni na ni a otevře se ti nové okno. Do pole **Url** vlož ``blynk.cloud``, do polí **Auth Token** a **Template ID** zkopíruj hodnoty z detailu zařízení ve webové aplikaci na počítači.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642785779/projects/wormest-coldest-place/playground-1.png" alt = "Node-RED Blynk set pin" >}}

Nastavení potvrď tlačítem **Add**. Z nodu ale ještě neodcházej. 👈

3. Do řádku **Virtual Pin** napiš číslo, které sis zvolil jako PIN v Blynku. Písmeno “V” nepoužívej.
Potvrď tlačítkem **Done**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642785778/projects/wormest-coldest-place/playground-2.png" alt = "Node-RED Blynk set pin" >}}

4. Teď **oba nody propoj** a klikni na červené tlačítko **Deploy** vpravo nahoře. 🚨

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642785778/projects/wormest-coldest-place/playground-3.png" alt = "Connect Blynk" >}}

## Trumfni svou třídu

1. Sám nebo ve skupině **vytipuj, které místo může být ve škole nejteplejší, nebo nejchladnější**. 🔥 ⛄

2. Každý jednotlivec nebo skupina má na průzkum **jenom 15 minut**. 🔦 Ať je to trochu vzrůšo.

3. Na místo vezmi krabičku a **teplotu sleduj na mobilu**. Může chvíli trvat, než se na ukazateli teplota projeví.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642785943/projects/wormest-coldest-place/blynk-temperature-gauge.jpg" alt = "measure temperature and show in Blynk" >}}
{{< /middle >}}

4. Vyzkoušej několik míst a na závěr vyhlašte ty nejextrémnější výsledky. **Congrats vítězům!** 🎇
