class Image {
    static folder = "assets/images/medias/";
    constructor(data) {
        this.photographerId = data.photographerId;
        this.id = data.id;
        this.likes = data.likes;
        this.price = data.price;
        this.title = data.title;
        this.image = data.image;
    }

    incrementLikes() {
        this.likes++;
    }

    displayPhotographMedia() {
        return `<article id="${this.id}">
            <img src="${Image.folder + this.image}" alt="${this.title}">
            <div>
                <div class="photograph-text">${this.title}</div>
                <div><span class="popularite">${this.likes}</span> <i class="fa fa-heart like" aria-hidden="true"></i></div>
            </div>
            </article>`;
            
    }
    displayPhotographLightbox() {
        return `
        <div class="modal">
            <div class="lightbox-modal" id="${this.id}">
                <div class="light-box-prev"><i class="fa fa-chevron-left"></i></div>
                <div class="light-box-body"></div>
                <div class="light-box-next"><i class="fa fa-chevron-right"></i></div>
                <div class="light-box-close"><i class="fa fa-times"></i></div>
            </div>
        </div>`;
    }
    displayImageInLightbox() {
        document.getElementsByClassName("light-box-body")[0].innerHTML = ""; //On vide l'élément
        document.getElementsByClassName("light-box-body")[0].insertAdjacentHTML("beforeend", '<img src="' + Image.folder + this.image + '"/>');
    }
    prepareLightbox() {
        document.getElementById(this.id).getElementsByTagName("img")[0].addEventListener('click', () => {
            displayLightbox(this);
        });
    }

}

    

