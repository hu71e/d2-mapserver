CALL javascript-obfuscator ./build/map/generatePNG.js  
CALL javascript-obfuscator ./build/map/drawing/drawWatermark.js 
CALL javascript-obfuscator ./build/map/generateMapImage.js 
cd build/map
del generatePNG.js
rename generatePNG-obfuscated.js generatePNG.js
del generateMapImage.js
rename generateMapImage-obfuscated.js generateMapImage.js
cd drawing
del drawWatermark.js
rename drawWatermark-obfuscated.js drawWatermark.js
cd ..
cd ..
cd ..
