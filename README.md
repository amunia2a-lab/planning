# Garage Agenda Widget Notion — Lucide Icons

Version finale avec :
- Google Agenda connecté en live
- design compact type Notion
- icône style Notion via `lucide-react`
- fond transparent autour du widget
- couleurs Google Agenda (`colorId`) pour la barre de plaque et le badge intervention
- boutons `+ Nouveau RDV`, `< >` et `...` fonctionnels

## Format du titre Google Agenda

```txt
PLAQUE | CLIENT | TELEPHONE | INTERVENTION
```

Exemple :

```txt
AB-124-GD | Colin | 0612345678 | Embrayage
```

## Variables Vercel nécessaires

- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID`
