
$(document).ready(function () {
    var emptyTile = {
        X: 300,
        Y: 300,
        prevX: 0,
        prevY: 0
    }
    var animationSpeed = 40;


    var divs = $('#puzzlearea div');
    var init = function () {
        // initialize each piece
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            //div.onclick = onPuzzlePieceClick;
            $(div).bind({
                mouseover: onPizzlePieceMouseover,
                mouseout: onPizzlePieceMouseout,
                click: onPuzzlePieceClick
            });
            //div.onmouseover = onPizzlePieceHover;
            // calculate x and y for this piece
            var x = ((i % 4) * 100);
            var y = (Math.floor(i / 4) * 100);
            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url(background.jpg)';
            div.style.backgroundPosition = (-x) + 'px ' + (-y) + 'px';
            // store x and y for later
            div.x = x;
            div.y = y;
        }
    };

    var onPuzzlePieceClick = function () {
        moveTile(this);
    }

    var onPizzlePieceMouseover = function(){
        if(tileCheck(this)){
            this.style.color = "red";
            this.style.borderColor = "red";
        }
    }
    var onPizzlePieceMouseout = function(){
        this.style.color = "black";
        this.style.borderColor = "black";
    }

    var tileCheck = function (tile) {
        if (Math.abs(tile.x - emptyTile.X) <= 100 && Math.abs(tile.y - emptyTile.Y) <= 100) {
            if (!(Math.abs(tile.x - emptyTile.X) == 100 && Math.abs(tile.y - emptyTile.Y) == 100))
                return true;
        }
        return false;
    }

    var moveTile = function (tile) {
        if (tileCheck(tile)) {
            //console.log(tile.x, tile.y);
            //used to change tiles
            emptyTile.prevX = tile.x;
            emptyTile.prevY = tile.y;
            //change tile position
            tile.x = emptyTile.X;
            tile.y = emptyTile.Y;
            //tile.style.left = emptyTile.X + "px";
            $(tile).animate({ left: emptyTile.X + "px"}, animationSpeed);
            //tile.style.top = emptyTile.Y + "px";
            $(tile).animate({ top: emptyTile.Y + "px"}, animationSpeed);
            //set empty tile
            emptyTile.X = emptyTile.prevX
            emptyTile.Y = emptyTile.prevY
        }
    }

    var shuffle = function (times) {
        animationSpeed = 1;
        for (let i = 0; i < 500; i++) {
            let decider = Math.floor(Math.random() * 2);
            if (decider === 0)
                randomMoveX();
            else randomMoveY();
        }
        animationSpeed = 50;
    }

    var randomMoveX = function () {
        let decider = Math.floor(Math.random() * 2);

        let tileToMove = $.grep(divs, function (div, i) {
            if (emptyTile.X == 300)
                return div.x == emptyTile.X - 100 && div.y == emptyTile.Y;
            else if (emptyTile.X == 0)
                return div.x == emptyTile.X + 100 && div.y == emptyTile.Y;
            else {
                if (decider == 0)
                    return div.x == emptyTile.X - 100 && div.y == emptyTile.Y;
                else
                    return div.x == emptyTile.X + 100 && div.y == emptyTile.Y;
            }
        })[0];
        moveTile(tileToMove);
    }
    var randomMoveY = function () {
        let decider = Math.floor(Math.random() * 2);

        let tileToMove = $.grep(divs, function (div, i) {
            if (emptyTile.Y == 300)
                return div.x == emptyTile.X && div.y == emptyTile.Y - 100;
            else if (emptyTile.Y == 0)
                return div.x == emptyTile.X && div.y == emptyTile.Y + 100;
            else {
                if (decider == 0)
                    return div.x == emptyTile.X && div.y == emptyTile.Y - 100;
                else
                    return div.x == emptyTile.X && div.y == emptyTile.Y + 100;
            }
        })[0];
        moveTile(tileToMove);
    }

    init();
    $('#shufflebutton').click(shuffle);
});
