---
title: "Pitfall 2D"
preview_title: "Pitfall 2D"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">

### Exercise
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/Pitfall2D/oldGame.png" width="250" style="margin: -10px 20px 0px 0;">
</div>
The exercise was to make our own version of the old game [Pitfall!](https://en.wikipedia.org/wiki/Pitfall!) <br>
This was a 2D platformer from 1982 about someone named Harry who wanted to go treasure hunting in the jungle. <br>

### Starting point
We were given a template to start with. This template was made for 2D pixel games. <br>
Meaning that it was perfect for a game like pitfall. <br>
I myself had little programming knowledge due to being the second project with C++. <br>
But there were enough sources to help me, online and from peers and lecturers.

### What I did
This video shows the gameplay from the final product of 8 weeks work.
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="1000" style="margin: -10px 20px 10px 0;" controls>
<source src="/assets/media/Pitfall2D/GamePlay.mp4" type="video/mp4">
</video>
</div>
<div style="float: right; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="400" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Pitfall2D/LevelScrolling.mp4" type="video/mp4">
</video>
</div>
As seen, there are many features in this game. <br>
The first thing I did was having an **infinite level**, where the scene could go on and on. <br>
Here I even learned that you can move the background instead of moving the player. <br>

<div style="float: left; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="400" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Pitfall2D/Collision.mp4" type="video/mp4">
</video>
</div>
<br><br><br>
I then tried to implement **collision**, which was harder then I thought.<br>
I calculated the collision by checking which tiles my character is currently touching. <br>
I then could check if of of these tiles was a wall or ground and act upon that. <br>
Later I changed this a bit and used different hit boxes for different parts of the player. 
For example a hitbox for the feet that checks the ground and one for each side that will check for walls, etc. <br>
At this point I also started using my first pointers, how exciting that must be. <br>

<div style="float: left; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="400" style="margin: -10px 20px 10px 0;" controls muted>
<source src="/assets/media/Pitfall2D/Rope.mp4" type="video/mp4">
</video>
</div>
A bonus thing we could add, were **ropes using verlet physics**. I was very intrigued in doing this. <br>
So, I added them. It was a bit scuffed at the beginning, but I like how it turned out. <br>
This is done by having the rope consist of many diffent parts; 'dots' I called them. <br>
Using the previous position I could easily calculate the next one. <br>
Then I made sure that the rope is limited by a distance, this is done by calculating the distance for each dot using the pythagoras theorem.
If this distance was too big, I would bring the dot a bit closer to the next dot. <br>

This was not done perfectly at all and the rope could glitch if the velocity is too high. But I was really happy with it at the time.

Next up is the **rewind** feature. This was pretty easy, I just filled an array of 50 positions with the player position. <br>
Every 1 second I would fill 25 positions. When at the last index, I set it back to 0. <br>
When needing to rewind, I would start at the last position I added, and do a full loop. 

Finally I added **pixel perfect** collision for certain items like the balloons and coins. <br>
I could overlap 2 different images and check each pixel, if it was a black pixel, it was empty. <br>
When 2 non-empty pixels overlapped, it was a hit. <br>

### Conclusion
I had fun creating a little game and adding my own touch to it. <br>
Starting this project I had almost no knowledge of C++, this improved a lot during these 8 weeks. <br>
It also helped that I could ask my peers all around me for help, and it was fun seeing what they created. <br>
A great start to the rest of the time I would spend on this study.