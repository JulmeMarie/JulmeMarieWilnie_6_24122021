class Photographer {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    /**
     * Cette méthode permet d'écouter les clics utilisateur sur ue carte (article) photographe
     */
    static addEventListenerToAll() {
        var articles = document.getElementsByTagName("article");

        Array.prototype.forEach.call(articles, function(anArticle) {
            anArticle.addEventListener('click', function() {
                window.location.assign("photographer.html?photographerId=" + this.id);
            });
        });
    }

    /**
     * Cette méthode permet de retourner un article contenant une carte photographe
     * @returns string article html
     */
    displayList() {
        return `<article id="${this.id}">
        <img src="assets/images/photographers/${this.portrait}" alt="${this.name}">
        <h2>${this.name}</h2>
        <div>
            <div>${this.city}, ${this.country}</div>
            <div>${this.tagline}</div>
            <div>${this.price}€/jour</div>
        </div>
        </article>`;
    }

    /**
     * Cette méthode permet de créer l'entête de la page photographe html
     * @returns 
     */
    displayPhotographHeader() {
        return `<article id="${this.id}">
        <h2>${this.name}</h2>
        <div>
            <div>${this.city}, ${this.country}</div>
            <div>${this.tagline}</div>
        </div>
        </article>
        <button class="contact_button">Contactez-moi</button>
        <img src="assets/images/photographers/${this.portrait}" alt="${this.name}">`;
    }

    /**
     * Cette méthode permet de créer le tri par popularité, date et titre
     * @returns 
     */
    displayPhotographTri() {
        return `<label for="tri">Trier par :</label> 
            <select id="tri">
                <option value="popularite">Popularité</option>
                <option value="date">Date</option>
                <option value="titre">Titre</option>
            </select>`;
    }

    /**
     * Cette méthode permet de créer la popularité du photographe ainsi que son prix journalier
     * @returns 
     */
    displayPopularitePrix() {
        return `
        <div class="badge-popularite">
            <div class="popularite">
               <span class="nombre-likes"></span> <i class="fa fa-heart like" aria-hidden="true"></i>
            </div>
            <div class="prix-journalier">${this.price}€ /Jour</div>
        </div>
        `;
    }
}