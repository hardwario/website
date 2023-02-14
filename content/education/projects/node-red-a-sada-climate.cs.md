---
draft: false
date: 2023-02-13T11:03:19.643Z
weight: 0
---
**Climate** modul je vhodným základem pro malou domácí meteostanici, jelikož obsahuje:

- senzor teploty a relativní vlhkosti SHT30
- tlakový senzor MP3115A2
- světelný senzor OPT3001DNP


Na zobrazení hodnot z těchto senzorů si vytvoříme jednoduchý dashboard pomocí Node-RED. 

## Jaké je tu teplo a vlhkost? 

Nyní si přidáme graf pro teplotu a textový ukazatel pro vlhkost.

1. Pokud ještě nemáte, tak si sadu poskládejte a spusťte **HARDWARIO Playground** . Postup skládání je shodný jako pro sadu Start, s tím rozdílem že máme úplně nahoře **Climate** module místo tlačítka. 
2. Nyní je potřeba modul spárovat s donglem, zapojeným do PC nebo někam jinam kde běží Playground nebo Hub. Pokud jste tento proces ještě neprováděli, [zde](https://www.hardwario.com/cs/education/tutorials/jak-sparovat-kit/) na něj máme návod. V zařízeních bychom měli vidět podobný výsledek. 
!Vložit foto climate modulu ze sekce devices v Playgroundu.! 
3. V **Messages** bychom měli vidět co nám **Climate** module posílá za zprávy. Pro teplotu nás zajímá řádek s textem `node/climate-monitor:0/thermometer/0:0/temperature` který nám říká, jakou teplotu máme v prostředí kde je náš senzor. 
4. Klikneme na **Functions**, zde si vybereme **_mqtt-in_** node a přetáhneme jej na plochu vpravo. Dvojklikem si ho otevřeme a do **Topic** vložíme `node/climate-monitor:0/thermometer/0:0/temperature`abychom odebírali zprávy s teplotou. Doporučím také vyplnit nějaký název nodu v políčku **Name**, například **"Teplota"**, tak aby se nám dobře rozeznával. Přidáme si druhý **_mqtt-in_** a do tohoto si přidáme topic, který nám říká relativní vlhkost, tedy `node/climate-monitor:0/hygrometer/0:4/relative-humidity`. Opět doporučím vyplnit políčko s názvem. Nyní tedy máme nody které nám dokáží informace přijímat a potřebujeme je ještě někde zobrazit.
5. Ze seznamu nodu v sekci **dashboard** si vybereme node **_chart_** a **_gauge_** a přetáhneme si je na plochu. Zarovnáme si je vpravo od již umístěných **_mqtt-in_** nodu (jeden k teplotě a druhý k relativní vlhkosti). 
Nastavíme si nyní node **_chart_**. Rozklikneme si jej, abychom ho mohli upravovat a do pole **Label** vyplníme jeho název. Já jsem zvolil **"Teplota je: "**. Poté si můžeme zvolit jaký druh grafu chceme, za jakou poslední dobu chceme zobrazovat hodnoty nebo kolik bodů chceme zobrazovat (**"X-axis"**). Určitě bude dobré si zvolit maximální hodnotu v ose Y (**"Y-axis"**), tak abychom zobrazovali jen reálné teploty našeho prostředí. Pokud max hdodnotu nenastavíme, stuonice bude v rozsahu 0-100. 
Nyní si nastavíme node **_gauge_**. Do pole **Label** jsem si nastavil text **Relativní vlhkost**. Jelikož se hodnoty vlhkosti uvádějí v procentech, můžeme si tento znak přidat za **{{value}}** v poli **_Value format_** a ještě si potřebujeme upravit hodnotu v poli **max** na hodnotu **100** v sekci **Range**. Opět uložíme kliknutím na tlačítko **Done**. 
Naše prostředí v **Dashboard** by nyní mělo vypadat zhruba nějak takto: 
! Vložit foto dashboardu v Playgroundu. ! 

## Pod jakým jsme tlakem? 

1. Pro zobrazování informací o tlaku si v sekci **Messages** zkopírujeme řádek s topicem `node/climate-monitor:0/barometer/0:0/pressure`. Opět si přidáme node **_mqtt-in_** a tento topic do něj vložíme. Tlak budeme zobrazovat jen textově, takže si přidáme node **_text_**. Rozklikneme si jej, abychom ho mohli upravovat a do pole **Label** vyplníme jeho název, například **"Aktuální tlak je:"**. Jelikož nám ale senzor vrací hodnoty v desítkách tisíc, přidáme si node s názvem **_function_**. Do pole **On Message** vložíme následujcí kód a potvrdíme tlačítkem **Done**.

    ```
    var value = msg.payload;
    var numVar = Number(value);
    msg.payload = numVar/1000;
    return msg;
    ```
Tento kód nám zajišťuje přepočet na jednotky kPa, aby byli lépe čitelné.