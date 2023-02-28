---
draft: false
date: 2023-02-13T11:03:19.643Z
weight: 0
---
**Climate** modul je vhodným základem pro malou domácí meteostanici, jelikož obsahuje:

* senzor teploty a relativní vlhkosti SHT30
* tlakový senzor MP3115A2
* světelný senzor OPT3001DNP

Na zobrazení hodnot z těchto senzorů si vytvoříme jednoduchý dashboard pomocí Node-RED. 

### Jaké je tu teplo a vlhkost?

Nyní si přidáme graf pro teplotu a ukazatel vlhkosti, které můžeme vyčítat díky SHT30.

1. Pokud ještě nemáte, tak si sadu poskládejte a spusťte **HARDWARIO Playground** . Postup skládání je shodný jako pro sadu Start, s tím rozdílem že máme úplně nahoře **Climate** module místo tlačítka. 
2. Nyní je potřeba modul spárovat s donglem, zapojeným do PC nebo někam jinam kde běží Playground nebo Hub. Pokud jste tento proces ještě neprováděli, [zde](https://www.hardwario.com/cs/education/tutorials/jak-sparovat-kit/) na něj máme návod. V zařízeních bychom měli vidět podobný výsledek. 
   !Vložit foto climate modulu ze sekce devices v Playgroundu.! 
3. V **Messages** bychom měli vidět co nám **Climate** module posílá za zprávy. Pro teplotu nás zajímá řádek s textem `node/climate-monitor:0/thermometer/0:0/temperature` který nám říká, jakou teplotu máme v prostředí kde je náš senzor. 
4. Klikneme na **Functions**, zde si vybereme ***mqtt-in*** node a přetáhneme jej na plochu vpravo. Dvojklikem si ho otevřeme a do **Topic** vložíme `node/climate-monitor:0/thermometer/0:0/temperature`abychom odebírali zprávy s teplotou. Doporučím také vyplnit nějaký název nodu v políčku **Name**, například **"Teplota"**, tak aby se nám dobře rozeznával. Přidáme si druhý ***mqtt-in*** a do tohoto si přidáme topic, který nám říká relativní vlhkost, tedy `node/climate-monitor:0/hygrometer/0:4/relative-humidity`. Opět doporučím vyplnit políčko s názvem. Nyní tedy máme nody které nám dokáží informace přijímat a potřebujeme je ještě někde zobrazit.
5. Ze seznamu nodu v sekci **dashboard** si vybereme node ***chart*** a ***gauge*** a přetáhneme si je na plochu. Zarovnáme si je vpravo od již umístěných ***mqtt-in*** nodu (jeden k teplotě a druhý k relativní vlhkosti). 
   Nastavíme si nyní node ***chart***. Rozklikneme si jej, abychom ho mohli upravovat a do pole **Label** vyplníme jeho název. Já jsem zvolil **"Teplota je: {{msg.payload}} ˚C"**.Tímto budeme vedle popisu zobrazovat teplotu i textově, jelikož bychom ji z grafu přesně nevyčetli.\
   Poté si můžeme zvolit jaký druh grafu chceme, za jakou poslední dobu chceme zobrazovat hodnoty nebo kolik bodů chceme zobrazovat (**"X-axis"**). Určitě bude dobré si zvolit maximální hodnotu v ose Y (**"Y-axis"**), tak abychom zobrazovali jen reálné teploty našeho prostředí. Pokud max hdodnotu nenastavíme, stuonice bude v rozsahu 0-100. 
   Nyní si nastavíme node ***gauge***. Do pole **Label** jsem si nastavil text **Relativní vlhkost**. Jelikož se hodnoty vlhkosti uvádějí v procentech, můžeme si tento znak přidat za **{{value}}** v poli ***Value format*** a ještě si potřebujeme upravit hodnotu v poli **max** na hodnotu **100** v sekci **Range**. Opět uložíme kliknutím na tlačítko **Done**. 
   Naše prostředí v **Dashboard** by nyní mělo vypadat zhruba nějak takto: 
   ! Vložit foto dashboardu v Playgroundu. ! 

### Jaký máme tlak v naší nadmořské výšce?

Tlakový senzor MP3115A2 dokáže měřit atmosférický tlak a dle toho dopočítávat nadmořskou výšku. 

1. Pro zobrazování informací o tlaku si v sekci **Messages** zkopírujeme řádek s topicem `node/climate-monitor:0/barometer/0:0/pressure`. Opět si přidáme node ***mqtt-in*** a tento topic do něj vložíme. Jelikož nám ale senzor vrací hodnoty v desítkách tisíc, přidáme si node s názvem ***function***. Opět si si ho rozklikneme pro editaci a do pole **On Message** vložíme následujcí kód a potvrdíme tlačítkem **Done**.

```js
var value = msg.payload;
var numVar = Number(value) / 1000;  
msg.payload = numVar.toFixed(1);
return msg;
```

 Tento kód nám zajišťuje přepočet na jednotky **kPa**, aby byli lépe čitelné a funguje následovně:

* hodnotu ze senzoru (***msg.payload***) si uložíme do proměnné **value**
* do proměnné **numVar** si uložíme číslo z proměnné **value**, které jsme vydělily **1000**
* do proměnné **msg.payload** opět vložíme hodnotu proměnné **numVar** zaokrouhlenou na jedno desetinné místo
* zprávu předáme do dashboardu pomocí **return msg;**  

1. Tlak budeme zobrazovat jen textově, takže si přidáme node ***text***. Rozklikneme si jej, abychom ho mohli upravovat a do pole **Label** vyplníme jeho název, například **"Aktuální tlak je:"**. Za ***{{msg.payload}}***, v sekci **Value format**, si můžeme přidat **kPa**, abychom měli správné jednotky. Nastavení uložíme kliknutím na tlačítko **Done**.
2. Pořadí nodu v Dashboardu by mělo být ***mqtt-in*** -> ***function*** -> ***text***. Případně je srovnáme do tohoto pořadí a propojíme mezi sebou, aby se informace předavali. 
3. Pro zobrazení nadmořské výšky si přidáme node ***mqtt-in***. Do tohoto si z **Messages** zkopírujeme topic `node/climate-monitor:0/barometer/0:0/altitude` a po otevření našeho nodu ho vložíme do příslušního pole. Opět uložíme nastavení pomocí tlačítka **Done**. Pro zobrazení si přidáme node ***text***, v něm si upravíme **Label** například na **"Nadmořská výška: "** a za **{{msg.payload}}** v sekci **Value format** si můžeme přidat **m.n.m** .      

### Jak intenzivní světlo máme kolem sebe?

Pomocí senzoru OPT3001DNP můžeme změřit intenzitu osvětlení. Senzor dokáže měřit až do 80 tisíc luxů, ale interiérové osvětlení v domácnosti se obvykle pohybuje kolem 100–500 lx. Při zatažené obloze se intenzita osvětlení pohybuje okolo 1000 lx. ([wiki](https://cs.wikipedia.org/wiki/Lux_(jednotka)))

1. My pro zobrazení intentźity osvětlení použijeme node ***text***, ale kromě její hodnoty bude pomocí nodu ***switch*** zobrazovat i odhad pod jakým jsme světlem. 
2. Jako vždy začneme přidáním nodu ***mqtt-in***, do kterého si přidáme topic `node/climate-monitor:0/lux-meter/0:0/illuminance`. 
3. Jako ukazatel použijeme opět node ***text***. Do pole **Label** si vložíme ***Intenzita osvětlení je*** a za **{{msg.payload}}** si můžeme dopsat **"luxů"**, abychom zpbrazovali i jednotky svítivosti.