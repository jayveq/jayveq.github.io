const matrixContainer = document.getElementById("matrix-container");
const matrix = document.getElementById("matrix");
const characters = [];

// Generate random characters
function generateCharacter() {
    return String.fromCharCode(Math.floor(Math.random() * 95) + 32);
}

// Create a matrix character
function createCharacter() {
    const character = document.createElement("span");
    character.textContent = generateCharacter();
    character.style.fontSize = "12px";
    character.style.position = "absolute";
    character.style.bottom = "100%";
    character.style.left = Math.floor(Math.random() * 100) + "%";
    return character;
}

// Start the animation
function startMatrix() {
    matrixContainer.style.display = "block";

    // Generate and add characters to the matrix
    for (let i = 0; i < 100; i++) {
        const character = createCharacter();
        characters.push(character);
        matrix.appendChild(character);
    }

    // Animate the matrix
    function animate() {
        characters.forEach((character) => {
            const currentBottom = parseFloat(character.style.bottom);
            if (currentBottom < 0) {
                character.style.bottom = "100%";
                character.textContent = generateCharacter();
            } else {
                character.style.bottom = currentBottom - 1 + "%";
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Start the animation immediately on page load
startMatrix();
