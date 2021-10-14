import animate from "./animate-element.js"
import "./modules/jquery.min.js.js"

let quoteAnimationIteration = name => {
    $(name).css("opacity", "1")
}

let quoteAnimationEnd = () => {
    $("#name").css("opacity", "1")
    setTimeout(() => $("#visitor-counter").css("opacity", "1"), 1000)
    setTimeout(() => {
        $("#intro > a").css("--X-ofset", "0")
        $("header").css("transform", "translate(0)")
        $("#My-Projects").css("transform", "translateY(0)")
        $("html").css("overflow", "auto")
    }, 2000);
}

let introIterationCallback = name => setTimeout(
    () => $("#logo__static").append(
        `<div class="${name.substring(1)}"></div>`
    ),
    300
)
let IntroEndCallback = () => {
    let flash = $("<div id=\"flash\"></div>").insertBefore("#logo__static")
    setTimeout(() => flash.css("opacity", "1"), 50);
    setTimeout(
        () => {
            $("#logo__static > div").css(
                "background-color", 
                "var(--secondary-light-color)"
            )
            $("#logo__non--static").remove()
            flash.css({
                "opacity": "0",
                "transition-duration": "1.75s",
                "transition-timing-function": "ease-in-out"
            })
            setTimeout(
                () => {
                    flash.remove()
                    animate (
                        "#quote-$",
                        500,
                        4,
                        quoteAnimationIteration,
                        quoteAnimationEnd,
                        ""
                    )
                }, 1750
            )
        },
        1050
    )
}

$(document).ready(() => {
    $.get("/visitorsNumbers", number => $("#visitor-counter > h2").append(
        `${number}<sup>${(() => {
            if(number[number.length - 2] === "1") return "th"
            switch(number[number.length - 1]) {
                    case "1": return "st"
                    case "2": return "nd"
                    case "3": return "rd"
                    default: return "th"
            }
        })()}</sup>`
    ))

    $("#send-message").submit(event => {
        event.preventDefault()
        $.post("/", {
            from: $("#from").val(),
            subject: $("#subject").val(),
            message: $("#message").val()
        })
        $("#send-message").replaceWith(
            `<h2
                id="send-message"
            >Thanks for the message</h2>`
        )
    })

    $("nav a").focus(() => {
        $("#check-to-nav").prop("checked", true)
    }).click(() => {
        $("#check-to-nav").prop("checked", false)
    })
    $("*:not(nav a, .for-mobile-only)").focus(() => {
        console.log("blur")
        $("#check-to-nav").prop("checked", false)
    })

    $("[required]").prev("label").addClass("required")

    let onScreenObserver = new IntersectionObserver(entries => {
        entries.forEach(entrie => {
            let linkToentrie = $(`nav a[href="#${
                entrie.target.id
            }"]`)
            if(entrie.isIntersecting) {
                linkToentrie.addClass("hover")
            }
            if(!entrie.isIntersecting) {
                linkToentrie.removeClass("hover")
            }
        })
    }, {
        rootMargin: "-50% 0px"
    })
    let sections = document.querySelectorAll(
        "main > section, footer"
    )
    sections.forEach(section => {
        onScreenObserver.observe(section)
    })
    const rem = parseInt($("html").css("font-size"))
    let nameObserver = new IntersectionObserver(entries => {
        entries.forEach(entrie => {
            if(entrie.isIntersecting) return $(
                "header p"
            ).removeClass("active")
            $("header p").addClass("active")
        })
    }, {
        rootMargin: `-${3.5 * rem}px`
    })
    nameObserver.observe(document.querySelector("#name"))
    if(window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        for(let i = 1; i <= 8; ++i) {
            $(
                `<div class="logo__part-${i}"></div>`
            ).appendTo("#logo__static")
             .css(
                 "background-color", 
                 "var(--secondary-light-color)"
             )
        }
        return
    }
    setTimeout(
    () => $("html, body").scrollTop(0),
    50
    )
    setTimeout(() => {
        animate(
            ".logo__part-$",
            200,
            8,
            introIterationCallback,
            IntroEndCallback
        )
        $("html, body").css("overflow", "hidden")
    }, 500)
})