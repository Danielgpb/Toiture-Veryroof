# Prompt 8 — SEO technique : mise en place et vérification (13 octobre 2026)

Site statique Astro, domaine `https://toiture-veryroof.be`, déploiement prévu sur Netlify (`public/_redirects`, Netlify Forms). Tout ce qui suit est vérifié automatiquement par `npm run verify` (tests unitaires, build, contrôle des liens, tests sur le HTML construit dont `tests/built/technical-seo.test.mjs`).

## 1. Sitemap et robots
- `sitemap.xml` généré à la construction par `src/pages/sitemap.xml.ts` à partir des données du site : **42 URL** (accueil 1.0 hebdomadaire ; 5 hubs 0.8 ; page Services 0.7 ; 26 pages enfants et générales 0.6 ; 4 pages communes 0.6 ; À propos, Contact, Zones 0.5 ; Mentions légales et Politique de confidentialité 0.3 annuel), `lastmod` = date du build.
- `public/robots.txt` : `User-agent: * / Allow: /`, `Disallow: /admin/` et `/api/` (routes inexistantes, par précaution), `Sitemap: https://toiture-veryroof.be/sitemap.xml`.
- Nombre de pages : 44 fichiers HTML = 42 pages indexables + `404.html` + `index.html` (redirection 301 vers `/couvreur-bruxelles`). Conforme à l'architecture (40 pages SEO + 2 pages légales).

## 2. Schéma (JSON-LD, dans le `<head>` de chaque page)
- Accueil : `RoofingContractor` (`@id` `https://toiture-veryroof.be/#organisation`, nom, adresse complète avec `addressRegion`, téléphone, e-mail, `priceRange` « €€ », image, `areaServed` = 43 communes), 2 `Service` (services phares), `FAQPage` (7 questions). `openingHoursSpecification` et `sameAs` à ajouter quand horaires et profils seront connus (commentaire en place).
- Hubs : `Service` (`serviceType` = nom de page, `provider` → `@id` organisation, `areaServed` = Bruxelles + Région de Bruxelles-Capitale, description, `hasOfferCatalog` des enfants) + `BreadcrumbList` + organisation.
- Enfants : `Service` (`isRelatedTo` → parent) + `BreadcrumbList` (4 niveaux) + organisation. Services : `ItemList`. À propos : organisation (Person à ajouter avec les vraies informations du gérant). Contact : `ContactPage` + `contactPoint`.
- Test : chaque bloc est du JSON valide, `@context` schema.org, même `@id` et même NAP (adresse, téléphone) sur toutes les pages qui portent un schéma. Erreurs trouvées et corrigées pendant ce prompt : `addressRegion` manquait sur hubs et enfants ; `areaServed` des services limité à la ville.

## 3. Balises meta
- Title unique ≤ 60 caractères et description unique ≤ 160 caractères sur les 42 pages (corrigés ce jour : À propos, Contact, Services, Zones, Politique de confidentialité). Un seul H1 par page, mot-clé principal dans title et H1 (tests `seo-uniqueness` et `technical-seo`).
- Hiérarchie des titres sans saut de niveau (H1 → H2 → H3) vérifiée sur chaque page.
- `<html lang="fr">`, viewport, canonique auto-référente (`cleanPath`, sans `.html`), favicon SVG + PNG 192/512, `apple-touch-icon`, `site.webmanifest`, `theme-color`.
- Open Graph sur chaque page : `og:type` website, `og:site_name`, `og:locale` fr_BE, `og:title`, `og:description`, `og:url` (= canonique), `og:image` (photo du hero sur accueil, hubs et enfants ; image générique `/images/og-default.jpg` 1200×630 ailleurs) ; Twitter `summary_large_image`.

## 4. Maillage interne (audit)
- Accueil → 5 hubs dans le contenu, Services, À propos, Contact. Services → les 31 pages services. Hubs → tous leurs enfants + lien accueil dans le texte. Enfants → parent (CTA, « même famille », fil d'Ariane). Toutes les pages → accueil, Services, À propos, Contact (navigation).
- `scripts/check-links.mjs` : 2 124 liens internes vérifiés, aucun lien cassé, aucune page orpheline, aucune ancre `#` hors `#main` (lien d'évitement) et `#devis` (formulaire), aucune URL avec slash final ou `.html`. Pages statiques : chaque lien charge la page en haut.

## 5. Mobile (vérifié sur un viewport 375 × 812 via le serveur de prévisualisation)
- Numéro cliquable `tel:` sur chaque page (barre haute, hero, CTA, pied de page). Menu burger 48 × 48 px : s'ouvre, se ferme au second clic et à la sélection d'un lien ; liens du menu de 55 px de haut.
- Bouton flottant « Appeler » (bas droite, 16 px des bords, 54 px de haut, lien `tel:`) sur toutes les pages ; sur l'accueil, barre collante à deux boutons (appel + devis).
- Aucun défilement horizontal (largeur de défilement = largeur d'écran) sur accueil, hub, enfant et 404. Cibles tactiles : boutons ≥ 48 px ; fil d'Ariane et liens « En savoir plus » portés à ≥ 44 px ce jour.

## 6. Performance (Lighthouse 12, mobile simulé, serveur de prévisualisation local)
| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Accueil | 100 | 100 | 100 | 100 | 1,8 s | 0 |
| Réparation de toiture (hub) | 100 | 100 | 100 | 100 | 0,9 s | 0,03 |
| Réparation de fuite de toiture (enfant) | 100 | 100 | 100 | 100 | 0,9 s | 0 |

Images en WebP avec `width`/`height`, chargement différé sauf l'image du hero (préchargée, `fetchpriority="high"`), CSS/JS minifiés par Astro, police Google chargée sans bloquer le rendu (`media="print"` puis `all`). Les scores réels en production dépendront de l'hébergeur et du réseau ; à remesurer sur l'URL publique.

## 7. Page 404
`src/pages/404.astro` : en-tête et pied de page du site, H1 « Page introuvable », message, boutons Accueil et Services, numéro de téléphone, liste des 5 familles de services et lien Contact. Netlify sert `404.html` automatiquement.

## 8. Informations en attente (version publiable sans trou, 13/10/2026)
À la demande du client, plus aucun encadré « à compléter » n'est visible : chaque élément qui dépend d'une information non encore fournie est masqué, et réapparaît automatiquement dès que le champ correspondant de `pending` (ou `site.vat`) est rempli dans `src/data/site.ts`. Les emplacements restent signalés par des commentaires HTML dans les gabarits.

| Information attendue | Champ | Où elle réapparaît |
|---|---|---|
| Numéro d'entreprise (BCE) et TVA | `site.vat` | À propos (confiance), mentions légales, politique de confidentialité, pied de page |
| Forme juridique | `pending.legalForm` | mentions légales |
| Hébergeur (nom, adresse) et note sur les transferts de données | `pending.host`, `pending.hostTransferNote` | mentions légales, politique (en attendant : « coordonnées disponibles sur demande ») |
| Durée de conservation des demandes de devis | `pending.retentionMonths` | politique (en attendant : formulation par critères, admise par l'article 13 du RGPD) |
| Horaires du bureau | `pending.officeHours` | Contact, bandeau final de l'accueil |
| Histoire de l'entreprise | `pending.story` | À propos (la section affiche entre-temps une présentation factuelle) |
| Gérant (nom, fonction, qualifications, années, bio, photo) | `pending.manager` | section « Rencontrez le gérant » + `founder` dans le schéma |
| Vidéo de présentation | `pending.videoEmbed` | section « En vidéo » |
| Fiche Google (code d'intégration) | `pending.gbpEmbed` | section « Retrouvez-nous sur Google » |
| Avis Google (code d'intégration) | `pending.reviewsEmbed` | section « Avis » de l'accueil |
| Réseaux sociaux (URL) | `pending.social` | section « Suivez-nous » + icônes du pied de page |
| Année de création, certifications | `pending.founded`, `pending.certifications` | À propos (confiance) |

E-mail confirmé le 13/10/2026 : `contact@toiture-veryroof.be` (affiché sur Contact, pied de page, pages légales et schéma). Formulaire : Netlify Forms (`name="devis"`, honeypot), notification e-mail à configurer dans Netlify après le déploiement. Rappel légal : le numéro d'entreprise doit figurer sur le site d'une société belge ; il s'affichera dès réception.

Test de garde (`technical-seo.test.mjs`) : aucune page ne contient de texte entre crochets, de « photo à remplacer » ni de réseau « à venir », et toutes les adresses `mailto:` sont celles de `site.email`.

## 9. Recommandations
1. **Sortir le projet du dossier Bureau synchronisé par iCloud** (ou exclure le dossier) : la synchro crée des copies « page 2.html » pendant le build. `postbuild` les supprime et `check-links` les signale, mais un déploiement depuis un dossier synchronisé reste risqué.
2. Créer la fiche Google avec la catégorie principale « Entreprise de toiture », relever la liste des services prédéfinis et aligner leurs noms sur les pages du site (voir étude de mots-clés, § 7).
3. Auto-héberger la police Plus Jakarta Sans (RGPD : Google Fonts transfère l'adresse IP ; la politique de confidentialité le mentionne) quand le site sera en production.
4. Fournir les deux images manquantes du plan photos (37, 38) pour dédoubler les heros Isolation/Sarking et Dépannage/Tempête.
5. Après mise en ligne : Search Console (sitemap), Bing Webmaster, remesure Lighthouse sur l'URL publique, test des résultats enrichis (Service, FAQ, fil d'Ariane).
