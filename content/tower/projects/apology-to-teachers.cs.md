---
title: Zaspal jsi? Pošli učiteli omluvenku stisknutím tlačítka
draft: false
featured: false
handbook: Starter Kit
date: 2019-11-09T15:06:49.642Z
description: >-
  Návod na to, jak si ze Starter Kitu od HARDWARIO vytvoříš chytré tlačítko.
  Pošle tvému učiteli omluvenku, když tě náhodou zradí budík.
url: /cs/tower/projekty/omluvenka-uciteli
meta_title: Zaspal jsi? Pošli učiteli omluvenku stisknutím tlačítka
meta_description: >-
  Návod na to, jak si ze Starter Kitu od HARDWARIO vytvoříš chytré tlačítko.
  Pošle tvému učiteli omluvenku, když tě náhodou zradí budík.
image_preview: >-
  https://res.cloudinary.com/lukasfabik/image/upload/v1573639907/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/Nocni-lampa.jpg
image_main: >-
  https://res.cloudinary.com/lukasfabik/image/upload/v1573639907/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/Nocni-lampa.jpg
tags:
  - Školní projekt
modules: ["core","pir","mini_battery","usb_dongle"]
---
## Úvod

{{< perex >}}
Ani mobil není neomylný. Občas tě třeba zapomene vzbudit. Když se ti to náhodou stane, nezoufej. Zmáčkni tlačítko 👇 a omluvíš se dřív, než učitel začne volat tvým rodičům.
{{< /perex >}}

V tomhle projektu se naučíš, **jak tlačítkem odeslat e-mail**. 📩

Vystačíš si přitom se základní HARDWARIO sadou, tedy [**Starter Kitem**](https://shop.hardwario.com/starter-kit/).

{{< modules >}}

## Rozjeď to v Node-RED

1. Starter Kit sestav a spáruj: jestli to děláš poprvé, [připravili jsme k tomu jednoduchou příručku](/cs/handbook/). Na Core Module potřebuješ firmware radio push button. Pokud nevíš, jak si firmware stáhnout nebo co to je, [zjistíš to tady](/cs/academy/jak-nahrat-firmware/).
2. V Playgroundu klikni na **záložku Functions**, kde je programovací plocha [Node-RED](/cs/academy/co-je-node-red/). 🤖
3. Na plochu Node-RED postav node **MQTT** ze sekce Input.

![MQTT](https://res.cloudinary.com/lukasfabik/image/upload/v1573312451/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image6.png)

4. Uvnitř nodu nastavíš klíčovou funkci – a tou je stisknutí tlačítka. Na node dvakrát klikni a **do pole Topic zkopíruj tenhle řádek**:


```
node/push-button:0/push-button/-/event-count
```

Potvrď tlačítkem **Done**.

## Nastav obsah omluvenky

1. Samotnou omluvenku taky nastavíš v Node-RED. Kamkoli vedle MQTT nodu umísti **Change node** ze sekce Functions. Ten určí, jaký e-mail se odešle.

![Change](https://res.cloudinary.com/lukasfabik/image/upload/v1573312451/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image5.png)

2. Na node dvakrát klikni a do pole **Rules** (pravidla) nastav jedno pravidlo pro **msg.payload**. Podle toho bude nastaven obsah tvého e-mailu. Mysli na to, že node si s českými čárkami a háčky nerozumí, a nezapomeň se podepsat. Zpráva tak může znít třeba takhle:

_Dobry den, pane Datle, omlouvam se, ale bohuzel mi pes sezral budika. Prijdu co nevidet. Vas oblibeny zak, ktery si nezaslouzi poznamku, Evzen_

![Rules](https://res.cloudinary.com/lukasfabik/image/upload/v1641994966/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/set-message.png)

Potvrď to tlačítkem **Done**. 👏


## Připrav si applikaci Blynk IoT

1. Pokud ještě nemáš, vytvoř si účet v aplikaci [Blynk IoT](https://blynk.io). Jak na to se podívej v [tomto návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Seznámíš se tam i s tím, jak se tvoří šablony a datastreamy. Obojí budeš potřebovat.

2. Druhým krokem je vytvoření šablony zařízení. Jak na to najdeš [ve stejném návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Klidně ale použij šablonu z předchozích projektů, pokud ji máš.

3. Teď si nastav nový Datastream. Na detailu šablony klikni na záložku **Datastreams**. Vpravo nahoře klikni na **Edit**. Objeví se ti tlačítko **+ New Datastream**, klikni na něj, vyber **Virtual Pin** a objeví se ti dialogové okno:

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642000982/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/add-datastream-1.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

4. Nastav název pro nový Datastream a vyber jeden z volných Pinů. V mobilní notifikaci budeme chtít vypsat tvou vlastní zprávu, proto **zvol jako datový typ String** (textový řetězec). 

5. V dialogovém okně dole ještě rozklikni **Advanced settings** a zaškrtni poslední volbu **Expose to Automation**, díky tomu ji budeme moct použít v automatizacích. V selektoru vedle zvol **Sensor** a zaškrtni taky **Available in Conditions**. Datastream vytvoříš kliknutím na **Create**. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642000981/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/add-datastream-2.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

6. Vpravo nahoře svou práci ulož tlačítkem **Save**.

## Založ zařízení

Pokud jej ještě nemáš, založ si zařízení z vytvořené šablony. Jak na to popisujeme [v návodu, který už znáš]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}).

## Přidej do aplikace učitele

Aby mohl e-mail přijít i někomu jinému než tobě, je potřeba vytvořit v Blynk IoT nový účet. Na ten přijde pozvánka, ale nic se neboj, fungovat to bude ikdyž pozvánku nikdo nepotvrdí.

1. Přepni se v Blynk IoT do nastavení (ozubené kolečko vlevo dole) a jdi sekce **Users**. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642001170/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/invite-user-1.png" alt = "Blynk IoT Add user" >}}

2. Vpravo nahoře klikni na **+ Invite** a vyplň ve formuláři jméno a e-mail vyučující(ho). Jako roli zvol třeba **Staff**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642001170/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/invite-user-2.png" alt = "Blynk IoT Add user" >}}

Pozvánku pošli tlačítkem **Invite**. Na zadaný e-mail přijde pozvánka do aplikace. Tvůj projekt ale bude fungovat ikdyž ji vyučující nepřijme.

## Vytvoř automatizaci

1. Přepni se do sekce **Automation** a klikni na tlačítko **+ Create Automation**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642001252/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/add-automation-1.png" alt = "HARDWARIO Add Blynk IoT automation" >}}

2. Z dostupných možností vyber **Device State**. Automatizace vyhodnotí vždy, když do aplikace pošleš zprávu.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642001252/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/add-automation-2.png" alt = "HARDWARIO Add Blynk IoT automation" >}}


3. Nastavení automatizace probíhá jednoduše nastavením Kdy se má automatizace spustit - sekce **When** a co se má následně stát - sekce **Do this**. 

4. Nejprve nastav sekci **When**. Vyber tvé zařízení a **vytvořený Datastream**. Objeví se ti třetí selector, ten nech nastavený na **Is Any**. 

5. V sekci **Do This** klikni na **Send e-mail**. V poli **Recipient** nastav jako příjemce učitele nebo učitelku, nastav předmět e-mailu podle libosti, například ``Omluvenka``. A nakonec, do pole **Message** přetáhni myší položku **Trigger value**, jde o proměnnou, kde bude uložen text tvé omluvené zprávy.

6. Nakonec nezapomeň nastavit **název automatizace**. V selectu **Limit period** můžeš omezit, kdy nejdříve po notifikaci přijde další. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642001348/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/add-automation-3.png" alt = "HARDWARIO Add Blynk IoT automation" >}}

7. Klikem na **Save** automatizaci ulož.

## Nastav zasílání e-mailu

1. A teď hurá zpátky do Playgroundu. Za svůj flow přidej **zelený node Write**. Najdeš ho v levé části v sekci **Blynk IoT** (Pozor! Ne Blynk ws).📮

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642002706/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/playground-1.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

2. Na node dvakrát klikni.

3. Potom klikni **na tužtičku** vedle řádku **Connection** a nastav ještě pár drobností.  Do pole **Url** vlož ``blynk.cloud``, do polí **Auth Token** a **Template ID** zkopíruj hodnoty z detailu zařízení ve webové aplikaci na počítači.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642002369/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/playground-2.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

Nastavení potvrď tlačítkem **Add**.

4. Vyplň číslo virtuálního Pinu vytvořeného datastreamu a tlačítkem **Done** vše ulož.

5. Nody spoj, zmáčkni tlačítko **Deploy** a raduj se: pojistka pro případ zaspání je na světě! 🙏

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642002292/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/flow.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

## A… Akce!

1. Chceš si to vyzkoušet? **Změň pro testovací účely příjemce e-mailu na sebe** a automatizaci ulož.
2. Pak prostě zmáčkni tlačítko a… Jůů, **někdo ti píše**! 💌

![e-mail](https://res.cloudinary.com/lukasfabik/image/upload/v1573312452/projects/poslani-e-mailu-uciteli-s-omluvenkou-z-vyucovani/image10.png)
