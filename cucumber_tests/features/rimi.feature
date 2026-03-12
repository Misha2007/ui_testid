Feature: Rimi e-poe UI testid

Scenario: Rimi kodulehe avamine
  Given kasutaja avab Rimi kodulehe
  Then koduleht peaks laadima edukalt

Scenario: Toote otsimine
  Given kasutaja avab Rimi kodulehe
  When kasutaja otsib toodet "piim"
  Then otsingutulemused peaksid sisaldama toodet

Scenario: Kategooria avamine
  Given kasutaja avab Rimi kodulehe
  When kasutaja avab kategooria "Valmistoit"
  Then kategooria leht peaks avanema