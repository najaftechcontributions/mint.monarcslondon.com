
const setRealViewportHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  window.addEventListener('resize', setRealViewportHeight);
  window.addEventListener('orientationchange', setRealViewportHeight);
  
  setRealViewportHeight();

// $(document).ready(function(){

//     let comic = $('#comic');
    
//     $(window).scroll(function(){
//         let windowScrollVal = $(window).scrollTop();
        
//         if($(window).innerWidth > 767) {
//             if(windowScrollVal >= comic.offset().top - 200) {
//                 animateComics();
//             }
//         }
//         else {
//             if(windowScrollVal >= comic.offset().top - 500) {
//                 animateComics();
//             }
//         }
//     })

//     function animateComics() {
//         $("#comic .single").addClass("pop-up-anim");
//         $(".comic-let").css('animation-delay', '0.4s')
//         $(".comic-text-image").css('animation-delay', '0.8s')
//         $(".comic-go").css('animation-delay', '1.2s')
//     }

//     $("#mint_arrow_btn").on("click", function() {

//         let onboardingPosition = $(".onboarding").offset().top - 50;

//         $("html,body").animate({
//           scrollTop: onboardingPosition
//         },1000);
//       });

// });

function initMarqueeFrontLine() {
  
    // Kill other frontLineAnimations
    frontLineAnimations.forEach(animation => animation.progress(0).kill())
  
    // Marquee speed (pixels per second)
    let velocity = 30;
    
    let offset = 0
    let itemWidth = 0
    let rowWidth = 0
    
    let marqueeItems = gsap.utils.toArray('#frontline_marquee .marquee__item')
  
    // Calculate row width
    marqueeItems.forEach(e => {
      rowWidth += e.getBoundingClientRect().width
    })
    
    // Animation Loop
    marqueeItems.forEach((e, i) => {
  
      // Reset item positions
      gsap.set(e, {x: 0})
      
      itemWidth = e.getBoundingClientRect().width
      
      let tl = new gsap.timeline({ repeat: -1 });
      
      // Animate item to end of row
      tl.to(e, {
        ease: "none",
        duration: ((rowWidth - offset - itemWidth) / velocity),
        x: (rowWidth - offset - itemWidth),
      });
          
      // Send item to beginning
      tl.to(e, {
        ease: "none",
        duration: 0,
        x: ((offset + itemWidth) * -1)
      })
      
      // Animate to original position
      tl.to(e, {
        ease: "none",
        duration: ((offset + itemWidth) / velocity),
        x: 0
      })
      
      // Increment offset
      offset += itemWidth
      
      frontLineAnimations.push(tl)
    })
}

function initMarqueeBackLine() {
  
    // Kill other backlineAnimations
    backlineAnimations.forEach(animation => animation.progress(0).kill())
  
    // Marquee speed (pixels per second)
    let velocity = 20;
    
    let offset = 0
    let itemWidth = 0
    let rowWidth = 0
    
    let marqueeItems = gsap.utils.toArray('#backline_marquee .marquee__item')
  
    // Calculate row width
    marqueeItems.forEach(e => {
      rowWidth += e.getBoundingClientRect().width
    })
    
    // Animation Loop
    marqueeItems.forEach((e, i) => {
  
      // Reset item positions
      gsap.set(e, {x: 0})
      
      itemWidth = e.getBoundingClientRect().width
      
      let tl = new gsap.timeline({ repeat: -1 });
      
      // Animate item to end of row
      tl.to(e, {
        ease: "none",
        duration: ((rowWidth - offset - itemWidth) / velocity),
        x: (rowWidth - offset - itemWidth),
      });
          
      // Send item to beginning
      tl.to(e, {
        ease: "none",
        duration: 0,
        x: ((offset + itemWidth) * -1)
      })
      
      // Animate to original position
      tl.to(e, {
        ease: "none",
        duration: ((offset + itemWidth) / velocity),
        x: 0
      })
      
      // Increment offset
      offset += itemWidth
      
      backlineAnimations.push(tl)
    })
}
  
let frontLineAnimations = []
let backlineAnimations = []
  
initMarqueeFrontLine()
initMarqueeBackLine()
   
  var frontlineTimer, backlineTimer
  function handleResize() {
    clearTimeout(frontlineTimer)
    clearTimeout(backlineTimer)
    frontlineTimer = setTimeout(initMarqueeFrontLine, 500)
    backlineTimer = setTimeout(initMarqueeBackLine, 500)
  }
  
  window.addEventListener('resize', handleResize)