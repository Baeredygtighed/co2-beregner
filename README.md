# CO<sub>2</sub> Beregner

Følge-App til undervisningsforløb om bæredygtighed i byggeriet ved fællessekretariatet Byggeriets Uddannelser.

[Changelog](CHANGELOG.md)

Klon og installer projektet
```
$ git clone https://github.com/Baeredygtighed/co2-beregner.git .
$ npm install
```

## Branches
Opret udelukkende feature branches ud fra branchen "development".

## Pull-requests
Der må kun laves pull-requests fra development-branchen.

## Environment
Opret en fil ved navn `.env.local` i projektets rod med indholdet:

```env
MONGO_URI=<mongodb connection string>
```

(opdater denne readme fil med flere entries, hvis nødvendigt)