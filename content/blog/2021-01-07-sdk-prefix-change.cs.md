---
title: Změna prefixu z bc_ na twr_ v SDK IoT stavebnice TOWER
meta_title: Změna prefixu bc_ to twr_ v SDK IoT stavebnice TOWER
meta_description: Naše stavebnice byla přejmenována z BigClown na TOWER. Nyní jsme změnili také prefix SDK funkcí z bc_ na twr_.
draft: false
date: 2021-01-07
description: Naše stavebnice byla přejmenována z BigClown na TOWER. Nyní jsme změnili také prefix SDK funkcí z bc_ na twr_.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1576055326/blog/bigclown-renamed-hardwario/hardwario.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1581950249/blog/wide_placeholder.jpg
author: martin_hubacek
---

V letech 2019 a 2020 jsme naši stavebnici postupně přejmenovali z BigClown na TOWER IoT Kit. Nyní jsme konečně změnili také prefix funkcí v našem SDK z `bc_` na `twr_`. **Nicméně můžete stále použít dosavadní prefix**, ponechali jsme jej definovaný:

{{< middle >}}
{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1610009303/blog/2021-01-07-sdk-prefix-change/ecf1e033b46eee9e625f08b25dd360522afbc4c4.png" alt = "TOWER SDK firmware prefix changed" >}}
{{< /middle >}}

<br/>
Prozatím jsme nezasahovali do funkcí a jejich proměnných, jedinou změnou je prefix. Definici `bc_` funkcí [najdete tady](https://github.com/hardwario/twr-sdk/blob/master/bcl/inc/bcl.h).

Díky této definované funkci a `bcl.h` bude váš projekt fungovat správně i když máte starší verzi SDK a aktualizujete jej pomocí příkazu `make update`. 

Ještě chvíli uvidíte v dokumentaci názvy funkcí s `bc_` prefixem, ale pomalu je budeme aktualizovat na `twr_`. U nových funkcí pravděpodobně přidáme pouze prefix `twr_`, proto doporučujeme u nových projektů již přejít na nový prefix.

## Nahrazení bc_ na twr_

Prefix můžete jednoduše změnit ve VSCode pomocí funkce **Search & Replace** (Ctrl+Shift+H). Doporučujeme zaškrtnout **Preserve Case**, aby se nahradilo `bc_` i `BC_` zároveň. Nezapomeňte také omezit místo nahrazení pouze na složku `app/*` (možnost se vám otevře kliknutím na 3 tečky.) Takto by to mělo vypadat, nahrazení pak provedete pomocí **Replace all**:

![Replacing bc_ to twr_](https://res.cloudinary.com/lukasfabik/image/upload/v1610009304/blog/2021-01-07-sdk-prefix-change/de17e59b34b1c8fae704c95402459db4fb9ec6c8.png)

Intellisense ve VSCode bude fungovat dobře, pouze ukáže, že funkce bc_ bude změněna na `twr_gpio_init`.

{{< middle >}}
{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1610009303/blog/2021-01-07-sdk-prefix-change/583bd3fbccbe6f127788c769e41a63b791413884.png" alt = "bc_ function will be changed to twr_gpio_init" >}}
{{< /middle >}}