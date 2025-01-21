---
title: "🕹️ How I created a small networking library for windows"
preview_title: "Blog Post"
layout: default
---

## Introduction
**How would one message another person that is on the other side of the world?**
<br>You simple send them a message via whatsapp, or send them an email.
<br> <br>
It sounds very simple, but what is happening on the inside?<br>
How would I connect with other people in for example a game?<br>
How do you program networking?

I wrote a simple networking library for windows.
<br>This library connects with other users using hole punching.
<br>I will write about how and what in this blog.


## What is networking?

Explain the basics of networking

Networking is connecting with others to exchange information, this is essentially the same case for programming, but here we are talking about devices.

Networking in programming is controlling the behaviour and traffic of network devices by software that is not part of the network hardware. With that, the user is able to steer the network to their likings to a certain extend.

In my case it is connecting with other devices using low-level network programming.

When connected with other devices, you can send packages which contain information through the internet that the other device will pick up.

## Different ways to connect

Holepunching, port forwarding, Central server(directly connect).

You can not directly connect to any device on any location. The connection is secured by a firewall and NAT. Both NAT and firewall could block connections from the outside.<br>
The NAT did not always exist, since people realized we did not have enough IPV4 adresses. They invented the NAT to reduce the amount of total public IP adresses.
The NAT simple translate the private IP of a local device to the public IP that is assigned to the router.

So, we need ways to connect through the NAT and firewall. There are some ways to do that.

### Using a central server

All devices connect to a central server. This server is not behind a NAT or firewall thus everyone is able to connect. 
This server can do multiple things:
- It can only serve as a bridge between 2 devices wanting to connect. Thus if person A wants to contact person B, they send a message to the server, this will send the message to person B, often called a Relay Server.
- It can handle the connections, the devices will send their inputs and information to the server, whereas the server will do the calculations and return for example player positions or game states. Thus meaning it is more involved in the process.

### Port Forwarding



## Winsock2

Explain code stuff, like; socket, bind(), send() recvfrom().


## My library

How did I implement stuff + packages 


## Issues and downsides

Things my library does not do.


## Conclusion

^^ 

