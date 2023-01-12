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

P﻿okud bychom měli spárovaných více **Push button** modulů, tak se nám budou lišit v čísle za \`motion-detector:\`

2. N﻿yní se přesunem do **Functions**. Jde o vloženou aplikaci **Node-RED**, existuje k ní skvělá dokumentace, podpora i obrovská komunita uživatelů. Funguje na principu **vizuálního programování** - na plochu si přidáváte funkční bloky, kterým říkáme **nody**, a jejich spojením **vytvoříte funkční aplikaci** (flow).
3. Smažte dva nody, které máte na ploše.
4. Začneme přidáním nodu **mqtt in**. Najdete jej vlevo v sekci **network**. Přetáhněte jej na plochu.

![Rozjeď to v Node-RED](https://res.cloudinary.com/lukasfabik/image/upload/v1565632592/projects/button-for-mum/image3.png "Rozjeď to v Node-RED")

5. Dvakrát na něj klikněte, otevře se vám nastavovací okno nodu, ve kterém potřebujeme vyplnit pole **topic**. To určí, jaké zprávy chceme v této flow přijímat.

   ![Nastav topic](https://res.cloudinary.com/lukasfabik/image/upload/v1673529998/projects/shared_pictures/mqtt_inn_set_topic_button.png "Nastav topic")
6. Nyní musíme tuto zprávu předat pro zobrazení do **dashboardu**. To uděláme tak, že si vlevo ze sekce _dashboard_ vybereme node **text** a předtáhmene ho vedle **mqtt in**. 
7. Po rozkliknutí tohoto nodu si můžete zvolit **Label** například na **Tlačítko stisknuto: ** a zvolit zarovnání v sekci **Layout**. Potvrdíme nastavením kliknutím na tlačítko **Done**. Posledním krokem je propejení těchto 2 nodu dohromady. 
7. Po překliknutí do záložky **Dashboard** by měl být vidět Vámi zvolený popisek a počet stisknutí. 

------------------

6. Vraťte se v Playgroundu do záložky **Messages** a najděte zprávu s teplotou. Kromě hodnoty teploty vidíte vedle i identifikaci zprávy, vypadá takto: `node/push-button:0/thermometer/0:1/temperature` a jedná se o **topic**. 
7. Zkopírujte si tento topic, přejděte zpět do sekce **Functions**, vložte jej do pole **Topic** a uložte nastavení tlačítkem **Done**.
8. Nyní vložte na plochu node **Gauge**, ten najdete mezi nody v sekci **dashboard**.
9. Dvakrát na něj klikněte, ať se otevře jeho nastavení. Nyní změníme jen hodnotu **max** v sekci **Range** na **50**. Uložte nastavení tlačítkem **Done**.
10. Nyní oba nody propojte. Je to snadné, stačí stisknout šedý čtverec jednoho nodu a myší jej natáhnout k šedému čtverci druhého nodu.
11. Tlačítkem **Deploy** vpravo nahoře nyní můžete spustit aplikaci a přepnout se do záložky **Dashboard** v Playgroundu.
12. Dýchněte na zařízení, abyste vyvolali okamžitou zprávu o teplotě a IoT! V grafu uvidíte aktuální teplotu.