# Explore The World

My engineering thesis, a travel planning app.

## Tech Stack

**Frontend:** React native, Google Maps, Typescript, Expo

**Database:** Firebase


## Installation

```npm
  npm install
```

## .env variables

```
REACT_APP_KEY=
REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_ID=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=

```

## User flow

Oto przykładowy user flow dla aplikacji mobilnej do planowania podróży:

1. **Strona główna aplikacji:**

    - Użytkownik otwiera aplikację.
    - Pojawia się mapa jako główny ekran.
    - Na mapie można zobaczyć oznaczenia ulubionych miejsc użytkownika.

   **Interakcje:**

    - Użytkownik może przeciągnąć mapę, aby zobaczyć różne miejsca.
    - Na górze ekranu znajduje się przycisk "Utwórz nową podróż".

2. **Tworzenie nowej podróży:**

    - Użytkownik naciska przycisk "Utwórz nową podróż".
    - Pojawi się ekran umożliwiający wprowadzenie danych o nowej podróży, takie jak nazwa, data rozpoczęcia i
      zakończenia, opis, zdjęcie itp.
    - Użytkownik może także wybrać miejsca na mapie, które chce dodać do swojej podróży.

   **Interakcje:**

    - Użytkownik wprowadza dane podróży.
    - Użytkownik wybiera miejsca na mapie i dodaje je do planowanej podróży.

3. **Panel użytkownika:**

    - Po utworzeniu lub zalogowaniu się użytkownik ma dostęp do panelu użytkownika.
    - Panel użytkownika zawiera zakładki takie jak "Zaplanowane podróże", "Najbliższa podróż", "Ulubione miejsca" i "
      Znajomi".

   **Interakcje:**

    - Użytkownik może wybrać dowolną zakładkę, aby przejść do odpowiedniego widoku.

4. **Zaplanowane podróże:**

    - Użytkownik klika na zakładkę "Zaplanowane podróże".
    - Pojawi się lista wszystkich jego zaplanowanych podróży.
    - Użytkownik może kliknąć na konkretną podróż, aby zobaczyć jej szczegóły.

   **Interakcje:**

    - Użytkownik może przeglądać listę i wybierać konkretne podróże do przeglądania.

5. **Najbliższa podróż:**

    - Użytkownik klika na zakładkę "Najbliższa podróż".
    - Pojawi się widok informujący użytkownika o nadchodzącej podróży, jeśli taka istnieje.

6. **Ulubione miejsca:**

    - Użytkownik klika na zakładkę "Ulubione miejsca".
    - Pojawi się lista ulubionych miejsc użytkownika.

   **Interakcje:**

    - Użytkownik może przeglądać listę ulubionych miejsc i wybrać konkretne miejsce do przeglądania.

7. **Znajomi:**

    - Użytkownik klika na zakładkę "Znajomi".
    - Pojawi się lista jego znajomych.
    - Po kliknięciu na znajomego użytkownik zobaczy listę podróży, które dany znajomy zaplanował.

   **Interakcje:**

    - Użytkownik może wybierać znajomych i przeglądać ich zaplanowane podróże.

To jest ogólny user flow dla aplikacji do planowania podróży. Oczywiście, mogą pojawić się dodatkowe funkcje i
interakcje, w zależności od szczegółów projektu.

## Authors

- [@Zyrekk](https://github.com/Zyrekk)
