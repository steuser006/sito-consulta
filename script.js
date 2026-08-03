/* ==========================================================
   CONSULTA GIOVANILE CASTRONUOVO DI SANT'ANDREA (PZ)

   SCRIPT.JS

   Parte 1:
   - DOM Setup
   - Navbar dinamica
   - Menu mobile
   - Smooth Scroll
   - Active Section Navigation

========================================================== */


"use strict";



/* ==========================================================
   DOM ELEMENTS
========================================================== */


const header = document.querySelector(".header");

const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-menu a");

const sections = document.querySelectorAll("section[id]");



/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */


window.addEventListener("scroll", () => {


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


});



/* ==========================================================
   MOBILE MENU
========================================================== */


if (hamburger) {


    hamburger.addEventListener("click", () => {


        hamburger.classList.toggle("active");


        navMenu.classList.toggle("active");


        const expanded =
        hamburger.getAttribute("aria-expanded") === "true";


        hamburger.setAttribute(
            "aria-expanded",
            !expanded
        );


    });


}



/* ==========================================================
   CHIUSURA MENU DOPO CLICK LINK
========================================================== */


navLinks.forEach(link => {


    link.addEventListener("click", () => {


        hamburger.classList.remove("active");


        navMenu.classList.remove("active");


        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );


    });


});



/* ==========================================================
   SMOOTH SCROLL
========================================================== */


navLinks.forEach(link => {


    link.addEventListener("click", function(event) {


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target) {


            event.preventDefault();


            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });


        }


    });


});



/* ==========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================== */


const observerOptions = {


    threshold:0.35


};



const sectionObserver =
new IntersectionObserver(
(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            const id =
            entry.target.getAttribute("id");


            navLinks.forEach(link=>{


                link.classList.remove("active");


                if(
                    link.getAttribute("href")
                    === `#${id}`
                ){

                    link.classList.add("active");

                }


            });


        }


    });


},
observerOptions);



sections.forEach(section=>{


    sectionObserver.observe(section);


});
/* ==========================================================
   PARTE 2

   - Scroll Reveal Animation
   - FAQ Accordion
   - Gallery Lightbox
   - Back To Top Button

========================================================== */



/* ==========================================================
   SCROLL REVEAL ANIMATION
========================================================== */


const revealElements = document.querySelectorAll(
    ".section-title, .mission-card, .activity-card, .event-card, .survey-card, .news-card, .gallery-item, .contact-placeholder"
);



revealElements.forEach(element => {

    element.classList.add("reveal");

});



const revealObserver =
new IntersectionObserver(
(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


            revealObserver.unobserve(
                entry.target
            );


        }


    });


},
{

    threshold:0.15

});



revealElements.forEach(element=>{


    revealObserver.observe(element);


});





/* ==========================================================
   FAQ ACCORDION
========================================================== */


const faqItems =
document.querySelectorAll(".faq-item");



faqItems.forEach(item=>{


    const question =
    item.querySelector(".faq-question");


    const answer =
    item.querySelector(".faq-answer");



    question.addEventListener("click",()=>{


        const isActive =
        item.classList.contains("active");



        /* chiude tutte le altre FAQ */

        faqItems.forEach(other=>{


            other.classList.remove("active");


            const otherAnswer =
            other.querySelector(".faq-answer");


            otherAnswer.style.maxHeight =
            null;


        });



        if(!isActive){


            item.classList.add("active");


            answer.style.maxHeight =
            answer.scrollHeight + "px";


        }


    });


});





/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */


const galleryImages =
document.querySelectorAll(".gallery-item");


const lightbox =
document.getElementById("lightbox");


const lightboxImage =
document.getElementById("lightbox-image");


const lightboxClose =
document.querySelector(".lightbox-close");



galleryImages.forEach(image=>{


    image.addEventListener("click",()=>{


        lightboxImage.src =
        image.src;


        lightboxImage.alt =
        image.alt;



        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
        "hidden";


    });


});



function closeLightbox(){


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
    "";


}



if(lightboxClose){


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


}



if(lightbox){


    lightbox.addEventListener(
        "click",
        (event)=>{


            if(
                event.target === lightbox
            ){

                closeLightbox();

            }


        }
    );


}



/* chiusura con ESC */

document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Escape" &&
        lightbox.classList.contains("active")
    ){

        closeLightbox();

    }


});





/* ==========================================================
   BACK TO TOP
========================================================== */


const backToTop =
document.getElementById(
    "backToTop"
);



window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 500){


        backToTop.classList.add(
            "visible"
        );


    }else{


        backToTop.classList.remove(
            "visible"
        );


    }


});



if(backToTop){


    backToTop.addEventListener(
        "click",
        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }
    );


}

/* ==========================================================
   PARTE 3

   - Cookie Management GDPR
   - Consent Storage
   - Analytics Preparation
   - Dynamic Year
   - Final Optimizations

========================================================== */



/* ==========================================================
   COOKIE BANNER GDPR
========================================================== */


const cookieBanner =
document.getElementById(
    "cookieBanner"
);


const acceptCookies =
document.getElementById(
    "acceptCookies"
);


const rejectCookies =
document.getElementById(
    "rejectCookies"
);


const preferencesCookies =
document.getElementById(
    "preferencesCookies"
);



const COOKIE_NAME =
"consulta_cookie_consent";





/* Recupera consenso salvato */


const savedConsent =
localStorage.getItem(
    COOKIE_NAME
);



if(!savedConsent && cookieBanner){


    setTimeout(()=>{


        cookieBanner.classList.add(
            "active"
        );


    },1000);


}





/* ==========================================================
   ACCETTA COOKIE
========================================================== */


if(acceptCookies){


    acceptCookies.addEventListener(
        "click",
        ()=>{


            saveCookieConsent(
                "accepted"
            );


            enableOptionalServices();


        }
    );


}




/* ==========================================================
   RIFIUTA COOKIE
========================================================== */


if(rejectCookies){


    rejectCookies.addEventListener(
        "click",
        ()=>{


            saveCookieConsent(
                "rejected"
            );


        }
    );


}




/* ==========================================================
   PREFERENZE COOKIE

   Predisposto per futura estensione
   con pannello avanzato
========================================================== */


if(preferencesCookies){


    preferencesCookies.addEventListener(
        "click",
        ()=>{


            alert(
                "Pannello preferenze cookie in fase di configurazione."
            );


        }
    );


}





/* ==========================================================
   SALVATAGGIO CONSENSO
========================================================== */


function saveCookieConsent(value){


    localStorage.setItem(

        COOKIE_NAME,

        JSON.stringify({

            status:value,

            date:new Date()
            .toISOString()

        })

    );



    if(cookieBanner){


        cookieBanner.classList.remove(
            "active"
        );


    }


}





/* ==========================================================
   SERVIZI OPZIONALI

   Qui verranno caricati solamente
   dopo consenso:

   - Google Analytics 4
   - Google Maps
   - YouTube Embed
========================================================== */


function enableOptionalServices(){


    console.log(
        "Servizi opzionali attivati dopo consenso."
    );



    /*
    
    Esempio futuro:

    loadGoogleAnalytics();

    loadYoutubeEmbeds();

    loadGoogleMaps();


    */


}






/* ==========================================================
   GOOGLE ANALYTICS PLACEHOLDER

   NON ATTIVO FINO AL CONSENSO

========================================================== */


function loadGoogleAnalytics(){


    /*
    
    Inserire qui il codice GA4
    solo dopo consenso.

    Non inserire script analytics
    direttamente nell'HTML.

    */


}





/* ==========================================================
   ANNO AUTOMATICO FOOTER
========================================================== */


const currentYear =
document.getElementById(
    "currentYear"
);



if(currentYear){


    currentYear.textContent =
    new Date()
    .getFullYear();


}





/* ==========================================================
   PRELOAD OTTIMIZZATO IMMAGINI
========================================================== */


document
.querySelectorAll("img")
.forEach(image=>{


    if(!image.hasAttribute("loading")){


        image.setAttribute(
            "loading",
            "lazy"
        );


    }


});





/* ==========================================================
   BLOCCO DEFAULT LINK PLACEHOLDER

   Evita refresh per link #
========================================================== */


document
.querySelectorAll('a[href="#"]')
.forEach(link=>{


    link.addEventListener(
        "click",
        event=>{


            event.preventDefault();


        }
    );


});





/* ==========================================================
   SICUREZZA BASE

   Previene apertura indesiderata
   futura per link esterni
========================================================== */


document
.querySelectorAll(
    "a[target='_blank']"
)
.forEach(link=>{


    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );


});





/* ==========================================================
   FINE SCRIPT.JS

   Consulta Giovanile
   Castronuovo di Sant'Andrea (PZ)

========================================================== */