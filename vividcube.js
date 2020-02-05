// three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE || {
	REVISION: "57"
};
self.console = self.console || {
	info: function() {},
	log: function() {},
	debug: function() {},
	warn: function() {},
	error: function() {}
};
self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;
String.prototype.trim = String.prototype.trim ||
function() {
	return this.replace(/^\s+|\s+$/g, "")
};
THREE.extend = function(a, b) {
	if (Object.keys) for (var c = Object.keys(b), d = 0, e = c.length; d < e; d++) {
		var f = c[d];
		Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f))
	} else for (f in c = {}.hasOwnProperty, b) c.call(b, f) && (a[f] = b[f]);
	return a
}; (function() {
	for (var a = 0,
	b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
	window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
	void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function(b) {
		var c = Date.now(),
		f = Math.max(0, 16 - (c - a)),
		g = window.setTimeout(function() {
			b(c + f)
		},
		f);
		a = c + f;
		return g
	});
	window.cancelAnimationFrame = window.cancelAnimationFrame ||
	function(a) {
		window.clearTimeout(a)
	}
})();
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function() {};
THREE.CubeReflectionMapping = function() {};
THREE.CubeRefractionMapping = function() {};
THREE.SphericalReflectionMapping = function() {};
THREE.SphericalRefractionMapping = function() {};
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Color = function(a) {
	void 0 !== a && this.set(a);
	return this
};
THREE.Color.prototype = {
	constructor: THREE.Color,
	r: 1,
	g: 1,
	b: 1,
	set: function(a) {
		switch (typeof a) {
		case "number":
			this.setHex(a);
			break;
		case "string":
			this.setStyle(a)
		}
	},
	setHex: function(a) {
		a = Math.floor(a);
		this.r = (a >> 16 & 255) / 255;
		this.g = (a >> 8 & 255) / 255;
		this.b = (a & 255) / 255;
		return this
	},
	setRGB: function(a, b, c) {
		this.r = a;
		this.g = b;
		this.b = c;
		return this
	},
	setHSL: function(a, b, c) {
		if (0 === b) this.r = this.g = this.b = c;
		else {
			var d = function(a, b, c) {
				0 > c && (c += 1);
				1 < c && (c -= 1);
				return c < 1 / 6 ? a + 6 * (b - a) * c: 0.5 > c ? b: c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
			},
			b = 0.5 >= c ? c * (1 + b) : c + b - c * b,
			c = 2 * c - b;
			this.r = d(c, b, a + 1 / 3);
			this.g = d(c, b, a);
			this.b = d(c, b, a - 1 / 3)
		}
		return this
	},
	setStyle: function(a) {
		if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) return a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a),
		this.r = Math.min(255, parseInt(a[1], 10)) / 255,
		this.g = Math.min(255, parseInt(a[2], 10)) / 255,
		this.b = Math.min(255, parseInt(a[3], 10)) / 255,
		this;
		if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) return a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a),
		this.r = Math.min(100, parseInt(a[1], 10)) / 100,
		this.g = Math.min(100, parseInt(a[2], 10)) / 100,
		this.b = Math.min(100, parseInt(a[3], 10)) / 100,
		this;
		if (/^\#([0-9a-f]{6})$/i.test(a)) return a = /^\#([0-9a-f]{6})$/i.exec(a),
		this.setHex(parseInt(a[1], 16)),
		this;
		if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) return a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a),
		this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)),
		this;
		if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]),
		this
	},
	copy: function(a) {
		this.r = a.r;
		this.g = a.g;
		this.b = a.b;
		return this
	},
	copyGammaToLinear: function(a) {
		this.r = a.r * a.r;
		this.g = a.g * a.g;
		this.b = a.b * a.b;
		return this
	},
	copyLinearToGamma: function(a) {
		this.r = Math.sqrt(a.r);
		this.g = Math.sqrt(a.g);
		this.b = Math.sqrt(a.b);
		return this
	},
	convertGammaToLinear: function() {
		var a = this.r,
		b = this.g,
		c = this.b;
		this.r = a * a;
		this.g = b * b;
		this.b = c * c;
		return this
	},
	convertLinearToGamma: function() {
		this.r = Math.sqrt(this.r);
		this.g = Math.sqrt(this.g);
		this.b = Math.sqrt(this.b);
		return this
	},
	getHex: function() {
		return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
	},
	getHexString: function() {
		return ("000000" + this.getHex().toString(16)).slice( - 6)
	},
	getHSL: function() {
		var a = {
			h: 0,
			s: 0,
			l: 0
		};
		return function() {
			var b = this.r,
			c = this.g,
			d = this.b,
			e = Math.max(b, c, d),
			f = Math.min(b, c, d),
			g,
			h = (f + e) / 2;
			if (f === e) f = g = 0;
			else {
				var i = e - f,
				f = 0.5 >= h ? i / (e + f) : i / (2 - e - f);
				switch (e) {
				case b:
					g = (c - d) / i + (c < d ? 6 : 0);
					break;
				case c:
					g = (d - b) / i + 2;
					break;
				case d:
					g = (b - c) / i + 4
				}
				g /= 6
			}
			a.h = g;
			a.s = f;
			a.l = h;
			return a
		}
	} (),
	getStyle: function() {
		return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
	},
	offsetHSL: function(a, b, c) {
		var d = this.getHSL();
		d.h += a;
		d.s += b;
		d.l += c;
		this.setHSL(d.h, d.s, d.l);
		return this
	},
	add: function(a) {
		this.r += a.r;
		this.g += a.g;
		this.b += a.b;
		return this
	},
	addColors: function(a, b) {
		this.r = a.r + b.r;
		this.g = a.g + b.g;
		this.b = a.b + b.b;
		return this
	},
	addScalar: function(a) {
		this.r += a;
		this.g += a;
		this.b += a;
		return this
	},
	multiply: function(a) {
		this.r *= a.r;
		this.g *= a.g;
		this.b *= a.b;
		return this
	},
	multiplyScalar: function(a) {
		this.r *= a;
		this.g *= a;
		this.b *= a;
		return this
	},
	lerp: function(a, b) {
		this.r += (a.r - this.r) * b;
		this.g += (a.g - this.g) * b;
		this.b += (a.b - this.b) * b;
		return this
	},
	equals: function(a) {
		return a.r === this.r && a.g === this.g && a.b === this.b
	},
	clone: function() {
		return (new THREE.Color).setRGB(this.r, this.g, this.b)
	}
};
THREE.ColorKeywords = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
THREE.Quaternion = function(a, b, c, d) {
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0;
	this.w = void 0 !== d ? d: 1
};
THREE.Quaternion.prototype = {
	constructor: THREE.Quaternion,
	set: function(a, b, c, d) {
		this.x = a;
		this.y = b;
		this.z = c;
		this.w = d;
		return this
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = a.w;
		return this
	},
	setFromEuler: function(a, b) {
		var c = Math.cos(a.x / 2),
		d = Math.cos(a.y / 2),
		e = Math.cos(a.z / 2),
		f = Math.sin(a.x / 2),
		g = Math.sin(a.y / 2),
		h = Math.sin(a.z / 2);
		void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "YXZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "ZXY" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "ZYX" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "YZX" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e - f * g * h) : "XZY" === b && (this.x = f * d * e - c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e + f * g * h);
		return this
	},
	setFromAxisAngle: function(a, b) {
		var c = b / 2,
		d = Math.sin(c);
		this.x = a.x * d;
		this.y = a.y * d;
		this.z = a.z * d;
		this.w = Math.cos(c);
		return this
	},
	setFromRotationMatrix: function(a) {
		var b = a.elements,
		c = b[0],
		a = b[4],
		d = b[8],
		e = b[1],
		f = b[5],
		g = b[9],
		h = b[2],
		i = b[6],
		b = b[10],
		k = c + f + b;
		0 < k ? (c = 0.5 / Math.sqrt(k + 1), this.w = 0.25 / c, this.x = (i - g) * c, this.y = (d - h) * c, this.z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this.w = (i - g) / c, this.x = 0.25 * c, this.y = (a + e) / c, this.z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this.w = (d - h) / c, this.x = (a + e) / c, this.y = 0.25 * c, this.z = (g + i) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this.w = (e - a) / c, this.x = (d + h) / c, this.y = (g + i) / c, this.z = 0.25 * c);
		return this
	},
	inverse: function() {
		this.conjugate().normalize();
		return this
	},
	conjugate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
		return this
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
	},
	normalize: function() {
		var a = this.length();
		0 === a ? (this.z = this.y = this.x = 0, this.w = 1) : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
		return this
	},
	multiply: function(a, b) {
		return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
	},
	multiplyQuaternions: function(a, b) {
		var c = a.x,
		d = a.y,
		e = a.z,
		f = a.w,
		g = b.x,
		h = b.y,
		i = b.z,
		k = b.w;
		this.x = c * k + f * g + d * i - e * h;
		this.y = d * k + f * h + e * g - c * i;
		this.z = e * k + f * i + c * h - d * g;
		this.w = f * k - c * g - d * h - e * i;
		return this
	},
	multiplyVector3: function(a) {
		console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
		return a.applyQuaternion(this)
	},
	slerp: function(a, b) {
		var c = this.x,
		d = this.y,
		e = this.z,
		f = this.w,
		g = f * a.w + c * a.x + d * a.y + e * a.z;
		0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a);
		if (1 <= g) return this.w = f,
		this.x = c,
		this.y = d,
		this.z = e,
		this;
		var h = Math.acos(g),
		i = Math.sqrt(1 - g * g);
		if (0.001 > Math.abs(i)) return this.w = 0.5 * (f + this.w),
		this.x = 0.5 * (c + this.x),
		this.y = 0.5 * (d + this.y),
		this.z = 0.5 * (e + this.z),
		this;
		g = Math.sin((1 - b) * h) / i;
		h = Math.sin(b * h) / i;
		this.w = f * g + this.w * h;
		this.x = c * g + this.x * h;
		this.y = d * g + this.y * h;
		this.z = e * g + this.z * h;
		return this
	},
	equals: function(a) {
		return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
	},
	clone: function() {
		return new THREE.Quaternion(this.x, this.y, this.z, this.w)
	}
};
THREE.Quaternion.slerp = function(a, b, c, d) {
	return c.copy(a).slerp(b, d)
};
THREE.Vector2 = function(a, b) {
	this.x = a || 0;
	this.y = b || 0
};
THREE.Vector2.prototype = {
	constructor: THREE.Vector2,
	set: function(a, b) {
		this.x = a;
		this.y = b;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
		case 0:
			this.x = b;
			break;
		case 1:
			this.y = b;
			break;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a) {
		switch (a) {
		case 0:
			return this.x;
		case 1:
			return this.y;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		return this
	},
	add: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
		this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		return this
	},
	addVectors: function(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		return this
	},
	sub: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
		this.subVectors(a, b);
		this.x -= a.x;
		this.y -= a.y;
		return this
	},
	subVectors: function(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		return this
	},
	divideScalar: function(a) {
		0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0);
		return this
	},
	min: function(a) {
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		return this
	},
	max: function(a) {
		this.x < a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		return this
	},
	clamp: function(a, b) {
		this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
		return this
	},
	negate: function() {
		return this.multiplyScalar( - 1)
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	distanceTo: function(a) {
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(a) {
		var b = this.x - a.x,
		a = this.y - a.y;
		return b * b + a * a
	},
	setLength: function(a) {
		var b = this.length();
		0 !== b && a !== b && this.multiplyScalar(a / b);
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		return this
	},
	equals: function(a) {
		return a.x === this.x && a.y === this.y
	},
	toArray: function() {
		return [this.x, this.y]
	},
	clone: function() {
		return new THREE.Vector2(this.x, this.y)
	}
};
THREE.Vector3 = function(a, b, c) {
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0
};
THREE.Vector3.prototype = {
	constructor: THREE.Vector3,
	set: function(a, b, c) {
		this.x = a;
		this.y = b;
		this.z = c;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setZ: function(a) {
		this.z = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
		case 0:
			this.x = b;
			break;
		case 1:
			this.y = b;
			break;
		case 2:
			this.z = b;
			break;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a) {
		switch (a) {
		case 0:
			return this.x;
		case 1:
			return this.y;
		case 2:
			return this.z;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		return this
	},
	add: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
		this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		this.z += a;
		return this
	},
	addVectors: function(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		return this
	},
	sub: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
		this.subVectors(a, b);
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		return this
	},
	subVectors: function(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		return this
	},
	multiply: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
		this.multiplyVectors(a, b);
		this.x *= a.x;
		this.y *= a.y;
		this.z *= a.z;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
		return this
	},
	multiplyVectors: function(a, b) {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		return this
	},
	applyMatrix3: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		a = a.elements;
		this.x = a[0] * b + a[3] * c + a[6] * d;
		this.y = a[1] * b + a[4] * c + a[7] * d;
		this.z = a[2] * b + a[5] * c + a[8] * d;
		return this
	},
	applyMatrix4: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		a = a.elements;
		this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
		this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
		this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
		return this
	},
	applyProjection: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		a = a.elements,
		e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
		this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
		this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
		this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
		return this
	},
	applyQuaternion: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		e = a.x,
		f = a.y,
		g = a.z,
		a = a.w,
		h = a * b + f * d - g * c,
		i = a * c + g * b - e * d,
		k = a * d + e * c - f * b,
		b = -e * b - f * c - g * d;
		this.x = h * a + b * -e + i * -g - k * -f;
		this.y = i * a + b * -f + k * -e - h * -g;
		this.z = k * a + b * -g + h * -f - i * -e;
		return this
	},
	transformDirection: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		a = a.elements;
		this.x = a[0] * b + a[4] * c + a[8] * d;
		this.y = a[1] * b + a[5] * c + a[9] * d;
		this.z = a[2] * b + a[6] * c + a[10] * d;
		this.normalize();
		return this
	},
	divide: function(a) {
		this.x /= a.x;
		this.y /= a.y;
		this.z /= a.z;
		return this
	},
	divideScalar: function(a) {
		0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
		return this
	},
	min: function(a) {
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		this.z > a.z && (this.z = a.z);
		return this
	},
	max: function(a) {
		this.x < a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		this.z < a.z && (this.z = a.z);
		return this
	},
	clamp: function(a, b) {
		this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
		this.z < a.z ? this.z = a.z: this.z > b.z && (this.z = b.z);
		return this
	},
	negate: function() {
		return this.multiplyScalar( - 1)
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	},
	lengthManhattan: function() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	setLength: function(a) {
		var b = this.length();
		0 !== b && a !== b && this.multiplyScalar(a / b);
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		return this
	},
	cross: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
		this.crossVectors(a, b);
		var c = this.x,
		d = this.y,
		e = this.z;
		this.x = d * a.z - e * a.y;
		this.y = e * a.x - c * a.z;
		this.z = c * a.y - d * a.x;
		return this
	},
	crossVectors: function(a, b) {
		this.x = a.y * b.z - a.z * b.y;
		this.y = a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;
		return this
	},
	angleTo: function(a) {
		a = this.dot(a) / (this.length() * a.length());
		return Math.acos(THREE.Math.clamp(a, -1, 1))
	},
	distanceTo: function(a) {
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(a) {
		var b = this.x - a.x,
		c = this.y - a.y,
		a = this.z - a.z;
		return b * b + c * c + a * a
	},
	setEulerFromRotationMatrix: function(a, b) {
		function c(a) {
			return Math.min(Math.max(a, -1), 1)
		}
		var d = a.elements,
		e = d[0],
		f = d[4],
		g = d[8],
		h = d[1],
		i = d[5],
		k = d[9],
		l = d[2],
		m = d[6],
		d = d[10];
		void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), 0.99999 > Math.abs(g) ? (this.x = Math.atan2( - k, d), this.z = Math.atan2( - f, e)) : (this.x = Math.atan2(m, i), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin( - c(k)), 0.99999 > Math.abs(k) ? (this.y = Math.atan2(g, d), this.z = Math.atan2(h, i)) : (this.y = Math.atan2( - l, e), this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(m)), 0.99999 > Math.abs(m) ? (this.y = Math.atan2( - l, d), this.z = Math.atan2( - f, i)) : (this.y = 0, this.z = Math.atan2(h, e))) : "ZYX" === b ? (this.y = Math.asin( - c(l)), 0.99999 > Math.abs(l) ? (this.x = Math.atan2(m, d), this.z = Math.atan2(h, e)) : (this.x = 0, this.z = Math.atan2( - f, i))) : "YZX" === b ? (this.z = Math.asin(c(h)), 0.99999 > Math.abs(h) ? (this.x = Math.atan2( - k, i), this.y = Math.atan2( - l, e)) : (this.x = 0, this.y = Math.atan2(g, d))) : "XZY" === b && (this.z = Math.asin( - c(f)), 0.99999 > Math.abs(f) ? (this.x = Math.atan2(m, i), this.y = Math.atan2(g, e)) : (this.x = Math.atan2( - k, d), this.y = 0));
		return this
	},
	setEulerFromQuaternion: function(a, b) {
		function c(a) {
			return Math.min(Math.max(a, -1), 1)
		}
		var d = a.x * a.x,
		e = a.y * a.y,
		f = a.z * a.z,
		g = a.w * a.w;
		void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z))), this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) : "ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y))));
		return this
	},
	getPositionFromMatrix: function(a) {
		this.x = a.elements[12];
		this.y = a.elements[13];
		this.z = a.elements[14];
		return this
	},
	getScaleFromMatrix: function(a) {
		var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
		c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
		a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
		this.x = b;
		this.y = c;
		this.z = a;
		return this
	},
	getColumnFromMatrix: function(a, b) {
		var c = 4 * a,
		d = b.elements;
		this.x = d[c];
		this.y = d[c + 1];
		this.z = d[c + 2];
		return this
	},
	equals: function(a) {
		return a.x === this.x && a.y === this.y && a.z === this.z
	},
	toArray: function() {
		return [this.x, this.y, this.z]
	},
	clone: function() {
		return new THREE.Vector3(this.x, this.y, this.z)
	}
};
THREE.extend(THREE.Vector3.prototype, {
	applyEuler: function() {
		var a = new THREE.Quaternion;
		return function(b, c) {
			var d = a.setFromEuler(b, c);
			this.applyQuaternion(d);
			return this
		}
	} (),
	applyAxisAngle: function() {
		var a = new THREE.Quaternion;
		return function(b, c) {
			var d = a.setFromAxisAngle(b, c);
			this.applyQuaternion(d);
			return this
		}
	} (),
	projectOnVector: function() {
		var a = new THREE.Vector3;
		return function(b) {
			a.copy(b).normalize();
			b = this.dot(a);
			return this.copy(a).multiplyScalar(b)
		}
	} (),
	projectOnPlane: function() {
		var a = new THREE.Vector3;
		return function(b) {
			a.copy(this).projectOnVector(b);
			return this.sub(a)
		}
	} (),
	reflect: function() {
		var a = new THREE.Vector3;
		return function(b) {
			a.copy(this).projectOnVector(b).multiplyScalar(2);
			return this.subVectors(a, this)
		}
	} ()
});
THREE.Vector4 = function(a, b, c, d) {
	this.x = a || 0;
	this.y = b || 0;
	this.z = c || 0;
	this.w = void 0 !== d ? d: 1
};
THREE.Vector4.prototype = {
	constructor: THREE.Vector4,
	set: function(a, b, c, d) {
		this.x = a;
		this.y = b;
		this.z = c;
		this.w = d;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setZ: function(a) {
		this.z = a;
		return this
	},
	setW: function(a) {
		this.w = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
		case 0:
			this.x = b;
			break;
		case 1:
			this.y = b;
			break;
		case 2:
			this.z = b;
			break;
		case 3:
			this.w = b;
			break;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	getComponent: function(a) {
		switch (a) {
		case 0:
			return this.x;
		case 1:
			return this.y;
		case 2:
			return this.z;
		case 3:
			return this.w;
		default:
			throw Error("index is out of range: " + a);
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = void 0 !== a.w ? a.w: 1;
		return this
	},
	add: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
		this.addVectors(a, b);
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		this.w += a.w;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		this.z += a;
		this.w += a;
		return this
	},
	addVectors: function(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;
		return this
	},
	sub: function(a, b) {
		if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
		this.subVectors(a, b);
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		this.w -= a.w;
		return this
	},
	subVectors: function(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
		this.w *= a;
		return this
	},
	applyMatrix4: function(a) {
		var b = this.x,
		c = this.y,
		d = this.z,
		e = this.w,
		a = a.elements;
		this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
		this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
		this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
		this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
		return this
	},
	divideScalar: function(a) {
		0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
		return this
	},
	setAxisAngleFromQuaternion: function(a) {
		this.w = 2 * Math.acos(a.w);
		var b = Math.sqrt(1 - a.w * a.w);
		1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
		return this
	},
	setAxisAngleFromRotationMatrix: function(a) {
		var b, c, d, a = a.elements,
		e = a[0];
		d = a[4];
		var f = a[8],
		g = a[1],
		h = a[5],
		i = a[9];
		c = a[2];
		b = a[6];
		var k = a[10];
		if (0.01 > Math.abs(d - g) && 0.01 > Math.abs(f - c) && 0.01 > Math.abs(i - b)) {
			if (0.1 > Math.abs(d + g) && 0.1 > Math.abs(f + c) && 0.1 > Math.abs(i + b) && 0.1 > Math.abs(e + h + k - 3)) return this.set(1, 0, 0, 0),
			this;
			a = Math.PI;
			e = (e + 1) / 2;
			h = (h + 1) / 2;
			k = (k + 1) / 2;
			d = (d + g) / 4;
			f = (f + c) / 4;
			i = (i + b) / 4;
			e > h && e > k ? 0.01 > e ? (b = 0, d = c = 0.707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : h > k ? 0.01 > h ? (b = 0.707106781, c = 0, d = 0.707106781) : (c = Math.sqrt(h), b = d / c, d = i / c) : 0.01 > k ? (c = b = 0.707106781, d = 0) : (d = Math.sqrt(k), b = f / d, c = i / d);
			this.set(b, c, d, a);
			return this
		}
		a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
		0.001 > Math.abs(a) && (a = 1);
		this.x = (b - i) / a;
		this.y = (f - c) / a;
		this.z = (g - d) / a;
		this.w = Math.acos((e + h + k - 1) / 2);
		return this
	},
	min: function(a) {
		this.x > a.x && (this.x = a.x);
		this.y > a.y && (this.y = a.y);
		this.z > a.z && (this.z = a.z);
		this.w > a.w && (this.w = a.w);
		return this
	},
	max: function(a) {
		this.x < a.x && (this.x = a.x);
		this.y < a.y && (this.y = a.y);
		this.z < a.z && (this.z = a.z);
		this.w < a.w && (this.w = a.w);
		return this
	},
	clamp: function(a, b) {
		this.x < a.x ? this.x = a.x: this.x > b.x && (this.x = b.x);
		this.y < a.y ? this.y = a.y: this.y > b.y && (this.y = b.y);
		this.z < a.z ? this.z = a.z: this.z > b.z && (this.z = b.z);
		this.w < a.w ? this.w = a.w: this.w > b.w && (this.w = b.w);
		return this
	},
	negate: function() {
		return this.multiplyScalar( - 1)
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
	},
	lengthManhattan: function() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	setLength: function(a) {
		var b = this.length();
		0 !== b && a !== b && this.multiplyScalar(a / b);
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		this.w += (a.w - this.w) * b;
		return this
	},
	equals: function(a) {
		return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
	},
	toArray: function() {
		return [this.x, this.y, this.z, this.w]
	},
	clone: function() {
		return new THREE.Vector4(this.x, this.y, this.z, this.w)
	}
};
THREE.Line3 = function(a, b) {
	this.start = void 0 !== a ? a: new THREE.Vector3;
	this.end = void 0 !== b ? b: new THREE.Vector3
};
THREE.Line3.prototype = {
	constructor: THREE.Line3,
	set: function(a, b) {
		this.start.copy(a);
		this.end.copy(b);
		return this
	},
	copy: function(a) {
		this.start.copy(a.start);
		this.end.copy(a.end);
		return this
	},
	center: function(a) {
		return (a || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(0.5)
	},
	delta: function(a) {
		return (a || new THREE.Vector3).subVectors(this.end, this.start)
	},
	distanceSq: function() {
		return this.start.distanceToSquared(this.end)
	},
	distance: function() {
		return this.start.distanceTo(this.end)
	},
	at: function(a, b) {
		var c = b || new THREE.Vector3;
		return this.delta(c).multiplyScalar(a).add(this.start)
	},
	closestPointToPointParameter: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3;
		return function(c, d) {
			a.subVectors(c, this.start);
			b.subVectors(this.end, this.start);
			var e = b.dot(b),
			e = b.dot(a) / e;
			d && (e = THREE.Math.clamp(e, 0, 1));
			return e
		}
	} (),
	closestPointToPoint: function(a, b, c) {
		a = this.closestPointToPointParameter(a, b);
		c = c || new THREE.Vector3;
		return this.delta(c).multiplyScalar(a).add(this.start)
	},
	applyMatrix4: function(a) {
		this.start.applyMatrix4(a);
		this.end.applyMatrix4(a);
		return this
	},
	equals: function(a) {
		return a.start.equals(this.start) && a.end.equals(this.end)
	},
	clone: function() {
		return (new THREE.Line3).copy(this)
	}
};
THREE.Box2 = function(a, b) {
	this.min = void 0 !== a ? a: new THREE.Vector2(Infinity, Infinity);
	this.max = void 0 !== b ? b: new THREE.Vector2( - Infinity, -Infinity)
};
THREE.Box2.prototype = {
	constructor: THREE.Box2,
	set: function(a, b) {
		this.min.copy(a);
		this.max.copy(b);
		return this
	},
	setFromPoints: function(a) {
		if (0 < a.length) {
			var b = a[0];
			this.min.copy(b);
			this.max.copy(b);
			for (var c = 1,
			d = a.length; c < d; c++) b = a[c],
			b.x < this.min.x ? this.min.x = b.x: b.x > this.max.x && (this.max.x = b.x),
			b.y < this.min.y ? this.min.y = b.y: b.y > this.max.y && (this.max.y = b.y)
		} else this.makeEmpty();
		return this
	},
	setFromCenterAndSize: function() {
		var a = new THREE.Vector2;
		return function(b, c) {
			var d = a.copy(c).multiplyScalar(0.5);
			this.min.copy(b).sub(d);
			this.max.copy(b).add(d);
			return this
		}
	} (),
	copy: function(a) {
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function() {
		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = -Infinity;
		return this
	},
	empty: function() {
		return this.max.x < this.min.x || this.max.y < this.min.y
	},
	center: function(a) {
		return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(0.5)
	},
	size: function(a) {
		return (a || new THREE.Vector2).subVectors(this.max, this.min)
	},
	expandByPoint: function(a) {
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a) {
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a) {
		this.min.addScalar( - a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a) {
		return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
	},
	containsBox: function(a) {
		return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
	},
	getParameter: function(a) {
		return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
	},
	isIntersectionBox: function(a) {
		return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
	},
	clampPoint: function(a, b) {
		return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector2;
		return function(b) {
			return a.copy(b).clamp(this.min, this.max).sub(b).length()
		}
	} (),
	intersect: function(a) {
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a) {
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	translate: function(a) {
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a) {
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function() {
		return (new THREE.Box2).copy(this)
	}
};
THREE.Box3 = function(a, b) {
	this.min = void 0 !== a ? a: new THREE.Vector3(Infinity, Infinity, Infinity);
	this.max = void 0 !== b ? b: new THREE.Vector3( - Infinity, -Infinity, -Infinity)
};
THREE.Box3.prototype = {
	constructor: THREE.Box3,
	set: function(a, b) {
		this.min.copy(a);
		this.max.copy(b);
		return this
	},
	setFromPoints: function(a) {
		if (0 < a.length) {
			var b = a[0];
			this.min.copy(b);
			this.max.copy(b);
			for (var c = 1,
			d = a.length; c < d; c++) b = a[c],
			b.x < this.min.x ? this.min.x = b.x: b.x > this.max.x && (this.max.x = b.x),
			b.y < this.min.y ? this.min.y = b.y: b.y > this.max.y && (this.max.y = b.y),
			b.z < this.min.z ? this.min.z = b.z: b.z > this.max.z && (this.max.z = b.z)
		} else this.makeEmpty();
		return this
	},
	setFromCenterAndSize: function() {
		var a = new THREE.Vector3;
		return function(b, c) {
			var d = a.copy(c).multiplyScalar(0.5);
			this.min.copy(b).sub(d);
			this.max.copy(b).add(d);
			return this
		}
	} (),
	copy: function(a) {
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function() {
		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = -Infinity;
		return this
	},
	empty: function() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
	},
	center: function(a) {
		return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(0.5)
	},
	size: function(a) {
		return (a || new THREE.Vector3).subVectors(this.max, this.min)
	},
	expandByPoint: function(a) {
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a) {
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a) {
		this.min.addScalar( - a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a) {
		return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
	},
	containsBox: function(a) {
		return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
	},
	getParameter: function(a) {
		return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
	},
	isIntersectionBox: function(a) {
		return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
	},
	clampPoint: function(a, b) {
		return (b || new THREE.Vector3).copy(a).clamp(this.min, this.max)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector3;
		return function(b) {
			return a.copy(b).clamp(this.min, this.max).sub(b).length()
		}
	} (),
	getBoundingSphere: function() {
		var a = new THREE.Vector3;
		return function(b) {
			b = b || new THREE.Sphere;
			b.center = this.center();
			b.radius = 0.5 * this.size(a).length();
			return b
		}
	} (),
	intersect: function(a) {
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a) {
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	applyMatrix4: function() {
		var a = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
		return function(b) {
			a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
			a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
			a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
			a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
			a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
			a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
			a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
			a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
			this.makeEmpty();
			this.setFromPoints(a);
			return this
		}
	} (),
	translate: function(a) {
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a) {
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function() {
		return (new THREE.Box3).copy(this)
	}
};
THREE.Matrix3 = function(a, b, c, d, e, f, g, h, i) {
	this.elements = new Float32Array(9);
	this.set(void 0 !== a ? a: 1, b || 0, c || 0, d || 0, void 0 !== e ? e: 1, f || 0, g || 0, h || 0, void 0 !== i ? i: 1)
};
THREE.Matrix3.prototype = {
	constructor: THREE.Matrix3,
	set: function(a, b, c, d, e, f, g, h, i) {
		var k = this.elements;
		k[0] = a;
		k[3] = b;
		k[6] = c;
		k[1] = d;
		k[4] = e;
		k[7] = f;
		k[2] = g;
		k[5] = h;
		k[8] = i;
		return this
	},
	identity: function() {
		this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
		return this
	},
	copy: function(a) {
		a = a.elements;
		this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
		return this
	},
	multiplyVector3: function(a) {
		console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
		return a.applyMatrix3(this)
	},
	multiplyVector3Array: function() {
		var a = new THREE.Vector3;
		return function(b) {
			for (var c = 0,
			d = b.length; c < d; c += 3) a.x = b[c],
			a.y = b[c + 1],
			a.z = b[c + 2],
			a.applyMatrix3(this),
			b[c] = a.x,
			b[c + 1] = a.y,
			b[c + 2] = a.z;
			return b
		}
	} (),
	multiplyScalar: function(a) {
		var b = this.elements;
		b[0] *= a;
		b[3] *= a;
		b[6] *= a;
		b[1] *= a;
		b[4] *= a;
		b[7] *= a;
		b[2] *= a;
		b[5] *= a;
		b[8] *= a;
		return this
	},
	determinant: function() {
		var a = this.elements,
		b = a[0],
		c = a[1],
		d = a[2],
		e = a[3],
		f = a[4],
		g = a[5],
		h = a[6],
		i = a[7],
		a = a[8];
		return b * f * a - b * g * i - c * e * a + c * g * h + d * e * i - d * f * h
	},
	getInverse: function(a, b) {
		var c = a.elements,
		d = this.elements;
		d[0] = c[10] * c[5] - c[6] * c[9];
		d[1] = -c[10] * c[1] + c[2] * c[9];
		d[2] = c[6] * c[1] - c[2] * c[5];
		d[3] = -c[10] * c[4] + c[6] * c[8];
		d[4] = c[10] * c[0] - c[2] * c[8];
		d[5] = -c[6] * c[0] + c[2] * c[4];
		d[6] = c[9] * c[4] - c[5] * c[8];
		d[7] = -c[9] * c[0] + c[1] * c[8];
		d[8] = c[5] * c[0] - c[1] * c[4];
		c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
		if (0 === c) {
			if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
			console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");
			this.identity();
			return this
		}
		this.multiplyScalar(1 / c);
		return this
	},
	transpose: function() {
		var a, b = this.elements;
		a = b[1];
		b[1] = b[3];
		b[3] = a;
		a = b[2];
		b[2] = b[6];
		b[6] = a;
		a = b[5];
		b[5] = b[7];
		b[7] = a;
		return this
	},
	getNormalMatrix: function(a) {
		this.getInverse(a).transpose();
		return this
	},
	transposeIntoArray: function(a) {
		var b = this.elements;
		a[0] = b[0];
		a[1] = b[3];
		a[2] = b[6];
		a[3] = b[1];
		a[4] = b[4];
		a[5] = b[7];
		a[6] = b[2];
		a[7] = b[5];
		a[8] = b[8];
		return this
	},
	clone: function() {
		var a = this.elements;
		return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
	}
};
THREE.Matrix4 = function(a, b, c, d, e, f, g, h, i, k, l, m, p, s, r, n) {
	var q = this.elements = new Float32Array(16);
	q[0] = void 0 !== a ? a: 1;
	q[4] = b || 0;
	q[8] = c || 0;
	q[12] = d || 0;
	q[1] = e || 0;
	q[5] = void 0 !== f ? f: 1;
	q[9] = g || 0;
	q[13] = h || 0;
	q[2] = i || 0;
	q[6] = k || 0;
	q[10] = void 0 !== l ? l: 1;
	q[14] = m || 0;
	q[3] = p || 0;
	q[7] = s || 0;
	q[11] = r || 0;
	q[15] = void 0 !== n ? n: 1
};
THREE.Matrix4.prototype = {
	constructor: THREE.Matrix4,
	set: function(a, b, c, d, e, f, g, h, i, k, l, m, p, s, r, n) {
		var q = this.elements;
		q[0] = a;
		q[4] = b;
		q[8] = c;
		q[12] = d;
		q[1] = e;
		q[5] = f;
		q[9] = g;
		q[13] = h;
		q[2] = i;
		q[6] = k;
		q[10] = l;
		q[14] = m;
		q[3] = p;
		q[7] = s;
		q[11] = r;
		q[15] = n;
		return this
	},
	identity: function() {
		this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	copy: function(a) {
		a = a.elements;
		this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
		return this
	},
	setRotationFromEuler: function(a, b) {
		var c = this.elements,
		d = a.x,
		e = a.y,
		f = a.z,
		g = Math.cos(d),
		d = Math.sin(d),
		h = Math.cos(e),
		e = Math.sin(e),
		i = Math.cos(f),
		f = Math.sin(f);
		if (void 0 === b || "XYZ" === b) {
			var k = g * i,
			l = g * f,
			m = d * i,
			p = d * f;
			c[0] = h * i;
			c[4] = -h * f;
			c[8] = e;
			c[1] = l + m * e;
			c[5] = k - p * e;
			c[9] = -d * h;
			c[2] = p - k * e;
			c[6] = m + l * e;
			c[10] = g * h
		} else "YXZ" === b ? (k = h * i, l = h * f, m = e * i, p = e * f, c[0] = k + p * d, c[4] = m * d - l, c[8] = g * e, c[1] = g * f, c[5] = g * i, c[9] = -d, c[2] = l * d - m, c[6] = p + k * d, c[10] = g * h) : "ZXY" === b ? (k = h * i, l = h * f, m = e * i, p = e * f, c[0] = k - p * d, c[4] = -g * f, c[8] = m + l * d, c[1] = l + m * d, c[5] = g * i, c[9] = p - k * d, c[2] = -g * e, c[6] = d, c[10] = g * h) : "ZYX" === b ? (k = g * i, l = g * f, m = d * i, p = d * f, c[0] = h * i, c[4] = m * e - l, c[8] = k * e + p, c[1] = h * f, c[5] = p * e + k, c[9] = l * e - m, c[2] = -e, c[6] = d * h, c[10] = g * h) : "YZX" === b ? (k = g * h, l = g * e, m = d * h, p = d * e, c[0] = h * i, c[4] = p - k * f, c[8] = m * f + l, c[1] = f, c[5] = g * i, c[9] = -d * i, c[2] = -e * i, c[6] = l * f + m, c[10] = k - p * f) : "XZY" === b && (k = g * h, l = g * e, m = d * h, p = d * e, c[0] = h * i, c[4] = -f, c[8] = e * i, c[1] = k * f + p, c[5] = g * i, c[9] = l * f - m, c[2] = m * f - l, c[6] = d * i, c[10] = p * f + k);
		return this
	},
	setRotationFromQuaternion: function(a) {
		var b = this.elements,
		c = a.x,
		d = a.y,
		e = a.z,
		f = a.w,
		g = c + c,
		h = d + d,
		i = e + e,
		a = c * g,
		k = c * h,
		c = c * i,
		l = d * h,
		d = d * i,
		e = e * i,
		g = f * g,
		h = f * h,
		f = f * i;
		b[0] = 1 - (l + e);
		b[4] = k - f;
		b[8] = c + h;
		b[1] = k + f;
		b[5] = 1 - (a + e);
		b[9] = d - g;
		b[2] = c - h;
		b[6] = d + g;
		b[10] = 1 - (a + l);
		return this
	},
	lookAt: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3,
		c = new THREE.Vector3;
		return function(d, e, f) {
			var g = this.elements;
			c.subVectors(d, e).normalize();
			0 === c.length() && (c.z = 1);
			a.crossVectors(f, c).normalize();
			0 === a.length() && (c.x += 1E-4, a.crossVectors(f, c).normalize());
			b.crossVectors(c, a);
			g[0] = a.x;
			g[4] = b.x;
			g[8] = c.x;
			g[1] = a.y;
			g[5] = b.y;
			g[9] = c.y;
			g[2] = a.z;
			g[6] = b.z;
			g[10] = c.z;
			return this
		}
	} (),
	multiply: function(a, b) {
		return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
	},
	multiplyMatrices: function(a, b) {
		var c = a.elements,
		d = b.elements,
		e = this.elements,
		f = c[0],
		g = c[4],
		h = c[8],
		i = c[12],
		k = c[1],
		l = c[5],
		m = c[9],
		p = c[13],
		s = c[2],
		r = c[6],
		n = c[10],
		q = c[14],
		z = c[3],
		t = c[7],
		x = c[11],
		c = c[15],
		u = d[0],
		B = d[4],
		G = d[8],
		D = d[12],
		w = d[1],
		I = d[5],
		J = d[9],
		E = d[13],
		Z = d[2],
		A = d[6],
		S = d[10],
		F = d[14],
		H = d[3],
		K = d[7],
		N = d[11],
		d = d[15];
		e[0] = f * u + g * w + h * Z + i * H;
		e[4] = f * B + g * I + h * A + i * K;
		e[8] = f * G + g * J + h * S + i * N;
		e[12] = f * D + g * E + h * F + i * d;
		e[1] = k * u + l * w + m * Z + p * H;
		e[5] = k * B + l * I + m * A + p * K;
		e[9] = k * G + l * J + m * S + p * N;
		e[13] = k * D + l * E + m * F + p * d;
		e[2] = s * u + r * w + n * Z + q * H;
		e[6] = s * B + r * I + n * A + q * K;
		e[10] = s * G + r * J + n * S + q * N;
		e[14] = s * D + r * E + n * F + q * d;
		e[3] = z * u + t * w + x * Z + c * H;
		e[7] = z * B + t * I + x * A + c * K;
		e[11] = z * G + t * J + x * S + c * N;
		e[15] = z * D + t * E + x * F + c * d;
		return this
	},
	multiplyToArray: function(a, b, c) {
		var d = this.elements;
		this.multiplyMatrices(a, b);
		c[0] = d[0];
		c[1] = d[1];
		c[2] = d[2];
		c[3] = d[3];
		c[4] = d[4];
		c[5] = d[5];
		c[6] = d[6];
		c[7] = d[7];
		c[8] = d[8];
		c[9] = d[9];
		c[10] = d[10];
		c[11] = d[11];
		c[12] = d[12];
		c[13] = d[13];
		c[14] = d[14];
		c[15] = d[15];
		return this
	},
	multiplyScalar: function(a) {
		var b = this.elements;
		b[0] *= a;
		b[4] *= a;
		b[8] *= a;
		b[12] *= a;
		b[1] *= a;
		b[5] *= a;
		b[9] *= a;
		b[13] *= a;
		b[2] *= a;
		b[6] *= a;
		b[10] *= a;
		b[14] *= a;
		b[3] *= a;
		b[7] *= a;
		b[11] *= a;
		b[15] *= a;
		return this
	},
	multiplyVector3: function(a) {
		console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
		return a.applyProjection(this)
	},
	multiplyVector4: function(a) {
		console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
		return a.applyMatrix4(this)
	},
	multiplyVector3Array: function() {
		var a = new THREE.Vector3;
		return function(b) {
			for (var c = 0,
			d = b.length; c < d; c += 3) a.x = b[c],
			a.y = b[c + 1],
			a.z = b[c + 2],
			a.applyProjection(this),
			b[c] = a.x,
			b[c + 1] = a.y,
			b[c + 2] = a.z;
			return b
		}
	} (),
	rotateAxis: function(a) {
		console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
		a.transformDirection(this)
	},
	crossVector: function(a) {
		var b = this.elements,
		c = new THREE.Vector4;
		c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
		c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
		c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
		c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w: 1;
		return c
	},
	determinant: function() {
		var a = this.elements,
		b = a[0],
		c = a[4],
		d = a[8],
		e = a[12],
		f = a[1],
		g = a[5],
		h = a[9],
		i = a[13],
		k = a[2],
		l = a[6],
		m = a[10],
		p = a[14];
		return a[3] * ( + e * h * l - d * i * l - e * g * m + c * i * m + d * g * p - c * h * p) + a[7] * ( + b * h * p - b * i * m + e * f * m - d * f * p + d * i * k - e * h * k) + a[11] * ( + b * i * l - b * g * p - e * f * l + c * f * p + e * g * k - c * i * k) + a[15] * ( - d * g * k - b * h * l + b * g * m + d * f * l - c * f * m + c * h * k)
	},
	transpose: function() {
		var a = this.elements,
		b;
		b = a[1];
		a[1] = a[4];
		a[4] = b;
		b = a[2];
		a[2] = a[8];
		a[8] = b;
		b = a[6];
		a[6] = a[9];
		a[9] = b;
		b = a[3];
		a[3] = a[12];
		a[12] = b;
		b = a[7];
		a[7] = a[13];
		a[13] = b;
		b = a[11];
		a[11] = a[14];
		a[14] = b;
		return this
	},
	flattenToArray: function(a) {
		var b = this.elements;
		a[0] = b[0];
		a[1] = b[1];
		a[2] = b[2];
		a[3] = b[3];
		a[4] = b[4];
		a[5] = b[5];
		a[6] = b[6];
		a[7] = b[7];
		a[8] = b[8];
		a[9] = b[9];
		a[10] = b[10];
		a[11] = b[11];
		a[12] = b[12];
		a[13] = b[13];
		a[14] = b[14];
		a[15] = b[15];
		return a
	},
	flattenToArrayOffset: function(a, b) {
		var c = this.elements;
		a[b] = c[0];
		a[b + 1] = c[1];
		a[b + 2] = c[2];
		a[b + 3] = c[3];
		a[b + 4] = c[4];
		a[b + 5] = c[5];
		a[b + 6] = c[6];
		a[b + 7] = c[7];
		a[b + 8] = c[8];
		a[b + 9] = c[9];
		a[b + 10] = c[10];
		a[b + 11] = c[11];
		a[b + 12] = c[12];
		a[b + 13] = c[13];
		a[b + 14] = c[14];
		a[b + 15] = c[15];
		return a
	},
	getPosition: function() {
		var a = new THREE.Vector3;
		return function() {
			console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
			var b = this.elements;
			return a.set(b[12], b[13], b[14])
		}
	} (),
	setPosition: function(a) {
		var b = this.elements;
		b[12] = a.x;
		b[13] = a.y;
		b[14] = a.z;
		return this
	},
	getInverse: function(a, b) {
		var c = this.elements,
		d = a.elements,
		e = d[0],
		f = d[4],
		g = d[8],
		h = d[12],
		i = d[1],
		k = d[5],
		l = d[9],
		m = d[13],
		p = d[2],
		s = d[6],
		r = d[10],
		n = d[14],
		q = d[3],
		z = d[7],
		t = d[11],
		x = d[15];
		c[0] = l * n * z - m * r * z + m * s * t - k * n * t - l * s * x + k * r * x;
		c[4] = h * r * z - g * n * z - h * s * t + f * n * t + g * s * x - f * r * x;
		c[8] = g * m * z - h * l * z + h * k * t - f * m * t - g * k * x + f * l * x;
		c[12] = h * l * s - g * m * s - h * k * r + f * m * r + g * k * n - f * l * n;
		c[1] = m * r * q - l * n * q - m * p * t + i * n * t + l * p * x - i * r * x;
		c[5] = g * n * q - h * r * q + h * p * t - e * n * t - g * p * x + e * r * x;
		c[9] = h * l * q - g * m * q - h * i * t + e * m * t + g * i * x - e * l * x;
		c[13] = g * m * p - h * l * p + h * i * r - e * m * r - g * i * n + e * l * n;
		c[2] = k * n * q - m * s * q + m * p * z - i * n * z - k * p * x + i * s * x;
		c[6] = h * s * q - f * n * q - h * p * z + e * n * z + f * p * x - e * s * x;
		c[10] = f * m * q - h * k * q + h * i * z - e * m * z - f * i * x + e * k * x;
		c[14] = h * k * p - f * m * p - h * i * s + e * m * s + f * i * n - e * k * n;
		c[3] = l * s * q - k * r * q - l * p * z + i * r * z + k * p * t - i * s * t;
		c[7] = f * r * q - g * s * q + g * p * z - e * r * z - f * p * t + e * s * t;
		c[11] = g * k * q - f * l * q - g * i * z + e * l * z + f * i * t - e * k * t;
		c[15] = f * l * p - g * k * p + g * i * s - e * l * s - f * i * r + e * k * r;
		c = d[0] * c[0] + d[1] * c[4] + d[2] * c[8] + d[3] * c[12];
		if (0 == c) {
			if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
			console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
			this.identity();
			return this
		}
		this.multiplyScalar(1 / c);
		return this
	},
	extractPosition: function(a) {
		var b = this.elements,
		a = a.elements;
		b[12] = a[12];
		b[13] = a[13];
		b[14] = a[14];
		return this
	},
	extractRotation: function() {
		var a = new THREE.Vector3;
		return function(b) {
			var c = this.elements,
			b = b.elements,
			d = 1 / a.set(b[0], b[1], b[2]).length(),
			e = 1 / a.set(b[4], b[5], b[6]).length(),
			f = 1 / a.set(b[8], b[9], b[10]).length();
			c[0] = b[0] * d;
			c[1] = b[1] * d;
			c[2] = b[2] * d;
			c[4] = b[4] * e;
			c[5] = b[5] * e;
			c[6] = b[6] * e;
			c[8] = b[8] * f;
			c[9] = b[9] * f;
			c[10] = b[10] * f;
			return this
		}
	} (),
	translate: function(a) {
		var b = this.elements,
		c = a.x,
		d = a.y,
		a = a.z;
		b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
		b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
		b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
		b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
		return this
	},
	rotateX: function(a) {
		var b = this.elements,
		c = b[4],
		d = b[5],
		e = b[6],
		f = b[7],
		g = b[8],
		h = b[9],
		i = b[10],
		k = b[11],
		l = Math.cos(a),
		a = Math.sin(a);
		b[4] = l * c + a * g;
		b[5] = l * d + a * h;
		b[6] = l * e + a * i;
		b[7] = l * f + a * k;
		b[8] = l * g - a * c;
		b[9] = l * h - a * d;
		b[10] = l * i - a * e;
		b[11] = l * k - a * f;
		return this
	},
	rotateY: function(a) {
		var b = this.elements,
		c = b[0],
		d = b[1],
		e = b[2],
		f = b[3],
		g = b[8],
		h = b[9],
		i = b[10],
		k = b[11],
		l = Math.cos(a),
		a = Math.sin(a);
		b[0] = l * c - a * g;
		b[1] = l * d - a * h;
		b[2] = l * e - a * i;
		b[3] = l * f - a * k;
		b[8] = l * g + a * c;
		b[9] = l * h + a * d;
		b[10] = l * i + a * e;
		b[11] = l * k + a * f;
		return this
	},
	rotateZ: function(a) {
		var b = this.elements,
		c = b[0],
		d = b[1],
		e = b[2],
		f = b[3],
		g = b[4],
		h = b[5],
		i = b[6],
		k = b[7],
		l = Math.cos(a),
		a = Math.sin(a);
		b[0] = l * c + a * g;
		b[1] = l * d + a * h;
		b[2] = l * e + a * i;
		b[3] = l * f + a * k;
		b[4] = l * g - a * c;
		b[5] = l * h - a * d;
		b[6] = l * i - a * e;
		b[7] = l * k - a * f;
		return this
	},
	rotateByAxis: function(a, b) {
		var c = this.elements;
		if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
		if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
		if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
		var d = a.x,
		e = a.y,
		f = a.z,
		g = Math.sqrt(d * d + e * e + f * f),
		d = d / g,
		e = e / g,
		f = f / g,
		g = d * d,
		h = e * e,
		i = f * f,
		k = Math.cos(b),
		l = Math.sin(b),
		m = 1 - k,
		p = d * e * m,
		s = d * f * m,
		m = e * f * m,
		d = d * l,
		r = e * l,
		l = f * l,
		f = g + (1 - g) * k,
		g = p + l,
		e = s - r,
		p = p - l,
		h = h + (1 - h) * k,
		l = m + d,
		s = s + r,
		m = m - d,
		i = i + (1 - i) * k,
		k = c[0],
		d = c[1],
		r = c[2],
		n = c[3],
		q = c[4],
		z = c[5],
		t = c[6],
		x = c[7],
		u = c[8],
		B = c[9],
		G = c[10],
		D = c[11];
		c[0] = f * k + g * q + e * u;
		c[1] = f * d + g * z + e * B;
		c[2] = f * r + g * t + e * G;
		c[3] = f * n + g * x + e * D;
		c[4] = p * k + h * q + l * u;
		c[5] = p * d + h * z + l * B;
		c[6] = p * r + h * t + l * G;
		c[7] = p * n + h * x + l * D;
		c[8] = s * k + m * q + i * u;
		c[9] = s * d + m * z + i * B;
		c[10] = s * r + m * t + i * G;
		c[11] = s * n + m * x + i * D;
		return this
	},
	scale: function(a) {
		var b = this.elements,
		c = a.x,
		d = a.y,
		a = a.z;
		b[0] *= c;
		b[4] *= d;
		b[8] *= a;
		b[1] *= c;
		b[5] *= d;
		b[9] *= a;
		b[2] *= c;
		b[6] *= d;
		b[10] *= a;
		b[3] *= c;
		b[7] *= d;
		b[11] *= a;
		return this
	},
	getMaxScaleOnAxis: function() {
		var a = this.elements;
		return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
	},
	makeTranslation: function(a, b, c) {
		this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
		return this
	},
	makeRotationX: function(a) {
		var b = Math.cos(a),
		a = Math.sin(a);
		this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationY: function(a) {
		var b = Math.cos(a),
		a = Math.sin(a);
		this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationZ: function(a) {
		var b = Math.cos(a),
		a = Math.sin(a);
		this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationAxis: function(a, b) {
		var c = Math.cos(b),
		d = Math.sin(b),
		e = 1 - c,
		f = a.x,
		g = a.y,
		h = a.z,
		i = e * f,
		k = e * g;
		this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, k * g + c, k * h - d * f, 0, i * h - d * g, k * h + d * f, e * h * h + c, 0, 0, 0, 0, 1);
		return this
	},
	makeScale: function(a, b, c) {
		this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
		return this
	},
	makeFrustum: function(a, b, c, d, e, f) {
		var g = this.elements;
		g[0] = 2 * e / (b - a);
		g[4] = 0;
		g[8] = (b + a) / (b - a);
		g[12] = 0;
		g[1] = 0;
		g[5] = 2 * e / (d - c);
		g[9] = (d + c) / (d - c);
		g[13] = 0;
		g[2] = 0;
		g[6] = 0;
		g[10] = -(f + e) / (f - e);
		g[14] = -2 * f * e / (f - e);
		g[3] = 0;
		g[7] = 0;
		g[11] = -1;
		g[15] = 0;
		return this
	},
	makePerspective: function(a, b, c, d) {
		var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
		e = -a;
		return this.makeFrustum(e * b, a * b, e, a, c, d)
	},
	makeOrthographic: function(a, b, c, d, e, f) {
		var g = this.elements,
		h = b - a,
		i = c - d,
		k = f - e;
		g[0] = 2 / h;
		g[4] = 0;
		g[8] = 0;
		g[12] = -((b + a) / h);
		g[1] = 0;
		g[5] = 2 / i;
		g[9] = 0;
		g[13] = -((c + d) / i);
		g[2] = 0;
		g[6] = 0;
		g[10] = -2 / k;
		g[14] = -((f + e) / k);
		g[3] = 0;
		g[7] = 0;
		g[11] = 0;
		g[15] = 1;
		return this
	},
	clone: function() {
		var a = this.elements;
		return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
	}
};
THREE.extend(THREE.Matrix4.prototype, {
	compose: function() {
		var a = new THREE.Matrix4,
		b = new THREE.Matrix4;
		return function(c, d, e) {
			var f = this.elements;
			a.identity();
			a.setRotationFromQuaternion(d);
			b.makeScale(e.x, e.y, e.z);
			this.multiplyMatrices(a, b);
			f[12] = c.x;
			f[13] = c.y;
			f[14] = c.z;
			return this
		}
	} (),
	decompose: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3,
		c = new THREE.Vector3,
		d = new THREE.Matrix4;
		return function(e, f, g) {
			var h = this.elements;
			a.set(h[0], h[1], h[2]);
			b.set(h[4], h[5], h[6]);
			c.set(h[8], h[9], h[10]);
			e = e instanceof THREE.Vector3 ? e: new THREE.Vector3;
			f = f instanceof THREE.Quaternion ? f: new THREE.Quaternion;
			g = g instanceof THREE.Vector3 ? g: new THREE.Vector3;
			g.x = a.length();
			g.y = b.length();
			g.z = c.length();
			e.x = h[12];
			e.y = h[13];
			e.z = h[14];
			d.copy(this);
			d.elements[0] /= g.x;
			d.elements[1] /= g.x;
			d.elements[2] /= g.x;
			d.elements[4] /= g.y;
			d.elements[5] /= g.y;
			d.elements[6] /= g.y;
			d.elements[8] /= g.z;
			d.elements[9] /= g.z;
			d.elements[10] /= g.z;
			f.setFromRotationMatrix(d);
			return [e, f, g]
		}
	} ()
});
THREE.Ray = function(a, b) {
	this.origin = void 0 !== a ? a: new THREE.Vector3;
	this.direction = void 0 !== b ? b: new THREE.Vector3
};
THREE.Ray.prototype = {
	constructor: THREE.Ray,
	set: function(a, b) {
		this.origin.copy(a);
		this.direction.copy(b);
		return this
	},
	copy: function(a) {
		this.origin.copy(a.origin);
		this.direction.copy(a.direction);
		return this
	},
	at: function(a, b) {
		return (b || new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)
	},
	recast: function() {
		var a = new THREE.Vector3;
		return function(b) {
			this.origin.copy(this.at(b, a));
			return this
		}
	} (),
	closestPointToPoint: function(a, b) {
		var c = b || new THREE.Vector3;
		c.subVectors(a, this.origin);
		var d = c.dot(this.direction);
		return c.copy(this.direction).multiplyScalar(d).add(this.origin)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector3;
		return function(b) {
			var c = a.subVectors(b, this.origin).dot(this.direction);
			a.copy(this.direction).multiplyScalar(c).add(this.origin);
			return a.distanceTo(b)
		}
	} (),
	isIntersectionSphere: function(a) {
		return this.distanceToPoint(a.center) <= a.radius
	},
	isIntersectionPlane: function(a) {
		return 0 != a.normal.dot(this.direction) || 0 == a.distanceToPoint(this.origin) ? !0 : !1
	},
	distanceToPlane: function(a) {
		var b = a.normal.dot(this.direction);
		if (0 == b) {
			if (0 == a.distanceToPoint(this.origin)) return 0
		} else return - (this.origin.dot(a.normal) + a.constant) / b
	},
	intersectPlane: function(a, b) {
		var c = this.distanceToPlane(a);
		return void 0 === c ? void 0 : this.at(c, b)
	},
	applyMatrix4: function(a) {
		this.direction.add(this.origin).applyMatrix4(a);
		this.origin.applyMatrix4(a);
		this.direction.sub(this.origin);
		return this
	},
	equals: function(a) {
		return a.origin.equals(this.origin) && a.direction.equals(this.direction)
	},
	clone: function() {
		return (new THREE.Ray).copy(this)
	}
};
THREE.Sphere = function(a, b) {
	this.center = void 0 !== a ? a: new THREE.Vector3;
	this.radius = void 0 !== b ? b: 0
};
THREE.Sphere.prototype = {
	constructor: THREE.Sphere,
	set: function(a, b) {
		this.center.copy(a);
		this.radius = b;
		return this
	},
	setFromCenterAndPoints: function(a, b) {
		for (var c = 0,
		d = 0,
		e = b.length; d < e; d++) var f = a.distanceToSquared(b[d]),
		c = Math.max(c, f);
		this.center = a;
		this.radius = Math.sqrt(c);
		return this
	},
	copy: function(a) {
		this.center.copy(a.center);
		this.radius = a.radius;
		return this
	},
	empty: function() {
		return 0 >= this.radius
	},
	containsPoint: function(a) {
		return a.distanceToSquared(this.center) <= this.radius * this.radius
	},
	distanceToPoint: function(a) {
		return a.distanceTo(this.center) - this.radius
	},
	intersectsSphere: function(a) {
		var b = this.radius + a.radius;
		return a.center.distanceToSquared(this.center) <= b * b
	},
	clampPoint: function(a, b) {
		var c = this.center.distanceToSquared(a),
		d = b || new THREE.Vector3;
		d.copy(a);
		c > this.radius * this.radius && (d.sub(this.center).normalize(), d.multiplyScalar(this.radius).add(this.center));
		return d
	},
	getBoundingBox: function(a) {
		a = a || new THREE.Box3;
		a.set(this.center, this.center);
		a.expandByScalar(this.radius);
		return a
	},
	applyMatrix4: function(a) {
		this.center.applyMatrix4(a);
		this.radius *= a.getMaxScaleOnAxis();
		return this
	},
	translate: function(a) {
		this.center.add(a);
		return this
	},
	equals: function(a) {
		return a.center.equals(this.center) && a.radius === this.radius
	},
	clone: function() {
		return (new THREE.Sphere).copy(this)
	}
};
THREE.Frustum = function(a, b, c, d, e, f) {
	this.planes = [void 0 !== a ? a: new THREE.Plane, void 0 !== b ? b: new THREE.Plane, void 0 !== c ? c: new THREE.Plane, void 0 !== d ? d: new THREE.Plane, void 0 !== e ? e: new THREE.Plane, void 0 !== f ? f: new THREE.Plane]
};
THREE.Frustum.prototype = {
	constructor: THREE.Frustum,
	set: function(a, b, c, d, e, f) {
		var g = this.planes;
		g[0].copy(a);
		g[1].copy(b);
		g[2].copy(c);
		g[3].copy(d);
		g[4].copy(e);
		g[5].copy(f);
		return this
	},
	copy: function(a) {
		for (var b = this.planes,
		c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
		return this
	},
	setFromMatrix: function(a) {
		var b = this.planes,
		c = a.elements,
		a = c[0],
		d = c[1],
		e = c[2],
		f = c[3],
		g = c[4],
		h = c[5],
		i = c[6],
		k = c[7],
		l = c[8],
		m = c[9],
		p = c[10],
		s = c[11],
		r = c[12],
		n = c[13],
		q = c[14],
		c = c[15];
		b[0].setComponents(f - a, k - g, s - l, c - r).normalize();
		b[1].setComponents(f + a, k + g, s + l, c + r).normalize();
		b[2].setComponents(f + d, k + h, s + m, c + n).normalize();
		b[3].setComponents(f - d, k - h, s - m, c - n).normalize();
		b[4].setComponents(f - e, k - i, s - p, c - q).normalize();
		b[5].setComponents(f + e, k + i, s + p, c + q).normalize();
		return this
	},
	intersectsObject: function() {
		var a = new THREE.Vector3;
		return function(b) {
			var c = b.matrixWorld,
			d = this.planes,
			b = -b.geometry.boundingSphere.radius * c.getMaxScaleOnAxis();
			a.getPositionFromMatrix(c);
			for (c = 0; 6 > c; c++) if (d[c].distanceToPoint(a) < b) return ! 1;
			return ! 0
		}
	} (),
	intersectsSphere: function(a) {
		for (var b = this.planes,
		c = a.center,
		a = -a.radius,
		d = 0; 6 > d; d++) if (b[d].distanceToPoint(c) < a) return ! 1;
		return ! 0
	},
	containsPoint: function(a) {
		for (var b = this.planes,
		c = 0; 6 > c; c++) if (0 > b[c].distanceToPoint(a)) return ! 1;
		return ! 0
	},
	clone: function() {
		return (new THREE.Frustum).copy(this)
	}
};
THREE.Plane = function(a, b) {
	this.normal = void 0 !== a ? a: new THREE.Vector3(1, 0, 0);
	this.constant = void 0 !== b ? b: 0
};
THREE.Plane.prototype = {
	constructor: THREE.Plane,
	set: function(a, b) {
		this.normal.copy(a);
		this.constant = b;
		return this
	},
	setComponents: function(a, b, c, d) {
		this.normal.set(a, b, c);
		this.constant = d;
		return this
	},
	setFromNormalAndCoplanarPoint: function(a, b) {
		this.normal.copy(a);
		this.constant = -b.dot(this.normal);
		return this
	},
	setFromCoplanarPoints: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3;
		return function(c, d, e) {
			d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
			this.setFromNormalAndCoplanarPoint(d, c);
			return this
		}
	} (),
	copy: function(a) {
		this.normal.copy(a.normal);
		this.constant = a.constant;
		return this
	},
	normalize: function() {
		var a = 1 / this.normal.length();
		this.normal.multiplyScalar(a);
		this.constant *= a;
		return this
	},
	negate: function() {
		this.constant *= -1;
		this.normal.negate();
		return this
	},
	distanceToPoint: function(a) {
		return this.normal.dot(a) + this.constant
	},
	distanceToSphere: function(a) {
		return this.distanceToPoint(a.center) - a.radius
	},
	projectPoint: function(a, b) {
		return this.orthoPoint(a, b).sub(a).negate()
	},
	orthoPoint: function(a, b) {
		var c = this.distanceToPoint(a);
		return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
	},
	isIntersectionLine: function(a) {
		var b = this.distanceToPoint(a.start),
		a = this.distanceToPoint(a.end);
		return 0 > b && 0 < a || 0 > a && 0 < b
	},
	intersectLine: function() {
		var a = new THREE.Vector3;
		return function(b, c) {
			var d = c || new THREE.Vector3,
			e = b.delta(a),
			f = this.normal.dot(e);
			if (0 == f) {
				if (0 == this.distanceToPoint(b.start)) return d.copy(b.start)
			} else return f = -(b.start.dot(this.normal) + this.constant) / f,
			0 > f || 1 < f ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)
		}
	} (),
	coplanarPoint: function(a) {
		return (a || new THREE.Vector3).copy(this.normal).multiplyScalar( - this.constant)
	},
	applyMatrix4: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3;
		return function(c, d) {
			var d = d || (new THREE.Matrix3).getInverse(c).transpose(),
			e = a.copy(this.normal).applyMatrix3(d),
			f = this.coplanarPoint(b);
			f.applyMatrix4(c);
			this.setFromNormalAndCoplanarPoint(e, f);
			return this
		}
	} (),
	translate: function(a) {
		this.constant -= a.dot(this.normal);
		return this
	},
	equals: function(a) {
		return a.normal.equals(this.normal) && a.constant == this.constant
	},
	clone: function() {
		return (new THREE.Plane).copy(this)
	}
};
THREE.Math = {
	clamp: function(a, b, c) {
		return a < b ? b: a > c ? c: a
	},
	clampBottom: function(a, b) {
		return a < b ? b: a
	},
	mapLinear: function(a, b, c, d, e) {
		return d + (a - b) * (e - d) / (c - b)
	},
	smoothstep: function(a, b, c) {
		if (a <= b) return 0;
		if (a >= c) return 1;
		a = (a - b) / (c - b);
		return a * a * (3 - 2 * a)
	},
	smootherstep: function(a, b, c) {
		if (a <= b) return 0;
		if (a >= c) return 1;
		a = (a - b) / (c - b);
		return a * a * a * (a * (6 * a - 15) + 10)
	},
	random16: function() {
		return (65280 * Math.random() + 255 * Math.random()) / 65535
	},
	randInt: function(a, b) {
		return a + Math.floor(Math.random() * (b - a + 1))
	},
	randFloat: function(a, b) {
		return a + Math.random() * (b - a)
	},
	randFloatSpread: function(a) {
		return a * (0.5 - Math.random())
	},
	sign: function(a) {
		return 0 > a ? -1 : 0 < a ? 1 : 0
	},
	degToRad: function() {
		var a = Math.PI / 180;
		return function(b) {
			return b * a
		}
	} (),
	radToDeg: function() {
		var a = 180 / Math.PI;
		return function(b) {
			return b * a
		}
	} ()
};
THREE.Spline = function(a) {
	function b(a, b, c, d, e, f, g) {
		a = 0.5 * (c - a);
		d = 0.5 * (d - b);
		return (2 * (b - c) + a + d) * g + ( - 3 * (b - c) - 2 * a - d) * f + a * e + b
	}
	this.points = a;
	var c = [],
	d = {
		x: 0,
		y: 0,
		z: 0
	},
	e,
	f,
	g,
	h,
	i,
	k,
	l,
	m,
	p;
	this.initFromArray = function(a) {
		this.points = [];
		for (var b = 0; b < a.length; b++) this.points[b] = {
			x: a[b][0],
			y: a[b][1],
			z: a[b][2]
		}
	};
	this.getPoint = function(a) {
		e = (this.points.length - 1) * a;
		f = Math.floor(e);
		g = e - f;
		c[0] = 0 === f ? f: f - 1;
		c[1] = f;
		c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
		c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
		k = this.points[c[0]];
		l = this.points[c[1]];
		m = this.points[c[2]];
		p = this.points[c[3]];
		h = g * g;
		i = g * h;
		d.x = b(k.x, l.x, m.x, p.x, g, h, i);
		d.y = b(k.y, l.y, m.y, p.y, g, h, i);
		d.z = b(k.z, l.z, m.z, p.z, g, h, i);
		return d
	};
	this.getControlPointsArray = function() {
		var a, b, c = this.points.length,
		d = [];
		for (a = 0; a < c; a++) b = this.points[a],
		d[a] = [b.x, b.y, b.z];
		return d
	};
	this.getLength = function(a) {
		var b, c, d, e = b = b = 0,
		f = new THREE.Vector3,
		g = new THREE.Vector3,
		h = [],
		i = 0;
		h[0] = 0;
		a || (a = 100);
		c = this.points.length * a;
		f.copy(this.points[0]);
		for (a = 1; a < c; a++) b = a / c,
		d = this.getPoint(b),
		g.copy(d),
		i += g.distanceTo(f),
		f.copy(d),
		b *= this.points.length - 1,
		b = Math.floor(b),
		b != e && (h[b] = i, e = b);
		h[h.length] = i;
		return {
			chunks: h,
			total: i
		}
	};
	this.reparametrizeByArcLength = function(a) {
		var b, c, d, e, f, g, h = [],
		i = new THREE.Vector3,
		k = this.getLength();
		h.push(i.copy(this.points[0]).clone());
		for (b = 1; b < this.points.length; b++) {
			c = k.chunks[b] - k.chunks[b - 1];
			g = Math.ceil(a * c / k.total);
			e = (b - 1) / (this.points.length - 1);
			f = b / (this.points.length - 1);
			for (c = 1; c < g - 1; c++) d = e + c * (1 / g) * (f - e),
			d = this.getPoint(d),
			h.push(i.copy(d).clone());
			h.push(i.copy(this.points[b]).clone())
		}
		this.points = h
	}
};
THREE.Triangle = function(a, b, c) {
	this.a = void 0 !== a ? a: new THREE.Vector3;
	this.b = void 0 !== b ? b: new THREE.Vector3;
	this.c = void 0 !== c ? c: new THREE.Vector3
};
THREE.Triangle.normal = function() {
	var a = new THREE.Vector3;
	return function(b, c, d, e) {
		e = e || new THREE.Vector3;
		e.subVectors(d, c);
		a.subVectors(b, c);
		e.cross(a);
		b = e.lengthSq();
		return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
	}
} ();
THREE.Triangle.barycoordFromPoint = function() {
	var a = new THREE.Vector3,
	b = new THREE.Vector3,
	c = new THREE.Vector3;
	return function(d, e, f, g, h) {
		a.subVectors(g, e);
		b.subVectors(f, e);
		c.subVectors(d, e);
		var d = a.dot(a),
		e = a.dot(b),
		f = a.dot(c),
		i = b.dot(b),
		g = b.dot(c),
		k = d * i - e * e,
		h = h || new THREE.Vector3;
		if (0 == k) return h.set( - 2, -1, -1);
		k = 1 / k;
		i = (i * f - e * g) * k;
		d = (d * g - e * f) * k;
		return h.set(1 - i - d, d, i)
	}
} ();
THREE.Triangle.containsPoint = function() {
	var a = new THREE.Vector3;
	return function(b, c, d, e) {
		b = THREE.Triangle.barycoordFromPoint(b, c, d, e, a);
		return 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
	}
} ();
THREE.Triangle.prototype = {
	constructor: THREE.Triangle,
	set: function(a, b, c) {
		this.a.copy(a);
		this.b.copy(b);
		this.c.copy(c);
		return this
	},
	setFromPointsAndIndices: function(a, b, c, d) {
		this.a.copy(a[b]);
		this.b.copy(a[c]);
		this.c.copy(a[d]);
		return this
	},
	copy: function(a) {
		this.a.copy(a.a);
		this.b.copy(a.b);
		this.c.copy(a.c);
		return this
	},
	area: function() {
		var a = new THREE.Vector3,
		b = new THREE.Vector3;
		return function() {
			a.subVectors(this.c, this.b);
			b.subVectors(this.a, this.b);
			return 0.5 * a.cross(b).length()
		}
	} (),
	midpoint: function(a) {
		return (a || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
	},
	normal: function(a) {
		return THREE.Triangle.normal(this.a, this.b, this.c, a)
	},
	plane: function(a) {
		return (a || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
	},
	barycoordFromPoint: function(a, b) {
		return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
	},
	containsPoint: function(a) {
		return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
	},
	equals: function(a) {
		return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
	},
	clone: function() {
		return (new THREE.Triangle).copy(this)
	}
};
THREE.Vertex = function(a) {
	console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
	return a
};
THREE.UV = function(a, b) {
	console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");
	return new THREE.Vector2(a, b)
};
THREE.Clock = function(a) {
	this.autoStart = void 0 !== a ? a: !0;
	this.elapsedTime = this.oldTime = this.startTime = 0;
	this.running = !1
};
THREE.extend(THREE.Clock.prototype, {
	start: function() {
		this.oldTime = this.startTime = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
		this.running = !0
	},
	stop: function() {
		this.getElapsedTime();
		this.running = !1
	},
	getElapsedTime: function() {
		this.getDelta();
		return this.elapsedTime
	},
	getDelta: function() {
		var a = 0;
		this.autoStart && !this.running && this.start();
		if (this.running) {
			var b = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(),
			a = 0.001 * (b - this.oldTime);
			this.oldTime = b;
			this.elapsedTime += a
		}
		return a
	}
});
THREE.EventDispatcher = function() {
	var a = {};
	this.addEventListener = function(b, c) {
		void 0 === a[b] && (a[b] = []); - 1 === a[b].indexOf(c) && a[b].push(c)
	};
	this.removeEventListener = function(b, c) {
		var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
	};
	this.dispatchEvent = function(b) {
		var c = a[b.type];
		if (void 0 !== c) {
			b.target = this;
			for (var d = 0,
			e = c.length; d < e; d++) c[d].call(this, b)
		}
	}
}; (function(a) {
	a.Raycaster = function(b, c, d, e) {
		this.ray = new a.Ray(b, c);
		0 < this.ray.direction.lengthSq() && this.ray.direction.normalize();
		this.near = d || 0;
		this.far = e || Infinity
	};
	var b = new a.Sphere,
	c = new a.Ray,
	d = new a.Plane,
	e = new a.Vector3,
	f = new a.Vector3,
	g = new a.Matrix4,
	h = function(a, b) {
		return a.distance - b.distance
	},
	i = function(h, i, k) {
		if (h instanceof a.Particle) {
			f.getPositionFromMatrix(h.matrixWorld);
			i = i.ray.distanceToPoint(f);
			if (i > h.scale.x) return k;
			k.push({
				distance: i,
				point: h.position,
				face: null,
				object: h
			})
		} else if (h instanceof a.Mesh) {
			f.getPositionFromMatrix(h.matrixWorld);
			b.set(f, h.geometry.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis());
			if (!i.ray.isIntersectionSphere(b)) return k;
			var s = h.geometry,
			r = s.vertices,
			n = h.material instanceof a.MeshFaceMaterial,
			q = !0 === n ? h.material.materials: null,
			z = h.material.side,
			t,
			x,
			u,
			B = i.precision;
			h.matrixRotationWorld.extractRotation(h.matrixWorld);
			g.getInverse(h.matrixWorld);
			c.copy(i.ray).applyMatrix4(g);
			for (var G = 0,
			D = s.faces.length; G < D; G++) {
				var w = s.faces[G],
				z = !0 === n ? q[w.materialIndex] : h.material;
				if (void 0 !== z) {
					d.setFromNormalAndCoplanarPoint(w.normal, r[w.a]);
					var I = c.distanceToPlane(d);
					if (! (Math.abs(I) < B) && !(0 > I)) {
						z = z.side;
						if (z !== a.DoubleSide && (t = c.direction.dot(d.normal), !(z === a.FrontSide ? 0 > t: 0 < t))) continue;
						if (! (I < i.near || I > i.far)) {
							e = c.at(I, e);
							if (w instanceof a.Face3) {
								if (z = r[w.a], t = r[w.b], x = r[w.c], !a.Triangle.containsPoint(e, z, t, x)) continue
							} else if (w instanceof a.Face4) {
								if (z = r[w.a], t = r[w.b], x = r[w.c], u = r[w.d], !a.Triangle.containsPoint(e, z, t, u) && !a.Triangle.containsPoint(e, t, x, u)) continue
							} else throw Error("face type not supported");
							k.push({
								distance: I,
								point: i.ray.at(I),
								face: w,
								faceIndex: G,
								object: h
							})
						}
					}
				}
			}
		}
	},
	k = function(a, b, c) {
		for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++) i(a[d], b, c)
	};
	a.Raycaster.prototype.precision = 1E-4;
	a.Raycaster.prototype.set = function(a, b) {
		this.ray.set(a, b);
		0 < this.ray.direction.length() && this.ray.direction.normalize()
	};
	a.Raycaster.prototype.intersectObject = function(a, b) {
		var c = []; ! 0 === b && k(a, this, c);
		i(a, this, c);
		c.sort(h);
		return c
	};
	a.Raycaster.prototype.intersectObjects = function(a, b) {
		for (var c = [], d = 0, e = a.length; d < e; d++) i(a[d], this, c),
		!0 === b && k(a[d], this, c);
		c.sort(h);
		return c
	}
})(THREE);
THREE.Object3D = function() {
	this.id = THREE.Object3DIdCount++;
	this.name = "";
	this.parent = void 0;
	this.children = [];
	this.up = new THREE.Vector3(0, 1, 0);
	this.position = new THREE.Vector3;
	this.rotation = new THREE.Vector3;
	this.eulerOrder = THREE.Object3D.defaultEulerOrder;
	this.scale = new THREE.Vector3(1, 1, 1);
	this.renderDepth = null;
	this.rotationAutoUpdate = !0;
	this.matrix = new THREE.Matrix4;
	this.matrixWorld = new THREE.Matrix4;
	this.matrixRotationWorld = new THREE.Matrix4;
	this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
	this.quaternion = new THREE.Quaternion;
	this.useQuaternion = !1;
	this.visible = !0;
	this.receiveShadow = this.castShadow = !1;
	this.frustumCulled = !0;
	this.userData = {}
};
THREE.Object3D.prototype = {
	constructor: THREE.Object3D,
	applyMatrix: function() {
		var a = new THREE.Matrix4;
		return function(b) {
			this.matrix.multiplyMatrices(b, this.matrix);
			this.position.getPositionFromMatrix(this.matrix);
			this.scale.getScaleFromMatrix(this.matrix);
			a.extractRotation(this.matrix); ! 0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
		}
	} (),
	translate: function() {
		var a = new THREE.Vector3;
		return function(b, c) {
			a.copy(c); ! 0 === this.useQuaternion ? a.applyQuaternion(this.quaternion) : a.applyEuler(this.rotation, this.eulerOrder);
			a.multiplyScalar(b);
			this.position.add(a);
			return this
		}
	} (),
	translateX: function() {
		var a = new THREE.Vector3(1, 0, 0);
		return function(b) {
			return this.translate(b, a)
		}
	} (),
	translateY: function() {
		var a = new THREE.Vector3(0, 1, 0);
		return function(b) {
			return this.translate(b, a)
		}
	} (),
	translateZ: function() {
		var a = new THREE.Vector3(0, 0, 1);
		return function(b) {
			return this.translate(b, a)
		}
	} (),
	localToWorld: function(a) {
		return a.applyMatrix4(this.matrixWorld)
	},
	worldToLocal: function() {
		var a = new THREE.Matrix4;
		return function(b) {
			return b.applyMatrix4(a.getInverse(this.matrixWorld))
		}
	} (),
	lookAt: function() {
		var a = new THREE.Matrix4;
		return function(b) {
			a.lookAt(b, this.position, this.up); ! 0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
		}
	} (),
	add: function(a) {
		if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
		else if (a instanceof THREE.Object3D) {
			void 0 !== a.parent && a.parent.remove(a);
			a.parent = this;
			this.children.push(a);
			for (var b = this; void 0 !== b.parent;) b = b.parent;
			void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
		}
	},
	remove: function(a) {
		var b = this.children.indexOf(a);
		if ( - 1 !== b) {
			a.parent = void 0;
			this.children.splice(b, 1);
			for (b = this; void 0 !== b.parent;) b = b.parent;
			void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
		}
	},
	traverse: function(a) {
		a(this);
		for (var b = 0,
		c = this.children.length; b < c; b++) this.children[b].traverse(a)
	},
	getChildByName: function(a, b) {
		for (var c = 0,
		d = this.children.length; c < d; c++) {
			var e = this.children[c];
			if (e.name === a || !0 === b && (e = e.getChildByName(a, b), void 0 !== e)) return e
		}
	},
	getDescendants: function(a) {
		void 0 === a && (a = []);
		Array.prototype.push.apply(a, this.children);
		for (var b = 0,
		c = this.children.length; b < c; b++) this.children[b].getDescendants(a);
		return a
	},
	updateMatrix: function() {
		this.matrix.setPosition(this.position); ! 1 === this.useQuaternion ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder) : this.matrix.setRotationFromQuaternion(this.quaternion); (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) && this.matrix.scale(this.scale);
		this.matrixWorldNeedsUpdate = !0
	},
	updateMatrixWorld: function(a) { ! 0 === this.matrixAutoUpdate && this.updateMatrix();
		if (!0 === this.matrixWorldNeedsUpdate || !0 === a) void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
		this.matrixWorldNeedsUpdate = !1,
		a = !0;
		for (var b = 0,
		c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
	},
	clone: function(a) {
		void 0 === a && (a = new THREE.Object3D);
		a.name = this.name;
		a.up.copy(this.up);
		a.position.copy(this.position);
		a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
		a.eulerOrder = this.eulerOrder;
		a.scale.copy(this.scale);
		a.renderDepth = this.renderDepth;
		a.rotationAutoUpdate = this.rotationAutoUpdate;
		a.matrix.copy(this.matrix);
		a.matrixWorld.copy(this.matrixWorld);
		a.matrixRotationWorld.copy(this.matrixRotationWorld);
		a.matrixAutoUpdate = this.matrixAutoUpdate;
		a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
		a.quaternion.copy(this.quaternion);
		a.useQuaternion = this.useQuaternion;
		a.visible = this.visible;
		a.castShadow = this.castShadow;
		a.receiveShadow = this.receiveShadow;
		a.frustumCulled = this.frustumCulled;
		for (var b = 0; b < this.children.length; b++) a.add(this.children[b].clone());
		return a
	}
};
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;
THREE.Projector = function() {
	function a() {
		if (f === h) {
			var a = new THREE.RenderableObject;
			g.push(a);
			h++;
			f++;
			return a
		}
		return g[f++]
	}
	function b() {
		if (k === m) {
			var a = new THREE.RenderableVertex;
			l.push(a);
			m++;
			k++;
			return a
		}
		return l[k++]
	}
	function c(a, b) {
		return b.z - a.z
	}
	function d(a, b) {
		var c = 0,
		d = 1,
		e = a.z + a.w,
		f = b.z + b.w,
		g = -a.z + a.w,
		h = -b.z + b.w;
		if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return ! 0;
		if (0 > e && 0 > f || 0 > g && 0 > h) return ! 1;
		0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
		0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h)));
		if (d < c) return ! 1;
		a.lerp(b, c);
		b.lerp(a, 1 - d);
		return ! 0
	}
	var e, f, g = [],
	h = 0,
	i,
	k,
	l = [],
	m = 0,
	p,
	s,
	r = [],
	n = 0,
	q,
	z = [],
	t = 0,
	x,
	u,
	B = [],
	G = 0,
	D,
	w,
	I = [],
	J = 0,
	E = {
		objects: [],
		sprites: [],
		lights: [],
		elements: []
	},
	Z = new THREE.Vector3,
	A = new THREE.Vector4,
	S = new THREE.Box3(new THREE.Vector3( - 1, -1, -1), new THREE.Vector3(1, 1, 1)),
	F = new THREE.Box3,
	H = Array(3),
	K = Array(4),
	N = new THREE.Matrix4,
	fa = new THREE.Matrix4,
	ma,
	eb = new THREE.Matrix4,
	M = new THREE.Matrix3,
	U = new THREE.Matrix3,
	ja = new THREE.Vector3,
	L = new THREE.Frustum,
	ca = new THREE.Vector4,
	ta = new THREE.Vector4;
	this.projectVector = function(a, b) {
		b.matrixWorldInverse.getInverse(b.matrixWorld);
		fa.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
		return a.applyProjection(fa)
	};
	this.unprojectVector = function(a, b) {
		b.projectionMatrixInverse.getInverse(b.projectionMatrix);
		fa.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse);
		return a.applyProjection(fa)
	};
	this.pickingRay = function(a, b) {
		a.z = -1;
		var c = new THREE.Vector3(a.x, a.y, 1);
		this.unprojectVector(a, b);
		this.unprojectVector(c, b);
		c.sub(a).normalize();
		return new THREE.Raycaster(a, c)
	};
	this.projectScene = function(g, h, m, db) {
		var La = !1,
		Oa, ea, ha, V, $, Y, ia, ra, na, Pa, Ba, fb, jb;
		w = u = q = s = 0;
		E.elements.length = 0;
		g.updateMatrixWorld();
		void 0 === h.parent && h.updateMatrixWorld();
		N.copy(h.matrixWorldInverse.getInverse(h.matrixWorld));
		fa.multiplyMatrices(h.projectionMatrix, N);
		U.getInverse(N);
		U.transpose();
		L.setFromMatrix(fa);
		f = 0;
		E.objects.length = 0;
		E.sprites.length = 0;
		E.lights.length = 0;
		var Sa = function(b) {
			for (var c = 0,
			d = b.children.length; c < d; c++) {
				var f = b.children[c];
				if (!1 !== f.visible) {
					if (f instanceof THREE.Light) E.lights.push(f);
					else if (f instanceof THREE.Mesh || f instanceof THREE.Line) {
						if (!1 === f.frustumCulled || !0 === L.intersectsObject(f)) e = a(),
						e.object = f,
						null !== f.renderDepth ? e.z = f.renderDepth: (Z.getPositionFromMatrix(f.matrixWorld), Z.applyProjection(fa), e.z = Z.z),
						E.objects.push(e)
					} else f instanceof THREE.Sprite || f instanceof THREE.Particle ? (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth: (Z.getPositionFromMatrix(f.matrixWorld), Z.applyProjection(fa), e.z = Z.z), E.sprites.push(e)) : (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth: (Z.getPositionFromMatrix(f.matrixWorld), Z.applyProjection(fa), e.z = Z.z), E.objects.push(e));
					Sa(f)
				}
			}
		};
		Sa(g); ! 0 === m && E.objects.sort(c);
		g = 0;
		for (m = E.objects.length; g < m; g++) if (ra = E.objects[g].object, ma = ra.matrixWorld, k = 0, ra instanceof THREE.Mesh) {
			na = ra.geometry;
			ha = na.vertices;
			Pa = na.faces;
			na = na.faceVertexUvs;
			M.getInverse(ma);
			M.transpose();
			fb = ra.material instanceof THREE.MeshFaceMaterial;
			jb = !0 === fb ? ra.material: null;
			Oa = 0;
			for (ea = ha.length; Oa < ea; Oa++) i = b(),
			i.positionWorld.copy(ha[Oa]).applyMatrix4(ma),
			i.positionScreen.copy(i.positionWorld).applyMatrix4(fa),
			i.positionScreen.x /= i.positionScreen.w,
			i.positionScreen.y /= i.positionScreen.w,
			i.positionScreen.z /= i.positionScreen.w,
			i.visible = !( - 1 > i.positionScreen.x || 1 < i.positionScreen.x || -1 > i.positionScreen.y || 1 < i.positionScreen.y || -1 > i.positionScreen.z || 1 < i.positionScreen.z);
			ha = 0;
			for (Oa = Pa.length; ha < Oa; ha++) {
				ea = Pa[ha];
				var ob = !0 === fb ? jb.materials[ea.materialIndex] : ra.material;
				if (void 0 !== ob) {
					Y = ob.side;
					if (ea instanceof THREE.Face3) if (V = l[ea.a], $ = l[ea.b], ia = l[ea.c], H[0] = V.positionScreen, H[1] = $.positionScreen, H[2] = ia.positionScreen, !0 === V.visible || !0 === $.visible || !0 === ia.visible || S.isIntersectionBox(F.setFromPoints(H))) if (La = 0 > (ia.positionScreen.x - V.positionScreen.x) * ($.positionScreen.y - V.positionScreen.y) - (ia.positionScreen.y - V.positionScreen.y) * ($.positionScreen.x - V.positionScreen.x), Y === THREE.DoubleSide || La === (Y === THREE.FrontSide)) s === n ? (Ba = new THREE.RenderableFace3, r.push(Ba), n++, s++, p = Ba) : p = r[s++],
					p.v1.copy(V),
					p.v2.copy($),
					p.v3.copy(ia);
					else continue;
					else continue;
					else if (ea instanceof THREE.Face4) if (V = l[ea.a], $ = l[ea.b], ia = l[ea.c], Ba = l[ea.d], K[0] = V.positionScreen, K[1] = $.positionScreen, K[2] = ia.positionScreen, K[3] = Ba.positionScreen, !0 === V.visible || !0 === $.visible || !0 === ia.visible || !0 === Ba.visible || S.isIntersectionBox(F.setFromPoints(K))) if (La = 0 > (Ba.positionScreen.x - V.positionScreen.x) * ($.positionScreen.y - V.positionScreen.y) - (Ba.positionScreen.y - V.positionScreen.y) * ($.positionScreen.x - V.positionScreen.x) || 0 > ($.positionScreen.x - ia.positionScreen.x) * (Ba.positionScreen.y - ia.positionScreen.y) - ($.positionScreen.y - ia.positionScreen.y) * (Ba.positionScreen.x - ia.positionScreen.x), Y === THREE.DoubleSide || La === (Y === THREE.FrontSide)) {
						if (q === t) {
							var Gb = new THREE.RenderableFace4;
							z.push(Gb);
							t++;
							q++;
							p = Gb
						} else p = z[q++];
						p.v1.copy(V);
						p.v2.copy($);
						p.v3.copy(ia);
						p.v4.copy(Ba)
					} else continue;
					else continue;
					p.normalModel.copy(ea.normal); ! 1 === La && (Y === THREE.BackSide || Y === THREE.DoubleSide) && p.normalModel.negate();
					p.normalModel.applyMatrix3(M).normalize();
					p.normalModelView.copy(p.normalModel).applyMatrix3(U);
					p.centroidModel.copy(ea.centroid).applyMatrix4(ma);
					ia = ea.vertexNormals;
					V = 0;
					for ($ = ia.length; V < $; V++) Ba = p.vertexNormalsModel[V],
					Ba.copy(ia[V]),
					!1 === La && (Y === THREE.BackSide || Y === THREE.DoubleSide) && Ba.negate(),
					Ba.applyMatrix3(M).normalize(),
					p.vertexNormalsModelView[V].copy(Ba).applyMatrix3(U);
					p.vertexNormalsLength = ia.length;
					V = 0;
					for ($ = na.length; V < $; V++) if (Ba = na[V][ha], void 0 !== Ba) {
						Y = 0;
						for (ia = Ba.length; Y < ia; Y++) p.uvs[V][Y] = Ba[Y]
					}
					p.color = ea.color;
					p.material = ob;
					ja.copy(p.centroidModel).applyProjection(fa);
					p.z = ja.z;
					E.elements.push(p)
				}
			}
		} else if (ra instanceof THREE.Line) {
			eb.multiplyMatrices(fa, ma);
			ha = ra.geometry.vertices;
			V = b();
			V.positionScreen.copy(ha[0]).applyMatrix4(eb);
			Pa = ra.type === THREE.LinePieces ? 2 : 1;
			Oa = 1;
			for (ea = ha.length; Oa < ea; Oa++) V = b(),
			V.positionScreen.copy(ha[Oa]).applyMatrix4(eb),
			0 < (Oa + 1) % Pa || ($ = l[k - 2], ca.copy(V.positionScreen), ta.copy($.positionScreen), !0 === d(ca, ta) && (ca.multiplyScalar(1 / ca.w), ta.multiplyScalar(1 / ta.w), u === G ? (na = new THREE.RenderableLine, B.push(na), G++, u++, x = na) : x = B[u++], x.v1.positionScreen.copy(ca), x.v2.positionScreen.copy(ta), x.z = Math.max(ca.z, ta.z), x.material = ra.material, E.elements.push(x)))
		}
		g = 0;
		for (m = E.sprites.length; g < m; g++) ra = E.sprites[g].object,
		ma = ra.matrixWorld,
		ra instanceof THREE.Particle && (A.set(ma.elements[12], ma.elements[13], ma.elements[14], 1), A.applyMatrix4(fa), A.z /= A.w, 0 < A.z && 1 > A.z && (w === J ? (La = new THREE.RenderableParticle, I.push(La), J++, w++, D = La) : D = I[w++], D.object = ra, D.x = A.x / A.w, D.y = A.y / A.w, D.z = A.z, D.rotation = ra.rotation.z, D.scale.x = ra.scale.x * Math.abs(D.x - (A.x + h.projectionMatrix.elements[0]) / (A.w + h.projectionMatrix.elements[12])), D.scale.y = ra.scale.y * Math.abs(D.y - (A.y + h.projectionMatrix.elements[5]) / (A.w + h.projectionMatrix.elements[13])), D.material = ra.material, E.elements.push(D))); ! 0 === db && E.elements.sort(c);
		return E
	}
};
THREE.Face3 = function(a, b, c, d, e, f) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.normal = d instanceof THREE.Vector3 ? d: new THREE.Vector3;
	this.vertexNormals = d instanceof Array ? d: [];
	this.color = e instanceof THREE.Color ? e: new THREE.Color;
	this.vertexColors = e instanceof Array ? e: [];
	this.vertexTangents = [];
	this.materialIndex = void 0 !== f ? f: 0;
	this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
	constructor: THREE.Face3,
	clone: function() {
		var a = new THREE.Face3(this.a, this.b, this.c);
		a.normal.copy(this.normal);
		a.color.copy(this.color);
		a.centroid.copy(this.centroid);
		a.materialIndex = this.materialIndex;
		var b, c;
		b = 0;
		for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
		b = 0;
		for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
		b = 0;
		for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
		return a
	}
};
THREE.Face4 = function(a, b, c, d, e, f, g) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.normal = e instanceof THREE.Vector3 ? e: new THREE.Vector3;
	this.vertexNormals = e instanceof Array ? e: [];
	this.color = f instanceof THREE.Color ? f: new THREE.Color;
	this.vertexColors = f instanceof Array ? f: [];
	this.vertexTangents = [];
	this.materialIndex = void 0 !== g ? g: 0;
	this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
	constructor: THREE.Face4,
	clone: function() {
		var a = new THREE.Face4(this.a, this.b, this.c, this.d);
		a.normal.copy(this.normal);
		a.color.copy(this.color);
		a.centroid.copy(this.centroid);
		a.materialIndex = this.materialIndex;
		var b, c;
		b = 0;
		for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
		b = 0;
		for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[b].clone();
		b = 0;
		for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
		return a
	}
};
THREE.Geometry = function() {
	THREE.EventDispatcher.call(this);
	this.id = THREE.GeometryIdCount++;
	this.name = "";
	this.vertices = [];
	this.colors = [];
	this.normals = [];
	this.faces = [];
	this.faceUvs = [[]];
	this.faceVertexUvs = [[]];
	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];
	this.skinWeights = [];
	this.skinIndices = [];
	this.lineDistances = [];
	this.boundingSphere = this.boundingBox = null;
	this.hasTangents = !1;
	this.dynamic = !0;
	this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.Geometry.prototype = {
	constructor: THREE.Geometry,
	applyMatrix: function(a) {
		for (var b = (new THREE.Matrix3).getInverse(a).transpose(), c = 0, d = this.vertices.length; c < d; c++) this.vertices[c].applyMatrix4(a);
		c = 0;
		for (d = this.faces.length; c < d; c++) {
			var e = this.faces[c];
			e.normal.applyMatrix3(b).normalize();
			for (var f = 0,
			g = e.vertexNormals.length; f < g; f++) e.vertexNormals[f].applyMatrix3(b).normalize();
			e.centroid.applyMatrix4(a)
		}
	},
	computeCentroids: function() {
		var a, b, c;
		a = 0;
		for (b = this.faces.length; a < b; a++) c = this.faces[a],
		c.centroid.set(0, 0, 0),
		c instanceof THREE.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), c.centroid.divideScalar(4))
	},
	computeFaceNormals: function() {
		for (var a = new THREE.Vector3,
		b = new THREE.Vector3,
		c = 0,
		d = this.faces.length; c < d; c++) {
			var e = this.faces[c],
			f = this.vertices[e.a],
			g = this.vertices[e.b];
			a.subVectors(this.vertices[e.c], g);
			b.subVectors(f, g);
			a.cross(b);
			a.normalize();
			e.normal.copy(a)
		}
	},
	computeVertexNormals: function(a) {
		var b, c, d, e;
		if (void 0 === this.__tmpVertices) {
			e = this.__tmpVertices = Array(this.vertices.length);
			b = 0;
			for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3;
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b],
			d instanceof THREE.Face3 ? d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : d instanceof THREE.Face4 && (d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
		} else {
			e = this.__tmpVertices;
			b = 0;
			for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0)
		}
		if (a) {
			var f, g, h, i = new THREE.Vector3,
			k = new THREE.Vector3,
			l = new THREE.Vector3,
			m = new THREE.Vector3,
			p = new THREE.Vector3;
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b],
			d instanceof THREE.Face3 ? (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], i.subVectors(g, f), k.subVectors(a, f), i.cross(k), e[d.a].add(i), e[d.b].add(i), e[d.c].add(i)) : d instanceof THREE.Face4 && (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], h = this.vertices[d.d], l.subVectors(h, f), k.subVectors(a, f), l.cross(k), e[d.a].add(l), e[d.b].add(l), e[d.d].add(l), m.subVectors(h, g), p.subVectors(f, g), m.cross(p), e[d.b].add(m), e[d.c].add(m), e[d.d].add(m))
		} else {
			b = 0;
			for (c = this.faces.length; b < c; b++) d = this.faces[b],
			d instanceof THREE.Face3 ? (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal)) : d instanceof THREE.Face4 && (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal), e[d.d].add(d.normal))
		}
		b = 0;
		for (c = this.vertices.length; b < c; b++) e[b].normalize();
		b = 0;
		for (c = this.faces.length; b < c; b++) d = this.faces[b],
		d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]), d.vertexNormals[3].copy(e[d.d]))
	},
	computeMorphNormals: function() {
		var a, b, c, d, e;
		c = 0;
		for (d = this.faces.length; c < d; c++) {
			e = this.faces[c];
			e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone();
			e.__originalVertexNormals || (e.__originalVertexNormals = []);
			a = 0;
			for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone()
		}
		var f = new THREE.Geometry;
		f.faces = this.faces;
		a = 0;
		for (b = this.morphTargets.length; a < b; a++) {
			if (!this.morphNormals[a]) {
				this.morphNormals[a] = {};
				this.morphNormals[a].faceNormals = [];
				this.morphNormals[a].vertexNormals = [];
				var g = this.morphNormals[a].faceNormals,
				h = this.morphNormals[a].vertexNormals,
				i,
				k;
				c = 0;
				for (d = this.faces.length; c < d; c++) e = this.faces[c],
				i = new THREE.Vector3,
				k = e instanceof THREE.Face3 ? {
					a: new THREE.Vector3,
					b: new THREE.Vector3,
					c: new THREE.Vector3
				}: {
					a: new THREE.Vector3,
					b: new THREE.Vector3,
					c: new THREE.Vector3,
					d: new THREE.Vector3
				},
				g.push(i),
				h.push(k)
			}
			g = this.morphNormals[a];
			f.vertices = this.morphTargets[a].vertices;
			f.computeFaceNormals();
			f.computeVertexNormals();
			c = 0;
			for (d = this.faces.length; c < d; c++) e = this.faces[c],
			i = g.faceNormals[c],
			k = g.vertexNormals[c],
			i.copy(e.normal),
			e instanceof THREE.Face3 ? (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2])) : (k.a.copy(e.vertexNormals[0]), k.b.copy(e.vertexNormals[1]), k.c.copy(e.vertexNormals[2]), k.d.copy(e.vertexNormals[3]))
		}
		c = 0;
		for (d = this.faces.length; c < d; c++) e = this.faces[c],
		e.normal = e.__originalFaceNormal,
		e.vertexNormals = e.__originalVertexNormals
	},
	computeTangents: function() {
		function a(a, b, c, d, e, f, w) {
			h = a.vertices[b];
			i = a.vertices[c];
			k = a.vertices[d];
			l = g[e];
			m = g[f];
			p = g[w];
			s = i.x - h.x;
			r = k.x - h.x;
			n = i.y - h.y;
			q = k.y - h.y;
			z = i.z - h.z;
			t = k.z - h.z;
			x = m.x - l.x;
			u = p.x - l.x;
			B = m.y - l.y;
			G = p.y - l.y;
			D = 1 / (x * G - u * B);
			E.set((G * s - B * r) * D, (G * n - B * q) * D, (G * z - B * t) * D);
			Z.set((x * r - u * s) * D, (x * q - u * n) * D, (x * t - u * z) * D);
			I[b].add(E);
			I[c].add(E);
			I[d].add(E);
			J[b].add(Z);
			J[c].add(Z);
			J[d].add(Z)
		}
		var b, c, d, e, f, g, h, i, k, l, m, p, s, r, n, q, z, t, x, u, B, G, D, w, I = [],
		J = [],
		E = new THREE.Vector3,
		Z = new THREE.Vector3,
		A = new THREE.Vector3,
		S = new THREE.Vector3,
		F = new THREE.Vector3;
		b = 0;
		for (c = this.vertices.length; b < c; b++) I[b] = new THREE.Vector3,
		J[b] = new THREE.Vector3;
		b = 0;
		for (c = this.faces.length; b < c; b++) f = this.faces[b],
		g = this.faceVertexUvs[0][b],
		f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
		var H = ["a", "b", "c", "d"];
		b = 0;
		for (c = this.faces.length; b < c; b++) {
			f = this.faces[b];
			for (d = 0; d < f.vertexNormals.length; d++) F.copy(f.vertexNormals[d]),
			e = f[H[d]],
			w = I[e],
			A.copy(w),
			A.sub(F.multiplyScalar(F.dot(w))).normalize(),
			S.crossVectors(f.vertexNormals[d], w),
			e = S.dot(J[e]),
			e = 0 > e ? -1 : 1,
			f.vertexTangents[d] = new THREE.Vector4(A.x, A.y, A.z, e)
		}
		this.hasTangents = !0
	},
	computeLineDistances: function() {
		for (var a = 0,
		b = this.vertices,
		c = 0,
		d = b.length; c < d; c++) 0 < c && (a += b[c].distanceTo(b[c - 1])),
		this.lineDistances[c] = a
	},
	computeBoundingBox: function() {
		null === this.boundingBox && (this.boundingBox = new THREE.Box3);
		this.boundingBox.setFromPoints(this.vertices)
	},
	computeBoundingSphere: function() {
		null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
		this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices)
	},
	mergeVertices: function() {
		var a = {},
		b = [],
		c = [],
		d,
		e = Math.pow(10, 4),
		f,
		g,
		h,
		i,
		k;
		this.__tmpVertices = void 0;
		f = 0;
		for (g = this.vertices.length; f < g; f++) d = this.vertices[f],
		d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join("_"),
		void 0 === a[d] ? (a[d] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[d]];
		e = [];
		f = 0;
		for (g = this.faces.length; f < g; f++) if (a = this.faces[f], a instanceof THREE.Face3) {
			a.a = c[a.a];
			a.b = c[a.b];
			a.c = c[a.c];
			h = [a.a, a.b, a.c];
			d = -1;
			for (i = 0; 3 > i; i++) if (h[i] == h[(i + 1) % 3]) {
				e.push(f);
				break
			}
		} else if (a instanceof THREE.Face4) {
			a.a = c[a.a];
			a.b = c[a.b];
			a.c = c[a.c];
			a.d = c[a.d];
			h = [a.a, a.b, a.c, a.d];
			d = -1;
			for (i = 0; 4 > i; i++) h[i] == h[(i + 1) % 4] && (0 <= d && e.push(f), d = i);
			if (0 <= d) {
				h.splice(d, 1);
				var l = new THREE.Face3(h[0], h[1], h[2], a.normal, a.color, a.materialIndex);
				h = 0;
				for (i = this.faceVertexUvs.length; h < i; h++)(k = this.faceVertexUvs[h][f]) && k.splice(d, 1);
				a.vertexNormals && 0 < a.vertexNormals.length && (l.vertexNormals = a.vertexNormals, l.vertexNormals.splice(d, 1));
				a.vertexColors && 0 < a.vertexColors.length && (l.vertexColors = a.vertexColors, l.vertexColors.splice(d, 1));
				this.faces[f] = l
			}
		}
		for (f = e.length - 1; 0 <= f; f--) {
			this.faces.splice(f, 1);
			h = 0;
			for (i = this.faceVertexUvs.length; h < i; h++) this.faceVertexUvs[h].splice(f, 1)
		}
		c = this.vertices.length - b.length;
		this.vertices = b;
		return c
	},
	clone: function() {
		for (var a = new THREE.Geometry,
		b = this.vertices,
		c = 0,
		d = b.length; c < d; c++) a.vertices.push(b[c].clone());
		b = this.faces;
		c = 0;
		for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
		b = this.faceVertexUvs[0];
		c = 0;
		for (d = b.length; c < d; c++) {
			for (var e = b[c], f = [], g = 0, h = e.length; g < h; g++) f.push(new THREE.Vector2(e[g].x, e[g].y));
			a.faceVertexUvs[0].push(f)
		}
		return a
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.GeometryIdCount = 0;
THREE.BufferGeometry = function() {
	THREE.EventDispatcher.call(this);
	this.id = THREE.GeometryIdCount++;
	this.attributes = {};
	this.dynamic = !1;
	this.offsets = [];
	this.boundingSphere = this.boundingBox = null;
	this.hasTangents = !1;
	this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
	constructor: THREE.BufferGeometry,
	applyMatrix: function(a) {
		var b, c;
		this.attributes.position && (b = this.attributes.position.array);
		this.attributes.normal && (c = this.attributes.normal.array);
		void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0);
		void 0 !== c && (b = new THREE.Matrix3, b.getInverse(a).transpose(), b.multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0)
	},
	computeBoundingBox: function() {
		null === this.boundingBox && (this.boundingBox = new THREE.Box3);
		var a = this.attributes.position.array;
		if (a) {
			var b = this.boundingBox,
			c, d, e;
			3 <= a.length && (b.min.x = b.max.x = a[0], b.min.y = b.max.y = a[1], b.min.z = b.max.z = a[2]);
			for (var f = 3,
			g = a.length; f < g; f += 3) c = a[f],
			d = a[f + 1],
			e = a[f + 2],
			c < b.min.x ? b.min.x = c: c > b.max.x && (b.max.x = c),
			d < b.min.y ? b.min.y = d: d > b.max.y && (b.max.y = d),
			e < b.min.z ? b.min.z = e: e > b.max.z && (b.max.z = e)
		}
		if (void 0 === a || 0 === a.length) this.boundingBox.min.set(0, 0, 0),
		this.boundingBox.max.set(0, 0, 0)
	},
	computeBoundingSphere: function() {
		null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
		var a = this.attributes.position.array;
		if (a) {
			for (var b, c = 0,
			d, e, f = 0,
			g = a.length; f < g; f += 3) b = a[f],
			d = a[f + 1],
			e = a[f + 2],
			b = b * b + d * d + e * e,
			b > c && (c = b);
			this.boundingSphere.radius = Math.sqrt(c)
		}
	},
	computeVertexNormals: function() {
		if (this.attributes.position) {
			var a, b, c, d;
			a = this.attributes.position.array.length;
			if (void 0 === this.attributes.normal) this.attributes.normal = {
				itemSize: 3,
				array: new Float32Array(a),
				numItems: a
			};
			else {
				a = 0;
				for (b = this.attributes.normal.array.length; a < b; a++) this.attributes.normal.array[a] = 0
			}
			var e = this.attributes.position.array,
			f = this.attributes.normal.array,
			g, h, i, k, l, m, p = new THREE.Vector3,
			s = new THREE.Vector3,
			r = new THREE.Vector3,
			n = new THREE.Vector3,
			q = new THREE.Vector3;
			if (this.attributes.index) {
				var z = this.attributes.index.array,
				t = this.offsets;
				c = 0;
				for (d = t.length; c < d; ++c) {
					b = t[c].start;
					g = t[c].count;
					var x = t[c].index;
					a = b;
					for (b += g; a < b; a += 3) g = x + z[a],
					h = x + z[a + 1],
					i = x + z[a + 2],
					k = e[3 * g],
					l = e[3 * g + 1],
					m = e[3 * g + 2],
					p.set(k, l, m),
					k = e[3 * h],
					l = e[3 * h + 1],
					m = e[3 * h + 2],
					s.set(k, l, m),
					k = e[3 * i],
					l = e[3 * i + 1],
					m = e[3 * i + 2],
					r.set(k, l, m),
					n.subVectors(r, s),
					q.subVectors(p, s),
					n.cross(q),
					f[3 * g] += n.x,
					f[3 * g + 1] += n.y,
					f[3 * g + 2] += n.z,
					f[3 * h] += n.x,
					f[3 * h + 1] += n.y,
					f[3 * h + 2] += n.z,
					f[3 * i] += n.x,
					f[3 * i + 1] += n.y,
					f[3 * i + 2] += n.z
				}
			} else {
				a = 0;
				for (b = e.length; a < b; a += 9) k = e[a],
				l = e[a + 1],
				m = e[a + 2],
				p.set(k, l, m),
				k = e[a + 3],
				l = e[a + 4],
				m = e[a + 5],
				s.set(k, l, m),
				k = e[a + 6],
				l = e[a + 7],
				m = e[a + 8],
				r.set(k, l, m),
				n.subVectors(r, s),
				q.subVectors(p, s),
				n.cross(q),
				f[a] = n.x,
				f[a + 1] = n.y,
				f[a + 2] = n.z,
				f[a + 3] = n.x,
				f[a + 4] = n.y,
				f[a + 5] = n.z,
				f[a + 6] = n.x,
				f[a + 7] = n.y,
				f[a + 8] = n.z
			}
			this.normalizeNormals();
			this.normalsNeedUpdate = !0
		}
	},
	normalizeNormals: function() {
		for (var a = this.attributes.normal.array,
		b, c, d, e = 0,
		f = a.length; e < f; e += 3) b = a[e],
		c = a[e + 1],
		d = a[e + 2],
		b = 1 / Math.sqrt(b * b + c * c + d * d),
		a[e] *= b,
		a[e + 1] *= b,
		a[e + 2] *= b
	},
	computeTangents: function() {
		function a(a) {
			ma.x = d[3 * a];
			ma.y = d[3 * a + 1];
			ma.z = d[3 * a + 2];
			eb.copy(ma);
			U = i[a];
			N.copy(U);
			N.sub(ma.multiplyScalar(ma.dot(U))).normalize();
			fa.crossVectors(eb, U);
			ja = fa.dot(k[a]);
			M = 0 > ja ? -1 : 1;
			h[4 * a] = N.x;
			h[4 * a + 1] = N.y;
			h[4 * a + 2] = N.z;
			h[4 * a + 3] = M
		}
		if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
		else {
			var b = this.attributes.index.array,
			c = this.attributes.position.array,
			d = this.attributes.normal.array,
			e = this.attributes.uv.array,
			f = c.length / 3;
			if (void 0 === this.attributes.tangent) {
				var g = 4 * f;
				this.attributes.tangent = {
					itemSize: 4,
					array: new Float32Array(g),
					numItems: g
				}
			}
			for (var h = this.attributes.tangent.array,
			i = [], k = [], g = 0; g < f; g++) i[g] = new THREE.Vector3,
			k[g] = new THREE.Vector3;
			var l, m, p, s, r, n, q, z, t, x, u, B, G, D, w, f = new THREE.Vector3,
			g = new THREE.Vector3,
			I, J, E, Z, A, S, F, H = this.offsets;
			E = 0;
			for (Z = H.length; E < Z; ++E) {
				J = H[E].start;
				A = H[E].count;
				var K = H[E].index;
				I = J;
				for (J += A; I < J; I += 3) A = K + b[I],
				S = K + b[I + 1],
				F = K + b[I + 2],
				l = c[3 * A],
				m = c[3 * A + 1],
				p = c[3 * A + 2],
				s = c[3 * S],
				r = c[3 * S + 1],
				n = c[3 * S + 2],
				q = c[3 * F],
				z = c[3 * F + 1],
				t = c[3 * F + 2],
				x = e[2 * A],
				u = e[2 * A + 1],
				B = e[2 * S],
				G = e[2 * S + 1],
				D = e[2 * F],
				w = e[2 * F + 1],
				s -= l,
				l = q - l,
				r -= m,
				m = z - m,
				n -= p,
				p = t - p,
				B -= x,
				x = D - x,
				G -= u,
				u = w - u,
				w = 1 / (B * u - x * G),
				f.set((u * s - G * l) * w, (u * r - G * m) * w, (u * n - G * p) * w),
				g.set((B * l - x * s) * w, (B * m - x * r) * w, (B * p - x * n) * w),
				i[A].add(f),
				i[S].add(f),
				i[F].add(f),
				k[A].add(g),
				k[S].add(g),
				k[F].add(g)
			}
			var N = new THREE.Vector3,
			fa = new THREE.Vector3,
			ma = new THREE.Vector3,
			eb = new THREE.Vector3,
			M, U, ja;
			E = 0;
			for (Z = H.length; E < Z; ++E) {
				J = H[E].start;
				A = H[E].count;
				K = H[E].index;
				I = J;
				for (J += A; I < J; I += 3) A = K + b[I],
				S = K + b[I + 1],
				F = K + b[I + 2],
				a(A),
				a(S),
				a(F)
			}
			this.tangentsNeedUpdate = this.hasTangents = !0
		}
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.Camera = function() {
	THREE.Object3D.call(this);
	this.matrixWorldInverse = new THREE.Matrix4;
	this.projectionMatrix = new THREE.Matrix4;
	this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function() {
	var a = new THREE.Matrix4;
	return function(b) {
		a.lookAt(this.position, b, this.up); ! 0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
	}
} ();
THREE.OrthographicCamera = function(a, b, c, d, e, f) {
	THREE.Camera.call(this);
	this.left = a;
	this.right = b;
	this.top = c;
	this.bottom = d;
	this.near = void 0 !== e ? e: 0.1;
	this.far = void 0 !== f ? f: 2E3;
	this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
	this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function(a, b, c, d) {
	THREE.Camera.call(this);
	this.fov = void 0 !== a ? a: 50;
	this.aspect = void 0 !== b ? b: 1;
	this.near = void 0 !== c ? c: 0.1;
	this.far = void 0 !== d ? d: 2E3;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
	void 0 === b && (b = 24);
	this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
	this.fullWidth = a;
	this.fullHeight = b;
	this.x = c;
	this.y = d;
	this.width = e;
	this.height = f;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
	if (this.fullWidth) {
		var a = this.fullWidth / this.fullHeight,
		b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
		c = -b,
		d = a * c,
		a = Math.abs(a * b - d),
		c = Math.abs(b - c);
		this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
	} else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Light = function(a) {
	THREE.Object3D.call(this);
	this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.Light.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Light);
	THREE.Object3D.prototype.clone.call(this, a);
	a.color.copy(this.color);
	return a
};
THREE.AmbientLight = function(a) {
	THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.clone = function() {
	var a = new THREE.AmbientLight;
	THREE.Light.prototype.clone.call(this, a);
	return a
};
THREE.AreaLight = function(a, b) {
	THREE.Light.call(this, a);
	this.normal = new THREE.Vector3(0, -1, 0);
	this.right = new THREE.Vector3(1, 0, 0);
	this.intensity = void 0 !== b ? b: 1;
	this.height = this.width = 1;
	this.constantAttenuation = 1.5;
	this.linearAttenuation = 0.5;
	this.quadraticAttenuation = 0.1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function(a, b) {
	THREE.Light.call(this, a);
	this.position.set(0, 1, 0);
	this.target = new THREE.Object3D;
	this.intensity = void 0 !== b ? b: 1;
	this.onlyShadow = this.castShadow = !1;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5E3;
	this.shadowCameraLeft = -500;
	this.shadowCameraTop = this.shadowCameraRight = 500;
	this.shadowCameraBottom = -500;
	this.shadowCameraVisible = !1;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapHeight = this.shadowMapWidth = 512;
	this.shadowCascade = !1;
	this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1E3);
	this.shadowCascadeCount = 2;
	this.shadowCascadeBias = [0, 0, 0];
	this.shadowCascadeWidth = [512, 512, 512];
	this.shadowCascadeHeight = [512, 512, 512];
	this.shadowCascadeNearZ = [ - 1, 0.99, 0.998];
	this.shadowCascadeFarZ = [0.99, 0.998, 1];
	this.shadowCascadeArray = [];
	this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.clone = function() {
	var a = new THREE.DirectionalLight;
	THREE.Light.prototype.clone.call(this, a);
	a.target = this.target.clone();
	a.intensity = this.intensity;
	a.castShadow = this.castShadow;
	a.onlyShadow = this.onlyShadow;
	return a
};
THREE.HemisphereLight = function(a, b, c) {
	THREE.Light.call(this, a);
	this.position.set(0, 100, 0);
	this.groundColor = new THREE.Color(b);
	this.intensity = void 0 !== c ? c: 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight.prototype.clone = function() {
	var a = new THREE.PointLight;
	THREE.Light.prototype.clone.call(this, a);
	a.groundColor.copy(this.groundColor);
	a.intensity = this.intensity;
	return a
};
THREE.PointLight = function(a, b, c) {
	THREE.Light.call(this, a);
	this.intensity = void 0 !== b ? b: 1;
	this.distance = void 0 !== c ? c: 0
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight.prototype.clone = function() {
	var a = new THREE.PointLight;
	THREE.Light.prototype.clone.call(this, a);
	a.intensity = this.intensity;
	a.distance = this.distance;
	return a
};
THREE.SpotLight = function(a, b, c, d, e) {
	THREE.Light.call(this, a);
	this.position.set(0, 1, 0);
	this.target = new THREE.Object3D;
	this.intensity = void 0 !== b ? b: 1;
	this.distance = void 0 !== c ? c: 0;
	this.angle = void 0 !== d ? d: Math.PI / 2;
	this.exponent = void 0 !== e ? e: 10;
	this.onlyShadow = this.castShadow = !1;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5E3;
	this.shadowCameraFov = 50;
	this.shadowCameraVisible = !1;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapHeight = this.shadowMapWidth = 512;
	this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.clone = function() {
	var a = new THREE.SpotLight;
	THREE.Light.prototype.clone.call(this, a);
	a.target = this.target.clone();
	a.intensity = this.intensity;
	a.distance = this.distance;
	a.angle = this.angle;
	a.exponent = this.exponent;
	a.castShadow = this.castShadow;
	a.onlyShadow = this.onlyShadow;
	return a
};
THREE.Loader = function(a) {
	this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
	this.onLoadStart = function() {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function() {}
};
THREE.Loader.prototype = {
	constructor: THREE.Loader,
	crossOrigin: "anonymous",
	addStatusElement: function() {
		var a = document.createElement("div");
		a.style.position = "absolute";
		a.style.right = "0px";
		a.style.top = "0px";
		a.style.fontSize = "0.8em";
		a.style.textAlign = "left";
		a.style.background = "rgba(0,0,0,0.25)";
		a.style.color = "#fff";
		a.style.width = "120px";
		a.style.padding = "0.5em 0.5em 0.5em 0.5em";
		a.style.zIndex = 1E3;
		a.innerHTML = "Loading ...";
		return a
	},
	updateProgress: function(a) {
		var b = "Loaded ",
		b = a.total ? b + ((100 * a.loaded / a.total).toFixed(0) + "%") : b + ((a.loaded / 1E3).toFixed(2) + " KB");
		this.statusDomElement.innerHTML = b
	},
	extractUrlBase: function(a) {
		a = a.split("/");
		a.pop();
		return (1 > a.length ? ".": a.join("/")) + "/"
	},
	initMaterials: function(a, b) {
		for (var c = [], d = 0; d < a.length; ++d) c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
		return c
	},
	needsTangents: function(a) {
		for (var b = 0,
		c = a.length; b < c; b++) if (a[b] instanceof THREE.ShaderMaterial) return ! 0;
		return ! 1
	},
	createMaterial: function(a, b) {
		function c(a) {
			a = Math.log(a) / Math.LN2;
			return Math.floor(a) == a
		}
		function d(a) {
			a = Math.log(a) / Math.LN2;
			return Math.pow(2, Math.round(a))
		}
		function e(a, e, f, h, i, k, q) {
			var z = /\.dds$/i.test(f),
			t = b + "/" + f;
			if (z) {
				var x = THREE.ImageUtils.loadCompressedTexture(t);
				a[e] = x
			} else x = document.createElement("canvas"),
			a[e] = new THREE.Texture(x);
			a[e].sourceFile = f;
			h && (a[e].repeat.set(h[0], h[1]), 1 !== h[0] && (a[e].wrapS = THREE.RepeatWrapping), 1 !== h[1] && (a[e].wrapT = THREE.RepeatWrapping));
			i && a[e].offset.set(i[0], i[1]);
			k && (f = {
				repeat: THREE.RepeatWrapping,
				mirror: THREE.MirroredRepeatWrapping
			},
			void 0 !== f[k[0]] && (a[e].wrapS = f[k[0]]), void 0 !== f[k[1]] && (a[e].wrapT = f[k[1]]));
			q && (a[e].anisotropy = q);
			if (!z) {
				var u = a[e],
				a = new Image;
				a.onload = function() {
					if (!c(this.width) || !c(this.height)) {
						var a = d(this.width),
						b = d(this.height);
						u.image.width = a;
						u.image.height = b;
						u.image.getContext("2d").drawImage(this, 0, 0, a, b)
					} else u.image = this;
					u.needsUpdate = !0
				};
				a.crossOrigin = g.crossOrigin;
				a.src = t
			}
		}
		function f(a) {
			return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
		}
		var g = this,
		h = "MeshLambertMaterial",
		i = {
			color: 15658734,
			opacity: 1,
			map: null,
			lightMap: null,
			normalMap: null,
			bumpMap: null,
			wireframe: !1
		};
		if (a.shading) {
			var k = a.shading.toLowerCase();
			"phong" === k ? h = "MeshPhongMaterial": "basic" === k && (h = "MeshBasicMaterial")
		}
		void 0 !== a.blending && void 0 !== THREE[a.blending] && (i.blending = THREE[a.blending]);
		if (void 0 !== a.transparent || 1 > a.opacity) i.transparent = a.transparent;
		void 0 !== a.depthTest && (i.depthTest = a.depthTest);
		void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite);
		void 0 !== a.visible && (i.visible = a.visible);
		void 0 !== a.flipSided && (i.side = THREE.BackSide);
		void 0 !== a.doubleSided && (i.side = THREE.DoubleSide);
		void 0 !== a.wireframe && (i.wireframe = a.wireframe);
		void 0 !== a.vertexColors && ("face" === a.vertexColors ? i.vertexColors = THREE.FaceColors: a.vertexColors && (i.vertexColors = THREE.VertexColors));
		a.colorDiffuse ? i.color = f(a.colorDiffuse) : a.DbgColor && (i.color = a.DbgColor);
		a.colorSpecular && (i.specular = f(a.colorSpecular));
		a.colorAmbient && (i.ambient = f(a.colorAmbient));
		a.transparency && (i.opacity = a.transparency);
		a.specularCoef && (i.shininess = a.specularCoef);
		a.mapDiffuse && b && e(i, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy);
		a.mapLight && b && e(i, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy);
		a.mapBump && b && e(i, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy);
		a.mapNormal && b && e(i, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy);
		a.mapSpecular && b && e(i, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy);
		a.mapBumpScale && (i.bumpScale = a.mapBumpScale);
		a.mapNormal ? (h = THREE.ShaderLib.normalmap, k = THREE.UniformsUtils.clone(h.uniforms), k.tNormal.value = i.normalMap, a.mapNormalFactor && k.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), i.map && (k.tDiffuse.value = i.map, k.enableDiffuse.value = !0), i.specularMap && (k.tSpecular.value = i.specularMap, k.enableSpecular.value = !0), i.lightMap && (k.tAO.value = i.lightMap, k.enableAO.value = !0), k.uDiffuseColor.value.setHex(i.color), k.uSpecularColor.value.setHex(i.specular), k.uAmbientColor.value.setHex(i.ambient), k.uShininess.value = i.shininess, void 0 !== i.opacity && (k.uOpacity.value = i.opacity), h = new THREE.ShaderMaterial({
			fragmentShader: h.fragmentShader,
			vertexShader: h.vertexShader,
			uniforms: k,
			lights: !0,
			fog: !0
		}), i.transparent && (h.transparent = !0)) : h = new THREE[h](i);
		void 0 !== a.DbgName && (h.name = a.DbgName);
		return h
	}
};
THREE.ImageLoader = function() {
	THREE.EventDispatcher.call(this);
	this.crossOrigin = null
};
THREE.ImageLoader.prototype = {
	constructor: THREE.ImageLoader,
	load: function(a, b) {
		var c = this;
		void 0 === b && (b = new Image);
		b.addEventListener("load",
		function() {
			c.dispatchEvent({
				type: "load",
				content: b
			})
		},
		!1);
		b.addEventListener("error",
		function() {
			c.dispatchEvent({
				type: "error",
				message: "Couldn't load URL [" + a + "]"
			})
		},
		!1);
		c.crossOrigin && (b.crossOrigin = c.crossOrigin);
		b.src = a
	}
};
THREE.JSONLoader = function(a) {
	THREE.Loader.call(this, a);
	this.withCredentials = !1
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function(a, b, c) {
	c = c && "string" === typeof c ? c: this.extractUrlBase(a);
	this.onLoadStart();
	this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function(a, b, c, d, e) {
	var f = new XMLHttpRequest,
	g = 0;
	f.onreadystatechange = function() {
		if (f.readyState === f.DONE) if (200 === f.status || 0 === f.status) {
			if (f.responseText) {
				var h = JSON.parse(f.responseText),
				h = a.parse(h, d);
				c(h.geometry, h.materials)
			} else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
			a.onLoadComplete()
		} else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
		else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")), e({
			total: g,
			loaded: f.responseText.length
		})) : f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader("Content-Length"))
	};
	f.open("GET", b, !0);
	f.withCredentials = this.withCredentials;
	f.send(null)
};
THREE.JSONLoader.prototype.parse = function(a, b) {
	var c = new THREE.Geometry,
	d = void 0 !== a.scale ? 1 / a.scale: 1,
	e,
	f,
	g,
	h,
	i,
	k,
	l,
	m,
	p,
	s,
	r,
	n,
	q,
	z,
	t,
	x = a.faces;
	s = a.vertices;
	var u = a.normals,
	B = a.colors,
	G = 0;
	for (e = 0; e < a.uvs.length; e++) a.uvs[e].length && G++;
	for (e = 0; e < G; e++) c.faceUvs[e] = [],
	c.faceVertexUvs[e] = [];
	h = 0;
	for (i = s.length; h < i;) k = new THREE.Vector3,
	k.x = s[h++] * d,
	k.y = s[h++] * d,
	k.z = s[h++] * d,
	c.vertices.push(k);
	h = 0;
	for (i = x.length; h < i;) {
		s = x[h++];
		k = s & 1;
		g = s & 2;
		e = s & 4;
		f = s & 8;
		m = s & 16;
		l = s & 32;
		r = s & 64;
		s &= 128;
		k ? (n = new THREE.Face4, n.a = x[h++], n.b = x[h++], n.c = x[h++], n.d = x[h++], k = 4) : (n = new THREE.Face3, n.a = x[h++], n.b = x[h++], n.c = x[h++], k = 3);
		g && (g = x[h++], n.materialIndex = g);
		g = c.faces.length;
		if (e) for (e = 0; e < G; e++) q = a.uvs[e],
		p = x[h++],
		t = q[2 * p],
		p = q[2 * p + 1],
		c.faceUvs[e][g] = new THREE.Vector2(t, p);
		if (f) for (e = 0; e < G; e++) {
			q = a.uvs[e];
			z = [];
			for (f = 0; f < k; f++) p = x[h++],
			t = q[2 * p],
			p = q[2 * p + 1],
			z[f] = new THREE.Vector2(t, p);
			c.faceVertexUvs[e][g] = z
		}
		m && (m = 3 * x[h++], f = new THREE.Vector3, f.x = u[m++], f.y = u[m++], f.z = u[m], n.normal = f);
		if (l) for (e = 0; e < k; e++) m = 3 * x[h++],
		f = new THREE.Vector3,
		f.x = u[m++],
		f.y = u[m++],
		f.z = u[m],
		n.vertexNormals.push(f);
		r && (l = x[h++], l = new THREE.Color(B[l]), n.color = l);
		if (s) for (e = 0; e < k; e++) l = x[h++],
		l = new THREE.Color(B[l]),
		n.vertexColors.push(l);
		c.faces.push(n)
	}
	if (a.skinWeights) {
		h = 0;
		for (i = a.skinWeights.length; h < i; h += 2) x = a.skinWeights[h],
		u = a.skinWeights[h + 1],
		c.skinWeights.push(new THREE.Vector4(x, u, 0, 0))
	}
	if (a.skinIndices) {
		h = 0;
		for (i = a.skinIndices.length; h < i; h += 2) x = a.skinIndices[h],
		u = a.skinIndices[h + 1],
		c.skinIndices.push(new THREE.Vector4(x, u, 0, 0))
	}
	c.bones = a.bones;
	c.animation = a.animation;
	if (void 0 !== a.morphTargets) {
		h = 0;
		for (i = a.morphTargets.length; h < i; h++) {
			c.morphTargets[h] = {};
			c.morphTargets[h].name = a.morphTargets[h].name;
			c.morphTargets[h].vertices = [];
			B = c.morphTargets[h].vertices;
			G = a.morphTargets[h].vertices;
			x = 0;
			for (u = G.length; x < u; x += 3) s = new THREE.Vector3,
			s.x = G[x] * d,
			s.y = G[x + 1] * d,
			s.z = G[x + 2] * d,
			B.push(s)
		}
	}
	if (void 0 !== a.morphColors) {
		h = 0;
		for (i = a.morphColors.length; h < i; h++) {
			c.morphColors[h] = {};
			c.morphColors[h].name = a.morphColors[h].name;
			c.morphColors[h].colors = [];
			u = c.morphColors[h].colors;
			B = a.morphColors[h].colors;
			d = 0;
			for (x = B.length; d < x; d += 3) G = new THREE.Color(16755200),
			G.setRGB(B[d], B[d + 1], B[d + 2]),
			u.push(G)
		}
	}
	c.computeCentroids();
	c.computeFaceNormals();
	d = this.initMaterials(a.materials, b);
	this.needsTangents(d) && c.computeTangents();
	return {
		geometry: c,
		materials: d
	}
};
THREE.LoadingMonitor = function() {
	THREE.EventDispatcher.call(this);
	var a = this,
	b = 0,
	c = 0,
	d = function() {
		b++;
		a.dispatchEvent({
			type: "progress",
			loaded: b,
			total: c
		});
		b === c && a.dispatchEvent({
			type: "load"
		})
	};
	this.add = function(a) {
		c++;
		a.addEventListener("load", d, !1)
	}
};
THREE.SceneLoader = function() {
	this.onLoadStart = function() {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function() {};
	this.callbackSync = function() {};
	this.callbackProgress = function() {};
	this.geometryHandlerMap = {};
	this.hierarchyHandlerMap = {};
	this.addGeometryHandler("ascii", THREE.JSONLoader)
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function(a, b) {
	var c = this,
	d = new XMLHttpRequest;
	d.onreadystatechange = function() {
		if (4 === d.readyState) if (200 === d.status || 0 === d.status) {
			var e = JSON.parse(d.responseText);
			c.parse(e, b, a)
		} else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
	};
	d.open("GET", a, !0);
	d.send(null)
};
THREE.SceneLoader.prototype.addGeometryHandler = function(a, b) {
	this.geometryHandlerMap[a] = {
		loaderClass: b
	}
};
THREE.SceneLoader.prototype.addHierarchyHandler = function(a, b) {
	this.hierarchyHandlerMap[a] = {
		loaderClass: b
	}
};
THREE.SceneLoader.prototype.parse = function(a, b, c) {
	function d(a, b) {
		return "relativeToHTML" == b ? a: m + "/" + a
	}
	function e() {
		f(w.scene, J.objects)
	}
	function f(a, b) {
		var c, e, g, i, k, m, n;
		for (n in b) if (void 0 === w.objects[n]) {
			var q = b[n],
			u = null;
			if (q.type && q.type in l.hierarchyHandlerMap) {
				if (void 0 === q.loading) {
					e = {
						type: 1,
						url: 1,
						material: 1,
						position: 1,
						rotation: 1,
						scale: 1,
						visible: 1,
						children: 1,
						userData: 1,
						skin: 1,
						morph: 1,
						mirroredLoop: 1,
						duration: 1
					};
					g = {};
					for (var A in q) A in e || (g[A] = q[A]);
					s = w.materials[q.material];
					q.loading = !0;
					e = l.hierarchyHandlerMap[q.type].loaderObject;
					e.options ? e.load(d(q.url, J.urlBaseType), h(n, a, s, q)) : e.load(d(q.url, J.urlBaseType), h(n, a, s, q), g)
				}
			} else if (void 0 !== q.geometry) {
				if (p = w.geometries[q.geometry]) {
					u = !1;
					s = w.materials[q.material];
					u = s instanceof THREE.ShaderMaterial;
					g = q.position;
					i = q.rotation;
					k = q.scale;
					c = q.matrix;
					m = q.quaternion;
					q.material || (s = new THREE.MeshFaceMaterial(w.face_materials[q.geometry]));
					s instanceof THREE.MeshFaceMaterial && 0 === s.materials.length && (s = new THREE.MeshFaceMaterial(w.face_materials[q.geometry]));
					if (s instanceof THREE.MeshFaceMaterial) for (e = 0; e < s.materials.length; e++) u = u || s.materials[e] instanceof THREE.ShaderMaterial;
					u && p.computeTangents();
					q.skin ? u = new THREE.SkinnedMesh(p, s) : q.morph ? (u = new THREE.MorphAnimMesh(p, s), void 0 !== q.duration && (u.duration = q.duration), void 0 !== q.time && (u.time = q.time), void 0 !== q.mirroredLoop && (u.mirroredLoop = q.mirroredLoop), s.morphNormals && p.computeMorphNormals()) : u = new THREE.Mesh(p, s);
					u.name = n;
					c ? (u.matrixAutoUpdate = !1, u.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (u.position.set(g[0], g[1], g[2]), m ? (u.quaternion.set(m[0], m[1], m[2], m[3]), u.useQuaternion = !0) : u.rotation.set(i[0], i[1], i[2]), u.scale.set(k[0], k[1], k[2]));
					u.visible = q.visible;
					u.castShadow = q.castShadow;
					u.receiveShadow = q.receiveShadow;
					a.add(u);
					w.objects[n] = u
				}
			} else "DirectionalLight" === q.type || "PointLight" === q.type || "AmbientLight" === q.type ? (t = void 0 !== q.color ? q.color: 16777215, x = void 0 !== q.intensity ? q.intensity: 1, "DirectionalLight" === q.type ? (g = q.direction, z = new THREE.DirectionalLight(t, x), z.position.set(g[0], g[1], g[2]), q.target && (I.push({
				object: z,
				targetName: q.target
			}), z.target = null)) : "PointLight" === q.type ? (g = q.position, e = q.distance, z = new THREE.PointLight(t, x, e), z.position.set(g[0], g[1], g[2])) : "AmbientLight" === q.type && (z = new THREE.AmbientLight(t)), a.add(z), z.name = n, w.lights[n] = z, w.objects[n] = z) : "PerspectiveCamera" === q.type || "OrthographicCamera" === q.type ? ("PerspectiveCamera" === q.type ? r = new THREE.PerspectiveCamera(q.fov, q.aspect, q.near, q.far) : "OrthographicCamera" === q.type && (r = new THREE.OrthographicCamera(q.left, q.right, q.top, q.bottom, q.near, q.far)), g = q.position, r.position.set(g[0], g[1], g[2]), a.add(r), r.name = n, w.cameras[n] = r, w.objects[n] = r) : (g = q.position, i = q.rotation, k = q.scale, m = q.quaternion, u = new THREE.Object3D, u.name = n, u.position.set(g[0], g[1], g[2]), m ? (u.quaternion.set(m[0], m[1], m[2], m[3]), u.useQuaternion = !0) : u.rotation.set(i[0], i[1], i[2]), u.scale.set(k[0], k[1], k[2]), u.visible = void 0 !== q.visible ? q.visible: !1, a.add(u), w.objects[n] = u, w.empties[n] = u);
			if (u) {
				if (void 0 !== q.userData) for (var B in q.userData) u.userData[B] = q.userData[B];
				if (void 0 !== q.groups) for (e = 0; e < q.groups.length; e++) g = q.groups[e],
				void 0 === w.groups[g] && (w.groups[g] = []),
				w.groups[g].push(n);
				void 0 !== q.children && f(u, q.children)
			}
		}
	}
	function g(a) {
		return function(b, c) {
			w.geometries[a] = b;
			w.face_materials[a] = c;
			e();
			u -= 1;
			l.onLoadComplete();
			k()
		}
	}
	function h(a, b, c, d) {
		return function(f) {
			var f = f.content ? f.content: f.dae ? f.scene: f,
			g = d.position,
			h = d.rotation,
			i = d.quaternion,
			m = d.scale;
			f.position.set(g[0], g[1], g[2]);
			i ? (f.quaternion.set(i[0], i[1], i[2], i[3]), f.useQuaternion = !0) : f.rotation.set(h[0], h[1], h[2]);
			f.scale.set(m[0], m[1], m[2]);
			c && f.traverse(function(a) {
				a.material = c
			});
			var p = void 0 !== d.visible ? d.visible: !0;
			f.traverse(function(a) {
				a.visible = p
			});
			b.add(f);
			f.name = a;
			w.objects[a] = f;
			e();
			u -= 1;
			l.onLoadComplete();
			k()
		}
	}
	function i(a) {
		return function(b, c) {
			w.geometries[a] = b;
			w.face_materials[a] = c
		}
	}
	function k() {
		l.callbackProgress({
			totalModels: G,
			totalTextures: D,
			loadedModels: G - u,
			loadedTextures: D - B
		},
		w);
		l.onLoadProgress();
		if (0 === u && 0 === B) {
			for (var a = 0; a < I.length; a++) {
				var c = I[a],
				d = w.objects[c.targetName];
				d ? c.object.target = d: (c.object.target = new THREE.Object3D, w.scene.add(c.object.target));
				c.object.target.userData.targetInverse = c.object
			}
			b(w)
		}
	}
	var l = this,
	m = THREE.Loader.prototype.extractUrlBase(c),
	p,
	s,
	r,
	n,
	q,
	z,
	t,
	x,
	u,
	B,
	G,
	D,
	w,
	I = [],
	J = a,
	E;
	for (E in this.geometryHandlerMap) a = this.geometryHandlerMap[E].loaderClass,
	this.geometryHandlerMap[E].loaderObject = new a;
	for (E in this.hierarchyHandlerMap) a = this.hierarchyHandlerMap[E].loaderClass,
	this.hierarchyHandlerMap[E].loaderObject = new a;
	B = u = 0;
	w = {
		scene: new THREE.Scene,
		geometries: {},
		face_materials: {},
		materials: {},
		textures: {},
		objects: {},
		cameras: {},
		lights: {},
		fogs: {},
		empties: {},
		groups: {}
	};
	if (J.transform && (E = J.transform.position, a = J.transform.rotation, c = J.transform.scale, E && w.scene.position.set(E[0], E[1], E[2]), a && w.scene.rotation.set(a[0], a[1], a[2]), c && w.scene.scale.set(c[0], c[1], c[2]), E || a || c)) w.scene.updateMatrix(),
	w.scene.updateMatrixWorld();
	E = function(a) {
		return function() {
			B -= a;
			k();
			l.onLoadComplete()
		}
	};
	for (var Z in J.fogs) a = J.fogs[Z],
	"linear" === a.type ? n = new THREE.Fog(0, a.near, a.far) : "exp2" === a.type && (n = new THREE.FogExp2(0, a.density)),
	a = a.color,
	n.color.setRGB(a[0], a[1], a[2]),
	w.fogs[Z] = n;
	for (var A in J.geometries) n = J.geometries[A],
	n.type in this.geometryHandlerMap && (u += 1, l.onLoadStart());
	for (var S in J.objects) n = J.objects[S],
	n.type && n.type in this.hierarchyHandlerMap && (u += 1, l.onLoadStart());
	G = u;
	for (A in J.geometries) if (n = J.geometries[A], "cube" === n.type) p = new THREE.CubeGeometry(n.width, n.height, n.depth, n.widthSegments, n.heightSegments, n.depthSegments),
	w.geometries[A] = p;
	else if ("plane" === n.type) p = new THREE.PlaneGeometry(n.width, n.height, n.widthSegments, n.heightSegments),
	w.geometries[A] = p;
	else if ("sphere" === n.type) p = new THREE.SphereGeometry(n.radius, n.widthSegments, n.heightSegments),
	w.geometries[A] = p;
	else if ("cylinder" === n.type) p = new THREE.CylinderGeometry(n.topRad, n.botRad, n.height, n.radSegs, n.heightSegs),
	w.geometries[A] = p;
	else if ("torus" === n.type) p = new THREE.TorusGeometry(n.radius, n.tube, n.segmentsR, n.segmentsT),
	w.geometries[A] = p;
	else if ("icosahedron" === n.type) p = new THREE.IcosahedronGeometry(n.radius, n.subdivisions),
	w.geometries[A] = p;
	else if (n.type in this.geometryHandlerMap) {
		S = {};
		for (q in n)"type" !== q && "url" !== q && (S[q] = n[q]);
		this.geometryHandlerMap[n.type].loaderObject.load(d(n.url, J.urlBaseType), g(A), S)
	} else "embedded" === n.type && (S = J.embeds[n.id], S.metadata = J.metadata, S && (S = this.geometryHandlerMap.ascii.loaderObject.parse(S, ""), i(A)(S.geometry, S.materials)));
	for (var F in J.textures) if (A = J.textures[F], A.url instanceof Array) {
		B += A.url.length;
		for (q = 0; q < A.url.length; q++) l.onLoadStart()
	} else B += 1,
	l.onLoadStart();
	D = B;
	for (F in J.textures) {
		A = J.textures[F];
		void 0 !== A.mapping && void 0 !== THREE[A.mapping] && (A.mapping = new THREE[A.mapping]);
		if (A.url instanceof Array) {
			S = A.url.length;
			n = [];
			for (q = 0; q < S; q++) n[q] = d(A.url[q], J.urlBaseType);
			q = (q = /\.dds$/i.test(n[0])) ? THREE.ImageUtils.loadCompressedTextureCube(n, A.mapping, E(S)) : THREE.ImageUtils.loadTextureCube(n, A.mapping, E(S))
		} else q = /\.dds$/i.test(A.url),
		S = d(A.url, J.urlBaseType),
		n = E(1),
		q = q ? THREE.ImageUtils.loadCompressedTexture(S, A.mapping, n) : THREE.ImageUtils.loadTexture(S, A.mapping, n),
		void 0 !== THREE[A.minFilter] && (q.minFilter = THREE[A.minFilter]),
		void 0 !== THREE[A.magFilter] && (q.magFilter = THREE[A.magFilter]),
		A.anisotropy && (q.anisotropy = A.anisotropy),
		A.repeat && (q.repeat.set(A.repeat[0], A.repeat[1]), 1 !== A.repeat[0] && (q.wrapS = THREE.RepeatWrapping), 1 !== A.repeat[1] && (q.wrapT = THREE.RepeatWrapping)),
		A.offset && q.offset.set(A.offset[0], A.offset[1]),
		A.wrap && (S = {
			repeat: THREE.RepeatWrapping,
			mirror: THREE.MirroredRepeatWrapping
		},
		void 0 !== S[A.wrap[0]] && (q.wrapS = S[A.wrap[0]]), void 0 !== S[A.wrap[1]] && (q.wrapT = S[A.wrap[1]]));
		w.textures[F] = q
	}
	var H, K;
	for (H in J.materials) {
		F = J.materials[H];
		for (K in F.parameters)"envMap" === K || "map" === K || "lightMap" === K || "bumpMap" === K ? F.parameters[K] = w.textures[F.parameters[K]] : "shading" === K ? F.parameters[K] = "flat" === F.parameters[K] ? THREE.FlatShading: THREE.SmoothShading: "side" === K ? F.parameters[K] = "double" == F.parameters[K] ? THREE.DoubleSide: "back" == F.parameters[K] ? THREE.BackSide: THREE.FrontSide: "blending" === K ? F.parameters[K] = F.parameters[K] in THREE ? THREE[F.parameters[K]] : THREE.NormalBlending: "combine" === K ? F.parameters[K] = F.parameters[K] in THREE ? THREE[F.parameters[K]] : THREE.MultiplyOperation: "vertexColors" === K ? "face" == F.parameters[K] ? F.parameters[K] = THREE.FaceColors: F.parameters[K] && (F.parameters[K] = THREE.VertexColors) : "wrapRGB" === K && (E = F.parameters[K], F.parameters[K] = new THREE.Vector3(E[0], E[1], E[2]));
		void 0 !== F.parameters.opacity && 1 > F.parameters.opacity && (F.parameters.transparent = !0);
		F.parameters.normalMap ? (E = THREE.ShaderLib.normalmap, A = THREE.UniformsUtils.clone(E.uniforms), q = F.parameters.color, S = F.parameters.specular, n = F.parameters.ambient, Z = F.parameters.shininess, A.tNormal.value = w.textures[F.parameters.normalMap], F.parameters.normalScale && A.uNormalScale.value.set(F.parameters.normalScale[0], F.parameters.normalScale[1]), F.parameters.map && (A.tDiffuse.value = F.parameters.map, A.enableDiffuse.value = !0), F.parameters.envMap && (A.tCube.value = F.parameters.envMap, A.enableReflection.value = !0, A.uReflectivity.value = F.parameters.reflectivity), F.parameters.lightMap && (A.tAO.value = F.parameters.lightMap, A.enableAO.value = !0), F.parameters.specularMap && (A.tSpecular.value = w.textures[F.parameters.specularMap], A.enableSpecular.value = !0), F.parameters.displacementMap && (A.tDisplacement.value = w.textures[F.parameters.displacementMap], A.enableDisplacement.value = !0, A.uDisplacementBias.value = F.parameters.displacementBias, A.uDisplacementScale.value = F.parameters.displacementScale), A.uDiffuseColor.value.setHex(q), A.uSpecularColor.value.setHex(S), A.uAmbientColor.value.setHex(n), A.uShininess.value = Z, F.parameters.opacity && (A.uOpacity.value = F.parameters.opacity), s = new THREE.ShaderMaterial({
			fragmentShader: E.fragmentShader,
			vertexShader: E.vertexShader,
			uniforms: A,
			lights: !0,
			fog: !0
		})) : s = new THREE[F.type](F.parameters);
		w.materials[H] = s
	}
	for (H in J.materials) if (F = J.materials[H], F.parameters.materials) {
		K = [];
		for (q = 0; q < F.parameters.materials.length; q++) K.push(w.materials[F.parameters.materials[q]]);
		w.materials[H].materials = K
	}
	e();
	w.cameras && J.defaults.camera && (w.currentCamera = w.cameras[J.defaults.camera]);
	w.fogs && J.defaults.fog && (w.scene.fog = w.fogs[J.defaults.fog]);
	l.callbackSync(w);
	k()
};
THREE.TextureLoader = function() {
	THREE.EventDispatcher.call(this);
	this.crossOrigin = null
};
THREE.TextureLoader.prototype = {
	constructor: THREE.TextureLoader,
	load: function(a) {
		var b = this,
		c = new Image;
		c.addEventListener("load",
		function() {
			var a = new THREE.Texture(c);
			a.needsUpdate = !0;
			b.dispatchEvent({
				type: "load",
				content: a
			})
		},
		!1);
		c.addEventListener("error",
		function() {
			b.dispatchEvent({
				type: "error",
				message: "Couldn't load URL [" + a + "]"
			})
		},
		!1);
		b.crossOrigin && (c.crossOrigin = b.crossOrigin);
		c.src = a
	}
};
THREE.Material = function() {
	THREE.EventDispatcher.call(this);
	this.id = THREE.MaterialIdCount++;
	this.name = "";
	this.side = THREE.FrontSide;
	this.opacity = 1;
	this.transparent = !1;
	this.blending = THREE.NormalBlending;
	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;
	this.depthWrite = this.depthTest = !0;
	this.polygonOffset = !1;
	this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
	this.overdraw = !1;
	this.needsUpdate = this.visible = !0
};
THREE.Material.prototype.setValues = function(a) {
	if (void 0 !== a) for (var b in a) {
		var c = a[b];
		if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
		else if (b in this) {
			var d = this[b];
			d instanceof THREE.Color && c instanceof THREE.Color ? d.copy(c) : d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = c
		}
	}
};
THREE.Material.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Material);
	a.name = this.name;
	a.side = this.side;
	a.opacity = this.opacity;
	a.transparent = this.transparent;
	a.blending = this.blending;
	a.blendSrc = this.blendSrc;
	a.blendDst = this.blendDst;
	a.blendEquation = this.blendEquation;
	a.depthTest = this.depthTest;
	a.depthWrite = this.depthWrite;
	a.polygonOffset = this.polygonOffset;
	a.polygonOffsetFactor = this.polygonOffsetFactor;
	a.polygonOffsetUnits = this.polygonOffsetUnits;
	a.alphaTest = this.alphaTest;
	a.overdraw = this.overdraw;
	a.visible = this.visible;
	return a
};
THREE.Material.prototype.dispose = function() {
	this.dispatchEvent({
		type: "dispose"
	})
};
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.linewidth = 1;
	this.linejoin = this.linecap = "round";
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function() {
	var a = new THREE.LineBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.linecap = this.linecap;
	a.linejoin = this.linejoin;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.LineDashedMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.scale = this.linewidth = 1;
	this.dashSize = 3;
	this.gapSize = 1;
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function() {
	var a = new THREE.LineDashedMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.scale = this.scale;
	a.dashSize = this.dashSize;
	a.gapSize = this.gapSize;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.MeshBasicMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.envMap = this.specularMap = this.lightMap = this.map = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap = "round";
	this.vertexColors = THREE.NoColors;
	this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function() {
	var a = new THREE.MeshBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	return a
};
THREE.MeshLambertMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.ambient = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.wrapAround = !1;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.envMap = this.specularMap = this.lightMap = this.map = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap = "round";
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function() {
	var a = new THREE.MeshLambertMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.ambient.copy(this.ambient);
	a.emissive.copy(this.emissive);
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshPhongMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.ambient = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.specular = new THREE.Color(1118481);
	this.shininess = 30;
	this.metal = !1;
	this.perPixel = !0;
	this.wrapAround = !1;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.bumpMap = this.lightMap = this.map = null;
	this.bumpScale = 1;
	this.normalMap = null;
	this.normalScale = new THREE.Vector2(1, 1);
	this.envMap = this.specularMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = !0;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.wireframeLinejoin = this.wireframeLinecap = "round";
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function() {
	var a = new THREE.MeshPhongMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.ambient.copy(this.ambient);
	a.emissive.copy(this.emissive);
	a.specular.copy(this.specular);
	a.shininess = this.shininess;
	a.metal = this.metal;
	a.perPixel = this.perPixel;
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.bumpMap = this.bumpMap;
	a.bumpScale = this.bumpScale;
	a.normalMap = this.normalMap;
	a.normalScale.copy(this.normalScale);
	a.specularMap = this.specularMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshDepthMaterial = function(a) {
	THREE.Material.call(this);
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.setValues(a)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function() {
	var a = new THREE.MeshDepthMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshNormalMaterial = function(a) {
	THREE.Material.call(this, a);
	this.shading = THREE.FlatShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.setValues(a)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function() {
	var a = new THREE.MeshNormalMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshFaceMaterial = function(a) {
	this.materials = a instanceof Array ? a: []
};
THREE.MeshFaceMaterial.prototype.clone = function() {
	return new THREE.MeshFaceMaterial(this.materials.slice(0))
};
THREE.ParticleBasicMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.map = null;
	this.size = 1;
	this.sizeAttenuation = !0;
	this.vertexColors = !1;
	this.fog = !0;
	this.setValues(a)
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function() {
	var a = new THREE.ParticleBasicMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.size = this.size;
	a.sizeAttenuation = this.sizeAttenuation;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.ParticleCanvasMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.program = function() {};
	this.setValues(a)
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial.prototype.clone = function() {
	var a = new THREE.ParticleCanvasMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.program = this.program;
	return a
};
THREE.ShaderMaterial = function(a) {
	THREE.Material.call(this);
	this.vertexShader = this.fragmentShader = "void main() {}";
	this.uniforms = {};
	this.defines = {};
	this.attributes = null;
	this.shading = THREE.SmoothShading;
	this.wireframe = !1;
	this.wireframeLinewidth = 1;
	this.lights = this.fog = !1;
	this.vertexColors = THREE.NoColors;
	this.morphNormals = this.morphTargets = this.skinning = !1;
	this.setValues(a)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function() {
	var a = new THREE.ShaderMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.fragmentShader = this.fragmentShader;
	a.vertexShader = this.vertexShader;
	a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
	a.attributes = this.attributes;
	a.defines = this.defines;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.fog = this.fog;
	a.lights = this.lights;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.SpriteMaterial = function(a) {
	THREE.Material.call(this);
	this.color = new THREE.Color(16777215);
	this.map = new THREE.Texture;
	this.useScreenCoordinates = !0;
	this.depthTest = !this.useScreenCoordinates;
	this.sizeAttenuation = !this.useScreenCoordinates;
	this.scaleByViewport = !this.sizeAttenuation;
	this.alignment = THREE.SpriteAlignment.center.clone();
	this.fog = !1;
	this.uvOffset = new THREE.Vector2(0, 0);
	this.uvScale = new THREE.Vector2(1, 1);
	this.setValues(a);
	a = a || {};
	void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
	void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates);
	void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone = function() {
	var a = new THREE.SpriteMaterial;
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.useScreenCoordinates = this.useScreenCoordinates;
	a.sizeAttenuation = this.sizeAttenuation;
	a.scaleByViewport = this.scaleByViewport;
	a.alignment.copy(this.alignment);
	a.uvOffset.copy(this.uvOffset);
	a.uvScale.copy(this.uvScale);
	a.fog = this.fog;
	return a
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2( - 1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2( - 1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( - 1, 1);
THREE.Texture = function(a, b, c, d, e, f, g, h, i) {
	THREE.EventDispatcher.call(this);
	this.id = THREE.TextureIdCount++;
	this.name = "";
	this.image = a;
	this.mipmaps = [];
	this.mapping = void 0 !== b ? b: new THREE.UVMapping;
	this.wrapS = void 0 !== c ? c: THREE.ClampToEdgeWrapping;
	this.wrapT = void 0 !== d ? d: THREE.ClampToEdgeWrapping;
	this.magFilter = void 0 !== e ? e: THREE.LinearFilter;
	this.minFilter = void 0 !== f ? f: THREE.LinearMipMapLinearFilter;
	this.anisotropy = void 0 !== i ? i: 1;
	this.format = void 0 !== g ? g: THREE.RGBAFormat;
	this.type = void 0 !== h ? h: THREE.UnsignedByteType;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.generateMipmaps = !0;
	this.premultiplyAlpha = !1;
	this.flipY = !0;
	this.unpackAlignment = 4;
	this.needsUpdate = !1;
	this.onUpdate = null
};
THREE.Texture.prototype = {
	constructor: THREE.Texture,
	clone: function(a) {
		void 0 === a && (a = new THREE.Texture);
		a.image = this.image;
		a.mipmaps = this.mipmaps.slice(0);
		a.mapping = this.mapping;
		a.wrapS = this.wrapS;
		a.wrapT = this.wrapT;
		a.magFilter = this.magFilter;
		a.minFilter = this.minFilter;
		a.anisotropy = this.anisotropy;
		a.format = this.format;
		a.type = this.type;
		a.offset.copy(this.offset);
		a.repeat.copy(this.repeat);
		a.generateMipmaps = this.generateMipmaps;
		a.premultiplyAlpha = this.premultiplyAlpha;
		a.flipY = this.flipY;
		a.unpackAlignment = this.unpackAlignment;
		return a
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.TextureIdCount = 0;
THREE.CompressedTexture = function(a, b, c, d, e, f, g, h, i, k, l) {
	THREE.Texture.call(this, null, f, g, h, i, k, d, e, l);
	this.image = {
		width: b,
		height: c
	};
	this.mipmaps = a;
	this.generateMipmaps = !1
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function() {
	var a = new THREE.CompressedTexture;
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.DataTexture = function(a, b, c, d, e, f, g, h, i, k, l) {
	THREE.Texture.call(this, null, f, g, h, i, k, d, e, l);
	this.image = {
		data: a,
		width: b,
		height: c
	}
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function() {
	var a = new THREE.DataTexture;
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.Particle = function(a) {
	THREE.Object3D.call(this);
	this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Particle(this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.ParticleSystem = function(a, b) {
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b: new THREE.ParticleBasicMaterial({
		color: 16777215 * Math.random()
	});
	this.sortParticles = !1;
	this.geometry && null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere();
	this.frustumCulled = !1
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
	a.sortParticles = this.sortParticles;
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Line = function(a, b, c) {
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b: new THREE.LineBasicMaterial({
		color: 16777215 * Math.random()
	});
	this.type = void 0 !== c ? c: THREE.LineStrip;
	this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Mesh = function(a, b) {
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = void 0 !== b ? b: new THREE.MeshBasicMaterial({
		color: 16777215 * Math.random(),
		wireframe: !0
	});
	void 0 !== this.geometry && (null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.updateMorphTargets())
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets = function() {
	if (0 < this.geometry.morphTargets.length) {
		this.morphTargetBase = -1;
		this.morphTargetForcedOrder = [];
		this.morphTargetInfluences = [];
		this.morphTargetDictionary = {};
		for (var a = 0,
		b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0),
		this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
	}
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
	if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
	console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
	return 0
};
THREE.Mesh.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Bone = function(a) {
	THREE.Object3D.call(this);
	this.skin = a;
	this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function(a, b) {
	this.matrixAutoUpdate && (b |= this.updateMatrix());
	if (b || this.matrixWorldNeedsUpdate) a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix),
	this.matrixWorldNeedsUpdate = !1,
	b = !0;
	var c, d = this.children.length;
	for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function(a, b, c) {
	THREE.Mesh.call(this, a, b);
	this.useVertexTexture = void 0 !== c ? c: !0;
	this.identityMatrix = new THREE.Matrix4;
	this.bones = [];
	this.boneMatrices = [];
	var d, e, f;
	if (this.geometry && void 0 !== this.geometry.bones) {
		for (a = 0; a < this.geometry.bones.length; a++) c = this.geometry.bones[a],
		d = c.pos,
		e = c.rotq,
		f = c.scl,
		b = this.addBone(),
		b.name = c.name,
		b.position.set(d[0], d[1], d[2]),
		b.quaternion.set(e[0], e[1], e[2], e[3]),
		b.useQuaternion = !0,
		void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
		for (a = 0; a < this.bones.length; a++) c = this.geometry.bones[a],
		b = this.bones[a],
		-1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
		a = this.bones.length;
		this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = a = 256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8, this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * a);
		this.pose()
	}
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function(a) {
	void 0 === a && (a = new THREE.Bone(this));
	this.bones.push(a);
	return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
	this.matrixAutoUpdate && this.updateMatrix();
	if (this.matrixWorldNeedsUpdate || a) this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix),
	this.matrixWorldNeedsUpdate = !1;
	for (var a = 0,
	b = this.children.length; a < b; a++) {
		var c = this.children[a];
		c instanceof THREE.Bone ? c.update(this.identityMatrix, !1) : c.updateMatrixWorld(!0)
	}
	if (void 0 == this.boneInverses) {
		this.boneInverses = [];
		a = 0;
		for (b = this.bones.length; a < b; a++) c = new THREE.Matrix4,
		c.getInverse(this.bones[a].skinMatrix),
		this.boneInverses.push(c)
	}
	a = 0;
	for (b = this.bones.length; a < b; a++) THREE.SkinnedMesh.offsetMatrix.multiplyMatrices(this.bones[a].skinMatrix, this.boneInverses[a]),
	THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(this.boneMatrices, 16 * a);
	this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
};
THREE.SkinnedMesh.prototype.pose = function() {
	this.updateMatrixWorld(!0);
	for (var a = 0; a < this.geometry.skinIndices.length; a++) {
		var b = this.geometry.skinWeights[a],
		c = 1 / b.lengthManhattan();
		Infinity !== c ? b.multiplyScalar(c) : b.set(1)
	}
};
THREE.SkinnedMesh.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture));
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4;
THREE.MorphAnimMesh = function(a, b) {
	THREE.Mesh.call(this, a, b);
	this.duration = 1E3;
	this.mirroredLoop = !1;
	this.currentKeyframe = this.lastKeyframe = this.time = 0;
	this.direction = 1;
	this.directionBackwards = !1;
	this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function(a, b) {
	this.startKeyframe = a;
	this.endKeyframe = b;
	this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
	this.direction = 1;
	this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
	this.direction = -1;
	this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function() {
	var a = this.geometry;
	a.animations || (a.animations = {});
	for (var b, c = a.animations,
	d = /([a-z]+)(\d+)/,
	e = 0,
	f = a.morphTargets.length; e < f; e++) {
		var g = a.morphTargets[e].name.match(d);
		if (g && 1 < g.length) {
			g = g[1];
			c[g] || (c[g] = {
				start: Infinity,
				end: -Infinity
			});
			var h = c[g];
			e < h.start && (h.start = e);
			e > h.end && (h.end = e);
			b || (b = g)
		}
	}
	a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function(a, b, c) {
	this.geometry.animations || (this.geometry.animations = {});
	this.geometry.animations[a] = {
		start: b,
		end: c
	}
};
THREE.MorphAnimMesh.prototype.playAnimation = function(a, b) {
	var c = this.geometry.animations[a];
	c ? (this.setFrameRange(c.start, c.end), this.duration = 1E3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function(a) {
	var b = this.duration / this.length;
	this.time += this.direction * a;
	if (this.mirroredLoop) {
		if (this.time > this.duration || 0 > this.time) this.direction *= -1,
		this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0),
		0 > this.time && (this.time = 0, this.directionBackwards = !1)
	} else this.time %= this.duration,
	0 > this.time && (this.time += this.duration);
	a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
	a !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a);
	b = this.time % b / b;
	this.directionBackwards && (b = 1 - b);
	this.morphTargetInfluences[this.currentKeyframe] = b;
	this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.MorphAnimMesh.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
	a.duration = this.duration;
	a.mirroredLoop = this.mirroredLoop;
	a.time = this.time;
	a.lastKeyframe = this.lastKeyframe;
	a.currentKeyframe = this.currentKeyframe;
	a.direction = this.direction;
	a.directionBackwards = this.directionBackwards;
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.Ribbon = function(a, b) {
	THREE.Object3D.call(this);
	this.geometry = a;
	this.material = b
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.LOD = function() {
	THREE.Object3D.call(this);
	this.LODs = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function(a, b) {
	void 0 === b && (b = 0);
	for (var b = Math.abs(b), c = 0; c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance); c++);
	this.LODs.splice(c, 0, {
		visibleAtDistance: b,
		object3D: a
	});
	this.add(a)
};
THREE.LOD.prototype.update = function(a) {
	if (1 < this.LODs.length) {
		a.matrixWorldInverse.getInverse(a.matrixWorld);
		a = a.matrixWorldInverse;
		a = -(a.elements[2] * this.matrixWorld.elements[12] + a.elements[6] * this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[14] + a.elements[14]);
		this.LODs[0].object3D.visible = !0;
		for (var b = 1; b < this.LODs.length; b++) if (a >= this.LODs[b].visibleAtDistance) this.LODs[b - 1].object3D.visible = !1,
		this.LODs[b].object3D.visible = !0;
		else break;
		for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1
	}
};
THREE.LOD.prototype.clone = function() {};
THREE.Sprite = function(a) {
	THREE.Object3D.call(this);
	this.material = void 0 !== a ? a: new THREE.SpriteMaterial;
	this.rotation3d = this.rotation;
	this.rotation = 0
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function() {
	this.matrix.setPosition(this.position);
	this.rotation3d.set(0, 0, this.rotation);
	this.matrix.setRotationFromEuler(this.rotation3d); (1 !== this.scale.x || 1 !== this.scale.y) && this.matrix.scale(this.scale);
	this.matrixWorldNeedsUpdate = !0
};
THREE.Sprite.prototype.clone = function(a) {
	void 0 === a && (a = new THREE.Sprite(this.material));
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Scene = function() {
	THREE.Object3D.call(this);
	this.overrideMaterial = this.fog = null;
	this.matrixAutoUpdate = !1;
	this.__objects = [];
	this.__lights = [];
	this.__objectsAdded = [];
	this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function(a) {
	if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a),
	a.target && void 0 === a.target.parent && this.add(a.target);
	else if (! (a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
		this.__objects.push(a);
		this.__objectsAdded.push(a);
		var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
	}
	for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function(a) {
	if (a instanceof THREE.Light) {
		var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
	} else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
	for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function(a, b, c) {
	this.name = "";
	this.color = new THREE.Color(a);
	this.near = void 0 !== b ? b: 1;
	this.far = void 0 !== c ? c: 1E3
};
THREE.Fog.prototype.clone = function() {
	return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function(a, b) {
	this.name = "";
	this.color = new THREE.Color(a);
	this.density = void 0 !== b ? b: 2.5E-4
};
THREE.FogExp2.prototype.clone = function() {
	return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.CanvasRenderer = function(a) {
	function b(a) {
		D !== a && (D = u.globalAlpha = a)
	}
	function c(a) {
		w !== a && (a === THREE.NormalBlending ? u.globalCompositeOperation = "source-over": a === THREE.AdditiveBlending ? u.globalCompositeOperation = "lighter": a === THREE.SubtractiveBlending && (u.globalCompositeOperation = "darker"), w = a)
	}
	function d(a) {
		E !== a && (E = u.lineWidth = a)
	}
	function e(a) {
		Z !== a && (Z = u.lineCap = a)
	}
	function f(a) {
		A !== a && (A = u.lineJoin = a)
	}
	function g(a) {
		I !== a && (I = u.strokeStyle = a)
	}
	function h(a) {
		J !== a && (J = u.fillStyle = a)
	}
	function i(a, b) {
		if (S !== a || F !== b) u.setLineDash([a, b]),
		S = a,
		F = b
	}
	console.log("THREE.CanvasRenderer", THREE.REVISION);
	var k = THREE.Math.smoothstep,
	a = a || {},
	l = this,
	m, p, s, r = new THREE.Projector,
	n = void 0 !== a.canvas ? a.canvas: document.createElement("canvas"),
	q,
	z,
	t,
	x,
	u = n.getContext("2d"),
	B = new THREE.Color(0),
	G = 0,
	D = 1,
	w = 0,
	I = null,
	J = null,
	E = null,
	Z = null,
	A = null,
	S = null,
	F = 0,
	H,
	K,
	N,
	fa,
	ma = new THREE.RenderableVertex,
	eb = new THREE.RenderableVertex,
	M,
	U,
	ja,
	L,
	ca,
	ta,
	kb,
	$a,
	lb,
	db,
	La,
	Oa,
	ea = new THREE.Color,
	ha = new THREE.Color,
	V = new THREE.Color,
	$ = new THREE.Color,
	Y = new THREE.Color,
	ia = new THREE.Color,
	ra = new THREE.Color,
	na = new THREE.Color,
	Pa = {},
	Ba = {},
	fb,
	jb,
	Sa,
	ob,
	Gb,
	Mb,
	wb,
	Nb,
	Ob,
	xb,
	Hb = new THREE.Box2,
	Qa = new THREE.Box2,
	Va = new THREE.Box2,
	wa = new THREE.Color,
	xa = new THREE.Color,
	yb = new THREE.Color,
	pb = new THREE.Vector3,
	j,
	mb,
	vb,
	Wa,
	Ga,
	zb,
	Ib = 16;
	j = document.createElement("canvas");
	j.width = j.height = 2;
	mb = j.getContext("2d");
	mb.fillStyle = "rgba(0,0,0,1)";
	mb.fillRect(0, 0, 2, 2);
	vb = mb.getImageData(0, 0, 2, 2);
	Wa = vb.data;
	Ga = document.createElement("canvas");
	Ga.width = Ga.height = Ib;
	zb = Ga.getContext("2d");
	zb.translate( - Ib / 2, -Ib / 2);
	zb.scale(Ib, Ib);
	Ib--;
	void 0 === u.setLineDash && (u.setLineDash = void 0 !== u.mozDash ?
	function(a) {
		u.mozDash = null !== a[0] ? a: null
	}: function() {});
	this.domElement = n;
	this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio: void 0 !== window.devicePixelRatio ? window.devicePixelRatio: 1;
	this.sortElements = this.sortObjects = this.autoClear = !0;
	this.info = {
		render: {
			vertices: 0,
			faces: 0
		}
	};
	this.supportsVertexTextures = function() {};
	this.setFaceCulling = function() {};
	this.setSize = function(a, b) {
		q = a * this.devicePixelRatio;
		z = b * this.devicePixelRatio;
		t = Math.floor(q / 2);
		x = Math.floor(z / 2);
		n.width = q;
		n.height = z;
		n.style.width = a + "px";
		n.style.height = b + "px";
		Hb.set(new THREE.Vector2( - t, -x), new THREE.Vector2(t, x));
		Qa.set(new THREE.Vector2( - t, -x), new THREE.Vector2(t, x));
		D = 1;
		w = 0;
		A = Z = E = J = I = null
	};
	this.setClearColor = function(a, b) {
		B.copy(a);
		G = void 0 !== b ? b: 1;
		Qa.set(new THREE.Vector2( - t, -x), new THREE.Vector2(t, x))
	};
	this.setClearColorHex = function(a, b) {
		B.setHex(a);
		G = void 0 !== b ? b: 1;
		Qa.set(new THREE.Vector2( - t, -x), new THREE.Vector2(t, x))
	};
	this.getMaxAnisotropy = function() {
		return 0
	};
	this.clear = function() {
		u.setTransform(1, 0, 0, -1, t, x); ! 1 === Qa.empty() && (Qa.intersect(Hb), Qa.expandByScalar(2), 1 > G && u.clearRect(Qa.min.x | 0, Qa.min.y | 0, Qa.max.x - Qa.min.x | 0, Qa.max.y - Qa.min.y | 0), 0 < G && (c(THREE.NormalBlending), b(1), h("rgba(" + Math.floor(255 * B.r) + "," + Math.floor(255 * B.g) + "," + Math.floor(255 * B.b) + "," + G + ")"), u.fillRect(Qa.min.x | 0, Qa.min.y | 0, Qa.max.x - Qa.min.x | 0, Qa.max.y - Qa.min.y | 0)), Qa.makeEmpty())
	};
	this.render = function(a, n) {
		function q(a, b, c) {
			for (var d = 0,
			e = s.length; d < e; d++) {
				var f = s[d];
				na.copy(f.color);
				if (f instanceof THREE.DirectionalLight) {
					var g = pb.getPositionFromMatrix(f.matrixWorld).normalize(),
					h = b.dot(g);
					0 >= h || (h *= f.intensity, c.add(na.multiplyScalar(h)))
				} else f instanceof THREE.PointLight && (g = pb.getPositionFromMatrix(f.matrixWorld), h = b.dot(pb.subVectors(g, a).normalize()), 0 >= h || (h *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 != h && (h *= f.intensity, c.add(na.multiplyScalar(h)))))
			}
		}
		function w(a, d, e, f, g, h, j, i) {
			l.info.render.vertices += 3;
			l.info.render.faces++;
			b(i.opacity);
			c(i.blending);
			M = a.positionScreen.x;
			U = a.positionScreen.y;
			ja = d.positionScreen.x;
			L = d.positionScreen.y;
			ca = e.positionScreen.x;
			ta = e.positionScreen.y;
			z(M, U, ja, L, ca, ta); (i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial) && null === i.map ? (ia.copy(i.color), ra.copy(i.emissive), i.vertexColors === THREE.FaceColors && ia.multiply(j.color), !1 === i.wireframe && i.shading == THREE.SmoothShading && 3 == j.vertexNormalsLength ? (ha.copy(wa), V.copy(wa), $.copy(wa), q(j.v1.positionWorld, j.vertexNormalsModel[0], ha), q(j.v2.positionWorld, j.vertexNormalsModel[1], V), q(j.v3.positionWorld, j.vertexNormalsModel[2], $), ha.multiply(ia).add(ra), V.multiply(ia).add(ra), $.multiply(ia).add(ra), Y.addColors(V, $).multiplyScalar(0.5), Sa = Dc(ha, V, $, Y), ab(M, U, ja, L, ca, ta, 0, 0, 1, 0, 0, 1, Sa)) : (ea.copy(wa), q(j.centroidModel, j.normalModel, ea), ea.multiply(ia).add(ra), !0 === i.wireframe ? B(ea, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : D(ea))) : i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial ? null !== i.map ? i.map.mapping instanceof THREE.UVMapping && (ob = j.uvs[0], F(M, U, ja, L, ca, ta, ob[f].x, ob[f].y, ob[g].x, ob[g].y, ob[h].x, ob[h].y, i.map)) : null !== i.envMap ? i.envMap.mapping instanceof THREE.SphericalReflectionMapping && (pb.copy(j.vertexNormalsModelView[f]), Gb = 0.5 * pb.x + 0.5, Mb = 0.5 * pb.y + 0.5, pb.copy(j.vertexNormalsModelView[g]), wb = 0.5 * pb.x + 0.5, Nb = 0.5 * pb.y + 0.5, pb.copy(j.vertexNormalsModelView[h]), Ob = 0.5 * pb.x + 0.5, xb = 0.5 * pb.y + 0.5, F(M, U, ja, L, ca, ta, Gb, Mb, wb, Nb, Ob, xb, i.envMap)) : (ea.copy(i.color), i.vertexColors === THREE.FaceColors && ea.multiply(j.color), !0 === i.wireframe ? B(ea, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : D(ea)) : i instanceof THREE.MeshDepthMaterial ? (fb = n.near, jb = n.far, ha.r = ha.g = ha.b = 1 - k(a.positionScreen.z * a.positionScreen.w, fb, jb), V.r = V.g = V.b = 1 - k(d.positionScreen.z * d.positionScreen.w, fb, jb), $.r = $.g = $.b = 1 - k(e.positionScreen.z * e.positionScreen.w, fb, jb), Y.addColors(V, $).multiplyScalar(0.5), Sa = Dc(ha, V, $, Y), ab(M, U, ja, L, ca, ta, 0, 0, 1, 0, 0, 1, Sa)) : i instanceof THREE.MeshNormalMaterial && (i.shading == THREE.FlatShading ? (a = j.normalModelView, ea.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), !0 === i.wireframe ? B(ea, i.wireframeLinewidth, i.wireframeLinecap, i.wireframeLinejoin) : D(ea)) : i.shading == THREE.SmoothShading && (a = j.vertexNormalsModelView[f], ha.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), a = j.vertexNormalsModelView[g], V.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), a = j.vertexNormalsModelView[h], $.setRGB(a.x, a.y, a.z).multiplyScalar(0.5).addScalar(0.5), Y.addColors(V, $).multiplyScalar(0.5), Sa = Dc(ha, V, $, Y), ab(M, U, ja, L, ca, ta, 0, 0, 1, 0, 0, 1, Sa)))
		}
		function z(a, b, c, d, e, f) {
			u.beginPath();
			u.moveTo(a, b);
			u.lineTo(c, d);
			u.lineTo(e, f);
			u.closePath()
		}
		function A(a, b, c, d, e, f, g, h) {
			u.beginPath();
			u.moveTo(a, b);
			u.lineTo(c, d);
			u.lineTo(e, f);
			u.lineTo(g, h);
			u.closePath()
		}
		function B(a, b, c, h) {
			d(b);
			e(c);
			f(h);
			g(a.getStyle());
			u.stroke();
			Va.expandByScalar(2 * b)
		}
		function D(a) {
			h(a.getStyle());
			u.fill()
		}
		function F(a, b, c, d, e, f, g, j, i, k, ab, l, m) {
			if (! (m instanceof THREE.DataTexture || void 0 === m.image || 0 == m.image.width)) {
				if (!0 === m.needsUpdate) {
					var p = m.wrapS == THREE.RepeatWrapping,
					n = m.wrapT == THREE.RepeatWrapping;
					Pa[m.id] = u.createPattern(m.image, !0 === p && !0 === n ? "repeat": !0 === p && !1 === n ? "repeat-x": !1 === p && !0 === n ? "repeat-y": "no-repeat");
					m.needsUpdate = !1
				}
				void 0 === Pa[m.id] ? h("rgba(0,0,0,1)") : h(Pa[m.id]);
				var p = m.offset.x / m.repeat.x,
				n = m.offset.y / m.repeat.y,
				Jb = m.image.width * m.repeat.x,
				q = m.image.height * m.repeat.y,
				g = (g + p) * Jb,
				j = (1 - j + n) * q,
				c = c - a,
				d = d - b,
				e = e - a,
				f = f - b,
				i = (i + p) * Jb - g,
				k = (1 - k + n) * q - j,
				ab = (ab + p) * Jb - g,
				l = (1 - l + n) * q - j,
				p = i * l - ab * k;
				0 === p ? (void 0 === Ba[m.id] && (b = document.createElement("canvas"), b.width = m.image.width, b.height = m.image.height, b = b.getContext("2d"), b.drawImage(m.image, 0, 0), Ba[m.id] = b.getImageData(0, 0, m.image.width, m.image.height).data), b = Ba[m.id], g = 4 * (Math.floor(g) + Math.floor(j) * m.image.width), ea.setRGB(b[g] / 255, b[g + 1] / 255, b[g + 2] / 255), D(ea)) : (p = 1 / p, m = (l * c - k * e) * p, k = (l * d - k * f) * p, c = (i * e - ab * c) * p, d = (i * f - ab * d) * p, a = a - m * g - c * j, g = b - k * g - d * j, u.save(), u.transform(m, k, c, d, a, g), u.fill(), u.restore())
			}
		}
		function ab(a, b, c, d, e, f, g, h, j, i, k, ab, m) {
			var l, p;
			l = m.width - 1;
			p = m.height - 1;
			g *= l;
			h *= p;
			c -= a;
			d -= b;
			e -= a;
			f -= b;
			j = j * l - g;
			i = i * p - h;
			k = k * l - g;
			ab = ab * p - h;
			p = 1 / (j * ab - k * i);
			l = (ab * c - i * e) * p;
			i = (ab * d - i * f) * p;
			c = (j * e - k * c) * p;
			d = (j * f - k * d) * p;
			a = a - l * g - c * h;
			b = b - i * g - d * h;
			u.save();
			u.transform(l, i, c, d, a, b);
			u.clip();
			u.drawImage(m, 0, 0);
			u.restore()
		}
		function Dc(a, b, c, d) {
			Wa[0] = 255 * a.r | 0;
			Wa[1] = 255 * a.g | 0;
			Wa[2] = 255 * a.b | 0;
			Wa[4] = 255 * b.r | 0;
			Wa[5] = 255 * b.g | 0;
			Wa[6] = 255 * b.b | 0;
			Wa[8] = 255 * c.r | 0;
			Wa[9] = 255 * c.g | 0;
			Wa[10] = 255 * c.b | 0;
			Wa[12] = 255 * d.r | 0;
			Wa[13] = 255 * d.g | 0;
			Wa[14] = 255 * d.b | 0;
			mb.putImageData(vb, 0, 0);
			zb.drawImage(j, 0, 0);
			return Ga
		}
		function Jb(a, b) {
			var c = b.x - a.x,
			d = b.y - a.y,
			e = c * c + d * d;
			0 !== e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
		}
		if (!1 === n instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
		else { ! 0 === this.autoClear && this.clear();
			u.setTransform(1, 0, 0, -1, t, x);
			l.info.render.vertices = 0;
			l.info.render.faces = 0;
			m = r.projectScene(a, n, this.sortObjects, this.sortElements);
			p = m.elements;
			s = m.lights;
			wa.setRGB(0, 0, 0);
			xa.setRGB(0, 0, 0);
			yb.setRGB(0, 0, 0);
			for (var wc = 0,
			qd = s.length; wc < qd; wc++) {
				var W = s[wc],
				ga = W.color;
				W instanceof THREE.AmbientLight ? wa.add(ga) : W instanceof THREE.DirectionalLight ? xa.add(ga) : W instanceof THREE.PointLight && yb.add(ga)
			}
			wc = 0;
			for (qd = p.length; wc < qd; wc++) {
				var oa = p[wc],
				W = oa.material;
				if (! (void 0 === W || !1 === W.visible)) {
					Va.makeEmpty();
					if (oa instanceof THREE.RenderableParticle) {
						H = oa;
						H.x *= t;
						H.y *= x;
						var ga = H,
						gb = oa;
						b(W.opacity);
						c(W.blending);
						var Ab = void 0,
						G = void 0,
						Bb = void 0,
						E = void 0,
						I = oa = void 0,
						J = void 0;
						W instanceof THREE.ParticleBasicMaterial ? null === W.map ? (Bb = gb.object.scale.x, E = gb.object.scale.y, Bb *= gb.scale.x * t, E *= gb.scale.y * x, Va.min.set(ga.x - Bb, ga.y - E), Va.max.set(ga.x + Bb, ga.y + E), !1 !== Hb.isIntersectionBox(Va) && (h(W.color.getStyle()), u.save(), u.translate(ga.x, ga.y), u.rotate( - gb.rotation), u.scale(Bb, E), u.fillRect( - 1, -1, 2, 2), u.restore())) : (oa = W.map.image, I = oa.width >> 1, J = oa.height >> 1, Bb = gb.scale.x * t, E = gb.scale.y * x, Ab = Bb * I, G = E * J, Va.min.set(ga.x - Ab, ga.y - G), Va.max.set(ga.x + Ab, ga.y + G), !1 !== Hb.isIntersectionBox(Va) && (u.save(), u.translate(ga.x, ga.y), u.rotate( - gb.rotation), u.scale(Bb, -E), u.translate( - I, -J), u.drawImage(oa, 0, 0), u.restore())) : W instanceof THREE.ParticleCanvasMaterial && (Ab = gb.scale.x * t, G = gb.scale.y * x, Va.min.set(ga.x - Ab, ga.y - G), Va.max.set(ga.x + Ab, ga.y + G), !1 !== Hb.isIntersectionBox(Va) && (g(W.color.getStyle()), h(W.color.getStyle()), u.save(), u.translate(ga.x, ga.y), u.rotate( - gb.rotation), u.scale(Ab, G), W.program(u), u.restore()))
					} else if (oa instanceof THREE.RenderableLine) H = oa.v1,
					K = oa.v2,
					H.positionScreen.x *= t,
					H.positionScreen.y *= x,
					K.positionScreen.x *= t,
					K.positionScreen.y *= x,
					Va.setFromPoints([H.positionScreen, K.positionScreen]),
					!0 === Hb.isIntersectionBox(Va) && (ga = H, gb = K, b(W.opacity), c(W.blending), u.beginPath(), u.moveTo(ga.positionScreen.x, ga.positionScreen.y), u.lineTo(gb.positionScreen.x, gb.positionScreen.y), W instanceof THREE.LineBasicMaterial ? (d(W.linewidth), e(W.linecap), f(W.linejoin), g(W.color.getStyle()), u.stroke(), Va.expandByScalar(2 * W.linewidth)) : W instanceof THREE.LineDashedMaterial && (d(W.linewidth), e(W.linecap), f(W.linejoin), g(W.color.getStyle()), i(W.dashSize, W.gapSize), u.stroke(), Va.expandByScalar(2 * W.linewidth), i(null, null)));
					else if (oa instanceof THREE.RenderableFace3) {
						H = oa.v1;
						K = oa.v2;
						N = oa.v3;
						if ( - 1 > H.positionScreen.z || 1 < H.positionScreen.z) continue;
						if ( - 1 > K.positionScreen.z || 1 < K.positionScreen.z) continue;
						if ( - 1 > N.positionScreen.z || 1 < N.positionScreen.z) continue;
						H.positionScreen.x *= t;
						H.positionScreen.y *= x;
						K.positionScreen.x *= t;
						K.positionScreen.y *= x;
						N.positionScreen.x *= t;
						N.positionScreen.y *= x; ! 0 === W.overdraw && (Jb(H.positionScreen, K.positionScreen), Jb(K.positionScreen, N.positionScreen), Jb(N.positionScreen, H.positionScreen));
						Va.setFromPoints([H.positionScreen, K.positionScreen, N.positionScreen]);
						w(H, K, N, 0, 1, 2, oa, W)
					} else if (oa instanceof THREE.RenderableFace4) {
						H = oa.v1;
						K = oa.v2;
						N = oa.v3;
						fa = oa.v4;
						if ( - 1 > H.positionScreen.z || 1 < H.positionScreen.z) continue;
						if ( - 1 > K.positionScreen.z || 1 < K.positionScreen.z) continue;
						if ( - 1 > N.positionScreen.z || 1 < N.positionScreen.z) continue;
						if ( - 1 > fa.positionScreen.z || 1 < fa.positionScreen.z) continue;
						H.positionScreen.x *= t;
						H.positionScreen.y *= x;
						K.positionScreen.x *= t;
						K.positionScreen.y *= x;
						N.positionScreen.x *= t;
						N.positionScreen.y *= x;
						fa.positionScreen.x *= t;
						fa.positionScreen.y *= x;
						ma.positionScreen.copy(K.positionScreen);
						eb.positionScreen.copy(fa.positionScreen); ! 0 === W.overdraw && (Jb(H.positionScreen, K.positionScreen), Jb(K.positionScreen, fa.positionScreen), Jb(fa.positionScreen, H.positionScreen), Jb(N.positionScreen, ma.positionScreen), Jb(N.positionScreen, eb.positionScreen));
						Va.setFromPoints([H.positionScreen, K.positionScreen, N.positionScreen, fa.positionScreen]);
						ga = H;
						gb = K;
						Ab = N;
						G = fa;
						Bb = ma;
						E = eb;
						l.info.render.vertices += 4;
						l.info.render.faces++;
						b(W.opacity);
						c(W.blending);
						void 0 !== W.map && null !== W.map || void 0 !== W.envMap && null !== W.envMap ? (w(ga, gb, G, 0, 1, 3, oa, W), w(Bb, Ab, E, 1, 2, 3, oa, W)) : (M = ga.positionScreen.x, U = ga.positionScreen.y, ja = gb.positionScreen.x, L = gb.positionScreen.y, ca = Ab.positionScreen.x, ta = Ab.positionScreen.y, kb = G.positionScreen.x, $a = G.positionScreen.y, lb = Bb.positionScreen.x, db = Bb.positionScreen.y, La = E.positionScreen.x, Oa = E.positionScreen.y, W instanceof THREE.MeshLambertMaterial || W instanceof THREE.MeshPhongMaterial ? (ia.copy(W.color), ra.copy(W.emissive), W.vertexColors === THREE.FaceColors && ia.multiply(oa.color), !1 === W.wireframe && W.shading == THREE.SmoothShading && 4 == oa.vertexNormalsLength ? (ha.copy(wa), V.copy(wa), $.copy(wa), Y.copy(wa), q(oa.v1.positionWorld, oa.vertexNormalsModel[0], ha), q(oa.v2.positionWorld, oa.vertexNormalsModel[1], V), q(oa.v4.positionWorld, oa.vertexNormalsModel[3], $), q(oa.v3.positionWorld, oa.vertexNormalsModel[2], Y), ha.multiply(ia).add(ra), V.multiply(ia).add(ra), $.multiply(ia).add(ra), Y.multiply(ia).add(ra), Sa = Dc(ha, V, $, Y), z(M, U, ja, L, kb, $a), ab(M, U, ja, L, kb, $a, 0, 0, 1, 0, 0, 1, Sa), z(lb, db, ca, ta, La, Oa), ab(lb, db, ca, ta, La, Oa, 1, 0, 1, 1, 0, 1, Sa)) : (ea.copy(wa), q(oa.centroidModel, oa.normalModel, ea), ea.multiply(ia).add(ra), A(M, U, ja, L, ca, ta, kb, $a), !0 === W.wireframe ? B(ea, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : D(ea))) : W instanceof THREE.MeshBasicMaterial ? (ea.copy(W.color), W.vertexColors === THREE.FaceColors && ea.multiply(oa.color), A(M, U, ja, L, ca, ta, kb, $a), !0 === W.wireframe ? B(ea, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : D(ea)) : W instanceof THREE.MeshNormalMaterial ? (ga = void 0, W.shading == THREE.FlatShading ? (ga = oa.normalModelView, ea.setRGB(ga.x, ga.y, ga.z).multiplyScalar(0.5).addScalar(0.5), A(M, U, ja, L, ca, ta, kb, $a), !0 === W.wireframe ? B(ea, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : D(ea)) : W.shading == THREE.SmoothShading && (ga = oa.vertexNormalsModelView[0], ha.setRGB(ga.x, ga.y, ga.z).multiplyScalar(0.5).addScalar(0.5), ga = oa.vertexNormalsModelView[1], V.setRGB(ga.x, ga.y, ga.z).multiplyScalar(0.5).addScalar(0.5), ga = oa.vertexNormalsModelView[3], $.setRGB(ga.x, ga.y, ga.z).multiplyScalar(0.5).addScalar(0.5), ga = oa.vertexNormalsModelView[2], Y.setRGB(ga.x, ga.y, ga.z).multiplyScalar(0.5).addScalar(0.5), Sa = Dc(ha, V, $, Y), z(M, U, ja, L, kb, $a), ab(M, U, ja, L, kb, $a, 0, 0, 1, 0, 0, 1, Sa), z(lb, db, ca, ta, La, Oa), ab(lb, db, ca, ta, La, Oa, 1, 0, 1, 1, 0, 1, Sa))) : W instanceof THREE.MeshDepthMaterial && (fb = n.near, jb = n.far, ha.r = ha.g = ha.b = 1 - k(ga.positionScreen.z * ga.positionScreen.w, fb, jb), V.r = V.g = V.b = 1 - k(gb.positionScreen.z * gb.positionScreen.w, fb, jb), $.r = $.g = $.b = 1 - k(G.positionScreen.z * G.positionScreen.w, fb, jb), Y.r = Y.g = Y.b = 1 - k(Ab.positionScreen.z * Ab.positionScreen.w, fb, jb), Sa = Dc(ha, V, $, Y), z(M, U, ja, L, kb, $a), ab(M, U, ja, L, kb, $a, 0, 0, 1, 0, 0, 1, Sa), z(lb, db, ca, ta, La, Oa), ab(lb, db, ca, ta, La, Oa, 1, 0, 1, 1, 0, 1, Sa)))
					}
					Qa.union(Va)
				}
			}
			u.setTransform(1, 0, 0, 1, 0, 0)
		}
	}
};
THREE.ShaderChunk = {
	fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
	fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
	envmap_fragment: "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
	envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
	envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
	map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
	map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
	map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
	map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
	map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
	map_fragment: "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
	lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
	lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
	lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
	lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
	lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
	lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
	lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
	lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
	lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
	color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
	color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
	color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
	color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
	skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
	default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
	defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
	shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
	shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;\nelse shadowKernel[0][0] = 0.0;\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;\nelse shadowKernel[0][1] = 0.0;\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;\nelse shadowKernel[0][2] = 0.0;\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;\nelse shadowKernel[1][0] = 0.0;\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;\nelse shadowKernel[1][1] = 0.0;\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;\nelse shadowKernel[1][2] = 0.0;\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;\nelse shadowKernel[2][0] = 0.0;\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;\nelse shadowKernel[2][1] = 0.0;\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;\nelse shadowKernel[2][2] = 0.0;\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
	shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
	shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
	alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
	linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
	merge: function(a) {
		var b, c, d, e = {};
		for (b = 0; b < a.length; b++) for (c in d = this.clone(a[b]), d) e[c] = d[c];
		return e
	},
	clone: function(a) {
		var b, c, d, e = {};
		for (b in a) for (c in e[b] = {},
		a[b]) d = a[b][c],
		e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
		return e
	}
};
THREE.UniformsLib = {
	common: {
		diffuse: {
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity: {
			type: "f",
			value: 1
		},
		map: {
			type: "t",
			value: null
		},
		offsetRepeat: {
			type: "v4",
			value: new THREE.Vector4(0, 0, 1, 1)
		},
		lightMap: {
			type: "t",
			value: null
		},
		specularMap: {
			type: "t",
			value: null
		},
		envMap: {
			type: "t",
			value: null
		},
		flipEnvMap: {
			type: "f",
			value: -1
		},
		useRefract: {
			type: "i",
			value: 0
		},
		reflectivity: {
			type: "f",
			value: 1
		},
		refractionRatio: {
			type: "f",
			value: 0.98
		},
		combine: {
			type: "i",
			value: 0
		},
		morphTargetInfluences: {
			type: "f",
			value: 0
		}
	},
	bump: {
		bumpMap: {
			type: "t",
			value: null
		},
		bumpScale: {
			type: "f",
			value: 1
		}
	},
	normalmap: {
		normalMap: {
			type: "t",
			value: null
		},
		normalScale: {
			type: "v2",
			value: new THREE.Vector2(1, 1)
		}
	},
	fog: {
		fogDensity: {
			type: "f",
			value: 2.5E-4
		},
		fogNear: {
			type: "f",
			value: 1
		},
		fogFar: {
			type: "f",
			value: 2E3
		},
		fogColor: {
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	lights: {
		ambientLightColor: {
			type: "fv",
			value: []
		},
		directionalLightDirection: {
			type: "fv",
			value: []
		},
		directionalLightColor: {
			type: "fv",
			value: []
		},
		hemisphereLightDirection: {
			type: "fv",
			value: []
		},
		hemisphereLightSkyColor: {
			type: "fv",
			value: []
		},
		hemisphereLightGroundColor: {
			type: "fv",
			value: []
		},
		pointLightColor: {
			type: "fv",
			value: []
		},
		pointLightPosition: {
			type: "fv",
			value: []
		},
		pointLightDistance: {
			type: "fv1",
			value: []
		},
		spotLightColor: {
			type: "fv",
			value: []
		},
		spotLightPosition: {
			type: "fv",
			value: []
		},
		spotLightDirection: {
			type: "fv",
			value: []
		},
		spotLightDistance: {
			type: "fv1",
			value: []
		},
		spotLightAngleCos: {
			type: "fv1",
			value: []
		},
		spotLightExponent: {
			type: "fv1",
			value: []
		}
	},
	particle: {
		psColor: {
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity: {
			type: "f",
			value: 1
		},
		size: {
			type: "f",
			value: 1
		},
		scale: {
			type: "f",
			value: 1
		},
		map: {
			type: "t",
			value: null
		},
		fogDensity: {
			type: "f",
			value: 2.5E-4
		},
		fogNear: {
			type: "f",
			value: 1
		},
		fogFar: {
			type: "f",
			value: 2E3
		},
		fogColor: {
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	shadowmap: {
		shadowMap: {
			type: "tv",
			value: []
		},
		shadowMapSize: {
			type: "v2v",
			value: []
		},
		shadowBias: {
			type: "fv1",
			value: []
		},
		shadowDarkness: {
			type: "fv1",
			value: []
		},
		shadowMatrix: {
			type: "m4v",
			value: []
		}
	}
};
THREE.ShaderLib = {
	basic: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
		vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	lambert: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
			ambient: {
				type: "c",
				value: new THREE.Color(16777215)
			},
			emissive: {
				type: "c",
				value: new THREE.Color(0)
			},
			wrapRGB: {
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	phong: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
			ambient: {
				type: "c",
				value: new THREE.Color(16777215)
			},
			emissive: {
				type: "c",
				value: new THREE.Color(0)
			},
			specular: {
				type: "c",
				value: new THREE.Color(1118481)
			},
			shininess: {
				type: "f",
				value: 30
			},
			wrapRGB: {
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	particle_basic: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
		vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	dashed: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
			scale: {
				type: "f",
				value: 1
			},
			dashSize: {
				type: "f",
				value: 1
			},
			totalSize: {
				type: "f",
				value: 2
			}
		}]),
		vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
	},
	depth: {
		uniforms: {
			mNear: {
				type: "f",
				value: 1
			},
			mFar: {
				type: "f",
				value: 2E3
			},
			opacity: {
				type: "f",
				value: 1
			}
		},
		vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
		fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
	},
	normal: {
		uniforms: {
			opacity: {
				type: "f",
				value: 1
			}
		},
		vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
		fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
	},
	normalmap: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
			enableAO: {
				type: "i",
				value: 0
			},
			enableDiffuse: {
				type: "i",
				value: 0
			},
			enableSpecular: {
				type: "i",
				value: 0
			},
			enableReflection: {
				type: "i",
				value: 0
			},
			enableDisplacement: {
				type: "i",
				value: 0
			},
			tDisplacement: {
				type: "t",
				value: null
			},
			tDiffuse: {
				type: "t",
				value: null
			},
			tCube: {
				type: "t",
				value: null
			},
			tNormal: {
				type: "t",
				value: null
			},
			tSpecular: {
				type: "t",
				value: null
			},
			tAO: {
				type: "t",
				value: null
			},
			uNormalScale: {
				type: "v2",
				value: new THREE.Vector2(1, 1)
			},
			uDisplacementBias: {
				type: "f",
				value: 0
			},
			uDisplacementScale: {
				type: "f",
				value: 1
			},
			uDiffuseColor: {
				type: "c",
				value: new THREE.Color(16777215)
			},
			uSpecularColor: {
				type: "c",
				value: new THREE.Color(1118481)
			},
			uAmbientColor: {
				type: "c",
				value: new THREE.Color(16777215)
			},
			uShininess: {
				type: "f",
				value: 30
			},
			uOpacity: {
				type: "f",
				value: 1
			},
			useRefract: {
				type: "i",
				value: 0
			},
			uRefractionRatio: {
				type: "f",
				value: 0.98
			},
			uReflectivity: {
				type: "f",
				value: 0.5
			},
			uOffset: {
				type: "v2",
				value: new THREE.Vector2(0, 0)
			},
			uRepeat: {
				type: "v2",
				value: new THREE.Vector2(1, 1)
			},
			wrapRGB: {
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
		vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"].join("\n")
	},
	cube: {
		uniforms: {
			tCube: {
				type: "t",
				value: null
			},
			tFlip: {
				type: "f",
				value: -1
			}
		},
		vertexShader: "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
		fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"
	},
	depthRGBA: {
		uniforms: {},
		vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
		fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
	}
};
THREE.WebGLRenderer = function(a) {
	function b(a) {
		if (a.__webglCustomAttributesList) for (var b in a.__webglCustomAttributesList) j.deleteBuffer(a.__webglCustomAttributesList[b].buffer)
	}
	function c(a, b) {
		var c = a.vertices.length,
		d = b.material;
		if (d.attributes) {
			void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
			for (var e in d.attributes) {
				var f = d.attributes[e];
				if (!f.__webglInitialized || f.createUniqueBuffers) {
					f.__webglInitialized = !0;
					var g = 1;
					"v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ? g = 4 : "c" === f.type && (g = 3);
					f.size = g;
					f.array = new Float32Array(c * g);
					f.buffer = j.createBuffer();
					f.buffer.belongsToAttribute = e;
					f.needsUpdate = !0
				}
				a.__webglCustomAttributesList.push(f)
			}
		}
	}
	function d(a, b) {
		var c = b.geometry,
		d = a.faces3,
		h = a.faces4,
		i = 3 * d.length + 4 * h.length,
		k = 1 * d.length + 2 * h.length,
		h = 3 * d.length + 4 * h.length,
		d = e(b, a),
		m = g(d),
		l = f(d),
		p = d.vertexColors ? d.vertexColors: !1;
		a.__vertexArray = new Float32Array(3 * i);
		l && (a.__normalArray = new Float32Array(3 * i));
		c.hasTangents && (a.__tangentArray = new Float32Array(4 * i));
		p && (a.__colorArray = new Float32Array(3 * i));
		if (m) {
			if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length) a.__uvArray = new Float32Array(2 * i);
			if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length) a.__uv2Array = new Float32Array(2 * i)
		}
		b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * i), a.__skinWeightArray = new Float32Array(4 * i));
		a.__faceArray = new Uint16Array(3 * k);
		a.__lineArray = new Uint16Array(2 * h);
		if (a.numMorphTargets) {
			a.__morphTargetsArrays = [];
			c = 0;
			for (m = a.numMorphTargets; c < m; c++) a.__morphTargetsArrays.push(new Float32Array(3 * i))
		}
		if (a.numMorphNormals) {
			a.__morphNormalsArrays = [];
			c = 0;
			for (m = a.numMorphNormals; c < m; c++) a.__morphNormalsArrays.push(new Float32Array(3 * i))
		}
		a.__webglFaceCount = 3 * k;
		a.__webglLineCount = 2 * h;
		if (d.attributes) {
			void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
			for (var n in d.attributes) {
				var k = d.attributes[n],
				c = {},
				q;
				for (q in k) c[q] = k[q];
				if (!c.__webglInitialized || c.createUniqueBuffers) c.__webglInitialized = !0,
				h = 1,
				"v2" === c.type ? h = 2 : "v3" === c.type ? h = 3 : "v4" === c.type ? h = 4 : "c" === c.type && (h = 3),
				c.size = h,
				c.array = new Float32Array(i * h),
				c.buffer = j.createBuffer(),
				c.buffer.belongsToAttribute = n,
				k.needsUpdate = !0,
				c.__original = k;
				a.__webglCustomAttributesList.push(c)
			}
		}
		a.__inittedArrays = !0
	}
	function e(a, b) {
		return a.material instanceof THREE.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material
	}
	function f(a) {
		return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading === THREE.SmoothShading ? THREE.SmoothShading: THREE.FlatShading
	}
	function g(a) {
		return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof THREE.ShaderMaterial ? !0 : !1
	}
	function h(a) {
		xb[a] || (j.enableVertexAttribArray(a), xb[a] = !0)
	}
	function i() {
		for (var a in xb) xb[a] && (j.disableVertexAttribArray(a), xb[a] = !1)
	}
	function k(a, b) {
		return a.z !== b.z ? b.z - a.z: b.id - a.id
	}
	function l(a, b) {
		return b[0] - a[0]
	}
	function m(a, b, c) {
		if (a.length) for (var d = 0,
		e = a.length; d < e; d++) La = kb = null,
		lb = db = V = ha = Pa = na = $ = -1,
		yb = !0,
		a[d].render(b, c, Nb, Ob),
		La = kb = null,
		lb = db = V = ha = Pa = na = $ = -1,
		yb = !0
	}
	function p(a, b, c, d, e, f, g, h) {
		var j, i, k, m;
		b ? (i = a.length - 1, m = b = -1) : (i = 0, b = a.length, m = 1);
		for (var l = i; l !== b; l += m) if (j = a[l], j.render) {
			i = j.object;
			k = j.buffer;
			if (h) j = h;
			else {
				j = j[c];
				if (!j) continue;
				g && L.setBlending(j.blending, j.blendEquation, j.blendSrc, j.blendDst);
				L.setDepthTest(j.depthTest);
				L.setDepthWrite(j.depthWrite);
				I(j.polygonOffset, j.polygonOffsetFactor, j.polygonOffsetUnits)
			}
			L.setMaterialFaces(j);
			k instanceof THREE.BufferGeometry ? L.renderBufferDirect(d, e, f, j, k, i) : L.renderBuffer(d, e, f, j, k, i)
		}
	}
	function s(a, b, c, d, e, f, g) {
		for (var h, j, i = 0,
		k = a.length; i < k; i++) if (h = a[i], j = h.object, j.visible) {
			if (g) h = g;
			else {
				h = h[b];
				if (!h) continue;
				f && L.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
				L.setDepthTest(h.depthTest);
				L.setDepthWrite(h.depthWrite);
				I(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
			}
			L.renderImmediateObject(c, d, e, h, j)
		}
	}
	function r(a, b, c) {
		a.push({
			buffer: b,
			object: c,
			opaque: null,
			transparent: null
		})
	}
	function n(a) {
		for (var b in a.attributes) if (a.attributes[b].needsUpdate) return ! 0;
		return ! 1
	}
	function q(a) {
		for (var b in a.attributes) a.attributes[b].needsUpdate = !1
	}
	function z(a, b) {
		for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1)
	}
	function t(a, b) {
		for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1)
	}
	function x(a, b, c, d, e) {
		ea = 0;
		d.needsUpdate && (d.program && Yc(d), L.initMaterial(d, b, c, e), d.needsUpdate = !1);
		d.morphTargets && !e.__webglMorphTargetInfluences && (e.__webglMorphTargetInfluences = new Float32Array(L.maxMorphTargets));
		var f = !1,
		g = d.program,
		h = g.uniforms,
		i = d.uniforms;
		g !== kb && (j.useProgram(g), kb = g, f = !0);
		d.id !== lb && (lb = d.id, f = !0);
		if (f || a !== La) j.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements),
		a !== La && (La = a);
		if (d.skinning) if (Cc && e.useVertexTexture) {
			if (null !== h.boneTexture) {
				var k = u();
				j.uniform1i(h.boneTexture, k);
				L.setTexture(e.boneTexture, k)
			}
		} else null !== h.boneGlobalMatrices && j.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
		if (f) {
			c && d.fog && (i.fogColor.value = c.color, c instanceof THREE.Fog ? (i.fogNear.value = c.near, i.fogFar.value = c.far) : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density));
			if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
				if (yb) {
					for (var m, l = k = 0,
					p = 0,
					n, q, s, r = pb,
					t = r.directional.colors,
					x = r.directional.positions,
					w = r.point.colors,
					z = r.point.positions,
					A = r.point.distances,
					B = r.spot.colors,
					E = r.spot.positions,
					I = r.spot.distances,
					J = r.spot.directions,
					K = r.spot.anglesCos,
					M = r.spot.exponents,
					V = r.hemi.skyColors,
					N = r.hemi.groundColors,
					S = r.hemi.positions,
					ta = 0,
					U = 0,
					$ = 0,
					ha = 0,
					fa = 0,
					Oa = 0,
					ia = 0,
					$a = 0,
					ca = m = 0,
					c = s = ca = 0,
					f = b.length; c < f; c++) m = b[c],
					m.onlyShadow || (n = m.color, q = m.intensity, s = m.distance, m instanceof THREE.AmbientLight ? m.visible && (L.gammaInput ? (k += n.r * n.r, l += n.g * n.g, p += n.b * n.b) : (k += n.r, l += n.g, p += n.b)) : m instanceof THREE.DirectionalLight ? (fa += 1, m.visible && (xa.getPositionFromMatrix(m.matrixWorld), wa.getPositionFromMatrix(m.target.matrixWorld), xa.sub(wa), xa.normalize(), 0 === xa.x && 0 === xa.y && 0 === xa.z || (m = 3 * ta, x[m] = xa.x, x[m + 1] = xa.y, x[m + 2] = xa.z, L.gammaInput ? G(t, m, n, q * q) : D(t, m, n, q), ta += 1))) : m instanceof THREE.PointLight ? (Oa += 1, m.visible && (ca = 3 * U, L.gammaInput ? G(w, ca, n, q * q) : D(w, ca, n, q), wa.getPositionFromMatrix(m.matrixWorld), z[ca] = wa.x, z[ca + 1] = wa.y, z[ca + 2] = wa.z, A[U] = s, U += 1)) : m instanceof THREE.SpotLight ? (ia += 1, m.visible && (ca = 3 * $, L.gammaInput ? G(B, ca, n, q * q) : D(B, ca, n, q), wa.getPositionFromMatrix(m.matrixWorld), E[ca] = wa.x, E[ca + 1] = wa.y, E[ca + 2] = wa.z, I[$] = s, xa.copy(wa), wa.getPositionFromMatrix(m.target.matrixWorld), xa.sub(wa), xa.normalize(), J[ca] = xa.x, J[ca + 1] = xa.y, J[ca + 2] = xa.z, K[$] = Math.cos(m.angle), M[$] = m.exponent, $ += 1)) : m instanceof THREE.HemisphereLight && ($a += 1, m.visible && (xa.getPositionFromMatrix(m.matrixWorld), xa.normalize(), 0 === xa.x && 0 === xa.y && 0 === xa.z || (s = 3 * ha, S[s] = xa.x, S[s + 1] = xa.y, S[s + 2] = xa.z, n = m.color, m = m.groundColor, L.gammaInput ? (q *= q, G(V, s, n, q), G(N, s, m, q)) : (D(V, s, n, q), D(N, s, m, q)), ha += 1))));
					c = 3 * ta;
					for (f = Math.max(t.length, 3 * fa); c < f; c++) t[c] = 0;
					c = 3 * U;
					for (f = Math.max(w.length, 3 * Oa); c < f; c++) w[c] = 0;
					c = 3 * $;
					for (f = Math.max(B.length, 3 * ia); c < f; c++) B[c] = 0;
					c = 3 * ha;
					for (f = Math.max(V.length, 3 * $a); c < f; c++) V[c] = 0;
					c = 3 * ha;
					for (f = Math.max(N.length, 3 * $a); c < f; c++) N[c] = 0;
					r.directional.length = ta;
					r.point.length = U;
					r.spot.length = $;
					r.hemi.length = ha;
					r.ambient[0] = k;
					r.ambient[1] = l;
					r.ambient[2] = p;
					yb = !1
				}
				c = pb;
				i.ambientLightColor.value = c.ambient;
				i.directionalLightColor.value = c.directional.colors;
				i.directionalLightDirection.value = c.directional.positions;
				i.pointLightColor.value = c.point.colors;
				i.pointLightPosition.value = c.point.positions;
				i.pointLightDistance.value = c.point.distances;
				i.spotLightColor.value = c.spot.colors;
				i.spotLightPosition.value = c.spot.positions;
				i.spotLightDistance.value = c.spot.distances;
				i.spotLightDirection.value = c.spot.directions;
				i.spotLightAngleCos.value = c.spot.anglesCos;
				i.spotLightExponent.value = c.spot.exponents;
				i.hemisphereLightSkyColor.value = c.hemi.skyColors;
				i.hemisphereLightGroundColor.value = c.hemi.groundColors;
				i.hemisphereLightDirection.value = c.hemi.positions
			}
			if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) {
				i.opacity.value = d.opacity;
				L.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse.value = d.color;
				i.map.value = d.map;
				i.lightMap.value = d.lightMap;
				i.specularMap.value = d.specularMap;
				d.bumpMap && (i.bumpMap.value = d.bumpMap, i.bumpScale.value = d.bumpScale);
				d.normalMap && (i.normalMap.value = d.normalMap, i.normalScale.value.copy(d.normalScale));
				var Y;
				d.map ? Y = d.map: d.specularMap ? Y = d.specularMap: d.normalMap ? Y = d.normalMap: d.bumpMap && (Y = d.bumpMap);
				void 0 !== Y && (c = Y.offset, Y = Y.repeat, i.offsetRepeat.value.set(c.x, c.y, Y.x, Y.y));
				i.envMap.value = d.envMap;
				i.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
				i.reflectivity.value = d.reflectivity;
				i.refractionRatio.value = d.refractionRatio;
				i.combine.value = d.combine;
				i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
			}
			d instanceof THREE.LineBasicMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity) : d instanceof THREE.LineDashedMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity, i.dashSize.value = d.dashSize, i.totalSize.value = d.dashSize + d.gapSize, i.scale.value = d.scale) : d instanceof THREE.ParticleBasicMaterial ? (i.psColor.value = d.color, i.opacity.value = d.opacity, i.size.value = d.size, i.scale.value = H.height / 2, i.map.value = d.map) : d instanceof THREE.MeshPhongMaterial ? (i.shininess.value = d.shininess, L.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive), i.specular.value.copyGammaToLinear(d.specular)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive, i.specular.value = d.specular), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshLambertMaterial ? (L.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshDepthMaterial ? (i.mNear.value = a.near, i.mFar.value = a.far, i.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (i.opacity.value = d.opacity);
			if (e.receiveShadow && !d._shadowPass && i.shadowMatrix) {
				c = Y = 0;
				for (f = b.length; c < f; c++) if (k = b[c], k.castShadow && (k instanceof THREE.SpotLight || k instanceof THREE.DirectionalLight && !k.shadowCascade)) i.shadowMap.value[Y] = k.shadowMap,
				i.shadowMapSize.value[Y] = k.shadowMapSize,
				i.shadowMatrix.value[Y] = k.shadowMatrix,
				i.shadowDarkness.value[Y] = k.shadowDarkness,
				i.shadowBias.value[Y] = k.shadowBias,
				Y++
			}
			b = d.uniformsList;
			i = 0;
			for (Y = b.length; i < Y; i++) if (f = g.uniforms[b[i][1]]) if (c = b[i][0], l = c.type, k = c.value, "i" === l) j.uniform1i(f, k);
			else if ("f" === l) j.uniform1f(f, k);
			else if ("v2" === l) j.uniform2f(f, k.x, k.y);
			else if ("v3" === l) j.uniform3f(f, k.x, k.y, k.z);
			else if ("v4" === l) j.uniform4f(f, k.x, k.y, k.z, k.w);
			else if ("c" === l) j.uniform3f(f, k.r, k.g, k.b);
			else if ("iv1" === l) j.uniform1iv(f, k);
			else if ("iv" === l) j.uniform3iv(f, k);
			else if ("fv1" === l) j.uniform1fv(f, k);
			else if ("fv" === l) j.uniform3fv(f, k);
			else if ("v2v" === l) {
				void 0 === c._array && (c._array = new Float32Array(2 * k.length));
				l = 0;
				for (p = k.length; l < p; l++) r = 2 * l,
				c._array[r] = k[l].x,
				c._array[r + 1] = k[l].y;
				j.uniform2fv(f, c._array)
			} else if ("v3v" === l) {
				void 0 === c._array && (c._array = new Float32Array(3 * k.length));
				l = 0;
				for (p = k.length; l < p; l++) r = 3 * l,
				c._array[r] = k[l].x,
				c._array[r + 1] = k[l].y,
				c._array[r + 2] = k[l].z;
				j.uniform3fv(f, c._array)
			} else if ("v4v" === l) {
				void 0 === c._array && (c._array = new Float32Array(4 * k.length));
				l = 0;
				for (p = k.length; l < p; l++) r = 4 * l,
				c._array[r] = k[l].x,
				c._array[r + 1] = k[l].y,
				c._array[r + 2] = k[l].z,
				c._array[r + 3] = k[l].w;
				j.uniform4fv(f, c._array)
			} else if ("m4" === l) void 0 === c._array && (c._array = new Float32Array(16)),
			k.flattenToArray(c._array),
			j.uniformMatrix4fv(f, !1, c._array);
			else if ("m4v" === l) {
				void 0 === c._array && (c._array = new Float32Array(16 * k.length));
				l = 0;
				for (p = k.length; l < p; l++) k[l].flattenToArrayOffset(c._array, 16 * l);
				j.uniformMatrix4fv(f, !1, c._array)
			} else if ("t" === l) {
				if (r = k, k = u(), j.uniform1i(f, k), r) if (r.image instanceof Array && 6 === r.image.length) {
					if (c = r, f = k, 6 === c.image.length) if (c.needsUpdate) {
						c.image.__webglTextureCube || (c.image.__webglTextureCube = j.createTexture(), L.info.memory.textures++);
						j.activeTexture(j.TEXTURE0 + f);
						j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube);
						j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, c.flipY);
						f = c instanceof THREE.CompressedTexture;
						k = [];
						for (l = 0; 6 > l; l++) L.autoScaleCubemaps && !f ? (p = k, r = l, t = c.image[l], w = pd, t.width <= w && t.height <= w || (z = Math.max(t.width, t.height), x = Math.floor(t.width * w / z), w = Math.floor(t.height * w / z), z = document.createElement("canvas"), z.width = x, z.height = w, z.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, x, w), t = z), p[r] = t) : k[l] = c.image[l];
						l = k[0];
						p = 0 === (l.width & l.width - 1) && 0 === (l.height & l.height - 1);
						r = F(c.format);
						t = F(c.type);
						Z(j.TEXTURE_CUBE_MAP, c, p);
						for (l = 0; 6 > l; l++) if (f) {
							w = k[l].mipmaps;
							z = 0;
							for (A = w.length; z < A; z++) x = w[z],
							j.compressedTexImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, z, r, x.width, x.height, 0, x.data)
						} else j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, r, r, t, k[l]);
						c.generateMipmaps && p && j.generateMipmap(j.TEXTURE_CUBE_MAP);
						c.needsUpdate = !1;
						if (c.onUpdate) c.onUpdate()
					} else j.activeTexture(j.TEXTURE0 + f),
					j.bindTexture(j.TEXTURE_CUBE_MAP, c.image.__webglTextureCube)
				} else r instanceof THREE.WebGLRenderTargetCube ? (c = r, j.activeTexture(j.TEXTURE0 + k), j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture)) : L.setTexture(r, k)
			} else if ("tv" === l) {
				void 0 === c._array && (c._array = []);
				l = 0;
				for (p = c.value.length; l < p; l++) c._array[l] = u();
				j.uniform1iv(f, c._array);
				l = 0;
				for (p = c.value.length; l < p; l++) r = c.value[l],
				k = c._array[l],
				r && L.setTexture(r, k)
			}
			if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== h.cameraPosition) wa.getPositionFromMatrix(a.matrixWorld),
			j.uniform3f(h.cameraPosition, wa.x, wa.y, wa.z); (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && null !== h.viewMatrix && j.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements)
		}
		j.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements);
		h.normalMatrix && j.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements);
		null !== h.modelMatrix && j.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements);
		return g
	}
	function u() {
		var a = ea;
		a >= Ib && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + Ib);
		ea += 1;
		return a
	}
	function B(a, b) {
		a._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, a.matrixWorld);
		a._normalMatrix.getInverse(a._modelViewMatrix);
		a._normalMatrix.transpose()
	}
	function G(a, b, c, d) {
		a[b] = c.r * c.r * d;
		a[b + 1] = c.g * c.g * d;
		a[b + 2] = c.b * c.b * d
	}
	function D(a, b, c, d) {
		a[b] = c.r * d;
		a[b + 1] = c.g * d;
		a[b + 2] = c.b * d
	}
	function w(a) {
		a !== Sa && (j.lineWidth(a), Sa = a)
	}
	function I(a, b, c) {
		Ba !== a && (a ? j.enable(j.POLYGON_OFFSET_FILL) : j.disable(j.POLYGON_OFFSET_FILL), Ba = a);
		if (a && (fb !== b || jb !== c)) j.polygonOffset(b, c),
		fb = b,
		jb = c
	}
	function J(a) {
		for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++) a[b] = b + 1 + ": " + a[b];
		return a.join("\n")
	}
	function E(a, b) {
		var c;
		"fragment" === a ? c = j.createShader(j.FRAGMENT_SHADER) : "vertex" === a && (c = j.createShader(j.VERTEX_SHADER));
		j.shaderSource(c, b);
		j.compileShader(c);
		return ! j.getShaderParameter(c, j.COMPILE_STATUS) ? (console.error(j.getShaderInfoLog(c)), console.error(J(b)), null) : c
	}
	function Z(a, b, c) {
		c ? (j.texParameteri(a, j.TEXTURE_WRAP_S, F(b.wrapS)), j.texParameteri(a, j.TEXTURE_WRAP_T, F(b.wrapT)), j.texParameteri(a, j.TEXTURE_MAG_FILTER, F(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, F(b.minFilter))) : (j.texParameteri(a, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE), j.texParameteri(a, j.TEXTURE_MAG_FILTER, S(b.magFilter)), j.texParameteri(a, j.TEXTURE_MIN_FILTER, S(b.minFilter)));
		if (Wa && b.type !== THREE.FloatType && (1 < b.anisotropy || b.__oldAnisotropy)) j.texParameterf(a, Wa.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Wc)),
		b.__oldAnisotropy = b.anisotropy
	}
	function A(a, b) {
		j.bindRenderbuffer(j.RENDERBUFFER, a);
		b.depthBuffer && !b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_COMPONENT16, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (j.renderbufferStorage(j.RENDERBUFFER, j.DEPTH_STENCIL, b.width, b.height), j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a)) : j.renderbufferStorage(j.RENDERBUFFER, j.RGBA4, b.width, b.height)
	}
	function S(a) {
		return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter || a === THREE.NearestMipMapLinearFilter ? j.NEAREST: j.LINEAR
	}
	function F(a) {
		if (a === THREE.RepeatWrapping) return j.REPEAT;
		if (a === THREE.ClampToEdgeWrapping) return j.CLAMP_TO_EDGE;
		if (a === THREE.MirroredRepeatWrapping) return j.MIRRORED_REPEAT;
		if (a === THREE.NearestFilter) return j.NEAREST;
		if (a === THREE.NearestMipMapNearestFilter) return j.NEAREST_MIPMAP_NEAREST;
		if (a === THREE.NearestMipMapLinearFilter) return j.NEAREST_MIPMAP_LINEAR;
		if (a === THREE.LinearFilter) return j.LINEAR;
		if (a === THREE.LinearMipMapNearestFilter) return j.LINEAR_MIPMAP_NEAREST;
		if (a === THREE.LinearMipMapLinearFilter) return j.LINEAR_MIPMAP_LINEAR;
		if (a === THREE.UnsignedByteType) return j.UNSIGNED_BYTE;
		if (a === THREE.UnsignedShort4444Type) return j.UNSIGNED_SHORT_4_4_4_4;
		if (a === THREE.UnsignedShort5551Type) return j.UNSIGNED_SHORT_5_5_5_1;
		if (a === THREE.UnsignedShort565Type) return j.UNSIGNED_SHORT_5_6_5;
		if (a === THREE.ByteType) return j.BYTE;
		if (a === THREE.ShortType) return j.SHORT;
		if (a === THREE.UnsignedShortType) return j.UNSIGNED_SHORT;
		if (a === THREE.IntType) return j.INT;
		if (a === THREE.UnsignedIntType) return j.UNSIGNED_INT;
		if (a === THREE.FloatType) return j.FLOAT;
		if (a === THREE.AlphaFormat) return j.ALPHA;
		if (a === THREE.RGBFormat) return j.RGB;
		if (a === THREE.RGBAFormat) return j.RGBA;
		if (a === THREE.LuminanceFormat) return j.LUMINANCE;
		if (a === THREE.LuminanceAlphaFormat) return j.LUMINANCE_ALPHA;
		if (a === THREE.AddEquation) return j.FUNC_ADD;
		if (a === THREE.SubtractEquation) return j.FUNC_SUBTRACT;
		if (a === THREE.ReverseSubtractEquation) return j.FUNC_REVERSE_SUBTRACT;
		if (a === THREE.ZeroFactor) return j.ZERO;
		if (a === THREE.OneFactor) return j.ONE;
		if (a === THREE.SrcColorFactor) return j.SRC_COLOR;
		if (a === THREE.OneMinusSrcColorFactor) return j.ONE_MINUS_SRC_COLOR;
		if (a === THREE.SrcAlphaFactor) return j.SRC_ALPHA;
		if (a === THREE.OneMinusSrcAlphaFactor) return j.ONE_MINUS_SRC_ALPHA;
		if (a === THREE.DstAlphaFactor) return j.DST_ALPHA;
		if (a === THREE.OneMinusDstAlphaFactor) return j.ONE_MINUS_DST_ALPHA;
		if (a === THREE.DstColorFactor) return j.DST_COLOR;
		if (a === THREE.OneMinusDstColorFactor) return j.ONE_MINUS_DST_COLOR;
		if (a === THREE.SrcAlphaSaturateFactor) return j.SRC_ALPHA_SATURATE;
		if (void 0 !== Ga) {
			if (a === THREE.RGB_S3TC_DXT1_Format) return Ga.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (a === THREE.RGBA_S3TC_DXT1_Format) return Ga.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (a === THREE.RGBA_S3TC_DXT3_Format) return Ga.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (a === THREE.RGBA_S3TC_DXT5_Format) return Ga.COMPRESSED_RGBA_S3TC_DXT5_EXT
		}
		return 0
	}
	console.log("THREE.WebGLRenderer", THREE.REVISION);
	var a = a || {},
	H = void 0 !== a.canvas ? a.canvas: document.createElement("canvas"),
	K = void 0 !== a.precision ? a.precision: "highp",
	N = void 0 !== a.alpha ? a.alpha: !0,
	fa = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha: !0,
	ma = void 0 !== a.antialias ? a.antialias: !1,
	eb = void 0 !== a.stencil ? a.stencil: !0,
	M = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer: !1,
	U = void 0 !== a.clearColor ? new THREE.Color(a.clearColor) : new THREE.Color(0),
	ja = void 0 !== a.clearAlpha ? a.clearAlpha: 0;
	this.domElement = H;
	this.context = null;
	this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio: void 0 !== window.devicePixelRatio ? window.devicePixelRatio: 1;
	this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
	this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1;
	this.shadowMapAutoUpdate = !0;
	this.shadowMapType = THREE.PCFShadowMap;
	this.shadowMapCullFace = THREE.CullFaceFront;
	this.shadowMapCascade = this.shadowMapDebug = !1;
	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;
	this.autoScaleCubemaps = !0;
	this.renderPluginsPre = [];
	this.renderPluginsPost = [];
	this.info = {
		memory: {
			programs: 0,
			geometries: 0,
			textures: 0
		},
		render: {
			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0
		}
	};
	var L = this,
	ca = [],
	ta = 0,
	kb = null,
	$a = null,
	lb = -1,
	db = null,
	La = null,
	Oa = 0,
	ea = 0,
	ha = -1,
	V = -1,
	$ = -1,
	Y = -1,
	ia = -1,
	ra = -1,
	na = -1,
	Pa = -1,
	Ba = null,
	fb = null,
	jb = null,
	Sa = null,
	ob = 0,
	Gb = 0,
	Mb = 0,
	wb = 0,
	Nb = 0,
	Ob = 0,
	xb = {},
	Hb = new THREE.Frustum,
	Qa = new THREE.Matrix4,
	Va = new THREE.Matrix4,
	wa = new THREE.Vector3,
	xa = new THREE.Vector3,
	yb = !0,
	pb = {
		ambient: [0, 0, 0],
		directional: {
			length: 0,
			colors: [],
			positions: []
		},
		point: {
			length: 0,
			colors: [],
			positions: [],
			distances: []
		},
		spot: {
			length: 0,
			colors: [],
			positions: [],
			distances: [],
			directions: [],
			anglesCos: [],
			exponents: []
		},
		hemi: {
			length: 0,
			skyColors: [],
			groundColors: [],
			positions: []
		}
	},
	j,
	mb,
	vb,
	Wa,
	Ga;
	try {
		if (! (j = H.getContext("experimental-webgl", {
			alpha: N,
			premultipliedAlpha: fa,
			antialias: ma,
			stencil: eb,
			preserveDrawingBuffer: M
		}))) throw "Error creating WebGL context.";
	} catch(zb) {
		console.error(zb)
	}
	mb = j.getExtension("OES_texture_float");
	vb = j.getExtension("OES_standard_derivatives");
	Wa = j.getExtension("EXT_texture_filter_anisotropic") || j.getExtension("MOZ_EXT_texture_filter_anisotropic") || j.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
	Ga = j.getExtension("WEBGL_compressed_texture_s3tc") || j.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || j.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
	mb || console.log("THREE.WebGLRenderer: Float textures not supported.");
	vb || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
	Wa || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");
	Ga || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
	void 0 === j.getShaderPrecisionFormat && (j.getShaderPrecisionFormat = function() {
		return {
			rangeMin: 1,
			rangeMax: 1,
			precision: 1
		}
	});
	j.clearColor(0, 0, 0, 1);
	j.clearDepth(1);
	j.clearStencil(0);
	j.enable(j.DEPTH_TEST);
	j.depthFunc(j.LEQUAL);
	j.frontFace(j.CCW);
	j.cullFace(j.BACK);
	j.enable(j.CULL_FACE);
	j.enable(j.BLEND);
	j.blendEquation(j.FUNC_ADD);
	j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA);
	j.clearColor(U.r, U.g, U.b, ja);
	this.context = j;
	var Ib = j.getParameter(j.MAX_TEXTURE_IMAGE_UNITS),
	a = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
	j.getParameter(j.MAX_TEXTURE_SIZE);
	var pd = j.getParameter(j.MAX_CUBE_MAP_TEXTURE_SIZE),
	Wc = Wa ? j.getParameter(Wa.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
	Bc = 0 < a,
	Cc = Bc && mb;
	Ga && j.getParameter(j.COMPRESSED_TEXTURE_FORMATS);
	fa = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_FLOAT);
	a = j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_FLOAT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_FLOAT);
	ma = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_FLOAT);
	N = j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_FLOAT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_FLOAT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.HIGH_INT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.MEDIUM_INT);
	j.getShaderPrecisionFormat(j.VERTEX_SHADER, j.LOW_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.HIGH_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.MEDIUM_INT);
	j.getShaderPrecisionFormat(j.FRAGMENT_SHADER, j.LOW_INT);
	fa = 0 < fa.precision && 0 < ma.precision;
	a = 0 < a.precision && 0 < N.precision;
	"highp" === K && !fa && (a ? (K = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (K = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));
	"mediump" === K && !a && (K = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp"));
	this.getContext = function() {
		return j
	};
	this.supportsVertexTextures = function() {
		return Bc
	};
	this.supportsFloatTextures = function() {
		return mb
	};
	this.supportsStandardDerivatives = function() {
		return vb
	};
	this.supportsCompressedTextureS3TC = function() {
		return Ga
	};
	this.getMaxAnisotropy = function() {
		return Wc
	};
	this.getPrecision = function() {
		return K
	};
	this.setSize = function(a, b) {
		H.width = a * this.devicePixelRatio;
		H.height = b * this.devicePixelRatio;
		H.style.width = a + "px";
		H.style.height = b + "px";
		this.setViewport(0, 0, H.width, H.height)
	};
	this.setViewport = function(a, b, c, d) {
		ob = void 0 !== a ? a: 0;
		Gb = void 0 !== b ? b: 0;
		Mb = void 0 !== c ? c: H.width;
		wb = void 0 !== d ? d: H.height;
		j.viewport(ob, Gb, Mb, wb)
	};
	this.setScissor = function(a, b, c, d) {
		j.scissor(a, b, c, d)
	};
	this.enableScissorTest = function(a) {
		a ? j.enable(j.SCISSOR_TEST) : j.disable(j.SCISSOR_TEST)
	};
	this.setClearColorHex = function(a, b) {
		U.setHex(a);
		ja = b;
		j.clearColor(U.r, U.g, U.b, ja)
	};
	this.setClearColor = function(a, b) {
		U.copy(a);
		ja = b;
		j.clearColor(U.r, U.g, U.b, ja)
	};
	this.getClearColor = function() {
		return U
	};
	this.getClearAlpha = function() {
		return ja
	};
	this.clear = function(a, b, c) {
		var d = 0;
		if (void 0 === a || a) d |= j.COLOR_BUFFER_BIT;
		if (void 0 === b || b) d |= j.DEPTH_BUFFER_BIT;
		if (void 0 === c || c) d |= j.STENCIL_BUFFER_BIT;
		j.clear(d)
	};
	this.clearTarget = function(a, b, c, d) {
		this.setRenderTarget(a);
		this.clear(b, c, d)
	};
	this.addPostPlugin = function(a) {
		a.init(this);
		this.renderPluginsPost.push(a)
	};
	this.addPrePlugin = function(a) {
		a.init(this);
		this.renderPluginsPre.push(a)
	};
	this.updateShadowMap = function(a, b) {
		kb = null;
		lb = db = Pa = na = $ = -1;
		yb = !0;
		V = ha = -1;
		this.shadowMapPlugin.update(a, b)
	};
	var Bd = function(a) {
		a = a.target;
		a.removeEventListener("dispose", Bd);
		a.__webglInit = void 0;
		void 0 !== a.__webglVertexBuffer && j.deleteBuffer(a.__webglVertexBuffer);
		void 0 !== a.__webglNormalBuffer && j.deleteBuffer(a.__webglNormalBuffer);
		void 0 !== a.__webglTangentBuffer && j.deleteBuffer(a.__webglTangentBuffer);
		void 0 !== a.__webglColorBuffer && j.deleteBuffer(a.__webglColorBuffer);
		void 0 !== a.__webglUVBuffer && j.deleteBuffer(a.__webglUVBuffer);
		void 0 !== a.__webglUV2Buffer && j.deleteBuffer(a.__webglUV2Buffer);
		void 0 !== a.__webglSkinIndicesBuffer && j.deleteBuffer(a.__webglSkinIndicesBuffer);
		void 0 !== a.__webglSkinWeightsBuffer && j.deleteBuffer(a.__webglSkinWeightsBuffer);
		void 0 !== a.__webglFaceBuffer && j.deleteBuffer(a.__webglFaceBuffer);
		void 0 !== a.__webglLineBuffer && j.deleteBuffer(a.__webglLineBuffer);
		void 0 !== a.__webglLineDistanceBuffer && j.deleteBuffer(a.__webglLineDistanceBuffer);
		if (void 0 !== a.geometryGroups) for (var c in a.geometryGroups) {
			var d = a.geometryGroups[c];
			if (void 0 !== d.numMorphTargets) for (var e = 0,
			f = d.numMorphTargets; e < f; e++) j.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
			if (void 0 !== d.numMorphNormals) {
				e = 0;
				for (f = d.numMorphNormals; e < f; e++) j.deleteBuffer(d.__webglMorphNormalsBuffers[e])
			}
			b(d)
		}
		b(a);
		L.info.memory.geometries--
	},
	Zc = function(a) {
		a = a.target;
		a.removeEventListener("dispose", Zc);
		a.image && a.image.__webglTextureCube ? j.deleteTexture(a.image.__webglTextureCube) : a.__webglInit && (a.__webglInit = !1, j.deleteTexture(a.__webglTexture));
		L.info.memory.textures--
	},
	Jc = function(a) {
		a = a.target;
		a.removeEventListener("dispose", Jc);
		if (a && a.__webglTexture) if (j.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube) for (var b = 0; 6 > b; b++) j.deleteFramebuffer(a.__webglFramebuffer[b]),
		j.deleteRenderbuffer(a.__webglRenderbuffer[b]);
		else j.deleteFramebuffer(a.__webglFramebuffer),
		j.deleteRenderbuffer(a.__webglRenderbuffer);
		L.info.memory.textures--
	},
	Xc = function(a) {
		a = a.target;
		a.removeEventListener("dispose", Xc);
		Yc(a)
	},
	Yc = function(a) {
		var b = a.program;
		if (void 0 !== b) {
			a.program = void 0;
			var c, d, e = !1,
			a = 0;
			for (c = ca.length; a < c; a++) if (d = ca[a], d.program === b) {
				d.usedTimes--;
				0 === d.usedTimes && (e = !0);
				break
			}
			if (!0 === e) {
				e = [];
				a = 0;
				for (c = ca.length; a < c; a++) d = ca[a],
				d.program !== b && e.push(d);
				ca = e;
				j.deleteProgram(b);
				L.info.memory.programs--
			}
		}
	};
	this.renderBufferImmediate = function(a, b, c) {
		a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = j.createBuffer());
		a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = j.createBuffer());
		a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = j.createBuffer());
		a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = j.createBuffer());
		a.hasPositions && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglVertexBuffer), j.bufferData(j.ARRAY_BUFFER, a.positionArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.position), j.vertexAttribPointer(b.attributes.position, 3, j.FLOAT, !1, 0, 0));
		if (a.hasNormals) {
			j.bindBuffer(j.ARRAY_BUFFER, a.__webglNormalBuffer);
			if (c.shading === THREE.FlatShading) {
				var d, e, f, g, h, i, k, l, m, p, n, q = 3 * a.count;
				for (n = 0; n < q; n += 9) p = a.normalArray,
				d = p[n],
				e = p[n + 1],
				f = p[n + 2],
				g = p[n + 3],
				i = p[n + 4],
				l = p[n + 5],
				h = p[n + 6],
				k = p[n + 7],
				m = p[n + 8],
				d = (d + g + h) / 3,
				e = (e + i + k) / 3,
				f = (f + l + m) / 3,
				p[n] = d,
				p[n + 1] = e,
				p[n + 2] = f,
				p[n + 3] = d,
				p[n + 4] = e,
				p[n + 5] = f,
				p[n + 6] = d,
				p[n + 7] = e,
				p[n + 8] = f
			}
			j.bufferData(j.ARRAY_BUFFER, a.normalArray, j.DYNAMIC_DRAW);
			j.enableVertexAttribArray(b.attributes.normal);
			j.vertexAttribPointer(b.attributes.normal, 3, j.FLOAT, !1, 0, 0)
		}
		a.hasUvs && c.map && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglUvBuffer), j.bufferData(j.ARRAY_BUFFER, a.uvArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.uv), j.vertexAttribPointer(b.attributes.uv, 2, j.FLOAT, !1, 0, 0));
		a.hasColors && c.vertexColors !== THREE.NoColors && (j.bindBuffer(j.ARRAY_BUFFER, a.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, a.colorArray, j.DYNAMIC_DRAW), j.enableVertexAttribArray(b.attributes.color), j.vertexAttribPointer(b.attributes.color, 3, j.FLOAT, !1, 0, 0));
		j.drawArrays(j.TRIANGLES, 0, a.count);
		a.count = 0
	};
	this.renderBufferDirect = function(a, b, c, d, e, f) {
		if (!1 !== d.visible) {
			var g, k, l;
			g = x(a, b, c, d, f);
			a = g.attributes;
			b = e.attributes;
			c = !1;
			g = 16777215 * e.id + 2 * g.id + (d.wireframe ? 1 : 0);
			g !== db && (db = g, c = !0);
			c && i();
			if (f instanceof THREE.Mesh) if (d = b.index) {
				e = e.offsets;
				1 < e.length && (c = !0);
				for (var m = 0,
				p = e.length; m < p; m++) {
					var n = e[m].index;
					if (c) {
						for (k in b)"index" !== k && (g = a[k], f = b[k], l = f.itemSize, 0 <= g && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), h(g), j.vertexAttribPointer(g, l, j.FLOAT, !1, 0, 4 * n * l)));
						j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, d.buffer)
					}
					j.drawElements(j.TRIANGLES, e[m].count, j.UNSIGNED_SHORT, 2 * e[m].start);
					L.info.render.calls++;
					L.info.render.vertices += e[m].count;
					L.info.render.faces += e[m].count / 3
				}
			} else {
				if (c) for (k in b)"index" !== k && (g = a[k], f = b[k], l = f.itemSize, 0 <= g && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), h(g), j.vertexAttribPointer(g, l, j.FLOAT, !1, 0, 0)));
				k = e.attributes.position;
				j.drawArrays(j.TRIANGLES, 0, k.numItems / 3);
				L.info.render.calls++;
				L.info.render.vertices += k.numItems / 3;
				L.info.render.faces += k.numItems / 3 / 3
			} else if (f instanceof THREE.ParticleSystem) {
				if (c) {
					for (k in b) g = a[k],
					f = b[k],
					l = f.itemSize,
					0 <= g && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), h(g), j.vertexAttribPointer(g, l, j.FLOAT, !1, 0, 0));
					k = b.position;
					j.drawArrays(j.POINTS, 0, k.numItems / 3);
					L.info.render.calls++;
					L.info.render.points += k.numItems / 3
				}
			} else if (f instanceof THREE.Line && c) {
				for (k in b) g = a[k],
				f = b[k],
				l = f.itemSize,
				0 <= g && (j.bindBuffer(j.ARRAY_BUFFER, f.buffer), h(g), j.vertexAttribPointer(g, l, j.FLOAT, !1, 0, 0));
				w(d.linewidth);
				k = b.position;
				j.drawArrays(j.LINE_STRIP, 0, k.numItems / 3);
				L.info.render.calls++;
				L.info.render.points += k.numItems
			}
		}
	};
	this.renderBuffer = function(a, b, c, d, e, f) {
		if (!1 !== d.visible) {
			var g, k, c = x(a, b, c, d, f),
			a = c.attributes,
			b = !1,
			c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
			c !== db && (db = c, b = !0);
			b && i();
			if (!d.morphTargets && 0 <= a.position) b && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), h(a.position), j.vertexAttribPointer(a.position, 3, j.FLOAT, !1, 0, 0));
			else if (f.morphTargetBase) {
				c = d.program.attributes; - 1 !== f.morphTargetBase && 0 <= c.position ? (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), h(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0)) : 0 <= c.position && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglVertexBuffer), h(c.position), j.vertexAttribPointer(c.position, 3, j.FLOAT, !1, 0, 0));
				if (f.morphTargetForcedOrder.length) {
					var m = 0;
					k = f.morphTargetForcedOrder;
					for (g = f.morphTargetInfluences; m < d.numSupportedMorphTargets && m < k.length;) 0 <= c["morphTarget" + m] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[k[m]]), h(c["morphTarget" + m]), j.vertexAttribPointer(c["morphTarget" + m], 3, j.FLOAT, !1, 0, 0)),
					0 <= c["morphNormal" + m] && d.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[k[m]]), h(c["morphNormal" + m]), j.vertexAttribPointer(c["morphNormal" + m], 3, j.FLOAT, !1, 0, 0)),
					f.__webglMorphTargetInfluences[m] = g[k[m]],
					m++
				} else {
					k = [];
					g = f.morphTargetInfluences;
					var p, n = g.length;
					for (p = 0; p < n; p++) m = g[p],
					0 < m && k.push([m, p]);
					k.length > d.numSupportedMorphTargets ? (k.sort(l), k.length = d.numSupportedMorphTargets) : k.length > d.numSupportedMorphNormals ? k.sort(l) : 0 === k.length && k.push([0, 0]);
					for (m = 0; m < d.numSupportedMorphTargets;) k[m] ? (p = k[m][1], 0 <= c["morphTarget" + m] && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[p]), h(c["morphTarget" + m]), j.vertexAttribPointer(c["morphTarget" + m], 3, j.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + m] && d.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[p]), h(c["morphNormal" + m]), j.vertexAttribPointer(c["morphNormal" + m], 3, j.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[m] = g[p]) : f.__webglMorphTargetInfluences[m] = 0,
					m++
				}
				null !== d.program.uniforms.morphTargetInfluences && j.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
			}
			if (b) {
				if (e.__webglCustomAttributesList) {
					g = 0;
					for (k = e.__webglCustomAttributesList.length; g < k; g++) c = e.__webglCustomAttributesList[g],
					0 <= a[c.buffer.belongsToAttribute] && (j.bindBuffer(j.ARRAY_BUFFER, c.buffer), h(a[c.buffer.belongsToAttribute]), j.vertexAttribPointer(a[c.buffer.belongsToAttribute], c.size, j.FLOAT, !1, 0, 0))
				}
				0 <= a.color && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglColorBuffer), h(a.color), j.vertexAttribPointer(a.color, 3, j.FLOAT, !1, 0, 0));
				0 <= a.normal && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglNormalBuffer), h(a.normal), j.vertexAttribPointer(a.normal, 3, j.FLOAT, !1, 0, 0));
				0 <= a.tangent && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglTangentBuffer), h(a.tangent), j.vertexAttribPointer(a.tangent, 4, j.FLOAT, !1, 0, 0));
				0 <= a.uv && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUVBuffer), h(a.uv), j.vertexAttribPointer(a.uv, 2, j.FLOAT, !1, 0, 0));
				0 <= a.uv2 && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglUV2Buffer), h(a.uv2), j.vertexAttribPointer(a.uv2, 2, j.FLOAT, !1, 0, 0));
				d.skinning && (0 <= a.skinIndex && 0 <= a.skinWeight) && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), h(a.skinIndex), j.vertexAttribPointer(a.skinIndex, 4, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), h(a.skinWeight), j.vertexAttribPointer(a.skinWeight, 4, j.FLOAT, !1, 0, 0));
				0 <= a.lineDistance && (j.bindBuffer(j.ARRAY_BUFFER, e.__webglLineDistanceBuffer), h(a.lineDistance), j.vertexAttribPointer(a.lineDistance, 1, j.FLOAT, !1, 0, 0))
			}
			f instanceof THREE.Mesh ? (d.wireframe ? (w(d.wireframeLinewidth), b && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), j.drawElements(j.LINES, e.__webglLineCount, j.UNSIGNED_SHORT, 0)) : (b && j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), j.drawElements(j.TRIANGLES, e.__webglFaceCount, j.UNSIGNED_SHORT, 0)), L.info.render.calls++, L.info.render.vertices += e.__webglFaceCount, L.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? j.LINE_STRIP: j.LINES, w(d.linewidth), j.drawArrays(f, 0, e.__webglLineCount), L.info.render.calls++) : f instanceof THREE.ParticleSystem ? (j.drawArrays(j.POINTS, 0, e.__webglParticleCount), L.info.render.calls++, L.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (j.drawArrays(j.TRIANGLE_STRIP, 0, e.__webglVertexCount), L.info.render.calls++)
		}
	};
	this.render = function(a, b, c, d) {
		if (!1 === b instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
		else {
			var e, f, g, h, i = a.__lights,
			l = a.fog;
			lb = -1;
			yb = !0;
			this.autoUpdateScene && a.updateMatrixWorld();
			void 0 === b.parent && b.updateMatrixWorld();
			b.matrixWorldInverse.getInverse(b.matrixWorld);
			Qa.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
			Hb.setFromMatrix(Qa);
			this.autoUpdateObjects && this.initWebGLObjects(a);
			m(this.renderPluginsPre, a, b);
			L.info.render.calls = 0;
			L.info.render.vertices = 0;
			L.info.render.faces = 0;
			L.info.render.points = 0;
			this.setRenderTarget(c); (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
			h = a.__webglObjects;
			d = 0;
			for (e = h.length; d < e; d++) if (f = h[d], g = f.object, f.render = !1, g.visible && (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) || !g.frustumCulled || Hb.intersectsObject(g))) {
				B(g, b);
				var n = f,
				q = n.buffer,
				r = void 0,
				t = r = void 0,
				t = n.object.material;
				if (t instanceof THREE.MeshFaceMaterial) r = q.materialIndex,
				r = t.materials[r],
				r.transparent ? (n.transparent = r, n.opaque = null) : (n.opaque = r, n.transparent = null);
				else if (r = t) r.transparent ? (n.transparent = r, n.opaque = null) : (n.opaque = r, n.transparent = null);
				f.render = !0; ! 0 === this.sortObjects && (null !== g.renderDepth ? f.z = g.renderDepth: (wa.getPositionFromMatrix(g.matrixWorld), wa.applyProjection(Qa), f.z = wa.z), f.id = g.id)
			}
			this.sortObjects && h.sort(k);
			h = a.__webglObjectsImmediate;
			d = 0;
			for (e = h.length; d < e; d++) f = h[d],
			g = f.object,
			g.visible && (B(g, b), g = f.object.material, g.transparent ? (f.transparent = g, f.opaque = null) : (f.opaque = g, f.transparent = null));
			a.overrideMaterial ? (d = a.overrideMaterial, this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), I(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), p(a.__webglObjects, !1, "", b, i, l, !0, d), s(a.__webglObjectsImmediate, "", b, i, l, !1, d)) : (d = null, this.setBlending(THREE.NoBlending), p(a.__webglObjects, !0, "opaque", b, i, l, !1, d), s(a.__webglObjectsImmediate, "opaque", b, i, l, !1, d), p(a.__webglObjects, !1, "transparent", b, i, l, !0, d), s(a.__webglObjectsImmediate, "transparent", b, i, l, !0, d));
			m(this.renderPluginsPost, a, b);
			c && (c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter) && (c instanceof THREE.WebGLRenderTargetCube ? (j.bindTexture(j.TEXTURE_CUBE_MAP, c.__webglTexture), j.generateMipmap(j.TEXTURE_CUBE_MAP), j.bindTexture(j.TEXTURE_CUBE_MAP, null)) : (j.bindTexture(j.TEXTURE_2D, c.__webglTexture), j.generateMipmap(j.TEXTURE_2D), j.bindTexture(j.TEXTURE_2D, null)));
			this.setDepthTest(!0);
			this.setDepthWrite(!0)
		}
	};
	this.renderImmediateObject = function(a, b, c, d, e) {
		var f = x(a, b, c, d, e);
		db = -1;
		L.setMaterialFaces(d);
		e.immediateRenderCallback ? e.immediateRenderCallback(f, j, Hb) : e.render(function(a) {
			L.renderBufferImmediate(a, f, d)
		})
	};
	this.initWebGLObjects = function(a) {
		a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []);
		for (; a.__objectsAdded.length;) {
			var b = a.__objectsAdded[0],
			h = a,
			i = void 0,
			k = void 0,
			m = void 0,
			p = void 0;
			if (!b.__webglInit && (b.__webglInit = !0, b._modelViewMatrix = new THREE.Matrix4, b._normalMatrix = new THREE.Matrix3, void 0 !== b.geometry && void 0 === b.geometry.__webglInit && (b.geometry.__webglInit = !0, b.geometry.addEventListener("dispose", Bd)), k = b.geometry, void 0 !== k)) if (k instanceof THREE.BufferGeometry) {
				var s = k,
				u = void 0,
				x = void 0,
				w = void 0;
				for (u in s.attributes) w = "index" === u ? j.ELEMENT_ARRAY_BUFFER: j.ARRAY_BUFFER,
				x = s.attributes[u],
				x.buffer = j.createBuffer(),
				j.bindBuffer(w, x.buffer),
				j.bufferData(w, x.array, j.STATIC_DRAW)
			} else if (b instanceof THREE.Mesh) {
				m = b.material;
				if (void 0 === k.geometryGroups) {
					var A = k,
					B = void 0,
					D = void 0,
					F = void 0,
					E = void 0,
					G = void 0,
					H = void 0,
					I = {},
					J = A.morphTargets.length,
					K = A.morphNormals.length,
					M = m instanceof THREE.MeshFaceMaterial;
					A.geometryGroups = {};
					B = 0;
					for (D = A.faces.length; B < D; B++) F = A.faces[B],
					E = M ? F.materialIndex: 0,
					void 0 === I[E] && (I[E] = {
						hash: E,
						counter: 0
					}),
					H = I[E].hash + "_" + I[E].counter,
					void 0 === A.geometryGroups[H] && (A.geometryGroups[H] = {
						faces3: [],
						faces4: [],
						materialIndex: E,
						vertices: 0,
						numMorphTargets: J,
						numMorphNormals: K
					}),
					G = F instanceof THREE.Face3 ? 3 : 4,
					65535 < A.geometryGroups[H].vertices + G && (I[E].counter += 1, H = I[E].hash + "_" + I[E].counter, void 0 === A.geometryGroups[H] && (A.geometryGroups[H] = {
						faces3: [],
						faces4: [],
						materialIndex: E,
						vertices: 0,
						numMorphTargets: J,
						numMorphNormals: K
					})),
					F instanceof THREE.Face3 ? A.geometryGroups[H].faces3.push(B) : A.geometryGroups[H].faces4.push(B),
					A.geometryGroups[H].vertices += G;
					A.geometryGroupsList = [];
					var V = void 0;
					for (V in A.geometryGroups) A.geometryGroups[V].id = Oa++,
					A.geometryGroupsList.push(A.geometryGroups[V])
				}
				for (i in k.geometryGroups) if (p = k.geometryGroups[i], !p.__webglVertexBuffer) {
					var N = p;
					N.__webglVertexBuffer = j.createBuffer();
					N.__webglNormalBuffer = j.createBuffer();
					N.__webglTangentBuffer = j.createBuffer();
					N.__webglColorBuffer = j.createBuffer();
					N.__webglUVBuffer = j.createBuffer();
					N.__webglUV2Buffer = j.createBuffer();
					N.__webglSkinIndicesBuffer = j.createBuffer();
					N.__webglSkinWeightsBuffer = j.createBuffer();
					N.__webglFaceBuffer = j.createBuffer();
					N.__webglLineBuffer = j.createBuffer();
					var S = void 0,
					ta = void 0;
					if (N.numMorphTargets) {
						N.__webglMorphTargetsBuffers = [];
						S = 0;
						for (ta = N.numMorphTargets; S < ta; S++) N.__webglMorphTargetsBuffers.push(j.createBuffer())
					}
					if (N.numMorphNormals) {
						N.__webglMorphNormalsBuffers = [];
						S = 0;
						for (ta = N.numMorphNormals; S < ta; S++) N.__webglMorphNormalsBuffers.push(j.createBuffer())
					}
					L.info.memory.geometries++;
					d(p, b);
					k.verticesNeedUpdate = !0;
					k.morphTargetsNeedUpdate = !0;
					k.elementsNeedUpdate = !0;
					k.uvsNeedUpdate = !0;
					k.normalsNeedUpdate = !0;
					k.tangentsNeedUpdate = !0;
					k.colorsNeedUpdate = !0
				}
			} else if (b instanceof THREE.Ribbon) {
				if (!k.__webglVertexBuffer) {
					var ea = k;
					ea.__webglVertexBuffer = j.createBuffer();
					ea.__webglColorBuffer = j.createBuffer();
					ea.__webglNormalBuffer = j.createBuffer();
					L.info.memory.geometries++;
					var U = k,
					$ = b,
					ha = U.vertices.length;
					U.__vertexArray = new Float32Array(3 * ha);
					U.__colorArray = new Float32Array(3 * ha);
					U.__normalArray = new Float32Array(3 * ha);
					U.__webglVertexCount = ha;
					c(U, $);
					k.verticesNeedUpdate = !0;
					k.colorsNeedUpdate = !0;
					k.normalsNeedUpdate = !0
				}
			} else if (b instanceof THREE.Line) {
				if (!k.__webglVertexBuffer) {
					var Z = k;
					Z.__webglVertexBuffer = j.createBuffer();
					Z.__webglColorBuffer = j.createBuffer();
					Z.__webglLineDistanceBuffer = j.createBuffer();
					L.info.memory.geometries++;
					var Y = k,
					ca = b,
					fa = Y.vertices.length;
					Y.__vertexArray = new Float32Array(3 * fa);
					Y.__colorArray = new Float32Array(3 * fa);
					Y.__lineDistanceArray = new Float32Array(1 * fa);
					Y.__webglLineCount = fa;
					c(Y, ca);
					k.verticesNeedUpdate = !0;
					k.colorsNeedUpdate = !0;
					k.lineDistancesNeedUpdate = !0
				}
			} else if (b instanceof THREE.ParticleSystem && !k.__webglVertexBuffer) {
				var $a = k;
				$a.__webglVertexBuffer = j.createBuffer();
				$a.__webglColorBuffer = j.createBuffer();
				L.info.memory.geometries++;
				var ia = k,
				kb = b,
				ra = ia.vertices.length;
				ia.__vertexArray = new Float32Array(3 * ra);
				ia.__colorArray = new Float32Array(3 * ra);
				ia.__sortArray = [];
				ia.__webglParticleCount = ra;
				c(ia, kb);
				k.verticesNeedUpdate = !0;
				k.colorsNeedUpdate = !0
			}
			if (!b.__webglActive) {
				if (b instanceof THREE.Mesh) if (k = b.geometry, k instanceof THREE.BufferGeometry) r(h.__webglObjects, k, b);
				else {
					if (k instanceof THREE.Geometry) for (i in k.geometryGroups) p = k.geometryGroups[i],
					r(h.__webglObjects, p, b)
				} else b instanceof THREE.Ribbon || b instanceof THREE.Line || b instanceof THREE.ParticleSystem ? (k = b.geometry, r(h.__webglObjects, k, b)) : b instanceof THREE.ImmediateRenderObject || b.immediateRenderCallback ? h.__webglObjectsImmediate.push({
					object: b,
					opaque: null,
					transparent: null
				}) : b instanceof THREE.Sprite ? h.__webglSprites.push(b) : b instanceof THREE.LensFlare && h.__webglFlares.push(b);
				b.__webglActive = !0
			}
			a.__objectsAdded.splice(0, 1)
		}
		for (; a.__objectsRemoved.length;) {
			var ja = a.__objectsRemoved[0],
			La = a;
			ja instanceof THREE.Mesh || ja instanceof THREE.ParticleSystem || ja instanceof THREE.Ribbon || ja instanceof THREE.Line ? z(La.__webglObjects, ja) : ja instanceof THREE.Sprite ? t(La.__webglSprites, ja) : ja instanceof THREE.LensFlare ? t(La.__webglFlares, ja) : (ja instanceof THREE.ImmediateRenderObject || ja.immediateRenderCallback) && z(La.__webglObjectsImmediate, ja);
			ja.__webglActive = !1;
			a.__objectsRemoved.splice(0, 1)
		}
		for (var lb = 0,
		db = a.__webglObjects.length; lb < db; lb++) {
			var ma = a.__webglObjects[lb].object,
			la = ma.geometry,
			Ba = void 0,
			xa = void 0,
			na = void 0;
			if (la instanceof THREE.BufferGeometry) {
				var Sa = j.DYNAMIC_DRAW,
				Wa = !la.dynamic,
				eb = la.attributes,
				fb = void 0,
				Pa = void 0;
				for (fb in eb) Pa = eb[fb],
				Pa.needsUpdate && ("index" === fb ? (j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, Pa.buffer), j.bufferData(j.ELEMENT_ARRAY_BUFFER, Pa.array, Sa)) : (j.bindBuffer(j.ARRAY_BUFFER, Pa.buffer), j.bufferData(j.ARRAY_BUFFER, Pa.array, Sa)), Pa.needsUpdate = !1),
				Wa && !Pa.dynamic && delete Pa.array
			} else if (ma instanceof THREE.Mesh) {
				for (var jb = 0,
				ob = la.geometryGroupsList.length; jb < ob; jb++) if (Ba = la.geometryGroupsList[jb], na = e(ma, Ba), la.buffersNeedUpdate && d(Ba, ma), xa = na.attributes && n(na), la.verticesNeedUpdate || la.morphTargetsNeedUpdate || la.elementsNeedUpdate || la.uvsNeedUpdate || la.normalsNeedUpdate || la.colorsNeedUpdate || la.tangentsNeedUpdate || xa) {
					var sa = Ba,
					pb = ma,
					Ga = j.DYNAMIC_DRAW,
					Hb = !la.dynamic,
					mb = na;
					if (sa.__inittedArrays) {
						var Gb = f(mb),
						yb = mb.vertexColors ? mb.vertexColors: !1,
						Ib = g(mb),
						xb = Gb === THREE.SmoothShading,
						C = void 0,
						T = void 0,
						pc = void 0,
						O = void 0,
						vb = void 0,
						qc = void 0,
						Pb = void 0,
						Mb = void 0,
						jc = void 0,
						wb = void 0,
						zb = void 0,
						P = void 0,
						Q = void 0,
						R = void 0,
						qa = void 0,
						Qb = void 0,
						Rb = void 0,
						Sb = void 0,
						Nb = void 0,
						Tb = void 0,
						Ub = void 0,
						Vb = void 0,
						Ob = void 0,
						Wb = void 0,
						Xb = void 0,
						Yb = void 0,
						Kc = void 0,
						Zb = void 0,
						$b = void 0,
						ac = void 0,
						Lc = void 0,
						bc = void 0,
						cc = void 0,
						dc = void 0,
						Mc = void 0,
						ya = void 0,
						Bc = void 0,
						rc = void 0,
						Ec = void 0,
						Fc = void 0,
						Xa = void 0,
						Cc = void 0,
						Ta = void 0,
						Ua = void 0,
						sc = void 0,
						kc = void 0,
						Ma = 0,
						Ra = 0,
						lc = 0,
						mc = 0,
						Cb = 0,
						hb = 0,
						Ca = 0,
						nb = 0,
						Na = 0,
						aa = 0,
						ka = 0,
						y = 0,
						za = void 0,
						Ya = sa.__vertexArray,
						Nc = sa.__uvArray,
						Oc = sa.__uv2Array,
						Db = sa.__normalArray,
						Ha = sa.__tangentArray,
						Za = sa.__colorArray,
						Ia = sa.__skinIndexArray,
						Ja = sa.__skinWeightArray,
						rd = sa.__morphTargetsArrays,
						sd = sa.__morphNormalsArrays,
						td = sa.__webglCustomAttributesList,
						v = void 0,
						ec = sa.__faceArray,
						ub = sa.__lineArray,
						qb = pb.geometry,
						Wc = qb.elementsNeedUpdate,
						Jc = qb.uvsNeedUpdate,
						Xc = qb.normalsNeedUpdate,
						Yc = qb.tangentsNeedUpdate,
						Zc = qb.colorsNeedUpdate,
						pd = qb.morphTargetsNeedUpdate,
						xc = qb.vertices,
						ua = sa.faces3,
						va = sa.faces4,
						ib = qb.faces,
						ud = qb.faceVertexUvs[0],
						vd = qb.faceVertexUvs[1],
						yc = qb.skinIndices,
						tc = qb.skinWeights,
						uc = qb.morphTargets,
						$c = qb.morphNormals;
						if (qb.verticesNeedUpdate) {
							C = 0;
							for (T = ua.length; C < T; C++) O = ib[ua[C]],
							P = xc[O.a],
							Q = xc[O.b],
							R = xc[O.c],
							Ya[Ra] = P.x,
							Ya[Ra + 1] = P.y,
							Ya[Ra + 2] = P.z,
							Ya[Ra + 3] = Q.x,
							Ya[Ra + 4] = Q.y,
							Ya[Ra + 5] = Q.z,
							Ya[Ra + 6] = R.x,
							Ya[Ra + 7] = R.y,
							Ya[Ra + 8] = R.z,
							Ra += 9;
							C = 0;
							for (T = va.length; C < T; C++) O = ib[va[C]],
							P = xc[O.a],
							Q = xc[O.b],
							R = xc[O.c],
							qa = xc[O.d],
							Ya[Ra] = P.x,
							Ya[Ra + 1] = P.y,
							Ya[Ra + 2] = P.z,
							Ya[Ra + 3] = Q.x,
							Ya[Ra + 4] = Q.y,
							Ya[Ra + 5] = Q.z,
							Ya[Ra + 6] = R.x,
							Ya[Ra + 7] = R.y,
							Ya[Ra + 8] = R.z,
							Ya[Ra + 9] = qa.x,
							Ya[Ra + 10] = qa.y,
							Ya[Ra + 11] = qa.z,
							Ra += 12;
							j.bindBuffer(j.ARRAY_BUFFER, sa.__webglVertexBuffer);
							j.bufferData(j.ARRAY_BUFFER, Ya, Ga)
						}
						if (pd) {
							Xa = 0;
							for (Cc = uc.length; Xa < Cc; Xa++) {
								C = ka = 0;
								for (T = ua.length; C < T; C++) sc = ua[C],
								O = ib[sc],
								P = uc[Xa].vertices[O.a],
								Q = uc[Xa].vertices[O.b],
								R = uc[Xa].vertices[O.c],
								Ta = rd[Xa],
								Ta[ka] = P.x,
								Ta[ka + 1] = P.y,
								Ta[ka + 2] = P.z,
								Ta[ka + 3] = Q.x,
								Ta[ka + 4] = Q.y,
								Ta[ka + 5] = Q.z,
								Ta[ka + 6] = R.x,
								Ta[ka + 7] = R.y,
								Ta[ka + 8] = R.z,
								mb.morphNormals && (xb ? (kc = $c[Xa].vertexNormals[sc], Tb = kc.a, Ub = kc.b, Vb = kc.c) : Vb = Ub = Tb = $c[Xa].faceNormals[sc], Ua = sd[Xa], Ua[ka] = Tb.x, Ua[ka + 1] = Tb.y, Ua[ka + 2] = Tb.z, Ua[ka + 3] = Ub.x, Ua[ka + 4] = Ub.y, Ua[ka + 5] = Ub.z, Ua[ka + 6] = Vb.x, Ua[ka + 7] = Vb.y, Ua[ka + 8] = Vb.z),
								ka += 9;
								C = 0;
								for (T = va.length; C < T; C++) sc = va[C],
								O = ib[sc],
								P = uc[Xa].vertices[O.a],
								Q = uc[Xa].vertices[O.b],
								R = uc[Xa].vertices[O.c],
								qa = uc[Xa].vertices[O.d],
								Ta = rd[Xa],
								Ta[ka] = P.x,
								Ta[ka + 1] = P.y,
								Ta[ka + 2] = P.z,
								Ta[ka + 3] = Q.x,
								Ta[ka + 4] = Q.y,
								Ta[ka + 5] = Q.z,
								Ta[ka + 6] = R.x,
								Ta[ka + 7] = R.y,
								Ta[ka + 8] = R.z,
								Ta[ka + 9] = qa.x,
								Ta[ka + 10] = qa.y,
								Ta[ka + 11] = qa.z,
								mb.morphNormals && (xb ? (kc = $c[Xa].vertexNormals[sc], Tb = kc.a, Ub = kc.b, Vb = kc.c, Ob = kc.d) : Ob = Vb = Ub = Tb = $c[Xa].faceNormals[sc], Ua = sd[Xa], Ua[ka] = Tb.x, Ua[ka + 1] = Tb.y, Ua[ka + 2] = Tb.z, Ua[ka + 3] = Ub.x, Ua[ka + 4] = Ub.y, Ua[ka + 5] = Ub.z, Ua[ka + 6] = Vb.x, Ua[ka + 7] = Vb.y, Ua[ka + 8] = Vb.z, Ua[ka + 9] = Ob.x, Ua[ka + 10] = Ob.y, Ua[ka + 11] = Ob.z),
								ka += 12;
								j.bindBuffer(j.ARRAY_BUFFER, sa.__webglMorphTargetsBuffers[Xa]);
								j.bufferData(j.ARRAY_BUFFER, rd[Xa], Ga);
								mb.morphNormals && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglMorphNormalsBuffers[Xa]), j.bufferData(j.ARRAY_BUFFER, sd[Xa], Ga))
							}
						}
						if (tc.length) {
							C = 0;
							for (T = ua.length; C < T; C++) O = ib[ua[C]],
							Zb = tc[O.a],
							$b = tc[O.b],
							ac = tc[O.c],
							Ja[aa] = Zb.x,
							Ja[aa + 1] = Zb.y,
							Ja[aa + 2] = Zb.z,
							Ja[aa + 3] = Zb.w,
							Ja[aa + 4] = $b.x,
							Ja[aa + 5] = $b.y,
							Ja[aa + 6] = $b.z,
							Ja[aa + 7] = $b.w,
							Ja[aa + 8] = ac.x,
							Ja[aa + 9] = ac.y,
							Ja[aa + 10] = ac.z,
							Ja[aa + 11] = ac.w,
							bc = yc[O.a],
							cc = yc[O.b],
							dc = yc[O.c],
							Ia[aa] = bc.x,
							Ia[aa + 1] = bc.y,
							Ia[aa + 2] = bc.z,
							Ia[aa + 3] = bc.w,
							Ia[aa + 4] = cc.x,
							Ia[aa + 5] = cc.y,
							Ia[aa + 6] = cc.z,
							Ia[aa + 7] = cc.w,
							Ia[aa + 8] = dc.x,
							Ia[aa + 9] = dc.y,
							Ia[aa + 10] = dc.z,
							Ia[aa + 11] = dc.w,
							aa += 12;
							C = 0;
							for (T = va.length; C < T; C++) O = ib[va[C]],
							Zb = tc[O.a],
							$b = tc[O.b],
							ac = tc[O.c],
							Lc = tc[O.d],
							Ja[aa] = Zb.x,
							Ja[aa + 1] = Zb.y,
							Ja[aa + 2] = Zb.z,
							Ja[aa + 3] = Zb.w,
							Ja[aa + 4] = $b.x,
							Ja[aa + 5] = $b.y,
							Ja[aa + 6] = $b.z,
							Ja[aa + 7] = $b.w,
							Ja[aa + 8] = ac.x,
							Ja[aa + 9] = ac.y,
							Ja[aa + 10] = ac.z,
							Ja[aa + 11] = ac.w,
							Ja[aa + 12] = Lc.x,
							Ja[aa + 13] = Lc.y,
							Ja[aa + 14] = Lc.z,
							Ja[aa + 15] = Lc.w,
							bc = yc[O.a],
							cc = yc[O.b],
							dc = yc[O.c],
							Mc = yc[O.d],
							Ia[aa] = bc.x,
							Ia[aa + 1] = bc.y,
							Ia[aa + 2] = bc.z,
							Ia[aa + 3] = bc.w,
							Ia[aa + 4] = cc.x,
							Ia[aa + 5] = cc.y,
							Ia[aa + 6] = cc.z,
							Ia[aa + 7] = cc.w,
							Ia[aa + 8] = dc.x,
							Ia[aa + 9] = dc.y,
							Ia[aa + 10] = dc.z,
							Ia[aa + 11] = dc.w,
							Ia[aa + 12] = Mc.x,
							Ia[aa + 13] = Mc.y,
							Ia[aa + 14] = Mc.z,
							Ia[aa + 15] = Mc.w,
							aa += 16;
							0 < aa && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglSkinIndicesBuffer), j.bufferData(j.ARRAY_BUFFER, Ia, Ga), j.bindBuffer(j.ARRAY_BUFFER, sa.__webglSkinWeightsBuffer), j.bufferData(j.ARRAY_BUFFER, Ja, Ga))
						}
						if (Zc && yb) {
							C = 0;
							for (T = ua.length; C < T; C++) O = ib[ua[C]],
							Pb = O.vertexColors,
							Mb = O.color,
							3 === Pb.length && yb === THREE.VertexColors ? (Wb = Pb[0], Xb = Pb[1], Yb = Pb[2]) : Yb = Xb = Wb = Mb,
							Za[Na] = Wb.r,
							Za[Na + 1] = Wb.g,
							Za[Na + 2] = Wb.b,
							Za[Na + 3] = Xb.r,
							Za[Na + 4] = Xb.g,
							Za[Na + 5] = Xb.b,
							Za[Na + 6] = Yb.r,
							Za[Na + 7] = Yb.g,
							Za[Na + 8] = Yb.b,
							Na += 9;
							C = 0;
							for (T = va.length; C < T; C++) O = ib[va[C]],
							Pb = O.vertexColors,
							Mb = O.color,
							4 === Pb.length && yb === THREE.VertexColors ? (Wb = Pb[0], Xb = Pb[1], Yb = Pb[2], Kc = Pb[3]) : Kc = Yb = Xb = Wb = Mb,
							Za[Na] = Wb.r,
							Za[Na + 1] = Wb.g,
							Za[Na + 2] = Wb.b,
							Za[Na + 3] = Xb.r,
							Za[Na + 4] = Xb.g,
							Za[Na + 5] = Xb.b,
							Za[Na + 6] = Yb.r,
							Za[Na + 7] = Yb.g,
							Za[Na + 8] = Yb.b,
							Za[Na + 9] = Kc.r,
							Za[Na + 10] = Kc.g,
							Za[Na + 11] = Kc.b,
							Na += 12;
							0 < Na && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglColorBuffer), j.bufferData(j.ARRAY_BUFFER, Za, Ga))
						}
						if (Yc && qb.hasTangents) {
							C = 0;
							for (T = ua.length; C < T; C++) O = ib[ua[C]],
							jc = O.vertexTangents,
							Qb = jc[0],
							Rb = jc[1],
							Sb = jc[2],
							Ha[Ca] = Qb.x,
							Ha[Ca + 1] = Qb.y,
							Ha[Ca + 2] = Qb.z,
							Ha[Ca + 3] = Qb.w,
							Ha[Ca + 4] = Rb.x,
							Ha[Ca + 5] = Rb.y,
							Ha[Ca + 6] = Rb.z,
							Ha[Ca + 7] = Rb.w,
							Ha[Ca + 8] = Sb.x,
							Ha[Ca + 9] = Sb.y,
							Ha[Ca + 10] = Sb.z,
							Ha[Ca + 11] = Sb.w,
							Ca += 12;
							C = 0;
							for (T = va.length; C < T; C++) O = ib[va[C]],
							jc = O.vertexTangents,
							Qb = jc[0],
							Rb = jc[1],
							Sb = jc[2],
							Nb = jc[3],
							Ha[Ca] = Qb.x,
							Ha[Ca + 1] = Qb.y,
							Ha[Ca + 2] = Qb.z,
							Ha[Ca + 3] = Qb.w,
							Ha[Ca + 4] = Rb.x,
							Ha[Ca + 5] = Rb.y,
							Ha[Ca + 6] = Rb.z,
							Ha[Ca + 7] = Rb.w,
							Ha[Ca + 8] = Sb.x,
							Ha[Ca + 9] = Sb.y,
							Ha[Ca + 10] = Sb.z,
							Ha[Ca + 11] = Sb.w,
							Ha[Ca + 12] = Nb.x,
							Ha[Ca + 13] = Nb.y,
							Ha[Ca + 14] = Nb.z,
							Ha[Ca + 15] = Nb.w,
							Ca += 16;
							j.bindBuffer(j.ARRAY_BUFFER, sa.__webglTangentBuffer);
							j.bufferData(j.ARRAY_BUFFER, Ha, Ga)
						}
						if (Xc && Gb) {
							C = 0;
							for (T = ua.length; C < T; C++) if (O = ib[ua[C]], vb = O.vertexNormals, qc = O.normal, 3 === vb.length && xb) for (ya = 0; 3 > ya; ya++) rc = vb[ya],
							Db[hb] = rc.x,
							Db[hb + 1] = rc.y,
							Db[hb + 2] = rc.z,
							hb += 3;
							else for (ya = 0; 3 > ya; ya++) Db[hb] = qc.x,
							Db[hb + 1] = qc.y,
							Db[hb + 2] = qc.z,
							hb += 3;
							C = 0;
							for (T = va.length; C < T; C++) if (O = ib[va[C]], vb = O.vertexNormals, qc = O.normal, 4 === vb.length && xb) for (ya = 0; 4 > ya; ya++) rc = vb[ya],
							Db[hb] = rc.x,
							Db[hb + 1] = rc.y,
							Db[hb + 2] = rc.z,
							hb += 3;
							else for (ya = 0; 4 > ya; ya++) Db[hb] = qc.x,
							Db[hb + 1] = qc.y,
							Db[hb + 2] = qc.z,
							hb += 3;
							j.bindBuffer(j.ARRAY_BUFFER, sa.__webglNormalBuffer);
							j.bufferData(j.ARRAY_BUFFER, Db, Ga)
						}
						if (Jc && ud && Ib) {
							C = 0;
							for (T = ua.length; C < T; C++) if (pc = ua[C], wb = ud[pc], void 0 !== wb) for (ya = 0; 3 > ya; ya++) Ec = wb[ya],
							Nc[lc] = Ec.x,
							Nc[lc + 1] = Ec.y,
							lc += 2;
							C = 0;
							for (T = va.length; C < T; C++) if (pc = va[C], wb = ud[pc], void 0 !== wb) for (ya = 0; 4 > ya; ya++) Ec = wb[ya],
							Nc[lc] = Ec.x,
							Nc[lc + 1] = Ec.y,
							lc += 2;
							0 < lc && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglUVBuffer), j.bufferData(j.ARRAY_BUFFER, Nc, Ga))
						}
						if (Jc && vd && Ib) {
							C = 0;
							for (T = ua.length; C < T; C++) if (pc = ua[C], zb = vd[pc], void 0 !== zb) for (ya = 0; 3 > ya; ya++) Fc = zb[ya],
							Oc[mc] = Fc.x,
							Oc[mc + 1] = Fc.y,
							mc += 2;
							C = 0;
							for (T = va.length; C < T; C++) if (pc = va[C], zb = vd[pc], void 0 !== zb) for (ya = 0; 4 > ya; ya++) Fc = zb[ya],
							Oc[mc] = Fc.x,
							Oc[mc + 1] = Fc.y,
							mc += 2;
							0 < mc && (j.bindBuffer(j.ARRAY_BUFFER, sa.__webglUV2Buffer), j.bufferData(j.ARRAY_BUFFER, Oc, Ga))
						}
						if (Wc) {
							C = 0;
							for (T = ua.length; C < T; C++) ec[Cb] = Ma,
							ec[Cb + 1] = Ma + 1,
							ec[Cb + 2] = Ma + 2,
							Cb += 3,
							ub[nb] = Ma,
							ub[nb + 1] = Ma + 1,
							ub[nb + 2] = Ma,
							ub[nb + 3] = Ma + 2,
							ub[nb + 4] = Ma + 1,
							ub[nb + 5] = Ma + 2,
							nb += 6,
							Ma += 3;
							C = 0;
							for (T = va.length; C < T; C++) ec[Cb] = Ma,
							ec[Cb + 1] = Ma + 1,
							ec[Cb + 2] = Ma + 3,
							ec[Cb + 3] = Ma + 1,
							ec[Cb + 4] = Ma + 2,
							ec[Cb + 5] = Ma + 3,
							Cb += 6,
							ub[nb] = Ma,
							ub[nb + 1] = Ma + 1,
							ub[nb + 2] = Ma,
							ub[nb + 3] = Ma + 3,
							ub[nb + 4] = Ma + 1,
							ub[nb + 5] = Ma + 2,
							ub[nb + 6] = Ma + 2,
							ub[nb + 7] = Ma + 3,
							nb += 8,
							Ma += 4;
							j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, sa.__webglFaceBuffer);
							j.bufferData(j.ELEMENT_ARRAY_BUFFER, ec, Ga);
							j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, sa.__webglLineBuffer);
							j.bufferData(j.ELEMENT_ARRAY_BUFFER, ub, Ga)
						}
						if (td) {
							ya = 0;
							for (Bc = td.length; ya < Bc; ya++) if (v = td[ya], v.__original.needsUpdate) {
								y = 0;
								if (1 === v.size) if (void 0 === v.boundTo || "vertices" === v.boundTo) {
									C = 0;
									for (T = ua.length; C < T; C++) O = ib[ua[C]],
									v.array[y] = v.value[O.a],
									v.array[y + 1] = v.value[O.b],
									v.array[y + 2] = v.value[O.c],
									y += 3;
									C = 0;
									for (T = va.length; C < T; C++) O = ib[va[C]],
									v.array[y] = v.value[O.a],
									v.array[y + 1] = v.value[O.b],
									v.array[y + 2] = v.value[O.c],
									v.array[y + 3] = v.value[O.d],
									y += 4
								} else {
									if ("faces" === v.boundTo) {
										C = 0;
										for (T = ua.length; C < T; C++) za = v.value[ua[C]],
										v.array[y] = za,
										v.array[y + 1] = za,
										v.array[y + 2] = za,
										y += 3;
										C = 0;
										for (T = va.length; C < T; C++) za = v.value[va[C]],
										v.array[y] = za,
										v.array[y + 1] = za,
										v.array[y + 2] = za,
										v.array[y + 3] = za,
										y += 4
									}
								} else if (2 === v.size) if (void 0 === v.boundTo || "vertices" === v.boundTo) {
									C = 0;
									for (T = ua.length; C < T; C++) O = ib[ua[C]],
									P = v.value[O.a],
									Q = v.value[O.b],
									R = v.value[O.c],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = Q.x,
									v.array[y + 3] = Q.y,
									v.array[y + 4] = R.x,
									v.array[y + 5] = R.y,
									y += 6;
									C = 0;
									for (T = va.length; C < T; C++) O = ib[va[C]],
									P = v.value[O.a],
									Q = v.value[O.b],
									R = v.value[O.c],
									qa = v.value[O.d],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = Q.x,
									v.array[y + 3] = Q.y,
									v.array[y + 4] = R.x,
									v.array[y + 5] = R.y,
									v.array[y + 6] = qa.x,
									v.array[y + 7] = qa.y,
									y += 8
								} else {
									if ("faces" === v.boundTo) {
										C = 0;
										for (T = ua.length; C < T; C++) R = Q = P = za = v.value[ua[C]],
										v.array[y] = P.x,
										v.array[y + 1] = P.y,
										v.array[y + 2] = Q.x,
										v.array[y + 3] = Q.y,
										v.array[y + 4] = R.x,
										v.array[y + 5] = R.y,
										y += 6;
										C = 0;
										for (T = va.length; C < T; C++) qa = R = Q = P = za = v.value[va[C]],
										v.array[y] = P.x,
										v.array[y + 1] = P.y,
										v.array[y + 2] = Q.x,
										v.array[y + 3] = Q.y,
										v.array[y + 4] = R.x,
										v.array[y + 5] = R.y,
										v.array[y + 6] = qa.x,
										v.array[y + 7] = qa.y,
										y += 8
									}
								} else if (3 === v.size) {
									var X;
									X = "c" === v.type ? ["r", "g", "b"] : ["x", "y", "z"];
									if (void 0 === v.boundTo || "vertices" === v.boundTo) {
										C = 0;
										for (T = ua.length; C < T; C++) O = ib[ua[C]],
										P = v.value[O.a],
										Q = v.value[O.b],
										R = v.value[O.c],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										y += 9;
										C = 0;
										for (T = va.length; C < T; C++) O = ib[va[C]],
										P = v.value[O.a],
										Q = v.value[O.b],
										R = v.value[O.c],
										qa = v.value[O.d],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										v.array[y + 9] = qa[X[0]],
										v.array[y + 10] = qa[X[1]],
										v.array[y + 11] = qa[X[2]],
										y += 12
									} else if ("faces" === v.boundTo) {
										C = 0;
										for (T = ua.length; C < T; C++) R = Q = P = za = v.value[ua[C]],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										y += 9;
										C = 0;
										for (T = va.length; C < T; C++) qa = R = Q = P = za = v.value[va[C]],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										v.array[y + 9] = qa[X[0]],
										v.array[y + 10] = qa[X[1]],
										v.array[y + 11] = qa[X[2]],
										y += 12
									} else if ("faceVertices" === v.boundTo) {
										C = 0;
										for (T = ua.length; C < T; C++) za = v.value[ua[C]],
										P = za[0],
										Q = za[1],
										R = za[2],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										y += 9;
										C = 0;
										for (T = va.length; C < T; C++) za = v.value[va[C]],
										P = za[0],
										Q = za[1],
										R = za[2],
										qa = za[3],
										v.array[y] = P[X[0]],
										v.array[y + 1] = P[X[1]],
										v.array[y + 2] = P[X[2]],
										v.array[y + 3] = Q[X[0]],
										v.array[y + 4] = Q[X[1]],
										v.array[y + 5] = Q[X[2]],
										v.array[y + 6] = R[X[0]],
										v.array[y + 7] = R[X[1]],
										v.array[y + 8] = R[X[2]],
										v.array[y + 9] = qa[X[0]],
										v.array[y + 10] = qa[X[1]],
										v.array[y + 11] = qa[X[2]],
										y += 12
									}
								} else if (4 === v.size) if (void 0 === v.boundTo || "vertices" === v.boundTo) {
									C = 0;
									for (T = ua.length; C < T; C++) O = ib[ua[C]],
									P = v.value[O.a],
									Q = v.value[O.b],
									R = v.value[O.c],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									y += 12;
									C = 0;
									for (T = va.length; C < T; C++) O = ib[va[C]],
									P = v.value[O.a],
									Q = v.value[O.b],
									R = v.value[O.c],
									qa = v.value[O.d],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									v.array[y + 12] = qa.x,
									v.array[y + 13] = qa.y,
									v.array[y + 14] = qa.z,
									v.array[y + 15] = qa.w,
									y += 16
								} else if ("faces" === v.boundTo) {
									C = 0;
									for (T = ua.length; C < T; C++) R = Q = P = za = v.value[ua[C]],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									y += 12;
									C = 0;
									for (T = va.length; C < T; C++) qa = R = Q = P = za = v.value[va[C]],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									v.array[y + 12] = qa.x,
									v.array[y + 13] = qa.y,
									v.array[y + 14] = qa.z,
									v.array[y + 15] = qa.w,
									y += 16
								} else if ("faceVertices" === v.boundTo) {
									C = 0;
									for (T = ua.length; C < T; C++) za = v.value[ua[C]],
									P = za[0],
									Q = za[1],
									R = za[2],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									y += 12;
									C = 0;
									for (T = va.length; C < T; C++) za = v.value[va[C]],
									P = za[0],
									Q = za[1],
									R = za[2],
									qa = za[3],
									v.array[y] = P.x,
									v.array[y + 1] = P.y,
									v.array[y + 2] = P.z,
									v.array[y + 3] = P.w,
									v.array[y + 4] = Q.x,
									v.array[y + 5] = Q.y,
									v.array[y + 6] = Q.z,
									v.array[y + 7] = Q.w,
									v.array[y + 8] = R.x,
									v.array[y + 9] = R.y,
									v.array[y + 10] = R.z,
									v.array[y + 11] = R.w,
									v.array[y + 12] = qa.x,
									v.array[y + 13] = qa.y,
									v.array[y + 14] = qa.z,
									v.array[y + 15] = qa.w,
									y += 16
								}
								j.bindBuffer(j.ARRAY_BUFFER, v.buffer);
								j.bufferData(j.ARRAY_BUFFER, v.array, Ga)
							}
						}
						Hb && (delete sa.__inittedArrays, delete sa.__colorArray, delete sa.__normalArray, delete sa.__tangentArray, delete sa.__uvArray, delete sa.__uv2Array, delete sa.__faceArray, delete sa.__vertexArray, delete sa.__lineArray, delete sa.__skinIndexArray, delete sa.__skinWeightArray)
					}
				}
				la.verticesNeedUpdate = !1;
				la.morphTargetsNeedUpdate = !1;
				la.elementsNeedUpdate = !1;
				la.uvsNeedUpdate = !1;
				la.normalsNeedUpdate = !1;
				la.colorsNeedUpdate = !1;
				la.tangentsNeedUpdate = !1;
				la.buffersNeedUpdate = !1;
				na.attributes && q(na)
			} else if (ma instanceof THREE.Ribbon) {
				na = e(ma, la);
				xa = na.attributes && n(na);
				if (la.verticesNeedUpdate || la.colorsNeedUpdate || la.normalsNeedUpdate || xa) {
					var Eb = la,
					ad = j.DYNAMIC_DRAW,
					Pc = void 0,
					Qc = void 0,
					Rc = void 0,
					bd = void 0,
					Aa = void 0,
					cd = void 0,
					dd = void 0,
					ed = void 0,
					Cd = void 0,
					bb = void 0,
					Gc = void 0,
					Ea = void 0,
					rb = void 0,
					Dd = Eb.vertices,
					Ed = Eb.colors,
					Fd = Eb.normals,
					Od = Dd.length,
					Pd = Ed.length,
					Qd = Fd.length,
					fd = Eb.__vertexArray,
					gd = Eb.__colorArray,
					hd = Eb.__normalArray,
					Rd = Eb.colorsNeedUpdate,
					Sd = Eb.normalsNeedUpdate,
					wd = Eb.__webglCustomAttributesList;
					if (Eb.verticesNeedUpdate) {
						for (Pc = 0; Pc < Od; Pc++) bd = Dd[Pc],
						Aa = 3 * Pc,
						fd[Aa] = bd.x,
						fd[Aa + 1] = bd.y,
						fd[Aa + 2] = bd.z;
						j.bindBuffer(j.ARRAY_BUFFER, Eb.__webglVertexBuffer);
						j.bufferData(j.ARRAY_BUFFER, fd, ad)
					}
					if (Rd) {
						for (Qc = 0; Qc < Pd; Qc++) cd = Ed[Qc],
						Aa = 3 * Qc,
						gd[Aa] = cd.r,
						gd[Aa + 1] = cd.g,
						gd[Aa + 2] = cd.b;
						j.bindBuffer(j.ARRAY_BUFFER, Eb.__webglColorBuffer);
						j.bufferData(j.ARRAY_BUFFER, gd, ad)
					}
					if (Sd) {
						for (Rc = 0; Rc < Qd; Rc++) dd = Fd[Rc],
						Aa = 3 * Rc,
						hd[Aa] = dd.x,
						hd[Aa + 1] = dd.y,
						hd[Aa + 2] = dd.z;
						j.bindBuffer(j.ARRAY_BUFFER, Eb.__webglNormalBuffer);
						j.bufferData(j.ARRAY_BUFFER, hd, ad)
					}
					if (wd) {
						ed = 0;
						for (Cd = wd.length; ed < Cd; ed++) if (Ea = wd[ed], Ea.needsUpdate && (void 0 === Ea.boundTo || "vertices" === Ea.boundTo)) {
							Aa = 0;
							Gc = Ea.value.length;
							if (1 === Ea.size) for (bb = 0; bb < Gc; bb++) Ea.array[bb] = Ea.value[bb];
							else if (2 === Ea.size) for (bb = 0; bb < Gc; bb++) rb = Ea.value[bb],
							Ea.array[Aa] = rb.x,
							Ea.array[Aa + 1] = rb.y,
							Aa += 2;
							else if (3 === Ea.size) if ("c" === Ea.type) for (bb = 0; bb < Gc; bb++) rb = Ea.value[bb],
							Ea.array[Aa] = rb.r,
							Ea.array[Aa + 1] = rb.g,
							Ea.array[Aa + 2] = rb.b,
							Aa += 3;
							else for (bb = 0; bb < Gc; bb++) rb = Ea.value[bb],
							Ea.array[Aa] = rb.x,
							Ea.array[Aa + 1] = rb.y,
							Ea.array[Aa + 2] = rb.z,
							Aa += 3;
							else if (4 === Ea.size) for (bb = 0; bb < Gc; bb++) rb = Ea.value[bb],
							Ea.array[Aa] = rb.x,
							Ea.array[Aa + 1] = rb.y,
							Ea.array[Aa + 2] = rb.z,
							Ea.array[Aa + 3] = rb.w,
							Aa += 4;
							j.bindBuffer(j.ARRAY_BUFFER, Ea.buffer);
							j.bufferData(j.ARRAY_BUFFER, Ea.array, ad)
						}
					}
				}
				la.verticesNeedUpdate = !1;
				la.colorsNeedUpdate = !1;
				la.normalsNeedUpdate = !1;
				na.attributes && q(na)
			} else if (ma instanceof THREE.Line) {
				na = e(ma, la);
				xa = na.attributes && n(na);
				if (la.verticesNeedUpdate || la.colorsNeedUpdate || la.lineDistancesNeedUpdate || xa) {
					var Fb = la,
					id = j.DYNAMIC_DRAW,
					Sc = void 0,
					Tc = void 0,
					Uc = void 0,
					jd = void 0,
					Ka = void 0,
					kd = void 0,
					Gd = Fb.vertices,
					Hd = Fb.colors,
					Id = Fb.lineDistances,
					Td = Gd.length,
					Ud = Hd.length,
					Vd = Id.length,
					ld = Fb.__vertexArray,
					md = Fb.__colorArray,
					Jd = Fb.__lineDistanceArray,
					Wd = Fb.colorsNeedUpdate,
					Xd = Fb.lineDistancesNeedUpdate,
					xd = Fb.__webglCustomAttributesList,
					nd = void 0,
					Kd = void 0,
					cb = void 0,
					Hc = void 0,
					sb = void 0,
					Fa = void 0;
					if (Fb.verticesNeedUpdate) {
						for (Sc = 0; Sc < Td; Sc++) jd = Gd[Sc],
						Ka = 3 * Sc,
						ld[Ka] = jd.x,
						ld[Ka + 1] = jd.y,
						ld[Ka + 2] = jd.z;
						j.bindBuffer(j.ARRAY_BUFFER, Fb.__webglVertexBuffer);
						j.bufferData(j.ARRAY_BUFFER, ld, id)
					}
					if (Wd) {
						for (Tc = 0; Tc < Ud; Tc++) kd = Hd[Tc],
						Ka = 3 * Tc,
						md[Ka] = kd.r,
						md[Ka + 1] = kd.g,
						md[Ka + 2] = kd.b;
						j.bindBuffer(j.ARRAY_BUFFER, Fb.__webglColorBuffer);
						j.bufferData(j.ARRAY_BUFFER, md, id)
					}
					if (Xd) {
						for (Uc = 0; Uc < Vd; Uc++) Jd[Uc] = Id[Uc];
						j.bindBuffer(j.ARRAY_BUFFER, Fb.__webglLineDistanceBuffer);
						j.bufferData(j.ARRAY_BUFFER, Jd, id)
					}
					if (xd) {
						nd = 0;
						for (Kd = xd.length; nd < Kd; nd++) if (Fa = xd[nd], Fa.needsUpdate && (void 0 === Fa.boundTo || "vertices" === Fa.boundTo)) {
							Ka = 0;
							Hc = Fa.value.length;
							if (1 === Fa.size) for (cb = 0; cb < Hc; cb++) Fa.array[cb] = Fa.value[cb];
							else if (2 === Fa.size) for (cb = 0; cb < Hc; cb++) sb = Fa.value[cb],
							Fa.array[Ka] = sb.x,
							Fa.array[Ka + 1] = sb.y,
							Ka += 2;
							else if (3 === Fa.size) if ("c" === Fa.type) for (cb = 0; cb < Hc; cb++) sb = Fa.value[cb],
							Fa.array[Ka] = sb.r,
							Fa.array[Ka + 1] = sb.g,
							Fa.array[Ka + 2] = sb.b,
							Ka += 3;
							else for (cb = 0; cb < Hc; cb++) sb = Fa.value[cb],
							Fa.array[Ka] = sb.x,
							Fa.array[Ka + 1] = sb.y,
							Fa.array[Ka + 2] = sb.z,
							Ka += 3;
							else if (4 === Fa.size) for (cb = 0; cb < Hc; cb++) sb = Fa.value[cb],
							Fa.array[Ka] = sb.x,
							Fa.array[Ka + 1] = sb.y,
							Fa.array[Ka + 2] = sb.z,
							Fa.array[Ka + 3] = sb.w,
							Ka += 4;
							j.bindBuffer(j.ARRAY_BUFFER, Fa.buffer);
							j.bufferData(j.ARRAY_BUFFER, Fa.array, id)
						}
					}
				}
				la.verticesNeedUpdate = !1;
				la.colorsNeedUpdate = !1;
				la.lineDistancesNeedUpdate = !1;
				na.attributes && q(na)
			} else if (ma instanceof THREE.ParticleSystem) {
				na = e(ma, la);
				xa = na.attributes && n(na);
				if (la.verticesNeedUpdate || la.colorsNeedUpdate || ma.sortParticles || xa) {
					var fc = la,
					yd = j.DYNAMIC_DRAW,
					Vc = ma,
					tb = void 0,
					gc = void 0,
					hc = void 0,
					da = void 0,
					ic = void 0,
					vc = void 0,
					od = fc.vertices,
					zd = od.length,
					Ad = fc.colors,
					Ld = Ad.length,
					zc = fc.__vertexArray,
					Ac = fc.__colorArray,
					nc = fc.__sortArray,
					Md = fc.verticesNeedUpdate,
					Nd = fc.colorsNeedUpdate,
					oc = fc.__webglCustomAttributesList,
					Kb = void 0,
					Ic = void 0,
					pa = void 0,
					Lb = void 0,
					Da = void 0,
					ba = void 0;
					if (Vc.sortParticles) {
						Va.copy(Qa);
						Va.multiply(Vc.matrixWorld);
						for (tb = 0; tb < zd; tb++) hc = od[tb],
						wa.copy(hc),
						wa.applyProjection(Va),
						nc[tb] = [wa.z, tb];
						nc.sort(l);
						for (tb = 0; tb < zd; tb++) hc = od[nc[tb][1]],
						da = 3 * tb,
						zc[da] = hc.x,
						zc[da + 1] = hc.y,
						zc[da + 2] = hc.z;
						for (gc = 0; gc < Ld; gc++) da = 3 * gc,
						vc = Ad[nc[gc][1]],
						Ac[da] = vc.r,
						Ac[da + 1] = vc.g,
						Ac[da + 2] = vc.b;
						if (oc) {
							Kb = 0;
							for (Ic = oc.length; Kb < Ic; Kb++) if (ba = oc[Kb], void 0 === ba.boundTo || "vertices" === ba.boundTo) if (da = 0, Lb = ba.value.length, 1 === ba.size) for (pa = 0; pa < Lb; pa++) ic = nc[pa][1],
							ba.array[pa] = ba.value[ic];
							else if (2 === ba.size) for (pa = 0; pa < Lb; pa++) ic = nc[pa][1],
							Da = ba.value[ic],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							da += 2;
							else if (3 === ba.size) if ("c" === ba.type) for (pa = 0; pa < Lb; pa++) ic = nc[pa][1],
							Da = ba.value[ic],
							ba.array[da] = Da.r,
							ba.array[da + 1] = Da.g,
							ba.array[da + 2] = Da.b,
							da += 3;
							else for (pa = 0; pa < Lb; pa++) ic = nc[pa][1],
							Da = ba.value[ic],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							ba.array[da + 2] = Da.z,
							da += 3;
							else if (4 === ba.size) for (pa = 0; pa < Lb; pa++) ic = nc[pa][1],
							Da = ba.value[ic],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							ba.array[da + 2] = Da.z,
							ba.array[da + 3] = Da.w,
							da += 4
						}
					} else {
						if (Md) for (tb = 0; tb < zd; tb++) hc = od[tb],
						da = 3 * tb,
						zc[da] = hc.x,
						zc[da + 1] = hc.y,
						zc[da + 2] = hc.z;
						if (Nd) for (gc = 0; gc < Ld; gc++) vc = Ad[gc],
						da = 3 * gc,
						Ac[da] = vc.r,
						Ac[da + 1] = vc.g,
						Ac[da + 2] = vc.b;
						if (oc) {
							Kb = 0;
							for (Ic = oc.length; Kb < Ic; Kb++) if (ba = oc[Kb], ba.needsUpdate && (void 0 === ba.boundTo || "vertices" === ba.boundTo)) if (Lb = ba.value.length, da = 0, 1 === ba.size) for (pa = 0; pa < Lb; pa++) ba.array[pa] = ba.value[pa];
							else if (2 === ba.size) for (pa = 0; pa < Lb; pa++) Da = ba.value[pa],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							da += 2;
							else if (3 === ba.size) if ("c" === ba.type) for (pa = 0; pa < Lb; pa++) Da = ba.value[pa],
							ba.array[da] = Da.r,
							ba.array[da + 1] = Da.g,
							ba.array[da + 2] = Da.b,
							da += 3;
							else for (pa = 0; pa < Lb; pa++) Da = ba.value[pa],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							ba.array[da + 2] = Da.z,
							da += 3;
							else if (4 === ba.size) for (pa = 0; pa < Lb; pa++) Da = ba.value[pa],
							ba.array[da] = Da.x,
							ba.array[da + 1] = Da.y,
							ba.array[da + 2] = Da.z,
							ba.array[da + 3] = Da.w,
							da += 4
						}
					}
					if (Md || Vc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, fc.__webglVertexBuffer),
					j.bufferData(j.ARRAY_BUFFER, zc, yd);
					if (Nd || Vc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, fc.__webglColorBuffer),
					j.bufferData(j.ARRAY_BUFFER, Ac, yd);
					if (oc) {
						Kb = 0;
						for (Ic = oc.length; Kb < Ic; Kb++) if (ba = oc[Kb], ba.needsUpdate || Vc.sortParticles) j.bindBuffer(j.ARRAY_BUFFER, ba.buffer),
						j.bufferData(j.ARRAY_BUFFER, ba.array, yd)
					}
				}
				la.verticesNeedUpdate = !1;
				la.colorsNeedUpdate = !1;
				na.attributes && q(na)
			}
		}
	};
	this.initMaterial = function(a, b, c, d) {
		var e, f, g, h;
		a.addEventListener("dispose", Xc);
		var i, k, l, m, p;
		a instanceof THREE.MeshDepthMaterial ? p = "depth": a instanceof THREE.MeshNormalMaterial ? p = "normal": a instanceof THREE.MeshBasicMaterial ? p = "basic": a instanceof THREE.MeshLambertMaterial ? p = "lambert": a instanceof THREE.MeshPhongMaterial ? p = "phong": a instanceof THREE.LineBasicMaterial ? p = "basic": a instanceof THREE.LineDashedMaterial ? p = "dashed": a instanceof THREE.ParticleBasicMaterial && (p = "particle_basic");
		if (p) {
			var n = THREE.ShaderLib[p];
			a.uniforms = THREE.UniformsUtils.clone(n.uniforms);
			a.vertexShader = n.vertexShader;
			a.fragmentShader = n.fragmentShader
		}
		var q, s, r;
		e = g = s = r = n = 0;
		for (f = b.length; e < f; e++) q = b[e],
		q.onlyShadow || (q instanceof THREE.DirectionalLight && g++, q instanceof THREE.PointLight && s++, q instanceof THREE.SpotLight && r++, q instanceof THREE.HemisphereLight && n++);
		e = g;
		f = s;
		g = r;
		h = n;
		n = q = 0;
		for (r = b.length; n < r; n++) s = b[n],
		s.castShadow && (s instanceof THREE.SpotLight && q++, s instanceof THREE.DirectionalLight && !s.shadowCascade && q++);
		m = q;
		Cc && d && d.useVertexTexture ? l = 1024 : (b = j.getParameter(j.MAX_VERTEX_UNIFORM_VECTORS), b = Math.floor((b - 20) / 4), void 0 !== d && d instanceof THREE.SkinnedMesh && (b = Math.min(d.bones.length, b), b < d.bones.length && console.warn("WebGLRenderer: too many bones - " + d.bones.length + ", this GPU supports just " + b + " (try OpenGL instead of ANGLE)")), l = b);
		a: {
			s = a.fragmentShader;
			r = a.vertexShader;
			n = a.uniforms;
			b = a.attributes;
			q = a.defines;
			var c = {
				map: !!a.map,
				envMap: !!a.envMap,
				lightMap: !!a.lightMap,
				bumpMap: !!a.bumpMap,
				normalMap: !!a.normalMap,
				specularMap: !!a.specularMap,
				vertexColors: a.vertexColors,
				fog: c,
				useFog: a.fog,
				fogExp: c instanceof THREE.FogExp2,
				sizeAttenuation: a.sizeAttenuation,
				skinning: a.skinning,
				maxBones: l,
				useVertexTexture: Cc && d && d.useVertexTexture,
				boneTextureWidth: d && d.boneTextureWidth,
				boneTextureHeight: d && d.boneTextureHeight,
				morphTargets: a.morphTargets,
				morphNormals: a.morphNormals,
				maxMorphTargets: this.maxMorphTargets,
				maxMorphNormals: this.maxMorphNormals,
				maxDirLights: e,
				maxPointLights: f,
				maxSpotLights: g,
				maxHemiLights: h,
				maxShadows: m,
				shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
				shadowMapType: this.shadowMapType,
				shadowMapDebug: this.shadowMapDebug,
				shadowMapCascade: this.shadowMapCascade,
				alphaTest: a.alphaTest,
				metal: a.metal,
				perPixel: a.perPixel,
				wrapAround: a.wrapAround,
				doubleSided: a.side === THREE.DoubleSide,
				flipSided: a.side === THREE.BackSide
			},
			t,
			u,
			x,
			d = [];
			p ? d.push(p) : (d.push(s), d.push(r));
			for (u in q) d.push(u),
			d.push(q[u]);
			for (t in c) d.push(t),
			d.push(c[t]);
			p = d.join();
			t = 0;
			for (u = ca.length; t < u; t++) if (d = ca[t], d.code === p) {
				d.usedTimes++;
				k = d.program;
				break a
			}
			t = "SHADOWMAP_TYPE_BASIC";
			c.shadowMapType === THREE.PCFShadowMap ? t = "SHADOWMAP_TYPE_PCF": c.shadowMapType === THREE.PCFSoftShadowMap && (t = "SHADOWMAP_TYPE_PCF_SOFT");
			u = [];
			for (x in q) d = q[x],
			!1 !== d && (d = "#define " + x + " " + d, u.push(d));
			d = u.join("\n");
			x = j.createProgram();
			u = ["precision " + K + " float;", d, Bc ? "#define VERTEX_TEXTURES": "", L.gammaInput ? "#define GAMMA_INPUT": "", L.gammaOutput ? "#define GAMMA_OUTPUT": "", L.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING": "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP": "", c.envMap ? "#define USE_ENVMAP": "", c.lightMap ? "#define USE_LIGHTMAP": "", c.bumpMap ? "#define USE_BUMPMAP": "", c.normalMap ? "#define USE_NORMALMAP": "", c.specularMap ? "#define USE_SPECULARMAP": "", c.vertexColors ? "#define USE_COLOR": "", c.skinning ? "#define USE_SKINNING": "", c.useVertexTexture ? "#define BONE_TEXTURE": "", c.boneTextureWidth ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) : "", c.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) : "", c.morphTargets ? "#define USE_MORPHTARGETS": "", c.morphNormals ? "#define USE_MORPHNORMALS": "", c.perPixel ? "#define PHONG_PER_PIXEL": "", c.wrapAround ? "#define WRAP_AROUND": "", c.doubleSided ? "#define DOUBLE_SIDED": "", c.flipSided ? "#define FLIP_SIDED": "", c.shadowMapEnabled ? "#define USE_SHADOWMAP": "", c.shadowMapEnabled ? "#define " + t: "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG": "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE": "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION": "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
			t = ["precision " + K + " float;", c.bumpMap || c.normalMap ? "#extension GL_OES_standard_derivatives : enable": "", d, "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest: "", L.gammaInput ? "#define GAMMA_INPUT": "", L.gammaOutput ? "#define GAMMA_OUTPUT": "", L.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING": "", c.useFog && c.fog ? "#define USE_FOG": "", c.useFog && c.fogExp ? "#define FOG_EXP2": "", c.map ? "#define USE_MAP": "", c.envMap ? "#define USE_ENVMAP": "", c.lightMap ? "#define USE_LIGHTMAP": "", c.bumpMap ? "#define USE_BUMPMAP": "", c.normalMap ? "#define USE_NORMALMAP": "", c.specularMap ? "#define USE_SPECULARMAP": "", c.vertexColors ? "#define USE_COLOR": "", c.metal ? "#define METAL": "", c.perPixel ? "#define PHONG_PER_PIXEL": "", c.wrapAround ? "#define WRAP_AROUND": "", c.doubleSided ? "#define DOUBLE_SIDED": "", c.flipSided ? "#define FLIP_SIDED": "", c.shadowMapEnabled ? "#define USE_SHADOWMAP": "", c.shadowMapEnabled ? "#define " + t: "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG": "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE": "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
			t = E("fragment", t + s);
			u = E("vertex", u + r);
			j.attachShader(x, u);
			j.attachShader(x, t);
			j.linkProgram(x);
			j.getProgramParameter(x, j.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + j.getProgramParameter(x, j.VALIDATE_STATUS) + ", gl error [" + j.getError() + "]");
			j.deleteShader(t);
			j.deleteShader(u);
			x.uniforms = {};
			x.attributes = {};
			var w;
			t = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");
			c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
			for (w in n) t.push(w);
			w = t;
			t = 0;
			for (u = w.length; t < u; t++) n = w[t],
			x.uniforms[n] = j.getUniformLocation(x, n);
			t = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");
			for (w = 0; w < c.maxMorphTargets; w++) t.push("morphTarget" + w);
			for (w = 0; w < c.maxMorphNormals; w++) t.push("morphNormal" + w);
			for (k in b) t.push(k);
			k = t;
			w = 0;
			for (b = k.length; w < b; w++) t = k[w],
			x.attributes[t] = j.getAttribLocation(x, t);
			x.id = ta++;
			ca.push({
				program: x,
				code: p,
				usedTimes: 1
			});
			L.info.memory.programs = ca.length;
			k = x
		}
		a.program = k;
		w = a.program.attributes;
		if (a.morphTargets) {
			a.numSupportedMorphTargets = 0;
			b = "morphTarget";
			for (k = 0; k < this.maxMorphTargets; k++) x = b + k,
			0 <= w[x] && a.numSupportedMorphTargets++
		}
		if (a.morphNormals) {
			a.numSupportedMorphNormals = 0;
			b = "morphNormal";
			for (k = 0; k < this.maxMorphNormals; k++) x = b + k,
			0 <= w[x] && a.numSupportedMorphNormals++
		}
		a.uniformsList = [];
		for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i])
	};
	this.setFaceCulling = function(a, b) {
		a === THREE.CullFaceNone ? j.disable(j.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? j.frontFace(j.CW) : j.frontFace(j.CCW), a === THREE.CullFaceBack ? j.cullFace(j.BACK) : a === THREE.CullFaceFront ? j.cullFace(j.FRONT) : j.cullFace(j.FRONT_AND_BACK), j.enable(j.CULL_FACE))
	};
	this.setMaterialFaces = function(a) {
		var b = a.side === THREE.DoubleSide,
		a = a.side === THREE.BackSide;
		ha !== b && (b ? j.disable(j.CULL_FACE) : j.enable(j.CULL_FACE), ha = b);
		V !== a && (a ? j.frontFace(j.CW) : j.frontFace(j.CCW), V = a)
	};
	this.setDepthTest = function(a) {
		na !== a && (a ? j.enable(j.DEPTH_TEST) : j.disable(j.DEPTH_TEST), na = a)
	};
	this.setDepthWrite = function(a) {
		Pa !== a && (j.depthMask(a), Pa = a)
	};
	this.setBlending = function(a, b, c, d) {
		a !== $ && (a === THREE.NoBlending ? j.disable(j.BLEND) : a === THREE.AdditiveBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.SRC_ALPHA, j.ONE)) : a === THREE.SubtractiveBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR)) : a === THREE.MultiplyBlending ? (j.enable(j.BLEND), j.blendEquation(j.FUNC_ADD), j.blendFunc(j.ZERO, j.SRC_COLOR)) : a === THREE.CustomBlending ? j.enable(j.BLEND) : (j.enable(j.BLEND), j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD), j.blendFuncSeparate(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA, j.ONE, j.ONE_MINUS_SRC_ALPHA)), $ = a);
		if (a === THREE.CustomBlending) {
			if (b !== Y && (j.blendEquation(F(b)), Y = b), c !== ia || d !== ra) j.blendFunc(F(c), F(d)),
			ia = c,
			ra = d
		} else ra = ia = Y = null
	};
	this.setTexture = function(a, b) {
		if (a.needsUpdate) {
			a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", Zc), a.__webglTexture = j.createTexture(), L.info.memory.textures++);
			j.activeTexture(j.TEXTURE0 + b);
			j.bindTexture(j.TEXTURE_2D, a.__webglTexture);
			j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, a.flipY);
			j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
			j.pixelStorei(j.UNPACK_ALIGNMENT, a.unpackAlignment);
			var c = a.image,
			d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
			e = F(a.format),
			f = F(a.type);
			Z(j.TEXTURE_2D, a, d);
			var g = a.mipmaps;
			if (a instanceof THREE.DataTexture) if (0 < g.length && d) {
				for (var h = 0,
				i = g.length; h < i; h++) c = g[h],
				j.texImage2D(j.TEXTURE_2D, h, e, c.width, c.height, 0, e, f, c.data);
				a.generateMipmaps = !1
			} else j.texImage2D(j.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
			else if (a instanceof THREE.CompressedTexture) {
				h = 0;
				for (i = g.length; h < i; h++) c = g[h],
				j.compressedTexImage2D(j.TEXTURE_2D, h, e, c.width, c.height, 0, c.data)
			} else if (0 < g.length && d) {
				h = 0;
				for (i = g.length; h < i; h++) c = g[h],
				j.texImage2D(j.TEXTURE_2D, h, e, e, f, c);
				a.generateMipmaps = !1
			} else j.texImage2D(j.TEXTURE_2D, 0, e, e, f, a.image);
			a.generateMipmaps && d && j.generateMipmap(j.TEXTURE_2D);
			a.needsUpdate = !1;
			if (a.onUpdate) a.onUpdate()
		} else j.activeTexture(j.TEXTURE0 + b),
		j.bindTexture(j.TEXTURE_2D, a.__webglTexture)
	};
	this.setRenderTarget = function(a) {
		var b = a instanceof THREE.WebGLRenderTargetCube;
		if (a && !a.__webglFramebuffer) {
			void 0 === a.depthBuffer && (a.depthBuffer = !0);
			void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
			a.addEventListener("dispose", Jc);
			a.__webglTexture = j.createTexture();
			L.info.memory.textures++;
			var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
			d = F(a.format),
			e = F(a.type);
			if (b) {
				a.__webglFramebuffer = [];
				a.__webglRenderbuffer = [];
				j.bindTexture(j.TEXTURE_CUBE_MAP, a.__webglTexture);
				Z(j.TEXTURE_CUBE_MAP, a, c);
				for (var f = 0; 6 > f; f++) {
					a.__webglFramebuffer[f] = j.createFramebuffer();
					a.__webglRenderbuffer[f] = j.createRenderbuffer();
					j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
					var g = a,
					h = j.TEXTURE_CUBE_MAP_POSITIVE_X + f;
					j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer[f]);
					j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, h, g.__webglTexture, 0);
					A(a.__webglRenderbuffer[f], a)
				}
				c && j.generateMipmap(j.TEXTURE_CUBE_MAP)
			} else a.__webglFramebuffer = j.createFramebuffer(),
			a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer: j.createRenderbuffer(),
			j.bindTexture(j.TEXTURE_2D, a.__webglTexture),
			Z(j.TEXTURE_2D, a, c),
			j.texImage2D(j.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null),
			d = j.TEXTURE_2D,
			j.bindFramebuffer(j.FRAMEBUFFER, a.__webglFramebuffer),
			j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, d, a.__webglTexture, 0),
			a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && j.framebufferRenderbuffer(j.FRAMEBUFFER, j.DEPTH_STENCIL_ATTACHMENT, j.RENDERBUFFER, a.__webglRenderbuffer) : A(a.__webglRenderbuffer, a),
			c && j.generateMipmap(j.TEXTURE_2D);
			b ? j.bindTexture(j.TEXTURE_CUBE_MAP, null) : j.bindTexture(j.TEXTURE_2D, null);
			j.bindRenderbuffer(j.RENDERBUFFER, null);
			j.bindFramebuffer(j.FRAMEBUFFER, null)
		}
		a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = Mb, a = wb, d = ob, e = Gb);
		b !== $a && (j.bindFramebuffer(j.FRAMEBUFFER, b), j.viewport(d, e, c, a), $a = b);
		Nb = c;
		Ob = a
	};
	this.shadowMapPlugin = new THREE.ShadowMapPlugin;
	this.addPrePlugin(this.shadowMapPlugin);
	this.addPostPlugin(new THREE.SpritePlugin);
	this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function(a, b, c) {
	THREE.EventDispatcher.call(this);
	this.width = a;
	this.height = b;
	c = c || {};
	this.wrapS = void 0 !== c.wrapS ? c.wrapS: THREE.ClampToEdgeWrapping;
	this.wrapT = void 0 !== c.wrapT ? c.wrapT: THREE.ClampToEdgeWrapping;
	this.magFilter = void 0 !== c.magFilter ? c.magFilter: THREE.LinearFilter;
	this.minFilter = void 0 !== c.minFilter ? c.minFilter: THREE.LinearMipMapLinearFilter;
	this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy: 1;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.format = void 0 !== c.format ? c.format: THREE.RGBAFormat;
	this.type = void 0 !== c.type ? c.type: THREE.UnsignedByteType;
	this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer: !0;
	this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer: !0;
	this.generateMipmaps = !0;
	this.shareDepthFrom = null
};
THREE.WebGLRenderTarget.prototype.clone = function() {
	var a = new THREE.WebGLRenderTarget(this.width, this.height);
	a.wrapS = this.wrapS;
	a.wrapT = this.wrapT;
	a.magFilter = this.magFilter;
	a.minFilter = this.minFilter;
	a.anisotropy = this.anisotropy;
	a.offset.copy(this.offset);
	a.repeat.copy(this.repeat);
	a.format = this.format;
	a.type = this.type;
	a.depthBuffer = this.depthBuffer;
	a.stencilBuffer = this.stencilBuffer;
	a.generateMipmaps = this.generateMipmaps;
	a.shareDepthFrom = this.shareDepthFrom;
	return a
};
THREE.WebGLRenderTarget.prototype.dispose = function() {
	this.dispatchEvent({
		type: "dispose"
	})
};
THREE.WebGLRenderTargetCube = function(a, b, c) {
	THREE.WebGLRenderTarget.call(this, a, b, c);
	this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.RenderableVertex = function() {
	this.positionWorld = new THREE.Vector3;
	this.positionScreen = new THREE.Vector4;
	this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function(a) {
	this.positionWorld.copy(a.positionWorld);
	this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function() {
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.v3 = new THREE.RenderableVertex;
	this.centroidModel = new THREE.Vector3;
	this.normalModel = new THREE.Vector3;
	this.normalModelView = new THREE.Vector3;
	this.vertexNormalsLength = 0;
	this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.material = this.color = null;
	this.uvs = [[]];
	this.z = null
};
THREE.RenderableFace4 = function() {
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.v3 = new THREE.RenderableVertex;
	this.v4 = new THREE.RenderableVertex;
	this.centroidModel = new THREE.Vector3;
	this.normalModel = new THREE.Vector3;
	this.normalModelView = new THREE.Vector3;
	this.vertexNormalsLength = 0;
	this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
	this.material = this.color = null;
	this.uvs = [[]];
	this.z = null
};
THREE.RenderableObject = function() {
	this.z = this.object = null
};
THREE.RenderableParticle = function() {
	this.rotation = this.z = this.y = this.x = this.object = null;
	this.scale = new THREE.Vector2;
	this.material = null
};
THREE.RenderableLine = function() {
	this.z = null;
	this.v1 = new THREE.RenderableVertex;
	this.v2 = new THREE.RenderableVertex;
	this.material = null
};
THREE.GeometryUtils = {
	merge: function(a, b) {
		var c, d, e = a.vertices.length,
		f = b instanceof THREE.Mesh ? b.geometry: b,
		g = a.vertices,
		h = f.vertices,
		i = a.faces,
		k = f.faces,
		l = a.faceVertexUvs[0],
		f = f.faceVertexUvs[0];
		b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, d = new THREE.Matrix3, d.getInverse(c), d.transpose());
		for (var m = 0,
		p = h.length; m < p; m++) {
			var s = h[m].clone();
			c && s.applyMatrix4(c);
			g.push(s)
		}
		m = 0;
		for (p = k.length; m < p; m++) {
			var s = k[m],
			r,
			n,
			q = s.vertexNormals,
			z = s.vertexColors;
			s instanceof THREE.Face3 ? r = new THREE.Face3(s.a + e, s.b + e, s.c + e) : s instanceof THREE.Face4 && (r = new THREE.Face4(s.a + e, s.b + e, s.c + e, s.d + e));
			r.normal.copy(s.normal);
			d && r.normal.applyMatrix3(d).normalize();
			g = 0;
			for (h = q.length; g < h; g++) n = q[g].clone(),
			d && n.applyMatrix3(d).normalize(),
			r.vertexNormals.push(n);
			r.color.copy(s.color);
			g = 0;
			for (h = z.length; g < h; g++) n = z[g],
			r.vertexColors.push(n.clone());
			r.materialIndex = s.materialIndex;
			r.centroid.copy(s.centroid);
			c && r.centroid.applyMatrix4(c);
			i.push(r)
		}
		m = 0;
		for (p = f.length; m < p; m++) {
			c = f[m];
			d = [];
			g = 0;
			for (h = c.length; g < h; g++) d.push(new THREE.Vector2(c[g].x, c[g].y));
			l.push(d)
		}
	},
	removeMaterials: function(a, b) {
		for (var c = {},
		d = 0,
		e = b.length; d < e; d++) c[b[d]] = !0;
		for (var f, g = [], d = 0, e = a.faces.length; d < e; d++) f = a.faces[d],
		f.materialIndex in c || g.push(f);
		a.faces = g
	},
	randomPointInTriangle: function(a, b, c) {
		var d, e, f, g = new THREE.Vector3,
		h = THREE.GeometryUtils.__v1;
		d = THREE.GeometryUtils.random();
		e = THREE.GeometryUtils.random();
		1 < d + e && (d = 1 - d, e = 1 - e);
		f = 1 - d - e;
		g.copy(a);
		g.multiplyScalar(d);
		h.copy(b);
		h.multiplyScalar(e);
		g.add(h);
		h.copy(c);
		h.multiplyScalar(f);
		g.add(h);
		return g
	},
	randomPointInFace: function(a, b, c) {
		var d, e, f;
		if (a instanceof THREE.Face3) return d = b.vertices[a.a],
		e = b.vertices[a.b],
		f = b.vertices[a.c],
		THREE.GeometryUtils.randomPointInTriangle(d, e, f);
		if (a instanceof THREE.Face4) {
			d = b.vertices[a.a];
			e = b.vertices[a.b];
			f = b.vertices[a.c];
			var b = b.vertices[a.d],
			g;
			c ? a._area1 && a._area2 ? (c = a._area1, g = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = g) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b));
			return THREE.GeometryUtils.random() * (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
		}
	},
	randomPointsInGeometry: function(a, b) {
		function c(a) {
			function b(c, d) {
				if (d < c) return c;
				var e = c + Math.floor((d - c) / 2);
				return k[e] > a ? b(c, e - 1) : k[e] < a ? b(e + 1, d) : e
			}
			return b(0, k.length - 1)
		}
		var d, e, f = a.faces,
		g = a.vertices,
		h = f.length,
		i = 0,
		k = [],
		l,
		m,
		p,
		s;
		for (e = 0; e < h; e++) d = f[e],
		d instanceof THREE.Face3 ? (l = g[d.a], m = g[d.b], p = g[d.c], d._area = THREE.GeometryUtils.triangleArea(l, m, p)) : d instanceof THREE.Face4 && (l = g[d.a], m = g[d.b], p = g[d.c], s = g[d.d], d._area1 = THREE.GeometryUtils.triangleArea(l, m, s), d._area2 = THREE.GeometryUtils.triangleArea(m, p, s), d._area = d._area1 + d._area2),
		i += d._area,
		k[e] = i;
		d = [];
		for (e = 0; e < b; e++) g = THREE.GeometryUtils.random() * i,
		g = c(g),
		d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0);
		return d
	},
	triangleArea: function(a, b, c) {
		var d = THREE.GeometryUtils.__v1,
		e = THREE.GeometryUtils.__v2;
		d.subVectors(b, a);
		e.subVectors(c, a);
		d.cross(e);
		return 0.5 * d.length()
	},
	center: function(a) {
		a.computeBoundingBox();
		var b = a.boundingBox,
		c = new THREE.Vector3;
		c.addVectors(b.min, b.max);
		c.multiplyScalar( - 0.5);
		a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
		a.computeBoundingBox();
		return c
	},
	normalizeUVs: function(a) {
		for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++) for (var d = a[b], e = 0, f = d.length; e < f; e++) 1 !== d[e].x && (d[e].x -= Math.floor(d[e].x)),
		1 !== d[e].y && (d[e].y -= Math.floor(d[e].y))
	},
	triangulateQuads: function(a) {
		var b, c, d, e, f = [],
		g = [],
		h = [];
		b = 0;
		for (c = a.faceUvs.length; b < c; b++) g[b] = [];
		b = 0;
		for (c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
		b = 0;
		for (c = a.faces.length; b < c; b++) if (d = a.faces[b], d instanceof THREE.Face4) {
			e = d.a;
			var i = d.b,
			k = d.c,
			l = d.d,
			m = new THREE.Face3,
			p = new THREE.Face3;
			m.color.copy(d.color);
			p.color.copy(d.color);
			m.materialIndex = d.materialIndex;
			p.materialIndex = d.materialIndex;
			m.a = e;
			m.b = i;
			m.c = l;
			p.a = i;
			p.b = k;
			p.c = l;
			4 === d.vertexColors.length && (m.vertexColors[0] = d.vertexColors[0].clone(), m.vertexColors[1] = d.vertexColors[1].clone(), m.vertexColors[2] = d.vertexColors[3].clone(), p.vertexColors[0] = d.vertexColors[1].clone(), p.vertexColors[1] = d.vertexColors[2].clone(), p.vertexColors[2] = d.vertexColors[3].clone());
			f.push(m, p);
			d = 0;
			for (e = a.faceVertexUvs.length; d < e; d++) a.faceVertexUvs[d].length && (m = a.faceVertexUvs[d][b], i = m[1], k = m[2], l = m[3], m = [m[0].clone(), i.clone(), l.clone()], i = [i.clone(), k.clone(), l.clone()], h[d].push(m, i));
			d = 0;
			for (e = a.faceUvs.length; d < e; d++) a.faceUvs[d].length && (i = a.faceUvs[d][b], g[d].push(i, i))
		} else {
			f.push(d);
			d = 0;
			for (e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d][b]);
			d = 0;
			for (e = a.faceVertexUvs.length; d < e; d++) h[d].push(a.faceVertexUvs[d][b])
		}
		a.faces = f;
		a.faceUvs = g;
		a.faceVertexUvs = h;
		a.computeCentroids();
		a.computeFaceNormals();
		a.computeVertexNormals();
		a.hasTangents && a.computeTangents()
	},
	setMaterialIndex: function(a, b, c, d) {
		a = a.faces;
		d = d || a.length - 1;
		for (c = c || 0; c <= d; c++) a[c].materialIndex = b
	}
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.GeometryUtils.__v2 = new THREE.Vector3;
THREE.ImageUtils = {
	crossOrigin: "anonymous",
	loadTexture: function(a, b, c, d) {
		var e = new Image,
		f = new THREE.Texture(e, b),
		b = new THREE.ImageLoader;
		b.addEventListener("load",
		function(a) {
			f.image = a.content;
			f.needsUpdate = !0;
			c && c(f)
		});
		b.addEventListener("error",
		function(a) {
			d && d(a.message)
		});
		b.crossOrigin = this.crossOrigin;
		b.load(a, e);
		f.sourceFile = a;
		return f
	},
	loadCompressedTexture: function(a, b, c, d) {
		var e = new THREE.CompressedTexture;
		e.mapping = b;
		var f = new XMLHttpRequest;
		f.onload = function() {
			var a = THREE.ImageUtils.parseDDS(f.response, !0);
			e.format = a.format;
			e.mipmaps = a.mipmaps;
			e.image.width = a.width;
			e.image.height = a.height;
			e.generateMipmaps = !1;
			e.needsUpdate = !0;
			c && c(e)
		};
		f.onerror = d;
		f.open("GET", a, !0);
		f.responseType = "arraybuffer";
		f.send(null);
		return e
	},
	loadTextureCube: function(a, b, c, d) {
		var e = [];
		e.loadCount = 0;
		var f = new THREE.Texture;
		f.image = e;
		void 0 !== b && (f.mapping = b);
		f.flipY = !1;
		for (var b = 0,
		g = a.length; b < g; ++b) {
			var h = new Image;
			e[b] = h;
			h.onload = function() {
				e.loadCount += 1;
				6 === e.loadCount && (f.needsUpdate = !0, c && c(f))
			};
			h.onerror = d;
			h.crossOrigin = this.crossOrigin;
			h.src = a[b]
		}
		return f
	},
	loadCompressedTextureCube: function(a, b, c, d) {
		var e = [];
		e.loadCount = 0;
		var f = new THREE.CompressedTexture;
		f.image = e;
		void 0 !== b && (f.mapping = b);
		f.flipY = !1;
		f.generateMipmaps = !1;
		b = function(a, b) {
			return function() {
				var d = THREE.ImageUtils.parseDDS(a.response, !0);
				b.format = d.format;
				b.mipmaps = d.mipmaps;
				b.width = d.width;
				b.height = d.height;
				e.loadCount += 1;
				6 === e.loadCount && (f.format = d.format, f.needsUpdate = !0, c && c(f))
			}
		};
		if (a instanceof Array) for (var g = 0,
		h = a.length; g < h; ++g) {
			var i = {};
			e[g] = i;
			var k = new XMLHttpRequest;
			k.onload = b(k, i);
			k.onerror = d;
			i = a[g];
			k.open("GET", i, !0);
			k.responseType = "arraybuffer";
			k.send(null)
		} else k = new XMLHttpRequest,
		k.onload = function() {
			var a = THREE.ImageUtils.parseDDS(k.response, !0);
			if (a.isCubemap) {
				for (var b = a.mipmaps.length / a.mipmapCount,
				d = 0; d < b; d++) {
					e[d] = {
						mipmaps: []
					};
					for (var g = 0; g < a.mipmapCount; g++) e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + g]),
					e[d].format = a.format,
					e[d].width = a.width,
					e[d].height = a.height
				}
				f.format = a.format;
				f.needsUpdate = !0;
				c && c(f)
			}
		},
		k.onerror = d,
		k.open("GET", a, !0),
		k.responseType = "arraybuffer",
		k.send(null);
		return f
	},
	parseDDS: function(a, b) {
		function c(a) {
			return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
		}
		var d = {
			mipmaps: [],
			width: 0,
			height: 0,
			format: null,
			mipmapCount: 1
		},
		e = c("DXT1"),
		f = c("DXT3"),
		g = c("DXT5"),
		h = new Int32Array(a, 0, 31);
		if (542327876 !== h[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"),
		d;
		if (!h[20] & 4) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"),
		d;
		var i = h[21];
		switch (i) {
		case e:
			e = 8;
			d.format = THREE.RGB_S3TC_DXT1_Format;
			break;
		case f:
			e = 16;
			d.format = THREE.RGBA_S3TC_DXT3_Format;
			break;
		case g:
			e = 16;
			d.format = THREE.RGBA_S3TC_DXT5_Format;
			break;
		default:
			return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(i & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255)),
			d
		}
		d.mipmapCount = 1;
		h[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, h[7]));
		d.isCubemap = h[28] & 512 ? !0 : !1;
		d.width = h[4];
		d.height = h[3];
		for (var h = h[1] + 4, f = d.width, g = d.height, i = d.isCubemap ? 6 : 1, k = 0; k < i; k++) {
			for (var l = 0; l < d.mipmapCount; l++) {
				var m = Math.max(4, f) / 4 * Math.max(4, g) / 4 * e,
				p = {
					data: new Uint8Array(a, h, m),
					width: f,
					height: g
				};
				d.mipmaps.push(p);
				h += m;
				f = Math.max(0.5 * f, 1);
				g = Math.max(0.5 * g, 1)
			}
			f = d.width;
			g = d.height
		}
		return d
	},
	getNormalMap: function(a, b) {
		var c = function(a) {
			var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
			return [a[0] / b, a[1] / b, a[2] / b]
		},
		b = b | 1,
		d = a.width,
		e = a.height,
		f = document.createElement("canvas");
		f.width = d;
		f.height = e;
		var g = f.getContext("2d");
		g.drawImage(a, 0, 0);
		for (var h = g.getImageData(0, 0, d, e).data, i = g.createImageData(d, e), k = i.data, l = 0; l < d; l++) for (var m = 0; m < e; m++) {
			var p = 0 > m - 1 ? 0 : m - 1,
			s = m + 1 > e - 1 ? e - 1 : m + 1,
			r = 0 > l - 1 ? 0 : l - 1,
			n = l + 1 > d - 1 ? d - 1 : l + 1,
			q = [],
			z = [0, 0, h[4 * (m * d + l)] / 255 * b];
			q.push([ - 1, 0, h[4 * (m * d + r)] / 255 * b]);
			q.push([ - 1, -1, h[4 * (p * d + r)] / 255 * b]);
			q.push([0, -1, h[4 * (p * d + l)] / 255 * b]);
			q.push([1, -1, h[4 * (p * d + n)] / 255 * b]);
			q.push([1, 0, h[4 * (m * d + n)] / 255 * b]);
			q.push([1, 1, h[4 * (s * d + n)] / 255 * b]);
			q.push([0, 1, h[4 * (s * d + l)] / 255 * b]);
			q.push([ - 1, 1, h[4 * (s * d + r)] / 255 * b]);
			p = [];
			r = q.length;
			for (s = 0; s < r; s++) {
				var n = q[s],
				t = q[(s + 1) % r],
				n = [n[0] - z[0], n[1] - z[1], n[2] - z[2]],
				t = [t[0] - z[0], t[1] - z[1], t[2] - z[2]];
				p.push(c([n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]))
			}
			q = [0, 0, 0];
			for (s = 0; s < p.length; s++) q[0] += p[s][0],
			q[1] += p[s][1],
			q[2] += p[s][2];
			q[0] /= p.length;
			q[1] /= p.length;
			q[2] /= p.length;
			z = 4 * (m * d + l);
			k[z] = 255 * ((q[0] + 1) / 2) | 0;
			k[z + 1] = 255 * ((q[1] + 1) / 2) | 0;
			k[z + 2] = 255 * q[2] | 0;
			k[z + 3] = 255
		}
		g.putImageData(i, 0, 0);
		return f
	},
	generateDataTexture: function(a, b, c) {
		for (var d = a * b,
		e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g), c = Math.floor(255 * c.b), h = 0; h < d; h++) e[3 * h] = f,
		e[3 * h + 1] = g,
		e[3 * h + 2] = c;
		a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
		a.needsUpdate = !0;
		return a
	}
};
THREE.SceneUtils = {
	createMultiMaterialObject: function(a, b) {
		for (var c = new THREE.Object3D,
		d = 0,
		e = b.length; d < e; d++) c.add(new THREE.Mesh(a, b[d]));
		return c
	},
	detach: function(a, b, c) {
		a.applyMatrix(b.matrixWorld);
		b.remove(a);
		c.add(a)
	},
	attach: function(a, b, c) {
		var d = new THREE.Matrix4;
		d.getInverse(c.matrixWorld);
		a.applyMatrix(d);
		b.remove(a);
		c.add(a)
	}
};
THREE.FontUtils = {
	faces: {},
	face: "helvetiker",
	weight: "normal",
	style: "normal",
	size: 150,
	divisions: 10,
	getFace: function() {
		return this.faces[this.face][this.weight][this.style]
	},
	loadFace: function(a) {
		var b = a.familyName.toLowerCase();
		this.faces[b] = this.faces[b] || {};
		this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
		this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
		return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
	},
	drawText: function(a) {
		for (var b = this.getFace(), c = this.size / b.resolution, d = 0, e = String(a).split(""), f = e.length, g = [], a = 0; a < f; a++) {
			var h = new THREE.Path,
			h = this.extractGlyphPoints(e[a], b, c, d, h),
			d = d + h.offset;
			g.push(h.path)
		}
		return {
			paths: g,
			offset: d / 2
		}
	},
	extractGlyphPoints: function(a, b, c, d, e) {
		var f = [],
		g,
		h,
		i,
		k,
		l,
		m,
		p,
		s,
		r,
		n,
		q,
		z = b.glyphs[a] || b.glyphs["?"];
		if (z) {
			if (z.o) {
				b = z._cachedOutline || (z._cachedOutline = z.o.split(" "));
				k = b.length;
				for (a = 0; a < k;) switch (i = b[a++], i) {
				case "m":
					i = b[a++] * c + d;
					l = b[a++] * c;
					e.moveTo(i, l);
					break;
				case "l":
					i = b[a++] * c + d;
					l = b[a++] * c;
					e.lineTo(i, l);
					break;
				case "q":
					i = b[a++] * c + d;
					l = b[a++] * c;
					s = b[a++] * c + d;
					r = b[a++] * c;
					e.quadraticCurveTo(s, r, i, l);
					if (g = f[f.length - 1]) {
						m = g.x;
						p = g.y;
						g = 1;
						for (h = this.divisions; g <= h; g++) {
							var t = g / h;
							THREE.Shape.Utils.b2(t, m, s, i);
							THREE.Shape.Utils.b2(t, p, r, l)
						}
					}
					break;
				case "b":
					if (i = b[a++] * c + d, l = b[a++] * c, s = b[a++] * c + d, r = b[a++] * -c, n = b[a++] * c + d, q = b[a++] * -c, e.bezierCurveTo(i, l, s, r, n, q), g = f[f.length - 1]) {
						m = g.x;
						p = g.y;
						g = 1;
						for (h = this.divisions; g <= h; g++) t = g / h,
						THREE.Shape.Utils.b3(t, m, s, n, i),
						THREE.Shape.Utils.b3(t, p, r, q, l)
					}
				}
			}
			return {
				offset: z.ha * c,
				path: e
			}
		}
	}
};
THREE.FontUtils.generateShapes = function(a, b) {
	var b = b || {},
	c = void 0 !== b.curveSegments ? b.curveSegments: 4,
	d = void 0 !== b.font ? b.font: "helvetiker",
	e = void 0 !== b.weight ? b.weight: "normal",
	f = void 0 !== b.style ? b.style: "normal";
	THREE.FontUtils.size = void 0 !== b.size ? b.size: 100;
	THREE.FontUtils.divisions = c;
	THREE.FontUtils.face = d;
	THREE.FontUtils.weight = e;
	THREE.FontUtils.style = f;
	c = THREE.FontUtils.drawText(a).paths;
	d = [];
	e = 0;
	for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
	return d
}; (function(a) {
	var b = function(a) {
		for (var b = a.length,
		e = 0,
		f = b - 1,
		g = 0; g < b; f = g++) e += a[f].x * a[g].y - a[g].x * a[f].y;
		return 0.5 * e
	};
	a.Triangulate = function(a, d) {
		var e = a.length;
		if (3 > e) return null;
		var f = [],
		g = [],
		h = [],
		i,
		k,
		l;
		if (0 < b(a)) for (k = 0; k < e; k++) g[k] = k;
		else for (k = 0; k < e; k++) g[k] = e - 1 - k;
		var m = 2 * e;
		for (k = e - 1; 2 < e;) {
			if (0 >= m--) {
				console.log("Warning, unable to triangulate polygon!");
				break
			}
			i = k;
			e <= i && (i = 0);
			k = i + 1;
			e <= k && (k = 0);
			l = k + 1;
			e <= l && (l = 0);
			var p;
			a: {
				var s = p = void 0,
				r = void 0,
				n = void 0,
				q = void 0,
				z = void 0,
				t = void 0,
				x = void 0,
				u = void 0,
				s = a[g[i]].x,
				r = a[g[i]].y,
				n = a[g[k]].x,
				q = a[g[k]].y,
				z = a[g[l]].x,
				t = a[g[l]].y;
				if (1E-10 > (n - s) * (t - r) - (q - r) * (z - s)) p = !1;
				else {
					var B = void 0,
					G = void 0,
					D = void 0,
					w = void 0,
					I = void 0,
					J = void 0,
					E = void 0,
					Z = void 0,
					A = void 0,
					S = void 0,
					A = Z = E = u = x = void 0,
					B = z - n,
					G = t - q,
					D = s - z,
					w = r - t,
					I = n - s,
					J = q - r;
					for (p = 0; p < e; p++) if (! (p === i || p === k || p === l)) if (x = a[g[p]].x, u = a[g[p]].y, E = x - s, Z = u - r, A = x - n, S = u - q, x -= z, u -= t, A = B * S - G * A, E = I * Z - J * E, Z = D * u - w * x, 0 <= A && 0 <= Z && 0 <= E) {
						p = !1;
						break a
					}
					p = !0
				}
			}
			if (p) {
				f.push([a[g[i]], a[g[k]], a[g[l]]]);
				h.push([g[i], g[k], g[l]]);
				i = k;
				for (l = k + 1; l < e; i++, l++) g[i] = g[l];
				e--;
				m = 2 * e
			}
		}
		return d ? h: f
	};
	a.Triangulate.area = b;
	return a
})(THREE.FontUtils);
self._typeface_js = {
	faces: THREE.FontUtils.faces,
	loadFace: THREE.FontUtils.loadFace
};
THREE.Curve = function() {};
THREE.Curve.prototype.getPoint = function() {
	console.log("Warning, getPoint() not implemented!");
	return null
};
THREE.Curve.prototype.getPointAt = function(a) {
	a = this.getUtoTmapping(a);
	return this.getPoint(a)
};
THREE.Curve.prototype.getPoints = function(a) {
	a || (a = 5);
	var b, c = [];
	for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
	return c
};
THREE.Curve.prototype.getSpacedPoints = function(a) {
	a || (a = 5);
	var b, c = [];
	for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
	return c
};
THREE.Curve.prototype.getLength = function() {
	var a = this.getLengths();
	return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function(a) {
	a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions: 200);
	if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
	this.needsUpdate = !1;
	var b = [],
	c,
	d = this.getPoint(0),
	e,
	f = 0;
	b.push(0);
	for (e = 1; e <= a; e++) c = this.getPoint(e / a),
	f += c.distanceTo(d),
	b.push(f),
	d = c;
	return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function() {
	this.needsUpdate = !0;
	this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function(a, b) {
	var c = this.getLengths(),
	d = 0,
	e = c.length,
	f;
	f = b ? b: a * c[e - 1];
	for (var g = 0,
	h = e - 1,
	i; g <= h;) if (d = Math.floor(g + (h - g) / 2), i = c[d] - f, 0 > i) g = d + 1;
	else if (0 < i) h = d - 1;
	else {
		h = d;
		break
	}
	d = h;
	if (c[d] == f) return d / (e - 1);
	g = c[d];
	return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
};
THREE.Curve.prototype.getTangent = function(a) {
	var b = a - 1E-4,
	a = a + 1E-4;
	0 > b && (b = 0);
	1 < a && (a = 1);
	b = this.getPoint(b);
	return this.getPoint(a).clone().sub(b).normalize()
};
THREE.Curve.prototype.getTangentAt = function(a) {
	a = this.getUtoTmapping(a);
	return this.getTangent(a)
};
THREE.LineCurve = function(a, b) {
	this.v1 = a;
	this.v2 = b
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function(a) {
	var b = this.v2.clone().sub(this.v1);
	b.multiplyScalar(a).add(this.v1);
	return b
};
THREE.LineCurve.prototype.getPointAt = function(a) {
	return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function() {
	return this.v2.clone().sub(this.v1).normalize()
};
THREE.QuadraticBezierCurve = function(a, b, c) {
	this.v0 = a;
	this.v1 = b;
	this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function(a) {
	var b;
	b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
	a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
	return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function(a) {
	var b;
	b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
	a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
	b = new THREE.Vector2(b, a);
	b.normalize();
	return b
};
THREE.CubicBezierCurve = function(a, b, c, d) {
	this.v0 = a;
	this.v1 = b;
	this.v2 = c;
	this.v3 = d
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function(a) {
	var b;
	b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function(a) {
	var b;
	b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	b = new THREE.Vector2(b, a);
	b.normalize();
	return b
};
THREE.SplineCurve = function(a) {
	this.points = void 0 == a ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function(a) {
	var b = new THREE.Vector2,
	c = [],
	d = this.points,
	e;
	e = (d.length - 1) * a;
	a = Math.floor(e);
	e -= a;
	c[0] = 0 == a ? a: a - 1;
	c[1] = a;
	c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
	c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
	b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
	b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
	return b
};
THREE.EllipseCurve = function(a, b, c, d, e, f, g) {
	this.aX = a;
	this.aY = b;
	this.xRadius = c;
	this.yRadius = d;
	this.aStartAngle = e;
	this.aEndAngle = f;
	this.aClockwise = g
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function(a) {
	var b = this.aEndAngle - this.aStartAngle;
	this.aClockwise || (a = 1 - a);
	b = this.aStartAngle + a * b;
	a = this.aX + this.xRadius * Math.cos(b);
	b = this.aY + this.yRadius * Math.sin(b);
	return new THREE.Vector2(a, b)
};
THREE.ArcCurve = function(a, b, c, d, e, f) {
	THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
	tangentQuadraticBezier: function(a, b, c, d) {
		return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
	},
	tangentCubicBezier: function(a, b, c, d, e) {
		return - 3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
	},
	tangentSpline: function(a) {
		return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + ( - 6 * a * a + 6 * a) + (3 * a * a - 2 * a)
	},
	interpolate: function(a, b, c, d, e) {
		var a = 0.5 * (c - a),
		d = 0.5 * (d - b),
		f = e * e;
		return (2 * b - 2 * c + a + d) * e * f + ( - 3 * b + 3 * c - 2 * a - d) * f + a * e + b
	}
};
THREE.Curve.create = function(a, b) {
	a.prototype = Object.create(THREE.Curve.prototype);
	a.prototype.getPoint = b;
	return a
};
THREE.LineCurve3 = THREE.Curve.create(function(a, b) {
	this.v1 = a;
	this.v2 = b
},
function(a) {
	var b = new THREE.Vector3;
	b.subVectors(this.v2, this.v1);
	b.multiplyScalar(a);
	b.add(this.v1);
	return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c) {
	this.v0 = a;
	this.v1 = b;
	this.v2 = c
},
function(a) {
	var b, c;
	b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
	c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
	a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
	return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, d) {
	this.v0 = a;
	this.v1 = b;
	this.v2 = c;
	this.v3 = d
},
function(a) {
	var b, c;
	b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
	return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function(a) {
	this.points = void 0 == a ? [] : a
},
function(a) {
	var b = new THREE.Vector3,
	c = [],
	d = this.points,
	e,
	a = (d.length - 1) * a;
	e = Math.floor(a);
	a -= e;
	c[0] = 0 == e ? e: e - 1;
	c[1] = e;
	c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
	c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
	e = d[c[0]];
	var f = d[c[1]],
	g = d[c[2]],
	c = d[c[3]];
	b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
	b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
	b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
	return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a) {
	this.points = void 0 == a ? [] : a
},
function(a) {
	var b = new THREE.Vector3,
	c = [],
	d = this.points,
	e;
	e = (d.length - 0) * a;
	a = Math.floor(e);
	e -= a;
	a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
	c[0] = (a - 1) % d.length;
	c[1] = a % d.length;
	c[2] = (a + 1) % d.length;
	c[3] = (a + 2) % d.length;
	b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]].x, e);
	b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]].y, e);
	b.z = THREE.Curve.Utils.interpolate(d[c[0]].z, d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
	return b
});
THREE.CurvePath = function() {
	this.curves = [];
	this.bends = [];
	this.autoClose = !1
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function(a) {
	this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function() {};
THREE.CurvePath.prototype.closePath = function() {
	var a = this.curves[0].getPoint(0),
	b = this.curves[this.curves.length - 1].getPoint(1);
	a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function(a) {
	for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
		if (c[a] >= b) return b = c[a] - b,
		a = this.curves[a],
		b = 1 - b / a.getLength(),
		a.getPointAt(b);
		a++
	}
	return null
};
THREE.CurvePath.prototype.getLength = function() {
	var a = this.getCurveLengths();
	return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function() {
	if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
	var a = [],
	b = 0,
	c,
	d = this.curves.length;
	for (c = 0; c < d; c++) b += this.curves[c].getLength(),
	a.push(b);
	return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function() {
	var a = this.getPoints(),
	b,
	c,
	d,
	e,
	f,
	g;
	b = c = Number.NEGATIVE_INFINITY;
	e = f = Number.POSITIVE_INFINITY;
	var h, i, k, l, m = a[0] instanceof THREE.Vector3;
	l = m ? new THREE.Vector3: new THREE.Vector2;
	i = 0;
	for (k = a.length; i < k; i++) h = a[i],
	h.x > b ? b = h.x: h.x < e && (e = h.x),
	h.y > c ? c = h.y: h.y < f && (f = h.y),
	m && (h.z > d ? d = h.z: h.z < g && (g = h.z)),
	l.add(h);
	a = {
		minX: e,
		minY: f,
		maxX: b,
		maxY: c,
		centroid: l.divideScalar(k)
	};
	m && (a.maxZ = d, a.minZ = g);
	return a
};
THREE.CurvePath.prototype.createPointsGeometry = function(a) {
	a = this.getPoints(a, !0);
	return this.createGeometry(a)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
	a = this.getSpacedPoints(a, !0);
	return this.createGeometry(a)
};
THREE.CurvePath.prototype.createGeometry = function(a) {
	for (var b = new THREE.Geometry,
	c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
	return b
};
THREE.CurvePath.prototype.addWrapPath = function(a) {
	this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function(a, b) {
	var c = this.getPoints(a),
	d,
	e;
	b || (b = this.bends);
	d = 0;
	for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
	return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(a, b) {
	var c = this.getSpacedPoints(a),
	d,
	e;
	b || (b = this.bends);
	d = 0;
	for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
	return c
};
THREE.CurvePath.prototype.getWrapPoints = function(a, b) {
	var c = this.getBoundingBox(),
	d,
	e,
	f,
	g,
	h,
	i;
	d = 0;
	for (e = a.length; d < e; d++) f = a[d],
	g = f.x,
	h = f.y,
	i = g / c.maxX,
	i = b.getUtoTmapping(i, g),
	g = b.getPoint(i),
	h = b.getNormalVector(i).multiplyScalar(h),
	f.x = g.x + h.x,
	f.y = g.y + h.y;
	return a
};
THREE.Gyroscope = function() {
	THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function(a) {
	this.matrixAutoUpdate && this.updateMatrix();
	if (this.matrixWorldNeedsUpdate || a) this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix),
	this.matrixWorldNeedsUpdate = !1,
	a = !0;
	for (var b = 0,
	c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function(a) {
	THREE.CurvePath.call(this);
	this.actions = [];
	a && this.fromPoints(a)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
	MOVE_TO: "moveTo",
	LINE_TO: "lineTo",
	QUADRATIC_CURVE_TO: "quadraticCurveTo",
	BEZIER_CURVE_TO: "bezierCurveTo",
	CSPLINE_THRU: "splineThru",
	ARC: "arc",
	ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function(a) {
	this.moveTo(a[0].x, a[0].y);
	for (var b = 1,
	c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function(a, b) {
	var c = Array.prototype.slice.call(arguments);
	this.actions.push({
		action: THREE.PathActions.MOVE_TO,
		args: c
	})
};
THREE.Path.prototype.lineTo = function(a, b) {
	var c = Array.prototype.slice.call(arguments),
	d = this.actions[this.actions.length - 1].args,
	d = new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b));
	this.curves.push(d);
	this.actions.push({
		action: THREE.PathActions.LINE_TO,
		args: c
	})
};
THREE.Path.prototype.quadraticCurveTo = function(a, b, c, d) {
	var e = Array.prototype.slice.call(arguments),
	f = this.actions[this.actions.length - 1].args,
	f = new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
	this.curves.push(f);
	this.actions.push({
		action: THREE.PathActions.QUADRATIC_CURVE_TO,
		args: e
	})
};
THREE.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
	var g = Array.prototype.slice.call(arguments),
	h = this.actions[this.actions.length - 1].args,
	h = new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length - 2], h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
	this.curves.push(h);
	this.actions.push({
		action: THREE.PathActions.BEZIER_CURVE_TO,
		args: g
	})
};
THREE.Path.prototype.splineThru = function(a) {
	var b = Array.prototype.slice.call(arguments),
	c = this.actions[this.actions.length - 1].args,
	c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
	Array.prototype.push.apply(c, a);
	c = new THREE.SplineCurve(c);
	this.curves.push(c);
	this.actions.push({
		action: THREE.PathActions.CSPLINE_THRU,
		args: b
	})
};
THREE.Path.prototype.arc = function(a, b, c, d, e, f) {
	var g = this.actions[this.actions.length - 1].args;
	this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f)
};
THREE.Path.prototype.absarc = function(a, b, c, d, e, f) {
	this.absellipse(a, b, c, c, d, e, f)
};
THREE.Path.prototype.ellipse = function(a, b, c, d, e, f, g) {
	var h = this.actions[this.actions.length - 1].args;
	this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f, g)
};
THREE.Path.prototype.absellipse = function(a, b, c, d, e, f, g) {
	var h = Array.prototype.slice.call(arguments),
	i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
	this.curves.push(i);
	i = i.getPoint(g ? 1 : 0);
	h.push(i.x);
	h.push(i.y);
	this.actions.push({
		action: THREE.PathActions.ELLIPSE,
		args: h
	})
};
THREE.Path.prototype.getSpacedPoints = function(a) {
	a || (a = 40);
	for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
	return b
};
THREE.Path.prototype.getPoints = function(a, b) {
	if (this.useSpacedPoints) return console.log("tata"),
	this.getSpacedPoints(a, b);
	var a = a || 12,
	c = [],
	d,
	e,
	f,
	g,
	h,
	i,
	k,
	l,
	m,
	p,
	s,
	r,
	n;
	d = 0;
	for (e = this.actions.length; d < e; d++) switch (f = this.actions[d], g = f.action, f = f.args, g) {
	case THREE.PathActions.MOVE_TO:
		c.push(new THREE.Vector2(f[0], f[1]));
		break;
	case THREE.PathActions.LINE_TO:
		c.push(new THREE.Vector2(f[0], f[1]));
		break;
	case THREE.PathActions.QUADRATIC_CURVE_TO:
		h = f[2];
		i = f[3];
		m = f[0];
		p = f[1];
		0 < c.length ? (g = c[c.length - 1], s = g.x, r = g.y) : (g = this.actions[d - 1].args, s = g[g.length - 2], r = g[g.length - 1]);
		for (f = 1; f <= a; f++) n = f / a,
		g = THREE.Shape.Utils.b2(n, s, m, h),
		n = THREE.Shape.Utils.b2(n, r, p, i),
		c.push(new THREE.Vector2(g, n));
		break;
	case THREE.PathActions.BEZIER_CURVE_TO:
		h = f[4];
		i = f[5];
		m = f[0];
		p = f[1];
		k = f[2];
		l = f[3];
		0 < c.length ? (g = c[c.length - 1], s = g.x, r = g.y) : (g = this.actions[d - 1].args, s = g[g.length - 2], r = g[g.length - 1]);
		for (f = 1; f <= a; f++) n = f / a,
		g = THREE.Shape.Utils.b3(n, s, m, k, h),
		n = THREE.Shape.Utils.b3(n, r, p, l, i),
		c.push(new THREE.Vector2(g, n));
		break;
	case THREE.PathActions.CSPLINE_THRU:
		g = this.actions[d - 1].args;
		n = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
		g = a * f[0].length;
		n = n.concat(f[0]);
		n = new THREE.SplineCurve(n);
		for (f = 1; f <= g; f++) c.push(n.getPointAt(f / g));
		break;
	case THREE.PathActions.ARC:
		h = f[0];
		i = f[1];
		p = f[2];
		k = f[3];
		g = f[4];
		m = !!f[5];
		s = g - k;
		r = 2 * a;
		for (f = 1; f <= r; f++) n = f / r,
		m || (n = 1 - n),
		n = k + n * s,
		g = h + p * Math.cos(n),
		n = i + p * Math.sin(n),
		c.push(new THREE.Vector2(g, n));
		break;
	case THREE.PathActions.ELLIPSE:
		h = f[0];
		i = f[1];
		p = f[2];
		l = f[3];
		k = f[4];
		g = f[5];
		m = !!f[6];
		s = g - k;
		r = 2 * a;
		for (f = 1; f <= r; f++) n = f / r,
		m || (n = 1 - n),
		n = k + n * s,
		g = h + p * Math.cos(n),
		n = i + l * Math.sin(n),
		c.push(new THREE.Vector2(g, n))
	}
	d = c[c.length - 1];
	1E-10 > Math.abs(d.x - c[0].x) && 1E-10 > Math.abs(d.y - c[0].y) && c.splice(c.length - 1, 1);
	b && c.push(c[0]);
	return c
};
THREE.Path.prototype.toShapes = function() {
	var a, b, c, d, e = [],
	f = new THREE.Path;
	a = 0;
	for (b = this.actions.length; a < b; a++) c = this.actions[a],
	d = c.args,
	c = c.action,
	c == THREE.PathActions.MOVE_TO && 0 != f.actions.length && (e.push(f), f = new THREE.Path),
	f[c].apply(f, d);
	0 != f.actions.length && e.push(f);
	if (0 == e.length) return [];
	var g;
	d = [];
	a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
	if (1 == e.length) return f = e[0],
	g = new THREE.Shape,
	g.actions = f.actions,
	g.curves = f.curves,
	d.push(g),
	d;
	if (a) {
		g = new THREE.Shape;
		a = 0;
		for (b = e.length; a < b; a++) f = e[a],
		THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g.actions = f.actions, g.curves = f.curves, d.push(g), g = new THREE.Shape) : g.holes.push(f)
	} else {
		a = 0;
		for (b = e.length; a < b; a++) f = e[a],
		THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g && d.push(g), g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves) : g.holes.push(f);
		d.push(g)
	}
	return d
};
THREE.Shape = function() {
	THREE.Path.apply(this, arguments);
	this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function(a) {
	return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.makeGeometry = function(a) {
	return new THREE.ShapeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function(a) {
	var b, c = this.holes.length,
	d = [];
	for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
	return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function(a) {
	var b, c = this.holes.length,
	d = [];
	for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
	return d
};
THREE.Shape.prototype.extractAllPoints = function(a) {
	return {
		shape: this.getTransformedPoints(a),
		holes: this.getPointsHoles(a)
	}
};
THREE.Shape.prototype.extractPoints = function(a) {
	return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function(a) {
	return {
		shape: this.getTransformedSpacedPoints(a),
		holes: this.getSpacedPointsHoles(a)
	}
};
THREE.Shape.Utils = {
	removeHoles: function(a, b) {
		var c = a.concat(),
		d = c.concat(),
		e,
		f,
		g,
		h,
		i,
		k,
		l,
		m,
		p,
		s,
		r = [];
		for (i = 0; i < b.length; i++) {
			k = b[i];
			Array.prototype.push.apply(d, k);
			f = Number.POSITIVE_INFINITY;
			for (e = 0; e < k.length; e++) {
				p = k[e];
				s = [];
				for (m = 0; m < c.length; m++) l = c[m],
				l = p.distanceToSquared(l),
				s.push(l),
				l < f && (f = l, g = e, h = m)
			}
			e = 0 <= h - 1 ? h - 1 : c.length - 1;
			f = 0 <= g - 1 ? g - 1 : k.length - 1;
			var n = [k[g], c[h], c[e]];
			m = THREE.FontUtils.Triangulate.area(n);
			var q = [k[g], k[f], c[h]];
			p = THREE.FontUtils.Triangulate.area(q);
			s = h;
			l = g;
			h += 1;
			g += -1;
			0 > h && (h += c.length);
			h %= c.length;
			0 > g && (g += k.length);
			g %= k.length;
			e = 0 <= h - 1 ? h - 1 : c.length - 1;
			f = 0 <= g - 1 ? g - 1 : k.length - 1;
			n = [k[g], c[h], c[e]];
			n = THREE.FontUtils.Triangulate.area(n);
			q = [k[g], k[f], c[h]];
			q = THREE.FontUtils.Triangulate.area(q);
			m + p > n + q && (h = s, g = l, 0 > h && (h += c.length), h %= c.length, 0 > g && (g += k.length), g %= k.length, e = 0 <= h - 1 ? h - 1 : c.length - 1, f = 0 <= g - 1 ? g - 1 : k.length - 1);
			m = c.slice(0, h);
			p = c.slice(h);
			s = k.slice(g);
			l = k.slice(0, g);
			f = [k[g], k[f], c[h]];
			r.push([k[g], c[h], c[e]]);
			r.push(f);
			c = m.concat(s).concat(l).concat(p)
		}
		return {
			shape: c,
			isolatedPts: r,
			allpoints: d
		}
	},
	triangulateShape: function(a, b) {
		var c = THREE.Shape.Utils.removeHoles(a, b),
		d = c.allpoints,
		e = c.isolatedPts,
		c = THREE.FontUtils.Triangulate(c.shape, !1),
		f,
		g,
		h,
		i,
		k = {};
		f = 0;
		for (g = d.length; f < g; f++) i = d[f].x + ":" + d[f].y,
		void 0 !== k[i] && console.log("Duplicate point", i),
		k[i] = f;
		f = 0;
		for (g = c.length; f < g; f++) {
			h = c[f];
			for (d = 0; 3 > d; d++) i = h[d].x + ":" + h[d].y,
			i = k[i],
			void 0 !== i && (h[d] = i)
		}
		f = 0;
		for (g = e.length; f < g; f++) {
			h = e[f];
			for (d = 0; 3 > d; d++) i = h[d].x + ":" + h[d].y,
			i = k[i],
			void 0 !== i && (h[d] = i)
		}
		return c.concat(e)
	},
	isClockWise: function(a) {
		return 0 > THREE.FontUtils.Triangulate.area(a)
	},
	b2p0: function(a, b) {
		var c = 1 - a;
		return c * c * b
	},
	b2p1: function(a, b) {
		return 2 * (1 - a) * a * b
	},
	b2p2: function(a, b) {
		return a * a * b
	},
	b2: function(a, b, c, d) {
		return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
	},
	b3p0: function(a, b) {
		var c = 1 - a;
		return c * c * c * b
	},
	b3p1: function(a, b) {
		var c = 1 - a;
		return 3 * c * c * a * b
	},
	b3p2: function(a, b) {
		return 3 * (1 - a) * a * a * b
	},
	b3p3: function(a, b) {
		return a * a * a * b
	},
	b3: function(a, b, c, d, e) {
		return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
	}
};
THREE.AnimationHandler = function() {
	var a = [],
	b = {},
	c = {
		update: function(b) {
			for (var c = 0; c < a.length; c++) a[c].update(b)
		},
		addToUpdate: function(b) { - 1 === a.indexOf(b) && a.push(b)
		},
		removeFromUpdate: function(b) {
			b = a.indexOf(b); - 1 !== b && a.splice(b, 1)
		},
		add: function(a) {
			void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
			b[a.name] = a;
			if (!0 !== a.initialized) {
				for (var c = 0; c < a.hierarchy.length; c++) {
					for (var d = 0; d < a.hierarchy[c].keys.length; d++) if (0 > a.hierarchy[c].keys[d].time && (a.hierarchy[c].keys[d].time = 0), void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)) {
						var h = a.hierarchy[c].keys[d].rot;
						a.hierarchy[c].keys[d].rot = new THREE.Quaternion(h[0], h[1], h[2], h[3])
					}
					if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets) {
						h = {};
						for (d = 0; d < a.hierarchy[c].keys.length; d++) for (var i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++) {
							var k = a.hierarchy[c].keys[d].morphTargets[i];
							h[k] = -1
						}
						a.hierarchy[c].usedMorphTargets = h;
						for (d = 0; d < a.hierarchy[c].keys.length; d++) {
							var l = {};
							for (k in h) {
								for (i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++) if (a.hierarchy[c].keys[d].morphTargets[i] === k) {
									l[k] = a.hierarchy[c].keys[d].morphTargetsInfluences[i];
									break
								}
								i === a.hierarchy[c].keys[d].morphTargets.length && (l[k] = 0)
							}
							a.hierarchy[c].keys[d].morphTargetsInfluences = l
						}
					}
					for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
					for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index = d
				}
				d = parseInt(a.length * a.fps, 10);
				a.JIT = {};
				a.JIT.hierarchy = [];
				for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
				a.initialized = !0
			}
		},
		get: function(a) {
			if ("string" === typeof a) {
				if (b[a]) return b[a];
				console.log("THREE.AnimationHandler.get: Couldn't find animation " + a);
				return null
			}
		},
		parse: function(a) {
			var b = [];
			if (a instanceof THREE.SkinnedMesh) for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
			else d(a, b);
			return b
		}
	},
	d = function(a, b) {
		b.push(a);
		for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
	};
	c.LINEAR = 0;
	c.CATMULLROM = 1;
	c.CATMULLROM_FORWARD = 2;
	return c
} ();
THREE.Animation = function(a, b, c) {
	this.root = a;
	this.data = THREE.AnimationHandler.get(b);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 1;
	this.isPlaying = !1;
	this.loop = this.isPaused = !0;
	this.interpolationType = void 0 !== c ? c: THREE.AnimationHandler.LINEAR;
	this.points = [];
	this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function(a, b) {
	if (!1 === this.isPlaying) {
		this.isPlaying = !0;
		this.loop = void 0 !== a ? a: !0;
		this.currentTime = void 0 !== b ? b: 0;
		var c, d = this.hierarchy.length,
		e;
		for (c = 0; c < d; c++) {
			e = this.hierarchy[c];
			this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (e.useQuaternion = !0);
			e.matrixAutoUpdate = !0;
			void 0 === e.animationCache && (e.animationCache = {},
			e.animationCache.prevKey = {
				pos: 0,
				rot: 0,
				scl: 0
			},
			e.animationCache.nextKey = {
				pos: 0,
				rot: 0,
				scl: 0
			},
			e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix: e.matrix);
			var f = e.animationCache.prevKey;
			e = e.animationCache.nextKey;
			f.pos = this.data.hierarchy[c].keys[0];
			f.rot = this.data.hierarchy[c].keys[0];
			f.scl = this.data.hierarchy[c].keys[0];
			e.pos = this.getNextKeyWith("pos", c, 1);
			e.rot = this.getNextKeyWith("rot", c, 1);
			e.scl = this.getNextKeyWith("scl", c, 1)
		}
		this.update(0)
	}
	this.isPaused = !1;
	THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function() { ! 0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
	this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function() {
	this.isPaused = this.isPlaying = !1;
	THREE.AnimationHandler.removeFromUpdate(this)
};
THREE.Animation.prototype.update = function(a) {
	if (!1 !== this.isPlaying) {
		var b = ["pos", "rot", "scl"],
		c,
		d,
		e,
		f,
		g,
		h,
		i,
		k,
		l;
		l = this.currentTime += a * this.timeScale;
		k = this.currentTime %= this.data.length;
		parseInt(Math.min(k * this.data.fps, this.data.length * this.data.fps), 10);
		for (var m = 0,
		p = this.hierarchy.length; m < p; m++) {
			a = this.hierarchy[m];
			i = a.animationCache;
			for (var s = 0; 3 > s; s++) {
				c = b[s];
				g = i.prevKey[c];
				h = i.nextKey[c];
				if (h.time <= l) {
					if (k < l) if (this.loop) {
						g = this.data.hierarchy[m].keys[0];
						for (h = this.getNextKeyWith(c, m, 1); h.time < k;) g = h,
						h = this.getNextKeyWith(c, m, h.index + 1)
					} else {
						this.stop();
						return
					} else {
						do g = h,
						h = this.getNextKeyWith(c, m, h.index + 1);
						while (h.time < k)
					}
					i.prevKey[c] = g;
					i.nextKey[c] = h
				}
				a.matrixAutoUpdate = !0;
				a.matrixWorldNeedsUpdate = !0;
				d = (k - g.time) / (h.time - g.time);
				e = g[c];
				f = h[c];
				if (0 > d || 1 < d) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + d + " on bone " + m),
				d = 0 > d ? 0 : 1;
				if ("pos" === c) if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = e[0] + (f[0] - e[0]) * d,
				c.y = e[1] + (f[1] - e[1]) * d,
				c.z = e[2] + (f[2] - e[2]) * d;
				else {
					if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) this.points[0] = this.getPrevKeyWith("pos", m, g.index - 1).pos,
					this.points[1] = e,
					this.points[2] = f,
					this.points[3] = this.getNextKeyWith("pos", m, h.index + 1).pos,
					d = 0.33 * d + 0.33,
					e = this.interpolateCatmullRom(this.points, d),
					c.x = e[0],
					c.y = e[1],
					c.z = e[2],
					this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (d = this.interpolateCatmullRom(this.points, 1.01 * d), this.target.set(d[0], d[1], d[2]), this.target.sub(c), this.target.y = 0, this.target.normalize(), d = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, d, 0))
				} else "rot" === c ? THREE.Quaternion.slerp(e, f, a.quaternion, d) : "scl" === c && (c = a.scale, c.x = e[0] + (f[0] - e[0]) * d, c.y = e[1] + (f[1] - e[1]) * d, c.z = e[2] + (f[2] - e[2]) * d)
			}
		}
	}
};
THREE.Animation.prototype.interpolateCatmullRom = function(a, b) {
	var c = [],
	d = [],
	e,
	f,
	g,
	h,
	i,
	k;
	e = (a.length - 1) * b;
	f = Math.floor(e);
	e -= f;
	c[0] = 0 === f ? f: f - 1;
	c[1] = f;
	c[2] = f > a.length - 2 ? f: f + 1;
	c[3] = f > a.length - 3 ? f: f + 2;
	f = a[c[0]];
	h = a[c[1]];
	i = a[c[2]];
	k = a[c[3]];
	c = e * e;
	g = e * c;
	d[0] = this.interpolate(f[0], h[0], i[0], k[0], e, c, g);
	d[1] = this.interpolate(f[1], h[1], i[1], k[1], e, c, g);
	d[2] = this.interpolate(f[2], h[2], i[2], k[2], e, c, g);
	return d
};
THREE.Animation.prototype.interpolate = function(a, b, c, d, e, f, g) {
	a = 0.5 * (c - a);
	d = 0.5 * (d - b);
	return (2 * (b - c) + a + d) * g + ( - 3 * (b - c) - 2 * a - d) * f + a * e + b
};
THREE.Animation.prototype.getNextKeyWith = function(a, b, c) {
	for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c: d.length - 1 : c % d.length; c < d.length; c++) if (void 0 !== d[c][a]) return d[c];
	return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function(a, b, c) {
	for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < c ? c: 0 : 0 <= c ? c: c + d.length; 0 <= c; c--) if (void 0 !== d[c][a]) return d[c];
	return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function(a, b, c) {
	this.root = a;
	this.data = THREE.AnimationHandler.get(b);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 0.001;
	this.isPlaying = !1;
	this.loop = this.isPaused = !0;
	this.JITCompile = void 0 !== c ? c: !0;
	a = 0;
	for (b = this.hierarchy.length; a < b; a++) {
		var c = this.data.hierarchy[a].sids,
		d = this.hierarchy[a];
		if (this.data.hierarchy[a].keys.length && c) {
			for (var e = 0; e < c.length; e++) {
				var f = c[e],
				g = this.getNextKeyWith(f, a, 0);
				g && g.apply(f)
			}
			d.matrixAutoUpdate = !1;
			this.data.hierarchy[a].node.updateMatrix();
			d.matrixWorldNeedsUpdate = !0
		}
	}
};
THREE.KeyFrameAnimation.prototype.play = function(a, b) {
	if (!this.isPlaying) {
		this.isPlaying = !0;
		this.loop = void 0 !== a ? a: !0;
		this.currentTime = void 0 !== b ? b: 0;
		this.startTimeMs = b;
		this.startTime = 1E7;
		this.endTime = -this.startTime;
		var c, d = this.hierarchy.length,
		e, f;
		for (c = 0; c < d; c++) e = this.hierarchy[c],
		f = this.data.hierarchy[c],
		e.useQuaternion = !0,
		void 0 === f.animationCache && (f.animationCache = {},
		f.animationCache.prevKey = null, f.animationCache.nextKey = null, f.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix: e.matrix),
		e = this.data.hierarchy[c].keys,
		e.length && (f.animationCache.prevKey = e[0], f.animationCache.nextKey = e[1], this.startTime = Math.min(e[0].time, this.startTime), this.endTime = Math.max(e[e.length - 1].time, this.endTime));
		this.update(0)
	}
	this.isPaused = !1;
	THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function() {
	this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
	this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function() {
	this.isPaused = this.isPlaying = !1;
	THREE.AnimationHandler.removeFromUpdate(this);
	for (var a = 0; a < this.data.hierarchy.length; a++) {
		var b = this.hierarchy[a],
		c = this.data.hierarchy[a];
		if (void 0 !== c.animationCache) {
			var d = c.animationCache.originalMatrix;
			b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d);
			delete c.animationCache
		}
	}
};
THREE.KeyFrameAnimation.prototype.update = function(a) {
	if (this.isPlaying) {
		var b, c, d, e, f = this.data.JIT.hierarchy,
		g, h, i;
		h = this.currentTime += a * this.timeScale;
		g = this.currentTime %= this.data.length;
		g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g);
		e = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps), 10);
		if ((i = g < h) && !this.loop) {
			for (var a = 0,
			k = this.hierarchy.length; a < k; a++) {
				var l = this.data.hierarchy[a].keys,
				f = this.data.hierarchy[a].sids;
				d = l.length - 1;
				e = this.hierarchy[a];
				if (l.length) {
					for (l = 0; l < f.length; l++) g = f[l],
					(h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
					this.data.hierarchy[a].node.updateMatrix();
					e.matrixWorldNeedsUpdate = !0
				}
			}
			this.stop()
		} else if (! (g < this.startTime)) {
			a = 0;
			for (k = this.hierarchy.length; a < k; a++) {
				d = this.hierarchy[a];
				b = this.data.hierarchy[a];
				var l = b.keys,
				m = b.animationCache;
				if (this.JITCompile && void 0 !== f[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = f[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = f[a][e], d.matrixWorldNeedsUpdate = !0);
				else if (l.length) {
					this.JITCompile && m && (d instanceof THREE.Bone ? d.skinMatrix = m.originalMatrix: d.matrix = m.originalMatrix);
					b = m.prevKey;
					c = m.nextKey;
					if (b && c) {
						if (c.time <= h) {
							if (i && this.loop) {
								b = l[0];
								for (c = l[1]; c.time < g;) b = c,
								c = l[b.index + 1]
							} else if (!i) for (var p = l.length - 1; c.time < g && c.index !== p;) b = c,
							c = l[b.index + 1];
							m.prevKey = b;
							m.nextKey = c
						}
						c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time)
					}
					this.data.hierarchy[a].node.updateMatrix();
					d.matrixWorldNeedsUpdate = !0
				}
			}
			if (this.JITCompile && void 0 === f[0][e]) {
				this.hierarchy[0].updateMatrixWorld(!0);
				for (a = 0; a < this.hierarchy.length; a++) f[a][e] = this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
			}
		}
	}
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function(a, b, c) {
	b = this.data.hierarchy[b].keys;
	for (c %= b.length; c < b.length; c++) if (b[c].hasTarget(a)) return b[c];
	return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function(a, b, c) {
	b = this.data.hierarchy[b].keys;
	for (c = 0 <= c ? c: c + b.length; 0 <= c; c--) if (b[c].hasTarget(a)) return b[c];
	return b[b.length - 1]
};
THREE.CubeCamera = function(a, b, c) {
	THREE.Object3D.call(this);
	var d = new THREE.PerspectiveCamera(90, 1, a, b);
	d.up.set(0, -1, 0);
	d.lookAt(new THREE.Vector3(1, 0, 0));
	this.add(d);
	var e = new THREE.PerspectiveCamera(90, 1, a, b);
	e.up.set(0, -1, 0);
	e.lookAt(new THREE.Vector3( - 1, 0, 0));
	this.add(e);
	var f = new THREE.PerspectiveCamera(90, 1, a, b);
	f.up.set(0, 0, 1);
	f.lookAt(new THREE.Vector3(0, 1, 0));
	this.add(f);
	var g = new THREE.PerspectiveCamera(90, 1, a, b);
	g.up.set(0, 0, -1);
	g.lookAt(new THREE.Vector3(0, -1, 0));
	this.add(g);
	var h = new THREE.PerspectiveCamera(90, 1, a, b);
	h.up.set(0, -1, 0);
	h.lookAt(new THREE.Vector3(0, 0, 1));
	this.add(h);
	var i = new THREE.PerspectiveCamera(90, 1, a, b);
	i.up.set(0, -1, 0);
	i.lookAt(new THREE.Vector3(0, 0, -1));
	this.add(i);
	this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
		format: THREE.RGBFormat,
		magFilter: THREE.LinearFilter,
		minFilter: THREE.LinearFilter
	});
	this.updateCubeMap = function(a, b) {
		var c = this.renderTarget,
		p = c.generateMipmaps;
		c.generateMipmaps = !1;
		c.activeCubeFace = 0;
		a.render(b, d, c);
		c.activeCubeFace = 1;
		a.render(b, e, c);
		c.activeCubeFace = 2;
		a.render(b, f, c);
		c.activeCubeFace = 3;
		a.render(b, g, c);
		c.activeCubeFace = 4;
		a.render(b, h, c);
		c.generateMipmaps = p;
		c.activeCubeFace = 5;
		a.render(b, i, c)
	}
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function(a, b, c, d, e, f, g) {
	THREE.Camera.call(this);
	this.fov = c;
	this.left = -a / 2;
	this.right = a / 2;
	this.top = b / 2;
	this.bottom = -b / 2;
	this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g);
	this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
	this.zoom = 1;
	this.toPerspective()
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function() {
	this.near = this.cameraP.near;
	this.far = this.cameraP.far;
	this.cameraP.fov = this.fov / this.zoom;
	this.cameraP.updateProjectionMatrix();
	this.projectionMatrix = this.cameraP.projectionMatrix;
	this.inPerspectiveMode = !0;
	this.inOrthographicMode = !1
};
THREE.CombinedCamera.prototype.toOrthographic = function() {
	var a = this.cameraP.aspect,
	b = (this.cameraP.near + this.cameraP.far) / 2,
	b = Math.tan(this.fov / 2) * b,
	a = 2 * b * a / 2,
	b = b / this.zoom,
	a = a / this.zoom;
	this.cameraO.left = -a;
	this.cameraO.right = a;
	this.cameraO.top = b;
	this.cameraO.bottom = -b;
	this.cameraO.updateProjectionMatrix();
	this.near = this.cameraO.near;
	this.far = this.cameraO.far;
	this.projectionMatrix = this.cameraO.projectionMatrix;
	this.inPerspectiveMode = !1;
	this.inOrthographicMode = !0
};
THREE.CombinedCamera.prototype.setSize = function(a, b) {
	this.cameraP.aspect = a / b;
	this.left = -a / 2;
	this.right = a / 2;
	this.top = b / 2;
	this.bottom = -b / 2
};
THREE.CombinedCamera.prototype.setFov = function(a) {
	this.fov = a;
	this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function() {
	this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
};
THREE.CombinedCamera.prototype.setLens = function(a, b) {
	void 0 === b && (b = 24);
	var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
	this.setFov(c);
	return c
};
THREE.CombinedCamera.prototype.setZoom = function(a) {
	this.zoom = a;
	this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function() {
	this.rotation.x = 0;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBackView = function() {
	this.rotation.x = 0;
	this.rotation.y = Math.PI;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toLeftView = function() {
	this.rotation.x = 0;
	this.rotation.y = -Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toRightView = function() {
	this.rotation.x = 0;
	this.rotation.y = Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toTopView = function() {
	this.rotation.x = -Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CombinedCamera.prototype.toBottomView = function() {
	this.rotation.x = Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = !1
};
THREE.CircleGeometry = function(a, b, c, d) {
	THREE.Geometry.call(this);
	var a = a || 50,
	c = void 0 !== c ? c: 0,
	d = void 0 !== d ? d: 2 * Math.PI,
	b = void 0 !== b ? Math.max(3, b) : 8,
	e,
	f = [];
	e = new THREE.Vector3;
	var g = new THREE.Vector2(0.5, 0.5);
	this.vertices.push(e);
	f.push(g);
	for (e = 0; e <= b; e++) {
		var h = new THREE.Vector3,
		i = c + e / b * d;
		h.x = a * Math.cos(i);
		h.y = a * Math.sin(i);
		this.vertices.push(h);
		f.push(new THREE.Vector2((h.x / a + 1) / 2, -(h.y / a + 1) / 2 + 1))
	}
	c = new THREE.Vector3(0, 0, -1);
	for (e = 1; e <= b; e++) this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])),
	this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function(a, b, c, d, e, f) {
	function g(a, b, c, d, e, f, g, n) {
		var q, z = h.widthSegments,
		t = h.heightSegments,
		x = e / 2,
		u = f / 2,
		B = h.vertices.length;
		if ("x" === a && "y" === b || "y" === a && "x" === b) q = "z";
		else if ("x" === a && "z" === b || "z" === a && "x" === b) q = "y",
		t = h.depthSegments;
		else if ("z" === a && "y" === b || "y" === a && "z" === b) q = "x",
		z = h.depthSegments;
		var G = z + 1,
		D = t + 1,
		w = e / z,
		I = f / t,
		J = new THREE.Vector3;
		J[q] = 0 < g ? 1 : -1;
		for (e = 0; e < D; e++) for (f = 0; f < G; f++) {
			var E = new THREE.Vector3;
			E[a] = (f * w - x) * c;
			E[b] = (e * I - u) * d;
			E[q] = g;
			h.vertices.push(E)
		}
		for (e = 0; e < t; e++) for (f = 0; f < z; f++) a = new THREE.Face4(f + G * e + B, f + G * (e + 1) + B, f + 1 + G * (e + 1) + B, f + 1 + G * e + B),
		a.normal.copy(J),
		a.vertexNormals.push(J.clone(), J.clone(), J.clone(), J.clone()),
		a.materialIndex = n,
		h.faces.push(a),
		h.faceVertexUvs[0].push([new THREE.Vector2(f / z, 1 - e / t), new THREE.Vector2(f / z, 1 - (e + 1) / t), new THREE.Vector2((f + 1) / z, 1 - (e + 1) / t), new THREE.Vector2((f + 1) / z, 1 - e / t)])
	}
	THREE.Geometry.call(this);
	var h = this;
	this.width = a;
	this.height = b;
	this.depth = c;
	this.widthSegments = d || 1;
	this.heightSegments = e || 1;
	this.depthSegments = f || 1;
	a = this.width / 2;
	b = this.height / 2;
	c = this.depth / 2;
	g("z", "y", -1, -1, this.depth, this.height, a, 0);
	g("z", "y", 1, -1, this.depth, this.height, -a, 1);
	g("x", "z", 1, 1, this.width, this.depth, b, 2);
	g("x", "z", 1, -1, this.width, this.depth, -b, 3);
	g("x", "y", 1, -1, this.width, this.height, c, 4);
	g("x", "y", -1, -1, this.width, this.height, -c, 5);
	this.computeCentroids();
	this.mergeVertices()
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function(a, b, c, d, e, f) {
	THREE.Geometry.call(this);
	var a = void 0 !== a ? a: 20,
	b = void 0 !== b ? b: 20,
	c = void 0 !== c ? c: 100,
	g = c / 2,
	d = d || 8,
	e = e || 1,
	h,
	i,
	k = [],
	l = [];
	for (i = 0; i <= e; i++) {
		var m = [],
		p = [],
		s = i / e,
		r = s * (b - a) + a;
		for (h = 0; h <= d; h++) {
			var n = h / d,
			q = new THREE.Vector3;
			q.x = r * Math.sin(2 * n * Math.PI);
			q.y = -s * c + g;
			q.z = r * Math.cos(2 * n * Math.PI);
			this.vertices.push(q);
			m.push(this.vertices.length - 1);
			p.push(new THREE.Vector2(n, 1 - s))
		}
		k.push(m);
		l.push(p)
	}
	c = (b - a) / c;
	for (h = 0; h < d; h++) {
		0 !== a ? (m = this.vertices[k[0][h]].clone(), p = this.vertices[k[0][h + 1]].clone()) : (m = this.vertices[k[1][h]].clone(), p = this.vertices[k[1][h + 1]].clone());
		m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
		p.setY(Math.sqrt(p.x * p.x + p.z * p.z) * c).normalize();
		for (i = 0; i < e; i++) {
			var s = k[i][h],
			r = k[i + 1][h],
			n = k[i + 1][h + 1],
			q = k[i][h + 1],
			z = m.clone(),
			t = m.clone(),
			x = p.clone(),
			u = p.clone(),
			B = l[i][h].clone(),
			G = l[i + 1][h].clone(),
			D = l[i + 1][h + 1].clone(),
			w = l[i][h + 1].clone();
			this.faces.push(new THREE.Face4(s, r, n, q, [z, t, x, u]));
			this.faceVertexUvs[0].push([B, G, D, w])
		}
	}
	if (!f && 0 < a) {
		this.vertices.push(new THREE.Vector3(0, g, 0));
		for (h = 0; h < d; h++) s = k[0][h],
		r = k[0][h + 1],
		n = this.vertices.length - 1,
		z = new THREE.Vector3(0, 1, 0),
		t = new THREE.Vector3(0, 1, 0),
		x = new THREE.Vector3(0, 1, 0),
		B = l[0][h].clone(),
		G = l[0][h + 1].clone(),
		D = new THREE.Vector2(G.u, 0),
		this.faces.push(new THREE.Face3(s, r, n, [z, t, x])),
		this.faceVertexUvs[0].push([B, G, D])
	}
	if (!f && 0 < b) {
		this.vertices.push(new THREE.Vector3(0, -g, 0));
		for (h = 0; h < d; h++) s = k[i][h + 1],
		r = k[i][h],
		n = this.vertices.length - 1,
		z = new THREE.Vector3(0, -1, 0),
		t = new THREE.Vector3(0, -1, 0),
		x = new THREE.Vector3(0, -1, 0),
		B = l[i][h + 1].clone(),
		G = l[i][h].clone(),
		D = new THREE.Vector2(G.u, 1),
		this.faces.push(new THREE.Face3(s, r, n, [z, t, x])),
		this.faceVertexUvs[0].push([B, G, D])
	}
	this.computeCentroids();
	this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function(a, b) {
	"undefined" !== typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a: [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function(a, b) {
	for (var c = a.length,
	d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function(a, b) {
	function c(a, b, c) {
		b || console.log("die");
		return b.clone().multiplyScalar(c).add(a)
	}
	function d(a, b, c) {
		var d = THREE.ExtrudeGeometry.__v1,
		e = THREE.ExtrudeGeometry.__v2,
		f = THREE.ExtrudeGeometry.__v3,
		g = THREE.ExtrudeGeometry.__v4,
		h = THREE.ExtrudeGeometry.__v5,
		i = THREE.ExtrudeGeometry.__v6;
		d.set(a.x - b.x, a.y - b.y);
		e.set(a.x - c.x, a.y - c.y);
		d = d.normalize();
		e = e.normalize();
		f.set( - d.y, d.x);
		g.set(e.y, -e.x);
		h.copy(a).add(f);
		i.copy(a).add(g);
		if (h.equals(i)) return g.clone();
		h.copy(b).add(f);
		i.copy(c).add(g);
		f = d.dot(g);
		g = i.sub(h).dot(g);
		0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
		g /= f;
		return 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g).add(h).sub(a).clone()
	}
	function e(c, d) {
		var e, f;
		for (M = c.length; 0 <= --M;) {
			e = M;
			f = M - 1;
			0 > f && (f = c.length - 1);
			for (var g = 0,
			h = s + 2 * l,
			g = 0; g < h; g++) {
				var i = fa * g,
				k = fa * (g + 1),
				m = d + e + i,
				i = d + f + i,
				p = d + f + k,
				k = d + e + k,
				n = c,
				q = g,
				r = h,
				u = e,
				w = f,
				m = m + Z,
				i = i + Z,
				p = p + Z,
				k = k + Z;
				E.faces.push(new THREE.Face4(m, i, p, k, null, null, t));
				m = x.generateSideWallUV(E, a, n, b, m, i, p, k, q, r, u, w);
				E.faceVertexUvs[0].push(m)
			}
		}
	}
	function f(a, b, c) {
		E.vertices.push(new THREE.Vector3(a, b, c))
	}
	function g(c, d, e, f) {
		c += Z;
		d += Z;
		e += Z;
		E.faces.push(new THREE.Face3(c, d, e, null, null, z));
		c = f ? x.generateBottomUV(E, a, b, c, d, e) : x.generateTopUV(E, a, b, c, d, e);
		E.faceVertexUvs[0].push(c)
	}
	var h = void 0 !== b.amount ? b.amount: 100,
	i = void 0 !== b.bevelThickness ? b.bevelThickness: 6,
	k = void 0 !== b.bevelSize ? b.bevelSize: i - 2,
	l = void 0 !== b.bevelSegments ? b.bevelSegments: 3,
	m = void 0 !== b.bevelEnabled ? b.bevelEnabled: !0,
	p = void 0 !== b.curveSegments ? b.curveSegments: 12,
	s = void 0 !== b.steps ? b.steps: 1,
	r = b.extrudePath,
	n,
	q = !1,
	z = b.material,
	t = b.extrudeMaterial,
	x = void 0 !== b.UVGenerator ? b.UVGenerator: THREE.ExtrudeGeometry.WorldUVGenerator,
	u,
	B,
	G,
	D;
	r && (n = r.getSpacedPoints(s), q = !0, m = !1, u = void 0 !== b.frames ? b.frames: new THREE.TubeGeometry.FrenetFrames(r, s, !1), B = new THREE.Vector3, G = new THREE.Vector3, D = new THREE.Vector3);
	m || (k = i = l = 0);
	var w, I, J, E = this,
	Z = this.vertices.length,
	p = a.extractPoints(p),
	A = p.shape,
	p = p.holes;
	if (r = !THREE.Shape.Utils.isClockWise(A)) {
		A = A.reverse();
		I = 0;
		for (J = p.length; I < J; I++) w = p[I],
		THREE.Shape.Utils.isClockWise(w) && (p[I] = w.reverse());
		r = !1
	}
	var S = THREE.Shape.Utils.triangulateShape(A, p),
	r = A;
	I = 0;
	for (J = p.length; I < J; I++) w = p[I],
	A = A.concat(w);
	var F, H, K, N, fa = A.length,
	ma = S.length,
	eb = [],
	M = 0,
	U = r.length;
	F = U - 1;
	for (H = M + 1; M < U; M++, F++, H++) F === U && (F = 0),
	H === U && (H = 0),
	eb[M] = d(r[M], r[F], r[H]);
	var ja = [],
	L,
	ca = eb.concat();
	I = 0;
	for (J = p.length; I < J; I++) {
		w = p[I];
		L = [];
		M = 0;
		U = w.length;
		F = U - 1;
		for (H = M + 1; M < U; M++, F++, H++) F === U && (F = 0),
		H === U && (H = 0),
		L[M] = d(w[M], w[F], w[H]);
		ja.push(L);
		ca = ca.concat(L)
	}
	for (F = 0; F < l; F++) {
		w = F / l;
		K = i * (1 - w);
		H = k * Math.sin(w * Math.PI / 2);
		M = 0;
		for (U = r.length; M < U; M++) N = c(r[M], eb[M], H),
		f(N.x, N.y, -K);
		I = 0;
		for (J = p.length; I < J; I++) {
			w = p[I];
			L = ja[I];
			M = 0;
			for (U = w.length; M < U; M++) N = c(w[M], L[M], H),
			f(N.x, N.y, -K)
		}
	}
	H = k;
	for (M = 0; M < fa; M++) N = m ? c(A[M], ca[M], H) : A[M],
	q ? (G.copy(u.normals[0]).multiplyScalar(N.x), B.copy(u.binormals[0]).multiplyScalar(N.y), D.copy(n[0]).add(G).add(B), f(D.x, D.y, D.z)) : f(N.x, N.y, 0);
	for (w = 1; w <= s; w++) for (M = 0; M < fa; M++) N = m ? c(A[M], ca[M], H) : A[M],
	q ? (G.copy(u.normals[w]).multiplyScalar(N.x), B.copy(u.binormals[w]).multiplyScalar(N.y), D.copy(n[w]).add(G).add(B), f(D.x, D.y, D.z)) : f(N.x, N.y, h / s * w);
	for (F = l - 1; 0 <= F; F--) {
		w = F / l;
		K = i * (1 - w);
		H = k * Math.sin(w * Math.PI / 2);
		M = 0;
		for (U = r.length; M < U; M++) N = c(r[M], eb[M], H),
		f(N.x, N.y, h + K);
		I = 0;
		for (J = p.length; I < J; I++) {
			w = p[I];
			L = ja[I];
			M = 0;
			for (U = w.length; M < U; M++) N = c(w[M], L[M], H),
			q ? f(N.x, N.y + n[s - 1].y, n[s - 1].x + K) : f(N.x, N.y, h + K)
		}
	}
	if (m) {
		i = 0 * fa;
		for (M = 0; M < ma; M++) h = S[M],
		g(h[2] + i, h[1] + i, h[0] + i, !0);
		i = fa * (s + 2 * l);
		for (M = 0; M < ma; M++) h = S[M],
		g(h[0] + i, h[1] + i, h[2] + i, !1)
	} else {
		for (M = 0; M < ma; M++) h = S[M],
		g(h[2], h[1], h[0], !0);
		for (M = 0; M < ma; M++) h = S[M],
		g(h[0] + fa * s, h[1] + fa * s, h[2] + fa * s, !1)
	}
	h = 0;
	e(r, h);
	h += r.length;
	I = 0;
	for (J = p.length; I < J; I++) w = p[I],
	e(w, h),
	h += w.length
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
	generateTopUV: function(a, b, c, d, e, f) {
		b = a.vertices[e].x;
		e = a.vertices[e].y;
		c = a.vertices[f].x;
		f = a.vertices[f].y;
		return [new THREE.Vector2(a.vertices[d].x, a.vertices[d].y), new THREE.Vector2(b, e), new THREE.Vector2(c, f)]
	},
	generateBottomUV: function(a, b, c, d, e, f) {
		return this.generateTopUV(a, b, c, d, e, f)
	},
	generateSideWallUV: function(a, b, c, d, e, f, g, h) {
		var b = a.vertices[e].x,
		c = a.vertices[e].y,
		e = a.vertices[e].z,
		d = a.vertices[f].x,
		i = a.vertices[f].y,
		f = a.vertices[f].z,
		k = a.vertices[g].x,
		l = a.vertices[g].y,
		g = a.vertices[g].z,
		m = a.vertices[h].x,
		p = a.vertices[h].y,
		a = a.vertices[h].z;
		return 0.01 > Math.abs(c - i) ? [new THREE.Vector2(b, 1 - e), new THREE.Vector2(d, 1 - f), new THREE.Vector2(k, 1 - g), new THREE.Vector2(m, 1 - a)] : [new THREE.Vector2(c, 1 - e), new THREE.Vector2(i, 1 - f), new THREE.Vector2(l, 1 - g), new THREE.Vector2(p, 1 - a)]
	}
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.ShapeGeometry = function(a, b) {
	THREE.Geometry.call(this); ! 1 === a instanceof Array && (a = [a]);
	this.shapebb = a[a.length - 1].getBoundingBox();
	this.addShapeList(a, b);
	this.computeCentroids();
	this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function(a, b) {
	for (var c = 0,
	d = a.length; c < d; c++) this.addShape(a[c], b);
	return this
};
THREE.ShapeGeometry.prototype.addShape = function(a, b) {
	void 0 === b && (b = {});
	var c = b.material,
	d = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator: b.UVGenerator,
	e,
	f,
	g,
	h = this.vertices.length;
	e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments: 12);
	var i = e.shape,
	k = e.holes;
	if (!THREE.Shape.Utils.isClockWise(i)) {
		i = i.reverse();
		e = 0;
		for (f = k.length; e < f; e++) g = k[e],
		THREE.Shape.Utils.isClockWise(g) && (k[e] = g.reverse())
	}
	var l = THREE.Shape.Utils.triangulateShape(i, k);
	e = 0;
	for (f = k.length; e < f; e++) g = k[e],
	i = i.concat(g);
	k = i.length;
	f = l.length;
	for (e = 0; e < k; e++) g = i[e],
	this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
	for (e = 0; e < f; e++) k = l[e],
	i = k[0] + h,
	g = k[1] + h,
	k = k[2] + h,
	this.faces.push(new THREE.Face3(i, g, k, null, null, c)),
	this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, g, k))
};
THREE.LatheGeometry = function(a, b, c, d) {
	THREE.Geometry.call(this);
	for (var b = b || 12,
	c = c || 0,
	d = d || 2 * Math.PI,
	e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; g <= h; g++) for (var i = c + g * f * d,
	k = Math.cos(i), l = Math.sin(i), i = 0, m = a.length; i < m; i++) {
		var p = a[i],
		s = new THREE.Vector3;
		s.x = k * p.x - l * p.y;
		s.y = l * p.x + k * p.y;
		s.z = p.z;
		this.vertices.push(s)
	}
	c = a.length;
	g = 0;
	for (h = b; g < h; g++) {
		i = 0;
		for (m = a.length - 1; i < m; i++) d = b = i + c * g,
		l = b + c,
		k = b + 1 + c,
		this.faces.push(new THREE.Face4(d, l, k, b + 1)),
		k = g * f,
		b = i * e,
		d = k + f,
		l = b + e,
		this.faceVertexUvs[0].push([new THREE.Vector2(k, b), new THREE.Vector2(d, b), new THREE.Vector2(d, l), new THREE.Vector2(k, l)])
	}
	this.mergeVertices();
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function(a, b, c, d) {
	THREE.Geometry.call(this);
	this.width = a;
	this.height = b;
	this.widthSegments = c || 1;
	this.heightSegments = d || 1;
	for (var c = a / 2,
	e = b / 2,
	d = this.widthSegments,
	f = this.heightSegments,
	g = d + 1,
	h = f + 1,
	i = this.width / d,
	k = this.height / f,
	l = new THREE.Vector3(0, 0, 1), a = 0; a < h; a++) for (b = 0; b < g; b++) this.vertices.push(new THREE.Vector3(b * i - c, -(a * k - e), 0));
	for (a = 0; a < f; a++) for (b = 0; b < d; b++) c = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b + 1 + g * a),
	c.normal.copy(l),
	c.vertexNormals.push(l.clone(), l.clone(), l.clone(), l.clone()),
	this.faces.push(c),
	this.faceVertexUvs[0].push([new THREE.Vector2(b / d, 1 - a / f), new THREE.Vector2(b / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - a / f)]);
	this.computeCentroids()
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RingGeometry = function(a, b, c, d, e, f) {
	THREE.Geometry.call(this);
	for (var a = a || 0,
	b = b || 50,
	e = void 0 !== e ? e: 0, f = void 0 !== f ? f: 2 * Math.PI, c = void 0 !== c ? Math.max(3, c) : 8, d = void 0 !== d ? Math.max(3, d) : 8, g = [], h = a, i = (b - a) / d, a = 0; a <= d; a++) {
		for (b = 0; b <= c; b++) {
			var k = new THREE.Vector3,
			l = e + b / c * f;
			k.x = h * Math.cos(l);
			k.y = h * Math.sin(l);
			this.vertices.push(k);
			g.push(new THREE.Vector2((k.x / h + 1) / 2, -(k.y / h + 1) / 2 + 1))
		}
		h += i
	}
	e = new THREE.Vector3(0, 0, 1);
	for (a = 0; a < d; a++) {
		f = a * c;
		for (b = 0; b <= c; b++) {
			var l = b + f,
			i = l + a,
			k = l + c + a,
			m = l + c + 1 + a;
			this.faces.push(new THREE.Face3(i, k, m, [e, e, e]));
			this.faceVertexUvs[0].push([g[i], g[k], g[m]]);
			i = l + a;
			k = l + c + 1 + a;
			m = l + 1 + a;
			this.faces.push(new THREE.Face3(i, k, m, [e, e, e]));
			this.faceVertexUvs[0].push([g[i], g[k], g[m]])
		}
	}
	this.computeCentroids();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, h)
};
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function(a, b, c, d, e, f, g) {
	THREE.Geometry.call(this);
	this.radius = a || 50;
	this.widthSegments = Math.max(3, Math.floor(b) || 8);
	this.heightSegments = Math.max(2, Math.floor(c) || 6);
	for (var d = void 0 !== d ? d: 0, e = void 0 !== e ? e: 2 * Math.PI, f = void 0 !== f ? f: 0, g = void 0 !== g ? g: Math.PI, h = [], i = [], c = 0; c <= this.heightSegments; c++) {
		for (var k = [], l = [], b = 0; b <= this.widthSegments; b++) {
			var m = b / this.widthSegments,
			p = c / this.heightSegments,
			s = new THREE.Vector3;
			s.x = -this.radius * Math.cos(d + m * e) * Math.sin(f + p * g);
			s.y = this.radius * Math.cos(f + p * g);
			s.z = this.radius * Math.sin(d + m * e) * Math.sin(f + p * g);
			this.vertices.push(s);
			k.push(this.vertices.length - 1);
			l.push(new THREE.Vector2(m, 1 - p))
		}
		h.push(k);
		i.push(l)
	}
	for (c = 0; c < this.heightSegments; c++) for (b = 0; b < this.widthSegments; b++) {
		var d = h[c][b + 1],
		e = h[c][b],
		f = h[c + 1][b],
		g = h[c + 1][b + 1],
		k = this.vertices[d].clone().normalize(),
		l = this.vertices[e].clone().normalize(),
		m = this.vertices[f].clone().normalize(),
		p = this.vertices[g].clone().normalize(),
		s = i[c][b + 1].clone(),
		r = i[c][b].clone(),
		n = i[c + 1][b].clone(),
		q = i[c + 1][b + 1].clone();
		Math.abs(this.vertices[d].y) === this.radius ? (this.faces.push(new THREE.Face3(d, f, g, [k, m, p])), this.faceVertexUvs[0].push([s, n, q])) : Math.abs(this.vertices[f].y) === this.radius ? (this.faces.push(new THREE.Face3(d, e, f, [k, l, m])), this.faceVertexUvs[0].push([s, r, n])) : (this.faces.push(new THREE.Face4(d, e, f, g, [k, l, m, p])), this.faceVertexUvs[0].push([s, r, n, q]))
	}
	this.computeCentroids();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function(a, b) {
	var c = THREE.FontUtils.generateShapes(a, b);
	b.amount = void 0 !== b.height ? b.height: 50;
	void 0 === b.bevelThickness && (b.bevelThickness = 10);
	void 0 === b.bevelSize && (b.bevelSize = 8);
	void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
	THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function(a, b, c, d, e) {
	THREE.Geometry.call(this);
	this.radius = a || 100;
	this.tube = b || 40;
	this.radialSegments = c || 8;
	this.tubularSegments = d || 6;
	this.arc = e || 2 * Math.PI;
	e = new THREE.Vector3;
	a = [];
	b = [];
	for (c = 0; c <= this.radialSegments; c++) for (d = 0; d <= this.tubularSegments; d++) {
		var f = d / this.tubularSegments * this.arc,
		g = 2 * c / this.radialSegments * Math.PI;
		e.x = this.radius * Math.cos(f);
		e.y = this.radius * Math.sin(f);
		var h = new THREE.Vector3;
		h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
		h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
		h.z = this.tube * Math.sin(g);
		this.vertices.push(h);
		a.push(new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments));
		b.push(h.clone().sub(e).normalize())
	}
	for (c = 1; c <= this.radialSegments; c++) for (d = 1; d <= this.tubularSegments; d++) {
		var e = (this.tubularSegments + 1) * c + d - 1,
		f = (this.tubularSegments + 1) * (c - 1) + d - 1,
		g = (this.tubularSegments + 1) * (c - 1) + d,
		h = (this.tubularSegments + 1) * c + d,
		i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
		i.normal.add(b[e]);
		i.normal.add(b[f]);
		i.normal.add(b[g]);
		i.normal.add(b[h]);
		i.normal.normalize();
		this.faces.push(i);
		this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[h].clone()])
	}
	this.computeCentroids()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function(a, b, c, d, e, f, g) {
	function h(a, b, c, d, e, f) {
		var g = Math.cos(a);
		Math.cos(b);
		b = Math.sin(a);
		a *= c / d;
		c = Math.cos(a);
		g *= 0.5 * e * (2 + c);
		b = 0.5 * e * (2 + c) * b;
		e = 0.5 * f * e * Math.sin(a);
		return new THREE.Vector3(g, b, e)
	}
	THREE.Geometry.call(this);
	this.radius = a || 100;
	this.tube = b || 40;
	this.radialSegments = c || 64;
	this.tubularSegments = d || 8;
	this.p = e || 2;
	this.q = f || 3;
	this.heightScale = g || 1;
	this.grid = Array(this.radialSegments);
	c = new THREE.Vector3;
	d = new THREE.Vector3;
	e = new THREE.Vector3;
	for (a = 0; a < this.radialSegments; ++a) {
		this.grid[a] = Array(this.tubularSegments);
		for (b = 0; b < this.tubularSegments; ++b) {
			var i = 2 * (a / this.radialSegments) * this.p * Math.PI,
			g = 2 * (b / this.tubularSegments) * Math.PI,
			f = h(i, g, this.q, this.p, this.radius, this.heightScale),
			i = h(i + 0.01, g, this.q, this.p, this.radius, this.heightScale);
			c.subVectors(i, f);
			d.addVectors(i, f);
			e.crossVectors(c, d);
			d.crossVectors(e, c);
			e.normalize();
			d.normalize();
			i = -this.tube * Math.cos(g);
			g = this.tube * Math.sin(g);
			f.x += i * d.x + g * e.x;
			f.y += i * d.y + g * e.y;
			f.z += i * d.z + g * e.z;
			this.grid[a][b] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
		}
	}
	for (a = 0; a < this.radialSegments; ++a) for (b = 0; b < this.tubularSegments; ++b) {
		var e = (a + 1) % this.radialSegments,
		f = (b + 1) % this.tubularSegments,
		c = this.grid[a][b],
		d = this.grid[e][b],
		e = this.grid[e][f],
		f = this.grid[a][f],
		g = new THREE.Vector2(a / this.radialSegments, b / this.tubularSegments),
		i = new THREE.Vector2((a + 1) / this.radialSegments, b / this.tubularSegments),
		k = new THREE.Vector2((a + 1) / this.radialSegments, (b + 1) / this.tubularSegments),
		l = new THREE.Vector2(a / this.radialSegments, (b + 1) / this.tubularSegments);
		this.faces.push(new THREE.Face4(c, d, e, f));
		this.faceVertexUvs[0].push([g, i, k, l])
	}
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function(a, b, c, d, e, f) {
	THREE.Geometry.call(this);
	this.path = a;
	this.segments = b || 64;
	this.radius = c || 1;
	this.radiusSegments = d || 8;
	this.closed = e || !1;
	f && (this.debug = new THREE.Object3D);
	this.grid = [];
	var g, h, e = this.segments + 1,
	i, k, l, f = new THREE.Vector3,
	m, p, s, b = new THREE.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed);
	m = b.tangents;
	p = b.normals;
	s = b.binormals;
	this.tangents = m;
	this.normals = p;
	this.binormals = s;
	for (b = 0; b < e; b++) {
		this.grid[b] = [];
		d = b / (e - 1);
		l = a.getPointAt(d);
		d = m[b];
		g = p[b];
		h = s[b];
		this.debug && (this.debug.add(new THREE.ArrowHelper(d, l, c, 255)), this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680)), this.debug.add(new THREE.ArrowHelper(h, l, c, 65280)));
		for (d = 0; d < this.radiusSegments; d++) i = 2 * (d / this.radiusSegments) * Math.PI,
		k = -this.radius * Math.cos(i),
		i = this.radius * Math.sin(i),
		f.copy(l),
		f.x += k * g.x + i * h.x,
		f.y += k * g.y + i * h.y,
		f.z += k * g.z + i * h.z,
		this.grid[b][d] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
	}
	for (b = 0; b < this.segments; b++) for (d = 0; d < this.radiusSegments; d++) e = this.closed ? (b + 1) % this.segments: b + 1,
	f = (d + 1) % this.radiusSegments,
	a = this.grid[b][d],
	c = this.grid[e][d],
	e = this.grid[e][f],
	f = this.grid[b][f],
	m = new THREE.Vector2(b / this.segments, d / this.radiusSegments),
	p = new THREE.Vector2((b + 1) / this.segments, d / this.radiusSegments),
	s = new THREE.Vector2((b + 1) / this.segments, (d + 1) / this.radiusSegments),
	g = new THREE.Vector2(b / this.segments, (d + 1) / this.radiusSegments),
	this.faces.push(new THREE.Face4(a, c, e, f)),
	this.faceVertexUvs[0].push([m, p, s, g]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function(a, b, c) {
	new THREE.Vector3;
	var d = new THREE.Vector3;
	new THREE.Vector3;
	var e = [],
	f = [],
	g = [],
	h = new THREE.Vector3,
	i = new THREE.Matrix4,
	b = b + 1,
	k,
	l,
	m;
	this.tangents = e;
	this.normals = f;
	this.binormals = g;
	for (k = 0; k < b; k++) l = k / (b - 1),
	e[k] = a.getTangentAt(l),
	e[k].normalize();
	f[0] = new THREE.Vector3;
	g[0] = new THREE.Vector3;
	a = Number.MAX_VALUE;
	k = Math.abs(e[0].x);
	l = Math.abs(e[0].y);
	m = Math.abs(e[0].z);
	k <= a && (a = k, d.set(1, 0, 0));
	l <= a && (a = l, d.set(0, 1, 0));
	m <= a && d.set(0, 0, 1);
	h.crossVectors(e[0], d).normalize();
	f[0].crossVectors(e[0], h);
	g[0].crossVectors(e[0], f[0]);
	for (k = 1; k < b; k++) f[k] = f[k - 1].clone(),
	g[k] = g[k - 1].clone(),
	h.crossVectors(e[k - 1], e[k]),
	1E-4 < h.length() && (h.normalize(), d = Math.acos(e[k - 1].dot(e[k])), f[k].applyMatrix4(i.makeRotationAxis(h, d))),
	g[k].crossVectors(e[k], f[k]);
	if (c) {
		d = Math.acos(f[0].dot(f[b - 1]));
		d /= b - 1;
		0 < e[0].dot(h.crossVectors(f[0], f[b - 1])) && (d = -d);
		for (k = 1; k < b; k++) f[k].applyMatrix4(i.makeRotationAxis(e[k], d * k)),
		g[k].crossVectors(e[k], f[k])
	}
};
THREE.PolyhedronGeometry = function(a, b, c, d) {
	function e(a) {
		var b = a.normalize().clone();
		b.index = i.vertices.push(b) - 1;
		var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
		a = Math.atan2( - a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
		b.uv = new THREE.Vector2(c, 1 - a);
		return b
	}
	function f(a, b, c, d) {
		1 > d ? (d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]), d.centroid.add(a).add(b).add(c).divideScalar(3), d.normal = d.centroid.clone().normalize(), i.faces.push(d), d = Math.atan2(d.centroid.z, -d.centroid.x), i.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)])) : (d -= 1, f(a, g(a, b), g(a, c), d), f(g(a, b), b, g(b, c), d), f(g(a, c), g(b, c), c, d), f(g(a, b), g(b, c), g(a, c), d))
	}
	function g(a, b) {
		m[a.index] || (m[a.index] = []);
		m[b.index] || (m[b.index] = []);
		var c = m[a.index][b.index];
		void 0 === c && (m[a.index][b.index] = m[b.index][a.index] = c = e((new THREE.Vector3).addVectors(a, b).divideScalar(2)));
		return c
	}
	function h(a, b, c) {
		0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y));
		0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y));
		return a
	}
	THREE.Geometry.call(this);
	for (var c = c || 1,
	d = d || 0,
	i = this,
	k = 0,
	l = a.length; k < l; k++) e(new THREE.Vector3(a[k][0], a[k][1], a[k][2]));
	for (var m = [], a = this.vertices, k = 0, l = b.length; k < l; k++) f(a[b[k][0]], a[b[k][1]], a[b[k][2]], d);
	this.mergeVertices();
	k = 0;
	for (l = this.vertices.length; k < l; k++) this.vertices[k].multiplyScalar(c);
	this.computeCentroids();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3, c)
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function(a, b) {
	var c = (1 + Math.sqrt(5)) / 2;
	THREE.PolyhedronGeometry.call(this, [[ - 1, c, 0], [1, c, 0], [ - 1, -c, 0], [1, -c, 0], [0, -1, c], [0, 1, c], [0, -1, -c], [0, 1, -c], [c, 0, -1], [c, 0, 1], [ - c, 0, -1], [ - c, 0, 1]], [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]], a, b)
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function(a, b) {
	THREE.PolyhedronGeometry.call(this, [[1, 0, 0], [ - 1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 2, 5], [1, 5, 3], [1, 3, 4], [1, 4, 2]], a, b)
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function(a, b) {
	THREE.PolyhedronGeometry.call(this, [[1, 1, 1], [ - 1, -1, 1], [ - 1, 1, -1], [1, -1, -1]], [[2, 1, 0], [0, 3, 2], [1, 3, 0], [2, 3, 1]], a, b)
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function(a, b, c, d) {
	THREE.Geometry.call(this);
	var e = this.vertices,
	f = this.faces,
	g = this.faceVertexUvs[0],
	d = void 0 === d ? !1 : d,
	h,
	i,
	k,
	l,
	m = b + 1;
	for (h = 0; h <= c; h++) {
		l = h / c;
		for (i = 0; i <= b; i++) k = i / b,
		k = a(k, l),
		e.push(k)
	}
	var p, s, r, n;
	for (h = 0; h < c; h++) for (i = 0; i < b; i++) a = h * m + i,
	e = h * m + i + 1,
	l = (h + 1) * m + i,
	k = (h + 1) * m + i + 1,
	p = new THREE.Vector2(i / b, h / c),
	s = new THREE.Vector2((i + 1) / b, h / c),
	r = new THREE.Vector2(i / b, (h + 1) / c),
	n = new THREE.Vector2((i + 1) / b, (h + 1) / c),
	d ? (f.push(new THREE.Face3(a, e, l)), f.push(new THREE.Face3(e, k, l)), g.push([p, s, r]), g.push([s, n, r])) : (f.push(new THREE.Face4(a, e, k, l)), g.push([p, s, n, r]));
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function(a) {
	function b(a) {
		var b = a.length();
		return new THREE.Vector2(a.x / b, a.y / b)
	}
	THREE.Geometry.call(this);
	for (var c = [[0, 1, 2], [0, 2, 1]], d = 3; d < a.length; d++) {
		var e = d,
		f = a[e].clone(),
		g = f.length();
		f.x += g * 2E-6 * (Math.random() - 0.5);
		f.y += g * 2E-6 * (Math.random() - 0.5);
		f.z += g * 2E-6 * (Math.random() - 0.5);
		for (var g = [], h = 0; h < c.length;) {
			var i = c[h],
			k = f,
			l = a[i[0]],
			m;
			m = l;
			var p = a[i[1]],
			s = a[i[2]],
			r = new THREE.Vector3,
			n = new THREE.Vector3;
			r.subVectors(s, p);
			n.subVectors(m, p);
			r.cross(n);
			r.normalize();
			m = r;
			l = m.dot(l);
			if (m.dot(k) >= l) {
				for (k = 0; 3 > k; k++) {
					l = [i[k], i[(k + 1) % 3]];
					m = !0;
					for (p = 0; p < g.length; p++) if (g[p][0] === l[1] && g[p][1] === l[0]) {
						g[p] = g[g.length - 1];
						g.pop();
						m = !1;
						break
					}
					m && g.push(l)
				}
				c[h] = c[c.length - 1];
				c.pop()
			} else h++
		}
		for (p = 0; p < g.length; p++) c.push([g[p][0], g[p][1], e])
	}
	e = 0;
	f = Array(a.length);
	for (d = 0; d < c.length; d++) {
		g = c[d];
		for (h = 0; 3 > h; h++) void 0 === f[g[h]] && (f[g[h]] = e++, this.vertices.push(a[g[h]])),
		g[h] = f[g[h]]
	}
	for (d = 0; d < c.length; d++) this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
	for (d = 0; d < this.faces.length; d++) g = this.faces[d],
	this.faceVertexUvs[0].push([b(this.vertices[g.a]), b(this.vertices[g.b]), b(this.vertices[g.c])]);
	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function(a) {
	var b = new THREE.Geometry;
	b.vertices.push(new THREE.Vector3, new THREE.Vector3(a || 1, 0, 0), new THREE.Vector3, new THREE.Vector3(0, a || 1, 0), new THREE.Vector3, new THREE.Vector3(0, 0, a || 1));
	b.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775));
	a = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors
	});
	THREE.Line.call(this, b, a, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function(a, b, c, d) {
	THREE.Object3D.call(this);
	void 0 === c && (c = 20);
	void 0 === d && (d = 16776960);
	var e = new THREE.Geometry;
	e.vertices.push(new THREE.Vector3(0, 0, 0));
	e.vertices.push(new THREE.Vector3(0, 1, 0));
	this.line = new THREE.Line(e, new THREE.LineBasicMaterial({
		color: d
	}));
	this.add(this.line);
	e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
	this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial({
		color: d
	}));
	this.cone.position.set(0, 1, 0);
	this.add(this.cone);
	b instanceof THREE.Vector3 && (this.position = b);
	this.setDirection(a);
	this.setLength(c)
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function(a) {
	var b = THREE.ArrowHelper.__v1.copy(a).normalize();
	0.999 < b.y ? this.rotation.set(0, 0, 0) : -0.999 > b.y ? this.rotation.set(Math.PI, 0, 0) : (a = THREE.ArrowHelper.__v2.set(b.z, 0, -b.x).normalize(), b = Math.acos(b.y), a = THREE.ArrowHelper.__q1.setFromAxisAngle(a, b), this.rotation.setEulerFromQuaternion(a, this.eulerOrder))
};
THREE.ArrowHelper.prototype.setLength = function(a) {
	this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function(a) {
	this.line.material.color.setHex(a);
	this.cone.material.color.setHex(a)
};
THREE.ArrowHelper.__v1 = new THREE.Vector3;
THREE.ArrowHelper.__v2 = new THREE.Vector3;
THREE.ArrowHelper.__q1 = new THREE.Quaternion;
THREE.CameraHelper = function(a) {
	function b(a, b, d) {
		c(a, d);
		c(b, d)
	}
	function c(a, b) {
		d.geometry.vertices.push(new THREE.Vector3);
		d.geometry.colors.push(new THREE.Color(b));
		void 0 === d.pointMap[a] && (d.pointMap[a] = []);
		d.pointMap[a].push(d.geometry.vertices.length - 1)
	}
	THREE.Line.call(this);
	var d = this;
	this.geometry = new THREE.Geometry;
	this.material = new THREE.LineBasicMaterial({
		color: 16777215,
		vertexColors: THREE.FaceColors
	});
	this.type = THREE.LinePieces;
	this.matrixWorld = a.matrixWorld;
	this.matrixAutoUpdate = !1;
	this.pointMap = {};
	b("n1", "n2", 16755200);
	b("n2", "n4", 16755200);
	b("n4", "n3", 16755200);
	b("n3", "n1", 16755200);
	b("f1", "f2", 16755200);
	b("f2", "f4", 16755200);
	b("f4", "f3", 16755200);
	b("f3", "f1", 16755200);
	b("n1", "f1", 16755200);
	b("n2", "f2", 16755200);
	b("n3", "f3", 16755200);
	b("n4", "f4", 16755200);
	b("p", "n1", 16711680);
	b("p", "n2", 16711680);
	b("p", "n3", 16711680);
	b("p", "n4", 16711680);
	b("u1", "u2", 43775);
	b("u2", "u3", 43775);
	b("u3", "u1", 43775);
	b("c", "t", 16777215);
	b("p", "c", 3355443);
	b("cn1", "cn2", 3355443);
	b("cn3", "cn4", 3355443);
	b("cf1", "cf2", 3355443);
	b("cf3", "cf4", 3355443);
	this.camera = a;
	this.update(a)
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function() {
	function a(a, d, e, f) {
		THREE.CameraHelper.__v.set(d, e, f);
		THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v, THREE.CameraHelper.__c);
		a = b.pointMap[a];
		if (void 0 !== a) {
			d = 0;
			for (e = a.length; d < e; d++) b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v)
		}
	}
	var b = this;
	THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
	a("c", 0, 0, -1);
	a("t", 0, 0, 1);
	a("n1", -1, -1, -1);
	a("n2", 1, -1, -1);
	a("n3", -1, 1, -1);
	a("n4", 1, 1, -1);
	a("f1", -1, -1, 1);
	a("f2", 1, -1, 1);
	a("f3", -1, 1, 1);
	a("f4", 1, 1, 1);
	a("u1", 0.7, 1.1, -1);
	a("u2", -0.7, 1.1, -1);
	a("u3", 0, 2, -1);
	a("cf1", -1, 0, 1);
	a("cf2", 1, 0, 1);
	a("cf3", 0, -1, 1);
	a("cf4", 0, 1, 1);
	a("cn1", -1, 0, -1);
	a("cn2", 1, 0, -1);
	a("cn3", 0, -1, -1);
	a("cn4", 0, 1, -1);
	this.geometry.verticesNeedUpdate = !0
};
THREE.CameraHelper.__projector = new THREE.Projector;
THREE.CameraHelper.__v = new THREE.Vector3;
THREE.CameraHelper.__c = new THREE.Camera;
THREE.DirectionalLightHelper = function(a, b) {
	THREE.Object3D.call(this);
	this.light = a;
	var c = new THREE.SphereGeometry(b, 4, 2),
	d = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0
	});
	d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightSphere = new THREE.Mesh(c, d);
	this.lightSphere.position = this.light.position;
	this.add(this.lightSphere);
	c = new THREE.Geometry;
	c.vertices.push(this.light.position);
	c.vertices.push(this.light.target.position);
	c.computeLineDistances();
	d = new THREE.LineDashedMaterial({
		dashSize: 4,
		gapSize: 4,
		opacity: 0.75,
		transparent: !0,
		fog: !1
	});
	d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.targetLine = new THREE.Line(c, d);
	this.add(this.targetLine)
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.update = function() {
	this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.targetLine.geometry.computeLineDistances();
	this.targetLine.geometry.verticesNeedUpdate = !0;
	this.targetLine.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.GridHelper = function(a, b) {
	for (var c = new THREE.Geometry,
	d = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors
	}), e = new THREE.Color(4473924), f = new THREE.Color(8947848), g = -a; g <= a; g += b) {
		c.vertices.push(new THREE.Vector3( - a, 0, g));
		c.vertices.push(new THREE.Vector3(a, 0, g));
		c.vertices.push(new THREE.Vector3(g, 0, -a));
		c.vertices.push(new THREE.Vector3(g, 0, a));
		var h = 0 === g ? e: f;
		c.colors.push(h, h, h, h)
	}
	THREE.Line.call(this, c, d, THREE.LinePieces)
};
THREE.GridHelper.prototype = Object.create(THREE.Line.prototype);
THREE.HemisphereLightHelper = function(a, b) {
	THREE.Object3D.call(this);
	this.light = a;
	var c = new THREE.SphereGeometry(b, 4, 2);
	c.applyMatrix((new THREE.Matrix4).makeRotationX( - Math.PI / 2));
	for (var d = 0; 8 > d; d++) c.faces[d].materialIndex = 4 > d ? 0 : 1;
	d = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0
	});
	d.color.copy(a.color).multiplyScalar(a.intensity);
	var e = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0
	});
	e.color.copy(a.groundColor).multiplyScalar(a.intensity);
	this.lightSphere = new THREE.Mesh(c, new THREE.MeshFaceMaterial([d, e]));
	this.lightSphere.position = a.position;
	this.lightSphere.lookAt(new THREE.Vector3);
	this.add(this.lightSphere)
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function() {
	this.lightSphere.lookAt(new THREE.Vector3);
	this.lightSphere.material.materials[0].color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightSphere.material.materials[1].color.copy(this.light.groundColor).multiplyScalar(this.light.intensity)
};
THREE.PointLightHelper = function(a, b) {
	THREE.Object3D.call(this);
	this.light = a;
	var c = new THREE.SphereGeometry(b, 4, 2),
	d = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0
	});
	d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightSphere = new THREE.Mesh(c, d);
	this.lightSphere.position = this.light.position;
	this.add(this.lightSphere)
};
THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update = function() {
	this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.SpotLightHelper = function(a, b) {
	THREE.Object3D.call(this);
	this.light = a;
	var c = new THREE.SphereGeometry(b, 4, 2),
	d = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0
	});
	d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightSphere = new THREE.Mesh(c, d);
	this.lightSphere.position = this.light.position;
	this.add(this.lightSphere);
	c = new THREE.CylinderGeometry(1E-4, 1, 1, 8, 1, !0);
	c.applyMatrix((new THREE.Matrix4).makeRotationX( - Math.PI / 2).translate(new THREE.Vector3(0, -0.5, 0)));
	d = new THREE.MeshBasicMaterial({
		fog: !1,
		wireframe: !0,
		opacity: 0.3,
		transparent: !0
	});
	d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightCone = new THREE.Mesh(c, d);
	this.lightCone.position = this.light.position;
	c = a.distance ? a.distance: 1E4;
	d = 2 * c * Math.tan(0.5 * a.angle);
	this.lightCone.scale.set(d, d, c);
	this.lightCone.lookAt(this.light.target.position);
	this.add(this.lightCone)
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function() {
	var a = this.light.distance ? this.light.distance: 1E4,
	b = 2 * a * Math.tan(0.5 * this.light.angle);
	this.lightCone.scale.set(b, b, a);
	this.lightCone.lookAt(this.light.target.position);
	this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightCone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.ImmediateRenderObject = function() {
	THREE.Object3D.call(this);
	this.render = function() {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function(a, b, c, d, e) {
	THREE.Object3D.call(this);
	this.lensFlares = [];
	this.positionScreen = new THREE.Vector3;
	this.customUpdateCallback = void 0;
	void 0 !== a && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function(a, b, c, d, e, f) {
	void 0 === b && (b = -1);
	void 0 === c && (c = 0);
	void 0 === f && (f = 1);
	void 0 === e && (e = new THREE.Color(16777215));
	void 0 === d && (d = THREE.NormalBlending);
	c = Math.min(c, Math.max(0, c));
	this.lensFlares.push({
		texture: a,
		size: b,
		distance: c,
		x: 0,
		y: 0,
		z: 0,
		scale: 1,
		rotation: 1,
		opacity: f,
		color: e,
		blending: d
	})
};
THREE.LensFlare.prototype.updateLensFlares = function() {
	var a, b = this.lensFlares.length,
	c, d = 2 * -this.positionScreen.x,
	e = 2 * -this.positionScreen.y;
	for (a = 0; a < b; a++) c = this.lensFlares[a],
	c.x = this.positionScreen.x + d * c.distance,
	c.y = this.positionScreen.y + e * c.distance,
	c.wantedRotation = 0.25 * c.x * Math.PI,
	c.rotation += 0.25 * (c.wantedRotation - c.rotation)
};
THREE.MorphBlendMesh = function(a, b) {
	THREE.Mesh.call(this, a, b);
	this.animationsMap = {};
	this.animationsList = [];
	var c = this.geometry.morphTargets.length;
	this.createAnimation("__default", 0, c - 1, c / 1);
	this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d) {
	b = {
		startFrame: b,
		endFrame: c,
		length: c - b + 1,
		fps: d,
		duration: (c - b) / d,
		lastFrame: 0,
		currentFrame: 0,
		active: !1,
		time: 0,
		direction: 1,
		weight: 1,
		directionBackwards: !1,
		mirroredLoop: !1
	};
	this.animationsMap[a] = b;
	this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(a) {
	for (var b = /([a-z]+)(\d+)/,
	c, d = {},
	e = this.geometry,
	f = 0,
	g = e.morphTargets.length; f < g; f++) {
		var h = e.morphTargets[f].name.match(b);
		if (h && 1 < h.length) {
			var i = h[1];
			d[i] || (d[i] = {
				start: Infinity,
				end: -Infinity
			});
			h = d[i];
			f < h.start && (h.start = f);
			f > h.end && (h.end = f);
			c || (c = i)
		}
	}
	for (i in d) h = d[i],
	this.createAnimation(i, h.start, h.end, a);
	this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
	if (a = this.animationsMap[a]) a.direction = 1,
	a.directionBackwards = !1
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
	if (a = this.animationsMap[a]) a.direction = -1,
	a.directionBackwards = !0
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, b) {
	var c = this.animationsMap[a];
	c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, b) {
	var c = this.animationsMap[a];
	c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, b) {
	var c = this.animationsMap[a];
	c && (c.weight = b)
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, b) {
	var c = this.animationsMap[a];
	c && (c.time = b)
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function(a) {
	var b = 0;
	if (a = this.animationsMap[a]) b = a.time;
	return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
	var b = -1;
	if (a = this.animationsMap[a]) b = a.duration;
	return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function(a) {
	var b = this.animationsMap[a];
	b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function(a) {
	if (a = this.animationsMap[a]) a.active = !1
};
THREE.MorphBlendMesh.prototype.update = function(a) {
	for (var b = 0,
	c = this.animationsList.length; b < c; b++) {
		var d = this.animationsList[b];
		if (d.active) {
			var e = d.duration / d.length;
			d.time += d.direction * a;
			if (d.mirroredLoop) {
				if (d.time > d.duration || 0 > d.time) d.direction *= -1,
				d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0),
				0 > d.time && (d.time = 0, d.directionBackwards = !1)
			} else d.time %= d.duration,
			0 > d.time && (d.time += d.duration);
			var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
			g = d.weight;
			f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
			e = d.time % e / e;
			d.directionBackwards && (e = 1 - e);
			this.morphTargetInfluences[d.currentFrame] = e * g;
			this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
		}
	}
};
THREE.LensFlarePlugin = function() {
	function a(a, c) {
		var d = b.createProgram(),
		e = b.createShader(b.FRAGMENT_SHADER),
		f = b.createShader(b.VERTEX_SHADER),
		g = "precision " + c + " float;\n";
		b.shaderSource(e, g + a.fragmentShader);
		b.shaderSource(f, g + a.vertexShader);
		b.compileShader(e);
		b.compileShader(f);
		b.attachShader(d, e);
		b.attachShader(d, f);
		b.linkProgram(d);
		return d
	}
	var b, c, d, e, f, g, h, i, k, l, m, p, s;
	this.init = function(r) {
		b = r.context;
		c = r;
		d = r.getPrecision();
		e = new Float32Array(16);
		f = new Uint16Array(6);
		r = 0;
		e[r++] = -1;
		e[r++] = -1;
		e[r++] = 0;
		e[r++] = 0;
		e[r++] = 1;
		e[r++] = -1;
		e[r++] = 1;
		e[r++] = 0;
		e[r++] = 1;
		e[r++] = 1;
		e[r++] = 1;
		e[r++] = 1;
		e[r++] = -1;
		e[r++] = 1;
		e[r++] = 0;
		e[r++] = 1;
		r = 0;
		f[r++] = 0;
		f[r++] = 1;
		f[r++] = 2;
		f[r++] = 0;
		f[r++] = 2;
		f[r++] = 3;
		g = b.createBuffer();
		h = b.createBuffer();
		b.bindBuffer(b.ARRAY_BUFFER, g);
		b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
		b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
		b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
		i = b.createTexture();
		k = b.createTexture();
		b.bindTexture(b.TEXTURE_2D, i);
		b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE, null);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
		b.bindTexture(b.TEXTURE_2D, k);
		b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
		0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (l = !1, m = a(THREE.ShaderFlares.lensFlare, d)) : (l = !0, m = a(THREE.ShaderFlares.lensFlareVertexTexture, d));
		p = {};
		s = {};
		p.vertex = b.getAttribLocation(m, "position");
		p.uv = b.getAttribLocation(m, "uv");
		s.renderType = b.getUniformLocation(m, "renderType");
		s.map = b.getUniformLocation(m, "map");
		s.occlusionMap = b.getUniformLocation(m, "occlusionMap");
		s.opacity = b.getUniformLocation(m, "opacity");
		s.color = b.getUniformLocation(m, "color");
		s.scale = b.getUniformLocation(m, "scale");
		s.rotation = b.getUniformLocation(m, "rotation");
		s.screenPosition = b.getUniformLocation(m, "screenPosition")
	};
	this.render = function(a, d, e, f) {
		var a = a.__webglFlares,
		t = a.length;
		if (t) {
			var x = new THREE.Vector3,
			u = f / e,
			B = 0.5 * e,
			G = 0.5 * f,
			D = 16 / f,
			w = new THREE.Vector2(D * u, D),
			I = new THREE.Vector3(1, 1, 0),
			J = new THREE.Vector2(1, 1),
			E = s,
			D = p;
			b.useProgram(m);
			b.enableVertexAttribArray(p.vertex);
			b.enableVertexAttribArray(p.uv);
			b.uniform1i(E.occlusionMap, 0);
			b.uniform1i(E.map, 1);
			b.bindBuffer(b.ARRAY_BUFFER, g);
			b.vertexAttribPointer(D.vertex, 2, b.FLOAT, !1, 16, 0);
			b.vertexAttribPointer(D.uv, 2, b.FLOAT, !1, 16, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
			b.disable(b.CULL_FACE);
			b.depthMask(!1);
			var Z, A, S, F, H;
			for (Z = 0; Z < t; Z++) if (D = 16 / f, w.set(D * u, D), F = a[Z], x.set(F.matrixWorld.elements[12], F.matrixWorld.elements[13], F.matrixWorld.elements[14]), x.applyMatrix4(d.matrixWorldInverse), x.applyProjection(d.projectionMatrix), I.copy(x), J.x = I.x * B + B, J.y = I.y * G + G, l || 0 < J.x && J.x < e && 0 < J.y && J.y < f) {
				b.activeTexture(b.TEXTURE1);
				b.bindTexture(b.TEXTURE_2D, i);
				b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, J.x - 8, J.y - 8, 16, 16, 0);
				b.uniform1i(E.renderType, 0);
				b.uniform2f(E.scale, w.x, w.y);
				b.uniform3f(E.screenPosition, I.x, I.y, I.z);
				b.disable(b.BLEND);
				b.enable(b.DEPTH_TEST);
				b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
				b.activeTexture(b.TEXTURE0);
				b.bindTexture(b.TEXTURE_2D, k);
				b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, J.x - 8, J.y - 8, 16, 16, 0);
				b.uniform1i(E.renderType, 1);
				b.disable(b.DEPTH_TEST);
				b.activeTexture(b.TEXTURE1);
				b.bindTexture(b.TEXTURE_2D, i);
				b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
				F.positionScreen.copy(I);
				F.customUpdateCallback ? F.customUpdateCallback(F) : F.updateLensFlares();
				b.uniform1i(E.renderType, 2);
				b.enable(b.BLEND);
				A = 0;
				for (S = F.lensFlares.length; A < S; A++) H = F.lensFlares[A],
				0.001 < H.opacity && 0.001 < H.scale && (I.x = H.x, I.y = H.y, I.z = H.z, D = H.size * H.scale / f, w.x = D * u, w.y = D, b.uniform3f(E.screenPosition, I.x, I.y, I.z), b.uniform2f(E.scale, w.x, w.y), b.uniform1f(E.rotation, H.rotation), b.uniform1f(E.opacity, H.opacity), b.uniform3f(E.color, H.color.r, H.color.g, H.color.b), c.setBlending(H.blending, H.blendEquation, H.blendSrc, H.blendDst), c.setTexture(H.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0))
			}
			b.enable(b.CULL_FACE);
			b.enable(b.DEPTH_TEST);
			b.depthMask(!0)
		}
	}
};
THREE.ShadowMapPlugin = function() {
	var a, b, c, d, e, f, g = new THREE.Frustum,
	h = new THREE.Matrix4,
	i = new THREE.Vector3,
	k = new THREE.Vector3,
	l = new THREE.Vector3;
	this.init = function(g) {
		a = g.context;
		b = g;
		var g = THREE.ShaderLib.depthRGBA,
		h = THREE.UniformsUtils.clone(g.uniforms);
		c = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h
		});
		d = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0
		});
		e = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			skinning: !0
		});
		f = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0,
			skinning: !0
		});
		c._shadowPass = !0;
		d._shadowPass = !0;
		e._shadowPass = !0;
		f._shadowPass = !0
	};
	this.render = function(a, c) {
		b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
	};
	this.update = function(m, p) {
		var s, r, n, q, z, t, x, u, B, G = [];
		q = 0;
		a.clearColor(1, 1, 1, 1);
		a.disable(a.BLEND);
		a.enable(a.CULL_FACE);
		a.frontFace(a.CCW);
		b.shadowMapCullFace === THREE.CullFaceFront ? a.cullFace(a.FRONT) : a.cullFace(a.BACK);
		b.setDepthTest(!0);
		s = 0;
		for (r = m.__lights.length; s < r; s++) if (n = m.__lights[s], n.castShadow) if (n instanceof THREE.DirectionalLight && n.shadowCascade) for (z = 0; z < n.shadowCascadeCount; z++) {
			var D;
			if (n.shadowCascadeArray[z]) D = n.shadowCascadeArray[z];
			else {
				B = n;
				x = z;
				D = new THREE.DirectionalLight;
				D.isVirtual = !0;
				D.onlyShadow = !0;
				D.castShadow = !0;
				D.shadowCameraNear = B.shadowCameraNear;
				D.shadowCameraFar = B.shadowCameraFar;
				D.shadowCameraLeft = B.shadowCameraLeft;
				D.shadowCameraRight = B.shadowCameraRight;
				D.shadowCameraBottom = B.shadowCameraBottom;
				D.shadowCameraTop = B.shadowCameraTop;
				D.shadowCameraVisible = B.shadowCameraVisible;
				D.shadowDarkness = B.shadowDarkness;
				D.shadowBias = B.shadowCascadeBias[x];
				D.shadowMapWidth = B.shadowCascadeWidth[x];
				D.shadowMapHeight = B.shadowCascadeHeight[x];
				D.pointsWorld = [];
				D.pointsFrustum = [];
				u = D.pointsWorld;
				t = D.pointsFrustum;
				for (var w = 0; 8 > w; w++) u[w] = new THREE.Vector3,
				t[w] = new THREE.Vector3;
				u = B.shadowCascadeNearZ[x];
				B = B.shadowCascadeFarZ[x];
				t[0].set( - 1, -1, u);
				t[1].set(1, -1, u);
				t[2].set( - 1, 1, u);
				t[3].set(1, 1, u);
				t[4].set( - 1, -1, B);
				t[5].set(1, -1, B);
				t[6].set( - 1, 1, B);
				t[7].set(1, 1, B);
				D.originalCamera = p;
				t = new THREE.Gyroscope;
				t.position = n.shadowCascadeOffset;
				t.add(D);
				t.add(D.target);
				p.add(t);
				n.shadowCascadeArray[z] = D;
				console.log("Created virtualLight", D)
			}
			x = n;
			u = z;
			B = x.shadowCascadeArray[u];
			B.position.copy(x.position);
			B.target.position.copy(x.target.position);
			B.lookAt(B.target);
			B.shadowCameraVisible = x.shadowCameraVisible;
			B.shadowDarkness = x.shadowDarkness;
			B.shadowBias = x.shadowCascadeBias[u];
			t = x.shadowCascadeNearZ[u];
			x = x.shadowCascadeFarZ[u];
			B = B.pointsFrustum;
			B[0].z = t;
			B[1].z = t;
			B[2].z = t;
			B[3].z = t;
			B[4].z = x;
			B[5].z = x;
			B[6].z = x;
			B[7].z = x;
			G[q] = D;
			q++
		} else G[q] = n,
		q++;
		s = 0;
		for (r = G.length; s < r; s++) {
			n = G[s];
			n.shadowMap || (z = THREE.LinearFilter, b.shadowMapType === THREE.PCFSoftShadowMap && (z = THREE.NearestFilter), n.shadowMap = new THREE.WebGLRenderTarget(n.shadowMapWidth, n.shadowMapHeight, {
				minFilter: z,
				magFilter: z,
				format: THREE.RGBAFormat
			}), n.shadowMapSize = new THREE.Vector2(n.shadowMapWidth, n.shadowMapHeight), n.shadowMatrix = new THREE.Matrix4);
			if (!n.shadowCamera) {
				if (n instanceof THREE.SpotLight) n.shadowCamera = new THREE.PerspectiveCamera(n.shadowCameraFov, n.shadowMapWidth / n.shadowMapHeight, n.shadowCameraNear, n.shadowCameraFar);
				else if (n instanceof THREE.DirectionalLight) n.shadowCamera = new THREE.OrthographicCamera(n.shadowCameraLeft, n.shadowCameraRight, n.shadowCameraTop, n.shadowCameraBottom, n.shadowCameraNear, n.shadowCameraFar);
				else {
					console.error("Unsupported light type for shadow");
					continue
				}
				m.add(n.shadowCamera);
				b.autoUpdateScene && m.updateMatrixWorld()
			}
			n.shadowCameraVisible && !n.cameraHelper && (n.cameraHelper = new THREE.CameraHelper(n.shadowCamera), n.shadowCamera.add(n.cameraHelper));
			if (n.isVirtual && D.originalCamera == p) {
				z = p;
				q = n.shadowCamera;
				t = n.pointsFrustum;
				B = n.pointsWorld;
				i.set(Infinity, Infinity, Infinity);
				k.set( - Infinity, -Infinity, -Infinity);
				for (x = 0; 8 > x; x++) u = B[x],
				u.copy(t[x]),
				THREE.ShadowMapPlugin.__projector.unprojectVector(u, z),
				u.applyMatrix4(q.matrixWorldInverse),
				u.x < i.x && (i.x = u.x),
				u.x > k.x && (k.x = u.x),
				u.y < i.y && (i.y = u.y),
				u.y > k.y && (k.y = u.y),
				u.z < i.z && (i.z = u.z),
				u.z > k.z && (k.z = u.z);
				q.left = i.x;
				q.right = k.x;
				q.top = k.y;
				q.bottom = i.y;
				q.updateProjectionMatrix()
			}
			q = n.shadowMap;
			t = n.shadowMatrix;
			z = n.shadowCamera;
			z.position.getPositionFromMatrix(n.matrixWorld);
			l.getPositionFromMatrix(n.target.matrixWorld);
			z.lookAt(l);
			z.updateMatrixWorld();
			z.matrixWorldInverse.getInverse(z.matrixWorld);
			n.cameraHelper && (n.cameraHelper.visible = n.shadowCameraVisible);
			n.shadowCameraVisible && n.cameraHelper.update();
			t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
			t.multiply(z.projectionMatrix);
			t.multiply(z.matrixWorldInverse);
			h.multiplyMatrices(z.projectionMatrix, z.matrixWorldInverse);
			g.setFromMatrix(h);
			b.setRenderTarget(q);
			b.clear();
			B = m.__webglObjects;
			n = 0;
			for (q = B.length; n < q; n++) if (x = B[n], t = x.object, x.render = !1, t.visible && t.castShadow && (!(t instanceof THREE.Mesh || t instanceof THREE.ParticleSystem) || !t.frustumCulled || g.intersectsObject(t))) t._modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, t.matrixWorld),
			x.render = !0;
			n = 0;
			for (q = B.length; n < q; n++) x = B[n],
			x.render && (t = x.object, x = x.buffer, w = t.material instanceof THREE.MeshFaceMaterial ? t.material.materials[0] : t.material, u = 0 < t.geometry.morphTargets.length && w.morphTargets, w = t instanceof THREE.SkinnedMesh && w.skinning, u = t.customDepthMaterial ? t.customDepthMaterial: w ? u ? f: e: u ? d: c, x instanceof THREE.BufferGeometry ? b.renderBufferDirect(z, m.__lights, null, u, x, t) : b.renderBuffer(z, m.__lights, null, u, x, t));
			B = m.__webglObjectsImmediate;
			n = 0;
			for (q = B.length; n < q; n++) x = B[n],
			t = x.object,
			t.visible && t.castShadow && (t._modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, t.matrixWorld), b.renderImmediateObject(z, m.__lights, null, c, t))
		}
		s = b.getClearColor();
		r = b.getClearAlpha();
		a.clearColor(s.r, s.g, s.b, r);
		a.enable(a.BLEND);
		b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK)
	}
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function() {
	function a(a, b) {
		return a.z !== b.z ? b.z - a.z: b.id - a.id
	}
	var b, c, d, e, f, g, h, i, k, l;
	this.init = function(a) {
		b = a.context;
		c = a;
		d = a.getPrecision();
		e = new Float32Array(16);
		f = new Uint16Array(6);
		a = 0;
		e[a++] = -1;
		e[a++] = -1;
		e[a++] = 0;
		e[a++] = 0;
		e[a++] = 1;
		e[a++] = -1;
		e[a++] = 1;
		e[a++] = 0;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = 1;
		e[a++] = -1;
		e[a++] = 1;
		e[a++] = 0;
		e[a++] = 1;
		a = 0;
		f[a++] = 0;
		f[a++] = 1;
		f[a++] = 2;
		f[a++] = 0;
		f[a++] = 2;
		f[a++] = 3;
		g = b.createBuffer();
		h = b.createBuffer();
		b.bindBuffer(b.ARRAY_BUFFER, g);
		b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
		b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
		b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
		var a = THREE.ShaderSprite.sprite,
		p = b.createProgram(),
		s = b.createShader(b.FRAGMENT_SHADER),
		r = b.createShader(b.VERTEX_SHADER),
		n = "precision " + d + " float;\n";
		b.shaderSource(s, n + a.fragmentShader);
		b.shaderSource(r, n + a.vertexShader);
		b.compileShader(s);
		b.compileShader(r);
		b.attachShader(p, s);
		b.attachShader(p, r);
		b.linkProgram(p);
		i = p;
		k = {};
		l = {};
		k.position = b.getAttribLocation(i, "position");
		k.uv = b.getAttribLocation(i, "uv");
		l.uvOffset = b.getUniformLocation(i, "uvOffset");
		l.uvScale = b.getUniformLocation(i, "uvScale");
		l.rotation = b.getUniformLocation(i, "rotation");
		l.scale = b.getUniformLocation(i, "scale");
		l.alignment = b.getUniformLocation(i, "alignment");
		l.color = b.getUniformLocation(i, "color");
		l.map = b.getUniformLocation(i, "map");
		l.opacity = b.getUniformLocation(i, "opacity");
		l.useScreenCoordinates = b.getUniformLocation(i, "useScreenCoordinates");
		l.sizeAttenuation = b.getUniformLocation(i, "sizeAttenuation");
		l.screenPosition = b.getUniformLocation(i, "screenPosition");
		l.modelViewMatrix = b.getUniformLocation(i, "modelViewMatrix");
		l.projectionMatrix = b.getUniformLocation(i, "projectionMatrix");
		l.fogType = b.getUniformLocation(i, "fogType");
		l.fogDensity = b.getUniformLocation(i, "fogDensity");
		l.fogNear = b.getUniformLocation(i, "fogNear");
		l.fogFar = b.getUniformLocation(i, "fogFar");
		l.fogColor = b.getUniformLocation(i, "fogColor");
		l.alphaTest = b.getUniformLocation(i, "alphaTest")
	};
	this.render = function(d, e, f, r) {
		var n = d.__webglSprites,
		q = n.length;
		if (q) {
			var z = k,
			t = l,
			x = r / f,
			f = 0.5 * f,
			u = 0.5 * r;
			b.useProgram(i);
			b.enableVertexAttribArray(z.position);
			b.enableVertexAttribArray(z.uv);
			b.disable(b.CULL_FACE);
			b.enable(b.BLEND);
			b.bindBuffer(b.ARRAY_BUFFER, g);
			b.vertexAttribPointer(z.position, 2, b.FLOAT, !1, 16, 0);
			b.vertexAttribPointer(z.uv, 2, b.FLOAT, !1, 16, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h);
			b.uniformMatrix4fv(t.projectionMatrix, !1, e.projectionMatrix.elements);
			b.activeTexture(b.TEXTURE0);
			b.uniform1i(t.map, 0);
			var B = z = 0,
			G = d.fog;
			G ? (b.uniform3f(t.fogColor, G.color.r, G.color.g, G.color.b), G instanceof THREE.Fog ? (b.uniform1f(t.fogNear, G.near), b.uniform1f(t.fogFar, G.far), b.uniform1i(t.fogType, 1), B = z = 1) : G instanceof THREE.FogExp2 && (b.uniform1f(t.fogDensity, G.density), b.uniform1i(t.fogType, 2), B = z = 2)) : (b.uniform1i(t.fogType, 0), B = z = 0);
			for (var D, w, I = [], G = 0; G < q; G++) D = n[G],
			w = D.material,
			D.visible && 0 !== w.opacity && (w.useScreenCoordinates ? D.z = -D.position.z: (D._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, D.matrixWorld), D.z = -D._modelViewMatrix.elements[14]));
			n.sort(a);
			for (G = 0; G < q; G++) D = n[G],
			w = D.material,
			D.visible && 0 !== w.opacity && (w.map && w.map.image && w.map.image.width) && (b.uniform1f(t.alphaTest, w.alphaTest), !0 === w.useScreenCoordinates ? (b.uniform1i(t.useScreenCoordinates, 1), b.uniform3f(t.screenPosition, (D.position.x * c.devicePixelRatio - f) / f, (u - D.position.y * c.devicePixelRatio) / u, Math.max(0, Math.min(1, D.position.z))), I[0] = c.devicePixelRatio, I[1] = c.devicePixelRatio) : (b.uniform1i(t.useScreenCoordinates, 0), b.uniform1i(t.sizeAttenuation, w.sizeAttenuation ? 1 : 0), b.uniformMatrix4fv(t.modelViewMatrix, !1, D._modelViewMatrix.elements), I[0] = 1, I[1] = 1), e = d.fog && w.fog ? B: 0, z !== e && (b.uniform1i(t.fogType, e), z = e), e = 1 / (w.scaleByViewport ? r: 1), I[0] *= e * x * D.scale.x, I[1] *= e * D.scale.y, b.uniform2f(t.uvScale, w.uvScale.x, w.uvScale.y), b.uniform2f(t.uvOffset, w.uvOffset.x, w.uvOffset.y), b.uniform2f(t.alignment, w.alignment.x, w.alignment.y), b.uniform1f(t.opacity, w.opacity), b.uniform3f(t.color, w.color.r, w.color.g, w.color.b), b.uniform1f(t.rotation, D.rotation), b.uniform2fv(t.scale, I), c.setBlending(w.blending, w.blendEquation, w.blendSrc, w.blendDst), c.setDepthTest(w.depthTest), c.setDepthWrite(w.depthWrite), c.setTexture(w.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
			b.enable(b.CULL_FACE)
		}
	}
};
THREE.DepthPassPlugin = function() {
	this.enabled = !1;
	this.renderTarget = null;
	var a, b, c, d, e, f, g = new THREE.Frustum,
	h = new THREE.Matrix4;
	this.init = function(g) {
		a = g.context;
		b = g;
		var g = THREE.ShaderLib.depthRGBA,
		h = THREE.UniformsUtils.clone(g.uniforms);
		c = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h
		});
		d = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0
		});
		e = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			skinning: !0
		});
		f = new THREE.ShaderMaterial({
			fragmentShader: g.fragmentShader,
			vertexShader: g.vertexShader,
			uniforms: h,
			morphTargets: !0,
			skinning: !0
		});
		c._shadowPass = !0;
		d._shadowPass = !0;
		e._shadowPass = !0;
		f._shadowPass = !0
	};
	this.render = function(a, b) {
		this.enabled && this.update(a, b)
	};
	this.update = function(i, k) {
		var l, m, p, s, r, n;
		a.clearColor(1, 1, 1, 1);
		a.disable(a.BLEND);
		b.setDepthTest(!0);
		b.autoUpdateScene && i.updateMatrixWorld();
		k.matrixWorldInverse.getInverse(k.matrixWorld);
		h.multiplyMatrices(k.projectionMatrix, k.matrixWorldInverse);
		g.setFromMatrix(h);
		b.setRenderTarget(this.renderTarget);
		b.clear();
		n = i.__webglObjects;
		l = 0;
		for (m = n.length; l < m; l++) if (p = n[l], r = p.object, p.render = !1, r.visible && (!(r instanceof THREE.Mesh || r instanceof THREE.ParticleSystem) || !r.frustumCulled || g.intersectsObject(r))) r._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, r.matrixWorld),
		p.render = !0;
		var q;
		l = 0;
		for (m = n.length; l < m; l++) if (p = n[l], p.render && (r = p.object, p = p.buffer, !(r instanceof THREE.ParticleSystem) || r.customDepthMaterial))(q = r.material instanceof THREE.MeshFaceMaterial ? r.material.materials[0] : r.material) && b.setMaterialFaces(r.material),
		s = 0 < r.geometry.morphTargets.length && q.morphTargets,
		q = r instanceof THREE.SkinnedMesh && q.skinning,
		s = r.customDepthMaterial ? r.customDepthMaterial: q ? s ? f: e: s ? d: c,
		p instanceof THREE.BufferGeometry ? b.renderBufferDirect(k, i.__lights, null, s, p, r) : b.renderBuffer(k, i.__lights, null, s, p, r);
		n = i.__webglObjectsImmediate;
		l = 0;
		for (m = n.length; l < m; l++) p = n[l],
		r = p.object,
		r.visible && (r._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, r.matrixWorld), b.renderImmediateObject(k, i.__lights, null, c, r));
		l = b.getClearColor();
		m = b.getClearAlpha();
		a.clearColor(l.r, l.g, l.b, m);
		a.enable(a.BLEND)
	}
};
THREE.ShaderFlares = {
	lensFlareVertexTexture: {
		vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
		fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
	},
	lensFlare: {
		vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
		fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
	}
};
THREE.ShaderSprite = {
	sprite: {
		vertexShader: "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
		fragmentShader: "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"
	}
};
