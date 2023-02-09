// ----------------------------------------------
// return the [x, y] coordinate on the bezier curve
// that corresponds to the paramter "t"
const curve = {

  arcfn: function (q, t) {
      const d = firstDerivative(q, t);
      var l = d[0] * d[0] + d[1] * d[1];

      return sqrt(l);
    },

  bezier: function (q, t) {
  var u = 1 - t;
  return [u*u*u * q[0][0] + 3*u*t*(u* q[1][0] + t* q[2][0]) + t*t*t * q[3][0],
          u*u*u * q[0][1] + 3*u*t*(u* q[1][1] + t* q[2][1]) + t*t*t * q[3][1]];
  },
firstDerivative: function (q, t) {
  var u = 1 - t;
  return [-3*u*u * q[0][0] + 3*(3*t*t - 4*t + 1)*q[1][0] + 3*(2*t - 3*t*t) * q[2][0] + 3*t*t * q[3][0],
          -3*u*u * q[0][1] + 3*(3*t*t - 4*t + 1)*q[1][1] + 3*(2*t - 3*t*t) * q[2][1] + 3*t*t * q[3][1]];
  },

secondDerivative: function (q, t) {
  var u = 1 - t;
  return [6*u * q[0][0] + 3*(6*t - 4)*q[1][0] + 3*(2 - 6*t) * q[2][0] + 6*t * q[3][0],
          6*u * q[0][1] + 3*(6*t - 4)*q[1][1] + 3*(2 - 6*t) * q[2][1] + 6*t * q[3][1]];
  },

linear: function (p1, p2, t) {
    // spec for linear
  
      return [
        ((1-t) * p1[0] + t * p2[0]),
        ((1-t) * p1[1] + t * p2[1])
      ];
    
  },

  _getTangent: function(pnts, n){
    var ar = []
    var ts = [];
    ts = ts.concat( equation2( 3*pnts[n+0], 2*pnts[n+1], pnts[n+2] ) );
    for(var i=0; i<ts.length; i++){
      if(ts[i]<=1 && ts[i]>=0) ar.push(ts[i]);
    }
    if(ar.length>2) ar.sort();
    return ar;
  }
}

  // ----------------------------------------------
function divide(pnts, t, ts, te){
  var pnts= [pnts[0][0], pnts[0][1], pnts[1][2], pnts[1][0]];
  //for (i=0; i< pnts.length; i++) pnts.push(getDat(q[i]));

  var k = [kappa(pnts, t), kappa(pnts, (t - ts)/2 + ts), kappa(pnts, (te - t)/2 + t)];
  //if (Math.abs(k) < 0.05) k = 0.1;
  var R = Math.max(Math.abs( 1 / k[0] ), Math.abs( 1 / k[1] ), Math.abs( 1 / k[2] ));

  //alert(t+'  '+ ((t - ts)/2 + ts) +'  '+ ((te - t)/2 + t));

  anc = curve.bezier(pnts, t);
  //r = drawCurvePoint(pnts[1].leftDirection, pnts[0].leftDirection, t);
  //l = drawCurvePoint(pnts[1].rightDirection, pnts[0].rightDirection, t);
  var l = defDir(pnts, 0, t);
  var r = defDir(pnts, 1, t);

      return [ anc, r, l, PointType.SMOOTH, R ];
    }

  // ----------------------------------------------
// returns the [x, y] coordinate of the handle of the point on the bezier curve
// that corresponds to the parameter "t"
// q=4 points, t=paramter, anc=coordinate of anchor

function defDir(q, n, t){ // n=0:ldir, n=1:rdir

  var dir = [ t * (t * (q[n][0] - 2 * q[n+1][0] + q[n+2][0]) + 2 * (q[n+1][0] - q[n][0])) + q[n][0],
              t * (t * (q[n][1] - 2 * q[n+1][1] + q[n+2][1]) + 2 * (q[n+1][1] - q[n][1])) + q[n][1]];
  return [dir[0], dir[1]];
}

/*
function defDir(q, n, t, anc){ // n=0:ldir, n=1:rdir
var u = (1-t);
  return [(u * u * q[n][0] + 2 * t * u * q[n+1][0] + t * q[n+2][0]),
          (u * u * q[n][1] + 2 * t * u * q[n+1][1] + t * q[n+2][1])];
}
*/

// ------------------------------------------------
// solve ax^2+bx+c=0
function equation2(a,b,c) {
  if(a == 0) return b == 0 ? [] : [-c / b];
  a *= 2;
  var d = b * b - 2 * a * c;
  if(d < 0) return [];
  var rd = Math.sqrt(d);
  if(d > 0) return [(-b + rd) / a, (-b - rd) / a];
  else return [-b / a];
}

function markPnt(p, L){
  //var r1 = 1.0;
  var E = L.pathItems.ellipse(
    p[1] + p.r, p[0] - p.r, p.r*2, p.r*2);
    E.filled = false;
    E.stroked = true;
    E.strokeColor = PMagenta;
    E.strokeWidth = 0.1*mm;
}

function markLn(p1, p2){
  //var r1 = 1.0;
 var L = activeDocument.activeLayer.pathItems.add();
 //L.stroked = true;
 //L.strokeColor = PCyan;
 //L.strokeWidth = 0.1*mm;
 L.filled = false;
 L.setEntirePath( Array( p1, p2 ) );
}

function _getC(q, t){
  var u = (1-t);
  var ut = (u * u * u) / (t * t * t + u * u * u);

  var C = [ ut * q[0][0] + (1-ut) * q[1][0] ,
            ut * q[0][1] + (1-ut) * q[1][1] ];
  return C;
}

function _ratioTcub(t){
  var u = (1-t);
  var ratio = (t * t * t + u * u * u - 1) / (t * t * t + u * u * u);

  return Math.abs(ratio);
}

function _getA(B, C, t){
  var A = [ B[0] + (B[0] - C[0]) / _ratioTcub(t),
            B[1] + (B[1] - C[1]) / _ratioTcub(t)];
  return A;
}

function kappa(q, t){
 var   d = curve.firstDerivative(q, t);
 var  dd = curve.secondDerivative(q, t);
 var  numerator = d[0] * dd[1] - dd[0] * d[1];
 var  denominator = Math.pow(d[0]*d[0] + d[1]*d[1], 3/2);
  if (denominator == 0) return NaN;
  return numerator / denominator;
}

// ----------------------------------------------
function getccenter(p1, p2, p3) {
  var quart = Math.PI/2,
      tau = 2 * Math.PI;
  var dx1 = p2[0] - p1[0],
    dy1 = p2[1] - p1[1],
    dx2 = p3[0] - p2[0],
    dy2 = p3[1] - p2[1],
    dx1p = dx1 * Math.cos(quart) - dy1 * Math.sin(quart),
    dy1p = dx1 * Math.sin(quart) + dy1 * Math.cos(quart),
    dx2p = dx2 * Math.cos(quart) - dy2 * Math.sin(quart),
    dy2p = dx2 * Math.sin(quart) + dy2 * Math.cos(quart),
    // chord midpoints
    mx1 = (p1[0] + p2[0]) / 2,
    my1 = (p1[1] + p2[1]) / 2,
    mx2 = (p2[0] + p3[0]) / 2,
    my2 = (p2[1] + p3[1]) / 2,
    // midpoint offsets
    mx1n = mx1 + dx1p,
    my1n = my1 + dy1p,
    mx2n = mx2 + dx2p,
    my2n = my2 + dy2p,
    // intersection of these lines:
    arc = lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n);
    r = dist(arc, p1);

  // arc start/end values, over mid point:
  var s = Math.atan2(p1[1] - arc[1], p1[0] - arc[0]),
      m = Math.atan2(p2[1] - arc[1], p2[0] - arc[0]),
      e = Math.atan2(p3[1] - arc[1], p3[0] - arc[0]),
    _;
    var cw = true;
  // determine arc direction (cw/ccw correction)
  if (s < e) {
    // if s<m<e, arc(s, e)
    // if m<s<e, arc(e, s + tau)
    // if s<e<m, arc(e, s + tau)
    if (s > m || m > e) {
      s += tau;
    }
    if (s > e) {
      _ = e;
      e = s;
      s = _;
      cw = !cw;
    }
  } else {
    // if e<m<s, arc(e, s)
    // if m<e<s, arc(s, e + tau)
    // if e<s<m, arc(s, e + tau)
    if (e < m && m < s) {
      _ = e;
      e = s;
      s = _;
      cw = !cw;
    } else {
      e += tau;
    }
  }
  

  
 /*  if (((p1[0] - p3[0]) >= 0)) {
    cw = !cw;
    if ((p1[1] - p3[1]) < 0) cw = !cw;
  }
  if (((p1[0] - p3[0]) > 0) && (p1[1] - p3[1]) > 0) cw = !cw; */
  // assign and done.
  arc.x = s;
  arc.y = e;
  arc.r = r;
  //var tw = angle2 (arc, p1, p3);
  //arc.e = tw[0] * 57.295779513;
  //arc.s = tw[1] * 57.295779513;
  
  var s1 = angle (arc, p1) * 57.295779513;
  var e1 = angle (arc, p3) * 57.295779513;
  arc.s = cw ? s1 : e1;
  arc.e = cw ? e1 : s1;
  //alert(arc.s* 57.295779513 +' '+arc.e* 57.295779513);
  return arc;
}

function lli8(x1, y1, x2, y2, x3, y3, x4, y4) {
  var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
      ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
       d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (d == 0) {
    return false;
  }
  return [nx / d, ny / d ];
}

function angle (o, v1) {

    dx1 = v1[0] - o[0],
    dy1 = v1[1] - o[1],
    dx2 = 1,
    dy2 = 0;
    cross = dx1 * dy2 - dy1 * dx2,
    dot = dx1 * dx2 + dy1 * dy2;
  var t = Math.atan2(cross, dot);
  //t = Math.abs(t);
  t = t < Math.PI ? Math.PI*2 - t : t;
  //t = t > 0 ? Math.PI*2 + t : t;
  return t;
}

function angle2 (o, v1, v2) {
  //var sum = (v1[0] - v2[0]) * (v1[1] + v2[1]);
  //var cw = sum < 0;

  ts = getRad2(v1, o, [1, 0]);
  te = getRad2(v2, o, [1, 0]);
  ts > Math.PI ? Math.PI*2 - ts : ts;
  ts < 0 ? Math.PI*2 + ts : ts;
  te > Math.PI ? Math.PI*2 - te : te;
  te < 0 ? Math.PI*2 + te : te;

  return [ts, te];

}

// ----------------------------------------------
// return angle of the line drawn from "p1" [x,y] to "p2" [x,y]
function getRad(p1, p2) {
  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}

// ----------------------------------------------
// return angle of the polygonal line drawn through "p1" [x,y], "o" [x,y], "p2" [x,y]
// ( 0 - Math.PI)
function getRad2(p1, o, p2){
  var t = Math.abs(getRad(o, p2) - getRad(o, p1));
  return t>Math.PI ? Math.PI*2 - t : t;
}


function vect(o, a0, a3){
  var alpha = getRad2(a0, o, a3); // center angle of the arc
  var r = o.r;
   // the sign of distance
   var k = 4.0/3.0 * Math.tan(Math.abs(angle) / 4);

   d_sign = -1;
   if(a3[0] - a0[0] > 0){
     d_sign *= -1;
   }

  var hpi = Math.PI / 2.0;
  var t = getRad(a0, a3);  // angle of the line
  //alert(t);
  if(t != -hpi && t % hpi == 0){
    d_sign *= -1;
  }

  if (t < 0 && t > -hpi && t > hpi && t < 2*hpi) d_sign *= -1;

  var to0 = getRad(o, a0) - d_sign * hpi; // angle of handle at beginning side
  var to3 = getRad(o, a3) + d_sign * hpi; // ... at ending side

  


  //alert(to0 * 57.295779513+' '+to3 * 57.295779513);
  //var vX = v[0] - o.r * Math.cos(Math.PI - A);
  //var vY = v[1] - o.r * Math.sin(Math.PI - A);
  var han; // length of the handle
  if(Math.sin(alpha) == 0){
    han = 4 * (Math.sqrt(2) - 1) / 3 * r;
  } else if(alpha <= hpi / 2.0){
    // angle <= 90 degree : draw arc with 2 anchors
    han = r * 4 * (1 - Math.cos(alpha)) / (3 * Math.sin(alpha));
  } else if(alpha <= hpi){
    // angle <= 180 degree : 3 anchors
    han = r * 4 * (1 - Math.cos(alpha/2.0)) / (3 * Math.sin(alpha / 2.0));
  } else {
    // angle > 180 degree : 5 anchors
    han = r * 4 * (1 - Math.cos(alpha/4.0)) / (3 * Math.sin(alpha / 4.0));
  }
    

a0[2] = Math.cos(to0) * han + a0[0];
a0[3] = Math.sin(to0) * han + a0[1];
a3[2] = Math.cos(to3) * han + a3[0];
a3[3] = Math.sin(to3) * han + a3[1];
return ([a0, a3]);
}

function arcToB(o){
  tau = 2 * Math.PI;
  var x0 = o[0];
  var y0 = o[1];
  var r = o.r;
  var hpi = Math.PI / 2.0;
  o.s = o.s / 57.295779513;
  o.e = o.e / 57.295779513;
  //alert(o.ea+' '+o.sa);

  //var angle = getRad2(a0, o, a3); // center angle of the arc
  var angle = (o.e - o.s);

  var f = 4/3 * Math.tan( angle / 4 );

// alert (Math.round(angle * 57.295779513));
/*   if(angle <= hpi / 2.0){
    // angle <= 90 degree : draw arc with 2 anchors
    f += hpi / 2.0;
  } else if(angle <= hpi){
    // angle <= 180 degree : 3 anchors
    f += hpi;
  } else {
    // angle > 180 degree : 5 anchors

  } */

  var S =  [ (x0 + r * Math.cos(o.s)), (y0 + r * Math.sin(o.s)) ];
  var C1 = [ (x0 + r * (Math.cos(o.s) - f * Math.sin(o.s))), (y0 + r * (Math.sin(o.s) + f * Math.cos(o.s))) ];
  var C2 = [ (x0 + r * (Math.cos(o.e) + f * Math.sin(o.e))),
             (y0 + r * (Math.sin(o.e) - f * Math.cos(o.e))) ];
  var  E = [ (x0 + r * Math.cos(o.e)), (y0 + r * Math.sin(o.e)) ];

  S[2] = C1[0];
  S[3] = C1[1];
  E[2] = C2[0];
  E[3] = C2[1];

 //-----------------------------
 // Rotation
 /* S[0] = (S[0] * Math.cos(o.s) - S[1] * Math.sin(o.s));
 S[1] = (S[0] * Math.sin(o.s) + S[1] * Math.cos(o.s));
 S[2] = (S[2] * Math.cos(o.s) - S[3] * Math.sin(o.s));
 S[3] = (S[2] * Math.sin(o.s) + S[3] * Math.cos(o.s));

 E[0] = (E[0] * Math.cos(o.s) - E[1] * Math.sin(o.s));
 E[1] = (E[0] * Math.sin(o.s) + E[1] * Math.cos(o.s));
 E[2] = (E[2] * Math.cos(o.s) - E[3] * Math.sin(o.s));
 E[3] = (E[2] * Math.sin(o.s) + E[3] * Math.cos(o.s)); */

  return ([S, E]);

}

function deg_0_to_360 ( angle )
{
    while ( angle < 0.0 )
        angle += 2 * Math.PI ;
    while ( angle > 2 * Math.PI )
    angle -= 2 * Math.PI ;
    return angle ;
}

// ----------------------------------------------
// return [a, b, c] of ax+by+c=0
// for the line drawn through "p1" [x,y] and "p2" [x,y]
function defline(p1, p2){
  var a = p1[1] - p2[1];
  var b = p1[0] - p2[0];
  return [a, -b, b * p1[1] - a * p1[0]];
}


function arcDiv ( pStart, pEnd, outPts ) {
    var ts = 0.0, te = 1.0, t = 0.0, i = 0;

    var start = getDataRevert(pStart);
    var end = getDataRevert(pEnd);
    var pointStart = start[0], pointEnd = end[0];
    var arcs = [];
    var aLine = [];
    var cr = 0.0;

    do {
      te = 1.0;

      do {

        pointEnd = divide([start, end], te, te, te)[0];
        t = (te - ts)/2 + ts;
        var nPnt = divide([start, end], t, ts, te);
        aLine = getccenter(pointStart, nPnt[0], pointEnd);

        cr = Math.abs((nPnt[4]/mm) - (aLine.r/mm));
        //alert('te= ' + te + ', ts= ' + ts +', t= ' + t +', curv= '+ cr +', r= '+ aLine.r/mm);
        if ( cr <= TOLERANCE || te <= ts + TOLERANCE ) { break };
        
        te -= TOLERANCE;
        te = parseFloat(te);

        //alert(te);
      } while ( te > ts );
      i++;
      //alert('arcs i= ' + i + ', ts= ' + ts +', t= ' + t +', curv= '+ cr +', r= '+ aLine.r/mm);
      ts = te;
      pointStart = pointEnd;
      
 
      if ( aLine[0] != undefined || !isNaN(cr)) 
        outPts.push ([0, "ARC", 8, "APS_GEOMETRY", 10, aLine[0]/mm, 20, aLine[1]/mm, 40, aLine.r/mm, 50, aLine.s, 51, aLine.e]);

      //arcs[i] = (aLine);
      //alert('ts= '+ ts);
  } while ( ts < 1 ); 

  //alert ('LEN= ' + arcs.length);

return arcs;
}