---
layout: handbook
title: Příručka k HARDWARIO TOWER Starter Bundle
slug: prirucka-tower
description: Naučte se práci s IoT stavebnicí HARDWARIO TOWER
meta_title: Rychlý návod ke Starter Bundle IoT stavebnice HARDWARIO TOWER
meta_description: Rychlý návod ke Starter Bundle IoT stavebnice HARDWARIO TOWER - jak si sestavit zařízení a jak ho naprogramovat a spárovat v aplikaci Playground
mainHeading: Příručka k HARDWARIO TOWER Starter Bundle
mainParagraph: IoT snadno a prakticky
kit: ["starter-kit"]
weight: 1
image: intro_CZ.png
image_preview: https://res.cloudinary.com/lukasfabik/image/upload/v1576055326/blog/bigclown-renamed-hardwario/hardwario.jpg
perex: <p>Naučte se internet věcí na reálných projektech.</p> <p><strong>HARDWARIO TOWER</strong> je průmyslová stavebnice, se kterou si jednoduše postavíte váš <strong>Internet věcí</strong> (IoT). Stavebnice obsahuje více než 50 modulů, ze kterých se snadno staví IoT zařízení pro průmysl 4.0, aktivní STEM vzdělávání a projekty chytré domácnosti. Vytvořené IoT prvky mají velmi nízkou spotřebu a dokáží běžet z baterií po dobu několika let. Stavebnice je open-source, v průmyslové kvalitě a s širokou nabídkou IoT konektivity. Součástí je aplikace Playground pro správu zařízení a nastavení funkcí. </p><p>Základní sadou pro začátek je <strong>Starter Bundle</strong>, který lze snadno rozšířit o další moduly. Tato příručka vás seznámí s jednotlivými prvky stavebnice, provede vás postavením prvního IoT zařízení a úvodními projekty.</p>
---
<div class="collapsor__item">
<div class="collapsor__header">
<div class="row">
<div class = "col-md-6 align-self-center">
<h2><span>Krok 1</span>Sestavení zařízení z modulů Starter Bundle</h2>
<span class = "font-red font-font2 font-weight-bold font-15 text-decoration-underline">Jdeme na to</span>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/2-ilustrace-devce-sestavuje-KIT-korektura.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>
</div>

<div class="collapsor__body">
<div class="row">
<div class = "col-md-6 align-self-center">
<div class = "handbook__perex">
<p>Seznamte se s moduly, které jsou obsaženy v našem Starter Bundle.</p>
</div>
<p>Základní funkcí tohoto balíčku je tlačítko. Ale protože je náš Core Module osazen i 3osým akcelerometrem a teploměrem, tak nám tato sestava vystačí na spoustu dalších projektů.</p>
<p><small><strong>Věděli jste?</strong> Akcelerometr už podle svého názvu měří pohybovou akceleraci – zrychlení (m/s2), a to ideálně ve všech třech osách trojrozměrného světa. Pak mluvíme o tzv. trojosém akcelerometru. Pokud bude akcelerometr namířený osou X vpřed, platí:

"X" – měří zrychlení pohybu dopředu a dozadu
"Y" – měří zrychlení pohybu doleva a doprava
"Z" – měří zrychlení pohybu nahoru a dolů
</small></p>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/3-infografika-dily-kitu.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

<div class="row">
<div class = "col-12">
<h2 class = "handbook__title">Postup sestavení:</h2>
</div>
<div class = "col-md-6 align-self-center">
<ol>
<li>Nasaďte černý <strong>Button Module</strong> na červený <strong>Core Module</strong>. Pro dodržení správné orientace je jeden pin na modulech vždy vynechán a jedna díra na konektoru zaslepená. Buďte při nasazování opatrní, ať se piny nezlomí. Ohnuté piny však můžete snadno narovnat.</li>
<li>Do žlutého <strong>Battery Modulu</strong> vložte <strong>baterie</strong> a nasaďte ho na druhou stranu červeného <strong>Core Module</strong>.</li>
<li>Celou sestavu vložte do <strong>krabičky vytištěné na 3D tiskárně</strong> a zajistěte <strong>gumičkami</strong>.</li>
<li>Nakonec složte <strong>USB Radio Dongle</strong>. Destičku vložte do černé krabičky s logem HARDWARIO.</li>
</ol>

<h3>Máte to správně, pokud:</h3>
<ul class = "checklist">
<li>
<label class="checkbox">baterie směřují dolů, ne nahoru,
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
<li>
<label class="checkbox">microUSB konektor vyčuhuje z krabičky.
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
</ul>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/skladacka.gif" alt="HARDWARIO Playground" style = "max-width:100%">
</div>

<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/mas-to-dobre-1.jpg" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/mas-to-dobre-2.jpg" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>
</div>
</div>


<div class="collapsor__item">
<div class="collapsor__header">
<div class="row">
<div class = "col-md-6 align-self-center">
<h2><span>Krok 2</span>Připravte si počítač</h2>
<span class = "font-red font-font2 font-weight-bold font-15 text-decoration-underline">Jdeme na to</span>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/4-ilustrace-kluk-u-PC-s-KITem.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

</div>

<div class="collapsor__body">
<div class="row">
<div class = "col-md-6 align-self-center ">
<div class = "handbook__perex">
<p>Pro konfiguraci sestavy, spárování s USB Radio Dongle a propojení s dalšími sestavami, budete potřebovat naši aplikaci <strong>HARDWARIO Playground</strong>. </p>
</div>
<ol>
<li><strong>Stáhněte si do počítače aplikaci Playground</strong>. Vyberte si z nabídky podle svého operačního systému.</li>
<li>Aplikaci spusťte.</li>
</ol>
</div>
<div class = "col-md-6 align-self-center text-center">
<img src="/_assets/images/starter-kit/gif-ikonka-playground.gif" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
<div class = "col-md-8 text-left">
{{< playground-download >}}
</div>
</div>

</div>
</div>

<div class="collapsor__item">
<div class="collapsor__header">
<div class="row">
<div class = "col-md-6 align-self-center">
<h2><span>Krok 3</span>Spárování sestavy s USB Radio Dongle</h2>
<span class = "font-red font-font2 font-weight-bold font-15 text-decoration-underline">Jdeme na to</span>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/5-ilustrace-kluk-zapojuje-Dongle.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

</div>

<div class="collapsor__body">
<div class="row justify-content-center">
<div class = "col-md-8 text-center">
<div class = "handbook__perex">
<p>Nyní propojíme hardware s aplikací, a sestavu začneme ovládat z počítače.</p>
</div>
</div>
</div>
<div class="row">
<div class = "col-md-6">
<ol>
<li><strong>Upozornění: Před párováním vyndejte ze sestavy baterie</strong>. </li>
<li>Nejdřív zasuňte <strong>USB Radio Dongle</strong> do USB portu vašeho počítače.</li>
<li>V aplikaci Playground klikněte na záložku <strong>Devices</strong>.</li>
<li>Klikněte na tlačítko <strong>Connect</strong>. Aplikace se připojí k vašemu USB Radio Dongle.</li>
<li>Klikněte na tlačítko <strong>Start pairing</strong>.</li>
<li>Nyní <strong>vložte do sestavy baterie</strong>. Tímto se do systému rádiem vyšle párovací signál. LED na Core Modulu červeně blikne, jako potvrzení vyslání párovacího signálu. </li>
<li>V seznamu zařízení se objeví ID vaší sestavy a ve sloupci Alias název „push-button:0” </li>
</ol>
</div>
<div class = "col-md-6">
<img src="/_assets/images/starter-kit/connect-gif.gif" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>
<div class="row">
<div class = "col-md-8">
<h3>Vše proběhne bezproblémově, pokud:</h3>
<ul class = "checklist">
<li>
<label class="checkbox">baterie byly vloženy až po kliknutí na tlačítko Start pairing.
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
<li>
<label class="checkbox">vaši sestava je spárována s USB Radio Dongle. To ověříte v aplikaci v záložce Messages. Když stisknete tlačítko, objeví se vám v seznamu zpráva.
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
<li>
<label class="checkbox">byly použity jenom <strong>moduly ze Starter Bundle</strong>, které jsme popsali v Kroku 1.
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
<li>
<label class="checkbox">v sestavě máte nahrán správný <strong>firmware pro Starter Bundle</strong>. Firmware je software nahraný v Core Module, který určuje funkce sestavy.<br/><br/>
Pokud Core Module používal někdo před vámi, může se stát, že je v něm nahraný firmware z jiného projektu. Ověřte si, že používáte firmware pro Starter Bundle. Klikněte do záložky „Devices”: vidíte ve sloupci <strong>alias</strong> napsané „push-button:0”? Pokud ne, <a href = "/cs/academy/jak-nahrat-firmware/">nainstalujte si firmware s názvem <strong>bcf-radio-push-button.</strong></a>.
<input type="checkbox">
<span class="checkmark"></span>
</label>
</li>
</ul>
</div>
</div>
</div>
</div>


<div class="collapsor__item">
<div class="collapsor__header">
<div class="row">
<div class = "col-md-6 align-self-center">
<h2><span>Krok 4</span>3 úvodní projekty na rozjezd</h2>
<span class = "font-red font-font2 font-weight-bold font-15 text-decoration-underline">Jdeme na to</span>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/6-ilustrace-devce-meri-teplotu.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

</div>

<div class="collapsor__body">
<div class="row justify-content-center">
<div class = "col-md-9 handbook__perex text-center">
<p>Nyní si ukážeme možnosti naší IoT stavebnice na 3 jednoduchých projektech./p>
</div>
</div>
<div class="row">
<div class = "col-12">
<h2 class = "handbook__title">I. Monitoring teploty ve vnitřním prostředí</h2>
</div>
<div class = "col-md-6">

<p>Vaše startovní sestava bude <strong>měřit okolní teplotu</strong>. Využití této funkce najdeme například v projektech monitoringu kvality vnitřního prostředí nebo prediktivní údržby.</p>

<ol>
<li>Spárujte USB Radio Dongle se sestavou <strong>podle návodu výše</strong>.</li>
<li>Otevřete v aplikaci záložku <strong>Messages</strong>. Automaticky uvidíte zprávy obsahující naměřenou teplotu. Teplota se měří každých 30 sekund a do systému odesílá data každých 15 minut. Pokud však dojde k nárůstu mezi dvěma měřeními o více než 0,2°C, dojde k okamžitému odeslání. Proto pro urychlení odeslání naměřené teploty a zobrazení zprávy v seznamu <strong>Messages</strong> na sestavu dýchněte teplý vzduch.</strong></li>
</ol>
<p><strong>Náš tip:</strong> Vložte sestavu na chvíli do lednice a sledujte, jak se mění teplota.</p>

</div>
<div class = "col-md-6">
<img src="/_assets/images/starter-kit/mereni-dechu.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

<div class="row">
<div class = "col-12 ">
<h2 class = "handbook__title">II. Monitoring orientace zařízení</h2>
</div>
<div class = "col-md-6">
<p>Vaše startovní sestava bude <strong>monitorovat otřes, náklon a svou orientaci</strong>. Využití této funkce najdete například jako hlásič neoprávněné manipulace a v projektech monioringu OEE (efektivnosti výrobních zařízení).</p>
<ol>
<li>Spárujte USB Radio Dongle s se sestavou <strong>podle návodu výše</strong>.</li>
<li>Otevřete v aplikaci záložku <strong>Messages</strong>. Automaticky uvidíte zprávy obsahující orientaci sestavy podle logiky házecí kostky. Pro urychlení odeslání nové polohy sestavy a zobrazení zprávy v seznamu <strong>Messages</strong> sestavou otáčejte.</strong></li>
</ol>
<p><strong>Náš tip:</strong> Použijte krabičku jako chytrou házecí kostku.</p>
</div>
<div class = "col-md-6">
<img src="/_assets/images/starter-kit/zmena-polohy.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

<div class="row">
<div class = "col-12">
<h2 class = "handbook__title">III. Univerzální tlačítko</h2>
</div>
<div class = "col-md-6">
<p>Jedněmi z nejvíce rozšířených IoT projektů jsou ty, které používají IoT tlačítko. Využití nachází v systémech ANDON nebo při počítání nekvalitních výrobků v rámci výpočtu OEE.</p>
<ol>
<li>Spárujte USB Radio Dongle se sestavou <strong>podle návodu výše</strong>.</li>
<li>Otevřete v aplikaci záložku <strong>Messages</strong>. Zmáčkněte tlačítko a uvidíte zprávy obsahující pořadové číslo zmáčknutí.</strong></li>
</ol>
<p><strong>Náš tip:</strong> V pokročilejších projektech se naučíte ještě zajímavější funkce. Třeba jak tlačítko propojit s aplikací na mobilním telefonu a generovat na něm notifikace.</p>

</div>
<div class = "col-md-6">
<img src="/_assets/images/starter-kit/pocitani-akce.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

<div class="row justify-content-center">
<div class = "col-md-8">
<img src="/_assets/images/starter-kit/9-komiks.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>
</div>
</div>

<div class="collapsor__item">
<div class="collapsor__header">
<div class="row">
<div class = "col-md-6 align-self-center">
<h2><span>Krok 5</span>Pokročilejší projekty pro váš další rozvoj</h2>
<span class = "font-red font-font2 font-weight-bold font-15 text-decoration-underline">Jdeme na to</span>
</div>
<div class = "col-md-6 align-self-center">
<img src="/_assets/images/starter-kit/7-ilustrace-kluk-sestavuje-zvonek.png" alt="HARDWARIO Playground" style = "max-width:100%">
</div>
</div>

</div>

<div class="collapsor__body">
<div class="row justify-content-center">
<div class = "col-md-8 handbook__perex text-center">
<p>Gratulujeme ke zvládnutí práce s naší stavebnicí a prvním IoT projektům! Nyní se můžete ponořit do <strong>pokročilejších projektů</strong> postavených na Starter Bundle.</p>
</div>
</div>

{{< handbook-projects >}}
</div>
</div>
