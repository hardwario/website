---
title: Pošli mámě do mobilu zprávu, že jsi v pohodě přišel domů
meta_title: Vyrob si IoT tlačítko, se kterým pošleš mámě zprávu do mobilu
meta_description: Návod na to, jak si ze Starter Kitu od HARDWARIO vytvoříš chytré tlačítko. To pošle do mobilu zprávu tvojí mámě, že jsi v pohodě dorazil domů.
url: tower/projekty/jsem-ok-tlacitko
draft: false
date: 2019-08-12
description: Vytvoř si ze Starter Kitu od HARDWARIO IoT detektor změny pohybu s tímhle jednoduchým návodem. A nezapomeň ho s kámoši otestovat v cool hře.
tags:
  - Projekt na doma
image_preview: /upload/ilustrace-notifikace-tlacitkem-ze-jsem-doma.png
image_main: /upload/ilustrace-notifikace-tlacitkem-ze-jsem-doma.png
author: lukas_fabik
featured: true
modules: ["core","button","mini_battery","usb_dongle"]
handbook:
---

## Úvod

{{< perex >}}
Rodiče ti každý den volají, jestli jsi ze školy dorazil domů? Je to sice otrava, ale prostě o tebe mají starosti. Vyrob si proto tlačítko, se kterým jim pokaždé pošleš jednoduchou zprávu do mobilu. 📲
{{< /perex >}}

V tomhle projektu se naučíš, **jak tlačítkem poslat zprávu do mobilu svých rodičů**. 👩👱

Budeš potřebovat jen **krabičku s tlačítkem** a **USB dongle**. Vystačíš si se základní HARDWARIO sadou, tedy [**Starter Kitem**](https://shop.hardwario.com/starter-kit/).

{{< modules >}}

## Rozjeď to v Node-RED

1. Starter Kit sestav a spáruj: jestli to děláš poprvé, [připravili jsme k tomu jednoduchou příručku]({{< ref "/tower/tutorials/handbook.cs.md" >}}). Na Core Module potřebuješ firmware **radio push button**. Pokud nevíš, jak si firmware stáhnout nebo co to je, [zjistíš to tady]({{< ref "/tower/tutorials/how-to-flash-firmware.cs.md" >}}).

2. V Playgroundu klikni na **záložku Functions**, kde je programovací plocha [Node-RED]({{< ref "/tower/tutorials/what-is-node-red.cs.md" >}}.

3. Na plochu Node-RED postav světle fialovou bublinu, neboli nod. Najdeš ho vlevo jako **MQTT** v sekci Inputs.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566155396/projects/im-ok-button/image4.png" alt = "MQTT input node" >}}

4. Uvnitř nodu nastavíš klíčovou funkci – a tou je stisknutí tlačítka. Na node dvakrát klikni a **do pole Topic zkopíruj tenhle řádek**:

```
node/push-button:0/push-button/-/event-count
```

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566155397/projects/im-ok-button/image8.png" alt = "MQTT topic" >}}

Potvrď pomocí tlačítka **Done**.

**Tip:** Místo kopírování řádku odsud můžeš příště jednoduše zkopírovat řádek, který se ti po stisknutí tlačítka ukáže **v záložce Messages**.


## Nastav svoji zprávu

1. Zprávu si nastavíš taky tady v Node-RED. Kamkoli vedle světle fialového inputu MQTT přetáhni **žlutý node ze sekce Functions s názvem Change**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566155397/projects/im-ok-button/image7.png" alt = "Change Node HARDWARIO Playground" >}}

2. Na node dvakrát klikni a do pole **Rules** (pravidla) napiš svou zprávu pro rodiče. Jenom pozor, na Blynku se nezobrazují háčky a čárky. Malá inspirace:
	- *Klidek. Jsem doma a v bezpeci.*
	- *Mame doma celebritu… Delam si srandu. To jsem ja.*
	- *Pokousali me psi, uneslo me UFO, ale uz jsem doma.*

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1566155396/projects/im-ok-button/image6.png" alt = "HARDWARIO Playground MQTT messages" >}}

Potvrď tlačítkem **Done** a oba nody propoj táhnutím myší od jedné bubliny k druhé. 🐁


## Připrav si applikaci Blynk IoT

1. Pokud ještě nemáš, vytvoř si účet v aplikaci [Blynk IoT](https://blynk.io). Jak na to se podívej v [tomto návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Seznámíš se tam i s tím, jak se tvoří šablony a datastreamy. Obojí budeš potřebovat.

2. Druhým krokem je vytvoření šablony zařízení. Jak na to najdeš [ve stejném návodu]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}). Klidně ale použij šablonu z předchozích projektů, pokud ji máš.

3. Teď si nastav nový Datastream. Na detailu šablony klikni na záložku **Datastreams**. Vpravo nahoře klikni na **Edit**. Objeví se ti tlačítko **+ New Datastream**, klikni na něj, vyber **Virtual Pin** a objeví se ti dialogové okno:

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990253/projects/im-ok-button/add-datastream-1.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

4. Nastav název pro nový Datastream a vyber jeden z volných Pinů. V mobilní notifikaci budeme chtít vypsat tvou vlastní zprávu, proto **zvol jako datový typ String** (textový řetězec). 

5. V dialogovém okně dole ještě rozklikni **Advanced settings** a zaškrtni poslední volbu **Expose to Automation**, díky tomu ji budeme moct použít v automatizacích. V selektoru vedle zvol **Sensor** a zaškrtni taky **Available in Conditions**. Datastream vytvoříš kliknutím na **Create**. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990253/projects/im-ok-button/add-datastream-2.png" alt = "HARDWARIO Add Blynk IoT datastream" >}}

6. Vpravo nahoře svou práci ulož tlačítkem **Save**.

## Založ zařízení

Pokud jej ještě nemáš, založ si zařízení z vytvořené šablony. Jak na to popisujeme [v návodu, který už znáš]({{< ref "/tower/tutorials/how-to-connect-blynk-iot.cs.md" >}}).

## Vytvoř automatizaci

1. Přepni se do sekce **Automation** a klikni na tlačítko **+ Create Automation**.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990253/projects/im-ok-button/add-automation-1.png" alt = "HARDWARIO Add Blynk IoT automation" >}}

2. Z dostupných možností vyber **Device State**. Automatizace vyhodnotí vždy, když do aplikace pošleš zprávu.

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990252/projects/im-ok-button/add-automation-2.png" alt = "HARDWARIO Add Blynk IoT automation" >}}

3. Nastavení automatizace probíhá jednoduše nastavením Kdy se má automatizace spustit - sekce **When** a co se má následně stát - sekce **Do this**. 

4. Nejprve nastav sekci **When**. Vyber tvé zařízení a **vytvořený Datastream**. Objeví se ti třetí selector, ten nech nastavený na **Is Any**. 

5. V sekci **Do This** klikni na **Send app notification** a nastav si příjemce. Pro zjednodušení tam nastav sebe. Do polí **Subject** a **Message** přetáhni myší položku **Trigger value**, jde o proměnnou, kde bude uložen text tvé zprávy.

6. Nakonec nezapomeň nastavit **název automatizace**. V selectu **Limit period** můžeš omezit, kdy nejdříve po notifikaci přijde další. 

{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990253/projects/im-ok-button/add-automation-3.png" alt = "HARDWARIO Add Blynk IoT automation" >}}

7. Klikem na **Save** automatizaci ulož.


## Nastav mobilní aplikaci 

1. Půjč si od mámy nebo od táty jejich smartphone a ještě trochu jim ho nachytři. 🤓 Aby se jim tvoje zpráva zobrazila, musí mít na mobilu **appku Blynk IoT**. Stáhneš ji z [App store](https://apps.apple.com/us/app/blynk-iot/id1559317868), nebo [Google Play](https://play.google.com/store/apps/details?id=cloud.blynk).

2. Po instalaci se přihlas pod svým účtem.


## Propoj mobil s krabičkou

1. Vrať se k počítači. Na ploše Node-RED přidej za oba nody **zelený node Write**. Najdeš ho v levé části v sekci **Blynk IoT** (Pozor! Ne Blynk ws).

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642002646/projects/im-ok-button/playground-1.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

2. Node otevři dvojklikem. Vpravo uvidíš **malou tužku**. Klikni na ni a otevře se ti nové okno. Do pole **Url** vlož ``blynk.cloud``, do polí **Auth Token** a **Template ID** zkopíruj hodnoty z detailu zařízení ve webové aplikaci na počítači.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1642002399/projects/im-ok-button/playground-2.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

Nastavení potvrď tlačítkem **Add**.

3. Vyplň číslo virtuálního Pinu vytvořeného datastreamu a tlačítkem **Done** vše ulož.

4. **Node s Blynkem propoj se žlutým nodem, do kterého jsi nastavil zprávu.** Teď jsi zařízení naprogramoval tak, aby se stisknutí tlačítka na krabičce ➡️ proměnilo ve zprávu, ➡️ která doputuje až do mobilu tvých rodičů. 👾

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641990723/projects/im-ok-button/flow.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

❗ Celý flow odstartuj a potvrď červeným tlačítkem **Deploy** vpravo nahoře. 🚨

## A… Akce!

1. Zmáčkni tlačítko. Rodičům na mobilu **vyskočila zpráva**. 💪

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641991297/projects/im-ok-button/notification.png" alt = "Get Notification on Phone" >}}
{{< /middle >}}

2. Nejenom, že si o tobě budou tví rodičové myslet, že jsi nadaný, ale ještě si ušetříš jejich každodenní telefonáty. 🎉 **A to je prostě tak chytré, až je to IoT.** 🕺
