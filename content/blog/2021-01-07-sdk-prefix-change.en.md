---
title: Change of prefix bc_ to twr_ in the TOWER IoT Kit SDK
meta_title: Change of prefix bc_ to twr_ in the TOWER IoT Kit SDK
meta_description: Our IoT Kit was renamed from BigClown to TOWER and now we also changed SDK function prefixes from bc_ to twr_.
draft: false
date: 2021-01-07
description: Our IoT Kit was renamed from BigClown to TOWER and now we also changed SDK function prefixes from bc_ to twr_.
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1576055326/blog/bigclown-renamed-hardwario/hardwario.jpg
image_main: https://res.cloudinary.com/lukasfabik/image/upload/v1581950249/blog/wide_placeholder.jpg
author: martin_hubacek
---

In 2019 and 2020 we have gradually renamed our IoT Kit from BigClown to TOWER IoT Kit. Now we have finally changed also SDK function prefixes from `bc_` to `twr_`. **However you can still use `bc_` prefix if you like**, we kept them as the defines:

{{< middle >}}
{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1610009303/blog/2021-01-07-sdk-prefix-change/ecf1e033b46eee9e625f08b25dd360522afbc4c4.png" alt = "TOWER SDK firmware prefix changed" >}}
{{< /middle >}}

<br/>
Right now the renamed functions have the same functions, same parameters. It’s just the prefix we have changed. The `bc_` functions are defined [here](https://github.com/hardwario/twr-sdk/blob/master/bcl/inc/bcl.h).

Thanks to this define function and the same include name `bcl.h` your project will work properly even if you have older version of SDK and update SDK by calling `make update` from your command line.

For some time you will see older `bc_` function names in documentation but we will slowly update them to the new `twr_` however they have the same meaning.

When we add **new functions** to the SDK we might create only `twr_` prefix names. So if you’re creating a new project we suggest to use the new `twr_` prefixes.

## Replacing bc_ to twr_

You can easily replace `bc_` to `twr_` in VSCode using Search & Replace (Ctrl+Shift+H). You have to check the **Preserve Case** so the lowercase `bc_` and uppercase `BC_` will replace accordingly. Also you have to select just app/* folder (this option will open if you click on three little dots)

Check in the list below if this is what you would like to change and click on **Replace all** (Ctrl+Alt+Enter).

![Replacing bc_ to twr_](https://res.cloudinary.com/lukasfabik/image/upload/v1610009304/blog/2021-01-07-sdk-prefix-change/de17e59b34b1c8fae704c95402459db4fb9ec6c8.png)

Intellisense in VSCode will work fine, it will just show that the `bc_` function will be changed to `twr_gpio_init`.

{{< middle >}}
{{< img-nm src = "https://res.cloudinary.com/lukasfabik/image/upload/v1610009303/blog/2021-01-07-sdk-prefix-change/583bd3fbccbe6f127788c769e41a63b791413884.png" alt = "bc_ function will be changed to twr_gpio_init" >}}
{{< /middle >}} 