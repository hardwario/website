---
title: Chemie baterií pro dlouhověkost IoT
meta_title: Chemie baterií pro dlouhověkost IoT zařízení
meta_description: Pokud jste někdy stáli před úkolem navrhnout elektronické zařízení napájené z baterií, tak víte, že jedním z nejdůležitějších rozhodnutí je výběr správného typu baterie pro daný projekt. Bohužel neexistuje žádné univerzální řešení.
draft: false
date: 2022-06-24
description: Pokud jste někdy stáli před úkolem navrhnout elektronické zařízení napájené z baterií, tak víte, že jedním z nejdůležitějších rozhodnutí je výběr správného typu baterie pro daný projekt. Bohužel neexistuje žádné univerzální řešení.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1655906515/blog/2022-06-22-battery-chemistry/preview.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1655906514/blog/2022-06-22-battery-chemistry/header.png
image_meta: https://res.cloudinary.com/lukasfabik/image/upload/v1656059620/blog/2022-06-22-battery-chemistry/meta-cz.png
author: pavel_hubner
---

__**Originál článku byl publikován Pavle v angličtině na [LinkedIn](https://www.linkedin.com/pulse/battery-chemistry-iot-lifetime-pavel-hübner/).**__

Je třeba posoudit mnoho faktorů - požadavek znovudobíjení, očekávanou životnost baterie, požadované rozpětí provozní teploty, omezení velikosti, schopnost impulzního proudu atd.

Existují také přísné předpisy týkající se přepravy baterií na bázi lithia (dokument IATA Lithium Battery Guidance Document je vynikajícím místem, kde začít, pokud potřebujete takové baterie přepravovat letecky).

Musíte se rozhodnout, jak vybrané baterie dopravit k zákazníkovi. Budou například v zařízeních předinstalovány, nebo si je mají zákazníci vložit sami? Pokud baterie nedodáváte spolu se zařízeními, jak je to s jejich dostupností na konkrétním místě určení?

Kromě vyjasnění všech těchto otázek potřebujete znát odhadovanou spotřebu energie vašeho budoucího zařízení. Jak tušíte, může se jednat o problém slepice-vejce a své rozhodnutí musíte později v procesu revidovat. Váš odhad nemusel být nutně chybný, ale požadavky aplikace se změnily a vy jste odsouzeni začít znovu.

V HARDWARIO jsme už vytvořili mnoho návrhů zařízení s nízkou spotřebou energie a víme, že pro naši [konfigurovatelnou IoT gateway CHESTER](/chester/) nebylo příliš mnoho možností. Vzhledem k tomu, že zařízení často pracuje ve venkovních podmínkách, splňuje kritéria pro široký rozsah provozních teplot pouze několik typů chemie. Představujeme thionylchlorid lithný (neboli LiSoCl2) - primární lithiový článek se jmenovitým napětím 3,6 V.

![HARDWARIO CHESTER](https://res.cloudinary.com/lukasfabik/image/upload/v1655906520/blog/2022-06-22-battery-chemistry/14.png)

LiSoCl2 chemie má několik klíčových vlastností - kromě rozsahu provozních teplot od -60 do +85 stupňů Celsia poskytuje nejvyšší hustotu energie ze všech lithiových baterií. Také je velmi dobře známá pro svou ultra nízkou míru samovybíjení (tj. kolik kapacity ztratí na poličce v čase).

<div>
<img src="https://res.cloudinary.com/lukasfabik/image/upload/v1655905952/blog/2022-06-22-battery-chemistry/1649147988147.png" align="center" style="text-align:center; margin: 0 auto 20px auto; width:30%"/>
</div>

Na druhou stranu se musíte vypořádat s některými náročnými aspekty baterií LiSoCl2. Jedním z nich je relativně vysoký vnitřní odpor. Zatímco pro mnoho zařízení nemusí být několik ohmů problémem, pro zařízení s mobilním připojením k internetu věcí určitě ano. V zařízení CHESTER používáme nRF9160 od společnosti Nordic Semiconductor (podporuje NB-IoT i LTE-M). Navzdory jeho předním parametrům spotřeby energie je stále nutné zajistit proudovou kapacitu alespoň 500 mA.

Pokud začnete odebírat jakýkoli proud, napětí baterie klesne v poměru proudu a jejího vnitřního odporu. Jako návrhář hardwaru musíte svým obvodům poskytnout minimální provozní napětí, abyste zajistili správnou funkčnost zařízení. Pokles napětí během přenosu NB-IoT nebo LTE-M může být dostatečně velký na to, aby způsobil reset mikrokontroléru, nebo způsobit, že se váš modul mobilního připojení odhlásí ze sítě operátora.

Pro CHESTER to řešíme pomocí superkondenzátorů. Zatímco baterie primárního článku poskytuje objemovou energetickou rezervu, superkondenzátory pokrývají potřebu okamžitých vysokoproudých špiček. Nemůžete je jednoduše paralelně propojit, protože jejich typické napětí článků nemůže překročit 2,7 V, i když můžete použít speciální nabíječky superkondenzátorů. My jsme zvolili LTC4425 od společnosti Analog Devices. Tento čip dokáže vyrovnávat napětí na sériově zapojených superkondenzátorech a omezovat proud z baterie. Superkondenzátory s kapacitou 5 faradů jsme získali od společnosti AVX, číslo dílu SCCS20B505PRBLE. Tento díl se vyznačuje typickým svodovým proudem 15 mikroampérů - což je kritický parametr, který je třeba zohlednit při výběru superkondenzátorů pro vaši konstrukci.

Dalším problémem chemie LiSoCl2 je jeho plochá vybíjecí křivka. Udrží si přibližně stejné napětí po 90 % své životnosti (jistě, záleží na způsobu vybíjení, ale mluvíme o zařízeních s nízkou spotřebou energie). To sice zní dobře, protože to poskytuje plochu (čti energii) pod křivkou napětí/proud, ale v konečném důsledku je obtížné poskytnout rozumný odhad zbývající energie v baterii. Pozoroval jsem dokonce dočasné zvýšení napětí před prudkým poklesem napětí na konci jejího životního cyklu. Napětí baterie se také mění v závislosti na teplotě. Takže měřit napětí LiSoCl2 samostatně a vyvozovat z toho nějaké závěry je prostě zbytečné.

![discharge curve of LiSoCl2 chemistry](https://res.cloudinary.com/lukasfabik/image/upload/v1655905952/blog/2022-06-22-battery-chemistry/1649148494733.png)

Jedním ze způsobů, jak to obejít, je sledovat jeho vnitřní odpor. Můžete to udělat tak, že změříte napětí baterie "v klidu" a "pod zátěží" a při známém proudu zátěže můžete použít jednoduchý vzorec Ohmova zákona:

### R(batt) = | V(rest) - V(load) | / I(load)

Můžete sledovat růst odporu v průběhu času ve vašem zařízení a upozornit uživatele vašeho produktu alespoň několik dní před vybitím baterie, když její vnitřní odpor překročí určitou hranici. Nebo můžete svůj algoritmus udělat sofistikovanější a sledovat rychlost změny odporu v čase. A nakonec předpokládejme, že chcete být ještě přesnější. V takovém případě můžete sledovat napětí, proud a teplotu baterie v čase a použít některé sofistikované modely technické analýzy / neuronové sítě, abyste získali lepší odhad stavu. Tyto algoritmy jsem zatím neimplementoval, ale některé společnosti se zaměřují výhradně na takové algoritmy, jednou z nich je společnost BatteryCheck.

Druhou metodou je průběžné sledování celkové energie spotřebované zařízením. Takové metodě se říká coulomb counting a existují specializované integrované obvody (označované jako fuel gauge IC), které vám s takovým sledováním mohou pomoci. Musíte je však správně nakonfigurovat a zadat model baterie (parametry), abyste získali nějaké smysluplné výsledky.

V neposlední řadě se někdy stává, že jeden bateriový článek nestačí a v projektu musíte použít více baterií. V HARDWARIO zákazníci často požadují dlouholetý provoz v terénu a poskytují záruky pro nejhorší možné podmínky signálu. Proto je instalace více bateriových článků během nasazení obvykle ekonomičtější než posílání techniků na jejich výměnu dříve než později.

Jak to vyřešit? Mohlo by být lákavé zapojit více lithiových článků do série, abyste získali vyšší napětí, a použít snižovací měniče, abyste dosáhli veškerého energetického potenciálu. Ale prosím, nedělejte to - NIKDY. Před instalací neznáte stav baterie a články jsou vždy mírně nevyvážené. Pak se jeden z článků začne nabíjet, a to je pro chemii LiSoCl2 z bezpečnostních důvodů zakázaná zóna!

Jaké je řešení? Propojte je paralelně přes Schottkyho diodu s velmi nízkým zpětným proudem. Výrobci, jako je Saft, nedovolují, aby do baterie tekl větší zpětný proud než několik mikroampérů, takže výběr diody je rozhodující. Při tomto přístupu se však z bezpečnostních důvodů nemusíte starat o stav článků baterie v době instalace.

![Schottky diod](https://res.cloudinary.com/lukasfabik/image/upload/v1655905951/blog/2022-06-22-battery-chemistry/1649148932356.png)

Abychom našim zákazníkům a partnerům usnadnili život, navrhli jsme nosnou desku CHESTER-B1 s až 6 držáky baterií velikosti D nebo 8 držáky baterií velikosti C. Tato soustava držáků baterií může nést baterie Saft LS 33600 (celková kapacita 102 Ah) nebo Saft LS 26500 (celková kapacita 47 Ah). Nosná deska je navíc umístěna v odolném vodotěsném krytu IP-67 a je připravena sloužit projektům IoT v terénu i v následujících letech.

Doufám, že jsem vám poskytl několik cenných tipů a poznatků o vašem projektu IoT poháněném bateriemi. Budu rád, když mi sdělíte své názory a zkušenosti.

![CHESTER-B1](https://res.cloudinary.com/lukasfabik/image/upload/v1656059314/blog/2022-06-22-battery-chemistry/CHESTER-B1-1-transparent-2.png)