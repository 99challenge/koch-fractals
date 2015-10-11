
var main = (function (Victor) {

    // Module vars
    var canvas, ctx, k;

    var radians = function (deg) {
        return deg * (Math.PI / 180);
    };

    var KochFractal = function () {
        this.start = new Victor(0, canvas.height - 20);
        this.end = new Victor(canvas.width, canvas.height - 20);
        this.lines = [];
        this.count = 0;

        this.restart();
    };

    KochFractal.prototype.nextLevel = function () {
        this.lines = this._iterate();
        this.count++;
    };

    KochFractal.prototype.restart = function () {
        this.count = 0;
        this.lines = [];
        this.lines.push(new KochLine(this.start, this.end));
    };

    KochFractal.prototype.getCount = function () {
        return this.count;
    };

    KochFractal.prototype.render = function () {
        var len = this.lines.length, i;

        for (i = 0; i < len; i++) {
            this.lines[i].display();
        }
    };

    KochFractal.prototype._iterate = function () {
        var now = [], len = this.lines.length, i;

        for (i = 0; i < len; i++) {
            var l = this.lines[i];

            // Calculate 5 koch vectors
            var a = l.start(),
                b = l.kochleft(),
                c = l.kochmiddle(),
                d = l.kochright(),
                e = l.end();

            // Make line segments between all the vectors and add them
            now.push(new KochLine(a,b));
            now.push(new KochLine(b,c));
            now.push(new KochLine(c,d));
            now.push(new KochLine(d,e));
        }

        return now;
    };

    var KochLine = function (start, end) {
        this.a = start.clone();
        this.b = end.clone();
    };

    KochLine.prototype.display = function () {
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    };

    KochLine.prototype.start = function () {
        return this.a.clone();
    };

    KochLine.prototype.end = function () {
        return this.b.clone();
    };

    KochLine.prototype.kochleft = function () {
        var v = this.b.clone();
        v.subtract(this.a);
        v.divide(new Victor(3, 3));
        v.add(this.a);
        return v;
    };

    KochLine.prototype.kochmiddle = function () {
        var v = this.b.clone();
        v.subtract(this.a);
        v.divide(new Victor(3, 3));

        var p = this.a.clone();
        p.add(v);

        v.rotate(-radians(60));
        p.add(v);

        return p;
    };

    KochLine.prototype.kochright = function () {
        var v = this.a.clone();
        v.subtract(this.b);
        v.divide(new Victor(3, 3));
        v.add(this.b);
        return v;
    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        k.render();
        k.nextLevel();
        if (k.getCount() > 6) {
            k.restart();
        }
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create object
        k = new KochFractal();

        // Event handlers
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        setInterval(draw, 1000);
    };

    return {
        'init': init
    }

})(Victor);

window.onload = main.init;