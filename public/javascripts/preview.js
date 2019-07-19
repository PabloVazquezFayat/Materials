window.addEventListener('DOMContentLoaded', function() {
  
  var canvas = document.getElementById('renderCanvas');

  if(canvas == null){
    return;
  }

  var engine = new BABYLON.Engine(canvas, true);

  var createScene = function() {

    // Create a basic BJS Scene object.
    var scene = new BABYLON.Scene(engine);

    //Sceene image processing
    scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.02, 1.0);
    scene.imageProcessingConfiguration.contrast = 1.6;
    scene.imageProcessingConfiguration.exposure = 0.6;
    scene.imageProcessingConfiguration.toneMappingEnabled = true;

	  engine.setHardwareScalingLevel(0.5);

    //Create default environemt
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/images/environment.dds", scene);
    hdrTexture.gammaSpace = false;
    
    scene.createDefaultSkybox(hdrTexture, true, 500, 0.3);

    // Parameters: alpha, beta, radius, target position, scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(0, 0, 20));
    camera.lowerRadiusLimit = 10.0;
    camera.upperRadiusLimit = 30.0;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = 1.57; 

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.75;

    var direct = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-1, -2, -1), scene);
    direct.intensity = 2.0;
    direct.position = new BABYLON.Vector3(20, 40, 20);

    // Create a built-in "sphere" shape. 
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:6}, scene);

    // Create Box and cylinder
    var box = BABYLON.MeshBuilder.CreateBox('box', {width: 6, height: 6, depth: 6}, scene);

    // Create cylinder
    var cylinder = BABYLON.MeshBuilder.CreateCylinder("cyl", {diameterTop: 6, diameterBottom: 6, height: 6, tessellation: 18}, scene);

    // Move the sphere upward 1/2 of its height.
    sphere.position.y = 4;
    box.position.y = 4;
    cylinder.position.y = 4;

    // Set camera target
    camera.lockedTarget = sphere;

    // Create a built-in "ground" shape.
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:20, width:20, subdivisions: 2}, scene);
    ground.position.y = 1;

    //Get material urls
    let errorImage = '/images/no-image.jpg';
    let diffuse = document.getElementById('diffuse').src;
    let specular = document.getElementById('specular').src;
    let emissive = document.getElementById('emissive').src;
    let ambient = document.getElementById('ambient').src;
    let opacity = document.getElementById('opacity').src;
    let normal = document.getElementById('normal').src;
    let bump = document.getElementById('bump').src;
    let displace = document.getElementById('displace').src;
    let reflection = document.getElementById('reflection').src;
    let refraction = document.getElementById('refraction').src;


    //Create material
    var previewMaterial = new BABYLON.StandardMaterial('mat', scene);
    previewMaterial.roughness = 0.5;
    previewMaterial.environmentTexture = hdrTexture;

    if(diffuse.includes(errorImage) == false){
      previewMaterial.diffuseTexture = new BABYLON.Texture(diffuse, scene);
    }
    if(specular.includes(errorImage) == false){
      previewMaterial.specularTexture = new BABYLON.Texture(specular, scene);
    }
    if(emissive.includes(errorImage) == false){
      console.log(emissive);
      previewMaterial.emissiveTexture = new BABYLON.Texture(emissive, scene);
    }
    if(ambient.includes(errorImage) == false){
      previewMaterial.ambientTexture = new BABYLON.Texture(ambient, scene);
    }
    if(opacity.includes(errorImage) == false){
      previewMaterial.opacityTexture = new BABYLON.Texture(opacity, scene);
    }
    if(normal.includes(errorImage) == false){
      previewMaterial.bumpTexture = new BABYLON.Texture(normal, scene);
      previewMaterial.invertNormalMapX = true;
      previewMaterial.invertNormalMapY = true
    }else if(bump.includes(errorImage) == false){
      previewMaterial.bumpTexture = new BABYLON.Texture(bump, scene);
      previewMaterial.invertNormalMapX = true;
      previewMaterial.invertNormalMapY = true
    }
    if(reflection.includes(errorImage) == false){
      previewMaterial.reflectionTexture = new BABYLON.Texture(reflection, scene);
    }
    if(refraction.includes(errorImage) == false){
      previewMaterial.refractionTexture = new BABYLON.Texture(refraction, scene);
    }

    sphere.material = previewMaterial;
    ground.material = previewMaterial;
    box.material = previewMaterial;
    cylinder.material = previewMaterial;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, direct);
    shadowGenerator.getShadowMap().renderList.push(sphere);
    shadowGenerator.getShadowMap().renderList.push(box);
    shadowGenerator.getShadowMap().renderList.push(cylinder);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 32;

    ground.receiveShadows = true;

    // Set initial visibility
    box.visibility = 0;
    sphere.visibility = 1;
    cylinder.visibility = 0;

    //get shape buttons
    let cube = document.getElementById('cube');
    let circle = document.getElementById('circle');
    let cylin = document.getElementById('cylinder');

    cube.onclick = ()=>{
      box.visibility = 1;
      sphere.visibility = 0;
      cylinder.visibility = 0;
    }

    circle.onclick = ()=>{
      box.visibility = 0;
      sphere.visibility = 1;
      cylinder.visibility = 0;
    }

    cylin.onclick = ()=>{
      box.visibility = 0;
      sphere.visibility = 0;
      cylinder.visibility = 1;
    }

    // Return the created scene.
    return scene;
  }

  var scene = createScene();

  engine.runRenderLoop(function() {
    scene.render();
  });

  window.addEventListener('resize', function() {
    engine.resize();
  });

});