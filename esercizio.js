/*
* Nella pagina HTML dovrai creare:
- Un elemento select per scegliere il film.
- Un input di tipo number per inserire il numero di biglietti desiderati.
- Un bottone con il testo "Prenota".
- Un elemento HTML in cui visualizzare l'esito della prenotazione.
- Una tabella che mostri tutti i film disponibili.
*
* */

/*
* Quando l'utente clicca sul bottone "Prenota":
1. Recupera il film e la quantità selezionati.
2. Crea e Invoca una funzione bookTickets().
3. Mostra un messaggio di conferma oppure di errore.
4. Se la prenotazione è riuscita, aggiorna la tabella senza ricaricare la pagina, mostrando il nuovo numero di posti disponibili.
*
*  RICORDA: si possono modificare direttamente gli oggetti contenuti nell'array movies (al ricaricamento della pagina torneranno allo stato originale)
* */

/*
* PARTE 3: Funzionalità aggiuntive
* Una volta completate le prime due parti, aggiungi queste funzionalità.
*
* 1. Se vengono prenotati almeno 5 biglietti contemporaneamente, applica automaticamente uno sconto del 20% sul totale. e fai apparire un elemento con scritto "Il totale da pagare è <totaleCosti>"
* 2. Se un film raggiunge zero posti disponibili, nella tabella deve comparire la scritta "SOLD OUT" al posto del numero di posti.
* 3. Inserisci un elemento HTML che mostri il numero totale di biglietti prenotati dall'apertura della pagina, che si aggiorna automaticamente ad ogni prenotazione
* */


const movies = [{
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    price: 8.50,
    availableSeats: 45
}, {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    price: 9.00,
    availableSeats: 30
}, {
    id: 3,
    title: "Titanic",
    genre: "Romance",
    price: 7.50,
    availableSeats: 60
}, {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    price: 9.50,
    availableSeats: 25
}, {
    id: 5,
    title: "Avatar",
    genre: "Fantasy",
    price: 10.00,
    availableSeats: 50
}, {
    id: 6,
    title: "Gladiator",
    genre: "Action",
    price: 8.00,
    availableSeats: 35
}, {
    id: 7,
    title: "The Matrix",
    genre: "Sci-Fi",
    price: 7.00,
    availableSeats: 20
}, {
    id: 8,
    title: "Joker",
    genre: "Drama",
    price: 8.50,
    availableSeats: 15
}, {
    id: 9,
    title: "Oppenheimer",
    genre: "Drama",
    price: 10.50,
    availableSeats: 40
}, {
    id: 10,
    title: "Dune",
    genre: "Sci-Fi",
    price: 9.00,
    availableSeats: 5
}, {
    id: 11,
    title: "The Prestige",
    genre: "Thriller",
    price: 8.00,
    availableSeats: 18
}, {
    id: 12,
    title: "Whiplash",
    genre: "Drama",
    price: 7.50,
    availableSeats: 22
}, {
    id: 13,
    title: "Parasite",
    genre: "Thriller",
    price: 8.50,
    availableSeats: 28
}, {
    id: 14,
    title: "The Lion King",
    genre: "Animation",
    price: 7.00,
    availableSeats: 55
}, {
    id: 15,
    title: "Toy Story",
    genre: "Animation",
    price: 6.50,
    availableSeats: 40
}];

const selectFilm = document.getElementById("selectFilm");
const tableBody = document.getElementById("tableBody");
const nrTickets = document.getElementById("nrTickets");
const bookButton = document.getElementById("bookButton");
const resultPrenotation = document.getElementById("resultPrenotation");
const seat = document.getElementById("td")

bookButton.addEventListener("click",bookTickets)

// creo la lista di film da poter scegliere
for (let i = 0; i < movies.length; i++) {
    const listFilm = document.createElement("option")
    listFilm.innerText = movies[i].title
    listFilm.value = movies[i].id
    selectFilm.appendChild(listFilm)
}

//creo la tabella
for (let i = 0; i < movies.length; i++) {
    // 1. Creo la riga della tabella
    const row = document.createElement("tr");

    // 2. Creo una cella per ogni proprietà che vuoi mostrare
    const titleCell = document.createElement("td");
    titleCell.innerText = movies[i].title;

    const genreCell = document.createElement("td");
    genreCell.innerText = movies[i].genre;

    const priceCell = document.createElement("td");
    priceCell.innerText = movies[i].price;

    const seatsCell = document.createElement("td");
    seatsCell.innerText = movies[i].availableSeats;

    // 3. Aggiungo tutte le celle alla riga
    row.appendChild(titleCell);
    row.appendChild(genreCell);
    row.appendChild(priceCell);
    row.appendChild(seatsCell);

    // 4. Aggiungo la riga completa al corpo della tabella
    tableBody.appendChild(row);

    seatsCell.id = movies[i].id
}

//Recupero in oggetto l' array del film e la quantità di biglietti immessa dall' utente

function filmAndQuantity() {
    const ticketQuantity = nrTickets.value
    const valueFilmId = selectFilm.value
    let film = null
    for (let i = 0; i < movies.length; i++) {
        if (Number(valueFilmId) === movies[i].id) {
            film = movies[i]
        }
        
        }
        return {
            film: film,
            quantity: ticketQuantity
    }
}

//Creo la funzione per aggiornare i posti disponibili mostrati in tabella

function refreshTable(id, avaiableSeats){
const seatsCell = document.getElementById(id)
seatsCell.innerText = avaiableSeats
}

//creo la funzione per fornire l' esito della prenotazione e scalare i posti disponibili

function bookTickets() {
    const message = document.createElement("p")
    resultPrenotation.innerHTML = ""
    const bookTicket = filmAndQuantity()
    let remainSeat = 0
    for (let i = 0; i < movies.length; i++) {
        if (bookTicket.film.id === movies[i].id) {
            if (bookTicket.quantity > movies[i].availableSeats || movies[i].availableSeats === 0) {
                message.innerText = "Errore, posti prenotati maggiori di quelli disponibili!"
            }else if (bookTicket.quantity <= movies[i].availableSeats){
                message.innerText = `Prenotazione effettuata, per il film: ${bookTicket.film.title} di  ${bookTicket.quantity} biglietti`
                
            }
            remainSeat = movies[i].availableSeats - bookTicket.quantity
            
            resultPrenotation.appendChild(message)
            if(remainSeat > 0){
                refreshTable(bookTicket.film.id, remainSeat)
                movies[i].availableSeats = remainSeat
            }else{
                refreshTable(bookTicket.film.id, 0)
            }
        }
    }
}

