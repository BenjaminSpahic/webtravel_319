# Turistički Portal

Ovo je web aplikacija za putovanja koja omogućava korisnicima pregled putovanja, postavljanje pitanja, rezervacije, kao i administraciju (upravljanje putovanjima i korisnicima) od strane administratora.

---

## Sadržaj

- [Preduvjeti](#preduvjeti)
- [Instalacija i pokretanje](#instalacija-i-pokretanje)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Konfiguracija baze podataka](#konfiguracija-baze-podataka)
- [Korištenje aplikacije](#korištenje-aplikacije)
- [Administratorske opcije](#administratorske-opcije)
- [Dodatne napomene](#dodatne-napomene)

---

## Preduvjeti

- **Node.js** (preporučena verzija 14 ili novija)
- **npm** (ili yarn)
- **MySQL** server (ili kompatibilna SQL baza podataka)

---

## Instalacija i pokretanje

### Backend

1. **Klone ili preuzmi repozitorij:**

   ```bash
   git clone https://github.com/vas-korisnicki-username/turisticki-portal.git
   cd turisticki-portal/backend
Instaliraj potrebne pakete:


npm install

Kreiraj .env fajl u folderu backend sa sljedećim varijablama:

env
Copy
MYSQL_HOST=localhost
MYSQL_USER=vaš_mysql_korisnik
MYSQL_PASSWORD=vaša_mysql_lozinka
MYSQL_DATABASE=ime_vaše_baze
MYSQL_PORT=3306
JWT_SECRET=vaš_tajni_ključ
PORT=5000
Pokreni backend server:


npm start
Nakon pokretanja, server će slušati na portu definiranom u .env fajlu (po defaultu 5000).

Frontend
U drugom terminalu otvori folder frontend:

bash
Copy
cd turisticki-portal/frontend
Instaliraj potrebne pakete:

bash
Copy
npm install
Pokreni frontend aplikaciju:

bash
Copy
npm start
Frontend će se pokrenuti na adresi http://localhost:3000.

Konfiguracija baze podataka
Kreirajte bazu podataka s imenom koje ste naveli u .env fajlu.

Instaliraj MySQL i MySQL Workbench ako nisu već instalirani.
Otvori MySQL Workbench.
Kreiraj novu, praznu bazu:
Idi na Server > Data Import.
Odaberi Import from Self-Contained File i izaberi .sql fajl.
Pod Default Target Schema, izaberi kreiranu bazu.
Klikni Start Import.

Korištenje aplikacije
Prijava i registracija: Korisnici se mogu registrovati i prijaviti putem odgovarajućih stranica. Nakon prijave, token se sprema u localStorage i koristi se za autorizaciju API zahtjeva.

Pregled putovanja: Na početnoj stranici i stranici "Pogledaj putovanja" korisnici mogu vidjeti dostupna putovanja. Klikom na dugme "Detalji putovanja" otvara se detaljna stranica sa informacijama, slikom, pitanjima i recenzijama.

Rezervacije: Korisnici mogu rezervisati putovanja, postavljati pitanja i ostavljati recenzije.

Administracija: Administrator (korisnik sa ulogom admin) ima dodatne opcije, kao što su kreiranje, ažuriranje i brisanje putovanja te upravljanje korisnicima i recenzijama.

Administratorske opcije
Pregled i upravljanje putovanjima: Administrator može dodavati nova putovanja, uređivati postojeća i brisati ih.

Upravljanje korisnicima: Administrator može pregledavati sve korisnike, dodavati nove korisnike, ažurirati podatke i deaktivirati korisnike.

Recenzije i pitanja: Administrator može brisati recenzije ako je potrebno.

Dodatne napomene
CORS: Backend koristi CORS middleware kako bi omogućio komunikaciju između frontend i backend servera.
Token autentifikacija: Svi zahtjevi koji zahtijevaju autorizaciju koriste JWT token koji se generira prilikom prijave.
Debug: Koristite konzolu (npr. Postman, browser konzolu) za praćenje grešaka i debugiranje API zahtjeva.
Kako pokrenuti aplikaciju
Pokreni MySQL server i kreiraj bazu podataka koristeći SQL skripte.
Konfiguriraj .env fajl u backend folderu s ispravnim vrijednostima.
Instaliraj backend ovisnosti i pokreni backend server (npm install i npm start).
Instaliraj frontend ovisnosti i pokreni frontend aplikaciju (npm install i npm start u frontend folderu).
Otvorite browser i idite na http://localhost:3000 da koristite aplikaciju.
Testiranje API ruta
Da biste testirali API rute, možete koristiti Postman ili sličan alat. Primjeri ruta:

Putovanja:
GET http://localhost:5000/api/travels
GET http://localhost:5000/api/travels/1

Pitanja:
POST http://localhost:5000/api/travels/1/questions
GET http://localhost:5000/api/travels/1/questions

Recenzije:
POST http://localhost:5000/api/travels/1/reviews
GET http://localhost:5000/api/travels/1/reviews

Rezervacije:
POST http://localhost:5000/api/bookings

