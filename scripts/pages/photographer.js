//Mettre le code JavaScript lié à la page photographer.html

/**
 * Fonction qui permet d'afficher la page photographer.html
 * @param {*} photographer 
 */
async function displayData(photographer, photographerMedias) {

    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = new Photographer(photographer);
    const photographHeaderDOM = photographerModel.displayPhotographHeader();
    photographHeader.insertAdjacentHTML("beforeend", photographHeaderDOM);

    document.getElementsByClassName("contact_button")[0].addEventListener('click', function() {
        let contact = new Contact();
        document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", contact.displayForm(photographer.name));
        //On écoute le click sur le bouton fermer
        document.getElementsByClassName("form-close-modal")[0].addEventListener("click", function() {
            document.getElementsByClassName("modal")[0].remove();
        });

        contact.validate();
    });

    const photographTri = document.querySelector(".photograph-tri");
    const photographTriDOM = photographerModel.displayPhotographTri();
    photographTri.insertAdjacentHTML("beforeend", photographTriDOM);

    //On s'occupe du tri
    //Par défaut on trie la liste des médias par popularité
    photographerMedias.sort(function(media1, media2) {
        return media2.likes - media1.likes;
    });
    displayMediasHtml(photographerMedias);

    //On écoute le changement de la selection du tri
    photographTri.getElementsByTagName("select")[0].addEventListener("change", function() {
        let criteria = this.value;
        photographerMedias.sort(function(media1, media2) {
            if (criteria == "date") {
                return media1.date.localeCompare(media2.date);
            } else if (criteria == "titre") {
                return media1.title.localeCompare(media2.title);
            } else if (criteria == "popularite") {
                return media2.likes - media1.likes;
            }
        });
        displayMediasHtml(photographerMedias);
    });
    

    //Ici on gère la div popularité/Prix journalier du photographe
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", photographerModel.displayPopularitePrix());
    let nombreLikes = 0;
    photographerMedias.forEach(aMedia => {
        nombreLikes += aMedia.likes;
    });
    document.getElementsByClassName("nombre-likes")[0].innerHTML = nombreLikes;
};


/**
 * Cette méthode permet d'afifcher les médias du photographe
 */
 async function displayMediasHtml(photographerMedias) {
    const photographMedias = document.querySelector(".photograph-medias");
    photographMedias.innerHTML = "";

    let photographerMediasDOM = "";
    photographerMedias.forEach(aMedia => { //Parcours les medias du photographe
        let media = new Media(aMedia);
        photographerMediasDOM += media.displayPhotographMedia()
    });

    photographMedias.insertAdjacentHTML("beforeend", photographerMediasDOM);
    
    photographerMedias.forEach(aMedia => {
        let media = new Media(aMedia);
        //On écoute le clic sur le coeur (populatité)
        document.getElementById(media.id).getElementsByClassName("like")[0].addEventListener('click', function(event) {
            
            this.removeEventListener('click', arguments.callee);//Desactiver le click sur le bouton like
            media.incrementLikes();
            
            let nombre_like_total = document.getElementsByClassName("nombre-likes")[0].innerHTML;
            nombre_like_total++;
            document.getElementsByClassName("nombre-likes")[0].innerHTML = nombre_like_total;

            //On affiche la popularité (le nombre de likes) dans dans l'article HTML correspondant
            document.getElementById(media.id).getElementsByClassName("popularite")[0].innerHTML = media.likes;
        });
        media.prepareLightbox();
    });
}

async function displayLightbox(media) {
    // Récupération des données photograpers
    const result = await fetch("data/photographers.json");
    const data = await result.json();
    const medias = data.media;

    let photographerMedias = new Array(); //Tableau de models /Media
    var index = 0; //Grâce à l'index je peux faire "precedent", "suivant"

    for (let i = 0; i < medias.length; i++) { //Parcours toutes les smedias
        let aMedia = medias[i];
        if (aMedia.photographerId == media.photographerId) { //On récupère tous les medias du photograph
            photographerMedias.push(new Media(aMedia)); //Ajout au tableau

            if (aMedia.id == media.id) {
                index = photographerMedias.length - 1;
            }
        }
    }
    //On affiche le lightbox
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", media.displayPhotographLightbox());
    media.displayImageInLightbox();

    //ON écoute le clic sur le bouton left (prev)
    document.getElementsByClassName("light-box-prev")[0].addEventListener("click", function() {
        if (index == 0) { //Si index vaut 0 alors je dois revenir à la size du tableau
            index = photographerMedias.length - 1;
        } else {
            index = index - 1;
        }
        photographerMedias[index].displayImageInLightbox();
    });

    //On écoute le clic sur le bouton right (next)
    document.getElementsByClassName("light-box-next")[0].addEventListener("click", function() {
        if (index == photographerMedias.length - 1) { //On a terminé le tableau
            index = 0; //On recommence
        } else {
            index = index + 1;
        }
        photographerMedias[index].displayImageInLightbox();
    });

    //Gestion du clavier (lightbox)
    document.addEventListener('keydown', function(event){
        if(event.key == "ArrowLeft"){
            document.getElementsByClassName("light-box-prev")[0].click();
        }
        else if(event.key == "ArrowRight") {
            document.getElementsByClassName("light-box-next")[0].click();
        }
    });

    //On écoute le clic sur le bouton fermer
    document.getElementsByClassName("light-box-close")[0].addEventListener("click", function() {
        document.getElementsByClassName("modal")[0].remove();
    });
}

/**
 * La fonction qui permet d'initialiser la page photographer.html
 */
async function init() {
    //Ici traitement de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const photographerId = urlParams.get("photographerId");

    // Récupération des données photograpers
    const result = await fetch("data/photographers.json");
    const data = await result.json();
    const photographers = data.photographers;
    const medias = data.media;

    let photographer = null; //Initialisation d'une variable photographer à null
    let photographerMedias = new Array();

    let count = 0;

    //Parcours du tableau photographers
    while (photographer == null && count < photographers.length) {
        let aPhotographer = photographers[count];

        if (aPhotographer.id == photographerId) { //Si l'id du photographe encours correspond à l'id du photographe recherché
            photographer = aPhotographer;

            medias.forEach(aMedia => { //Parcours toutes le smedias
                //Si l'id de l'auteur de la média correspond à l'id du photographe recherché 
                //alors, on alimente le tableau des medias du photographe
                if (aMedia.photographerId == photographerId) {
                    photographerMedias.push(aMedia);
                }
            });
        }
        count++;
    }

    //demande d'affichage du photographe trouvé
    displayData(photographer, photographerMedias);
};

init();