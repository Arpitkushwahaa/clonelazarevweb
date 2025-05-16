function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Create the LocomotiveScroll instance and store it in the window object
    // so it can be accessed by other functions
    window.locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
        smartphone: { smooth: true }
    });
    window.locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? window.locoScroll.scrollTo(value, 0, 0)
                : window.locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => window.locoScroll.update());

    ScrollTrigger.refresh();
}

function loadingAnimation() {

    var tl = gsap.timeline()
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}

function navAnimation() {
    var nav = document.querySelector("nav")

    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1

        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration:0.3,
            stagger: {
                amount: 0.5
            }
        })
    })
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline()
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })

    // Make navbar elements clickable
    const navElems = document.querySelectorAll('.nav-elem');
    navElems.forEach(elem => {
        // Make main section headers clickable
        elem.querySelector('h4').addEventListener('click', function() {
            const section = elem.getAttribute('data-section');
            navigateToSection(section);
        });

        // Make subcategory items clickable
        const spans = elem.querySelectorAll('h5 span');
        spans.forEach(span => {
            if (span.textContent) { // Only add click event if there's content
                span.addEventListener('click', function() {
                    const section = elem.getAttribute('data-section');
                    const category = span.getAttribute('data-category');
                    navigateToSection(section, category);
                });
            }
        });
    });

    // Make Let's Talk button functional with animations
    const letsTalkBtn = document.getElementById('lets-talk-btn');
    if (letsTalkBtn) {
        // Click event to scroll to contact section
        letsTalkBtn.addEventListener('click', function() {
            // Add click animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                onComplete: function() {
                    gsap.to(letsTalkBtn, {
                        scale: 1,
                        duration: 0.1
                    });
                }
            });
            
            // Scroll to contact section
            scrollToContactSection();
        });
        
        // Hover animations (in addition to CSS)
        letsTalkBtn.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('svg'), {
                x: 3,
                duration: 0.3
            });
        });
        
        letsTalkBtn.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('svg'), {
                x: 0,
                duration: 0.3
            });
        });
        
        // Add pulse animation to draw attention
        gsap.to(letsTalkBtn, {
            boxShadow: '0 0 15px rgba(11, 163, 78, 0.5)',
            repeat: 2,
            yoyo: true,
            duration: 1,
            delay: 2 // Delay to start after page load
        });
    }
}

function page2Animation() {
    var rightElems = document.querySelectorAll(".right-elem")

    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {




            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", function (dets) {

            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 215
            })
        })
    })
}

function page3VideoAnimation() {
    var page3Center = document.querySelector(".page3-center")
    var video = document.querySelector("#page3 video")

    page3Center.addEventListener("click", function () {
        video.play()
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })
    video.addEventListener("click", function () {
        video.pause()
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })


    var sections = document.querySelectorAll(".sec-right")

    sections.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1
            elem.childNodes[3].play()
        })
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0
            elem.childNodes[3].load()
        })
    })

}

function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            // markers:true,
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}

function page7Animations() {
    // Animate page7 elements when they come into view
    gsap.from(".page7-left h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 80%",
            end: "top 60%",
            scrub: true
        }
    });
    
    gsap.from(".page7-left p", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 75%",
            end: "top 55%",
            scrub: true
        }
    });
    
    gsap.from(".contact-info", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 70%",
            end: "top 50%",
            scrub: true
        }
    });
    
    gsap.from(".contact-btn", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 65%",
            end: "top 45%",
            scrub: true
        }
    });
    
    gsap.from(".form-container", {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 70%",
            end: "top 50%",
            scrub: true
        }
    });
    
    // Form input animations on focus
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                borderColor: '#0BA34E',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                duration: 0.3
            });
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                gsap.to(this, {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    duration: 0.3
                });
            }
        });
    });
    
    // Button hover animations
    const contactBtn = document.querySelector('.contact-btn');
    const formBtn = document.querySelector('.form-container button');
    
    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                backgroundColor: '#0c8e45',
                y: -3,
                duration: 0.3
            });
        });
        
        contactBtn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                backgroundColor: '#0BA34E',
                y: 0,
                duration: 0.3
            });
        });
    }
    
    if (formBtn) {
        formBtn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                backgroundColor: '#0BA34E',
                color: '#fff',
                y: -3,
                duration: 0.3
            });
            gsap.to(this.querySelector('i'), {
                color: '#fff',
                duration: 0.3
            });
        });
        
        formBtn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                backgroundColor: '#fff',
                color: '#111',
                y: 0,
                duration: 0.3
            });
            gsap.to(this.querySelector('i'), {
                color: '#111',
                duration: 0.3
            });
        });
    }
}

// Navigation functions for the navbar and Let's Talk button
function navigateToSection(section, category = null) {
    // Close the navbar dropdown if open
    let tl = gsap.timeline();
    tl.to('.nav-part2 h5 span', {
        y: 25,
        stagger: {
            amount: 0.2
        }
    });
    tl.to('.nav-part2 h5', {
        display: 'none',
        duration: 0.1
    });
    tl.to('#nav-bottom', {
        height: 0,
        duration: 0.2
    });

    // Map sections to page elements
    const sectionMap = {
        'case-studies': '#page2',
        'areas-of-expertise': '#page1',
        'uiux-design': '#page5',
        'product-design': '#page4',
        'design-process': '#page6',
        'about-agency': '#page7'
    };

    // Get the target section element
    const targetSection = sectionMap[section];
    if (targetSection) {
        // Use locomotive scroll to smoothly scroll to the section
        const locoScroll = window.locoScroll;
        if (locoScroll) {
            locoScroll.scrollTo(targetSection);
        } else {
            // Fallback if locomotive scroll is not available
            const targetElement = document.querySelector(targetSection);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // If a category is specified, we could add additional logic here
    // For example, filtering content based on the category
    if (category) {
        console.log(`Category selected: ${category}`);
        // Additional category-specific logic could be added here
    }
}

// Function to scroll to the contact section
function scrollToContactSection() {
    // Scroll to page7 which contains the contact form
    const locoScroll = window.locoScroll;
    if (locoScroll) {
        locoScroll.scrollTo('#page7');
    } else {
        // Fallback if locomotive scroll is not available
        const contactSection = document.querySelector('#page7');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Add a visual highlight to the form
    gsap.fromTo('.form-container', 
        { 
            boxShadow: '0 0 0 rgba(11, 163, 78, 0)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        {
            boxShadow: '0 0 20px rgba(11, 163, 78, 0.5)',
            borderColor: '#0BA34E',
            duration: 1,
            repeat: 1,
            yoyo: true
        }
    );
}

function footerAnimations() {
    // Animate footer elements when they come into view
    gsap.from(".footer-logo", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "footer",
            scroller: "#main",
            start: "top 90%",
            end: "top 70%",
            scrub: true
        }
    });
    
    gsap.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
            trigger: "footer",
            scroller: "#main",
            start: "top 85%",
            end: "top 65%",
            scrub: true
        }
    });
    
    gsap.from(".footer-bottom", {
        y: 20,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".footer-bottom",
            scroller: "#main",
            start: "top 95%",
            end: "top 85%",
            scrub: true
        }
    });
    
    // Social links hover animations
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                color: '#0BA34E',
                y: -3,
                duration: 0.3
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                color: '#fff',
                y: 0,
                duration: 0.3
            });
        });
    });
}

locomotiveAnimation()

navAnimation()

page2Animation()

page3VideoAnimation()

page6Animations()

page7Animations()

footerAnimations()

loadingAnimation()