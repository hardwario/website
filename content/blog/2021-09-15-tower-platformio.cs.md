---
title: Podpora TOWER kitu v PlatformIO
meta_title: Podpora TOWER kitu v PlatformIO
meta_description: Vývoj firmware pro HARDWARIO TOWER je nyní možný i ve vývojovém prostředí PlatformIO. Neustále se snažíme vylepšovat a zjednodušovat práci se stavebnicí TOWER. Již delší dobu doporučujeme vývojové prostředí VSCode. Na každou platformu Windows, Linux, macOS se ale přístup lišil a instalace nástrojů a GCC kompilátoru mohla začátečníkům komplikovat tvorbu prvního programu.
draft: false
date: 2021-09-15
description: Vývoj firmware pro HARDWARIO TOWER je nyní možný i ve vývojovém prostředí PlatformIO.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1631699535/blog/2021-09-15-tower-platformio/platformio-blog.png
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1581950249/blog/wide_placeholder.jpg
author: martin_hubacek
---

Neustále se snažíme vylepšovat a zjednodušovat práci se stavebnicí TOWER. Již delší dobu doporučujeme vývojové prostředí VSCode. Na každou platformu Windows, Linux, macOS se ale přístup lišil a instalace nástrojů a GCC kompilátoru mohla začátečníkům komplikovat tvorbu prvního programu.

Za poslední roky se PlatformIO, což je vlastně extension do VSCode, velmi rozšířilo a používá jej čím dál více embedded vývojářů. Výhodou jsou balíčky, které korektně a bez ohledu na operační systém nainstalují potřebné nástroje a to i bez nutnosti administrátorského přístupu.

{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1631699100/blog/2021-09-15-tower-platformio/platformio.png" alt = "" >}}

V TOWER dokumentaci je nyní [detailní postup instalace PlatformIO](https://tower.hardwario.com/en/latest/firmware/platformio-installation/), který je nyní jednotný na všechny platformy.

V dalších kapitolách [Firmware Quick Start](https://tower.hardwario.com/en/latest/firmware/firmware-quick-start/) a [First Firmware](https://tower.hardwario.com/en/latest/firmware/blank-start/) se dozvíte jak vytvořit první projekt a jak nově vypadá struktura složek vašeho programu.

Pro ladění jsme integrovali také sériovou konzoli. Více je popsáno v sekci [Debugging](https://tower.hardwario.com/en/latest/firmware/debugging/).

## Vytvoření nového projektu

Přímo v PlatformIO potom můžete vycházet z již existujících projektů v položce `Examples`. Není tedy vždy nutné použít nástroj git.

{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1631699100/blog/2021-09-15-tower-platformio/examples.png" alt = "" >}}


Nicméně git lze stále použít a nový repozitář [twr-skeleton](https://github.com/hardwario/twr-skeleton) obsahuje vše pro použití PlatformIO včetně konfiguračního souboru `platformio.ini`.

## SDK a application.c

Změnou oproti standardnímu projektu je to, že ve složce již nenajdete složku `sdk`. Ta se automaticky stáhne do podsložky `.pio`. Proto při sdílení nebo kopírování je možné tuto (v UNIXech neviditelnou složku) i smazat. Při další kompilaci se všechny knihovny stáhnou a vytvoří znova.
Projekty tedy lze snadněji kopírovat a sdílet.

Hlavní soubor s vaším programem je nyní ve složce `src/application.c`.

## Konfigurační soubor

Soubor `platformio.ini` je hlavní konfigurační soubor. Obsahuje definice platformy, desky a frameworku. Uvnitř je také řádek `lib_deps = twr-sdk`, který právě definuje stažení SDK. Stahuje se vždy to nejnovější. Pokud byste chtěli svůj projekt vázat na nějakou konkrétní verzi SDK, lze to snadno provést [zamčením](https://docs.platformio.org/en/latest/projectconf/section_env_library.html#lib-deps) například takto `lib_deps = twr-sdk@1.0.0`.

Pokud nespecifikujete verzi SDK, tak se použije vždy ta, která je ve složce `.pio` naposledy stažená. Pokud ji chcete aktualizovat, můžete složku `.pio` smazat a provést nový build, který stáhne poslední verzi SDK.


```ini
; https://docs.platformio.org/page/projectconf.html

[platformio]
default_envs = debug

[env]
platform = hardwario-tower
board = core_module
framework = stm32cube
lib_deps = twr-sdk
monitor_speed = 115200
monitor_filters = printable, send_on_enter
monitor_flags = --echo

[env:debug]
upload_protocol = serial

[env:release]
upload_protocol = serial
build_flags =
    ${env.build_flags}
    -D RELEASE

[env:debug-jlink]
build_type = debug
upload_protocol = jlink
debug_init_break = tbreak application_init
debug_svd_path = .pio/libdeps/debug/twr-sdk/sys/svd/stm32l0x3.svd
build_flags =
    ${env.build_flags}
    -D DEBUG
```

## Flashování

PlatformIO automaticky nadetekuje sériový port, ke kterému je Core Module připojen. Nyní již není potřeba jej ručně vybírat, jak tomu bylo dřív u nástroje `bcf`.

Flash provedete kliknutím na symbol šipky vpravo `→` v dolní stavové liště. Pokud předtím program nebyl zkompilován, nebo jste provedli a uložili nějaké změny, tak se program před flashnutím i utomaticky zkompiluje.

{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1631699100/blog/2021-09-15-tower-platformio/lower-bar-upload.png" alt = "" >}}

## Sériová konzole

Původní nástroj `bcf` pro výpisy sériové konzole nyní nahrazuje symbol zástrčky v dolní liště VSCode.

{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1631699100/blog/2021-09-15-tower-platformio/console.png" alt = "" >}}

## J-Link debugging

Již přímo v PlatformIO je podpora pro různé SWD/JTAG ladící adaptéry. V základní konfiguraci je zvolený JLink, ale je možné si nakonfigurovat vlastní ST-Link nebo jiné. Pro spuštění ladění stačí stisknout `F5`.

