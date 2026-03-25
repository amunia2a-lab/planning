# Garage Agenda Widget Notion

Widget planning premium pour Notion, connecté à Google Agenda.

## Ce que fait ce projet

- affiche les vrais rendez-vous du jour depuis Google Agenda
- garde un design premium intégré à Notion
- bouton `+ Nouveau RDV` ouvre la création d'un événement Google Agenda
- boutons `< >` changent le jour affiché
- bouton `...` ouvre le bon événement Google Agenda
- parsing du titre au format :

```txt
PLAQUE | CLIENT | TELEPHONE | INTERVENTION
```

Exemple :

```txt
AB-124-GD | Colin | 0612345678 | Embrayage
```

---

## 1. Installation avec GitHub et Vercel

### A. Créer le repo GitHub

1. Crée un nouveau repository GitHub
2. Nom conseillé :

```txt
garage-agenda-widget-notion
```

3. Téléverse le contenu de ce dossier à la racine du repo

Tu dois avoir directement :

```txt
app/
lib/
package.json
tsconfig.json
next.config.mjs
next-env.d.ts
README.md
```

Pas de dossier parent autour.

---

### B. Importer dans Vercel

1. Va sur Vercel
2. Clique sur **Add New Project**
3. Importe le repo GitHub
4. Vérifie :

- Framework : **Next.js**
- Root Directory : vide
- Build Command : `next build`
- Output Directory : laisser par défaut

5. Déploie

---

## 2. Format des rendez-vous dans Google Agenda

Le titre de chaque événement doit être écrit comme ça :

```txt
PLAQUE | CLIENT | TELEPHONE | INTERVENTION
```

Exemples valides :

```txt
AB-124-GD | Colin | 0612345678 | Embrayage
EF-456-HJ | Martin | 06 98 45 12 33 | Révision
GH-782-KL | Dupont | 0677541028 | Diagnostic
```

Le widget va lire automatiquement :
- plaque
- client
- téléphone
- intervention

---

## 3. Connecter Google Agenda

Le plus simple est d'utiliser un **agenda dédié**.

### A. Créer ou choisir l'agenda

Dans Google Agenda, crée un agenda dédié, par exemple :

```txt
Garage
```

C'est cet agenda qui sera lu par le widget.

---

### B. Créer le projet Google Cloud

1. Ouvre Google Cloud Console
2. Crée un projet, par exemple :

```txt
garage agenda widget notion
```

3. Active **Google Calendar API**

---

### C. Créer un compte de service

Dans Google Cloud, en français :

1. **IAM et administration**
2. **Comptes de service**
3. **Créer un compte de service**

Nom conseillé :

```txt
garage-agenda-widget-notion
```

Clique sur **Créer et continuer**, puis **Terminer**.

---

### D. Créer la clé JSON

1. Ouvre le compte de service
2. Onglet **Clés**
3. **Ajouter une clé**
4. **Créer une clé**
5. Choisir **JSON**

Un fichier JSON sera téléchargé.

---

### E. Partager l'agenda avec le compte de service

1. Ouvre Google Agenda
2. Va dans **Paramètres et partage** de ton agenda dédié
3. Dans **Partager avec des personnes ou des groupes**
4. Ajoute l'email du compte de service

Dans le JSON, c'est la valeur :

```json
"client_email": "xxxx@xxxx.iam.gserviceaccount.com"
```

5. Donne l'autorisation :

```txt
Afficher tous les détails des événements
```

---

## 4. Variables d'environnement Vercel

Dans Vercel :

1. Ouvre ton projet
2. **Settings**
3. **Environment Variables**

Ajoute :

### GOOGLE_CLIENT_EMAIL

Valeur :
- le `client_email` du JSON

### GOOGLE_PRIVATE_KEY

Valeur :
- le `private_key` du JSON
- en gardant les `\n`

Exemple de format attendu dans Vercel :

```txt
-----BEGIN PRIVATE KEY-----\nXXXXX\nXXXXX\n-----END PRIVATE KEY-----\n
```

### GOOGLE_CALENDAR_ID

Valeur :
- l'identifiant exact de l'agenda Google

Pour le trouver :
1. Google Agenda
2. Paramètres de l'agenda
3. **Intégrer l'agenda**
4. copier **Identifiant de l'agenda**

Ce n'est pas toujours juste l'adresse Gmail.

---

## 5. Redéployer

Quand les variables Vercel sont ajoutées :

1. sauvegarde
2. lance un nouveau déploiement
3. si besoin : **Redeploy**

---

## 6. Si ça ne marche pas

### Cas 1 — API Google désactivée

Erreur typique :

```txt
Google Calendar API has not been used in project ... before or it is disabled
```

Solution :
- activer Google Calendar API
- attendre quelques minutes
- redéployer

### Cas 2 — agenda introuvable

Erreur typique :

```txt
Not Found
```

Solution :
- vérifier `GOOGLE_CALENDAR_ID`
- vérifier que l'agenda est bien partagé au compte de service

### Cas 3 — rien ne s'affiche

Vérifie :
- le titre des événements
- le partage du calendrier
- les variables Vercel
- le déploiement le plus récent

---

## 7. Développement local

Installer les dépendances :

```bash
npm install
```

Lancer :

```bash
npm run dev
```

---

## 8. Nom du projet

Nom retenu :

```txt
garage agenda widget notion
```
