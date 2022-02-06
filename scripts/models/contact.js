class Contact {
    constructor() {
        this.nom = null;
        this.prenom = null;
        this.email = null;
        this.message = null;
    }

    /**
     * Cette méthode permet d'afficher le formulaire de contact
     * @param {*} photographerName 
     * @returns 
     */
     displayForm(photographerName) {
        return `<div class="modal">
     <form class="contact-form" action="#" method="post" id="contact-form">
        <h1>Contactez-moi ${photographerName} </h1>
        <i class="form-close-modal fa fa-times"></i>
        <div>
            <legend for="prenom"> Prénom</legend>
            <input type="text" value="" id="prenom" name="Prenom" minLength="3" placeholder="saisir votre prénom" alt="saisir votre prénom" required>
        </div>
        <div>
            <legend for="nom"> Nom</legend>
            <input type="text" value="" id="nom" name="Nom" minLength="3" placeholder="saisir votre nom" alt="saisir votre nom" required>
        </div>
        <div>
            <legend for="email"> Email</legend>
            <input type="email" value="" id="email" name="Email" minLength="5" placeholder="saisir votre e-mail" alt="saisir votre e-mail" required>
        </div>
        <div>
            <legend for="message"> Votre message </legend>
            <textarea id="message" name="Message" minLength="5" placeholder="saisir votre message" required></textarea>
        </div>
        <div>
            <button type="submit">Envoyer</button> 
        </div>
     </form>
    </div>`;
    }
    /**
     * Cette méthode permet d'afficher un message à l'utilisateur en cas d'erreur
     */
    check(input) {
        input.setCustomValidity("");
        if (input.validity.tooShort) {
            input.setCustomValidity(`Ce champ doit comporter au moins ${input.minLength} caractères.`);
        }
        if (input.validity.valueMissing) {
            input.setCustomValidity(`Ce champ est obligatoire`);
        }
        if (input.validity.typeMismatch && input.type == "email") {
            input.setCustomValidity(`Ce champ doit être un email valide`);

        }
        return input.reportValidity();
    }

    /**
     * Cette méthode permet de valider le formulaire après soumission.
     * Elle écoute le clic sur le bouton submit
     * Elle vérifie que tous les champs sont correct
     * Si au moins un champ n'est pas correct, elle affiche un message
     * Si tous les champ sont corrects, elle affiche la valeur des 3 champs dans la console
     */
    validate() {
        document.querySelector('#contact-form button[type="submit"]').addEventListener("click", (e) => {
            e.preventDefault();
            let fields = document.querySelectorAll('#contact-form input, #contact-form textarea');
            let valid = true;
            //Array.from() permet de convertir une liste d'élément html en tableau JS
            for (let field of Array.from(fields)) {
                valid = this.check(field);
                if (!valid) {//Ce champ n'est pas correct alors on arrête la boucle
                    break;
                }
            }
            if (valid) {//Les 3 champs sont corrects
                for (let field of Array.from(fields)) {
                    console.log(field.value);
                }
                document.getElementsByClassName("modal")[0].remove();
            }
        })

        //On écoute le click sur le bouton fermer
        document.getElementsByClassName("form-close-modal")[0].addEventListener("click", function() {
            document.getElementsByClassName("modal")[0].remove();
        });
    }
}