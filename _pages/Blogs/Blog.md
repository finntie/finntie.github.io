---
title: "How I created a small networking library for windows"
preview_title: "Blog Post1"
layout: default
---

<img id="BuasLogo" src="/assets/media/LogoBUas_RGB.png" class="buas-logo" alt="BuasLogo">



**How would one message another person that is on the other side of the world?**
<br>You simple send them a message via whatsapp, or send them an email.
<br> <br>
It sounds very simple, but what is happening on the inside?<br>
How would I connect with other people in for example a game?<br>
How do you program networking?

I wrote a simple networking library for windows.
I created this library in 8 weeks, before this I knew nothing about networking.<br>
In this blog I will help you understand networking and how I created a small library for it.

 **<font color="red">This library is currently not publicly available</font>**

## What is networking?

Networking is connecting with others to exchange information, this is essentially the same case for programming, but here we are talking about devices.

Networking in programming is controlling the behaviour and traffic of network devices by software that is not part of the network hardware. With that, the user is able to steer the network to their likings to a certain extend.

In my case it is connecting with other devices using low-level network programming.

When connected with other devices, you can send packages which contain information through the internet that the other device will pick up.

## Different ways to connect

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

Port forwarding is in simple terms setting an exception on your router for which port is allowed to connect.<br>
This can be done manually or automatically. 

### Hole Punching

When you want to connect to another device, you get blocked at their router. But you still 'expect' a message back, so while your message is outgoing, your NAT is for a short time open for the other device.
Meaning that if the other device in that small period of time also sends a package to you, the NAT and firewall will let it through.<br>
Because the timing is crucial, this could be done multiple times before a connection is made.<br>
This however would not always work. Especially not with a NAT type called a symmetric NAT. This NAT is more strict then others meaning it will not approve such connections.

There are different ways to connect with also different situations that I did not explain here. 

## Winsock2

Winsock2 is an API for networking on windows specifically, it is based on BSD (Berkeley Software Distribution) Socket standard but differs slightly from it, BSD socket can be used on for example Linux.

Meaning with winsock2, you can program networking on windows, it is designed for the C/C++ language.
This means however, you can not use winsock2 code on linux or BSD socket code on windows. Luckily, they differ so slightly that you can keep most of the code the same without any issues.

A crucial part in networking are sockets.<br>
Sockets serves as endpoints in sending and receiving data. A socket uses a socket adress to be identified by other hosts. This adress needs 3 things: the **port number**, **the protocol** used and the **IP-adress**. It uses these things to indentify the correct destination or source for the connection.

A **Port number** is a 16-bit unsigned integer. It is used to identify a specific endpoint. <br>
Ports ranging between 0 and 1024 are well-known ports or system ports, these are mostly reserved/assigned by the IANA (Internet Assigned Numbers Authority).

The two most famouse **Protocols** are TCP and UDP. <br>
TCP is known for sending messages safely across the network.
On the other hand, UDP is all about speed. You do not need a connection for sending a UDP packages. But speed means they not always arrive correctly or at all.<br>
For certain scenarios you use TCP (for example sending chat messages) for others you use UDP (for example a video connection).

I have already talked about **IP-adresses**, but I have not stated that besides NAT, they also invented IPV6 as a solution to the shortage of IP addresses. This is a 128-bit alphanumeric value, it has 2 to the power of 128 different possibilities, this is a bit more then 2^32. Meaning, each device can have their own IPV6 adress.

<br>
Now, winsock2 has a lot of different networking functions, I will explain some that I think are pretty important. If you would like to learn more about these functions or other functions from the BSD API, I would suggest this document: [Beej’s Guide to Network Programming](https://beej.us/guide/bgnet/pdf/bgnet_usl_c_1.pdf).

<br>
```cpp
INT WSAAPI getaddrinfo([in, optional] PCSTR           pNodeName,
                       [in, optional] PCSTR           pServiceName,
                       [in, optional] const ADDRINFOA *pHints,
                       [out]          PADDRINFOA      *ppResult
);
```
You use **getaddrinfo()** to store information of an IP in a addrinfo struct (*ppResult). 
This struct you can then later use to send your messages to.<br>
It will return an int which you can use to check for errors.<br>

```cpp
SOCKET WSAAPI socket(
  [in] int af,
  [in] int type,
  [in] int protocol
);
```
With the **socket()** function, you will create a socket. It returns an SOCKET (or uint) you later use for binding, sending/receiving messages or more.
You need to specify if you use IPV4, IPV6, type of socket you use and which protocol.<br>
These you can get from the addrinfo struct.

```cpp
int bind(
  [in] SOCKET         s,
       const sockaddr *addr,
  [in] int            namelen
);
```
The **bind()** function assigns a name to the created socket. So this will add the port and IP to the socket. <br>
Sometimes you do not have to **bind()**, the server always has to bind, but the client only sometimes. In most scenarios, when socket() is called, the OS will automatically bind a port to the socket. It is then possible to send a message to the server, which did **bind()**. <br>
But sometimes this is not possible. In cases where the server you want to connect to is not public (behind a firewall or NAT), the client does need to **bind()** to be able to receive messages.

```cpp
int WSAAPI recvfrom(
  [in]                SOCKET   s,
  [out]               char     *buf,
  [in]                int      len,
  [in]                int      flags,
  [out]               sockaddr *from,
  [in, out, optional] int      *fromlen
);
//And
int WSAAPI sendto(
  [in] SOCKET         s,
  [in] const char     *buf,
  [in] int            len,
  [in] int            flags,
  [in] const sockaddr *to,
  [in] int            tolen
);
```
The **recvfrom()** and **sendto()** functions are alike, the name already describes what it does.<br>
You can now use your created addrinfo struct to fill in the sockaddr and use the socket you created.
With the buffer you can send any message you want.<br>
For the **recvfrom()** the buffer will get filled, so does the sockaddr. 
The receiving function blocks at default, meaning it will wait until it receives something, you may unblock this, but it is adviced not to because it reduces performance when put in a loop.

When using a TCP protocol, you can not just send the messages. You have to establish a connection beforehand. I won't go into details of this since I used mainly UDP.

## My library

Using winsock2 I created a library which makes it easier to connect with other people and send messages.

Using all the winsock2 function to connect and send messages is a bit complicated. I tried to make it as easy as possible to connect but with still enough freedom to adjust the connection to your needs.

The connection type I went for is hole punching. When trying to connect to another network, the library will send messages until a connection is made.

Without further ado, lets look at the code.

### Setting things up

You only need to include one header file and create a class object.
```cpp
#include "dance.h"

Dance DanceObject;
```
The <font color="#962f2f">init</font>() function will initialize winsock2 + some additional settings.
```cpp
void init(bool UseCallBack, bool ForceIPV4);
```
You can decide if you want to use callback functions, these could be handy with getting important packages. Enabling the usage of callback functions will cause an extra thread to be used.
<br>You could also force IPV4 to be sure everyone can connect if some devices don't support IPV6.
*(This can also be done using* <font color="#962f2f">setIPV</font>())


### Connecting

In a connection there is always one host and one or multiple clients.
Meaning that someone has to take the role as host.
**The host has to connect before the client**.<br>
```cpp
void Host(DanceMoves moves,
            int MaxConnections,
            const char* Port = 0,
            const std::vector<std::string>& clientsIP = std::vector<std::string>());
```
- Variable **<font color="#9ea874">DanceMoves</font> moves** is an enum between 3 options: <font color="#abcc6a">SAMEDEVICE</font>, <font color="#abcc6a">LAN</font> or <font color="#abcc6a">PUBLIC</font>.
The connection will be determined based on this value. 
- You can add a maximum of total connection allowed into the network. 
- A port number could be specified. This can also be changed by the programmer internally.
- If a Public network has been chosen, the host has to add the IPs of all clients connected.

```cpp
void Connect(DanceMoves moves, char* hostIP, const char* Port = 0);
```
'Connect' is more or less the same, the only difference is that filling in the hostIP is necessary.

Example:
```cpp
if (host)
{   
    //Always host first
    DanceObj.Host(networkType, maxAmountConnections, 0, clientIPs);
}
else
{
    //Connect second
    DanceObj.Connect(networkType, hostIP, 0);
}
```

### Handling packages

Sending messages between client and host is done using set packages.
These packages almost all have the same format: <br>
*"Name PackageName Value1 Value2 Value3 etc"*
<br>It could also specify for whom, in that case there will also be a *'-ToAll'* or *'-ToCl1'* in front.
<br>The format is not that interesting, since it will be mostly handled internally.
This is not the case with the callback function (I will get to this later).

**Creating Packages**
<br>You create packages only once. 
```cpp
void CreatePackage(std::string PackageName, Args... args);
```
- First you decide the name of the package, this name is capital sensitive.
- You may or may not already add some parameters

**Adding data to package**<br>
You can still change the package after creating it:
```cpp
void AddParametersToPackage(std::string PackageName, Args... args);
void AddDataToParameter(std::string PackageName, int VariableIndex, T Data);
void DeleteParameterFromPackage(std::string PackageName, int VariableIndex, bool all);
```
- You specify which package you are talking about.
- For changing a parameter, you simple state which one you want to change or delete.

Example
```cpp
//Adding time to package
std::string Time = return_current_time_and_date();

DanceObj.AddParametersToPackage("TimeAndDate", Time);

//Adding 10 random ints to the package
for (int i = 0; i < 10; i++)
{
    DanceObj.AddDataToParameter("Values", i, rand());
}
```
Pretty straight-forward. <br>

**Sending Packages**<br>

Sending the package is as simple.
```cpp
void sendPackage(std::string PackageName);
```
This will send the package to all other peers except yourself. 
<br>You can also send a package to a specific connection;
```cpp
void sendPackageTo(std::string PackageName, int themID, bool OnlyToHost);
```
Every number is a different connection, this is decided by the host. Therefor, if you send it to a specific person, you send it first to the host which then will check to who it will be send.
<br>You can also send to yourself using <font color="#962f2f">sendToSelf</font>().

**Receiving Packages**

```cpp
void getPackage(std::string PackageName, bool DeleteMessage, ReturnPackageInfo* packageInfo)
```
- To get a package, you specify the name of the package.
- State if you want to destroy message after reading it.
- You need to create a <font color="#439c58">ReturnPackageInfo</font> struct that will be filled by the function.

```cpp
    struct ReturnPackageInfo
    {
        bool succeeded = false;
        std::vector<std::variant<int, float, unsigned, const char*, std::string, double, bool>> VariableVector;
        template <typename T>
        T getVariable(int Index)
        {
            if (auto* value = std::get_if<T>(VariableVector[Index]))
                return *value;
            else 
            {
                printf("Error getVariable(): Wrong type\n");
                return T{};
            }
        }
    };
```
The struct includes a bool to see if the package succesfully was received.
<br>It includes a vector of variants, this includes every variable you put in.
<br>Using the <font color="#962f2f">getVariable</font>() function, can can safely return any variable. Of course this can also be done using a normal std::<font color="#962f2f">get</font>(), but this could create an error.

Example:
```cpp
Dance::ReturnPackageInfo PI;
DanceObj.getPackage("TimeAndDate", true, &PI);
if (PI.succeeded)
{
    printf(PI.getVariable<std::string>(0).c_str());
}
```
Now we have handled everything, except the callback functions.

**CallBack Functions** 

First you create your desired function that will handle code when a package arrived.
<br> This function needs to have 1 parameter which is 'std::<font color="#439c58">string</font>& data'
```cpp
void CreatePackageCallBackFunction(std::string PackageName, std::function<void(const std::string& data)> function)
```
- First you specify for which package you want to call this function.
- Using a lambda you can add the desired function.

Example:
```cpp
DanceObj.CreatePackageCallBackFunction("Values", [this](std::string data) {handleReceivedValuesPackage(data); });
```
The function will be called when this package arrives. This package will not be callable from '<font color="#962f2f">getPackage</font>()'.
<br> It will give a string of data, this data includes the name of the sender and the package name. (not '-ToAll' or '-ToHost')<br>
Example:
```cpp
void gameSystem::packetValuesReturned(std::string data)
{
	int valueArray[10];
	//Luckily we know that we have 10 values, the first 2 words indicate the name and the packageName
	for (int i = 0; i < 10; i++)
	{
		valueArray[i] = DanceObj.dataToVariable<int>(data, i + 2);
		printf("Value %i = %i\n", i, valueArray[i]);
	}
}
```

### Other Functions

There are some extra functions that need to be user or can be handy:

```cpp
/// <summary>If we are using hole punching to connect to another client, 
/// this connection has to stay alive. Thus calling KeepAlive every minute is nessecary.</summary>
void KeepAlive(float deltaTime);

/// <summary>Retrieve the IP of this device, !!Also sets the IP type (IPV4/IPV6)!!</summary>
/// <param name="publicIP">Do we want the public or private IP?</param>
std::string getIP(bool publicIP);

/// <summary>Before calling this function calculateTotalConnections() must have been called.
/// Does not include our own connection</summary>
int getTotalConnections() { return TotalConnections; }

/// <summary>Are we the host?</summary>
bool getIfHost() { return host; }

///< summary>Set manually ipv</summary>
/// <param name="IPV">2 == IPV4, 23 == IPV6</param>
/// <param name="ForceIPV4">Forves IPV4 even if we have IPV6</param>
void setIPV(int IPV, bool ForceIPV4)
{
    ipv = IPV;
    forceIPV4 = ForceIPV4;
}
```

The <font color="#962f2f">KeepAlive</font>() function is necessary to be called from the host if hole punching is done. The connection needs to be updated at least every 60 seconds (which the function does). This could be replaced by an own made function which sends a package after a certain time.

## Issues, downsides and potential improvements

Due to the time contraint I had, there are still some things not integrated into the library which could cause issues. 

- In general there could be some bugs, especially in the public connection since this is not well-tested.
- The library does not handle a disconnection of a client. This I want to try and fix soon.
- There is no log-system, so if something does not work, it is pretty hard to find out why.
- If <font color="#962f2f">connect</font>() is done before <font color="#962f2f">host</font>(), the connect will never do anything and potentially break. This is due to connect only trying once to connect.
- If trying to use <font color="#962f2f">getPackage</font>(), it could be that the package never arrives due to the library not being able to handle hunderds of packages at the same time. <br>
It could also be stated that the list of messages stored has a maximum of 100, if any more come, the last message will be destroyed. 
- Since the library is not using any third party systems, everyone has to share their IP with eachother. This is very unpracticle and could cause some security issues.
- I would like to improve <font color="#962f2f">setIPV</font>(), since it could a bit confusing on how it works and how it changes the connections.
- On top of that, another thread for the hole punching, since now the library blocks until all connections succeeded which could be an issue.

## Conclusion

After reading this you should be able to understand a lot more about networking.<br>
If not, then try to read some of the resources down below.

I hope I explained my library well enough for you to maybe give it a try. <br>
As seen above the library has many issues that I would like to solve.

These past 8 weeks (with 2 weeks of holiday) were very fun to me, I learned a lot about a topic I was interested in, and put it to use. 

#### **Additional Sources**


- [Beej’s Guide to Network Programming](https://beej.us/guide/bgnet/pdf/bgnet_usl_c_1.pdf) Such a nice documentation about Network Programming.
- [Peer-to-Peer Communication Across Network Address Translators](https://bford.info/pub/net/p2pnat/) Explination of traversing through a NAT system.
- [Documentation of how a STUN server would work](https://www.rfc-editor.org/rfc/rfc3489) I originally planned to use a STUN server to retrieve public IPs. 
- [Video of peer-to-peer holepunching without centrilized infrastructure](https://av.tib.eu/media/56961) Maybe this helps understanding holepunching a bit better.