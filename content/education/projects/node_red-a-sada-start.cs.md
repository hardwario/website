---
title: Node-RED a sada Start
date: 2023-01-18T12:55:41.120Z
slug: node-red-start
description: Používáme Node-RED se sadou Start
meta_title: Používáme Node-RED se sadou Star
meta_description: Používáme Node-RED se sadou Start
---
## Úvod

N﻿ode-RED je jednoduchý, ale mocný nástroj a my si nyní ukážeme jak vytvořit jednoduchý dashboard a zobrazovat v něm informace o počtu stisknutí tlačítka, teplotě a stavu  otočení.

Tento projekt přímo navazuje na [Úvodní projekt sady Start](http://hardwario.com) takže budeme potřebovat shodný sadu.

## Kolikrát jsem stiskl tlačítko?

Abychom mohli zobrazovat hodnotu stisknutí, musíme jí nejprve někde vzít.

1. P﻿okud nemáme, tak si spustíme **HARDWARIO Playground**. Z předešlého návodu víme že se nám informace zobrazují v **Messages** a pokud zde klikneme na řádek s topicem `node/motion-detector:0/push-button/-/event-count` tak se nám tento zkopíruje do schránky, což nám ještě potvrdí vyskakovací info panel. 
   P﻿okud bychom měli spárovaných více **Push button** modulů, tak se nám budou lišit v čísle za `*motion-detector:*`
2. N﻿yní se přesuneme do **Functions**. Jde o vloženou aplikaci **Node-RED**, existuje k ní skvělá dokumentace, podpora i obrovská komunita uživatelů. Funguje na principu **vizuálního programování** - na plochu si přidáváme funkční bloky, kterým říkáme **nody**, a jejich propojením **vytvoříme funkční aplikaci** (flow). 
3. Aby nás nic nepletlo, tak smažeme dva nody, které máme na ploše.
4. Začneme přidáním nodu **mqtt in**. Najdeme jej vlevo v sekci **network**. Přetáhnutím jej vložíme na plochu.

![Rozjeď to v Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1565632592/projects/button-for-mum/image3.png "Rozjeď to v Node-RED")

5. Dvakrát na něj klikneme, otevře se nám tím nastavovací okno nodu, ve kterém potřebujeme vyplnit pole **topic**. To určí, jaké zprávy chceme v této flow přijímat.

![Nastav topic](https://res.cloudinary.com/lukasfabik/image/upload/v1673529998/projects/shared_pictures/mqtt_inn_set_topic_button.png "Nastav topic")

6. Nyní musíme tuto zprávu předat pro zobrazení do **dashboardu**. To uděláme tak, že si vlevo ze sekce *dashboard* vybereme node **text** a přetáhmene ho vedle **mqtt in**. 
7. Po rozkliknutí tohoto nodu si můžeme změnit **Label** například na **Tlačítko stisknuto: **  a zvolit zarovnání v sekci **Layout**. Potvrdíme nastavení kliknutím na tlačítko **Done**. Posledním krokem je propojení těchto 2 nodu dohromady. Je to snadné, stačí stisknout šedý čtverec jednoho nodu a myší jej natáhnout k šedému čtverci druhého nodu. 
8. Po kliknutí na záložku **Dashboard** bychom měli vidět zvolený popisek a počet stisknutí. 

## Jaká je tu teplota?

1. Vrátíme se do záložky **Messages** a najdeme zprávu s teplotou. Klikneme na její řádek pro zkopírovánín topicu (`node/push-button:0/thermometer/0:1/temperature`) do schránky.
2. Přejdeme zpět do sekce **Functions**, vložíme si nový **mqtt in** node, rozkliknutím ho otevřeme a vložíme pomocí **CTRL+V** obsah schránky do pole **Topic** a uložíme nastavení tlačítkem **Done**.
3. Nyní vložíme na plochu node **Gauge**, najdeme ho mezi nody v sekci **dashboard**.
4. Pro změnu jeho nastavení na něj dvakrát klikneme, a poté změníme hodnotu **max** v sekci **Range** na **50**. Také si můžeme změnit **Label**, například na **Teplota:**, abychom věděli na co koukáme.  Uložíme nastavení tlačítkem **Done**.
5. Nyní oba nody propojíme, stejně jako jsme to dělali v případě tlačítka. 
6. Tlačítkem **Deploy** vpravo nahoře nyní můžeme spustit aplikaci a přepnout se do záložky **Dashboard** v Playgroundu.
7. Dýchnutím na zařízení vyvoláme okamžité odeslání zprávy o teplotě a v dashboardu uvidíme aktuální teplotu spolu s počten stisknutí tlačítka.	

![Teplota a tlačítko](https://res.cloudinary.com/lukasfabik/image/upload/v1673618638/projects/node_red_start_set/node_red_start_temp_button.png "Teplota a tlačítko")

## Jak máma položenou sadu?

Abychom si nevypisovali jen číselnou hodnotu, tak si vyzkoušíme node jménem **switch**.

1. Opět se vrátíme do zákožky **Messages** a tentokrát zde najdeme řádek s výpisem orientace. Pokud žádný nevidíme, tak si otočíme sadou na jinou stranu krabičku.
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

6﻿. Poslední node který potřebujeme přidat je **text**, opět ze sekce **dashboard**. V tomto si můžeme změnit pole **Label**,například na _"Krabička je na "_, abychom tam neměli jen text na které straně je krabička položena. Další co si můžeme zvolit je, to jak se k sobě bude **Label** a text zarovnávat. Toto nastavíme zvolením políčka v sekci **Layout**. Náš příklad je zarovnán na střed (prostřední políčko v horním řádku). Opět naše nastavení potvrdíme tlačítkem **Done**.

7. Naším posledním úkolem je propojení našich nodů a aplikace našeho nastavení kliknutím na tlačítko **Deploy**.

8. Nyní by Váš dashboard měl vypadat zhruba takto:

![](https://res.cloudinary.com/lukasfabik/image/upload/v1673961391/projects/node_red_start_set/node_red_start_finished_dashboard.png)

#﻿# Zhodnocení

Nyní už víme jak získáme data z naší sady a již je jen na Vás co s nimi podniknete. Věříme že byl tento návod užitečný a že Vám objasnil jak se sadou pracovat. Pokud by tomu tak nebylo a bylo by potřeba něco objasnit nebo doplnit, neváhejte nám napsat na ask@hardwario.com. 