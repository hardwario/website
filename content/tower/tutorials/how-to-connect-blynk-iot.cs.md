---
date: "2022-01-03"
title: "Jak připojit mobilní aplikace Blynk IoT"
url: /cs/tower/navody/jak-pripojit-blynk-iot
meta_title: Jak propojit HARDWARIO s aplikací Blynk
meta_description: Aby vám vaše IoT zařízení HARDWARIO posílalo informace na mobil, potřebujete ho spárovat s Blynkem. Koukněte na náš jednoduchý návod.
description: Aby vám vaše IoT zařízení HARDWARIO posílalo informace na mobil, potřebujete ho spárovat s Blynkem. Koukněte na náš jednoduchý návod.
image_preview: /upload/mobile-phone.jpg
image_main: /upload/mobile-phone.jpg
weight: 55
---

Vaši sestavu stavebnice TOWER jednoduše propojíte s mobilním telefonem. Po spárování můžete posílat notifikace nebo v něm zobrazit grafy s teplotou ve vašem domě. Potřebujete k tomu aplikaci Blynk IoT a v tomto článku vám ukážeme, jak na to.

## Začněte registrací na Blynk.cloud
Prvním krokem je vytvoření účtu v aplikaci Blynk. Nový účet potřebujete i v případě, že jste používali předchozí verzi aplikace. 

Otevřete ve vašem prohlížeči adresu [blynk.cloud](https://blynk.cloud) a klikněte na **Create new account**. Následně vyplňte váš e-mail, na ten vám přijde zpráva s odkazem na vytvoření hesla. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641212994/academy/how-to-connect-blynk-iot/new-account.png" alt = "Blynk IoT - new account" >}}

## Vytvořte si šablonu - template
Úvodní tutorial můžete přeskočit a nechat si jej na později.

V levém menu vyberte **Templates** a klikněte vpravo na **+ Create template**. Ve formuláři vyplňte jméno šablony, na zvoleném hardwaru a typu připojení nyní nezáleží. Tlačítkem **Done** dokončíte vytvoření šablony.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/add-template.png" alt = "Blynk IoT - new account" >}}

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/add-template-2.png" alt = "Blynk IoT - new account" >}}


## Přidejte datové streamy
Pro každou hodnotu, kterou chcete do Blynku zapisovat je potřeba založit datový stream. V tomto manuálu budeme používat stejný princip, jako v předchozí verzi Blynk - **virtuální piny**.

Na otevřené stránce vytvořené šablony klikněte v menu na **Datastreams**. Po kliknutí na tlačítko **+ New Datastream** vyberte volbu **Virtual Pin**. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213844/academy/how-to-connect-blynk-iot/datastream.png" alt = "Blynk IoT - new datastream" >}}

Vyplňte název datastreamu, barvu, přiřaďte mu číslo (každý datastream bude mít unikátní číslo), zvolte datový typ, případně také jednotku a další parametry. Tlačítkem **Create** přidání dokončíte. 

Pokud chcete přidat datastreamů více, opakujte stejný postup.

## Založte zařízení ze šablony
Přejděte na úvodní stranu Blynku kliknutím na lupu vlevo. Tlačítkem **+ New Device** otevřete okno pro založení nového zařízení. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/new-device.png" alt = "Blynk IoT - new device" >}}

Ve výběru způsobu vytvoření zvolte **From template**. V dalším formuláři vyberte vaši šablonu a přiřaďte zařízení jméno. Kliknutím na **Create** proces dokončíte.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/new-device-2.png" alt = "Blynk IoT - new device" >}}

Všimněte si, že napravo máte notifikaci s informacemi o novém zařízení. Obsahují informaci o **TEMPLATE ID** a **AUTH TOKEN**, obě budete za chvíli potřebovat pro natavení v Playgroundu.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/new-device-3.png" alt = "Blynk IoT - new device" >}}

## Přesuňte se do Playgroundu
Pro funkční propojení doporučujeme aktualizovat Playground na nejnovější verzi, obsahuje předinstalovaný plugin Blynk IoT (`node-red-contrib-blynk-iot`). Případně si tento plugin doinstalujte. 

V záložce **Functions** najděte nody, které s novou verzí Blynk pracují - jsou označené sekcí **Blynk IoT**. 

1. Pro zápis hodnot do vytvořeného datastreamu vyberte node **write**. 

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213843/academy/how-to-connect-blynk-iot/playground.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

2. Dvojklikem se dostanete do jeho nastavení. 
3. Vpravo klikněte na malou tužku, klikem se otevře nové okno. Do pole **Url** vložte ``blynk.cloud``, do polí **Auth Token** a **Template ID** zkopírujte hodnoty z detailu zařízení ve webové aplikaci na počítači.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/playground-2.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

4. Nastavení potvrďte kliknutím na **Add**.  
5. Vyplňte číslo virtuálního Pinu vašeho datastreamu a tlačítkem **Done** vše uložte.

Nyní můžete nastavit svou flow v Node-RED. Vypadat může třeba takto jednoduše.

{{< b-image src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641213842/academy/how-to-connect-blynk-iot/playground-4.png" alt = "Blynk IoT - HARDWARIO Playground" >}}

## Nastavte si mobilní aplikaci

**Aplikaci Blynk IoT** si na mobil stáhnete z [App store](https://apps.apple.com/us/app/blynk-iot/id1559317868), nebo [Google Play](https://play.google.com/store/apps/details?id=cloud.blynk). Přihlaste se do ní vašimi údaji. 

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-1.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

Hned na úvodní stránce uvidíte vámi vytvořené zařízení. 

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214289/academy/how-to-connect-blynk-iot/blynk-2.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

Otevřete jej kliknutím a nastavte si dashboard:

1. Pod **klíčem** vpravo nahoře najdete nastavovací stránku dashboardu.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214289/academy/how-to-connect-blynk-iot/blynk-3.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

2. Tlačítkem **+** , nebo kliknutím někam na plochu přidejte nový widget. V ukázce používáme **Labeled Value**.

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-4.png" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

3. Stiskem přidaného widgetu zobrazíte okno s jeho nastavením. Nejdůležitější je doplnit ***Datastream*** z vaší šablony pro vybraný virtuální Pin. 

{{< middle >}}
{{< img src = "https://res.cloudinary.com/lukasfabik/image/upload/v1641214290/academy/how-to-connect-blynk-iot/blynk-5.jpg" alt = "Blynk IoT mobile dashboard" >}}
{{< /middle >}}

4. Máte hotovo. Do vašeho widgetu v aplikaci Blynk IoT se nyní začnou ukládat data odeslaná z Playgroundu.
