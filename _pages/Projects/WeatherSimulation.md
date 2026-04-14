---
title: "WeatherSimulation"
preview_title: "Weather Simulation"
section: "Projects"
layout: default
---

To pursue my passion for weather, I wanted to program a weather simulation.  
This project alone creates for learning opportunities for programming in many different areas.  
Some of these are are:  
- <strong style="color:black;"><u>Fluid Simulation</u></strong>  
- <strong style="color:black;"><u>CUDA</u></strong>  
- <strong style="color:black;"><u>Understanding and applying complex formulas</u></strong>  

These I will discuss loosely on this page. For more in depth, read the coming soon blog post.  


<div style="display: flex; justify-content: left; align-items: flex-start; gap: 20px; margin: 0 auto;">

<div style="flex: 1;" markdown="1">

### Fluid Simulation

A weather simulation is mainly based on a fluid simulation.  
It basically simulates the air flowing, with the air being the 'fluid' in this simulation.  

On the right you see a timelapse of the simulation I created.  
A cloud is forming and growing throughout the video inside a small environment (32x64x32).  

To get this fluid simulation working, I used the Navier Stokes equations.  
A famous derived form of this equation is:   

$ρ(du/dt) = -∇p + ∇⋅τ + F$

This basically represents the flow of air, which is an addition of different forces.  
For our simulation, we represent an incompressible flow. Here, we simulate that air is not able to compress.  
With this idea in mind, we can change this equation into:  

$du/dt = v∇^2u -∇(p/ρ) + (1/ρ)f$

$v∇^2u$ is the velocity term, this handles the flow of air through the simulation.  
$-∇(p/ρ)$ are the pressure forces over the density.  
And $(1/ρ)f$ is mainly about the $f$ which are the external forces (like gravity or buoyancy).

</div>

<video width="40%" style="flex-shrink: 0;" controls>
<source src="/assets/media/WeatherSim/Timelapse3D.mp4" type="video/mp4">
</video>

</div>

In our code, simplified, this looks like:
```cpp
calculateBuoyancy(); // Apply external forces

diffuse(m_envGrid.velfieldX); // Diffuse the velocity
diffuse(m_envGrid.velfieldY);
diffuse(m_envGrid.velfieldZ);

advectPPMW(m_envGrid.velfieldX); // Flow the velocity through the simulation
advectPPMW(m_envGrid.velfieldY);
advectPPMW(m_envGrid.velfieldZ);

pressureProject(); // Make sure the air stays incompressible and stable
```

In each function we already update the velocity, and in the pressure project function we make sure the air stays incompressible.  

Besides flowing the air over itself, we also flow other parameters through the air.  
For example the temperature or water vapor of the air, both get advected through the winds.  
For these we do about the same thing:  
```cpp
diffuseGPU(m_envGrid.potTemp); // (potential) Temperature
advectPPMWGPU(m_envGrid.potTemp);

diffuseGPU(m_envGrid.Qv); // Water Vapor
advectPPMWGPU(m_envGrid.Qv);
```
We also do this for some other parameters which are important for weather.  
These are: Qw (Warm/Water Cloud), Qc (Cold/Ice Cloud), Qr (Rain), Qs (Snow) and Qi (Hail/Graupel).


### CUDA 

To flow these parameters through the air and making sure that the air is incompressible is quite a task.  
A task that requires quite some computing power.  
Thus, to make sure we are able to run a larger simulation (bigger grid), we use the GPU.  
In my case, I used CUDA to speed things up.  
For CUDA, you may use a certain amount of threads, each thread can handle a kernel which may contain some calculation.  
You then can use a certain amount of blocks which contain a certain amount of threads. The amount is specified per kernel (function you want to run on GPU).  

In my simulation I use a block that consists of 16x16 threads. 16x16 because we make it 2 dimensional, with 16 on the X and 16 on the Y.  
I then use the grid width divided by 16 amount of blocks for the x axis and the same, but height for the y axis.  
With this, I can already have a pretty large grid in 2D.  
Yet, currently our simulation is 3D, this means that we need to account for another dimension.  
A way to solve this, is to still have the same principle, but each thread loops over the z axis on their own.  
This however, may be inefficient if you still have some left-over blocks. Thus, instead we try to split up the work as much as possible and put some of the blocks in a further z coordinate.  


### Understanding and applying complex formulas  
With this fluid simulation, I had to undestand some complex systems and formulas, for example the Navier Stokes equation comes back a lot of times in making a weather simulation.  
But also the advection of any parameter, you may do this is many different ways, I chose PPM(W), which I also had to understand and apply into the code.  

Besides the Navier Stokes formulas, we also have a lot of meteorological formulas.  
These formulas set the rules for our weather; when a cloud should form, when it should dissapear or when snow should form and how much of it.  
They may be very simple functions, but I tried to get as close to real life as possible, so I searched for some more complex formules which I got from certain papers.  



### Conclusion

I leaned a lot during the making of this weather simulation, not only in code terms, but also in meteorological terms.  
Many different systems or challenges come forward with making such a big project, and I really enjoy picking these up and trying to understand them.  
I am definitely not done with this project, since there is enough I may add to it:
- Optimize
- Save simulation and replay
- Visualize weather, possibly using raytrace or marching

And many more smaller features plus bigger ones that I have not planned yet.  