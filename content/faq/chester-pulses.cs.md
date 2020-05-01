---
title: Můžu s CHESTERem snímat pulzy (beznapěťový kontakt)?
weight: 60
---

Ano, CHESTER se doplní o modul X0D a naprogramuje podle vašeho zadání, které nám prosím zašlete. V případě čítače pulzů reagujeme na obě hrany (náběžná / sestupná) - při zpracování je tedy žádoucí výsledek dělit 2. Dále CHESTER reaguje na hrany pomocí interruptů a dokáže počítat teoreticky velice rychle (odhadujeme v řádu stovek kilohertz). To, co ho ale "brzdí", tak je RC článek (low-pass filtr) implementovaný na CHESTER-X0D, jehož mezní kmitočet je cca 530 Hz (potlačení 3 dB). Např. pro délku impulzu 32 ms (cca 15 Hz za předpokladu střídy signálu 1:1) bude CHESTER fungovat správně.
