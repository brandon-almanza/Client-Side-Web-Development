var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");

        var bugReady = false;
        var bugImage = new Image();
        bugImage.onload = function () {
            bugReady = true;
            console.log("Bug image loaded successfully");
        };

        bugImage.onerror = function() {
            console.error("Could not load bug image");
            bugReady = false;
        };

        bugImage.src = "BUGSMASHER.png";

        var bug = {
            x: 0,
            y: 0,
            width: 95,
            height: 90
        };
        var score = 0;
        var initialHopInterval = 1000;
        var hopInterval = initialHopInterval;
        var hopTimer = null;
        var gameRunning = false;

        function init() {
            resetGame();
            startGame();
            
            document.getElementById("resetSpeed").addEventListener("click", function() {
                hopInterval = initialHopInterval;
                clearInterval(hopTimer);
                startHopping();
                console.log("Speed reset to " + hopInterval + "ms");
            });
            
            document.getElementById("resetScore").addEventListener("click", function() {
                score = 0;
                hopInterval = initialHopInterval;
                clearInterval(hopTimer);
                startHopping();
                console.log("Score reset");
            });
            
            canvas.addEventListener("click", function(e) {
                if (!gameRunning) return;
                
                var rect = canvas.getBoundingClientRect();
                var mouseX = e.clientX - rect.left;
                var mouseY = e.clientY - rect.top;
                
                if (mouseX >= bug.x && mouseX <= bug.x + bug.width &&
                    mouseY >= bug.y && mouseY <= bug.y + bug.height) {
                    
                    score++;
                    
                    hopInterval = Math.max(100, hopInterval - 50);
                    
                    moveBug();
                    
                    clearInterval(hopTimer);
                    startHopping();
                }
            });
        }

        function resetGame() {
            score = 0;
            hopInterval = initialHopInterval;
            moveBug();
        }

        function startGame() {
            if (gameRunning) return;
            gameRunning = true;
            startHopping();
            requestAnimationFrame(main);
        }

        function startHopping() {
            hopTimer = setInterval(moveBug, hopInterval);
        }

        function moveBug() {
            bug.x = Math.random() * (canvas.width - bug.width);
            bug.y = Math.random() * (canvas.height - bug.height);
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#2c3e50";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if (bugReady) {
                ctx.drawImage(bugImage, bug.x, bug.y, bug.width, bug.height);
            } else {

                ctx.fillStyle = "#e74c3c";
                ctx.beginPath();
                ctx.arc(bug.x + bug.width/2, bug.y + bug.height/2, bug.width/2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.font = "12px Arial";
                ctx.fillText("BUG", bug.x + 10, bug.y + bug.height/2);
            }

            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Bugs smashed: " + score, 32, 32);
            
            ctx.fillStyle = "rgb(200, 200, 200)";
            ctx.font = "16px Helvetica";
            ctx.fillText("Speed: " + (initialHopInterval - hopInterval + 100) + "/" + initialHopInterval, 32, 60);
        }
        function main() {
            render();
            requestAnimationFrame(main);
        }
        window.onload = init;