window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var main = (function () {

    // Module vars
    var canvas, ctx;

    var fractal = function (order, size) {
        if (order === 0) {

        }
        else {

        }
    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fractal()
    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);
        draw();
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create object


        // Event handlers
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;


/*def koch(t, order, size):
    if order == 0:
        t.forward(size)
    else:
        for angle in [60, -120, 60, 0]:
            koch(t, order-1, size/3)
            t.left(angle)*/