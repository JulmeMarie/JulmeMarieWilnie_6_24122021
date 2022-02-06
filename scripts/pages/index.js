async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    let photographerDOM = "";

    photographers.forEach((photographer) => {
        const photographerModel = new Photographer(photographer);
        photographerDOM += photographerModel.displayList();
    });
    photographersSection.insertAdjacentHTML("beforeend", photographerDOM);
};


async function init() {
    // Récupère les datas des photographes
    const result = await fetch("data/photographers.json");
    const data = await result.json();
    displayData(data.photographers);
    Photographer.addEventListenerToAll();
};
init();