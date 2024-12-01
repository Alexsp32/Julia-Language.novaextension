// Support for colorant"" strings in Julia

// import all the CSS colors
let namedColorStrings = {
	black: "000000",
	silver: "bfbfbf",
	gray: "7f7f7f",
	white: "ffffff",
	maroon: "7f0000",
	red: "ff0000",
	purple: "7f007f",
	fuchsia: "ff00ff",
	green: "007f00",
	lime: "00ff00",
	olive: "7f7f00",
	yellow: "ffff00",
	navy: "00007f",
	blue: "0000ff",
	teal: "007f7f",
	aqua: "00ffff",
	orange: "ffa500",
	aliceblue: "eff7ff",
	antiquewhite: "f9ead6",
	aquamarine: "7fffd3",
	azure: "efffff",
	beige: "f4f4db",
	bisque: "ffe2c4",
	blanchedalmond: "ffeacc",
	blueviolet: "892be2",
	brown: "a52828",
	burlywood: "ddb787",
	cadetblue: "5e9ea0",
	chartreuse: "7fff00",
	chocolate: "d1681e",
	coral: "ff7f4f",
	cornflowerblue: "6393ed",
	cornsilk: "fff7db",
	crimson: "db143d",
	cyan: "00ffff",
	darkblue: "00008c",
	darkcyan: "008c8c",
	darkgoldenrod: "b7870a",
	darkgray: "a8a8a8",
	darkgreen: "006300",
	darkgrey: "a8a8a8",
	darkkhaki: "bcb76b",
	darkmagenta: "8c008c",
	darkolivegreen: "546b2d",
	darkorange: "ff8c00",
	darkorchid: "9933cc",
	darkred: "8c0000",
	darksalmon: "e8967a",
	darkseagreen: "8ebc8e",
	darkslateblue: "473d8c",
	darkslategray: "2d4f4f",
	darkslategrey: "2d4f4f",
	darkturquoise: "00ced1",
	darkviolet: "9300d3",
	deeppink: "ff1493",
	deepskyblue: "00bfff",
	dimgray: "686868",
	dimgrey: "686868",
	dodgerblue: "1e8eff",
	firebrick: "b22121",
	floralwhite: "fff9ef",
	forestgreen: "218c21",
	gainsboro: "dbdbdb",
	ghostwhite: "f7f7ff",
	gold: "ffd600",
	goldenrod: "d8a521",
	greenyellow: "adff2d",
	grey: "7f7f7f",
	honeydew: "efffef",
	hotpink: "ff68b5",
	indianred: "cc5b5b",
	indigo: "490082",
	ivory: "ffffef",
	khaki: "efe58c",
	lavender: "e5e5f9",
	lavenderblush: "ffeff4",
	lawngreen: "7cfc00",
	lemonchiffon: "fff9cc",
	lightblue: "add8e5",
	lightcoral: "ef7f7f",
	lightcyan: "e0ffff",
	lightgoldenrodyellow: "f9f9d1",
	lightgray: "d3d3d3",
	lightgreen: "8eed8e",
	lightgrey: "d3d3d3",
	lightpink: "ffb5c1",
	lightsalmon: "ffa07a",
	lightseagreen: "21b2aa",
	lightskyblue: "87cef9",
	lightslategray: "778799",
	lightslategrey: "778799",
	lightsteelblue: "afc4dd",
	lightyellow: "ffffe0",
	limegreen: "33cc33",
	linen: "f9efe5",
	magenta: "ff00ff",
	mediumaquamarine: "66ccaa",
	mediumblue: "0000cc",
	mediumorchid: "ba54d3",
	mediumpurple: "9370db",
	mediumseagreen: "3db270",
	mediumslateblue: "7a68ed",
	mediumspringgreen: "00f999",
	mediumturquoise: "47d1cc",
	mediumvioletred: "c61484",
	midnightblue: "191970",
	mintcream: "f4fff9",
	mistyrose: "ffe2e0",
	moccasin: "ffe2b5",
	navajowhite: "ffddad",
	oldlace: "fcf4e5",
	olivedrab: "6b8e23",
	orangered: "ff4400",
	orchid: "d870d6",
	palegoldenrod: "ede8aa",
	palegreen: "99f999",
	paleturquoise: "afeded",
	palevioletred: "db7093",
	papayawhip: "ffefd6",
	peachpuff: "ffd8ba",
	peru: "cc843f",
	pink: "ffbfcc",
	plum: "dda0dd",
	powderblue: "afe0e5",
	rosybrown: "bc8e8e",
	royalblue: "3f68e0",
	saddlebrown: "8c4411",
	salmon: "f97f72",
	sandybrown: "f4a360",
	seagreen: "2d8c56",
	seashell: "fff4ed",
	sienna: "a0512d",
	skyblue: "87ceea",
	slateblue: "6b59cc",
	slategray: "707f8e",
	slategrey: "707f8e",
	snow: "fff9f9",
	springgreen: "00ff7f",
	steelblue: "4482b5",
	tan: "d1b58c",
	thistle: "d8bfd8",
	tomato: "ff6347",
	turquoise: "3fe0d1",
	violet: "ed82ed",
	wheat: "f4ddb2",
	whitesmoke: "f4f4f4",
	yellowgreen: "99cc33",
	rebeccapurple: "663399"
};

// Color provider
class JuliaColorAssistant {
	constructor() {
		this.namedColorRegex = new RegExp("colorant\"([\\w].*)\"")
		this.hexRegex = new RegExp("colorant\"(#[a-fA-F0-9]{6})\"", "i");
		this.hexShortRegex = new RegExp("colorant\"(#[a-fA-F0-9]{3})\"", "i");
		this.rgbRegex = new RegExp("colorant\"rgb\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*\\)\"", "i")
		//this.rbgaRegex = new RegExp("colorant\"rgba\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-1]*\\.\?[0-9]\+)\\s*\\)\"", "i");
		//this.rgbPercentageRegex
		//this.hslRegex
		//this.hslaRegex
		// Named colors
		let namedColors = {};
		let keys = Object.keys(namedColorStrings);
		for (let key of keys) {
			let string = namedColorStrings[key];
			
			let red = parseInt(string.substring(0, 2), 16) / 255.0;
			let green = parseInt(string.substring(2, 4), 16) / 255.0;
			let blue = parseInt(string.substring(4, 6), 16) / 255.0;
			
			let color = Color.rgb(red, green, blue, 1.0);
			namedColors[key] = color;
		}
		this.namedColors = namedColors;
	}
	
	provideColors(textEditor, context) {
		let regexes = [
			//this.hexaRegex,
			this.hexRegex,
			//this.hexaShortRegex
			this.hexShortRegex,
			this.rgbaRegex,
			this.rgbRegex,
			//this.hslaRegex,
			//this.hslRegex,
		];
		
		let colors = [];
		
		let candidates = context.candidates;
		for (let candidate of candidates) {
			let named_color_match = candidate.text.match(this.namedColorRegex)
			let string = candidate.text;
			let range = candidate.range;
			if (named_color_match!==null){
				let namedColor = this.namedColors[named_color_match[1]];
				if (namedColor) {
					// Named color
					let infoRange = new Range(range.start, range.start + string.length);
					let colorInfo = new ColorInformation(infoRange, namedColor, "named");
					colors.push(colorInfo);
					continue
				}
			}
			for (let regex of regexes) {
				let match = string.match(regex);
				if (match) {
					let color = this.parseColorMatch(match, regex, range);
					if (color) {
						colors.push(color);
						continue;
					}
				}
			}
		}
		return colors;
	}
	
	parseColorMatch(match, regex, range) {
		// Parses a CSS color string into an color object
		let position = range.start + match.index;
		let matchStr = match[0];
		if (regex == this.hexRegex) {
			let red = parseInt(match[1].substring(1, 3), 16);
			let green = parseInt(match[1].substring(3, 5), 16);
			let blue = parseInt(match[1].substring(5, 7), 16);
			
			red = (red / 255.0);
			green = (green / 255.0);
			blue = (blue / 255.0);
			
			let color = Color.rgb(red, green, blue, 1.0);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "hex");
			info.format = ColorFormat.rgb;
			return info;
		}
		else if (regex == this.hexShortRegex) {
			let redStr = match[1].substring(1, 2);
			let greenStr = match[1].substring(2, 3);
			let blueStr = match[1].substring(3, 4);
			
			let red = parseInt(redStr + redStr, 16);
			let green = parseInt(greenStr + greenStr, 16);
			let blue = parseInt(blueStr + blueStr, 16);
			
			red = (red / 255.0);
			green = (green / 255.0);
			blue = (blue / 255.0);
			
			let color = Color.rgb(red, green, blue, 1.0);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "hexs");
			info.format = ColorFormat.rgb;
			return info;
		}/*
		else if (regex == this.rgbaRegex) {
			let red = parseInt(match[1]);
			let green = parseInt(match[2]);
			let blue = parseInt(match[3]);
			let alpha = parseFloat(match[4]);
			
			red = red / 255.0;
			green = green / 255.0;
			blue = blue / 255.0;
			
			let color = Color.rgb(red, green, blue, alpha);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "rgba");
			info.format = ColorFormat.rgb;
			return info;
		}*/
		else if (regex == this.rgbRegex) {
			let red = parseInt(match[1]);
			let green = parseInt(match[2]);
			let blue = parseInt(match[3]);
			
			red = red / 255.0;
			green = green / 255.0;
			blue = blue / 255.0;
			
			let color = Color.rgb(red, green, blue, 1.0);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "rgb");
			info.format = ColorFormat.rgb;
			return info;
		}/*
		else if (regex == this.hslaRegex) {
			let hue = parseInt(match[1]);
			let sat = parseFloat(match[2]);
			let lum = parseFloat(match[3]);
			let alpha = parseFloat(match[4]);
			
			hue = hue / 360.0;
			sat = sat / 100.0;
			lum = lum / 100.0;
			
			let color = Color.hsl(hue, sat, lum, alpha);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "hsla");
			info.format = ColorFormat.hsl;
			return info;
		}
		else if (regex == this.hslRegex) {
			let hue = parseInt(match[1]);
			let sat = parseFloat(match[2]);
			let lum = parseFloat(match[3]);
			
			hue = hue / 360.0;
			sat = sat / 100.0;
			lum = lum / 100.0;
			
			let color = Color.hsl(hue, sat, lum, 1.0);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "hsl");
			info.format = ColorFormat.hsl;
			return info;
		}
		else if (regex == this.srgbRegex) {
			let red = parseFloat(match[1]);
			let green = parseFloat(match[2]);
			let blue = parseFloat(match[3]);
			
			let color = Color.rgb(red, green, blue);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "srgb");
			info.format = ColorFormat.rgb;
			info.usesFloats = true;
			return info;
		}
		else if (regex == this.srgbaRegex) {
			let red = parseFloat(match[1]);
			let green = parseFloat(match[2]);
			let blue = parseFloat(match[3]);
			let alpha = parseFloat(match[4]);
			
			let color = Color.rgb(red, green, blue, alpha);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "srgba");
			info.format = ColorFormat.rgb;
			info.usesFloats = true;
			return info;
		}
		else if (regex == this.displayP3Regex) {
			let red = parseFloat(match[1]);
			let green = parseFloat(match[2]);
			let blue = parseFloat(match[3]);
			
			let color = Color.displayP3(red, green, blue);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "p3");
			info.format = ColorFormat.displayP3;
			info.usesFloats = true;
			return info;
		}
		else if (regex == this.displayP3ARegex) {
			let red = parseFloat(match[1]);
			let green = parseFloat(match[2]);
			let blue = parseFloat(match[3]);
			let alpha = parseFloat(match[4]);
			
			let color = Color.displayP3(red, green, blue, alpha);
			let range = new Range(position, position + matchStr.length);
			let info = new ColorInformation(range, color, "p3a");
			info.format = ColorFormat.displayP3;
			info.usesFloats = true;
			return info;
		}
		*/
		return null;
	}
	
	provideColorPresentations(color, context) {
		// Converts a color object into an array of color presentations
		let format = color.format;
		let presentations = []
		
		if (format == ColorFormat.displayP3) {
			// Display P3
			let components = color.components;
			
			// Ensure a certain amount of rounding precision, to prevent very small exponent floats
			let red = Math.round(components[0] * 1000.0) / 1000.0;
			let green = Math.round(components[1] * 1000.0) / 1000.0;
			let blue = Math.round(components[2] * 1000.0) / 1000.0;
			let alpha = Math.round(components[3] * 1000.0) / 1000.0;
			
			// color(display-p3 r g b)
			if (alpha == 1.0) {
				let string = 'color(display-p3 ' + red.toString() + ' ' + green.toString() + ' ' + blue.toString() + ')';
				
				let presentation = new ColorPresentation(string, "p3");
				presentation.format = ColorFormat.displayP3;
				presentation.usesFloats = true;
				presentations.push(presentation);
			}
			
			// color(display-p3 r g b / a)
			{
				let string = 'color(display-p3 ' + red.toString() + ' ' + green.toString() + ' ' + blue.toString() + ' / ' + alpha.toString() + ')';
				
				let presentation = new ColorPresentation(string, "p3a");
				presentation.format = ColorFormat.displayP3;
				presentation.usesFloats = true;
				presentations.push(presentation);
			}
		}
		else {
			// RGB
			{
				let rgbColor = color.convert(ColorFormat.rgb);
				let components = rgbColor.components;
				
				let red = Math.round(components[0] * 1000.0) / 1000.0;
				let green = Math.round(components[1] * 1000.0) / 1000.0;
				let blue = Math.round(components[2] * 1000.0) / 1000.0;
				let alpha = Math.round(components[3] * 1000.0) / 1000.0;
				
				red = red * 255.0;
				green = green * 255.0;
				blue = blue * 255.0;
				
				// rgb()
				if (alpha == 1.0) {
					let string = 'colorant"rgb(' + red.toFixed() + ', ' + green.toFixed() + ', ' + blue.toFixed() + ')"';
					
					let presentation = new ColorPresentation(string, "rgb");
					presentation.format = ColorFormat.rgb;
					presentations.push(presentation);
				}
				
				// rgba()
				{
					let string = 'colorant"rgba(' + red.toFixed() + ', ' + green.toFixed() + ', ' + blue.toFixed() + ', ' + alpha.toString() + ')"';
					
					let presentation = new ColorPresentation(string, "rgba");
					presentation.format = ColorFormat.rgb;
					presentations.push(presentation);
				}
			}
			
			// HSL
			{
				let hslColor = color.convert(ColorFormat.hsl);
				let components = hslColor.components;
				
				let hue = Math.round(components[0] * 1000.0) / 1000.0;
				let sat = Math.round(components[1] * 1000.0) / 1000.0;
				let lum = Math.round(components[2] * 1000.0) / 1000.0;
				let alpha = Math.round(components[3] * 1000.0) / 1000.0;
				
				hue = hue * 360.0;
				sat = sat * 100.0;
				lum = lum * 100.0;
				
				// hsl()
				if (alpha == 1.0) {
					let string = 'colorant"hsl(' + hue.toFixed() + ', ' + sat.toFixed() + '%, ' + lum.toFixed() + '%)"';
					
					let presentation = new ColorPresentation(string, "hsl");
					presentation.format = ColorFormat.hsl;
					presentations.push(presentation);
				}
				
				// hsla()
				{
					let string = 'colorant"hsla(' + hue.toFixed() + ', ' + sat.toFixed() + '%, ' + lum.toFixed() + '%, ' + alpha.toString() + ')"';
					
					let presentation = new ColorPresentation(string, "hsla");
					presentation.format = ColorFormat.hsl;
					presentations.push(presentation);
				}
			}
			
			// Hex
			{
				let rgbColor = color.convert(ColorFormat.rgb);
				let components = rgbColor.components;
				
				let red = components[0];
				let green = components[1];
				let blue = components[2];
				let alpha = components[3];
				
				red = red * 255.0;
				green = green * 255.0;
				blue = blue * 255.0;
				
				let redHex = Math.floor(red).toString(16);
				if (redHex.length == 1) {
					redHex = '0' + redHex;
				}
				let greenHex = Math.floor(green).toString(16);
				if (greenHex.length == 1) {
					greenHex = '0' + greenHex;
				}
				let blueHex = Math.floor(blue).toString(16);
				if (blueHex.length == 1) {
					blueHex = '0' + blueHex;
				}
				
				if (alpha == 1.0) {
					// Short form
					{
						let string = 'colorant"#' + redHex.charAt(0) + greenHex.charAt(0) + blueHex.charAt(0) + '"';
						
						let presentation = new ColorPresentation(string, "hexs");
						presentation.format = ColorFormat.rgb;
						presentations.push(presentation);
					}
					
					// Long form
					{
						let string = 'colorant"#' + redHex + greenHex + blueHex + '"';
						
						let presentation = new ColorPresentation(string, "hex");
						presentation.format = ColorFormat.rgb;
						presentations.push(presentation);
					}
				}
				
				alpha = alpha * 255.0;
				
				let alphaHex = Math.floor(alpha).toString(16);
				if (alphaHex.length == 1) {
					alphaHex = '0' + alphaHex;
				}
				
				// Short form
				{
					let string = 'colorant"' + '#' + redHex.charAt(0) + greenHex.charAt(0) + blueHex.charAt(0) + alphaHex.charAt(0) + '"';
					
					let presentation = new ColorPresentation(string, "hexas");
					presentation.format = ColorFormat.rgb;
					presentations.push(presentation);
				}
				
				// Long form
				{
					let string = 'colorant"' + '#' + redHex + greenHex + blueHex + alphaHex + '"';
					
					let presentation = new ColorPresentation(string, "hexa");
					presentation.format = ColorFormat.rgb;
					presentations.push(presentation);
				}
			}
			
			// color()
			{
				let rgbColor = color.convert(ColorFormat.rgb);
				let components = rgbColor.components;
				
				// Ensure a certain amount of rounding precision, to prevent very small exponent floats
				let red = Math.round(components[0] * 1000.0) / 1000.0;
				let green = Math.round(components[1] * 1000.0) / 1000.0;
				let blue = Math.round(components[2] * 1000.0) / 1000.0;
				let alpha = Math.round(components[3] * 1000.0) / 1000.0;
				
				// color(srgb r g b)
				if (alpha == 1.0) {
					let string =  'colorant"' + 'color(srgb ' + red.toString() + ' ' + green.toString() + ' ' + blue.toString() + ')"';
					
					let presentation = new ColorPresentation(string, "srgb");
					presentation.format = ColorFormat.rgb;
					presentation.usesFloats = true;
					presentations.push(presentation);
				}
				
				// color(srgb r g b / a)
				{
					let string = 'colorant"color(srgb ' + red.toString() + ' ' + green.toString() + ' ' + blue.toString() + ' / ' + alpha.toString() + ')"';
					
					let presentation = new ColorPresentation(string, "srgba");
					presentation.format = ColorFormat.rgb;
					presentation.usesFloats = true;
					presentations.push(presentation);
				}
			}
		}
		
		return presentations;
	}
}

module.exports = new JuliaColorAssistant();
