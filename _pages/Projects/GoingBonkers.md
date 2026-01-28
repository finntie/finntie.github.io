---
title: "GoingBonkers"
preview_title: "Igknighted"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">


In the last block of my **second** year, I worked on a game called <strong style="color:black;"><u>Going Bonkers!</u></strong>
This was my third team project, with it lasting 8 weeks. <br>
Before joining this team, the game already had some logic to it, and with a plan, we did not have to start fresh. <br>
This made sure that we could work on features immediately. <br>
The game itself was made inside <strong style="color:black;"><u>Unreal Engine</u></strong>. <br>
I myself had a blast working with everyone in my team. <br>
And although we did not have many programmers, we still could deliver everthing we wanted.<br>

A link to the Itch.io page: [Going Bonkers!](https://buas.itch.io/going-bonkers) <br>
Here is the trailer: <br>


<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="80%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/Trailer.mp4" type="video/mp4">
</video>
</div>


Between fixing bugs and helping other peers, I had 2 main projects I worked on this block. <br>
Those were: custom road PCG and extra camera features. <br>

**Custom Road PCG** <br>
I first had to research about PCG inside Unreal Engine, since I had no knowledge of this at all. <br>
After watching some videos and reading a bit of documentation, I quickly had a spline with a mesh up and ready:
<div style="display: flex; justify-content: left; align-items: top; gap: 20px; margin: 0 auto;">
<video width="40%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/RoadPCGPrototype.mp4" type="video/mp4">
</video>
This was easy to control (although UE splines are hard to select) <br>
 and you can make any shapes possible with the mesh following.
</div>

I then needed bridge functionality for in between platforms were water would be.  
This I did using help of line tracers underneath the road segments.  
If the line segments do not hit any platform, they will be marked as bridge.  
With this spline setup, I could also make the **clown car** follow the road.  
The **clown car** was an essential piece of the game where the players had to defend it while it was moving through the city.  
In the video below, the clown car is following the road spline all the way until it reaches back where it started.  
<div style="display: flex; justify-content: left; align-items: top; gap: 20px; margin: 0 auto;">
<video width="60%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/RoadBridgePCGFunctional.mp4" type="video/mp4">
</video>
</div>

I then was handed some better meshes for the bridge instead of some plains and boxes.  
Inside the code I made sure that the bridge segments were correctly ordered, and I had a PCG road with bridge:  
<div style="display: flex; justify-content: left; align-items: top; gap: 20px; margin: 0 auto;">
<video width="60%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/BridgeSupportPCG.mp4" type="video/mp4">
</video>
</div>


**Extra Camera Tools** <br>
To make the camera as easy as possibly to use throughout the making of the game, I created some extra tools.  
This was needed by the designers to improve the time it would take to position the camera at each moment.  

The camera would follow a spline and has to make sure that the car would be in frame, since this was the focus of the game.  
One of the tools I made, was the easy addition of the trigger box.  
With a right click on a spline point, a new window would open where you could configure a trigger box.  
This trigger box would activate when the camera passes over.  
The camera would then perform an action based on the set properties of this trigger box:  
<div style="display: flex; justify-content: left; align-items: top; gap: 20px; margin: 0 auto;">
<video width="80%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/TriggerBoxFunctional0001-0952.mp4" type="video/mp4">
</video>
</div>
In the video, you can beside the bonking, see that after reaching the trigger box, the camera rotates, changes positions and speeds up. <br>

The other tool I want to discuss, was the cinematic zoom.  
To introduce the enemies, we wanted to have a cinematic zoom onto the different enemies and than play an introduction video.  
I thus created a new kind of trigger box, which when triggered, would zoom onto the first enemy of the chosen enemy type.  
This goes with all prefered settings, so that the designers can tweak all little details to make sure it is to their likings.  
A cinematic zoom onto the bowling/rolling enemy would look something like this:  
<div style="display: flex; justify-content: left; align-items: top; gap: 20px; margin: 0 auto;">
<video width="80%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/GoingBonkers/CinematicZoomIntoBowling.mp4" type="video/mp4">
</video>
</div>

**Summary**  
Before starting the block, I joined a team of whom I only knew about 3 to 5 people (from the 20).  
But after an awesome time working together, I met new people, had many laughs, and was able to create a game with my peers of which everyone was proud of.  
I believe the game we made is a very fun game to play, yet it has some flaws here and there, nonetheless I could call this very finished. 