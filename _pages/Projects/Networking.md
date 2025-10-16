---
title: "Networking library"
preview_title: "Networking"
section: "Projects"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">


**In the second year of my study, I wanted to learn how multiplayer works.** <br>
**I had no idea how this worked and was intrigued in this subject.** <br>
**So, for my self-study project for that block of the year (8 weeks), I choose to make my own networking library.**

### Starting Point
This started very rough, since I had no knowledge of networking. I did not know what IPs were, what the difference is between UDP and TCP and more. <br>
Meaning, I had to do lots of research to get started. Luckily, there are some good sources on this subject. 

Within the span of 8 weeks, I had to create this library, but also make a reference game to show that it works. <br>
I initially wanted to make a crowd control simulator with your friend, but changed ideas and went for a strategy game. <br>
More on the games I made with this later.

### Challenges
**Public Connection** <br>
The biggest challenge was getting public connections to work. <br>
After researching about this, I decided to try and connect without a server, meaning a peer to peer connection. <br>
But, this makes it harder to establish a connection. There are multiple ways to do it, but I went with hole punching. <br>
It seemed like the easiest way for both me as programmer and also for the user. <br>
After certain fails, and figuring out that the school's network is way more secure, I got the public connection to work.

**Debugging** <br>
Many errors were encountered in the making of this project, and those had to be solved. <br>
After some time I noticed that debugging with 2 different programs is almost 2 times as hard. <br>
You have to look both on the sending and the receiving end of the program, which makes it difficult.

### Games
I made some unfinished games with this library.

**Pong** <br>
I quickly made a small pong game, which is nothing out of the ordinary:
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="1000" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/PongGame.mp4" type="video/mp4">
</video>
</div>

**Stategy** <br>
During the 8 weeks I made this strategy game to showcase the possibilities of my library. 
The game is about conquering bases of other players.  <br>
I also learned some things while making this game, for example stencil shading and a lot about ImGui. <br>
In this video I play as one player (green), while on my other screen I also play as player 2 (red).
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="1000" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/StategyNetworkGame.mp4" type="video/mp4">
</video>
</div>

**2D shooter**
In my free time I also made a 2D shooter using this library.
This was further in the production, yet, still not finished. <br>
For this game I used box2D to get my physics to work. <br>
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="800" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/NetworkingDiaDenstra.mp4" type="video/mp4">
</video>
</div>

**Blender (W.I.P.)**
Currently for my year 3, first block, I am making Blender multiplayer. <br>
I have not seen instances of this being done using Blender's source code, so there was a lot to discover.<br>
More about this in my (soon) blender blog/project. <br>
The weird shading on the newly created cubes is due to normals not being updated correctly.
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<video width="800" style="margin: -10px 20px 10px 0;" controls>
<source src="../../assets/media/CreateStandardCube.mp4" type="video/mp4">
</video>
</div>

### Improvements
With the integration of the library into Blender, I had some oppertunity to improve my library. <br>
This was very nice, since the library had many issues which I now could resolve. <br>
Currently it still has issues, for example it only supports for UDP, yet for Blender, TCP would be much nicer. <br>
These improvements I could make in the future when I need them. <br>
But this is how far my networking library is at the moment. 

*For more details about this library, [read my blog](../Blogs/Blog.html)*
