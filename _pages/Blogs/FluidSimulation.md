## Entrance
`Crowd hitter sentence.`
`Explain in pure basics what I created and what the document will contain`

> "To those who ask what the infinitely small quantity in mathematics is, we answer that it is actually zero. Hence there are not so many mysteries hidden in this concept as they are usually believed to be." -Leonhard Euler, 2000  

Some concepts may not be as difficult as they present themselves.  
Some concepts will be understood broadly with simple explanation, which then reveals the mystery of the actually not-so complex concept.  

The concept I am talking about in this blog is my weather simulation.  
It seems like a lot, but on the inside, it consists of default and understandable features.  
After I walk you through the concepts and explaining them, I will show and explain my current progression.  

## Second entrance 
`Explain what the simulation contains on a broader scale.`
`This includes fluid simulation, CUDA and formulas.`

This is a weather simulation, the main mechanic behind it is a fluid simulation, but instead of simulating water, I am simulating the flow of air.  
You can not really call some air flowing around a weather simulation, thus, on top of some fluid simulation, it also contains meteorological formulas.  
These formulas are about the water (vapor) in the air and how it reacts to different temperatures. This way we can simulate if it will be cloudy or when rain starts to happen.  

To speed the simulation up, I used CUDA for optimizations on the GPU. I will later go into more detail of why I chose CUDA.  
The simulation is currently in 2D, meaning that you are viewing the atmosphere from the side. Yet, I am currently making the shift over to 3D.


## First act Fluid
`Explain what a fluid simulation is`

Let me grab the basics of a fluid simulation. 
A fluid simulation is the progression of a fluid, for example water, through a space.  
There are two main ways to do this; particle based and grid based. 

With a particle based fluid simulation, you are using many particles which all have a velocity stored within them.  
You can see a particle as if it was a small piece of water.   
These pieces will then move around, push off from the walls and eachother and possibly are influenced by gravity.  
With this, you already have a fluid looking mesh made out of particles.  

<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/FluidSimBlog/ParticleSimulationRobin.png" width="50%" style="margin: -10px 20px 10px 0px;">
</div>  

*If you want to read more upon particle based fluids, peers of mine made a blog post about a particle based fluid simulation they made for Unreal Engine:*
*[Particle Based Fluid Simulation by Robin Heijmans and Tanya Helmers](https://medium.com/@robinheijmans/real-time-particle-based-fluid-simulation-plugin-for-unreal-engine-b38294f6a507?postPublishedType=repub).*   


The grid based fluid simulation is a simulation where the whole region of a fluid is filled with grid cells (boxes or voxels).  
These cells store information about the fluid, with the main things being the velocity (speed and direction within the cell) and fluid amount.  

You may use a particle based fluid simulation if you want a simulation without bounds.  
The grid based fluid simulation has as pro, that everywhere you have the same amount (and quality) of information. This is not the case for the particles, since there could be sections of void with no particles.

I need this predictable amount of information for my weather simulation with the need for many more parameters.   
Thus, that is why my weather simulation is grid based.  

## Second act Fluid
`More fluid simulation explanation (originated, famous papers, advection/viscosity/diffusion/pressure projection and more)`

Fluid simulations and specifically computionally fluid simulations, have been around for already a long time.  
They all rely on the [Navier-Stokes Equation](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations).  
A famous derived form of this equation is:   

$ρ(du/dt) = -∇p + ∇⋅τ + F$

This formula corrisponds to newton's second law:  

$ma = F$

We simulate the fluid for a volume, as small or large you could think of, and because of that, we can say that we need to calculate mass per volume, which leads to:  

$m / V = ρ$  

$du/dt$ is the acceleration of the fluid, meaning that in this case: 

$du/dt = a$  

And all terms after the equal sign are extra forces we apply to the fluid.
This leads us to newton's second law.

We then still have some forces that I have not explained.  
These forces are not necessarily needed to simulate a small fluid simulation, but create rules which apply more to the real world.

The first one being $-∇p$, This represents the fluid wanting to flow to lower pressure.  
For example if I have a vacuum of air, this means that the pressure is very low, the air wants to fill this vacuum as fast as possible due to this force in the equation.  

The second force is $∇⋅τ$, this can be rewritten differently based on how what rules our fluid follows.    
But to simplify, it simulates the viscossity of our fluid; is it like honey very sticky, or like water?  

Lastly we have the force $F$, which just stands for external forces, these forces can be anything you want to add to the fluid.  
Some important ones are gravity $g$ or buoyancy $b$. 

A perfect way to solve the Navier-Stoke equation has yet to be found, if it ever even will be found.  
This means that we currently have created formulas which try and solve the equation as good as possibly but are not perfect yet.  
That makes for many different formulas you can choose from, which all have their up and downsides.  

A possibly future blog will go more into depth of formulas I used to solve the Navier-Stokes equation and explaining them.  
If you want to read up on some of the formulas, I recommend looking through the [2007 SIGGRAPH paper](https://www.researchgate.net/publication/234801901_Fluid_simulation_SIGGRAPH_2007_course_notes_Video_files_associated_with_this_course_are_available_from_the_citation_page)

## First act Weather
`Explain that this is a weather simulation, what makes it weather?`

Now I have explained what a fluid simulation is, now, what makes my simulation a **weather** simulation?  
Well, in a weather simulation you add some extra meteorological formulas. 
Which in this sense is basically applying more rules to different kinds of fluid in the simulation.  
And yes, I am advecting not just air throughout the simulation, but multiple kinds, each one having different properties and meaning that are related to weather.  

Down below I created a table containing all fluids that I move around in the fluid simulation.  
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/FluidSimBlog/AdvectionTypes.png" width="50%" style="margin: -10px 20px 10px 0px;">
</div>  

As seen these are many weather related parameters that I use inside my simulation.  
The unit *kg/kg* is; kg of this parameter (for example rain) per kg of air.
They relate to different states in weather, for example; Water Cloud (*Qw*) may appear when too much Water Vapor (*Qv*) is in the air which then gets condensed into Qw.  
If Qw increases or decreases is defined by the meteorological formulas I have added to the simulation.  
When following rules for all parameters in the simulation, you can simulate weather!


## Second act Weather
`List previous implementations, explain which formulas there are`

Fluid simulations were on of the earlier simulations done using computional fluid dynamics.  
Due to the ability of simulating the weather, meteorologists now had the ability to look further ahead and see how the enviroment would evolve over time.  
This pushed the ability to forecast very quickly ahead.  
Currently there are lots of different weather models some famous global weather models include the GFS or ECMWF.
These however, run simulations on a way larger scale than most models.  

When I started development for this project, I had no idea what I was going to make and what I was doing.  
I then did some research and found some interesting papers.  
The [WeatherScapes paper from 2021](https://computationalsciences.org/publications/amador-herrera-2021-weatherscapes/amador-herrera-2021-weatherscapes.pdf) had the most influence on this project, as it was my introduction to weather models in general.  
It contains formulas about different processes in the enviroment and explains nicely what they do.  

One example would be the formula for condensation of vapor to warm cloud (Qw).

$𝐶𝑊= 𝑞𝑤𝑠−𝑞𝑣 $ for $𝑇≥−40$  (formula 17 in the paper)

With $qws$ being saturation vapor mixing ratio over water, which is a mouth full, but it basically means how much water the air can hold at this current pressure and temperature.  
If the vapor in the air is greater than the amount of water we can hold, the vapor will condensate.  
For this formula, we do this for temperatures greater than -40, since below that everything will instantly freeze.

While this paper contained a good amount of easy to implement formulas, I decided to look for more detailed formulas.  
This I decided after testing these current formulas and searching for other papers.  
I then found my second most inspiring paper: [Bulk Parameterization of the Snow Field in a Cloud Model 1983](https://journals.ametsoc.org/view/journals/apme/22/6/1520-0450_1983_022_1065_bpotsf_2_0_co_2.xml).  
This contained more formulas with more detail, yet it may be more difficult to understand.  
Many of these formulas are implemented into my weather simulation, yet it lacked some formulas that I thus got from other sources.  

Weather models like the ECMWF or GFS are global weather models, they are pretty different that what I am creating.  
The global weather models do calculate not soully on microphysical schemes, but add much more around it.  
ECMWF combines multiple kinds of models, such as their Wave Model [(ECWAM)](https://confluence.ecmwf.int/display/FUG/Section+2.3+Ocean+Wave+Model+-+ECWAM) or the Dynamic Ocean Model [(NEMO)](https://confluence.ecmwf.int/display/FUG/Section+2.4+Dynamic+Ocean+Model+-+NEMO). [7]  
This creates for a whole feedback system between models which are specialized on their own area, which leads to an improved forecast for even the low resolution ECMWF has.  

What comes closer to what I am creating, are the 'convective allowing models', these models have a much higher resolution.  
But due to the higher resolution, it is more expensive to run, so these models are always regional.  
These models are mostly between 1 km and 4 km resolution, this means that one grid cell represents 1 kilometer.  
This improved resolution allows for smaller scale systems, for example local thunder storms.  


## First act Combine
`What kind of fluid simulation am I making based on the weather part?`  
The model I am making would support for very high resolution, this is because I am focusing fully on the fluid dynamics combined with the microphysics on a small scale.  
This does not mean it can not run on a larger scale, but it is not as effective as for example global weather models.  
They are using these formulas in a statical way, meaning the formulas are created just for this larger grid size, taking into account that it can not resolve single water droplets, but resolves in bulk. [8]

My weather simulation uses the fluid simulation as basis, then it advects all the other parameters around it.  
I then try to use as physically correct possible formulas I can find and easily implement.  
With this I hope to achieve a high accurate depiction of the reality.  
Yet, this does not mean that this simulation is currently a close depiction of reality, with the environment being still highly unpredictible at times (certainly on smaller scale).  
The simulation also is not using the highest tech there is to find, and will never use it due to time constrains I have.   
Yet, I hope to make it to a certain accuracy that I will be pleased with.  


## First act optimize
`Explain logic of being slow and why used CUDA`
A fluid simulation can be compressible or incompressible.  
Imagine water in a hydrolic press, it is very hard to compress this water, you may even consider it incompressible.  
Air is in the other hand way easier to compress, yet, many weather simulations are made based on incompressibility.  
This is due to it being simple to implement and easy to understand.  
Looking at the image, we have 2 vectors flowing into the grid cell from up and below, but now we got too much flowing.  
This also means that we have too much convergence going on.  
To fix this, we simply divert some of the flow through the sides.  
<div style="display: flex; justify-content: left; align-items: center; gap: 20px; margin: 0 auto;">
<img src="/assets/media/FluidSimBlog/Incompressible.png" width="50%" style="margin: -10px 20px 10px 0px;">
</div>  

My simulation currently follows the incompressible method, but I intend to convert it later to compressible which is more realistic.  

When flowing the wind through my simulation, I have to add the amount that comes into that grid cell, and removes what goes out.  
This uses a method called PPM(W).  
After which, the wind vectors have now moved to their new position, but now the cells are not divergence-free anymore, or better said, they do not follow the incompressible rule anymore.  
To fix this, we can go over each cell and calculate the divergence, this we apply on the vectors flowing in or out our cell.  
But, we now have fixed the divergence for this cell, but created some divergence for our neighouring cells by adjusting these vectors.  
We will never be able to fully have an incompressible fluid, since this would mean that we need a perfect solution.  
But we can loop over the grid multiple times to create for a solution we are pleased enough with.  

This, you can image, is pretty slow.  
Especially with larger simulations, for example a 256x256 simulation, this would mean that we already need to check 65,536 cells.  
Now imagine needing to do this multiple times to achieve our pleasing incompressiblity solution.  
With a smaller simulation, this is doable, but for a larger one, we need something to speed things up.  
The big solution is making actual use of our device.  
We can use the GPU to calculate solutions in parallel.  

There are many choices between different compute shaders, compute shaders use the GPU to do many difficult operations in parallel.  
I choose to do my acceleration using CUDA (Compute Unified Device Architecture).  
Some people may ask why I chose to use CUDA instead for example OpenCL.  
Well, CUDA is in multiple cases faster than OpenCL.  
This is mainly due to the system specifically made for NVIDIA GPUs. [9]  
Besides that, CUDA is generally easier to work with in terms of reading code and create code. [11]   
The main downside is that CUDA is limited to devices from NVIDIA, yet, using SCALE, you can easily compile it for other hardware. [10]  


## Visualization
Show video of 2D simulation
Explain every part of the video in low detail.

Explain going to 3D, what oppertunities this will create and what drawbacks.

## Future additions
Say what can be added or changed, include visualization with cloud rendering. 

## Conclusion
Conclude story, link to other detailed blog if there. 

## Sources used
State all sources

1. Quote from Euler: Fundamentals of Teaching Mathematics at University Level (2000) by Benjamin Baumslag, p. 214
2. Particle based simulation by Robin Heijmans and Tanya Helmers: https://medium.com/@robinheijmans/real-time-particle-based-fluid-simulation-plugin-for-unreal-engine-b38294f6a507?postPublishedType=repub 
3. Navier-Stokes equation: https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations 
4. SIGGRAPH 2007 fluid simulation paper: https://www.researchgate.net/publication/234801901_Fluid_simulation_SIGGRAPH_2007_course_notes_Video_files_associated_with_this_course_are_available_from_the_citation_page
5. Weatherscapes paper: https://computationalsciences.org/publications/amador-herrera-2021-weatherscapes/amador-herrera-2021-weatherscapes.pdf 
6. Bulk Parameterization of the Snow Field in a Cloud Model 1983 https://journals.ametsoc.org/view/journals/apme/22/6/1520-0450_1983_022_1065_bpotsf_2_0_co_2.xml
7. Confluence documentation on ECMWF, forecasting systems https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS 
8. ECMWF model structure https://confluence.ecmwf.int/display/FUG/Section+2.1.1+Model+structure 
9. Performance difference CUDA and OpenCL: https://www.researchgate.net/publication/45917701_A_Performance_Comparison_of_CUDA_and_OpenCL 
10. SCALE CUDA https://scale-lang.com 
11. Easier to write in CUDA: https://www.researchgate.net/publication/316235074_Benchmarking_OpenCL_OpenACC_OpenMP_and_CUDA_programming_productivity_performance_and_energy_consumption 