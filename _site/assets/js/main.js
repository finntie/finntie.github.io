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