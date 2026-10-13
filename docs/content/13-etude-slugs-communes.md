# 13 — Étude : quel mot-clé dans le slug des pages communes ? (13/10/2026)

Source : DataForSEO, Google Ads search volume, Belgique, français (moyenne 12 mois sept. 2025 → août 2026), difficulté DataForSEO Labs quand disponible. Question du client : « couvreur », « toiturier » ou « toiture » + commune ?

## Volumes par commune (recherches / mois)

| Commune | couvreur X | toiturier X | toiture X | Terme dominant | Note |
|---|---|---|---|---|---|
| Bruxelles | **480** (KD —) | 390 (KD 11) | **480** (KD 31) | égalité couvreur / toiture | « entreprise de toiture bruxelles » 40 |
| Uccle | **260** | 210 ¹ | 210 ¹ | couvreur | ¹ séries mensuelles identiques : Google fusionne « toiturier uccle » et « toiture uccle » en une seule variante (210, pas 420) |
| Waterloo | **170** | 70 | 110 | couvreur ≈ toiture + toiturier (180) | CPC « toiture waterloo » 16 € : requête très commerciale |
| Watermael-Boitsfort | < 10 | < 10 | **20** (+ « toiture boitsfort » 10) | toiture | page de proximité |
| Rhode-Saint-Genèse | < 10 | < 10 | **30** | toiture | NL : « dakwerker sint-genesius-rode » < 10 |
| Wavre | **110** | 50 | 70 | couvreur | |
| Ixelles | **70** | < 10 | 40 | couvreur | |
| Auderghem | **70** | < 10 | 40 | couvreur | |
| Braine-l'Alleud | 40 | 20 | **170** (compétition MEDIUM 35) | toiture, nettement | meilleure opportunité de la périphérie |
| Nivelles | 40 | 110 ¹ | **110** ¹ | toiture / toiturier | ¹ variantes fusionnées |
| Anderlecht | 20 | — | **50** | toiture | |
| Etterbeek | < 10 | — | **50** | toiture | |
| Woluwe | < 10 | — | **40** | toiture | |
| Schaerbeek | 10 | < 10 | **20** | toiture | |
| Forest | < 10 | — | 20 | toiture | « forest » ambigu (anglais) |
| La Hulpe | < 10 | < 10 | < 10 | — | pas de page tant que le volume est nul |
| Brabant wallon (région) | 50 | — | **70** | toiture | page régionale à prévoir |

Lecture : « couvreur » domine dans les communes bruxelloises du sud-est à fort volume (Uccle, Ixelles, Auderghem) et à Wavre ; « toiture » domine en Brabant wallon (Braine-l'Alleud, Nivelles) et dans les communes bruxelloises à faible volume. « toiturier » n'est jamais seul en tête : c'est une variante que Google regroupe souvent avec « toiture » (Uccle, Nivelles). Les trois termes ont une intention commerciale locale (SERP : local pack + entreprises).

## Ce que pèse le slug

Le slug est un signal faible ; title, H1 et première phrase pèsent bien plus. Les pages actuelles contiennent déjà les trois termes dans le title et le H1 (« Couvreur à Uccle, toiturier : … toiture »), ce qui couvre tout le groupe de requêtes quel que soit le slug. Changer un slug ne vaut donc le coup que si le terme dominant est franchement différent.

## Recommandation

1. **Pages existantes : garder `couvreur-<commune>`.** Uccle et Waterloo : « couvreur » est le terme dominant ou à égalité. Boitsfort et Rhode : les volumes sont de 20 à 30/mois, le title et le H1 portent déjà « toiture » et « toiturier » ; renommer n'apporterait rien de mesurable et casserait la cohérence des quatre premières pages.
2. **Prochaines communes : le slug suit le terme dominant, avec deux motifs seulement.** `couvreur-<commune>` quand « couvreur » mène (Wavre, Ixelles, Auderghem) ; `toiture-<commune>` quand « toiture » mène d'au moins 1,5× (Braine-l'Alleud, Nivelles, Anderlecht, Etterbeek, Woluwe, Schaerbeek). Dans les deux cas, title et H1 portent les trois termes ; pour un slug « toiture », le H1 commence par « Toiture <commune> : couvreur, toiturier… » (le validateur devra autoriser ce second motif).
3. **Ordre de création par opportunité** (volume du groupe × difficulté) : Braine-l'Alleud (230, compétition faible) → Wavre (230) → Nivelles (150) → Ixelles (110) → Auderghem (110) → page régionale « toiture Brabant wallon » (120) → Anderlecht (70) → Etterbeek (50) → Woluwe (40). La Hulpe : attendre.
4. **Néerlandais** : « dakwerker brussel » 110/mois, « dakwerker ukkel » 10 : une version NL ne se justifie que pour Bruxelles entière (phase 2 prévue au Prompt 0), pas par commune.

## À noter pour la rédaction

- Les variantes fusionnées par Google (Uccle, Nivelles) signifient qu'une page qui vise « toiture X » capte aussi « toiturier X » : inutile d'écrire les deux partout, une mention de chaque dans le H1 suffit.
- CPC de 10 à 17 € sur Uccle, Waterloo et Bruxelles : ces requêtes valent cher, ce qui justifie d'y consacrer les pages les plus soignées (avis, photos de chantier réelles, sources).
