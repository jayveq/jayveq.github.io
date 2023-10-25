const matrixContainer = document.getElementById("matrix-container");
const matrix = document.getElementById("matrix");
const characters = []; // Define characters as a global array

let running = false;
let stopped = false;

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
    if (running) return;

    running = true;
    matrixContainer.style.display = "block";

    // Generate and add characters to the matrix
    for (let i = 0; i < 100; i++) {
        const character = createCharacter();
        characters.push(character); // Add the character to the global array
        matrix.appendChild(character);
    }

    // Animate the matrix
    function animate() {
        if (stopped) {
            return;
        }

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

// Stop the animation
function stopMatrix() {
    if (!running) return;

    running = false;
    stopped = true;
    matrixContainer.style.display = "none";
    characters.forEach((character) => matrix.removeChild(character));
}

// Listen for keyboard input
document.addEventListener("keyup", (event) => {
    if (event.key.toLowerCase() === "n") {
        document.addEventListener("keyup", (event) => {
            if (event.key.toLowerCase() === "e") {
                document.addEventListener("keyup", (event) => {
                    if (event.key.toLowerCase() === "o") {
                        startMatrix();
                    }
                });
            }
        });
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        stopMatrix();
    }
});
