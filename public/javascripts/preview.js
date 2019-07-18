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
    light.intensity = 3.0;

    // Create a built-in "sphere" shape. 
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:6}, scene);

    // Move the sphere upward 1/2 of its height.
    sphere.position.y = 4;

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