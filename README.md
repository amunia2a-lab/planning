# Garage Agenda Widget Notion — Clean Final

Version finale propre :
- design compact type Notion
- icône fine style Notion
- fond transparent autour du widget
- couleurs reprises depuis Google Agenda (`colorId`)
- bouton `...` ouvre le bon événement
- flèches `< >` changent le jour
- `+ Nouveau RDV` ouvre la création d'un événement Google Agenda

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
