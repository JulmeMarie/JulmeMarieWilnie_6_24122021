function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        //Début mon code
        const paragraphe = document.createElement('p');
        const localisation = document.createElement('div');
        const tag = document.createElement('div');
        const prix = document.createElement('div');

        localisation.textContent = city + ", " + country;
        tag.textContent = tagline;
        prix.textContent = price + "€/jour";

        paragraphe.appendChild(localisation);
        paragraphe.appendChild(tag);
        paragraphe.appendChild(prix);
        article.appendChild(paragraphe);
        //Fin Mon code
        return (article);
    }
    return { name, picture, getUserCardDOM }
}