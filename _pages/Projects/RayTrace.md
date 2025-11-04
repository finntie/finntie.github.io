---
title: "RayTrace"
preview_title: "RayTrace"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">

### Exercise
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/angleOfIncedence.gif" width="250" style="margin: -10px 20px 10px 10;">
</div>
In the third block of my first year (2024), we were exercised to expand upon a voxel ray tracer.  <br>
The starting point was a template which traces already a cluster of voxels. 
On the right you can see this starting point, but I already added angle of incedence to it.

We had to add more functionality to this renderer, such as including more features like different light types and more different materials and 
optimizing the renderer to make sure it runs fast enough.


### What I did
Starting off, I wanted to add different types of light. 
These included:
- Directional Light
- Spotlight
- Area Light

Of course the easiest was the directional light, this was just tracing the ray towards the voxel,
then checking if the direction of the normal of that voxel is about the opposite of the direction of the light. <br>
Meaning the normal should face the light. 
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/AreaLight.gif" width="250" style="margin: -10px 20px 10px 10;">
</div>
The spotlight was a bit harder, because now I had to trace the ray after it bounced. <br>
I had to know if the direction of this 'bounced' ray would be within the range of spotlight's direction.

The area light was also easy because it was kind of like the spotlight, but I had to account for the distance that the rays travelled. <br>
The gif shows the area light stuck to the camera.

For the directional light I later added the angle of incedence which now also included the differences between the light and normal.

**Reflections** <br>
<div style="float: left; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Reflection.png" width="250" style="margin: -10px 20px 10px 10px;">
</div>
Then it was time for the reflections. <br>
This was basically following the bounced ray and when it hit something, it would simulate the color of what it hit. <br>
Having all voxels reflect each other was a bit hard to see, so I had to add a skybox. <br>
Now my bounced rays could grab the color from the skybox. 

There is a lot of blackness in the screenshot within the structure, 
this is from bounced rays hitting another 'mirror', to prevent infinite bouncing. 
<br><br>

<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/BuildReflect.png" width="400" style="margin: -10px 20px 10px 10px;">
</div>

**Building** <br>
Then I added a feature, so that I could build with my voxels, making testing easier and having more freedom creating images.
Now I could make images like this:

It is hard to see, but on the far end there is a big wall acting as a mirror, reflecting different colored pieces.
<br><br><br><br>

<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Pixelated.png" width="150" style="margin: -10px 20px 10px 10px;">
</div>

**Anti-Aliasing** <br>
When we zoom into a cube, we can see that it is pretty pixelated. <br>
This does not look very good, because we are making a smooth renderer, not a pixel shader.

So, how do we fix this? <br>
When we render an image for our screen, we are actually shooting rays from our camera towards the object. <br>
A plane just in front of the camera position is calculated, this will be our screen that we use to determine the direction of the outgoing rays. <br>
So, we are comparing a pixel on our device screen to the position of the camera. This way we will get a direction for our ray. <br>

But, what has this to do with anti-aliasing? <br>
Well, we are converting a pixel on the screen to a direction of a ray. <br>
But, we will never hit every part of an object, thus we only get 1 color of the region the size of that one pixel. <br>
To account for this issue, we shoot (for example) 4 rays in 1 pixel, but randomize the offset a bit. <br>
With these 4 rays, we just grab the average, making our pixel more smooth. <br>

One issue would be that shooting 4 rays randomly in one pixel could possibly lead to all rays choosing the same direction. <br>
To prevent this, we assign every ray its own sqaure in which it can randomly choose its direction. <br>

Basically, we are splitting up one pixel of our screen to 4 regions and grabbing the average. <br>
<div style="float: left; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Anti-Aliasing.png" width="150" style="margin: -10px 20px 10px 0px;">
</div> <br><br>
Now, the cube looks way smoother, especially on higher resolution.
<br><br><br><br><br>

**Depth Of Field** <br>
Depth of field could make a scene much more realistic, since only one point will be in focus, while the rest is very blurry. <br>
A very nice explanation for this would be from [This Page](https://pathtracing.home.blog/depth-of-field). <br>
With that, I do not have to explain much, so here is one of the results instead:
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Thumbnail.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 

**Textures** <br>
I also added textures to the voxels, so when a ray intersects with a voxel, it checks the coordinates of where on the voxel it hit, 
then based on the U and V, it grabs a simular position from the texture.
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Textured.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 

**Glass** <br>
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/GlassTextured.png" width="250px" style="margin: -10px 20px 10px 0px;">
</div> 
Now, let us make the voxels transparent. <br>
This is very simple, we hit the voxel with a ray, then we create a new ray which goes through the glass voxels and searches the first next non-glass voxel. <br>
I gave the glass voxels a nice texture, so that you know there is a glass voxel.

<div style="float: left; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/GlassReflection.png" width="250px" style="margin: -10px 20px 10px 0px;">
</div> 
And why not give the glass a reflection? <br>
Simply, also add the bounced ray, and now add both the reflection and transparancy together and average it. <br>
<br><br><br><br><br><br>


**Snell and Beer's law**<br>
Now, it is not fully realistic to just send a ray straight through glass. <br>
If you ever looked through a glass filled with water, you notice that the light bends. <br>
This is due to light needing more time to travel through different materials. <br>

To simulate for this, we just need to apply an extra direction to the rays that go through glass. <br>

<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/BeerLaw.png" width="250px" style="margin: -10px 20px 10px 0px;">
</div> 

Beer's law is that not all light passes through the material, but some light gets absorbed by it. <br>
This causes light to not being able to pass through an infinite length of that material. <br>

We account for this by grabbing the length of the ray that passes through the glass, then summing up the color of the glass based on the transparancy. <br>

With this, I could now also simulate voxel clouds! <br>
Well, kind of. Here is my take on it:

<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="/assets/media/RayTrace/Clouds.mp4" type="video/mp4">
</video>
</div>
Pretty satisfying if I saw myself.

<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Spheres.png" width="250px" style="margin: -10px 20px 10px 0px;">
</div> 

**Spheres** <br>
In the meantime, I also simulated spheres. <br>
Tracing spheres is actually easier then voxels, we just pick a point. <br>
Then we set a radius around this point, and if a ray every gets within the radius of this sphere, we return the color of the sphere.<br>

Then, by grabbing the point it hit and the point of the circle, we can get a direction, or better yet, the normal. <br>
With this normal, we can now also create bounce rays and thus create a reflection on the circle.

**BVH** <br>
One, if not the best performance increase for ray tracing would be creating a BVH (Bounding Volume Hierarchy). <br>
But what is it? <br>
When we want to render an object, we shoot a ray, and for every object in the scene, we need to check if it is in the way of the ray. <br>
For all objects that are in the way of this ray, we need to only check the closest object and hit this one. <br>
This could be really expensive with multiple objects in the scene. <br>
Especially with needing to shoot 1024x640 rays. <br>

Luckily we had a great lecturer, just for this subject: Jacco Bikker. <br>
He also has great [blogs](https://jacco.ompf2.com) on this subject.

We can group together multiple objects that are close to each other and give this group their own big bounding box. This way, we only have to check if we intersected with this bounding box, instead of all other smaller objects. <br>
Every 2 objects should have 1 bounding box, and every 2 bounding boxes should have also one bigger bounding box. <br>
This improves performance by a lot. Here I showcase a quick test with many different voxels:
<table style="width: 100%; border-collapse: collapse; text-align: center;">
  <tr>
    <td style="padding: 20px; border: 1px solid #ddd;">
    <p>Without BVH <br>100 Voxels <br>28.3 fps</p>
      <img src="/assets/media/RayTrace/NoBVHFew.png" alt="Image 1" style="width: 100%; object-fit: cover; border-radius: 5px;">
    </td>
    <td style="padding: 20px; border: 1px solid #ddd;">
    <p>Without BVH <br>1000 Voxels <br>3.6 fps</p>
      <img src="/assets/media/RayTrace/NoBVHMany.png" alt="Image 2" style="width: 100%; object-fit: cover; border-radius: 5px;">
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; border: 1px solid #ddd;">
    <p>With BVH <br>100 Voxels <br>111.5 fps</p>
      <img src="/assets/media/RayTrace/BVHFew.png" alt="Image 3" style="width: 100%; object-fit: cover; border-radius: 5px;">
    </td>
    <td style="padding: 20px; border: 1px solid #ddd;">
    <p>With BVH <br>1000 Voxels <br>82.0 fps</p>
      <img src="/assets/media/RayTrace/BVHMany.png" alt="Image 4" style="width: 100%; object-fit: cover; border-radius: 5px;">
    </td>
  </tr>
</table>
Adding the BVH makes a huge difference with objects spaced out like this.


**Game** <br>
In the end I also had to make a game with this ray traces. <br>
I decided to go for a game where you need to create a safe path for a vampire towards a house. <br>
You do this by placing objects in front of the path, blocking the sunlight from reaching the vampire. <br>
Here is the final showcase of the game:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="/assets/media/RayTrace/Game.mp4" type="video/mp4">
</video>
</div>


### Conclusion
I had a blast this block working with a ray tracer. <br>
It is really fun, because your work pays off in how it looks. Creating stunning pictures. Also, optimizing was very interesting to do, making sure every little part of code is running as fast as possible.

The only regret I have, is that I did not take nearly enough screenshots, but below are some that I did not show yet.

<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Extra1.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Extra2.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Extra3.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Extra4.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/RayTrace/Extra5.png" width="100%" style="margin: -10px 20px 10px 0px;">
</div> 