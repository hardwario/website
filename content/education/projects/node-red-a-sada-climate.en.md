---
title: Node-RED a sada Climate
draft: true
date: 2023-02-13T11:03:19.634Z
slug: nore-red-climate
weight: 0
description: Začínáme se sadou Climate v Node-RED
meta_title: Začínáme se sadou Climate v Node-RED
meta_description: Začínáme se sadou Climate v Node-RED
---
Climate module

**Climate** modul je vhodným základem pro malou domácí meteostanici, jelikož obsahuje:

- senzor teploty a relativní vlhkosti SHT30
- tlakový senzor MP3115A2
- světelný senzor OPT3001DNP


Na zobrazení hodnot z těchto senzorů si vytvoříme jednoduchý dashboard. 

## Jaké je tu teplo a vlhkost? 

1. Pokud ještě nemáte, tak si sadu poskládejte a spusťte **HARDWARIO Playground** . Postup skládání je shodný jako pro sadu Start, s tím rozdílem že máme úplně nahoře **Climate** module místo tlačítka. 
2. Nyní je potřeba modul spárovat s donglem, zapojeným do PC nebo někam jinam kde běží Playground. Pokud jste tento proces ještě neprováděli, [zde](https://www.hardwario.com/cs/education/tutorials/jak-sparovat-kit/) na něj máme návod. V zařízeních bychom měli vidět podobný výsledek. 
! Vložit foto climate modulu ze sekce devices v Playgroundu. ! 
3. V **Messages** bychom měli vidět co nám **Climate** module posílá za zprávy. Pro teplotu nás zajímá řádek s textem ‘node/climate-monitor:0/thermometer/0:0/temperature’ který nám říká, jakou teplotu máme v prostředí kde je náš senzor. 
4. Klikneme na **Functions**, zde si vybereme **mqtt-in** node a přetáhneme jej na plochu vpravo. Dvojklikem si ho otevřeme a do **Topic** vložíme ‘node/climate-monitor:0/thermometer/0:0/temperature’ abychom odebírali zprávy s teplotou. Doporučím si také vyplnit nějaký název nodu v políčku **Name**, například **_Teplota_**, tak aby se nám dobře rozeznával. Přidáme si druhý **mqtt-in** a do tohoto si přidáme topic, který nám říká relativní vlhkost, tedy ‘node/climate-monitor:0/hygrometer/0:4/relative-humidity’. Opět doporučím vyplnima políčko s názvem. Nyní tedy máme nody které nám dokáží informace přijímat a potřebujeme je ještě někde zobrazit.
5. Ze seznamu nodu v sekci **dashboard** si vybereme node **text** a **gauge** a přetáhneme si je na plochu. Zarovnáme si je vpravo od již umístěných **mqtt-in** nodu (jeden k teplotě a druhý k relativní vlhkosti). 
Nastavíme si nyní node **text**. Rozklikneme si jej, abychom ho mohli upravovat a do pole **Label** vyplníme jeho název. Já jsem zvolil **Teplota je: **. Za **_{{msg.payload}}_**, v sekci **Value format**, si můžeme přidat ** ˚C**, abychom měli správné jednotky. Nastavení uložíme kliknutím na tlačítko **Done**.
Nyní si nastavíme node **gauge**. Do pole **Label** jsem si nastavil **Relativní vlhkost**. Jelikož se hodnoty vlhkosti uvádějí v procentech, můžeme si tento znak přidat za **{{value}}** v poli **_Value format_* a ještě si potřebujeme upravit hodnotu v poli **max** na hodnotu **100** v sekci **Range**. Opět uložíme kliknutím na tlačítko **Done**. 
Naše prostředí v **Dashboard** by nyní mělo vypadat zhruba nějak takto: 
! Vložit foto dashboardu v Playgroundu. ! 

## Pod jakým jsme tlakem? 

1. Pro zobrazování informací o tlaku si v sekci **Messages** zkopírujeme řádek s topicem ‘node/climate-monitor:0/barometer/0:0/pressure‘. Opět si přidáme node **mqtt-in** a tento topic do něj vložíme.
