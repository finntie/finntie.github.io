document.addEventListener('DOMContentLoaded', () => {
    const darkmodeButton = document.getElementById('darkmodeButton');
    
    if (darkmodeButton) {

    const darkmodeButton = document.getElementById('darkmodeButton');
    const logoImage = document.getElementById('BuasLogo');

    darkmodeButton.addEventListener('click', () => {
        //---------------------------------------Text colors---------------------------------------------------
        const body = document.body;
        const currentBackgroundColor = body.style.backgroundColor;
        const currentTextColor = body.style.color;
        
        
        const codeElements = document.querySelectorAll('.main-content code, .main-content pre');
        const headers = document.querySelectorAll('.main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content h6');
        //Change colours of normal text and background
        body.style.color = currentTextColor === 'rgb(227, 197, 166)' ? 'black' : 'rgb(227, 197, 166)';
        body.style.backgroundColor = currentBackgroundColor === 'rgb(41, 56, 59)' ? 'white' : 'rgb(41, 56, 59)';
        //All headers
        headers.forEach(header =>   {
            header.style.color = body.style.color;
        });
        //All code
        if (codeElements.length > 0) {
        const computedStyle = window.getComputedStyle(codeElements[0]);
        const currentCodeColor = computedStyle.color; // Text color
        const currentCodeBackground = computedStyle.backgroundColor; // Background color
        codeElements.forEach(code =>   {
            code.style.color = currentCodeColor === 'rgb(165, 197, 211)' ? 'rgb(86, 116, 131)' : 'rgb(165, 197, 211)'; // Check RGB values
            code.style.backgroundColor = currentCodeBackground === 'rgb(65, 77, 91)' ? 'rgb(243, 246, 251)' : 'rgb(65, 77, 91)'; // Check RGB values
        });
        }

        //------------------------------------------Button Name---------------------------------
            // Change the button text
        if (darkmodeButton.textContent == 'DarkMode') {
            darkmodeButton.textContent = 'LightMode';
        } else {
            darkmodeButton.textContent = 'DarkMode';
        }

        //------------------------------------------Image-----------------------------------
        const currentLogo = logoImage.src;
        if (currentLogo.includes("LogoBUas_Black.png")){
            logoImage.src = '/assets/media/LogoBUas_RGB.png';
        }else{
            logoImage.src = '/assets/media/LogoBUas_Black.png';
        }
    });
    } else {
    console.error("Button with id 'fontColorButton' not found in the DOM.");
    }
});


//Video play on hover
document.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('.page-info-button');

    buttons.forEach(button => {
        const video = button.querySelector('video');
        if (video) {
            video.addEventListener('mouseenter', function() {
                video.play().catch(error => {
                console.log('Play interrupted:', error);
        });
            });
            video.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            });
        }
    });
});

//Random circles
document.addEventListener('DOMContentLoaded', function() {
   const currentScrollHeight = generateCircles(0);
   setTimeout(() => generateCircles(currentScrollHeight), 1000);
});
    
function generateCircles(from)    {
    const circles = document.getElementById('decorativeCircles');
    const colors = ['#89fffa', '#89ffa9', '#499c98', '#489b60'];
    const pageHeight = document.body.scrollHeight;
    const circleCount = Math.floor((pageHeight - from) / 150);
    if (pageHeight == from) return 0;

    const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, img, video, .main-content, .page-info-button');

    for (let i = 0; i < circleCount; i++)
    {
        const circle = document.createElement('div');
        circle.className = 'random-circle';

        const size = Math.random() * 150 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (pageHeight - from - size) + from;

        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.backgroundColor = color;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        if (overlapsCircle(x, y, size, contentElements)) {
            circle.style.opacity = 0.1;
        }
        
        circles.appendChild(circle);
    }
    return pageHeight;
};

function overlapsCircle(X, Y, diameter, contentElement)
{
    const csqr = {
        left: X,
        top: Y,
        right: X + diameter,
        bottom: Y - diameter
    };

    for (let element of contentElement){
        const sqr = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
    
        // padding and border values
        const pLeft = parseFloat(styles.paddingLeft);
        const pTop = parseFloat(styles.paddingTop);
        const pRight = parseFloat(styles.paddingRight);
        const pBottom = parseFloat(styles.paddingBottom);
    
        const bLeft = parseFloat(styles.borderLeftWidth);
        const bTop = parseFloat(styles.borderTopWidth);
        const bRight = parseFloat(styles.borderRightWidth);
        const bBottom = parseFloat(styles.borderBottomWidth);

        const esqr = {
            left: sqr.left + window.scrollX + pLeft + bLeft,
            top: sqr.top + window.scrollY - pTop - bTop,
            right: sqr.right + window.scrollX - pRight - bRight,
            bottom: sqr.bottom + window.scrollY + pBottom + bBottom,
        };

        if (!(csqr.right < esqr.left ||
              csqr.left > esqr.right ||
              csqr.top > esqr.bottom ||
              csqr.bottom < esqr.top)){
                return true;
        }
    }
    return false;
}