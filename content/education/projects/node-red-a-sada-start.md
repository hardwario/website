---
title: Node-RED a sada Start
draft: false
date: 2023-01-12T09:26:09.812Z
slug: node-red-start
weight: 0
description: Jak pracovat se sadou Start v Node-RED
meta_title: Node-RED a sada Start
meta_description: Node-RED a sada Start
---
## Úvod

N﻿ode-RED je jednoduchý, ale mocný nástroj a my si nyní ukážeme jak vytvořit jednoduchý dadshborad a zobrazovat v něm informace o počtu stisknutí tlačítka, teplotě a stavu naklonění. 

T﻿ento projekt přímo navazuje na [Úvodní projekt sady Start](url) takže budeme potřebovat shodný HW. 

## K﻿olikrát jsem stiskl tlačítko?

A﻿bychom mohli zobrazovat hodnotu stisknutí, musíme jí nejprve někde vzít.

P﻿okud nemáme, tak si spustíme **HARDWARIO Playgroun**. Z předešlého návodu víme že se nám zobrazuje v **Messages** a pokud zde klikneme na řádek s topicem `node/motion-detector:0/push-button/-/event-count` tak se nám tento zkopíruje do schránky, což nám ještě potvrdí vyskakovací info panel.

> P﻿okud bychom měli spárovaných více **Push button** modulů, tak se nám budou lišit v čísle za \`motion-detector:\`

N﻿yní se přesunem do **Functions**. Zde si v levém sloupi najdeme nebo vyhledáme **mqtt-in** modul a přetáhneme ho do prava na pracovníé plochu.