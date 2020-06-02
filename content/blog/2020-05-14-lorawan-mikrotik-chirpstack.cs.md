---
title: Jak vytvořit vlastní síť LoRaWAN? Mikrotik a ChirpStack
meta_title: Jak vytvořit vlastní síť LoRaWAN s Mikrotik a ChirpStack
meta_description: LPWAN technologie se stávají stále dostupnější a cena již není překážkou. Jednou z možností je LoRaWAN, kterou si můžete vytvořit i svépomocí. Jak na to?
draft: false
date: 2020-05-28
description: LPWAN technologie se stávají stále dostupnější a cena již není překážkou. Jednou z možností je LoRaWAN, kterou si můžete vytvořit i svépomocí. Jak na to?
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1590659613/blog/2020-05-14-lorawan-mikrotik-chirpstack/lorawan.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1590659616/blog/2020-05-14-lorawan-mikrotik-chirpstack/lorawan_wide.png
author: martin_hubacek
---

Rozhodli jsme se sdílet naše zkušenosti s budováním vlastní LoRaWAN sítě. LPWAN technologie se stávají stále dostupnějšími a cena již není překážkou pro vytvoření vlastní soukromé sítě. Jednou z možností je LoRaWAN, jelikož naše instalace míří převážně do průmyslu, volíme kvalitní komponenty a osvědčené výrobce. Pro rychlé vytvoření a otestování vlastní LoRaWAN sítě doporučujeme následující řešení:

- [Gateway Mikrotik wAP LR8 kit](https://obchod.hardwario.cz/routerboard-mikrotik-lora/)
- [Průmyslový počítač OnLogic CL210G-10 s Dual LAN](https://obchod.hardwario.cz/onlogic-cl210g-10/)
- [LoRa Tester Basic Kit](https://obchod.hardwario.cz/onlogic-cl210g-10/) nebo kterýkoliv LoRa Kit z našich stránek nebo projektů

> Tip: [Záznam webináře](/cs/video/lorawan-prakticky) o LoRaWAN a&nbsp;tvorbě vlastní sítě

## Gateway - Mikrotik wAP LR8
Gateway Mikrotik umožňuje pro LoRa komunikaci využít malou PCB anténu uvnitř, nebo ji lze nakonfigurovat přes SMA konektor na libovolnou 868 MHz externí sektorovou nebo všesměrovou anténu. Velmi snadno lze dokrývat objekt nebo oblast více gatewayemi. Mikrotik lze do sítě zapojit buď klasicky přes Ethernet, nebo s pomocí WiFi.
Díky designu a příslušenství lze Mikrotik snadno přichytit na zeď nebo stožár a díky promyšlené konstrukci krabičky odolá snadno i počasí ve venkovních podmínkách.

![Mikrotik wAP LR8](https://res.cloudinary.com/lukasfabik/image/upload/v1590659095/blog/2020-05-14-lorawan-mikrotik-chirpstack/mikrotik.jpg)

Existuje i možnost zapojit gateway samotnou přímo do veřejné komunitní sítě a pomoci tak vylepšit globální pokrytí. Takovou sítí je například The Things Network. Speciálně pro tuto síť si můžete pořídit i levnější indoor stanici [The Things Indoor Gateway](https://www.thethingsnetwork.org/docs/gateways/thethingsindoor/). Ta je však pevně spojena s TTN a není možné s ní vytvořit čistě soukromou uzavřenou síť.

## Volba spolehlivého serveru pro LoRa stack

Gateway se připojuje k serveru, na kterém běží Network a Application server. Je potřeba zvolit zařízení které bude dlouhodobě stabilní. Průmyslový počítač OnLogic od HARDWARIO obdržíte již s předinstalovaným systémem Linux a nakonfigurovaným open-source LoRaWAN stackem ChirpStack, takže nebude třeba v konzoli již nic nastavovat. Konfiguraci sítě a nastavení zařízení lze snadno provést z prostředí webového prohlížeče.

![OnLogic](https://res.cloudinary.com/lukasfabik/image/upload/v1590659227/blog/2020-05-14-lorawan-mikrotik-chirpstack/onlogic.jpg)


## ChirpStack
ChripStack je poměrně pokročilý LoRaWAN stack a podporuje nejnovější LoRaWAN standardy. Obsahuje v sobě Network Server i Application server. Obsahuje přehlednou webovou konfiguraci se správou více organizací a administrátorů, kteří dále mohou přidávat jednotlivé uživatele. Je tak možné na jednom serveru mít více oddělených skupin, kde každá si bude spravovat svoje zařízení. Toho lze využít nejen v průmyslu ale i v městských sítí, kdy město zřídí oddělené přístupy jednotlivým organizacím.
Jednotlivé skupiny zařízení se přidávají do “application” ve které je možné nastavit i dekódovací skript, který z přijatých binárních dat vytvoří JSON objekt který již obsahuje textové hodnoty naměřených veličin, ty se pak snadno integrují dále do systémů, kam chcete data ukládat.

Integrací jak poslat data dále je několik. Je možné použít HTTP GET dotaz, REST API, nebo data ukládat například do InfluxDB databáze. Další možnost je využít MQTT. Na ChirpStacku běží MQTT broker a na něj je možné se připojit a požádat o příchozí zprávy z různých aplikací. Opačným způsobem je zase možné odesílat data do LoRa nodů. ChirpStack podporuje třídy Class A, B i C.

## Detaily LoRa komunikace
LoRaWAN komunikuje na frekvenci 868 MHz v evropě a 915 MHz v americe. Síti je vyhrazeno [několik kanálů](https://www.thethingsnetwork.org/docs/lorawan/frequency-plans.html) a modulačních rychlostí [datarate](https://www.thethingsnetwork.org/docs/lorawan/modulation-data-rate.html) (DR) s přenosem 250 - 11 000 bps. Při plánování sítě je třeba počítat s omezením v nelicencovaném pásmu, kdy jedno zařízení smí být v rádiovém pásmu pouze 1 % z hodiny. Tomuto nařízení se říká [duty cycle](https://www.thethingsnetwork.org/docs/lorawan/duty-cycle.html). Dost často tuto kontrolu v sobě mají přímo i modemy samotné. Díky těmto pravidlům je možné vytvořit poměrně rozsáhlou síť bez problémů se vzájemným rušením i přesto, že se jedná o nelicencované pásmo.

LoRaWAN obsahuje i možnost adaptivního data rate, kdy se postupně zvyšuje komunikační rychlost nebo snižuje vysílací výkon, dokud je zpráva ještě doručena z nodu na gateway. Node postupně s každou další zprávou zvyšuje data rate pro úsporu baterie. V okamžiku, kdy již nedostane potvrzení, zvolí algoritmus poslední data rate, při kterém node potvrzení dostal.

## Případová studie ze ŠKODA auto

Vlastní LoRaWAN jsme spustili mimo jiné v závodě společnosti ŠKODA Auto jako součást zavedení systému ANDON. [Napsali o tom případovou studii](/cs/case-studies/skoda-andon/).

## Kam pokračovat

* [Podrobný návod na vlastní LoRaWAN](https://developers.hardwario.com/projects/private-lora-network-with-mikrotik-and-chirpstack) v naší dokumentaci.
* [Seznam AT příkazů](https://developers.hardwario.com/tutorials/lora-at-commands-configuration) pro konfiguraci LoRa Testeru
* Hackster projekt [HARDWARIO Tester with LCD & GPS](https://www.hackster.io/160709/lora-tester-with-lcd-gps-open-configurable-low-power-4a5b61)
* Hackster projekt [HARDWARIO LoRa Climate kit](https://www.hackster.io/hubmartin/lora-climate-monitor-easy-open-low-power-and-with-graphs-7bacc2)
