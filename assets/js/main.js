document.addEventListener('DOMContentLoaded', () => {
    const darkmodeButton = document.getElementById('darkmodeButton');
    
    if (darkmodeButton) {

    const darkmodeButton = document.getElementById('darkmodeButton');

    darkmodeButton.addEventListener('click', () => {
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
        //Alll code
        const computedStyle = window.getComputedStyle(codeElements[0]);
        const currentCodeColor = computedStyle.color; // Text color
        const currentCodeBackground = computedStyle.backgroundColor; // Background color
        codeElements.forEach(code =>   {
            code.style.color = currentCodeColor === 'rgb(165, 197, 211)' ? 'rgb(86, 116, 131)' : 'rgb(165, 197, 211)'; // Check RGB values
            code.style.backgroundColor = currentCodeBackground === 'rgb(65, 77, 91)' ? 'rgb(243, 246, 251)' : 'rgb(65, 77, 91)'; // Check RGB values
        });
    });
    } else {
    console.error("Button with id 'fontColorButton' not found in the DOM.");
    }
});
