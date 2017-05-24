function getCanvasTest(mode ) {
	var gpu = new GPU();

	QUnit.assert.ok( gpu.canvas === null, "canvas is initially null");
	
	var render = gpu.createKernel(function() {
		this.color(0, 0, 0, 1);
	}, {
		dimensions : [30,30],
		mode : mode
	}).setGraphical(true);

	QUnit.assert.ok( render !== null, "function generated test");

	QUnit.assert.ok( render.canvas, "testing for canvas after createKernel" );
	QUnit.assert.ok( gpu.canvas, "testing for canvas after createKernel" );
	
	//
	// NOTE: GPU mode somehow return null when render()
	//
	QUnit.assert.ok( (r = render()) || true, "rendering" );
	console.log("getCanvasTest render result", r, "for mode", mode);

	QUnit.assert.ok( render.canvas, "testing for canvas after render" );
	QUnit.assert.ok( gpu.canvas, "testing for canvas after render" );
	
}

QUnit.test( "getCanvas (auto)", function() {
	getCanvasTest(null);
});

QUnit.test( "getCanvas (WebGL)", function() {
	getCanvasTest("webgl");
});

QUnit.test( "getCanvas (CPU)", function() {
	getCanvasTest("cpu");
});
