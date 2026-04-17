function convertPoint(){
	
  var s = activeDocument.selection;
  if(s.length < 1) return;
  var distP = 0.1;
  var p;
//alert(s.length);
    // Settings ==========================

  // merge the anchor points when the distance between
  // 2 points is within ### square root ### of this value (in point)
  //var distP = 0.01; 
  //distP = prompt("Точность ", 0.01);
  // ===================================
//alert("s - "+s.length);
    for(var j = 0; j < s.length; j++){

		p = s[j].pathPoints;

		//isCorner(p, 0);
			//alert(j+" - "+p.length);
		for (var i = 1; i <= p.length-1; i++){
			//if(p[i].pointType == ptyp){
			//if (isCorner(p, i)) {
				//alert(i+" - "+p[i].pointType);
			//	isSelected(p[i]);
		//	if (p[i].selected == PathPointSelection.ANCHORPOINT) {
				if ( i == p.length-1) {
					smoothPoint(p[i-1], p[i], p[0], distP);
				} else {
					smoothPoint(p[i-1], p[i], p[i+1], distP);
				}
				//alert(i);
        //  }

			//}
		}
	}
	activeDocument.selection = s;
	
}

function smoothPoint(prevPoint, currPoint, nextPoint, scaleDistanceForHandle) {
		var theta;
        var thetaPrev;
        var thetaNext;
        var pairDistance;
        var deltaX;
        var deltaY;
        //var scaleDistanceForHandle = 0.01;
		
		currPoint.pointType = PointType.SMOOTH;	

		/*
         * Если у точки есть оба маркера выходим.
         */
		 //alert(dist(currPoint.leftDirection, currPoint.anchor) + " "+ dist(currPoint.leftDirection, currPoint.anchor));
		if (getPairDistance(currPoint.leftDirection, currPoint.anchor) >= scaleDistanceForHandle &
			getPairDistance(currPoint.rightDirection, currPoint.anchor) >= scaleDistanceForHandle){
				/*
			alert (	fixed(currPoint.leftDirection[0], 2) + ","+fixed(currPoint.leftDirection[1], 2)+ "\n"+
					fixed(currPoint.rightDirection[0], 2)+ ","+fixed(currPoint.rightDirection[1], 2)+ "\n"+
					Array( fixed(currPoint.anchor[0], 2), fixed(currPoint.anchor[1], 2)));
					*/
			return;
		} else {
		/*
         * Если соседних точек нет.
         */
        if (prevPoint == null && nextPoint == null) {
                //просто возврат.
                return;
        }
		else if (prevPoint == null) {
                /*
				* Если предыдущая точка отсутствует, маркер leftDirection
				* будет отведен, а маркер rightDirection
				* будет указывать непосредственно на следующую точку. Тета будет
				* углом к ​​следующей точке, но здесь к нему нужно прибавить ПИ,
				* поскольку мы добавляем ПИ к тета ниже перед вычислением
				* маркера rightDirection.
                 */
                prevPoint = currPoint;
                theta = getPairTheta(currPoint.anchor, nextPoint.anchor);
                theta += Math.PI;
        }
        else if (nextPoint == null) {
                /*
				* Если следующая точка отсутствует, маркер rightDirection
				* будет отведен назад, а маркер leftDirection
				* будет указывать непосредственно на предыдущую точку. Тета будет
				* углом к ​​предыдущей точке.
                 */
                nextPoint = currPoint;
                theta = getPairTheta(currPoint.anchor, prevPoint.anchor);
        }
        else {
                /*
				* Если присутствуют оба соседа, тета будет равна среднему
				* углов от текущей точки до каждой из предыдущих
				* и следующей точек за вычетом ПИ/2. Метка leftDirection должна
				* указывать в направлении предыдущей точки, поэтому скорректируйте тета
				* прибавив ПИ, если абсолютная разница между тета и
				* углом до предыдущей точки больше ПИ/2.
                 */
                thetaPrev = getPairTheta(currPoint.anchor, prevPoint.anchor);
                thetaNext = getPairTheta(currPoint.anchor, nextPoint.anchor);
                var addpi = 0;

                theta = (thetaPrev + thetaNext) / 2 - (Math.PI / 2);
                if (Math.abs(theta - thetaPrev) > (Math.PI / 2)) {
                        theta += Math.PI;
                        addpi = 1;
                }
               // alert("thetaPrev="+thetaPrev+" thetaNext="+thetaNext+" theta="+theta+" addpi"+addpi);
        }

        /*
		* Обнулите маркеры направления, установив их равными текущей
		* точке привязки.
         */
        //currPoint.leftDirection = Array( currPoint.anchor[0], currPoint.anchor[1]);
        //currPoint.rightDirection = Array( currPoint.anchor[0], currPoint.anchor[1]);

        /*
		* Рассчитать новую точку сглаживания leftDirection. Она будет находиться под
		* ранее рассчитанным углом и увеличит масштабированную часть
		* расстояния между текущей точкой и предыдущей.
         */
		 var addt = false;
		 var distance = scaleDistanceForHandle;
		 if (getPairDistance(currPoint.leftDirection, currPoint.anchor) < scaleDistanceForHandle){
				if (getPairDistance(currPoint.rightDirection, currPoint.anchor) < scaleDistanceForHandle) { 
					//theta += Math.PI;
					addt = true;
				} else {
				//theta = getPairTheta(nextPoint.anchor, currPoint.anchor);		
				theta = getPairTheta(currPoint.anchor, currPoint.rightDirection) + Math.PI;	
				}				
				pairDistance = getPairDistance(prevPoint.anchor, currPoint.anchor);
				if (pairDistance > (distance*6)) distance = scaleDistanceForHandle*2; else distance = scaleDistanceForHandle;
				deltaX = Math.cos(theta) * distance;
				deltaY = Math.sin(theta) * distance;
				currPoint.leftDirection = Array( currPoint.anchor[0], currPoint.anchor[1]);
				currPoint.leftDirection = Array( currPoint.anchor[0]+deltaX, currPoint.anchor[1]+deltaY);	
			 
		 }
		 if (getPairDistance(currPoint.rightDirection, currPoint.anchor) < scaleDistanceForHandle){
				if (addt) {
					theta += Math.PI;	
				} else {
				//theta = getPairTheta(prevPoint.anchor, currPoint.anchor);
				theta = getPairTheta(currPoint.leftDirection, currPoint.anchor);	
				}				
				pairDistance = getPairDistance(nextPoint.anchor, currPoint.anchor);
				if (pairDistance > (distance*6)) distance = scaleDistanceForHandle*2; else distance = scaleDistanceForHandle;
				deltaX = Math.cos(theta) * distance;
				deltaY = Math.sin(theta) * distance;
				currPoint.rightDirection = Array( currPoint.anchor[0], currPoint.anchor[1]);
				currPoint.rightDirection = Array( currPoint.anchor[0]+deltaX, currPoint.anchor[1]+deltaY);
			
		 } 
		 /*else {
        pairDistance = getPairDistance(prevPoint.anchor, currPoint.anchor);
        deltaX = Math.cos(theta) * scaleDistanceForHandle * pairDistance;
        deltaY = Math.sin(theta) * scaleDistanceForHandle * pairDistance;
			currPoint.leftDirection = Array(currPoint.anchor[0]+deltaX, currPoint.anchor[1]+deltaY);


         // Теперь скорректируйте тета, добавив ПИ, и вычислите маркер rightDirection.

        theta += Math.PI;
        pairDistance = getPairDistance(nextPoint.anchor, currPoint.anchor);
        deltaX = Math.cos(theta) * scaleDistanceForHandle * pairDistance;
        deltaY = Math.sin(theta) * scaleDistanceForHandle * pairDistance;
			currPoint.rightDirection = Array(currPoint.anchor[0]+deltaX, currPoint.anchor[1]+deltaY);
		 }
		 */
		// currPoint.pointType = PointType.SMOOTH;	
	}
}

 /* Function: getPairTheta
* Возвращает угол относительно оси X, образованный линией между
* двумя точками, которые передаются в качестве аргументов. Угол измеряется
* относительно точки A (как если бы точка A была перемещена в начало координат, а угол
* измеряется относительно самой оси X). Аргументы должны быть
* массивами из двух чисел (X, Y), определяющих точку. Возвращаемое значение указывается в
* радианах (от ПИ до -ПИ)
 */
function getPairTheta(pairA,pairB){
        var deltaX=pairB[0]-pairA[0];
        var deltaY=pairB[1]-pairA[1];
        /*alert("deltaX="+deltaX+" deltaY="+deltaY);*/
        return(Math.atan2(deltaY, deltaX));
}

/*******************************************************************************
 * Function: getPairDistance
* Возвращает расстояние между двумя точками. Аргументы должны быть
* массивами из двух чисел (X, Y), определяющими точку. Возвращаемое значение — это
* расстояние в единицах относительно входных данных.
 */
function getPairDistance(pairA,pairB){
        var deltaX=pairB[0]-pairA[0];
        var deltaY=pairB[1]-pairA[1];
        return(Math.sqrt((deltaX*deltaX)+(deltaY*deltaY)));
}

function fixed(arrayPoints, fix){
	return ((parseInt(arrayPoints * Math.pow(10, fix))) / Math.pow(10, fix));
	
}