---
title: "Pitfall 3D"
preview_title: "Pitfall 3D"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">

### Exercise
This 8 weeks on school (2024), we had to learn several things. <br>
We were challenged to create a 3D game on the Rasberry Pi with using openGL. <br>
During this time, I had worked with neither of those. So, starting would be pretty difficult. <br>

Before the start of the block, I had already done some research on openGL using the [learnopengl](https://learnopengl.com) website. <br>
But an important note is that we were given 2 possible templates to start with, already including some code for openGL. <br>
There were some problems with the templates, so what I did was start from scratch and implement parts of both templates.

### What I did
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Pitfall3D/firstTriangle.png" width="250" style="margin: -10px 20px 10px 10;">
</div>
Starting in the first week, I had to learn openGL now using code. 
On the right you see my first triangle, which, of course, is shown on the Rasberry Pi

With a nice triangle to start with, I was able to generate nice boxes (just following the great leanopengl tutorial). <br>
I was able to render 10.000 boxes on 18 fps, which is pretty nice knowing it has no optimizations and run on the Pi. <br>

The next step was to load .obj objects from file. I struggled a bit with this, but using help from peers I succeeded in this.
Appearantly the issue was that I did not get the uniform location from my shader. Thanks Sjoerd. <br>

With objects being able to load, I wanted to work on physics. <br>
Luckily we did not have to write a full physics engine for this, but we needed to use [Bullet](https://github.com/bulletphysics/bullet3). <br>
It is a very good physics engine, but was a bit difficult to start using. 

<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Pitfall3D/DebugDrawerWorking.gif" width="250" style="margin: -10px 20px 10px 10;">
</div>
After some time I was able with input to get some interactions working: <br>

Now it was time to generate an infinite path where our player would be running on. <br>
I generated the chunks in front of the player in pretty big batches, that is why you will be seeing some lag-spikes.<br>
But the player runs allong the path forwards, and it is starting to look like a real game.
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Pitfall3D/ChunkGenerationAndLeftRight.gif" width="250" style="margin: -10px 20px 10px 10;">
</div>

The end was not that far away, yet I had still many things left to do. <br>
Such as:
- creating better models for my game.
- Making collectables and being able to pick them up.
- Have chunks generate smoother.
- Make working animations.
- Adding a way to finish the game.
- Have game UI to navigate through the menus.

Creating all models using blender was quite a task, it took away a lot of time which I may could have spent better. 
But, my game is more original which I like. <br>

The collectables were not too hard, mainly getting a different type of collision to work was the issue.

I generated the chunks smoother by making the sections way bigger (Meaning I had to spawn less). <br>
And I also only generate 1 part instead of a whole batch of different platforms. <br>
To account for the fact that you can see the objects being loaded in, I created a shader that curves the far distance. <br>
This made it seem like you were running on a mountain or a very small planet. 

The animations were quite a big problem. <br>
Because, you can not just load in the animation within the obj and it works. <br>
I had to create fuctionality for reading skeletal animation, I combined [this video](https://www.youtube.com/watch?v=f3Cr8Yx3GGA), with [this article](https://learnopengl.com/Guest-Articles/2020/Skeletal-Animation) from learnopengl. <br>
After implementing all the functions, I had to debug a lot, because it was pretty broken. <br>
It costed me much time to get this resolved. The final fix was assimp being the wrong version, this version added 3 lines to the file which would break the animation, removing these lines fixed the issue. <br>

The final thing to do was having a win condition and adding game UI. <br>
This was pretty straight-forward using ImGui. 

### Conclusion
Below is a video containing a full gameplay video of my game. <br>
I was pretty happy with the result I got, but I did not include everything I wanted. <br>
For example, I did not include the whole cave section that I also created. <br>
Besides that, I could have included better lighting. 

<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="/assets/media/Pitfall3D/FullGamePlay.mp4" type="video/mp4">
</video>
</div>