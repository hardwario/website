---
draft: false
meta_description: Začínáme se sadou Start
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1641305830/projects/button-for-mum/1-ilustrace-devce-pari-hru-ma-pauzu.png
modules:
  - core
  - button
  - mini_battery
  - usb_dongle
author: lukas_fabik
slug: sada-start
featured: true
date: 2019-08-19
url: /projekty/sada-start
kit:
  - starter-kit
  - button-kit
idea: false
title: Úvodní projekt sady Start
weight: 0
tags:
  - Projekt na doma
description: Začínáme se sadou Start
meta_title: Úvodní projekt sady Start
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1641305830/projects/button-for-mum/1-ilustrace-devce-pari-hru-ma-pauzu.png
---
## Úvod

{{< perex >}}
Sada Start je nejlepší způsob, jak začít pracovat se stavebnicí HARDWARIO TOWER. Umožní vám bezdrátově spouštět akce, posílat teplotu a polohu zařízení. 
{{< /perex >}}

Základní funkcí tohoto balíčku je tlačítko. Ale protože je náš Core Module osazen i 3osým akcelerometrem a teploměrem, tak vám tato sestava vystačí na spoustu dalších projektů.

Součástí sady jsou 4 moduly, 2 AAA baterie, krabička z 3D tisku a upevňovací gumičky. Zkontrolujte si, že máte vše potřebné:
{{< modules >}}

## Sestavte sadu

1. Nasaďte černý **Button Module** na červený **Core Module**. Pro dodržení správné orientace je jeden pin na modulech vždy vynechán a jedna díra na konektoru zaslepená. Buďte při nasazování opatrní, ať se piny nezlomí. Ohnuté piny však můžete snadno narovnat.
2. Do žlutého **Battery Modulu** vložte **baterie** a nasaďte ho na druhou stranu červeného Core Module.
3. Celou sestavu vložte do **krabičky vytištěné na 3D tiskárně** a zajistěte **gumičkami**.
4. Nakonec složte **USB Radio Dongle**. Destičku vložte do černé krabičky s logem HARDWARIO.

![Sada HARDWARIO TOWER - sestavení](/_assets/images/starter-kit/skladacka.gif)

## Spusťte vlastní radiovou síť

1. Otevřete na vašem počítači aplikaci HARDWARIO Plaground. Pokud ji ještě nemáte, otevřete si a postupujte podle [tohoto](/cs/education/tutorials/co-je-to-bigclown-playground/) návodu. 
2. V Playgroundu otevřete záložku **Devices**.
3. Vložte váš USB Radio Dongle do počítače. Objeví se vám v Playgroundu v roletce **Radio Dongle** nahoře.
4. Klikněte na **Connect**, tím se vám automaticky spustí radiová síť. 

## Připojte vaši Sadu Start

1. V seznamu devices v Playgroundu možná vidíte jedno zařízení Push Button. Smažte jej tlačítkem **Delete**, vyzkoušíme si jej připojit.
2. **Vyndejte** z vaší sady Start **baterie**.
3. Klikněte v Playground na tlačítko **Start pairing**.
4. Vložte baterie zpět do sady Start. Tím automaticky **Core Module** vyšle signál a propojí se s vaším **Radio Donglem**.
5. Pokud vše dopadlo dobře, uvidíte mezi zařízeními **Push Button**.

## Otestujte si komunikaci

Jak už je uvedeno výše, sestava umí kromě zprávy o stisknutí tlačítka posílat také informaci o teplotě a poloze orientaci. Jednoduše si vyzkoušejte, jaké zprávy zařízení posílá:

1. Otevřete v Playgroundu záložku Messages.
2. Na obrazovce uvidíte seznam zpráv, které vaše tlačítko odeslalo přes Radio Dongle do počítače.
3. Stiskněte několikrát tlačítko a na obrazovce uvidíte, jak se postupně plní počítadlo stisků.
4. Zkuste na zařízení dýchnout teplý vzduch z úst. Vzroste teplota a ta se vám objeví mezi zprávami.
5. Poslední zprávou je informace o orientaci zařízení. Ta funguje jako klasická kostka, zkuste zařízením otáčet a zjistěte, kdy se objeví pozice 1, 2, 3...6.

![Rozjeď to v Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1565632592/projects/button-for-mum/image3.png "Rozjeď to v Node-RED")

## První projekt

V mnoha tutoriálech je prvním projektem Hello World! Společně zvládmene něco lepšího. Zprávy o teplotě zobrazíme v grafu!

1. V Playgroundu si otevřete záložku **Functions**.
2. Jde o vloženou aplikaci **Node-RED**. Existuje k ní skvělá dokumentace, podpora i obrovská komunita uživatelů. Funguje na principu **vizuálního programování** - na plochu si přidáváte funkční bloky, kterým říkáme **nody**, a jejich spojením **vytvoříte funkční aplikaci** (flow).
3. Smažte dva nody, které máte na ploše.
4. Začneme přidáním nodu **mqtt in**. Najdete jej vlevo v sekci **network**. Přetáhněte jej na plochu a dvakrát na něj klikněte.
5. Otevře se vám nastavovací okno nodu, ve kterém potřebujeme vyplnit pole **topic**. To určí, jaké zprávy chceme v této flow přijímat.
6. Vraťte se v Playgroundu do záložky **Messages** a najděte zprávu s teplotou. Kromě hodnoty teploty vidíte vedle i identifikaci zprávy, vypadá takto: `node/push-button:0/thermometer/0:1/temperature` a jedná se o **topic**. 
7. Zkopírujte si tento topic, přejděte zpět do sekce **Functions**, vložte jej do pole **Topic** a uložte nastavení tlačítkem **Done**.
8. Nyní vložte na plochu node **Gauge**, ten najdete mezi nody v sekci **dashboard**.
9. Dvakrát na něj klikněte, ať se otevře jeho nastavení. Nyní změníme jen hodnotu **max** v sekci **Range** na **50**. Uložte nastavení tlačítkem **Done**.
10. Nyní oba nody propojte. Je to snadné, stačí stisknout šedý čtverec jednoho nodu a myší jej natáhnout k šedému čtverci druhého nodu.
11. Tlačítkem **Deploy** vpravo nahoře nyní můžete spustit aplikaci a přepnout se do záložky **Dashboard** v Playgroundu.
12. Dýchněte na zařízení, abyste vyvolali okamžitou zprávu o teplotě a IoT! V grafu uvidíte aktuální teplotu.

**Tip na další experiment:** Zkuste vymyslet, jak na dashboardu zobrazit i informaci o orientaci zařízení a počtu stisknutí tlačítka, možnosti dashboardu v Playgroundu jsou neomezené!

## Kam dále

Pro sadu Start jsme vytvořili celou řadu projektů, díky kterým se seznámíte s dalšími nody v Playgroundu. Najdete je v sekci [Projekty](/cs/education/projects). 

Podívat se můžete také do našich [tutoriálů](/cs/education/tutorials/). Najdete tam návod pro Node-RED a zjistíte, jak připojit mobilní aplikaci Blynk IoT.