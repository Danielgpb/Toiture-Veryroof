# Images à intégrer — déposez-les ici

Les photos du 12/10/2026 ont été retirées (chantier partagé). Le site affiche des visuels neutres temporaires
en attendant les images générées ou de vraies photos.

Comment faire :
1. Générez l'image avec le prompt correspondant (docs/content/photos-plan.md, ou la liste envoyée dans la conversation).
2. Enregistrez-la EXACTEMENT sous le nom de fichier indiqué (ex. `toiture-ardoises-naturelles-maison-bruxelloise.jpg`), JPG ou PNG.
3. Déposez-la dans ce dossier, puis lancez `npm run photos` : l'image remplace le visuel temporaire du même nom,
   est redimensionnée (1600 px max), optimisée et débarrassée de ses métadonnées. Rien d'autre à changer.

Vraies photos (équipe, camionnette, avant / après) : même principe, nommez-les `equipe-toiture-veryroof.jpg`,
`camionnette-toiture-veryroof.jpg`, `…-avant.jpg` / `…-apres.jpg`. Une photo au nom inconnu est ignorée (le script le signale).
