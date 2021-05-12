---
title: Úsporný přenos dat v LPWAN sítích s pomocí Protocol buffers
meta_title: Úsporný přenos dat v LPWAN sítích s pomocí Protocol buffers
meta_description: Nejprve si vysvětlíme na pár ukázkách jaké jsou možnosti a postupně se dostaneme od menších a přenosů od jednotek bajtů v síti Sigfox. Poté se podíváme na možnost přenosu v síti LoRoWAN, až se dostaneme ke stovkám bajtů v mobilní LPWAN síti NB-IoT - vše v kontextu tzv. Protocol buffers (nebo také uváděných jako Protobuffers).
draft: false
date: 2021-05-12
description: V tomto článku si popíšeme jak úsporně přenášet naměřená data prostřednictvím LPWAN sítí.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1590659613/blog/2020-05-14-lorawan-mikrotik-chirpstack/lorawan.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1581950249/blog/wide_placeholder.jpg
author: martin_hubacek
---

Pokud přenášíte data prostřednictvím LPWAN sítí, snažíte se o co nejúspornější a nejmenší paket, a to hned z několika důvodů:

- Pokud je vaše zařízení napájeno z baterií, potom kratší paket znamená úsporu energie při vysílání a delší výdrž zařízení, pokud baterie nejsou nabíjecí.

- Druhým důvodem může být omezení doby po kterou zařízení vysílá. To platí hlavně u nelicencovaných frekvencí 868 MHz, kde platí určité pravidla - např. "[duty cycle](https://www.thethingsnetwork.org/docs/lorawan/duty-cycle.html)".

- V některých případech, např. u NB-IoT sítě, jsou datová omezení tarifů. V případě, že se vám povede zkrátit velikost paketu na polovinu, tak můžete na stejném tarifu odeslat třeba 2x více zpráv.

V tomto článku si na pár ukázkách vysvětlíme, co jsou to Protocol buffers (nebo také uváděných jako Protobuffers) a jaké jsou jejich možnosti. Postupně se dostaneme od menších přenosů v jednotkách bajtů v síti Sigfox, přes možnosti přenosu v síti LoRaWAN, až po stovky bajtů v mobilní LPWAN síti NB-IoT.

# 12 bajtů pro všechno

Sigfox umožňuje odeslat až 12 bajtů v jednom vysílání. Pokud byste ale chtěli odeslat data ze senzorů například v datovém typu `float` (velikost 4 bajty), potom byste do paketu vložili maximálně 3 hodnoty. Abyste jich dostali do paketu více, je potřeba rozhodnout, jak je úsporněji zapsat. K tomu je nutné si uvědomit:

- Jakých rozsahů mohou hodnoty nabývat? Potřebujete opravdu ve `float` teplotu s rozsahem přibližně +/- 3.402823E+38? Umí tyto rozsahy změřit váš senzor?
- Jakou přesnost požadujete přenášet? Stačí vám rozlišení 0.5 °C nebo 0.1 °C?
- Posílá senzor jen kladné hodnoty, nebo i záporné?
- Senzor atmosférického tlaku může mít v datasheetu větší rozsah, ale pokud budete používat zařízení jen v rozsahu od hladiny moře po špičku Mount Everestu, můžete rozsah měřených hodnot omezit a ušetřit šířku přenášené informace.

Další vylepšení je nepoužívat datový typ s plovoucí desetinnou čárkou `float`, který má délku pevně 4 bajty, ale použít datový typ `int8_t` (1 bajt) nebo `int16_t` (2 bajty) a využít tyto typy pro hodnoty s pevnou desetinnou čárkou.

Někdy je vhodné se ponořit ještě hlouběji a kódovat hodnoty na úrovni bitů. Na obrázku níže je znázornění a zabalení hodnot z jednotlivých senzorů. Jsou zde použité techniky popsány níže, ale je tam navíc využití i druhých mocnin. Například osmibitová hodnota CO<sub>2</sub> má pro přepočet na `ppm` vzorec `(CO2 * CO2) / 6`. Tím získáme rozsah 0 ppm (`0*0 / 6`) až 10837 ppm (`255*255 / 6`) s jemnějším krokem 16 ppm v oblasti 400 ppm a u hodnot nad 10 000 ppm s hrubším krokem 85 ppm. Přitom se nám přenášená hodnota stále vejde do jednoho bajtu.

{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1619771470/blog/2021-04-30-protobuffers/sigfox-packet.png" alt = "" >}}


# Praktická ukázka s teplotním čidlem

Máte teplotní senzor co měří **-10 až 85 °C s rozlišením 0.25 °C**. Prosím, pamatujte si rozlišení senzoru 0.25 °C - ještě se k němu vrátíme. Je několik možností, jak naměřenou hodnotu zakódovat.

## 1 bajt - s přesností 1 °C

Pokud použijeme znaménkový datový typ `int8_t` s rozsahem -128 až +127, potom můžeme znaménkovou hodnotu z teploměru převést z `float` "napřímo". Přijdeme samozřejmě o desetinná místa - přeneseme pouze celé stupně celsia.

**Kódování**

```
float t = 21.75;
int8_t b = (int8_t) t;
```

Proměnná `b` obsahuje číslo `21`.

**Dekódování**

```
int8_t b = 21;
float t = (float) b;
```

Proměnná `t` obsahuje hodnotu `21.0`.

Spočítáme si, kolik hodnot může nabývat teplota v celém rozsahu bez desetinných míst: 10 + 85 + 1 = **96 hodnot**, a dále kolik hodnot má jeden bajt: 2⁸ = **256**. Tím zjistíme, že nejsme příliš efektivní a v bajtu nevyužíváme 255 - 96 = **159** hodnot!

## 1 bajt a přesnost 0.5 °C

Pojďme efektivněji naplnit jeden bajt teplotou, navíc zkusíme získat přesnost 0.5 °C z teploty.

Pokud teplotu před odesláním vynásobíme dvěma a při příjmu zase dvěma vydělíme, získáme tím přesnost **0.5 °C**. Potíž je, že `int8_t` s rozsahem **-128 až +127** sice pojme minimální teplotu vynásobenou dvěma, což je 2 * -10 = **-20**. Na druhou stranu již ale nepojme maximální teplotu vynásobenou dvěma 2 * 80 = **160** (což je více jak **127**).

Budeme muset kromě násobení zavést ještě offset. Při offsetu si hodnotu ještě před vynásobením "posuneme" přičtením nebo odečtením nějaké konstanty. Mohli bychom si před násobením dvěma odečíst od teploty třeba hodnotu 40, čímž bychom získali rozsah **-50 až + 45**. Každá z těchto dvou hodnot se po vynásobení dvěmi bezpečně vejde do rozsahu **-128 až +127**.

Pokud používám offset, většinou jej nastavím tak, aby hodnota začínala na nule. I díky tomu není potřeba používat znaménkový typ `int8_t`, ale neznaménkový (unsigned) `uint8_t` s rozsahem 0 až 255.

Pro `uint8_t` se mi navíc offset volí lépe. Když je maximální záporná hodnota ze senzoru -10 °C, tak si jako offset zvolím číslo **10**. Díky tomu začínáme hezky od nuly.

**Ukázka**

```
float t = 21.75f;
int8_t b = (t + 10.f) * 2.f;
printf("Encode value %0.2f °C to %d\n", t, b); // Encode value 21.75 °C to 63

float t2 = (b / 2.f) - 10.f;
printf("Decode %d to %.02f °C\n", b, t2); // Decode 63 to 21.50 °C
```

Ukázkový kód si můžete vyzkoušet v online kompilátoru [Ukázka protob_1](https://onlinegdb.com/ASayAGbJ7k).

Všimněte si, že jsme získali přesnost při přenosu 0.5 °C. Jelikož ale senzor teploty má přesnost **0.25 °C**, tak se nám vstupní hodnota `21.75` zaokrouhlila na polovinu stupně `21.50`.

## Více bajtů, kvadratické a exponenciální funkce

Podobně můžeme větší rozsahy hodnot mapovat do dvou (`uint16_t`) a více (`uint32_t`) bajtů. Lze také použít různé matematické funkce. U kvadratických a exponenciálních funkcí je například možné získat velký rozsah hodnot, ale vhodným "posunem" je možné určit oblast, kde budou hodnoty "jemnější" a získáte tak větší přesnost. Směrem k extrémům budou kroky sice "hrubší", ale stále dobře použitelné. To se hodí například pro CO<sub>2</sub>, kde pro hodnoty 400 až 1500 ppm chcete mít jemnější rozlišení, ale cokoliv nad 1500 ppm (třeba až do 10.000 ppm) už může být po větších skocích (běžně se ppm pohybuje rozmezí 400 až 2000 ppm).

Podobně je možné použít kvadratickou funkci u senzoru atmosférického tlaku, kdy si zjistíte, jaké jsou průměrné minimální a maximální hodnoty tlaku na zeměkouli a podle toho nastavíte správně funkci.

## Variabilní položky v paketu

Předchozí kapitolou jsme si vysvětlili, jak zakódovat jednotlivé hodnoty. Úplně tak nesouvisela s Protobuffers, protože ten způsob kódování neřeší, jen definuje jejich formát. Ale v této kapitole se již začneme přibližovat problémům, které Protobuffers řeší.

Pokud posíláte v paketu více hodnot, nebo reagujete ve svých zprávách na více různých událostí, zjistíte, že je nutné, aby měl každý paket jinou podobu.

Občas potřebujete poslat třeba jen informaci o změně stavu vstupu, nebo změnu polohy zařízení. Někdy vám nemusí vadit, že posíláte více dat společně. Jindy ale potřebujete poslat více dat - třeba 48 agregovaných hodnot teploty za posledních 24 hodin, což může být třeba 48 bajtů. Pokud byste ale současně posílali napětí baterie, stavy vstupů a GPS polohu, tak se vám do LoRa paketu, který má při modulaci SF12 maximální kapacitu 49 bajtů, všechny informace nevejdou.

Tohle lze celkem snadno vyřešit několika způsoby.

### a) Hlavičkou v paketu

Na začátku paketu si uděláte hlavičku, která bude mít například 2 bajty. Každý bit v hlavičce bude deklarovat jednu položku. Pokud bude bit v hlavičce nastaven, znamená to, že dekodér má očekávat ve streamu přijatých dat určitý počet bajtů pro vámi přenášenou hodnotu.

Výhody:

- Hlavička zabere velmi málo místa a bit pro každou položku je poměrně úsporný.

Nevýhody:

- Každá položka v paketu se může vyskytovat pouze jednou a musí mít přesně dané pořadí, aby dekodér věděl, kde ji má najít.

- Pokud budete paket rozšiřovat, 16 bitů vám nemusí stačit. Budete muset hlavičku rozšířit na 32 bitů. Tady se vám již ale rozbije kompatibilita s předchozím paketem s dvoubajtovou hlavičkou. Ano, lze to řešit verzemi paketu a například různými prefixy. A právě díky prefixům (lze si to představit i jako Huffmanovo kódování) se už trochu začínáme blížit k Protobufferům.

### b) Tagováním

Tag si můžete představit jako bajt, který svou hodnotou určí, jaké hodnoty za tímto tagem následují. Musí být ale předem domluvené, jakou má každý tag délku a co obsahuje. Dekodér si načte první bajt, zjistí, že se jedná třeba o tag `0x01` a tak ví, že má načíst 2 bajty a tyto převést na teplotu. Pokud paket obsahuje další data, načte další tag, a takto pokračuje až do konce přijatého paketu.

Výhody:

- Pokud se hodnota v paketu vůbec neobjeví, nezabírá ani bit navíc.

- Tagy se dokonce mohou v paketu opakovat a můžete tak poslat jedno "pole" vícekrát.

Nevýhody:

- Tag zabírá vždy nějaké místo společně s položkou v paketu, většinou 1 bajt. Pokud byste měli v paketu více jak 256 položek, potom je nutné použít tag s šířkou 2 bajty. Ale tady díky prefixům je lze taky dynamicky navyšovat podobně jako bity v hlavičce v předchozí sekci.

## Protocol buffers

Konečně se dostáváme k projektu od Google.

[Protocol buffers](https://developers.google.com/protocol-buffers)

Při psaní článku jsem narazil na různá pojmenování tohoto projektu. Někde je **Protocol buffers**, jinde **Protob** nebo **Protobuffers**. Občas se vyplatí "gůglit" s různými názvy předmětu, který hledáte.

S čím nám pomůže? Obsahuje totiž tzv. `.proto` soubor obsahující definici paketu, který chcete zakódovat, přenést a na druhé straně zase dekódovat. Zároveň Protocol buffers obsahuje kompilátor `protoc`, který váš `.proto` soubor přetransformuje do zdrojového kódu a struktur pro jazyk, který si zvolíte. V době psaní toho článku jsou oficiálně podporované jazyky C++, Objective-C, C#, Dart, Go, Ruby, Java, a Python. Pro případ toho článku ale využíváme komunitní podporu pro jazyk C - projekt `nanopb`.

Jazyky nepodporované přímo oficiálním `protoc` kompilátorem lze obvykle vyřešit komunitní implementací pro většinu populárních jazyků - např. Node, Rust a další.

Výhoda je zřejmá - existuje jeden soubor, který je společný pro embedded zařízení i pro server. Díky tomu odpadají problémy, kdy musíte ladit a troubleshootovat, když vám něco nefunguje. Většinou ani netušíte, kde je problém - zda v enkodéru nebo dekodéru.

Ještě je důležité zmínit verze Protocol buffers. Existuje verze `2` a verze `3`. Verzi zjistíte snadno z hlavičky, kde obvykle najdete řádku `syntax = "proto3";`. V HARDWARIO používáme verzi 3. Verze 2 obsahuje nějaká omezení, ale k tomu se ještě vrátíme.

Nyní se podívejme na ukázkový soubor. Začneme něčím jednoduchým a budeme postupně přidávat další konstrukce. Představme si, že máme senzor, který obsahuje luxmetr a posílá jas (illuminance), což je celočíselná hodnota od 0 do 83.000 lux (rozsah součástky OPT3001, kterou běžně používáme).

```
syntax = "proto3";

message pb_packet_t
{
    uint32 illuminance = 1;
}
```

Ukázkový proto soubor je tedy verze 3 a obsahuje jedinou zprávu `pb_packet_t`. Tato zpráva obsahuje jedinou položku `illuminance`. Položka má datový typ `uint32`. Vysvětlení dalších datových typů naleznete v sekci [Scalar Value Types](https://developers.google.com/protocol-buffers/docs/proto3#scalar).

Za položkou je přiřazené číslo, `1`, což značí, že tato položka má tag číslo 1. V předchozích kapitolách jsme si vysvětlili jak může dekodér poznat, kterou položku v paketu posíláte a Protocol buffers používají tagy. Zároveň tyto bajty v terminologii Protocol buffers označují také jako **tag**. Pokud by bylo ve zprávě více položek, musíte použít jiné, neobsazené číslo tagu.

Ještě vysvětlení proč se zpráva jmenuje `pb_packet_t`. Jelikož kompilátor enkodéru `nanopb`, který budeme používat, mapuje tyto názvy přímo na C struktury, tak pro vyloučení konfliktů s jinými proměnnými v projektu používáme prefix `pb_`. Suffix `_t` používáme u všech struktur v C, proto ho zavádíme i zde.

## Vytvoření a použití enkodéru

V této kapitole si prakticky předvedeme, jak si přetransformovat `.proto` soubor do funkcí pro jazyk C. V další kapitole je odkaz na online kompilátor, kde je vše připraveno pro experimenty, pokud si nechcete Protobuffery a `nanopb` instalovat lokálně.

Pokud používáte **VSCode**, tak doporučím rozšíření [vscode-proto3](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3)

### Ukázka v C++

Pojďme si vysvětlit, jak vytvořit a použít vlastní `.proto` soubor. Použijeme nástroj `protoc` a necháme si jím vygenerovat enkodér nejprve v jazyce `C++` a poté pro `C`, který je rozšířenější pro embedded zařízení.

Možností jak získat `protoc` je více, můžete si jej například stáhnout z [Release sekce na GitHubu](https://github.com/protocolbuffers/protobuf/releases).

Detailní postup jak tento nástroj použít naleznete v [Protocol buffers C++ tutoriálu](https://developers.google.com/protocol-buffers/docs/cpptutorial).

Vytvoříme si tedy ve složce soubor `message.proto` s následujícím obsahem:

```
syntax = "proto3";

message pb_packet_t
{
    uint32 illuminance = 1;
}
```

A po nainstalování nebo rozbalení `protoc` kompilátoru do stejné složky stačí zavolat:

```
protoc --cpp_out=. message.proto
```

Ve složce se vytvoří dva soubory:

- Soubor s kódem `message.pb.cc`
- Hlavičkový soubor `message.pb.h`

V souboru s kódem vidíte, že se includují další části protobufferů, jako např. `#include <google/protobuf/descriptor.h>`. Pokud tedy ukázku budete chtít zkompilovat, musíte do svého projektu, kromě vygenerovaných dvou souborů, přidat i soubory ze složky `src/google/protobuf/`. Soubory naleznete na GitHub a jsou také ke stažení v Releases pro jazyk `C++` pod názvem např. `protobuf-cpp-3.14.0.zip`.

Pokud otevřete hlavičkový soubor, tak v něm můžete nalézt funkci `set_illuminance`, kterou byste použili pro nastavení hodnoty. Poté můžete volat jednu ze serializačních funkcí, která vám vaši strukturu převede již na stream bajtů. My se ale z `C++` přesuneme k jazyku `C`. Pokud vás více zajímá `C++`, narazil jsem na [tento detailní návod](https://blog.conan.io/2019/03/06/Serializing-your-data-with-Protobuf.html).

### Jazyk C

V HARDWARIO používáme jazyk C. Jak již bylo zmíněno, protože samotný `protoc` neumí klasické `C`, používáme komunitně vyvíjený projekt [nanopb](https://jpa.kapsi.fi/nanopb/). Jeho výhoda není jen to, že umí vytvořit výsledné C soubory, ale je také velmi úsporný. Narozdíl od `C++` implementace nepoužívá dynamické alokace. Těm je vhodné se v zařízeních s menší pamětí RAM vyhýbat.

Pro experimenty na lokálním stroji můžete využít ukázkový příklad `nanopb` enkodéru v repozitáři [protob-nanopb-example](https://github.com/hardwario/protob-nanopb-example). Popis a použití je vysvětleno v `README.md` dokumentu. Je tam i jednoduchá ukázka dekodéru v `Node.js`, ale my budeme dále používat jiný projekt na dekódování.

`nanopb` je lze vnímat jako nadstavbou nad Protocol buffers. Voláte sice příkaz pro kompilaci `nanopb`, ale pod kapotou se stále využívá `protoc`. Výstupem jsou opět dva soubory - soubor s kódem a druhý hlavičkový soubor. Do svého projektu ale nepřidáváte kód z Google Protobufferů, ale z [nanopb](https://github.com/nanopb/nanopb).

```
pb.h
pb_common.c/h
pb_encode.c/h
pb_decode.c/h
```

Pokud používáte například jen enkódování, potom soubory `pb_decode` nemusíte zahrnovat do vašeho projektu.

Nástroj `nanopb` je nástroj napsaný v jazyce Python. Po stáhnutí balíčku z GitHubu stačí zavolat `nanopb_generator.py` s parametrem vašeho `.proto` souboru.

```
./nanopb/generator/nanopb_generator.py message.proto
```

Pro kompilaci stačí k vašemu `main.c` přidat níže uvedené soubory a includovat složku `nanopb/`.

```
gcc main.c nanopb/pb_common.c nanopb/pb_encode.c message.pb.c -I nanopb/
```

## Praktické pokusy s Protocol buffers

Tuto ukázku si můžete spustit v online kompilátoru [protob_2](https://onlinegdb.com/HJSjZf-3D). Můžete v ní testovat zadané hodnoty a sledovat výstup. Pokud budete chtít provádět změny, musíte si nahoře nejprve kliknout na `Fork this`. Není ale možné si ji rozšiřovat změnou `.proto` file. To v tomto online kompilátoru bohužel není možné. Takže sice vidíte `message.proto`, ale jeho změna nic neovlivní. V `.proto` souboru je nyní více položek, které využijeme v dalších kapitolách, ale pokud je nyní nebudeme vyplňovat a budeme nastavovat jen `illuminance`, tak nám to výstup neovlivní.

## Kompilace a spuštění ukázky

Připomeňme si znovu jak vypadá náš `.proto` soubor:

```
syntax = "proto3";

message pb_packet_t
{
    uint32 illuminance = 1;
}
```

V `main.c` máme nastavení hodnoty `msg.illuminance = 300;`.

Po kliknutí na zelené tlačítko `Run` dostanete výstup:

```
Length: 3
08AC02
```

Tím jsme si vytvořili naši první serializovanou zprávu. Pojďme si ji nyní dekódovat a následně můžeme pokračovat v experimentování.

## Dekódování

Dekodér si opět můžete vytvořit v jakémkoliv jazyce. Vlastně bychom mohli použít stejný projekt a do něj přidat podporu dekódování. V praxi ale dekódování probíhá až na serveru. Proto jsme vytvořili jednoduchý projekt v Node.js, který obsahuje užitečný CLI nástroj pro rychlé dekódování.

Projekt taky obsahuje Node.js HTTP endpoint, který lze využít na serveru a k testům třeba `curl`/`httpie`. HTTP endpointy jsou připravené pro JSON LoRa callbacky. Umí si poradit s LoRa zprávami z The Things Network nebo Českých radiokomunikací.

Pro rychlé dekódování nebo troubleshooting lze použít i online dekodéry. Zaujal mě [tento dekodér](https://protogen.marcgravell.com/decode), který umí dekódovat payload i bez nutnosti `.proto` souboru. Nezjistíte tedy názvy položek, ale umí zobrazit správně čísla a strukturu. Pozor - některé online dekodéry podporují pouze starší formát verze `2`, my používáme verzi `3`.

Zpátky k našemu dekodéru. Použijeme [lpwan-protob-endpoint-example](https://github.com/hardwario/lpwan-protob-endpoint-example). Soubor `README.md` opět obsahuje detailní návod co nástroj umí a jak jej používat. My budeme zatím využívat pouze jeho CLI část.

Naklonujte a nainstalujte si Node.js moduly:

```
git clone https://github.com/hardwario/lpwan-protob-endpoint-example.git
cd lpwan-protob-endpoint-example
npm install
```

Nyní si v základním adresáři vytvořte náš `.proto` soubor s názvem `message.proto` a zkopírujte do něj tento obsah:

```
syntax = "proto3";

message pb_packet_t
{
    uint32 illuminance = 1;
}
```

**Pozor na správné pojmenování hlavní zprávy v `.proto` souboru, dekodér očekává že se bude jmenovat přesně `pb_packet_t`!**

A nyní si zkusíme předchozí stream bajtů `08AC02` dekódovat příkazem. Jako parametr zadáme také náš `.proto` soubor.

```
npm run decode-hex message.proto 08AC02
```

Pokud vše funguje, získáte zpět zprávu v JSONu

```
{
  "illuminance": 300
}
```

Gratuluji k prvnímu úspěšnému dekódování zprávy!

# Vysvětlení zakódování hodnot

Vraťme se nyní zpátky k naší zakódované zprávě. Položka `illuminance` je datového typu `uint32` což je 4bajtová hodnota. Přesto se nám zpráva zakódovala pouze na velikost 3 bajty. Znamená to, že naše 32 bitové číslo se zakódovalo do 3 bajtů? Trochu ano, trochu ne.

Než vysvětlím, co vlastně zhruba HEX výstup obsahuje, zkusíme si ještě pár úprav.

## illuminance = 100

Zkuste nyní následující - nastavte v `main.c` ve funkci `main()` hodnotu `illuminance` na `100`.

`msg.illuminance = 100;`

A klikněte znova na `Run`, dostanete tento výstup:

```
Length: 2
0864
```

Paket se nám zkrátil! Místo 3 bajtů při `illuminance = 300` má zpráva pouze 2 bajty. Někteří už možná tuší co se tady děje a proč. Ale abych zamotal hlavu ještě více, udělejme ještě jednu úpravu...

## illuminance = 0

Nastavte hodnotu `illuminance` na `0`:

`msg.illuminance = 0;`

A klikněte znova na `Run`, dostanete výstup:

```
Length: 0
```

A všechna data se nyní ztratila. Takže pokud bude v noci tma, tak vám stačí když pošlete paket o délce 0 bajtů :)

## Dynamická velikost čísel

Postupným snižováním hodnoty se staly vlastně dvě různé věci které si nyní vysvětlíme. Nejprve k dynamické délce čísla...

Protocol buffers mají flexibilní datový typ `uint32`. Znamená to tedy, že pokud nevyužijete všechny horní bity (vaše číslo je dostatečně malé), tak se nepoužijí 4 bajty jako byste klasicky čekali u 32bitového čísla, ale jenom jejich část.

Pokud jako `illuminance` nastavíte hodnotu `127`, což je binárně reprezentováno jako `0111 1111` tak se číslo enkóduje do jednoho bytu a výstupem ukázkového kódu bude:

```
Length: 2
087F
```

A tady vidíme že první bajt je `0x08`, což je náš **tag** pro `illuminance`. Tohle číslo `08` bylo ve výstupu vždy, když položka `illuminance` měla nenulovou hodnotu.

Druhý bajt `0x7F` přímo odpovídá číslu `127` a binární reprezentaci `0111 1111`.

Vyzkoušejme nyní nastavit hodnotu ``illuminance`` na hodnotu `128`, dostanete výstup:

```
Length: 3
088001
```

A hned nám paket o 1 bajt narostl. Tag `08` zůstal, ale číslo narostlo o bajt. Z toho je zřejmé, že nejvyšší bit z bajtu každého čísla je vyhrazen pro informaci, že hodnota se nevešla do jednoho bajtu a je tedy potřeba další bajt. Podobně je řešené i kódování UTF-8, kde nejvyšší bit značí, že znak je ve skutečnosti složený z více bajtů.

| Hodnota dekadicky       | Hodnota hexadecimálně      | Zakódovaná délka  |
| ----------------------- | -------------------------- | ----------------- |
| 0                       |                            | 0 bajtů           |
| 1 až 127                | 01 až 7F                   | 1 bajt            |
| 128 až 16383            | 8001 až FF7F               | 2 bajty           |
| 16384 až 2097151        | 808001 až FFFF7F           | 3 bajty           |
| 2097152 až 268435455    | 80808001 až FFFFFF7F       | 4 bajty           |
| 268435456 až 4294967295 | 8080808001 až 08FFFFFFFF0F | 5 bajtů           |

Tento způsob kódování hodnot má své výhody. Můžete ušetřit data v paketu pokud například hodnota ze senzoru není příliš vysoká. Musíte ale počítat s tím, že pokud senzor bude vracet vyšší hodnotu, tak vám naroste i buffer k odeslání. Musíte tedy počítat s nejméně příznivou situací, kdy všechny vaše senzory budou posílat vysoké hodnoty. Mohlo by totiž nastat to, že by se vám zakódovaný paket nevešel do maximální délky paketu.

Nevýhodou je, že pokud často posíláte vysoká čísla `2^28` nebo vyšší, tak se vždy zakódují do 5 bajtů. Ale i to lze vyladit použitím datového typu `fixed32` nebo například `fixed64`.

## Výchozí hodnoty

V ukázce se projevila ještě jedna vlastnost Protocol bufferu. Pokud jsme nastavili `msg.illuminance = 0;` tak výsledný paket měl nulovou délku. Nejen, že číslo nezabíralo žádný prostor, ale na výstup se nedostal ani tag `08`, který byl vždy prvním bajtem.

Pokud totiž posíláte `default value`, tak se hodnota vůbec do paketu nevloží. Můžete si všimnout, že v kódu vytváříme instanci a zároveň do ní dáváme výchozí hodnoty.

```
// Create instance and fill it with default values
pb_packet_t msg = pb_packet_t_init_default;
```

Více se dozvíte v dokumentaci v sekci [default values](https://developers.google.com/protocol-buffers/docs/proto3#default).

Toto chování je výchozí až ve verzi Protocol buffers 3, ale je možné různým post-processingem při dekódování zjistit, které hodnoty v JSONu chybí a vynutit si jejich výchozí hodnoty, pokud je to nutné. Verze Protocol buffers 2 měla všechny položky jako výchozí povinné a pro nastavení volitelné položky jste museli použít slovo `optional`. Na jednu stranu je nyní pro každou položku v Protocol buffers 3 na 1 bajt na tag, na druhou stranu zase tento způsob zjednodušuje kompatibilitu kdy vám zařízení se starším firmwarem může používat `.proto` soubor s novými položkami a bude to stále fungovat (pouze v případě, že nebudete měnit indexy položek a budete je pouze rozšiřovat).

Tyto výchozí hodnoty jsou pevně dané a například pokud používáte datový typ `boolean` a posíláte hodnotu `false`, tak se v dekódovaném JSONu data vůbec nezobrazí. Dekódovat je možné samozřejmě do jakékoliv jazyka a struktury. V našem případě ale budeme data dekódovat Node.js skriptem na serveru a výstupem bude tedy JSON, se kterým se snadno pracuje a ukládá se do databází jako je například MongoDB.

## C struktury

Pokud si otevřete soubor `message.pb.h`, najdete v ní strukturu s úplně stejným názvem, jako je v našem `.proto` souboru. Je to struktura `pb_packet_t`.

Generátor `protoc` ji vytvořil následovně:

```
typedef struct _pb_packet_t {
    uint32_t illuminance;
} pb_packet_t;
```

Vždy, když si nebudete jistí, které položky se jak jmenují, tak je zde dohledáte. Ukládají se zde například i výčty (`enum`) a vnořené zprávy.

## Vnořené typy

Pojďme si ukázat některé další možnosti. Začneme vnořenými typy. Ty si lze představit jako vnořenou strukturu v programovacím jazyce.

V této a dalších kapitolách budeme používat rozšířený `.proto` soubor o další položky a postupně jej budeme používat v dalších kapitolách. Pokud používáte [online C kompilátor protob_2](https://onlinegdb.com/HJSjZf-3D), tak tyto typy ve vašem `.proto` souboru již jsou, takže je v `main.c` můžete používat a zpráva se vám sama rozšíří.

```
syntax = "proto3";

message pb_voltage_t
{
    uint32 battery = 1;
    uint32 external = 2;
}

message pb_packet_t
{
    uint32 illuminance = 1;
    pb_voltage_t voltage = 4;
}
```

Vidíte, že je zde navíc zpráva `pb_voltage_t`, která obsahuje hodnoty `battery` a `external`. Nástroj `nanopb` nám vytvořil novou strukturu a můžeme ji jednoduše vyplnit:

```
msg.voltage.battery = 630;   // 6.3 V
msg.voltage.external = 1230; // 12.3 V
```

Pokud byste spustili ukázku, tak v ní tato data ale mít uložené nebudete. Souvisí to s tím, že všechny položky mají nějakou svoji výchozí hodnotu (`default value`). U čísel a `boolean` je to jasně dané, ale u vlastní struktury to Protocol buffers neumí zjistit. Je potřeba nastavit, že vámi požadovanou strukturu skutečně chcete zakódovat. Pokud je naše vnořená struktura pojmenovaná `voltage`, tak `nanopb` nám vytvořil `boolean` položku `has_voltage`, kterou je nutné nastavit na `true`.

```
msg.has_voltage = true;
msg.voltage.battery = 630;   // 6.3V
msg.voltage.external = 1230; // 12.3V
```

Nyní se nám již hodnoty dostanou do paketu - můžete zkusit `has_voltage` zakomentovat a porovnat délku výsledného paketu. Bude se lišit.

## Výčtové typy enum

Tak jak máte výčtové typy v programovacích jazycích, naleznete je i zde. Jak nyní vypadá náš `.proto` soubor?

```
syntax = "proto3";

enum pb_revision_t
{
    PB_REV_NONE = 0;
    PB_REV_1_0 = 1;
    PB_REV_1_1 = 2;
    PB_REV_1_2 = 3;
    PB_REV_2_0 = 4;
    PB_REV_2_1 = 5;
}

message pb_packet_t
{
    uint32 illuminance = 1;
    pb_revision_t revision = 2;
}
```

Výčtové typy (enumy) se chovají podobně jako čísla. Výchozí hodnota je první položka a jak víme, výchozí položky se neposílají a ve výstupním JSONu nezobrazují. Proto většinou první enum nastavuji jako `NONE` protože chci, aby se mi ve výsledném JSONu zobrazovaly všechny možnosti. Je tu malý rozdíl v číslování položek - enumy se číslují od `0`, položky ve zprávách od `1`.

Pro nastavení napište

`msg.hw_revision = pb_revision_t_PB_REV_1_2;`

Pokud by se vám nelíbil prefix `pb_revision_t_` který `nanopb` přidává k enum položkám, lze to zakázat nastavením v hlavičce:

```
import 'nanopb.proto';
option (nanopb_fileopt).long_names = false;
```

HARDWARIO dekodér pak tyto oba řádky ignoruje, takže nemusíte v dekodéru vytvářet soubor `nanopb.proto`.

## Opakovaná položka - repeated

Do `.proto` souboru přidáme položku `repeated`. Na ní si ukážeme její vícenásobné vložení do zprávy. To je díky `nanopb` nástroji pro jazyk C řešeno efektivněji a místo dynamicky alokované paměti se používají callbacky.

Náš `.proto` soubor nyní vypadá takto:

```
syntax = "proto3";

message pb_input_t
{
    bool state = 1;
    string name = 2;
}

message pb_packet_t
{
    uint32 illuminance = 1;
    repeated pb_input_t inputs = 3;
}
```

Přidali jsme položku `repeated pb_input_t inputs = 3;`. Příznak `repeated` znamená, že je možné, aby se ve zprávě opakovala. Pro opakované položky, jak jsem již psal, používá `nanopb` callbacky. Tyto callback funkce je potřeba vytvořit a správně nastavit. Ve zprávě `pb_input_t` jsou položky `bool` a `string`. Položku `bool` stačí klasicky nastavit, ale `string` je opět vyplněn dynamicky, takže pro něj musíme vytvořit druhý callback.

Pokud byste místo `string` použili `bytes`, tak se callback chová identicky - dokonce voláte i funkci `pb_encode_string`, přestože do paketu vkládáte pole bajtů.

Kód níže vytvoří 3 položky `repeated` a každá bude mít state nastaven na `true` a budou mít názvy `Input_0` až `Input_2`. Tohle číslo si posílám do string callbacku jako argument přes `msg_input.name.arg`. Pozor na to, že callbacky pro `string`/`bytes` si `nanopb` interně volá dvakrát. Poprvé ke zjištění velikosti a podruhé při samotné serializaci. Proto využívám předání aktuálního indexu položky přes `msg_input.name.arg` a nikoliv například statickou proměnnou s inkrementem čísla.

V kódu budeme mít tedy tyto funkce:

```
// Callback pro string
bool pb_callback_string(pb_ostream_t *stream, const pb_field_t *field, void * const *arg)
{
    char str[32];
    int index = *((int *) arg[0]); // Get index from array of arguments
    snprintf(str, sizeof(str), "Input_%d", index);
    return pb_encode_tag_for_field(stream, field) && pb_encode_string(stream, str, strlen(str));
}

// Callback pro repeated pb_input_t
bool pb_callback_inputs(pb_ostream_t *stream, const pb_field_t *field, void * const *arg)
{
    for (int i = 0; i < 3; i++)
    {
        pb_input_t msg_input;
        msg_input.state = true;
        msg_input.name.funcs.encode = pb_callback_string;
        msg_input.name.arg = &i; // Set index parameter to callback

        if (pb_encode_tag_for_field(stream, field) == false || pb_encode_submessage(stream, pb_input_t_fields, &msg_input) == false)
        {
            return false;
        }
    }

    return true;
}

int main(void)
{
    pb_packet_t msg = pb_packet_t_init_default;

    msg.illuminance = 100;

    msg.inputs.funcs.encode = pb_callback_inputs;

    pb_ostream_t stream = pb_ostream_from_buffer(buffer, sizeof(buffer));
    pb_encode(&stream, pb_packet_t_fields, &msg);

    printf("Length: %d\n", (int) stream.bytes_written);
    for (int i = 0; i < stream.bytes_written; i++)
    {
        printf("%02X", buffer[i]);
    }

    printf("\n");
}
```

Z funkce `main` se volá callbackem repeated položka. V callbacku `pb_callback_inputs` tuto položku vytvoříme díky cyklu `for` třikrát. Zároveň do položky vkládáme i string a to se dělá dalším callbackem `pb_callback_string`.

V kódu si posílám do `pb_callback_string` argument, který v proměnné `index` udržuje index aktuální položky a díky tomu generuju položky s odlišnými názvy. Tady je potřeba dát si pozor a nepoužít zde třeba statickou proměnnou ve funkci, protože `nanopb` callbacky volá dvakrát. Poprvé, kdy si zjistí kolik bude výsledná velikost dat. A podruhé, kdy skutečně data zapisuje do bufferu.

Po spuštění dostaneme následující data:

```
Length: 41
08641A0B08011207496E7075745F301A0B08011207496E7075745F311A0B08011207496E7075745F32
```

Výsledkem je následující dekódovaný JSON:

```
> npm run decode-hex blog.proto 08641A0B08011207496E7075745F301A0B08011207496E7075745F311A0B08011207496E7075745F32

{
  "illuminance": 100,
  "inputs": [
    {
      "state": true,
      "name": "Input_0"
    },
    {
      "state": true,
      "name": "Input_1"
    },
    {
      "state": true,
      "name": "Input_2"
    }
  ]
}
```

## HARDWARIO options

Protocol buffers umožňují použití tzv. `options` což jsou hodnoty v hranatých závorkách které upřesňují nastavení `.proto` souboru, typu nebo položky.

Protocol buffers definují strukturu zprávy, ale již ne obsah. Pro zjednodušení dekodérů jsme si do něj přidali vlastní options:

### Option `multiplied`

Tato vlastnost znamená, že číselná hodnota je v embedded zařízení násobena číslem 100 a proto ji dekodér po vložení do JSONu vydělí číslem 100. Je to vlastně taková fixní desetinná čárka.

```
int32 temperature = 1 [(hio).multiplied = 100];
```

### Option `offset`

Před odesláním hodnoty ze zařízení se k číslu přičte nějaká konstanta, kterou po dekódování je potřeba zase odečíst.

```
int32 temperature = 1 [(hio).offset = -40];
```

### Option `hex`

Tato vlastnost převede v JSONu číselnou hodnotu na řetězec HEX bajtů. Parametr určuje kolik bytů se má zobrazit. Ideální například pokud firmware posílá hash Git commitu.

```
int32 firmware = 3 [(hio).hex = 4];
```

# Závěr

Popsali a vyzkoušeli jsme si většinu vlastností Protocol buffers. Možnosti využití Protocol buffers jsou ale mnohem větší. Jsou například i využívány u vzdáleného volání procedur `gRPC`.