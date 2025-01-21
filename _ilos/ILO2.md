---
title: "🔬 ILO 2: Research and analysis (15%)"
preview_title: "🔬 ILO 2"
layout: default
---

As a programmer, __I can analyse complex technical problems and research possible solutions__, so that I end up writing / integrating the right code for the job.

# 💭 Suggested Evidence
- References in the self-study plan
- Descriptions of programming problems researched

# 💯 Detailed Rubric

🔴 **Poor:** Some evidence of the development work being based on research. All sources are cited so that the same information can still be retrieved.

🟠 **Insufficient:** For at least 2 relevant technical questions, the Learning Log shows that the student has researched and analyzed multiple possible solutions before reaching a conclusion. 

🟡 **Sufficient:** For at least 3 relevant technical questions, the Learning Log shows that the student has made well-argumented decisions based on their research. Information has been collected from a variety of sources.

🟢 **Good:** Evidence of multiple iterative research processes of finding information, making decisions, implementing, evaluating, and possibly going back to a previous step when needed.

🔵 **Excellent:** Evidence of a research-driven attitude throughout the block, with an appropriate balance between thinking and doing. The Learning Log shows critical reflection and lessons learned about research-driven development.

# 🔍 Evidence

# Technical Questions 


### **What is the best way to establish a connection with peer to peer, and why?**


1. Using a STUN server
- A STUN server serves as an in-between. It will give all clients that connect with it, their and the other clients's public IP addresses. 
    <br><br>
    - Pros:
        - Receive much information about the NAT.
        - No input necessary for the user.

    - Cons:
        - Uses third party libraries.
        - Difficult the set up as programmer. 
        - Does not work with a symmetric NAT type.

    - Source(s):
        - [How STUN works](https://www.rfc-editor.org/rfc/rfc3489)


2.  Using a TURN server
- A TURN server is mostly used as back-up for the STUN server. It acts mostly the same as a client-server connection. But the key difference is that is only used if the STUN server fails. 
<br><br>
    - Pros:
        - It can surpass every NAT type.
        - It does not care about firewalls.
        - It is almost guaranteed that a connection is succesfull.
    
    - Cons:
        - A TURN server has to be up at all times.
            - This costs extra money.
        - It will result in some extra latency.

    - Source(s):
        - [Youtube video of TURN](https://www.youtube.com/watch?v=4dLJmZOcWFc) 



3.  Port Forwarding
- Port forwarding is setting an exception on your router for which port is allowed to connect.
<br><br>
    - Pros:
        - It surpasses the NAT and firewall.
        - It creates a good connection.
        - Using UPnP or NAT-PMP no user input is needed.
    - Cons:
        - It is more difficult to set up for the users (except if used UPnP or NAT_PMP).
        - There is a security risk involved.
        - If using UPnP or NAT-PMP its pretty difficult to program, same goes for libraries.

    - Source(s):
        - [How port forwarding works](https://portforward.com/help/portforwarding.htm) 
        - [Security risks, Reddit](https://www.reddit.com/r/selfhosted/comments/17tvway/what_are_the_actual_security_implications_of_port/)
        - [Port forwarding using code](https://stackoverflow.com/questions/2189430/how-to-port-forward-in-c)


4. The Use Of IPV4 Without Above Listed Features (Hole Punching)
- It is still possible to connect with IPV4 without the above stated features using hole punching.
<br><br>
    - Pros:
        - No need for any third party library.
        - Simple to program. 
    
    - Cons:
        - Hole punching still needs to occur (which could fail).
        - It will fail if a symmetric NAT is used.
        - User has to know the host IP and the host has to know the user IP.

    - Source(s):
        - [Hole punching example IPV4](https://github.com/mwarning/UDP-hole-punching-examples/blob/master/example1/udp_client.c)


5. The Use Of IPV6 (Possibly Hole Punching)
- When using IPV6, there is no need to traverse through the NAT. You can connect straight to the other person.
<br><br>
    - Pros:
        - Simple to program.
        - If firewall is off, there is no reason to hole punch

    - Cons:
        - Host needs to share big number to clients.
        - Not every device uses IPV6 yet.

    - Source(s):
        - [Hole punching in IPV6](https://www.reddit.com/r/ipv6/comments/16yvmmi/alternative_to_ipv4_udp_hole_punching_on_ipv6/) 


**Summary** 

Creating a **STUN** server/system requires a third party. So you or create your own server and system for it. Or you use a library which handles this for you.
<br>Asking to get a server could cost money. The bigger the server, the more money.
<br>This is out of the scope for my networking project, thus I am not doing this.

The same actually goes for the **TURN** server.

**Port forwarding** is a solution many people like. But this can be hard to set up for the user. 
Or using UPnP or NAT-PMP.
<br> Setting this up is also beyond the scope thus not the best solution.

Using **IPV4 or IPV6**.
<br>If you want to connect straight via IPV4, you have to hole punch.
<br>For my project I use UDP, thus UDP hole punching. This has about a 82% succes rate. 
<br>This could thus easily fail.
<br>If we look at IPV6, it is not much better. Not all routers/devices support IPV6. On top of that we still need to hole punch through the fire wall.
<br>But on the bright side. If the fire wall is not active (easily disabled)
there is no need to hole punch. (some security risks do apply here)

**What did I do?**<br>
First I went with the **STUN** server. For this I had to include a library like **PJPROJECT**.
This however took way more effort then I initially thought, I had to download many different apps and build programs. This did not all succeed. 
<br>I did create a plan using the STUN server in week 2:
<div style="display: flex; justify-content: left; align-items: left; gap: 20px; margin: 0 auto;">
    <img src="../assets/media/ILO1/Connecting.png" alt="Preparepackage" width="400" style="margin: 10px 20px 0px 0;">
    1. We first connect to the STUN server which will hand over our public IP. <br><br>
    2. Laptop A is server, all clients send their IP to the server, the server sends the IPs of all other clients to each other. <br><br>
    3. We now hole punch through the NAT to establish a connection. <br><br>
    4. We are connected, now we need to keep this connection alive by sometimes sending a package.
</div>
This plan had some problems with it. 
- 1 The STUN server is not only for giving out your IP, it could also be used to let everyone know of each others IP, why not do that?
- 2 You can just connect with an online site to get your public IP. This is what I used instead of the STUN server.
- 3 Sending the IP to the server has to be done manually, because how are you going to send an IP to the server, if you are not connected to the server?

Then I did more research and found out I can just retrieve public IPs by connecting to an internet site. But without **STUN** server, I could not internally share the IPs. For this was was a bit hesistant, but came to conclusion that it was still better.

In the end I decided to try and connect using **IPV4** or **IPV6** without third parties using **Hole Punching**.
<br>This does mean that it only works 82% of the time. 
<br>But for this project that is enough.


<br><br>


## **What is the best way to serialize networking data to another client?**

#### This means; how would I pack my data and send it to another client.


1. XML

    - Pros:
        - Human readable.
        - Widely used across the web. (Meaning lots of sources and libraries)
    - Cons:
        - It is space intensive, causing it to be less performant.
        - Navigating XML tree could be complicated.

    - Source(s):
        - [Video on introduction of XML](https://www.youtube.com/watch?v=O7fmNwbtCjo)

2. JSON

    - Pros:
        - Human readable
        - Widely used across the web
        - Less space intensive then XML
    - Cons:
        - Still a bit space intensive

    - Source(s):
        - [Video of what JSON is](https://www.youtube.com/watch?v=cj3h3Fb10QY)
        - [List of benefits and drawbacks of JSON](https://www.linkedin.com/advice/3/what-benefits-drawbacks-using-json-data)

3. BSON
    - The same as JSON but Binary

    - Pros:
        - Faster build and scanned
        - Offers more data types then JSON

    - Cons:
        - It is larger in byte size then JSON
        - Hard to read as human

    - Source(s):
        - [BSON documentation](https://www.mongodb.com/resources/languages/bson)

4. ProtoBuf
    
    - Pros:
        - ProtoBuf is Binary based, thus very performant
        - The C++ library is heavily optimized
    - Cons:
        - It requires some work creating a .proto file and making a class out of it

    - Source(s):
        - [ProtoBuf documentation](https://protobuf.dev/getting-started/cpptutorial/)
        - [Wikipedia Page of ProtoBuf](https://en.wikipedia.org/wiki/Protocol_Buffers )
<br>

- **Sources:** <br>
[Microsoft Document on Serialization](https://learn.microsoft.com/en-us/dotnet/standard/serialization/) <br>
[ProtoBuff, also explaining a little of other ways](https://protobuf.dev/getting-started/cpptutorial/)<br>

### **Summary**
**XML** sounded pretty okay, but I did not really like how much space it took.
Also the nesting sounds pretty bad.

I see **JSON** as a more upgraded version of XML, but the only draw back is that it is not binary.
This makes the file a bit slower to parse, yet a good option.

**BSON** takes away the draw back of JSON, with the only cons being that the size is a little bigger
and that it is not as readable, I think this could work.

**Protobuf** is something else, I do like that it states that it is very optimized and thus fast.
But using it would be a pain, mainly because it is not engine friendly.

I thought of using **BSON**. 
<br>I found a library that I was going to use: [Github Library BSON](https://github.com/jbenet/bson-cpp)
<br>But then I had my group meeting where I explained it. 
<br>They gave me a different view of it. 

<br>Thus my final chose will be: **A Custom serialization.**

So, they asked me, why not use a custom one?
This one I can pack way smaller which makes it way faster.
<br>On top of that, it is still very simple in the way I am going to do it.

**Here an example of a custom serialized package**
<br>"Name: PackageName var1 var2 var3 ..."

So first the name of the sender will be stated, then the name of the package that has been send. Then n amounts of variables go with it.
<br> Very easy to read and very short.


<br><br>


## How do I make my networking engine code very accessible and easy to use for other programmers?


### How do other libaries handle networking?

Here are some networking libraries listed below.

<br>

1. Boost.Asio

    *"Boost.Asio is a cross-platform C++ library for network and low-level I/O programming 
    that provides developers with a consistent asynchronous model using a modern C++ approach."*  <br>-Boost.Asio

    <br><br>

    **Own insight**

    - Pros:
        - It has good perfomance; meaning low latency due to good design.
        - It is cross-platform
        - You can add a completion function when receiving or sending data.

    - Cons:
        - You have to create threads on your own
        - You have to specify where to send the data to every time.

    - Conclusion:
        *It is not very easy to implement, but it gives freedom with it.*

    **Others insight**

    - [Not as thread-friendly as hoped.](https://stackoverflow.com/questions/1234750/c-socket-server-unable-to-saturate-cpu/1238315#1238315)

    - [Documentation is scarce, thus library not easy to use](https://stackoverflow.com/a/244583)


    **Sources**

    [Boost Website](https://www.boost.org/doc/libs/1_87_0/doc/html/boost_asio.html) <br>
    [Blog about boost performance](https://sergey-miryanov-en.blogspot.com/2008/07/asio-and-asynchronous-file-processing.html)
        
    <br><br>

2. ACE

    *"The ADAPTIVE Communication Environment (ACE) is a freely available, open-source object-oriented (OO) framework that implements many core patterns for concurrent communication software."* <br>- ACE


    **Own Insight**

    - Pros:
        - It has a good logging system
        - It handles blocking and non-blocking nicely
        - It is thread-safe
        - Cross-platform

    - Cons:
        - It is not especially made for games thus code is very broad
        - Code structure is also very old 

    **Others Insight**

    - [Reliable and performand, but takes great effort to learn](https://stackoverflow.com/questions/992069/ace-vs-boost-vs-poco/6999676#6999676) <br>
    - [Bad naming convention, lack of documentation (Hard to learn)](https://stackoverflow.com/questions/992069/ace-vs-boost-vs-poco/2089939#2089939)


<br><br>

3. Simple-Socket

    This is a simple networking library which helps with the basics of networking.

    **Own Insight**
    
    - Pros:
        - It has a set blocking/nonblocking feature for the socket
        - It is easy to create a new client and connect it to the server
        - It supports TCP and UDP 
        - Using the created clients, you don't have to specify where to send the data eacht time
        - Cross-platform
        - Thread safe
        - Easy to understand

    - Cons:
        - You have to thread the code on your own
        - It is archived and thus no updates expected to the library

    I could not find other people referencing to this library since it is so small.

    **Source**
    
    [Simple-Socket Website](https://prince-chrismc.github.io/Simple-Socket/)

<br>

**Summary**

ACE and Boost.Asio are very big libraries for networking in contrary to Simple-Socket.

<br>Boost is a good library for your networking project.
<br>It has little downsides except that you need to research a bit to understand how to use it.
<br>It is a nice replacement for using low-level winsock2. Some people suggest it to even be a [C++ Standard](https://www.reddit.com/r/cpp/comments/h0954a/asio_makes_for_a_bloated_networking_standard/).
<br>So, good replacement for using winsock2, but still a bit low-level making it harder to use and understand for certain people.

<br>ACE is actually mainly used in phone companies. 
<br>It is also very old code base, not really modern C++.
<br>I don't suggest using this for a small game you are making since it is pretty hard to learn and overkill.

<br>Simple-Socket offers a small and cheap networking library to make coding with sockets way easier.
<br> It does not need much documentation since it is so small.
<br> I do really like this library and would recommend it for creating (small) games.
