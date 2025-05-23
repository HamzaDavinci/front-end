let games = [
    {
        "title": "Counter-Strike: Global Offensive",
        "price": 0.00,
        "genre": "FPS",
        "rating": 4
    },
    {
        "title": "Dota 2",
        "price": 0.00,
        "genre": "MOBA",
        "rating": 3
    },
    {
        "title": "Goose Goose Duck",
        "price": 4.99,
        "genre": "Action",
        "rating": 2
    },
    {
        "title": "Apex Legends",
        "price": 0.00,
        "genre": "FPS",
        "rating": 4
    },
    {
        "title": "PUBG: BATTLEGROUNDS",
        "price": 29.99,
        "genre": "FPS",
        "rating": 5
    },
    {
        "title": "Lost Ark",
        "price": 49.99,
        "genre": "Action",
        "rating": 1
    },
    {
        "title": "Grand Theft Auto V",
        "price": 29.99,
        "genre": "FPS",
        "rating": 3
    },
    {
        "title": "Call of Duty®: Modern Warfare® II | Warzone™ 2.0",
        "price": 19.99,
        "genre": "FPS",
        "rating": 3
    },
    {
        "title": "Team Fortress 2",
        "price": 0.00,
        "genre": "FPS",
        "rating": 5
    },
    {
        "title": "Rust",
        "price": 39.99,
        "genre": "Action",
        "rating": 5
    },
    {
        "title": "Unturned",
        "price": 0.00,
        "genre": "RPG",
        "rating": 1
    },
    {
        "title": "ELDEN RING",
        "price": 59.99,
        "genre": "RPG",
        "rating": 5
    },
    {
        "title": "ARK: Survival Evolved",
        "price": 10.00,
        "genre": "RPG",
        "rating": 1
    },
    {
        "title": "War Thunder",
        "price": 0.00,
        "genre": "Simulation",
        "rating": 2
    },
    {
        "title": "Sid Meier's Civilization VI",
        "price": 29.99,
        "genre": "Simulation",
        "rating": 3
    },
    {
        "title": "Football Manager 2023",
        "price": 59.99,
        "genre": "Simulation",
        "rating": 3
    },
    {
        "title": "Warframe",
        "price": 0.00,
        "genre": "Looter-shooter",
        "rating": 3
    },
    {
        "title": "EA SPORTS™ FIFA 23",
        "price": 59.99,
        "genre": "Sport",
        "rating": 1
    },
    {
        "title": "Destiny 2",
        "price": 0.00,
        "genre": "FPS",
        "rating": 5
    },
    {
        "title": "Red Dead Redemption 2",
        "price": 59.99,
        "genre": "RPG",
        "rating": 4
    },
    {
        "title": "Tom Clancy's Rainbow Six Siege",
        "price": 19.99,
        "genre": "Simulation",
        "rating": 3
    },
    {
        "title": "The Witcher 3: Wild Hunt",
        "price": 39.99,
        "genre": "RPG",
        "rating": 4
    },
    {
        "title": "Terraria",
        "price": 9.99,
        "genre": "Sandbox",
        "rating": 2
    },
    {
        "title": "Stardew Valley",
        "price": 14.99,
        "genre": "Sandbox",
        "rating": 1
    },
    {
        "title": "Left 4 Dead 2",
        "price": 9.99,
        "genre": "FPS",
        "rating": 4
    },
    {
        "title": "Don't Starve Together",
        "price": 5.09,
        "genre": "RPG",
        "rating": 3
    },
    {
        "title": "MIR4",
        "price": 19.99,
        "genre": "RPG",
        "rating": 3
    },
    {
        "title": "PAYDAY 2",
        "price": 9.99,
        "genre": "Action",
        "rating": 2
    },
    {
        "title": "Path of Exile",
        "price": 0.00,
        "genre": "RPG",
        "rating": 4
    },
    {
        "title": "Project Zomboid",
        "price": 14.99,
        "genre": "Simulation",
        "rating": 4
    },
    {
        "title": "Valheim",
        "price": 19.99,
        "genre": "Sandbox",
        "rating": 5
    },
    {
        "title": "DayZ",
        "price": 44.99,
        "genre": "Simulation",
        "rating": 3
    }
]

let winkelMand = [];

function updateWinkelMand() {
    winkelMand = [];
    const checkboxes = document.querySelectorAll(".select-circle");
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            winkelMand.push(checkbox.dataset.title);
        }
    });
    sessionStorage.setItem('winkelMand', JSON.stringify(winkelMand));
}

function loadWinkelMand() {
    const savedWinkelMand = sessionStorage.getItem('winkelMand');
    if (savedWinkelMand) {
        winkelMand = JSON.parse(savedWinkelMand);
    }
}

function updateGenre(genre) {
    sessionStorage.setItem('selectedGenre', genre);
    filterGames();
}

function updateRating(rating) {
    sessionStorage.setItem('selectedRating', rating);
    filterGames();
}

function updatePrice(price) {
    sessionStorage.setItem('selectedPrice', price);
    filterGames();
}

function resetPriceFilter() {
    sessionStorage.removeItem('selectedPrice');
    filterGames();
}

function filterGames() {
    const selectedGenre = sessionStorage.getItem('selectedGenre');
    const selectedRating = sessionStorage.getItem('selectedRating');
    const selectedPrice = sessionStorage.getItem('selectedPrice');
    const allGames = document.querySelectorAll(".game-row");

    allGames.forEach(gameRow => {
        const gameGenre = gameRow.dataset.genre;
        const gameRating = parseInt(gameRow.dataset.rating);
        const gamePrice = parseFloat(gameRow.dataset.price);

        const matchGenre = !selectedGenre || selectedGenre === "Alle genres" || gameGenre === selectedGenre;
        const matchRating = !selectedRating || gameRating >= parseInt(selectedRating); // aangepast
        const matchPrice = !selectedPrice || gamePrice <= parseFloat(selectedPrice);

        if (matchGenre && matchRating && matchPrice) {
            gameRow.style.display = "flex";
        } else {
            gameRow.style.display = "none";
        }
    });
}

let genreDropdown = document.getElementById("genreDropdown");
let genres = ["Alle genres", ...new Set(games.map(game => game.genre))];

genres.forEach(genre => {
    let genreItem = document.createElement("a");
    genreItem.textContent = genre;
    genreItem.href = "#";
    genreItem.addEventListener("click", function () {
        updateGenre(genre);
    });
    genreDropdown.appendChild(genreItem);
});

let mainContainer = document.getElementById("gameContainer");

games.forEach(game => {
    let group = document.createElement("div");
    group.classList.add("game-row");
    group.dataset.genre = game.genre;
    group.dataset.rating = game.rating;
    group.dataset.price = game.price;

    let select = document.createElement("input");
    select.setAttribute("type", "checkbox");
    select.classList.add("select-circle");
    select.dataset.title = game.title;
    select.checked = winkelMand.includes(game.title);
    select.addEventListener("change", updateWinkelMand);
    group.appendChild(select);

    let section = document.createElement("section");
    section.classList.add("section-flex"); // flex container

    // Linkerkant: titel + genre + rating in een div
    let leftContainer = document.createElement("div");
    leftContainer.classList.add("left-content");

    // Titel
    let header = document.createElement("h3");
    header.classList.add("section-header");
    header.innerText = game.title;

    // Genre en rating
    let genreLine = document.createElement("div");
    genreLine.innerText = `Genre: ${game.genre}`;

    let ratingLine = document.createElement("div");
    ratingLine.innerText = `Rating: ${game.rating}/5`;

    leftContainer.appendChild(header);
    leftContainer.appendChild(genreLine);
    leftContainer.appendChild(ratingLine);

    // Prijs rechts
    let price = document.createElement("span");
    price.classList.add("price");
    if(game.price == 0){
        price.innerText = `FREE`;
    }
    else{
        price.innerText = `€ ${game.price.toFixed(2)}`;
    }

    section.appendChild(leftContainer);
    section.appendChild(price);

    group.appendChild(section);
    mainContainer.appendChild(group);
});




const ratingBtn = document.getElementById("ratingLabel");

ratingBtn.addEventListener("click", () => {
    const currentRating = sessionStorage.getItem('selectedRating');

    if (!currentRating) {
        let input = prompt("Geef een rating tussen 1 en 5:");
        let rating = parseInt(input);

        if (!isNaN(rating) && rating >= 1 && rating <= 5) {
            sessionStorage.setItem("selectedRating", rating);
            filterGames();
            alert(`Rating ${rating} is opgeslagen.`);
        } else {
            alert("Ongeldige rating. Voer een getal in van 1 t/m 5.");
        }
        return; 

    }

    const confirmReset = confirm("Je hebt al een ratingfilter. Wil je deze resetten?");
    if (confirmReset) {
        sessionStorage.removeItem('selectedRating');
        filterGames();
        alert("Ratingfilter is gereset.");
    }
});

const priceBtn = document.getElementById("priceLabel");

priceBtn.addEventListener("click", () => {
    const currentPrice = sessionStorage.getItem('selectedPrice');

    if (!currentPrice) {
        let input = prompt("Geef een prijs in:");

        let price = parseFloat(input);

        if (!isNaN(price) && price >= 0) {
            sessionStorage.setItem("selectedPrice", price);
            filterGames();
            alert(`Prijsfilter ingesteld op €${price}.`);
        } else {
            alert("Ongeldige prijs. Voer een geldig getal in.");
        }
        return;
    }

    const confirmReset = confirm("Je hebt al een prijsfilter. Wil je deze resetten?");
    if (confirmReset) {
        resetPriceFilter();
        alert("Prijsfilter is gereset.");
    }
});

window.onload = function () {
    loadWinkelMand();  // Laadt de winkelmand uit sessionStorage

    const savedGenre = sessionStorage.getItem('selectedGenre');
    const savedRating = sessionStorage.getItem('selectedRating');
    const savedPrice = sessionStorage.getItem('selectedPrice');

    // Update de winkelmand checkboxes na het laden van de winkelmand uit sessionStorage
    const checkboxes = document.querySelectorAll(".select-circle");
    checkboxes.forEach(checkbox => {
        // Markeer de items die in de winkelmand staan
        if (winkelMand.includes(checkbox.dataset.title)) {
            checkbox.checked = true;
        }
    });

    // Filter de games indien er filters zijn opgeslagen
    if (savedGenre || savedRating || savedPrice) {
        filterGames();
    }
};

const link = document.createElement("a");
link.id = "berekenen";
link.textContent = "Bereken";
link.setAttribute("onclick", "");
mainContainer.appendChild(link);

const berekenKnop = document.getElementById("berekenen");

berekenKnop.addEventListener("click", () => {
    // Verberg navbar
    const navbar = document.querySelector("nav");
    if (navbar) {
        navbar.style.display = "none";
    }

    // Pas titel aan
    const overzichtTitel = document.getElementById("overzichtTitel");
    if (overzichtTitel) {
        overzichtTitel.textContent = "Winkelmandje";
    }

    // Verberg alle filters behalve winkelmand
    const filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
        if (!filter.classList.contains("winkelmand-filter")) {
            filter.style.display = "none";
        }
    });

    // Toon alleen winkelmand-items
    const alleGames = document.querySelectorAll(".game-row");
    alleGames.forEach(row => {
        const titel = row.querySelector("input.select-circle")?.dataset.title;
        if (winkelMand.includes(titel)) {
            row.style.display = "flex";
        } else {
            row.style.display = "none";
        }
    });

    // Bereken totaalprijs
    let totaal = 0;
    games.forEach(game => {
        if (winkelMand.includes(game.title)) {
            totaal += game.price;
        }
    });

    // Update alleen de tekst van de knop
    berekenKnop.textContent = `${totaal.toFixed(2)}`;

    const digitsVoorKomma = Math.floor(totaal).toString().length;

    if (digitsVoorKomma === 1) {
        berekenKnop.style.marginLeft = "92%";
    } else if (digitsVoorKomma === 2) {
        berekenKnop.style.marginLeft = "90.7%";
    } else {
        berekenKnop.style.marginLeft = "89.4%";
    }
});
