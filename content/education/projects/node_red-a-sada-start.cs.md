---
title: Node-RED a sada Start
date: 2023-01-18T12:55:41.120Z
slug: node-red-start
description: Používáme Node-RED se sadou Start
meta_title: Používáme Node-RED se sadou Star
meta_description: Používáme Node-RED se sadou Start
---
## Úvod

N﻿ode-RED je jednoduchý, ale mocný nástroj a my si nyní ukážeme jak vytvořit jednoduchý **Dashboard** a zobrazovat v něm informace o počtu stisknutí tlačítka, teplotě a stavu  otočení.

Tento projekt přímo navazuje na [Úvodní projekt sady Start](http://hardwario.com) takže budeme potřebovat shodnou sadu.

## Kolikrát jsem stiskl tlačítko?

Abychom mohli zobrazovat hodnotu stisknutí, musíme jí nejprve někde vzít.

1. P﻿okud nemáme, tak si spustíme **HARDWARIO Playground**. Z předešlého návodu víme že se nám informace zobrazují v **Messages** a pokud zde klikneme na řádek s topicem `node/push-button:0/push-button/-/event-count` tak se nám tento zkopíruje do schránky, což nám ještě potvrdí vyskakovací info panel. 
   P﻿okud bychom měli spárovaných více **Push button** modulů, tak se nám budou lišit v čísle za `*push-button:*`
2. N﻿yní se přesuneme do **Functions**. Jde o vloženou aplikaci **Node-RED**, existuje k ní skvělá dokumentace, podpora i obrovská komunita uživatelů. Funguje na principu **vizuálního programování** - na plochu si přidáváme funkční bloky, kterým říkáme **nody**, a jejich propojením **vytvoříme funkční aplikaci** (flow). 
3. Aby nás nic nepletlo, tak smažeme dva nody, které máme na ploše.
4. Začneme přidáním nodu **mqtt in**. Najdeme jej vlevo v sekci **network**. Přetáhnutím jej vložíme na plochu.

![Rozjeď to v Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1565632592/projects/button-for-mum/image3.png "Rozjeď to v Node-RED")

5. Dvakrát na něj klikneme, otevře se nastavovací okno nodu, ve kterém potřebujeme vyplnit pole **topic**. Tímto určujem, jaké zprávy chceme v této flow přijímat.

![Nastav topic](https://res.cloudinary.com/lukasfabik/image/upload/v1673529998/projects/shared_pictures/mqtt_inn_set_topic_button.png "Nastav topic")

6. Nyní musíme tuto zprávu předat pro zobrazení do **Dashboardu**. To uděláme tak, že si vlevo ze sekce **Dashboard** vybereme node **text** a přetáhmene ho vedle **mqtt in**. 
7. Po rozkliknutí tohoto nodu si můžeme změnit **Label** například na **Tlačítko stisknuto:**   a zvolit zarovnání v sekci **Layout**. Potvrdíme nastavení kliknutím na tlačítko **Done**. Posledním krokem je propojení těchto 2 nodu dohromady. Je to snadné, stačí stisknout šedý čtverec jednoho nodu a myší jej natáhnout k šedému čtverci druhého nodu. 
8. Po kliknutí na záložku **Dashboard** bychom měli vidět zvolený popisek a počet stisknutí. 

## Jaká je tu teplota?

1. Vrátíme se do záložky **Messages** a najdeme zprávu s teplotou. Klikneme na její řádek pro zkopírovánín topicu (`node/push-button:0/thermometer/0:1/temperature`) do schránky.Pokud žádný řádek s teplotou nevidíme, tak můžeme na sadu dýchnout a tím vyvoláme odeslání aktuální teploty a zobrazení řádku.  
2. Přejdeme zpět do sekce **Functions**, vložíme si nový **mqtt in** node, rozkliknutím ho otevřeme a vložíme pomocí **CTRL+V** obsah schránky do pole **Topic** a uložíme nastavení tlačítkem **Done**.
3. Nyní vložíme na plochu node **Gauge**, najdeme ho mezi nody v sekci **Dashboard**.
4. Pro změnu jeho nastavení na něj dvakrát klikneme, a poté změníme hodnotu **max** v sekci **Range** na **50**. Také si můžeme změnit **Label**, například na **Teplota:**, abychom věděli na co koukáme.  Uložíme nastavení tlačítkem **Done**.
5. Nyní oba nody propojíme, stejně jako jsme to dělali v případě tlačítka. 
6. Tlačítkem **Deploy** vpravo nahoře nyní můžeme spustit aplikaci a přepnout se do záložky **Dashboard** v Playgroundu.
7. Dýchnutím na zařízení vyvoláme okamžité odeslání zprávy o teplotě a v **Dashboardu** uvidíme aktuální teplotu spolu s počten stisknutí tlačítka.	

![Teplota a tlačítko](https://res.cloudinary.com/lukasfabik/image/upload/v1673618638/projects/node_red_start_set/node_red_start_temp_button.png "Teplota a tlačítko")

## Jak mám položenou sadu?

Abychom si nevypisovali jen číselnou hodnotu, tak si vyzkoušíme node jménem **switch**.

1. Opět se vrátíme do zákožky **Messages** a tentokrát zde najdeme řádek s výpisem orientace. Pokud žádný nevidíme, tak si otočíme sadu na jinou stranu krabičku.
2. Pak si opět vložíme nový node **mqtt in** a do něj vložíme topic, který jsem si právě zkopírovali a uložíme. 
3. Nyní budeme potřebovat node, kterým změníme číselnou hodnotu na text. Tohoto docílíme nodem který se jmenuje **change**. Tento najdeme v levém sloupci v části **function** a můžeme ho rovnou přetáhnout na plochu.
4. Nyní tento node rozklikneme a budeme přidávat další pravidla, abychom obsáhly všechny varianty natočení. 

* nejdříve musíme u každého pravidla změnit porovnání ze **Set** na **Change** (**1**).
* poté zadáme hodnotu kterou chceme porovnávat a jelikož je to v našem případě číslo, změníme toto v rozklikávacím menu které je v modrém rámečku (**2**). 
* další podmínku přidáme tlačítkem **+ add** (**3**).

  ![](https://res.cloudinary.com/lukasfabik/image/upload/v1673622776/projects/node_red_start_set/node_red_start_change.png)

5. Nastavte změnu číselných hodnot takto:  

   ```
   1 -> spodní straně.
   2 -> pravém boku.
   3 -> zadní straně.
   4 -> přední straně.
   5 -> levém boku.
   6 -> horní straně.
   ```

   Nastavení uložíme tlačítkem "Done".

6. Poslední node který potřebujeme přidat je **text**, opět ze sekce **Dashboard**. V tomto nodu si můžeme změnit pole **Label**, například na *"Krabička je na "*, abychom tam neměli jen text na které straně je krabička položena. Další co si můžeme zvolit je, to jak se k sobě bude **Label** a text zarovnávat. Toto nastavíme zvolením políčka v sekci **Layout**. Náš příklad je zarovnán na střed (prostřední políčko v horním řádku). Opět naše nastavení potvrdíme tlačítkem **Done**.

7. Naším posledním úkolem je propojení našich nodů a aplikace našeho nastavení kliknutím na tlačítko **Deploy**.

8. Nyní by Váš **Dashboard** měl vypadat zhruba takto:

   ![](https://res.cloudinary.com/lukasfabik/image/upload/v1673961391/projects/node_red_start_set/node_red_start_finished_dashboard.png)

## Vyhodnocení

Nyní už víme jak získáme data z naší sady a již je jen na Vás co s nimi podniknete. Věříme že byl tento návod užitečný a že Vám objasnil jak se sadou pracovat. Pokud by tomu tak nebylo a bylo by potřeba něco objasnit nebo doplnit, neváhejte nám napsat na ask@hardwario.com.

Zde je JSON pro flow, které se v tomto návodu používá:

```json
[{"id":"2c41a2bd.aa36ae","type":"tab","label":"Flow 1"},{"id":"6c6622f5.06be2c","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"","topic":"node/motion-detector:0/push-button/-/event-count","qos":"2","datatype":"auto-detect","broker":"29fba84a.b2af58","nl":false,"rap":false,"inputs":0,"x":380,"y":40,"wires":[["4d897fe63f7f2cf4"]]},{"id":"4d897fe63f7f2cf4","type":"ui_text","z":"2c41a2bd.aa36ae","group":"57ff470b.93fdf8","order":0,"width":0,"height":0,"name":"","label":"Pocet stisku: ","format":"{{msg.payload}}","layout":"row-center","className":"","x":710,"y":40,"wires":[]},{"id":"f0654cf25f0c0abe","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"","topic":"node/motion-detector:0/thermometer/0:1/temperature","qos":"2","datatype":"auto-detect","broker":"29fba84a.b2af58","nl":false,"rap":false,"inputs":0,"x":370,"y":120,"wires":[["2eab885c42a0f558"]]},{"id":"2eab885c42a0f558","type":"ui_gauge","z":"2c41a2bd.aa36ae","name":"","group":"57ff470b.93fdf8","order":1,"width":0,"height":0,"gtype":"gage","title":"Teplota:","label":"units","format":"{{value}}","min":0,"max":"50","colors":["#00b500","#e6e600","#ca3838"],"seg1":"","seg2":"","className":"","x":680,"y":120,"wires":[]},{"id":"7c9a14ece4028938","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"","topic":"node/motion-detector:0/orientation","qos":"2","datatype":"auto-detect","broker":"29fba84a.b2af58","nl":false,"rap":true,"rh":0,"inputs":0,"x":180,"y":220,"wires":[["ee23c1c1cab073be"]]},{"id":"7d656f8fda671961","type":"ui_text","z":"2c41a2bd.aa36ae","group":"57ff470b.93fdf8","order":3,"width":0,"height":0,"name":"","label":"Krabička je na ","format":"{{msg.payload}}","layout":"row-center","className":"","x":700,"y":220,"wires":[]},{"id":"ee23c1c1cab073be","type":"change","z":"2c41a2bd.aa36ae","name":"","rules":[{"t":"change","p":"payload","pt":"msg","from":"1","fromt":"num","to":"spodní straně.","tot":"str"},{"t":"change","p":"payload","pt":"msg","from":"2","fromt":"num","to":"pravém boku.","tot":"str"},{"t":"change","p":"payload","pt":"msg","from":"3","fromt":"num","to":"zadní straně.","tot":"str"},{"t":"change","p":"payload","pt":"msg","from":"4","fromt":"num","to":"přední straně.","tot":"str"},{"t":"change","p":"payload","pt":"msg","from":"5","fromt":"num","to":"levém boku.","tot":"str"},{"t":"change","p":"payload","pt":"msg","from":"6","fromt":"num","to":"horní straně.","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":460,"y":220,"wires":[["7d656f8fda671961"]]},{"id":"29fba84a.b2af58","type":"mqtt-broker","name":"","broker":"127.0.0.1","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","birthMsg":{},"closeTopic":"","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willPayload":"","willMsg":{},"sessionExpiry":""},{"id":"57ff470b.93fdf8","type":"ui_group","name":"Default","tab":"11207769.c31889","order":1,"disp":false,"width":"6","collapse":false,"className":""},{"id":"11207769.c31889","type":"ui_tab","name":"Home","icon":"dashboard"}]
```