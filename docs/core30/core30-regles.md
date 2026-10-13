# Core 30 — Règles complètes (copie de référence)

Copie intégrale du fichier `CORE30-REGLES.md` rédigé par le client pour le projet ALI-KA (garage, Bruxelles), déposée ici le 13/10/2026 pour servir de référence à Toiture Veryroof. Les sections 5 (NAP Ali-Ka), 10 (GBP Ali-Ka) et 14 (données auto) sont propres au garage : seuls les principes s'appliquent ici. L'adaptation au métier de couvreur est dans `regles-veryroof.md`.

---

# CORE 30 — Règles Complètes pour le SEO Local

Ce document résume TOUTES les règles de la méthodologie Core 30 appliquées au site Ali-Ka.
Utilise-le comme base pour générer un prompt complet.

---

## 1. STRUCTURE DU SITE (Architecture en Silo)

### Principe
Le site doit refléter exactement la structure du Google Business Profile (GBP) :
- **1 page d'accueil** = l'entité principale (le garage)
- **Pages catégorie** = les catégories GBP (Pneus, Vidange, Mécanique, Entretien, Contrôle technique)
- **Pages service** = les services individuels listés dans GBP

### Hiérarchie
```
index.html (homepage)
├── pneus/index.html (catégorie — Magasin de pneus)
│   └── services/pneus-etterbeek.html
├── vidange/index.html (catégorie — Service de vidange d'huile)
│   ├── services/vidange-etterbeek.html
├── mecanique/index.html (catégorie — Mécanicien)
│   ├── services/freins-etterbeek.html
│   ├── services/direction-suspension-etterbeek.html
│   ├── services/diagnostic-moteur-etterbeek.html
│   └── services/echappement-etterbeek.html
├── entretien/index.html (catégorie — Atelier de réparation automobile)
│   ├── services/batterie-etterbeek.html
│   ├── services/climatisation-etterbeek.html
│   ├── services/filtre-habitacle-etterbeek.html
│   ├── services/eclairage-etterbeek.html
│   └── services/demarreur-alternateur-etterbeek.html
└── controle-technique/index.html (catégorie — Contrôle technique)
    └── services/controle-technique-etterbeek.html
```

### Règle de nommage
- Pages service : `[service]-[ville].html` (ex: `freins-etterbeek.html`)
- Toujours inclure la ville dans le nom du fichier

---

## 2. LES 8 SIGNAUX DE COHÉRENCE DE LA HOMEPAGE

La homepage DOIT contenir ces 8 éléments obligatoires :

1. **Title tag** — Contient le nom du commerce + la ville + le type d'activité
2. **H1** — Nom du commerce + ville (ex: "Garage Automobile Etterbeek")
3. **H2 par catégorie** — Un H2 pour chacune des 5 catégories GBP avec texte ~100 mots + lien éditorial vers la page catégorie
4. **Google Maps embed** — iframe Google Maps avec l'emplacement exact
5. **Widget avis** — Avis Google intégrés (ou lien vers les avis)
6. **NAP complet** — Nom, Adresse, Téléphone identiques caractère par caractère au GBP
7. **Numéro de téléphone cliquable** — `tel:+32XXXXXXXXX` dans le header
8. **Schema LocalBusiness** — JSON-LD complet avec @type, name, address, telephone, openingHours, geo, sameAs

---

## 3. PAGES CATÉGORIE — Règles

### Structure obligatoire
- **H1** = Nom de la catégorie + ville (ex: "Mécanique Automobile Etterbeek")
- **1 H2 par service** de cette catégorie
- Chaque H2 a un bloc de texte de **~100 mots minimum**
- Chaque bloc contient un **lien éditorial** (dans le texte, pas en navigation) vers la page service

### Lien éditorial vs lien de navigation
- **Lien éditorial** = dans le corps du texte, avec un ancre descriptive (ex: "notre service de freins à Etterbeek")
- **Lien de navigation** = header, footer, sidebar → ne transmet PAS d'autorité SEO
- Seuls les **liens éditoriaux** comptent pour le maillage interne

---

## 4. PAGES SERVICE — Règles

### Structure obligatoire
- **Title tag** = [Service] [Ville] — [Nom du commerce]
- **Meta description** = ~155 caractères, inclut service + ville + téléphone
- **Canonical URL** = URL absolue de la page
- **H1** = Service + Ville (ex: "Freins Etterbeek")
- **Breadcrumb** = Accueil / Catégorie / Service
- **Contenu principal** = 400-600 mots minimum, avec H2 thématiques
- **FAQ** = 4-5 questions avec réponses (basées sur de vraies questions de forums)
- **CTA sidebar** = Téléphone + adresse
- **Maillage interne** = 3-5 liens éditoriaux vers d'autres pages service pertinentes

### Schema JSON-LD obligatoire
Chaque page service doit avoir un `@graph` avec :
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "...",
      "description": "...",
      "provider": {
        "@type": "AutoRepair",
        "name": "Ali-Ka",
        "telephone": "02 647 47 01",
        "address": { "@type": "PostalAddress", ... }
      },
      "areaServed": [{ "@type": "City", "name": "Etterbeek" }, ...]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
      ]
    }
  ]
}
```

---

## 5. NAP — COHÉRENCE ABSOLUE

### Règle d'or
Le NAP (Name, Address, Phone) doit être **identique caractère par caractère** partout :
- Sur le site (header, footer, sidebar, schema)
- Sur le GBP
- Sur tous les annuaires (Yelp, Pages Jaunes, etc.)

### NAP Ali-Ka
```
Nom :     Ali-Ka
Adresse : Avenue des Casernes 10, 1040 Etterbeek
Tél :     02 647 47 01
```

### Points de vigilance
- Pas de variation (ex: "Av. des Casernes" vs "Avenue des Casernes")
- Même format de téléphone partout
- Vérifier les anciens noms commerciaux (ex: "Chasse Pneus" à la même adresse)

---

## 6. MAILLAGE INTERNE — Règles

### Principe
- Chaque page service doit avoir **3-5 liens éditoriaux** vers d'autres pages service
- Les liens doivent être **contextuellement pertinents** (freins → contrôle technique, pas freins → climatisation)
- Les ancres doivent être **descriptives** (pas "cliquez ici" mais "notre service de freins à Etterbeek")
- **Varier les ancres** — ne pas toujours utiliser la même formulation

### Flux de liens recommandé
- Pages catégorie → pages service (liens éditoriaux dans les H2)
- Pages service → autres pages service (liens éditoriaux dans le contenu)
- Homepage → pages catégorie (dans les blocs H2)
- Footer → toutes les pages service (liens de navigation, valeur SEO limitée)

---

## 7. LIENS EXTERNES — "PAS AI SLOP"

### Principe Core 30
Ajouter des liens sortants vers des **sources d'autorité réelles** pour montrer que le contenu s'appuie sur de vraies informations, pas du contenu généré par IA.

### Types de sources acceptables
- **Sites gouvernementaux** : lez.brussels, environnement.brussels
- **Organismes officiels** : autocontrole.be, autosecurite.be
- **Associations de consommateurs** : test-achats.be
- **Clubs automobiles** : touring.be
- **Agences de sécurité routière** : awsr.be, vias.be
- **Marques de référence** : michelin.be (guides techniques)
- **Médias auto reconnus** : moniteurautomobile.be

### Règles
- Toujours `target="_blank" rel="noopener"`
- Intégrer **dans le texte** de manière naturelle (pas une liste de liens)
- 1-2 liens externes par page maximum
- Le lien doit apporter une **vraie valeur** au lecteur

---

## 8. FAQ — Règles

### Source des questions
- Chercher sur les **vrais forums** (BricoZone, Reddit, Caradisiac, Que Choisir)
- Identifier les **vraies questions** que les gens posent
- Ne PAS inventer des questions génériques

### Structure
- 4-5 questions par page
- Réponses de 2-4 phrases
- Inclure un lien interne dans au moins 1 réponse
- Les questions doivent être dans le schema JSON-LD FAQPage ET dans le HTML visible

### Exemples de vraies questions trouvées sur les forums
- "Pneus hiver ou 4 saisons à Bruxelles ?" (BricoZone)
- "Un voyant allumé fait-il échouer le CT ?" (forums auto)
- "La recharge clim est-elle une arnaque ?" (Caradisiac, Que Choisir)
- "Pourquoi ma batterie lâche après des trajets courts ?" (Europ-Assistance)
- "Mon diesel Euro 5 est-il interdit à Bruxelles ?" (RTBF, forums)

---

## 9. CONTENU — Anti-Détection IA

### Règles de rédaction
- **Varier les longueurs de paragraphes** : mélanger courts (2-3 lignes) et longs (6-8 lignes)
- **Varier le ton entre les pages** : chaque page doit avoir sa propre personnalité
- **Varier les ouvertures** : question, constat, anecdote, statistique, scénario
- **Phrases courtes ET longues** dans le même paragraphe
- **Pas de structure répétitive** : ne pas faire intro → liste → conclusion sur chaque page
- **Utiliser des références locales concrètes** : noms de rues, quartiers, situations réelles
- **Éviter le vocabulaire IA** : pas de "dans un monde où...", "il est important de noter que...", "n'hésitez pas à..."

### Tons utilisés pour Ali-Ka (un par page)
| Page | Ton |
|------|-----|
| Pneus | Direct, confident, ami expert |
| Freins | Sérieux, sécurité, statistiques d'impact |
| Batterie | Storytelling hivernal, sensoriel |
| Climatisation | Myth-busting, transparent, honnête |
| Diagnostic | Analogies médicales, vulgarisation |
| Vidange | Didactique, pédagogique, patient |
| Direction/Suspension | Terrain, vécu, rues bruxelloises |
| Échappement | Journalistique, actualité LEZ |
| Contrôle technique | Coach, checklist, rassurant |
| Éclairage | Court, sec, percutant, sans bavardage |
| Filtre habitacle | Santé, bien-être, qualité de l'air |
| Liquide refroidissement | Préventif, calme, méthodique |
| Démarreur/Alternateur | Logique diagnostique, si/alors |

---

## 10. GOOGLE BUSINESS PROFILE — Synchronisation

### Catégories GBP
1. Magasin de pneus (principale)
2. Mécanicien
3. Atelier de réparation automobile
4. Service de vidange d'huile
5. Contrôle technique

### Services GBP (doivent correspondre aux pages du site)
Chaque service listé dans le GBP doit avoir :
- Une page dédiée sur le site
- Un H2 sur la page catégorie correspondante
- Une mention sur la homepage

### Description GBP
- Maximum 750 caractères
- Inclure : nom, ville, services principaux, ancienneté, adresse
- Mots-clés naturels, pas de bourrage

---

## 11. FICHIERS TECHNIQUES

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://www.ali-ka.be/sitemap.xml
```

### sitemap.xml
- Lister TOUTES les pages (homepage + catégories + services)
- Format : `<url><loc>https://www.ali-ka.be/...</loc></url>`
- Mettre à jour à chaque ajout/suppression de page

### Images
- Attribut `alt` descriptif avec mot-clé + ville
- Format : `alt="Vidange moteur chez Ali-Ka à Etterbeek"`
- Dimensions `width` et `height` spécifiées
- Images optimisées (WebP si possible)

---

## 12. ÉLÉMENTS SEO ON-PAGE

### Pour chaque page
- **Title** : < 60 caractères, mot-clé + ville + marque
- **Meta description** : < 155 caractères, mot-clé + ville + CTA (téléphone)
- **Canonical** : URL absolue
- **H1** : unique, mot-clé + ville
- **H2** : thématiques, pas de bourrage
- **URL** : courte, descriptive, avec ville

### Schema LocalBusiness (homepage uniquement)
```json
{
  "@type": "LocalBusiness",
  "additionalType": "AutoRepair",
  "name": "Ali-Ka",
  "address": { ... },
  "telephone": "02 647 47 01",
  "openingHoursSpecification": [ ... ],
  "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." },
  "sameAs": [ "liens vers réseaux sociaux et annuaires" ],
  "image": "...",
  "priceRange": "€€"
}
```

---

## 13. RECHERCHE FORUMS — Méthodologie

### Pourquoi
Le Core 30 recommande de chercher ce que les vrais gens disent sur les forums pour :
- Trouver les **vraies questions** pour les FAQ
- Identifier les **préoccupations réelles** (prix, confiance, arnaque)
- Trouver des **données concrètes** (statistiques, prix moyens)
- Sourcer des **liens externes crédibles**
- Créer du contenu qui **résonne** avec le vécu des gens

### Où chercher
- BricoZone.be (forum bricolage/auto belge)
- Reddit r/belgium, r/brussels
- Caradisiac (forum auto francophone)
- Que Choisir (consommateurs)
- Bolid.be (comparateur garages)
- Test-Achats (études consommateurs)
- Touring.be (club automobile)
- RTBF, BX1 (médias belges pour l'actu)

### Quoi extraire
- Questions récurrentes → FAQ
- Prix mentionnés → transparence tarifaire
- Plaintes → points de réassurance dans le contenu
- Conseils → contenu à valeur ajoutée
- Sources citées → liens externes

---

## 14. DONNÉES LOCALES BRUXELLES À INTÉGRER

### LEZ (Zone de Basses Émissions)
- Depuis 01/01/2026 : diesel Euro 5 et essence Euro 2 interdits
- 353 caméras de contrôle
- 2030 : tous les diesel interdits
- 2035 : tous les essence interdits
- Site officiel : lez.brussels

### Contrôle technique
- Cause #1 refus : éclairage
- Cause #2 : freinage (40% des revisites)
- Cause #3 : direction/suspension (15%)
- Voyant allumé = refus automatique
- Site officiel : autocontrole.be

### Pneus
- Hiver non obligatoire en Belgique (mais recommandé < 7°C)
- Profondeur légale : 1,6 mm minimum
- Risque aquaplaning dès 2 mm
- 4 saisons : compromis acceptable pour conduite urbaine < 15 000 km/an

### Batterie
- Perd 20% capacité à 0°C, 60% à -10°C
- Durée de vie moyenne : 4-5 ans
- Trajets courts = ennemi #1 de la batterie

### Prix de référence (marché belge)
- Vidange : 60€ - 326€ (moyenne 97€)
- Plaquettes frein/axe : 80€ - 250€
- Batterie : 70€ - 213€
- Recharge clim R134a : 50€ - 100€
- Recharge clim R1234YF : 139€ - 300€
- Montage pneu : 7,50€ - 25€/pneu

---

## 15. CHECKLIST FINALE

Avant de publier, vérifier :

- [ ] Chaque page a un title tag unique avec service + ville
- [ ] Chaque page a une meta description unique < 155 caractères
- [ ] Chaque page a un canonical URL
- [ ] Chaque page a un H1 unique avec service + ville
- [ ] Le NAP est identique partout (site + GBP + annuaires)
- [ ] Le schema JSON-LD est présent et valide sur chaque page
- [ ] Chaque page service a 3-5 liens éditoriaux internes
- [ ] Chaque page service a 1-2 liens externes vers des sources d'autorité
- [ ] Les FAQ sont basées sur de vraies questions de forums
- [ ] Les FAQ sont dans le HTML ET dans le schema JSON-LD
- [ ] Le ton varie entre les pages (pas de structure répétitive)
- [ ] Les paragraphes varient en longueur
- [ ] Le sitemap.xml liste toutes les pages
- [ ] Le robots.txt autorise le crawl
- [ ] Les images ont des alt descriptifs
- [ ] Le GBP reflète exactement la structure du site
- [ ] Les horaires sont corrects sur le site ET le GBP
