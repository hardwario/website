---
title: 'Piloty Průmyslu 4.0: Neinvazivní prediktivní údržba'
meta_title: Neinvazivní prediktivní údržba s IoT
meta_description: Není horší situace ve výrobním podniku, než když dojde k neočekávanému výpadku výrobní linky či jiného stroje. Ekonomický dopad takové poruchy bývá většinou obrovský, zejména ve chvíli, kdy nedokážete okamžitě reagovat.
draft: false
date: 2020-03-05
description: Není horší situace ve výrobním podniku, než když dojde k neočekávanému výpadku výrobní linky či jiného stroje. Ekonomický dopad takové poruchy bývá většinou obrovský, zejména ve chvíli, kdy nedokážete okamžitě reagovat.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1583414823/blog/2020-03-05-predictive-maintenance/preview.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1583414826/blog/2020-03-05-predictive-maintenance/main.jpg
author: lukas_fabik
---

Není horší situace ve výrobním podniku, než když dojde k neočekávanému výpadku výrobní linky či jiného stroje. Ekonomický dopad takové poruchy bývá většinou obrovský, zejména ve chvíli, kdy nedokážete okamžitě reagovat, protože:

* musíte zavolat servisního technika,
* ten musí diagnostikovat místo problému,
* nemáte k dispozici potřebné náhradní díly.

Výsledkem je zastavení výroby, odložení termínů a v neposlední řadě ušlý zisk a vysoké náklady na opravu. **Digitální transformace** a **možnosti IoT** však přináší možnosti, jak se těmto problémům vyhnout.

## Údržba v době čtvrté průmyslové revoluce

Prevencí výpadků je plánovaná údržba. Jedním z možných přístupů k jejímu plánování je tzv. preventivní údržba. Tu pravděpodobně dobře znáte z vašeho života. Výrobce vašeho auta předepsal v servisní knížce intervaly, kdy musíte zajet do servisu, aby vaše vozidlo zkontrolovali a vyměnili, případně doplnili provozní kapaliny. Ani to však vždy nezabrání tomu, aby v období mezi jednotlivými servisy nedošlo k nějaké poruše. Úplně stejně můžete naplánovat ve vaší firmě preventivní údržbu strojů.
![TPCA manufacture](https://res.cloudinary.com/lukasfabik/image/upload/v1583415882/blog/2020-03-05-predictive-maintenance/tpca.jpg)

Propracovanějším přístupem, který se začal častěji prosazovat s příchodem **Průmyslu 4.0** a **digitální transformace**, je **zavedení prediktivní údržby**. Její snahou je předvídat selhání na základě statistické analýzy dat ze senzorů, které monitorující stroje a jejich dílčí částí. Příkladem může být monitoring vibrací stroje nebo teploty motorů. Z dlouhodobého hlediska přináší prediktivní údržba oproti reaktivní a preventivní údržbě výraznou úsporu nákladů a zabraňuje neočekávanému výpadku výroby.

## Jak začít s prediktivní údržbou?
Nejčastějším argumentem proti zavedení prediktivní údržby, se kterým se setkáváme, jsou očekávané vysoké náklady - jak do strojů, tak do lidí, kteří se budou o vyhodnocování starat. Moderní doba však přináší možnosti, jak data sbírat neinvazivně a bezdrátově. **Díky IIoT a LPWAN technologiím** není nutné kupovat nové stroje nebo náročně inovovat ty stávající a nemusíte na místa, kde to doposud nebylo nutné, zavádět kabeláž pro připojení k internetu nebo intranetu a napájení.


Ze svých zkušeností se můžeme podělit o [případovou studii automobilky TPCA](https://www.hardwario.com/cs/case-studies/tpca/) v Kolíně, kde pomáhají zabránit výpadkům výroby IoT stavebnice HARDWARIO a **investice do projektu nepřesáhly 500 EUR**.

Tým, který měl projekt ve společnosti na starost, přišel s jednoduchým plánem - měřit teplotu motorů osazovací linky a na základě vývoje teploty a dynamiky jejího růstu naplánovat včasný servis motoru.

Samotná linka nedisponovala senzory pro měření teploty motorů a nahrazení linky nebo její inovace výrobcem byly obrovským nákladem. Využilo se proto neinvazivního přístupu k prediktivní údržbě formou **IoT stavebnice HARDWARIO**.

![obrázek: teplotní senzor, přesně takový monitoruje teplotu motorů osazovací linky](https://res.cloudinary.com/lukasfabik/image/upload/v1583414464/blog/2020-03-05-predictive-maintenance/thermometer.jpg)

Každý z motorů byl opatřen [teplotním senzorem](https://obchod.hardwario.cz/ds18b20-temperature-sensor/) připojeným ke stavebnici HARDWARIO uložené v průmyslové krabičce. K žádnému z motorů zároveň nebylo potřeba přivést internetové připojení, data jsou odesílána vlastní rádiovou sítí do průmyslového minipočítače, na kterém běží vizualizační platforma [Grafana](https://grafana.com/). V té jsou zároveň nastaveny automatická emailová upozornění, pokud teplota překročí nastavené meze.

Využitím vlastní rádiové sítě je důležitým prvkem bezpečnosti. Díky tomu běží projekt v oddělené síťové vrstvě a je tak odstíněn od podnikového internetu.

## S prediktivní údržbou můžete začít už zítra
Pro pilot prediktivní údržby můžete začít na několika málo strojích ve vaší firmě a nebudete potřebovat složitou infrastrukturu. Ve většině případů vám pro ověření užitečnosti bude stačit pár senzorů a google sheet nebo jiný způsob vizualizace, například výše uvedená Grafana.

![data jsou vizualizována a vyhodnocována v Grafaně](https://res.cloudinary.com/lukasfabik/image/upload/v1583414824/blog/2020-03-05-predictive-maintenance/grafana.jpg)

### Zahájení prediktivní údržby v 7 krocích:

1. Vyberte stroj a veličinu, kterou chcete monitorovat. Inspirujte se například u TPCA a začněte s teplotou motoru. Inspirovat se můžete také našim [portfoliem senzorů](https://obchod.hardwario.cz) nebo [případovými studiemi](/cs/case-studies/) a [vzorovými projekty](https://www.hackster.io/hardwario/projects?category_id=208) průmyslu 4.0.
2. Rozhodněte se, jakým způsobem chcete přenášet data - můžete, stejně jako TPCA, využít vlastní rádiovou síť nebo některou z LPWAN (sítě pro internet věcí - NB-IoT, LoRa, Sigfox). V případě LPWAN nebudete potřebovat žádný počítač pro sběr dat, protože budou odesílána přímo do cloudu.
3. Vyberte platformu, kde budete data ukládat, vizualizovat a vyhodnocovat.
4. Pořiďte stavebnice HARDWARIO podle toho, co a na kolika místech budete měřit.
5. Nainstalujte zařízení na váš stroj a začněte měřit.
6. Nastavte si upozornění pro limitní hodnoty.
7. Vyhodnoťte projekt a rozhodněte o jeho úspěšnosti.

<br/>

Po ověření pilotu můžete následně rozšířit měření na další stroje a jiné veličiny a postupně tak pokrýt všechny kritické části výroby. Využít můžete i pokročilých nástrojů pro vyhodnocování dat - například BitSwan, který dokáže data vyhodnocovat v reálném čase a hledat vzorce chování a odchylky od normálního chování.

## Pomůžeme vám s pilotem
Nechcete se do prvního projektu prediktivní údržby 4.0 pouštět sami? Napište nám, najdeme vám [partnera HARDWARIO](/cs/partners/), který vám pomůže s implementací i vyhodnocením.
