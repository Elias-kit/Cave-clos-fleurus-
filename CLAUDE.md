# CLAUDE.md — Cave Clos Fleurus

Ce fichier donne à Claude Code tout le contexte nécessaire pour travailler efficacement sur ce projet.

---

## 🍷 Présentation du projet

Site web vitrine pour la **Cave Clos Fleurus**, cave à vin & bar à vins parisien situé dans le 6ème arrondissement, à deux pas du Jardin du Luxembourg.

**Objectif :** Site one-page élégant, responsive, sans framework lourd.

---

## 📁 Structure des fichiers

```
cave-clos-fleurus/
├── CLAUDE.md
├── index.html       # Structure HTML complète (one-page)
├── style.css        # Styles, variables CSS, responsive
├── script.js        # Interactions JS (menu mobile, scroll, badge ouvert/fermé)
└── assets/
    └── images/      # Photos de la cave (placeholder si absentes)
```

---

## 🏪 Informations de l'établissement

| Champ        | Valeur                                      |
|--------------|---------------------------------------------|
| Nom          | Cave Clos Fleurus                           |
| Propriétaire | Guillaume (sommelier passionné)             |
| Adresse      | 5 Rue de Fleurus, 75006 Paris               |
| Téléphone    | 06 27 18 65 82                              |
| Note Google  | 4,8 / 5 — 74 avis                           |
| Type         | Cave à vin & Comptoir de dégustation        |
| Fondée       | Décembre 2021                               |

### Horaires
| Jour              | Horaires        |
|-------------------|-----------------|
| Lundi             | Fermé           |
| Mardi – Vendredi  | 11h00 – 20h30   |
| Samedi            | 11h00 – 20h30   |
| Dimanche          | 11h00 – 19h30   |

---

## 🎨 Design system

### Palette de couleurs
```css
--color-bordeaux:   #722F37;   /* couleur principale */
--color-or:         #C9A84C;   /* accents dorés */
--color-creme:      #F5F0E8;   /* fond clair */
--color-noir:       #1A1A1A;   /* texte principal */
--color-blanc:      #FAFAF7;   /* fond blanc cassé */
```

### Typographie
- **Titres** : Playfair Display (Google Fonts) — serif élégant
- **Corps** : Lato ou Inter (Google Fonts) — sans-serif lisible
- **Taille base** : 16px

### Style général
- Élégant, chaleureux, artisanal — pas corporate
- Animations CSS douces au scroll (fade-in, slide-up)
- Séparateurs dorés entre sections
- Ombres douces, textures subtiles (bois, pierre)
- Hero sombre avec dégradé bordeaux/noir

---

## 📐 Sections du site (ordre d'affichage)

1. **#hero** — Nom, accroche, 2 boutons CTA
2. **#about** — Histoire de Guillaume, esprit du lieu, proximité Luxembourg
3. **#selection** — Cards : Vins / Spiritueux / Bières / Terroir
4. **#services** — Dégustation, dîners vignerons, événements privés, livraison
5. **#avis** — Témoignages clients + badge note Google
6. **#contact** — Horaires, carte Google Maps, formulaire, téléphone

---

## 💬 Avis clients à afficher

```
"Superbe cave à vins, sélection sur la Bourgogne essentiellement.
Guillaume est de très bon conseil !" — Melissa O. ⭐⭐⭐⭐⭐

"Charmant caviste/bar à côté du jardin du Luxembourg. Excellent choix de
vins avec une planche de charcuterie. Accueil sympathique et compétent." — TripAdvisor ⭐⭐⭐⭐⭐

"Le propriétaire était si aimable en préparant la commande parfaite de vin
mousseux pour nous. Quel régal !" — Google Review ⭐⭐⭐⭐⭐

"Excellente cave du quartier. Guillaume est un passionné, il vous écoutera
et le vin vous surprendra !" — Google Review ⭐⭐⭐⭐⭐
```

---

## ⚙️ Spécifications techniques

- **Stack :** HTML5 + CSS3 + JavaScript vanilla (zéro framework)
- **CDN autorisés :** Google Fonts, Font Awesome 6
- **Responsive :** Mobile-first (breakpoints : 480px, 768px, 1024px)
- **Navigation :** Sticky navbar desktop / Menu hamburger mobile
- **Scroll :** Smooth scroll entre ancres
- **Accessibilité :** Balises sémantiques, attributs aria, contraste WCAG AA
- **SEO :** Meta tags complets (title, description, og:title, og:image)
- **Carte :** Google Maps iframe (5 Rue de Fleurus, 75006 Paris)

---

## ✨ Fonctionnalités JavaScript

### Badge Ouvert / Fermé (priorité haute)
Calcule automatiquement si la cave est ouverte selon les horaires :
```
Lundi        → toujours FERMÉ
Mar-Sam      → OUVERT de 11h00 à 20h30
Dimanche     → OUVERT de 11h00 à 19h30
```
Affiche un badge vert "Ouvert" ou rouge "Fermé · ouvre à HH:MM" dans le header.

### Autres
- Menu hamburger mobile (toggle classe `active`)
- Animations au scroll avec `IntersectionObserver`
- Bouton WhatsApp flottant → `https://wa.me/33627186582`
- Smooth scroll sur les liens de navigation

---

## 🛍️ Offre & Services

**Produits vendus :**
- Vins français de petits producteurs (spécialité Bourgogne + Champagne)
- Spiritueux de distilleries familiales françaises
- Bières artisanales
- Produits gourmands du terroir (charcuterie, saucissons corses…)

**Services :**
- Dégustation & repas au comptoir
- Vente à emporter
- Livraison à domicile
- Drive disponible
- Dîners vignerons (cuisine sur place)
- Événements privés (tablées +10 personnes)
- Afterworks & anniversaires

**Infos pratiques :**
- Chiens acceptés
- CB / NFC acceptés
- Parking payant dans la rue
- Toilettes non genrées

---

## 🚀 Commandes utiles

```bash
# Ouvrir le site en local
open index.html
# ou
npx serve .

# Vérifier le HTML
npx html-validate index.html

# Minifier le CSS (optionnel)
npx clean-css-cli style.css -o style.min.css
```

---

## 📌 Conventions de code

- Indentation : **2 espaces**
- Commentaires sections CSS : `/* === NOM SECTION === */`
- IDs HTML en kebab-case : `#hero`, `#about`, `#nos-selections`
- Classes CSS en BEM simplifié : `.card`, `.card__title`, `.card--featured`
- Variables CSS définies dans `:root`
- JS : `const` / `let` uniquement, pas de `var`
- Pas de jQuery, pas de frameworks CSS

---

## 📝 Notes importantes

- Pas de backend nécessaire (site statique)
- Le formulaire de contact peut pointer vers Formspree ou rester en placeholder
- Les images sont des placeholders si non fournies (utiliser des dégradés bordeaux)
- Le site doit être déployable directement sur GitHub Pages ou Netlify sans configuration
