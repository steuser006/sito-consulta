/* ==========================================================
   CONSULTA GIOVANILE CASTRONUOVO DI SANT'ANDREA (PZ)

   SCRIPT.JS

   PARTE 1:
   - DOM Setup
   - Navbar dinamica
   - Menu mobile hamburger
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


if(header){

    window.addEventListener("scroll",()=>{


        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }


    });


}





/* ==========================================================
   MOBILE MENU HAMBURGER
========================================================== */


if(hamburger && navMenu){


    hamburger.addEventListener("click",()=>{


        const isOpen =
        hamburger.classList.toggle("active");


        navMenu.classList.toggle(
            "active",
            isOpen
        );


        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );


        /*
            Blocca lo scroll quando
            il menu mobile è aperto
        */


        document.body.style.overflow =
        isOpen ? "hidden" : "";


    });


}





/* ==========================================================
   CHIUSURA MENU MOBILE
========================================================== */


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        if(hamburger){

            hamburger.classList.remove(
                "active"
            );

        }


        if(navMenu){

            navMenu.classList.remove(
                "active"
            );

        }


        if(hamburger){

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        document.body.style.overflow="";


    });


});





/* ==========================================================
   CHIUSURA MENU CLICK ESTERNO
========================================================== */


document.addEventListener(
"click",
(event)=>{


    if(
        navMenu &&
        hamburger &&
        navMenu.classList.contains("active")
    ){


        if(
            !navMenu.contains(event.target) &&
            !hamburger.contains(event.target)
        ){


            navMenu.classList.remove(
                "active"
            );


            hamburger.classList.remove(
                "active"
            );


            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.style.overflow="";


        }


    }


});





/* ==========================================================
   CHIUSURA MENU CON ESC
========================================================== */


document.addEventListener(
"keydown",
(event)=>{


    if(event.key === "Escape"){


        if(
            navMenu &&
            navMenu.classList.contains("active")
        ){


            navMenu.classList.remove(
                "active"
            );


            hamburger.classList.remove(
                "active"
            );


            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.style.overflow="";


        }


    }


});





/* ==========================================================
   SMOOTH SCROLL
========================================================== */


navLinks.forEach(link=>{


    link.addEventListener(
    "click",
    function(event){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){


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



if(sections.length){


const sectionObserver =
new IntersectionObserver(
(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            const id =
            entry.target.getAttribute("id");



            navLinks.forEach(link=>{


                link.classList.remove(
                    "active"
                );


                if(
                    link.getAttribute("href")
                    === `#${id}`
                ){


                    link.classList.add(
                        "active"
                    );


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
   - Back To Top

========================================================== */





/* ==========================================================
   SCROLL REVEAL ANIMATION
========================================================== */


const revealElements = document.querySelectorAll(
    ".section-title, .mission-card, .activity-card, .event-card, .survey-card, .news-card, .gallery-item, .contact-placeholder, .quick-card"
);



if(revealElements.length){


    revealElements.forEach(element=>{


        element.classList.add(
            "reveal"
        );


    });



    const revealObserver =
    new IntersectionObserver(
    (entries)=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.classList.add(
                    "show"
                );


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


        revealObserver.observe(
            element
        );


    });


}





/* ==========================================================
   FAQ ACCORDION
========================================================== */


const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(item => {


    const button = item.querySelector(".faq-question");


    button.addEventListener("click", () => {


        item.classList.toggle("active");


    });


});

/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */


const galleryImages =
document.querySelectorAll(
    ".gallery-item"
);



const lightbox =
document.getElementById(
    "lightbox"
);



const lightboxImage =
document.getElementById(
    "lightbox-image"
);



const lightboxClose =
document.querySelector(
    ".lightbox-close"
);





function closeLightbox(){


    if(!lightbox) return;



    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow="";


}






if(
    galleryImages.length &&
    lightbox &&
    lightboxImage
){


    galleryImages.forEach(image=>{


        image.addEventListener(
        "click",
        ()=>{


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


    });


}






/* Chiusura lightbox con ESC */


document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Escape" &&
        lightbox &&
        lightbox.classList.contains(
            "active"
        )
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





if(backToTop){



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





    backToTop.addEventListener(
    "click",
    ()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });



}
   /* ==========================================================
   PARTE 3

   - Cookie Management GDPR
   - Consent Storage
   - Analytics Preparation
   - Dynamic Year Footer
   - Image Optimization
   - Link Security

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





/* ==========================================================
   CONTROLLO CONSENSO SALVATO
========================================================== */


const savedConsent =
localStorage.getItem(
    COOKIE_NAME
);



if(
    !savedConsent &&
    cookieBanner
){


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


    });


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


    });


}






/* ==========================================================
   PREFERENZE COOKIE
========================================================== */


if(preferencesCookies){


    preferencesCookies.addEventListener(
    "click",
    ()=>{


        alert(
        "Pannello preferenze cookie in fase di configurazione."
        );


    });


}






/* ==========================================================
   SALVATAGGIO CONSENSO
========================================================== */


function saveCookieConsent(value){


    localStorage.setItem(

        COOKIE_NAME,

        JSON.stringify({

            status:value,

            date:
            new Date()
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
   SERVIZI DOPO CONSENSO
========================================================== */


function enableOptionalServices(){


    console.log(
        "Servizi opzionali attivati dopo consenso."
    );



    /*
    
    Futuro:

    loadGoogleAnalytics();

    loadGoogleMaps();

    loadYoutubeEmbeds();


    */


}






/* ==========================================================
   GOOGLE ANALYTICS PLACEHOLDER
========================================================== */


function loadGoogleAnalytics(){


    /*
    
    Inserire qui GA4
    solo dopo consenso.

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
   OTTIMIZZAZIONE IMMAGINI
========================================================== */


/*

Evita di applicare lazy loading
alla foto principale HERO.

*/


document
.querySelectorAll("img")
.forEach(image=>{


    if(
        !image.hasAttribute("loading") &&
        !image.closest(".hero")
    ){


        image.setAttribute(
            "loading",
            "lazy"
        );


    }


});







/* ==========================================================
   BLOCCO LINK PLACEHOLDER #
========================================================== */


document
.querySelectorAll('a[href="#"]')
.forEach(link=>{


    link.addEventListener(
    "click",
    event=>{


        event.preventDefault();


    });


});







/* ==========================================================
   SICUREZZA LINK ESTERNI
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
   PREVENZIONE ERRORI IMMAGINI
========================================================== */


document
.querySelectorAll("img")
.forEach(image=>{


    image.addEventListener(
    "error",
    ()=>{


        image.style.display =
        "none";


        console.warn(
            "Immagine non trovata:",
            image.src
        );


    });


});







/* ==========================================================
   FINE SCRIPT.JS

   Consulta Giovanile
   Castronuovo di Sant'Andrea (PZ)

========================================================== */

}
