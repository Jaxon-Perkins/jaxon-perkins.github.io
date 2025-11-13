$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    createPlatform(500, 0, 20, 290);
    createPlatform(1350, 400, 50, 50, "red");
    createPlatform(50, 300, 200, 10)
    createPlatform(750, 410, 100, 10)
    createPlatform(950, 300, 100, 10)
    createPlatform(50, 500, 1000, 10)
    createPlatform(700, 610, 10, 100)


    // TODO 3 - Create Collectables
    createCollectable("diamond", 300, 600, 0)
    createCollectable("grace", 950, 250, 0, 0)
    createCollectable("database", 1350, 350, 0, 0)
    createCollectable("max", 600, 220, 0, 0)



    // TODO 4 - Create Cannons

    createCannon("right", 500, 1000)
    createCannon("bottom", 250, 1000)
    createCannon("right", 750, 1000)




    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
