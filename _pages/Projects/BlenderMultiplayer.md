---
title: "Blender Multiplayer"
preview_title: "Blender"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">

As part of the networking series, in the third year of my study, I wanted to integrate my networking library into the Blender application. <br>
I found 2 different previous attemps at adding multiplayer to Blender, [Mixer, from Ubisoft](https://ubisoft-mixer.readthedocs.io/en/latest/index.html) this one is currently <strong style="color:black;"><u>outdated</u></strong> and does not work in the latest versions of Blender <br> and [Multi-User](https://gitlab.com/slumber/multi-user), this one is to this date being worked on and should for the most part work.

Yet, both are done via add-ons, I wanted to create my multiplayer via the <strong style="color:black;"><u>source-code</u></strong> directly. 
This created for a fun challenge, not knowing how possible this would be.


### Goal
My goal was: <br>
Being able to connect via <strong style="color:black;"><u>public network</u></strong> to someone else within Blender. <br>
Default actions, these include; <strong style="color:black;"><u>moving, scaling, rotating and placing</u></strong>, should be send over the network and thus works in multiplayer.


### Result
I was able to apply every mechanic I wanted to. <br>
In the video, me and a friend are in a discord call (friend is sharing their screen). <br>
We are connected in Blender and start placing items and move them around. <br>
This is visible on my own screen (below) and on the shared screen of my friend (above).
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/BlenderMultiplayer/PublicNetworkFinal0001-0737.mp4" type="video/mp4">
</video>
</div>


### What I did
I started with no experience in a big coding engine like Blender. <br>
This meant that I had to learn how to work with it from scratch. 

**Learn Engine** <br>
To start, I decided to first make a small task from [Blender's issues](https://projects.blender.org/blender/blender/issues). <br>
These are small issues/tasks that could be fixed by anyone. <br>
I inspired my task based on [Issue 137279](https://projects.blender.org/blender/blender/issues/137279). <br>
My task basically was the ability to <strong style="color:black;"><u>isolate one object</u></strong> by Ctrl+Clicking it. <br>
This was already the case for collections, but not for objects themselves, so this was the perfect task due to having a reference.

After compiling the latest Blender version, and working a few days discovering the engine, I finished the task. <br>
As seen in the video I isolate different objects. 
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/BlenderMultiplayer/IsolatingObjects.mp4" type="video/mp4">
</video>
</div>

**Preparing** <br>
Before working with the Blender engine, I had to prepare my library. <br>
It still had some issues/bugs that needed to be fixed. <br>
The library itself was not at all based on Blender's coding structure. <br>
So, I read through Blender's coding style and applied every part of it to my library. <br>

**Connecting** <br>
To connect the library with the engine, I needed a way to interact with it the library through Blender. <br>
This meant, that it was time to add my own UI. <br>
It seemed easy at first, yet I discovered that I had to learn about Blender's DNA and RNA: <br>
DNA is a low-level system that handles converting **.blend** files. RNA wraps this low-level system in a higher-level, which is easier to access. <br>
RNA was mainly used to wrap DNA, now it is more purposed to handle data like UI or MetaData for Animations. <br>
I use RNA to store and access UI input from user. <br>

Now I could interact with my library and thus establish the first connection:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/BlenderMultiplayer/FirstConnection.mp4" type="video/mp4">
</video>
</div>

**Call for action** <br>
To get different actions across the network, I needed to find out how Blender converts the inputs to actions. <br>
For now I wanted to figure out where the moving of objects gets handled. <br>
I figured that the main loop calls **wm_event_do_notifiers()**, which executes all the notifiers. <br>
It calls the function **ED_region_do_listen()** in area.cc, which then executes all the 'listens'. <br>
A listen can be set by **ARegionType**, one for each region in the blender view. <br>
For my case with the cube, I looked at **space_view3d** which has many listen types. Most interesting: **view3d_main_region_listener()**.

Now to convert this movement into a message. I simply send over which object was making the move and send over the new transform. <br>
This meant that I also send over the rotation and scale. <br>
After unpacking the message and applying the transform to the correct object, I got this:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/BlenderMultiplayer/MoveStandardCube.mp4" type="video/mp4">
</video>
</div>

**Creating Objects** <br>
To create objects, I initially wanted to send over the type of object (from the default objects), and just create those objects. <br>
But why limit by the creation of only the default objects, when I can send over the vertex data and create any shape possible? <br>
So I did. <br>
After a bit of figuring out, I succesfully created a new cube. <br>
Yet, I discovered a problem, sending over the full vertex data of an object can be quite big, and I was not able to send over very big messages over the network. <br>

To fix this problem, I was going to send over the messages in batches. <br>
Meaning that for a big object (message), I would split up this message in multiple parts and send them over one after each other. <br>
One might thinks; "Does package dropping not create for many of the creations to fail?". Which is correct, sometimes a package would not arrive. <br>
The fact that they did not arrive is mainly because I was still using UDP, a bit stupid to do for projects like this. <br>
But I had to do it with UDP due to the time constrained. <br>
And to fix this issue of package dropping, I added a system that would send a message back to confirm this package had arrived, if not, it would try to send again. <br>
Thus the messager would send until it was confirmed that it had arrived. <br>

Here is the result of that, note that editing objects in edit mode does not change the object at all, yet, when duplicated, this object now compares correctly.
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/BlenderMultiplayer/CreatingObjectsFullyWorking.mp4" type="video/mp4">
</video>
</div>

**Final check** <br>
Now that I had the actions I wanted to have for this project, I only needed to be certain that I was able to run this on public network. <br>
It failed a few times, but after fixing some bugs, I had success.
This result is visible in the first video within this post.