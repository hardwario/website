---
title: Node_RED a sada Start
slug: node-red-start
description: Používáme Node-RED se sadou Start
meta_title: Používáme Node-RED se sadou Star
meta_description: Používáme Node-RED se sadou Start
---
## Úvod

N﻿ode-RED je jednoduchý, ale mocný nástroj a my si nyní ukážeme jak vytvořit jednoduchý dadshborad a zobrazovat v něm informace o počtu stisknutí tlačítka, teplotě a stavu naklonění. 

T﻿ento projekt přímo navazuje na [Úvodní projekt sady Start](url) takže budeme potřebovat shodný HW. 

## K﻿olikrát jsem stiskl tlačítko?

A﻿bychom mohli zobrazovat hodnotu stisknutí, musíme jí nejprve někde vzít.

1. P﻿okud nemáme, tak si spustíme **HARDWARIO Playground**. Z předešlého návodu víme že se nám informace zobrazují v **Messages** a pokud zde klikneme na řádek s topicem `node/motion-detector:0/push-button/-/event-count` tak se nám tento zkopíruje do schránky, což nám ještě potvrdí vyskakovací info panel. 
   P﻿okud bychom měli spárovaných více **Push button** modulů, tak se nám budou lišit v čísle za `*motion-detector:*`
2. N﻿yní se přesuneme do **Functions**. Jde o vloženou aplikaci **Node-RED**, existuje k ní skvělá dokumentace, podpora i obrovská komunita uživatelů. Funguje na principu **vizuálního programování** - na plochu si přidáváme funkční bloky, kterým říkáme **nody**, a jejich spojením **vytvoříme funkční aplikaci** (flow).
3. Aby nás nic nepletlo, tak smažeme dva nody, které máme na ploše.
4. Začneme přidáním nodu **mqtt in**. Najdeme jej vlevo v sekci **network**. Přetáhnutím jej vložíme na plochu.

![Rozjeď to v Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1565632592/projects/button-for-mum/image3.png "Rozjeď to v Node-RED")

5. Dvakrát na něj klikneme, otevře se nám tím nastavovací okno nodu, ve kterém potřebujeme vyplnit pole **topic**. To určí, jaké zprávy chceme v této flow přijímat.

![Nastav topic](https://res.cloudinary.com/lukasfabik/image/upload/v1673529998/projects/shared_pictures/mqtt_inn_set_topic_button.png "Nastav topic")

6. Nyní musíme tuto zprávu předat pro zobrazení do **dashboardu**. To uděláme tak, že si vlevo ze sekce *dashboard* vybereme node **text** a přetáhmene ho vedle **mqtt in**. 
7. Po rozkliknutí tohoto nodu si můžeme změnit **Label** například na **Tlačítko stisknuto:**  a zvolit zarovnání v sekci **Layout**. Potvrdíme nastavení kliknutím na tlačítko **Done**. Posledním krokem je propejení těchto 2 nodu dohromady. Je to snadné, stačí stisknout šedý čtverec jednoho nodu a myší jej natáhnout k šedému čtverci druhého nodu. 
8. Po překliknutí do záložky **Dashboard** bychom měli vidět zvolený popisek a počet stisknutí. 

## Jaká je tu teplota?

1. Vraťíme se do záložky **Messages** a najdeme zprávu s teplotou. Klikneme na tento řádek pro zkopírovánín topicu (`node/push-button:0/thermometer/0:1/temperature`) do schránky.
2. Přejdeme zpět do sekce **Functions**, vložíme si nový **mqtt in** node, rozkliknutím ho otevřeme a vložíme pomocí **CTRL+V** obsah schránky do pole **Topic** a uložíme nastavení tlačítkem **Done**.
3. Nyní vložíme na plochu node **Gauge**, najdeme ho mezi nody v sekci **dashboard**.
4. Pro změnu jeho nastavení na něj dvakrát klikneme, a poté změníme hodnotu **max** v sekci **Range** na **50**. Také si můžeme změnit **Label**, například na **Teplota:**, abychom věděli na co koukáme.  Uložíme nastavení tlačítkem **Done**.
5. Nyní oba nody propojíme, stejně jako jsme to dělali v případě tlačítka. 
6. Tlačítkem **Deploy** vpravo nahoře nyní můžeme spustit aplikaci a přepnout se do záložky **Dashboard** v Playgroundu.
7. Dýchnutím na zařízení vyvoláme okamžité odeslání zprávy o teplotě a v dashboardu uvidíme aktuální teplotu spolu s počten stisknutí tlačítka.	

![Teplota a tlačítko](https://res.cloudinary.com/lukasfabik/image/upload/v1673618638/projects/node_red_start_set/node_red_start_temp_button.png "Teplota a tlačítko")