(function () {
    "use strict";

    var picturePuzzle = function () {

        var directive = {};

        directive.restrict = "A";

        directive.scope = {
            picturePuzzle: "="
        };

        directive.link = function (scope, element) {

            scope.picturePuzzle = scope.picturePuzzle || {};

            // get puzzle details
            var puzzleDetails = scope.picturePuzzle.puzzleDetails || {};

            var gridCells = [],
                isGameOn,
                blockLength = 80, //default
                height = puzzleDetails.height || 350,
                width = puzzleDetails.width || 350,
                zindex = 1,
                maxXPos = width - (blockLength / 2),
                maxYPos = height - (blockLength / 2),
                orignalPosition,
                offsetTop = 0,
                offsetLeft = 0;

            // define action functions
            function allowDrop(ev) {
                element.removeClass("solvedPuzzle");
                if (!isGameOn) {
                    return;
                }
                ev.preventDefault();
            }
            function drag(ev) {
                if (!isGameOn) {
                    return;
                }
                ev.dataTransfer.setData("text", ev.target.id);
            }
            function drop(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                ev.target.className = "puzzlePiece";

                var sourceIndex = ev.dataTransfer.getData("text"),
                    targetIndex = ev.target.id,
                    sourceCell,
                    targetCell,
                    isPuzzleUnsolved = true,
                    temp;

                sourceIndex = parseInt(sourceIndex, 10);
                targetIndex = parseInt(targetIndex, 10);

                if (sourceIndex !== targetIndex) {

                    sourceCell = gridCells[sourceIndex];
                    targetCell = gridCells[targetIndex];

                    // swap positions

                    // swap x coordinate
                    temp = sourceCell.style.left;
                    sourceCell.style.left = targetCell.style.left;
                    targetCell.style.left = temp;

                    // swap y coordinate
                    temp = sourceCell.style.top;
                    sourceCell.style.top = targetCell.style.top;
                    targetCell.style.top = temp;

                    isPuzzleUnsolved = gridCells.some(function (cell) {
                        return cell.style.left !== cell.style.backgroundPositionX.replace("-", "") || cell.style.top !== cell.style.backgroundPositionY.replace("-", "");
                    });
                }

                if (!isPuzzleUnsolved) {
                    element.removeClass("gameOn");
                    element.addClass("solvedPuzzle");
                    isGameOn = false;
                }
            }
            function enterDropArea(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                ev.target.className = "puzzlePiece highLightBorder";
            }
            function leaveDropArea(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                ev.target.className = "puzzlePiece";
            }
            function touchstart(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                orignalPosition = {
                    left: ev.target.style.left,
                    top: ev.target.style.top
                };

                ev.target.style.zIndex = 2;

                // set offset for touches
                var offsetValues = $(element[0]).offset();
                offsetTop = offsetValues.top;
                offsetLeft = offsetValues.left;
            }

            function touchmove(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                var touch = ev.touches[0];


                var xPos = (touch.pageX - offsetLeft),
                    yPos = (touch.pageY - offsetTop),
                    targetX,
                    targetY;

                if (xPos < (blockLength / 2)) {
                    xPos = (blockLength / 2);
                } else if (xPos > maxXPos) {
                    xPos = maxXPos;
                }
                if (yPos < (blockLength / 2)) {
                    yPos = (blockLength / 2);
                } else if (yPos > maxYPos) {
                    yPos = maxYPos;
                }

                targetX = xPos - (xPos % blockLength) + "px";
                targetY = yPos - (yPos % blockLength) + "px";

                gridCells.forEach(function (cell) {
                    if (cell.style.left === targetX && cell.style.top === targetY) {
                        cell.className = "puzzlePiece highLightBorder";
                    } else {
                        cell.className = "puzzlePiece";
                    }
                });

                ev.target.style.transition = "none";
                ev.target.style.left = (xPos - (blockLength / 2)) + "px";
                ev.target.style.top = (yPos - (blockLength / 2)) + "px";
            }
            function touchend(ev) {
                ev.preventDefault();
                if (!isGameOn) {
                    return;
                }
                var touch = ev.changedTouches[0],
                    targetCell = ev.target,
                    isPuzzleUnsolved,
                    isSwapped;


                var xPos = (touch.pageX - offsetLeft),
                    yPos = (touch.pageY - offsetTop),
                    targetX,
                    targetY;

                if (xPos < 0) {
                    xPos = 0;
                } else if (xPos > maxXPos) {
                    xPos = maxXPos;
                }
                if (yPos < 0) {
                    yPos = 0;
                } else if (yPos > maxYPos) {
                    yPos = maxYPos;
                }

                targetX = xPos - (xPos % blockLength) + "px";
                targetY = yPos - (yPos % blockLength) + "px";

                gridCells.forEach(function (cell) {
                    var temp;
                    if (cell.style.left === targetX && cell.style.top === targetY) {

                        // swap positions
                        isSwapped = true;

                        // swap x coordinate
                        temp = cell.style.left;
                        cell.style.left = orignalPosition.left;
                        targetCell.style.left = temp;

                        // swap y coordinate
                        temp = cell.style.top;
                        cell.style.top = orignalPosition.top;
                        targetCell.style.top = temp;

                        cell.style.zIndex = 2;
                    }
                    cell.className = "puzzlePiece";
                    cell.style.zIndex = 1;
                    cell.style.transition = "top 0.35s linear, left 0.35s linear";
                });

                if (!isSwapped) {
                    targetCell.style.left = orignalPosition.left;
                    targetCell.style.top = orignalPosition.top;
                } else {

                    isPuzzleUnsolved = gridCells.some(function (cell) {

                        var posX = cell.style.backgroundPositionX.replace("-", ""),
                            posY = cell.style.backgroundPositionY.replace("-", "");
                        return cell.style.left !== posX || cell.style.top !== posY;
                    });

                    if (!isPuzzleUnsolved) {
                        element.removeClass("gameOn");
                        element.addClass("solvedPuzzle");
                    }
                }
            }

            setTimeout(function () {
                var grid = element[0],
                    xPos = 0,
                    yPos;

                grid.style.backgroundImage = "none";

                while (width > xPos) {
                    yPos = 0;
                    while (height > yPos) {
                        var cell = document.createElement("article");

                        // add drag events            
                        cell.draggable = true;
                        cell.ondragstart = drag;
                        cell.ondrop = drop;
                        cell.ondragover = allowDrop;
                        cell.ondragenter = enterDropArea;
                        cell.ondragleave = leaveDropArea;
                        cell.addEventListener('touchstart', touchstart, false);
                        cell.addEventListener('touchmove', touchmove, false);
                        cell.addEventListener('touchend', touchend, false);

                        cell.id = gridCells.length;
                        cell.className = "puzzlePiece";
                        cell.style.top = yPos + "px";
                        cell.style.backgroundPositionY = ((-1) * yPos) + "px";
                        cell.style.left = xPos + "px";
                        cell.style.backgroundPositionX = ((-1) * xPos) + "px";
                        gridCells.push(cell);
                        grid.appendChild(cell);
                        yPos += blockLength;
                    }
                    xPos += blockLength;
                }
            }, 1000);


            // anchor method to shuffle pieces
            scope.picturePuzzle.shufflePieces = function () {
                element.removeClass("solvedPuzzle");
                var cellCount = gridCells.length;
                gridCells.forEach(function (cell, index) {
                    var randonIndex = index,
                        targetCell,
                        temp,
                        tries = 5;
                    while (index === randonIndex && tries) {
                        randonIndex = parseInt(Math.random() * cellCount, 10);
                        tries -= 1;
                    }

                    targetCell = gridCells[randonIndex];

                    // swap positions

                    // swap x coordinate
                    temp = cell.style.left;
                    cell.style.left = targetCell.style.left;
                    targetCell.style.left = temp;

                    // swap y coordinate
                    temp = cell.style.top;
                    cell.style.top = targetCell.style.top;
                    targetCell.style.top = temp;

                });
                element.addClass("gameOn");
                isGameOn = true;
            }

            // anchor method to reset pieces
            scope.picturePuzzle.resetPieces = function () {
                element.removeClass("gameOn");
                element.removeClass("solvedPuzzle");
                gridCells.forEach(function (cell) {

                    cell.style.left = cell.style.backgroundPositionX.replace("-", "");

                    // swap y coordinate
                    cell.style.top = cell.style.backgroundPositionY.replace("-", "");

                    cell.className = "puzzlePiece";

                });
                isGameOn = false;
            };

            scope.picturePuzzle.highlightWrongPieces = function () {

                if (isGameOn) {

                    gridCells.forEach(function (cell) {

                        var posX = cell.style.backgroundPositionX.replace("-", ""),
                            posY = cell.style.backgroundPositionY.replace("-", "");

                        if (cell.style.left !== posX || cell.style.top !== posY) {
                            cell.className += " notInItsPlace";
                        }
                    });
                }

            };
        };

        return directive;
    };

    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("picturePuzzle", picturePuzzle);
}());