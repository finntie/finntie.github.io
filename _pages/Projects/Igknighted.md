---
title: "Igknighted"
preview_title: "Igknighted"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">

**Igknighted** was the first project where I was working in a team. <br>
This team consisted of three different disciplines: **Design & Production**, **Visual Artists** and **Programmers**. <br>
Every discipline had their own part of the project to work on. <br>
This was the first time I worked with <strong style="color:black;"><u>Unreal Engine</u></strong>, so there was a lot I needed to research about it. <br>
During this project I mainly worked on the <strong style="color:black;"><u>enemies</u></strong> and the <strong style="color:black;"><u>fog system</u></strong>. <br>
**[Here is the Itch.io game page](https://buas.itch.io/igknighted)**, this includes the game itself, a trailer and some screenshots.

**Enemies** <br>
To start working on the enemies, I had to know about how to use AI in UE. <br>
For this I watched multiple tutorials, [including this one](https://www.youtube.com/watch?v=iY1jnFvHgbE). <br>

Afterwards I started working on the AI, already including it into the level and tweaking values to make the AI work as intented. <br>
I got to the point where the enemy moved smoothly towards the closest player, which is exactly what we wanted:
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Igknighted/EnemyFollowsPlayer.gif" width="70%" style="margin: -10px 20px 10px 10;">
</div>

**Fog** <br>
Now that I finished the enemy, I started working on the fog. <br>
Possibly for the future I could add a blog post going more in depth of what i did. <br>

The final plan was: <br>
**I set myself the challenge to create fog in unreal engine using post processing. I wanted to be able to have fog in certain areas I set it to, and make it move after an event occurred.**

In the beginning I did research on fog in other games/scenes to get an idea of how we want it to look, and after feedback from the team, I had vision of how it should look like. <br>
Of course I needed to do a little research on how I even implement anything like fog into the game. <br>
I quickly already had fog implemented:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Igknighted/Fog1.png" width="30%" style="margin: -10px 20px 10px 0px;">
</div> 

Very simple fog that decreases with height. <br>
After I added a texture and made the texture move in one direction, I got this result:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="80%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Igknighted/FogBeginning.mp4" type="video/mp4">
</video>
</div>

Then I researched passing variables from blueprint to post-process material. <br>
I thought the solution would be to create a dynamic material instance. But as it turned out, the solution was using a material parameter collection. <br>
Here I can store global variables. I can only add the variables manually and I can only choose between a 4D vector or a scalar value. 

**Areas Of Fog** <br>
The most difficult part was to only have certain parts that contain the fog. <br>
With some simple math, I could get parts of the fog to render/not render, but this was only for one side of a location:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Igknighted/Fog2.png" width="30%" style="margin: -10px 20px 10px 0px;">
</div> 

So, I did a bit more thinking about the math and came up with some better ideas which I then implemented.
Afterwards I also made it possible to create multiple instances of fog areas. Creating for:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Igknighted/Fog3.png" width="30%" style="margin: -10px 20px 10px 0px;">
</div> 


**Looks** <br>
Now, this looks very bad, super squared and nothing like fog at all, so I had to make some fall-off:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="80%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Igknighted/FogAreasWithFallOff.mp4" type="video/mp4">
</video>
</div>

I also added some colouring to the fog areas, and made the colours able to overlap and mix correctly. <br>
I then added support for multiple texture, so you can choose which one is preferred.

**Result** <br>
And to show the result:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="100%" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Igknighted/FogShowCaseVideoFinal0001-2731.mp4" type="video/mp4">
</video>
</div>


**Team and Conclusion** <br>
Working in this team was very fun, it was great being able to talk you ideas through other people, having their opinion on it and possibly making the idea even better. <br>
The support from my fellow programmers was great, always able to help me out when needed. <br>
Working together in a team like this is definitely something I would do again. <br>
And I am very proud of how the game turned out to be, also very fun to play. <br>