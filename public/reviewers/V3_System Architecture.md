

## I. System Concept

[cite_start]System architecture is crucial for implementing and operating information systems, delivering services through a combination of information technology (IT), hardware, and software. [cite_start]It is growing in complexity due to new technologies like big data, cloud computing, and IoT. [cite_start]Fundamentally, system architecture defines the structure, components, and relationships within an information system.

### I.01 Concept of System Architecture

#### A) Understanding System Architecture

| Concept | Description |
| :--- | :--- |
| **System Architecture (Broad Sense)** | Refers to all architecture (Application Architecture (AA), Data Architecture (DA), and Technical Architecture (TA)) for constructing an information system. It is a document defining the structure to support business processes. |
| **System Architecture (Narrow Sense)** | Defines system components (hardware, software, security, interactions). Specifically refers to **Technical Architecture (TA)** and defines the layout and connection of middleware, DB server, WAS, storage, and network for distributing application programs. |

---

**Components of System Architecture (Broader Sense)** 
1.  Application Architecture (AA)
2.  Data Architecture (DA)
3.  Technical Architecture (TA)

**Components of Detailed System Architecture (Narrower Sense)**
* **Server design architecture:** Defines server resources, CPU clock speed/number of cores, memory capacity, network card performance, storage units, server type (e.g., 1U to 4U blade type), and server size (e.g., 1TB to 4 units).
* **Network design architecture:** Defines network components, external networks capacity (bandwidth), switched/router determination, L4 switches for load balancing, security systems (DDNS, IPS, firewalls), and network addressing services (Subnet, IP, gateway).
* **Storage design architecture:** Defines separate network storage, storage capacity/performance (IOPS, bandwidth), media types (SSD, SAS, SATA), RAID configuration type, and storage network type (SAN, ISCSI, NFS).

#### B) Components of Information System

System components are items that provide the functions of an information system. Detailed components include computer hardware, OS, and middleware running on a physical server.

* **Server:** Provides the computing power to process business logic and data by running application programs.
    * **Server Types:** Mainframes, Unix servers, and x86 servers are commonly used.
    * **Example:** A server providing web services includes a webserver, a Web Application Server (WAS), and a database server.
* **Network:** Connects the information system components for communication. Devices include switches, routers, load balancers, and bridges.
* **Storage:** Holds the data of an information system.
    * **Types:** Block storage, File storage, and Object storage.
    * **Connection Methods:** Network attached storage (NAS), Storage area network (SAN), and Direct attached storage (DAS).
* **Security:** Configured via the network connection, involving hardware (DDoS defense, firewalls) and software (monitoring, logging, blocking network traffic, IPS/IDS).

### I.02 Types of System Architecture

#### B) Classification According to System Layout

| Type | Detail | Disadvantage |
| :--- | :--- | :--- |
| **Centralized architecture** | All systems are integrated in a single centralized place. Uses an integrated database on a large-capacity server, offering simple configuration and ensuring data integrity. | Load is concentrated during peak time. |
| **Multi-region distributed system architecture** | Operations and application systems are distributed regionally, managing distributed data using small or medium-sized servers. Reduces the load of each server and distributes user load. | Makes it difficult to manage data integrity and makes system configuration complex. |

#### C) Classification According to How Application Programs Are Provided

1.  **Client-server architecture:** Places system functions in the servers and configures clients to use the service.
    * **Service Types:** Games, chatting, messenger, FTP servers, and terminal servers.
2.  **Web system architecture:** The client uses a web browser to access application programs running on the server.
    * **Detail:** Generally consists of a webserver, a web application server, and a database server. Performance and program reusability are high.

#### D) Classification by System Layer

This classification divides the information system into logical layers: presentation, business logic, and data layers. Physical implementation can follow N-tier structures (two-tier or three-tier).

* **Two-tier architecture:** Stores and processes data in the server and processes business logic and presentation for the client.
    * **Limitation:** Performance degrades as the number of users increases; disadvantageous in terms of scalability and reusability.
* **Three-tier architecture:** Designed to overcome the limitations of the two-tier architecture, introducing an additional tier between presentation and data tiers.
    * **Advantages:** Business logic is flexible and scalable; simplifies database access management; distribution of presentation tier simplifies development.
    * **Example:** Client (Presentation), WAS (Business Logic), DB (Data Layer).

### I.03 Server's Stack Architecture

The server has a stack structure: computer hardware is at the bottom, followed by OS, middleware/platform, and the application program at the top.

* **Middleware/Platform:** Abstracts computer hardware and provides services to software.
    * **Role:** Supports the flexibility of convenient expansion/reduction of application programs and hardware independence.
* **Application Programs:** Provide services to users using this middleware.

---

## II. Network Concept

This section introduces network protocols, the OSI Reference Model, and the TCP/IP Protocol Suite, detailing data encapsulation and transfer across network layers. It emphasizes the structure of the OSI 7 layers and the functions of key protocols and organizations.

### II.01 What is the Protocol?

A protocol is a standardized communication rule for sending and receiving data through a network.

**Standardization Organizations (Examples)**
* **IETF (Internet Engineering Task Force):** Responsible for most Internet-related standards.
* **3GPP (3rd Generation Partnership Project):** Responsible for wireless communication protocols (GSM, CDMA, LTE).
* **ITU-T:** Responsible for protocols related to telephones.

### II.02 OSI Reference Model and TCP/IP Protocol Layer Structure

#### A) OSI Reference Model (7 Layers)

The OSI model describes the network communication process in seven layers.

| Layer | Protocol Examples | Function |
| :--- | :--- | :--- |
| **Application** | HTTP, SMTP, SNMP, FTP, Telnet, etc.  | Provides services for application programs, such as a user interface, email, and database management. |
| **Presentation** | JPEG, MPEG, XDR, etc.  | Supports the syntax of data exchanged between two systems; performs encoding/encryption. |
| **Session** | TLS, SSH, RPC, NetBIOS, etc.  | Responsible for communication sessions; establishes, maintains, and synchronizes interaction between devices. |
| **Transport** | TCP, UDP, SCTP  | Provides reliable message transfer between end-to-end processes, including error control. |
| **Network** | IP, IPX, ICMP, X.25, ARP, OSPF, etc.  | Supports packet transmission between networks from sending point to destination. |
| **Data Link** | Ethernet, token ring, wireless LAN, etc.  | Provides the function of transferring frames between hops without error. |
| **Physical** | Radio wave, optical fiber, PSTN, etc.  | Transfers the actual bits through physical media. |

#### B) TCP/IP Protocol Suite (Mapping to OSI)

The TCP/IP model consolidates the upper layers of the OSI model.

1.  **Application layer:** Corresponds to the OSI Application, Presentation, and Session layers.
    * **Example:** HTTP, DNS, Telnet, FTP, email protocols (SMTP/POP3/IMAP4).
2.  **Transport layer:** Responsible for data exchange between abstract ports, handled by applications using TCP, UDP, and SCTP.
3.  **Internet layer (Network layer):** Responsible for addressing and routing functions.
    * **Protocols:** IP, ICMP, IGMP, ARP (IP to MAC address conversion), and RARP (MAC address to IP conversion).
4.  **Network interface layer:** Corresponds to the OSI Data Link and Physical layers.
    * **Responsibility:** Sending/receiving TCP/IP packets through physical media (e.g., IEEE 802.3 Ethernet, 802.11 WiFi).

### II.03 Internet Address System

* **MAC address (Medium Access Control):** A physical or Ethernet hardware address (EHA) used to transfer frames between physically connected nodes. It is **48 bits long**.
* **IP address (Internet Protocol):** A logical address system used to transfer datagrams between two hosts/routers. IPv4 addresses are **32 bits**.
* **Port number:** A **16-bit** number used to transfer messages between two running processes (applications).
    * **Well-known ports (0 to 1023):** Allocated by IANA (e.g., HTTP port 80).
    * **Registered ports (1024 to 49,151):** Allocated by IANA.
    * **Dynamic ports (49,152 to 65,535):** Mostly used as a temporary number by clients.

---

## III. Operating System (OS)

The Operating System (OS) manages limited computer resources and provides services to users. This section covers OS functions (process, memory, file management), process/thread lifecycle, deadlock, memory management techniques, and virtual memory.

### III.01 Operating System (OS)

* **OS Definition:** System software that provides a computer resource interface to users or application programs by efficiently managing the limited resources of computer hardware.

#### B) Main Functions of OS

1.  **Process management:** Includes creating, disposing, and terminating processes, managing pre-processes, providing communication/synchronization techniques, and preventing deadlock.
2.  **Main memory unit management:** Tracking and managing memory space/users, deciding which process occupies space, and allocating/recovering memory space.
3.  **File management:** Handles creation/disposal of files and directories, provisioning primitive management, and mapping files to auxiliary memory unit.
4.  **Input/output system management:** Manages I/O devices (mouse, keyboard, printer).
5.  **Auxiliary memory unit management:** Handles storage allocation and disk scheduling.
6.  **Networking:** Manages distributed systems via the network by handling scattered programs.

#### C) Types of Main OS

| Category | OS Examples | Key Characteristics |
| :--- | :--- | :--- |
| **PC OS** | Windows, Mac OS  | Windows: stable, standardized GUI; Mac OS: optimized for Apple's hardware. |
| **Mobile OS** | Android, iOS  | Android: high openness, APK file installation; iOS: very secure, AppStore installation only. |
| **Server OS** | UNIX, Linux, Windows Server  | UNIX: multi-user environment, proprietary; Linux: open-source, lowest cost (Redhat/CentOS/Ubuntu types). |

### III.02 Process and Thread

#### A) Understanding of Process

* **Process:** Refers to a running program. It is a work unit that allocates and uses various resources.

**Process Status Change (Lifecycle)**
* **New:** Process is created but not running.
* **Preparing/Ready:** Process is waiting for CPU allocation.
* **Running:** Process has the CPU allocation.
* **Finished:** Process has completed its running, and CPU allocation is released.
* **Standby/Wait:** Process ran after getting CPU allocation but is waiting for an event (input/output completion).

* **Process Control Block (PCB):** Stores necessary process management information, including PID, status, program counter, scheduling priority, registered information, and main memory unit information.

#### C) Thread

* **Thread:** A basic unit for using a CPU, called a lightweight process. A process generally has one or more threads.
* **Detail:** Threads share the memory unit (code, data, files) but create their own register and stack. They require less CPU time for context exchange than processes because they share memory.
* **Multi-thread:** When a single process has multiple threads, allowing the CPU to occupy one thread at a time.

### III.03 Process Synchronization and Deadlock

#### A) Concept of Process Synchronization

Process synchronization is needed for protection when two or more parallel processes access and change the same data simultaneously (race condition).

#### B) Critical Section Problem

* **Critical Section:** A section of code where processes change data shared with other processes.
* **Required Conditions for Solving the Critical Section Problem:**
    1.  **Mutual exclusion:** Only one process can use the shared resource at a time.
    2.  **Progress:** Only processes not running in the remainder section can enter a critical section without delay.
    3.  **Bounded waiting:** Limits the time allowed for processes to enter the critical section.

#### D) Deadlock Status

* **Deadlock:** Occurs when multiple processes compete over limited resources, and a process requests an unavailable resource, resulting in perpetual blocking.
* **Conditions Causing Deadlock:**
    1.  **Mutual Exclusion:** Only one process can use the shared resource.
    2.  **Hold & wait:** Processes are requesting other resources while occupying current resources.
    3.  **Non-preemption:** Resource allocation cannot be forcibly released until completion.
    4.  **Circular wait:** Resource requests form a circular chain.

**Ways to Solve Deadlock State:**
* **Prevention:** Removes the deadlock causing conditions in advance.
* **Avoidance:** Does not remove the condition but avoids it.
* **Detection:** Allows the deadlock condition to occur and resolves it.
* **Recovery:** Restarts the deadlocked process or restores it to the original state.

### III.04 Memory Unit Management

#### B) Memory Unit Management Technique

1.  **Memory unit allocation technique:** Searches for the best way to allocate processes to the available main memory area.
    * **First-fit:** Allocates the memory unit using the first searched space. Increases fragmentation.
    * **Best-fit:** Allocates the memory unit using the smallest available space that can meet requirements.
    * **Worst-fit:** Allocates the memory unit using the largest available space.
2.  **Fragmentation problem:** Memory space is wasted after request/recollection.
    * **External fragmentation:** Memory is split into unusable small spaces.
    * **Internal fragmentation:** Memory is partitioned into a fixed size, and if a process needs less space, the remaining space is wasted.
3.  **Solving the fragmentation problem:**
    * **Compaction technique:** Merges small-sized available memory to remove external fragmentation.
    * **Coalescing technique:** Merges spaces with adjacent addresses in the unused empty space list to create a larger space.

### III.05 Scheduling

* **Purpose of scheduling:** Allocates processes to the CPU efficiently. Goals include maximizing throughput, minimizing response time, preventing system overload, and ensuring fairness.

#### B) Type and Characteristics of Scheduling

* **Preemptive scheduling:** CPU resources can be taken while another process is occupying them.
* **Non-preemptive scheduling:** CPU resources cannot be allocated to another process until the current task is completed.

**Types of Scheduling Algorithms (Examples)**

| Type | Method | Class |
| :--- | :--- | :--- |
| **FIFO (First In First Out)** | Allocates CPU in the order they are requested. | Non-preemptive  |
| **SJF (Shortest Job First)** | Allocates CPU to the process with the shortest expected job time. | Non-preemptive  |
| **SRT (Shortest Remaining Time)** | Allocates CPU to the process with the shortest expected remaining job time (SJF considered preemptive). | Non-preemptive  |
| **R-R (Round Robin)** | Allocates CPU resources according to a time slice, considered a preemptive FIFO process. | Preemptive  |
| **MLQ (Multi-Level Queue)** | Processes different jobs by time slice in each queue. | Preemptive  |

### III.06 Virtual Memory Unit

* **Virtual Memory:** A technique that solves the OS's limited memory space problem by using large-capacity auxiliary memory as main memory. The virtual memory unit is logically used.

#### A) Implementing a Virtual Memory Unit

* **Paging technique:** Partitions main memory into fixed-sized **frames**, and process storage into fixed-sized **pages**, which are loaded into the frame.
* **Segmentation technique:** Partitions process storage into logical units (**segments**), and then loads them into the memory unit.

#### B) Page Replacement Technique

Used when memory pages are full and free space must be created.

* **Optimal technique:** Replaces a page not likely to be used for the longest time (theoretical optimal replacement).
* **FIFO (First In First Out) technique:** Replaces the first loaded page.
* **LRU (Least Recently Used) technique:** Replaces the page that has been unused for the longest time.

#### C) Factors Affecting Virtual Memory Unit Performance

* **Locality:** Tendency for programs to reference a specific area intensively. Divided into temporal and spatial locality.
* **Working Set:** A set of frequently referenced pages.
* **Thrashing:** A phenomenon where CPU utilization rate decreases because page replacement takes longer than processing.

### III.07 File System

* **File system:** Stores related data to find and access OS data and programs quickly.
* **File attributes:** Include name, type, location, size, protection, time, and date/user identification.

#### C) Allocation by a File System

The OS's file system generally uses three methods for disk space allocation.

1.  **Contiguous allocation:** Arranges files as a set of contiguous addresses on the physical disk. Fast read speed, but creates external fragmentation.
2.  **Linked allocation:** Stores files in blocks and links each block to a list using pointers. Solves external fragmentation but access is slow.
3.  **Indexed allocation:** Manages all pointer data in an index block. Solves the problem of scattered block pointer addresses and does not create external fragmentation.

#### E) UNIX i-node

* **i-node (index node):** Component of the UNIX file system that handles allocation, application, creation, link, and deletion of file/directory data.
    * **i-node component:** Contains all the data of a file or directory, owner information, access information, file information, and type.
    * **i number:** An entry number of an i-node registered in the i-list.

---

## IV. Computer Architecture

Computer architecture is the conceptual design and operational structure that serves as the basis for computer systems. This section details basic computer structure, compares Von Neumann and Harvard architectures, describes the CPU, memory hierarchy, and I/O devices (including DMA).

### IV.01 Computer Structure and Architecture

#### A) Basic Computer Structure

The basic function of a computer is to run a program code in a specified sequence. Main components include:

* **Central Processing Unit (CPU):** Plays a key role in program running and data processing.
* **Memory:** Main memory (temporary, high speed) and auxiliary storage (secondary, low speed, mechanical devices).
* **I/O device:** Input and output devices for interaction.

#### B) Types of Computer Architecture

1.  **Von Neumann architecture:** Applies the stored-program design principle; instructions and data both use the same memory/bus. Read commands and write data are executed simultaneously because they use the same bus.
2.  **Harvard architecture:** Separates instruction memory and data memory. Improves performance by reading and writing commands in parallel, solving computer bottlenecks.

### IV.02 CPU

#### A) Definition of CPU

The CPU is the most important part of computers, interpreting instructions and handling arithmetic/logical operations and data processing.

#### B) CPU Execution

The CPU operation is divided into execution steps:
* Instruction fetch 
* Instruction decoding 
* Data fetch/processing/storage 

#### C) CPU Components

The CPU consists of a control unit, an arithmetic logic unit (ALU), registers, and buses.

* **Control unit:** Sequentially generates control signals to interpret and run program codes (instructions).
* **ALU (Arithmetic Logic Unit):** Executes arithmetic and logical operations.
* **Register:** Temporary storage area for instructions and intermediate results.
    * **Types:** PC (program counter), IR (instruction register), AC (accumulator), MAR (memory address register), MBR (memory buffer register), SP (stack pointer).
* **Bus:** Transmission lines for address data (**Address bus**), data transfer (**Data bus**), and control signals (**Control bus**).

#### D) Instruction Cycle

The entire process required for the CPU to execute an instruction. It consists of four parts:

1.  **Fetch cycle:** Fetches an instruction from memory.
    * **Related CPU Components:** PC, MAR, MBR, and IR.
2.  **Indirect cycle:** Reads the actual data address from the memory unit.
3.  **Execution cycle:** Decodes the instruction and performs the needed operation.
    * **Related CPU Components:** AC, ALU, and Control unit.
4.  **Interrupt cycle:** Inspects the interrupt request signal, stores the current PC data in the stack, and loads the ISA's beginning address.

#### E) Instruction Set Structure, CISC and RISC

| Feature | CISC (Complex Instruction Set Computer) | RISC (Reduced Instruction Set Computer) |
| :--- | :--- | :--- |
| **Instruction Type** | Many complex instructions embedded into hardware. | Few simple instructions embedded into hardware. |
| **Control Type** | Micro-program type control. | Hard-wired type control. |
| **Compiler** | Simple compiler. | Complex compiler. |
| **Registers** | Few registers. | Many registers. |
| **Instruction Length** | Variable instruction length. | Fixed instruction length (e.g., 32 bits). |
| **Example** | Intel series (x86). | ARM and MIPS. |

### IV.03 Memory

#### A) Memory Unit's Hierarchical Structure

Memory is organized hierarchically.

| Level (Highest to Lowest) | Price per Bit | Capacity | Access Time | Access Frequency by CPU |
| :--- | :--- | :--- | :--- | :--- |
| **Register** | Higher  | Lower  | Shorter  | Higher  |
| **Cache Memory** | | | | |
| **Main Memory** | | | | |
| **Auxiliary Memory** | | | | |

* **Hierarchy:** Register, Cache Memory, Main Memory, Auxiliary Memory.

#### B) Factors for Performance Evaluation

* Capacity, access time, cycle time, bandwidth of storage unit, data transportation, and cost.

#### E) Locality

The tendency for programs to intensively refer to a specific area in memory.

* **Temporal locality:** Recently accessed programs/data are likely to be accessed again soon.
* **Spatial locality:** Data stored adjacent to storage is likely to be accessed continuously.
* **Sequential locality:** Instructions are fetched and executed in order (about 20%).

### IV.04 I/O Device

#### A) Concept of I/O Device

A device necessary for input (storing data to be processed by the CPU) and output (transferring processing results from main memory).

#### C) DMA (Direct Memory Access)

* **Concept:** A method where the I/O device directly accesses the memory without the assistance of the CPU. The DMA controller handles the bus, and the I/O device handles memory transfer information.
* **Purpose:** Increases system efficiency for high-speed I/O devices by minimizing the interruption overhead.

**DMA Operation Mode**
1.  **Cycle stealing:** The fast CPU gives the slow DMA the priority of using the bus to enable fast inputs and outputs. Applied when transferring data of about one word.
2.  **Burst mode:** Applied when transferring data in blocks. Applicable to high-speed I/O devices.

### IV.05 Latest Technologies and Trends

* **Neuromorphic chip:** A new semiconductor type that processes information similar to human thinking by implementing brain behavior in silicon.
    * **Structure:** Employs several cores in a chip, with transistors and memory embedded into the core.
    * **Data Processing:** Performs parallel and integrated processing.
* **Quantum computer:** A new conceptual computer that can simultaneously process a large volume of information at high speed.
    * **Basic Unit:** Uses the quantum bit (**qubit**) as its basic unit of information processing.

---

## V. Data Processing Technology

This section covers technologies for high-performance and large-scale data processing, including parallel processing, storage technologies, disk scheduling, RAID, and graphic compression.

### V.01 Parallel Processing System

* **Parallel Processing:** One or more independent operating systems managing multiple processors and performing multiple tasks simultaneously.

#### B) Flynn's Classification

| Classification | Description |
| :--- | :--- |
| **SISD** (Single Instruction Stream Single Data Stream) | Conventional computer architecture (Von Neumann). |
| **SIMD** (Single Instruction Stream Multiple Data Stream) | Processing multiple data with a single instruction simultaneously. |
| **MISD** (Multiple Instruction Stream Single Data Stream) | Each processing unit runs different instructions and processes the same data; not widely used. |
| **MIMD** (Multiple Instruction Stream Multiple Data Stream) | Multiple processors process different programs and data (most computers fall into this category). |

#### C) Classification by Memory Structure

| Classification | Coupling Type | Memory Usage | Scalability | Programming Ease |
| :--- | :--- | :--- | :--- | :--- |
| **SMP** (Symmetric multiprocessor) | Tightly-coupled  | All processors use shared main memory. | Poor (due to bus bottleneck). | Easy to program. |
| **MPP** (Massive parallel processor) | Loosely coupled  | Each processor has independent memory and exchanges data via a network. | High. | |
| **NUMA** (Non uniform memory access) | Combines with SMP  | Shared memory. | Excellent. | Easier development. |

#### D) Types of Parallel Processor Technology

1.  **Instruction pipelining:** Improves CPU performance by dividing an operation into stages.
    * **Example:** Four-stage pipeline (Instruction Fetch (IF), Instruction Decoding (ID), Operand Fetching (OF), and Execution (EX)).
2.  **Superscalar process:** Allows execution of a number of instruction pipelines simultaneously using multiple pipelines.

#### E) Parallel Programming Technology

* **OpenMP (Open Multi-Processing):** A compiler directive-based parallel programming API. Uses the fork/join model where a master thread creates and executes threads.
* **MPI (Message passing parallel programming model):** Suitable for a distributed memory system. Nodes share information by transferring messages over the network.

#### G) GPU-based Parallel Programming Technology

* **CUDA (Compute Unified Device Architecture):** A parallel computing platform developed by NVIDIA for GPU development.
* **Open Computing Language (OpenCL):** An open, general-purpose parallel computing framework developed by Apple, IBM, Intel, and NVIDIA.

### V.02 Storage Technology

#### B) Connection of Storage Unit and Server

| Type | Connection Method | Key Characteristics |
| :--- | :--- | :--- |
| **DAS** (Direct attached storage) | Connected directly to the computer system (server) via a fiber channel or SCSI cable. | Low cost, simple, high speed. |
| **NAS** (Network attached storage) | Connected to a computer system through an Ethernet network interface (LAN or WAN). | Managed by a separate file system management server, easy to manage/share data. |
| **SAN** (Storage area network) | Uses a dedicated fiber channel switch to provide a fast connection between connected servers and storage. | Enables scaling up the number of connected servers/storage. |

#### C) IP-SAN

Uses gigabit Ethernet Internet protocol (IP) instead of a fiber channel.
* **Types:** FCIP (Fiber Channel over IP), iFCP, and iSCSI.
* **iSCSI:** Encapsulates SCSI commands into IP packets for transfer and reduces network storage implementation cost.

#### D) Storage Capacity Management

* **Thin provisioning:** A storage virtualization technology that allocates data by mapping actual data space into a thin LUN (Logical Unit Number).

#### E) Storage Disk Scheduling

* **Purpose:** To efficiently process I/O requests. Goal: Maximization of throughput and minimization of response time.

**Scheduling Techniques (Examples)**

| Technique | Method | Advantages/Disadvantages |
| :--- | :--- | :--- |
| **FCFS** (First Come First Serve) | Serves requests in the order they are received. | Simple, but movement may be inefficient. |
| **SSTF** (Shortest Seeking Time First) | Serves requests closest to the current head position. | Minimizes head movement, maximizes service response rate. Can cause starvation. |
| **SCAN** (Elevator algorithm) | Serves all requests in one direction until reaching the end of the cylinder, then reverses. | |
| **C-SCAN** (Circular SCAN) | Moves the head in one direction only; when it reaches the end, it moves to the initial position without serving requests. | |

### V.03 High Availability Storage

#### A) Redundant Array of Independent Disks (RAID) Technology

RAID improves reliability, capacity, and speed by arranging storage devices in an array.

| RAID Level | Description | Key Characteristics |
| :--- | :--- | :--- |
| **RAID-0** | Striped disk array without fault tolerance. | No redundancy; I/O speed is excellent. |
| **RAID-1** | Mirroring and Duplexing (redundantly stores data on two drives). | Data redundancy; reduces reading performance somewhat, writing is slow. |
| **RAID-5** | Parity across disks (distributes the load of the drive that stores the parity). | Requires at least three drives; highly effective in cost and performance. |
| **RAID-6** | Stripe with dual distributed parity. | Stores two parity bits, increasing redundancy over RAID-5. |
| **RAID-10** | Striping & Mirroring (Combination of RAID-0 and RAID-1). | Requires at least four drives. |

#### B) Backup Storage: LTO and VTL

* **LTO (Linear tape-open):** A standard open tape drive technology supporting high-speed data processing and large capacity.
* **VTL (Virtual tape library):** A backup solution that emulates disk storage into a virtual tape device to compensate for tape problems.

### V.04 Graphic Compression Technology

#### A) Graphic Compression Type

| Type | Description | Techniques |
| :--- | :--- | :--- |
| **Lossless compression** | Preserves the original data integrity (no loss). | Run-length encoding (RLE), dictionary coding, Huffman coding, and arithmetic coding. |
| **Lossy compression** | Compresses data by allowing the loss of redundant or unnecessary data. | Prediction coding and transformation coding (e.g., JPEG uses DCT). |

#### B) Multimedia Data

* **MPEG (Moving Picture Experts Group):** An international standardization organization that officially defines compression formats and standards.
    * **MPEG-1:** Audio and video compression (used for MP3 and video CD).
    * **MPEG-2:** Compression for DTV (Digital TV and DVD).
    * **MPEG-4:** Mobile phone video compression.
* **AVC codec (H.264):** Video compression technology jointly proposed by the ITU-T and ISO. HEVC is the standard name for H.264.

---

## VI. Embedded System

An embedded system is a computer system designed to perform a specific function for controlling a machine or electronic device, configured with hardware and specialized software.

### VI.01 Overview of Embedded System

* **Embedded System:** A computer system that performs a specific function for controlling a machine or other electronic device.
* **Configuration:** Consists of **Embedded Hardware** (CPU, memory, I/O device, network device) and **Embedded Software** (OS and application software).

#### B) Characteristics of Embedded System

* **Low cost:** Mass-produced, often using a relatively slow processor and small memory.
* **Low performance:** Usually slow due to the design goal of reduced size and cost.
* **Stability:** Designed to run reliably without error for many years (firmware goes through stringent testing).
* **Resilience:** Applied in places difficult for humans to access. Often includes a watchdog timer for emergency recovery.
* **Resource constraints:** Operates with limited hardware resources (no disk drive, limited memory).

#### C) Embedded System Development Process

The development includes a hardware development process. Stages involve:

1.  Product planning (commercial feasibility determination, specifications).
2.  Part selection (hardware parts, OS/software specifications).
3.  Hardware circuit generation and software structure design.
4.  Code design for each artwork module.
5.  Making the PWB (printed wiring board) and installing modules.
6.  Part mounting and hardware testing.
7.  Integrated testing and debugging.
8.  Mass-production testing.
9.  Quality inspection.
10. Specification inspection such as EMI and safety.
11. Product shipment.

### VI.02 Embedded Hardware

#### A) Microprocessor, the Key to Embedded Systems

* **Microprocessor Unit (MPU):** Performs arithmetic/logical operations and data storage.
    * **Types:** ARM, PowerPC, MIPS series. ARM CPUs are widely used.

#### B) Technical Trends of Embedded Hardware

* **Expanded connectivity:** Studies applying WIFI, LTE, BLE, and ZigBee.
* **Low-power 32-bit processor:** Processors for embedded systems are transitioning from 8 bits to 32 bits.
* **Polarization of lightweight/general-purpose OS:** Systems require lighter power consumption, enabling complex operations applied to 3D acceleration GUI and multimedia.

### VI.03 Embedded Software

* **Embedded Software:** Software installed in embedded systems.
    * **Classification:** Basic embedded application, embedded middleware (JVM, CORBA), embedded system software (Embedded OS, device driver).

#### B) Characteristics of Embedded Software

* **Reactivity:** Continuously interacts with physical environmental changes by converting input data into output data at a specified speed.
* **Timeliness:** Time to convert input data into output data must be within a very short allowable range.
* **Concurrency:** Able to process input data generated by concurrent physical environmental changes.
* **Heterogeneity:** Effectively processes data from hardware or software.
* **Liveness:** Should never stop its operation, even after unexpected events.
* **Resource and environmental constraints:** Must meet the resource (CPU speed, memory size, I/O interface) and environmental constraints.

### VI.04 Embedded OS

* **Embedded OS:** An operating system optimized to execute application programs running on an embedded system with a built-in microprocessor.

#### B) Embedded OS Structure

The embedded OS has a structure supporting stable execution with a low-specification processor, limited memory, and storage space.

#### C) Types and Trends of Embedded OS

1.  **RTOS (Real Time OS):** Focuses on controlling application programs or hardware affected by a limited amount of time.
    * **Examples:** VxWorks, VRTX, QNX, pSOS.
2.  **Non-real time OS:** Focuses on development convenience, scalability, and diverse operating environments.
    * **Examples:** Linux series, embedded Windows XP, Windows CE.
* **Trends:** Linux is the leading OS, with Embedded Linux having the highest usage rate (22%).

---

## VII. Information System Implementation

This section details the implementation of information systems, focusing on system structure (hardware, software, middleware) and the critical process of capacity calculation (sizing). It also covers modern infrastructure trends like Hyper-Converged Infrastructure (HCI).

### VII.01 Information System Structure

* **Information System:** Uses IT to perform business procedures, requires necessary information, and creates a system that enables IT personnel to provide IT services.
* **IT Infrastructure Components:** Networks, hardware, software, IT personnel, and IT services.

#### B) Information System Structure

Information systems are generally composed of a 3-tier web system architecture or a client-server system. The system is divided into physical areas (hardware) and program areas (software).

**1. Information System Hardware Structure (Physical Domain)** 

| Classification by Performance | Classification by Configuration |
| :--- | :--- |
| **Entry server** (1-2 CPUs)  | **Rack-mount server** (fits into a rack)  |
| **Middle-range server** (4 or more CPUs, high-end servers)  | **Tower server** (in-house server room)  |
| **High-end server** (tens of millions of won, enterprise server)  | **Blade server** (multiple CPU blades in a box, small size)  |

**2. Information System Software Structure (Program Domain)** 

* **OS:** System software that operates and manages applications (e.g., Linux, UNIX, Solaris).
* **Webserver:** Provides media content through the HTTP protocol. Leading products include Apache, Nginx, and IIS.
* **Web application server (WAS):** Middleware enabling stable transaction processing of web client requests. Handles database queries or business logic. Leading products include Tomcat, JBoss, WebLogic.
* **Transaction processing (TP) monitor:** Middleware that supports distributed transaction processing. Leading products include Tmax and Tuxedo.
* **DB server:** Provides database type, management technology, and query language.

### VII.02 Information System Capacity Calculation

* **System Sizing (Capacity calculation):** Estimating/calculating a system's size using a mathematical methodology, based on actual work and applications.

#### B) Size Calculation Targets

Targets generally include hardware and network components.

* **CPU:** Calculates the CPU size needed to process necessary tasks and achieve adequate performance.
* **Memory:** Calculates memory usage by software and applications based on server configuration.
* **Disk/Storage:** Calculates disk size by target system type (OLTP, Web/WAS) and the needed storage size according to the CPU type.

#### D) Size Calculation Procedure

1.  Implementation direction and reference data investigation.
2.  Basic data and task analysis.
3.  Reference model determination and server size calculation.
    * **Reference Model 1 (1-Tier):** Web, application, and database layers exist in a single server.
    * **Reference Model 3 (3-Tier):** Web layer on Server 1, application layer on Server 2, and database layer on Server 3.
4.  Application of weight factor for each reference model.

### VII.03 Latest Technology and Trends of Information Systems

* **Converged Infrastructure (CI):** Integrates hardware components (servers, storage, network) and software into single SKUs.
* **Hyper-Converged Infrastructure (HCI):** A newer type of integrated system that eliminates the limitations of CI. HCI groups the direct attached storage (DAS) and uses software-defined storage (SDS) technology through an IP-based network.

---

## VIII. Fault Response Technology

Fault response technology ensures system service continuity despite failures. Key concepts are High Availability (HA) and Disaster Recovery System (DRS).

### VIII.01 High Availability (HA)

* **Concept of HA:** Refers to an uninterrupted service. Requires configuring two or more systems using redundancy.
* **Availability (A) Calculation Formula:** $A=\frac{\text{MTBF}}{(\text{MTBF}+\text{MTTR})}$ (MTBF: Mean Time Between System Failures, MTTR: Time to Restore).

| HA Configuration Type | Description | State of Servers |
| :--- | :--- | :--- |
| **Hot standby** | An active server and a standby server are used. Service switches to the standby server upon active server failure. | Active-standby  |
| **Mutual takeover** | Two or more operating systems run on separate servers. Services switch to the designated server upon failure. | Active-active  |
| **Concurrent access** | Multiple systems process tasks in parallel to provide availability. | All servers operate in an active state. |

### VIII.02 Fault-Tolerant System

* **Fault-tolerant system:** Can continuously perform functions even if a component fails.
* **Hardware tolerant technique examples:** Triple modular redundancy, RAID (through disk mirroring and distributed storage of parity bits).
* **Software tolerant technique examples:** Checkpoint, Recover block, Conversation, Distributed rollback.

### VIII.03 Disaster Recovery System (DRS)

* **Definition of DRS:** An overall plan to minimize the impact of a disaster by locating all or part of the information system infrastructure in a remote location.

#### DR Center Types

| DR Center Type | RTO (Recovery Time Objective)  | State / Details |
| :--- | :--- | :--- |
| **Mirrored site** | Immediate  | Real-time simultaneous services in active-active state. |
| **Hot site** | Within 4 hours  | Active/standby state, synchronous/asynchronous real-time mirroring. |
| **Warm site** | Days - weeks  | Transferring critical components to the DR center. |
| **Cold site** | Weeks - months  | Only keeping minimal resources. |

* **Disaster recovery goal:** Measured by RTO and RPO.
    * **RPO (Recovery Point Objective):** Data loss converted into time at the time of disaster.
    * **RTO (Recovery Time Objective):** Maximum time allowed to downtime.

---

## IX. Cloud Computing Technology

Cloud computing provides on-demand IT resources over the Internet, emphasizing virtualization, immediacy, and linear scalability.

### IX.01 Definition of Cloud Computing

* **Cloud Computing:** A computing environment that uses IT resources over the Internet, based on virtualization and distributed processing.
    * **Benefits:** Reduced CAPEX/OPEX, reduced development time/risk, improved efficiency/resource usage, better product integration.
* **Comparison to Grid Computing:** Grid Computing is scattered and managed by different organizations (heterogeneous), while Cloud Computing is scattered but managed by a central organization (mostly same model).

### IX.02 Cloud Computing Types

#### A) Classification According to the Service Type

| Service Type | Description | Example |
| :--- | :--- | :--- |
| **IaaS** (Infrastructure as a Service) | Provides infrastructure resources (server, storage, network). Can provide non-virtualized physical infrastructure (bare-metal cloud). | |
| **PaaS** (Platform as a Service) | Provides infrastructure, runtime, development/operation environment. | A user developing a new Java web application using MySQL as a database. |
| **SaaS** (Software as a Service) | Provides software and a model that delivers software serviced from the center to users. | Google Docs and Salesforce.com. |

#### B) Classification According to the Cloud Operation Form

* **Public cloud:** Cloud services disclosed to unspecified masses over the Internet.
* **Private cloud:** Cloud services implemented over the closed network by enterprises.
* **Hybrid cloud:** Services using both public and private cloud services.

### IX.03 Server Virtualization Technology

* **Virtualization:** Technology of abstracting computer resources of multiple computers to make them look like servers (or abstracting resources to make one computer look like multiple machines).

#### A) Hypervisor

* **Hypervisor (Virtual Machine Monitor, VMM):** A technology of virtualizing a physical server. It is a logical platform for server virtualization.

#### B) Hypervisor Types

1.  **Native type (Type 1):** Installs a VMM on physical hardware and requires no host OS.
    * **Example:** Xen, Hyper-V, KVM.
2.  **Hosted type (Type 2):** Software installed on an existing OS.
    * **Example:** VirtualPC, VirtualBox.

#### C) Server Virtualization Methods

1.  **Full virtualization:** Completely virtualizes the hardware. The guest OS perceives that it owns and accesses the hardware directly. No restrictions on the guest OS.
2.  **Para-virtualization:** Does not completely virtualize the hardware. Uses a hypervisor API to access hardware resources.
3.  **OS-level virtualization (Container virtualization):** Uses the virtualization technology included in the OS, instead of a hypervisor.
    * **Advantages:** Quick start, minimized resource consumption, low overhead.
    * **Disadvantage:** Host OS dependent; cannot configure the kernel for each container.
    * **Example:** Solaris Containers, Linux Containers (LXC), Docker.

### IX.05 Cloud Platform

* **Cloud platform:** A cloud operation system to collect, control, and operate resources.
    * **OpenStack:** Open-source project for building public/private cloud computing platforms.
    * **Kubernetes:** An orchestration platform for container management and operation.
    * **Mesos:** A resource management project that enables integrated management of cloud infrastructure resources.

---

## X. Big Data System

This section focuses on the Big Data System (BDS) architecture, particularly the Hadoop ecosystem.

### X.01 Big Data System Structure

#### A) Hadoop Ecosystem

* **Hadoop:** A Java-based framework for the distributed processing of a large volume of data in multiple distributed storage. It uses HDFS (Hadoop Distributed File System) and MapReduce.

#### B) Hadoop's Main Technology Elements

1.  **HDFS (Hadoop distributed file system):** A distributed file system that stores data in devices connected to the Hadoop network.
    * **Characteristics:** Prevents data loss by storing replicated data in multiple nodes. Ensures data integrity (Version 2.0 or higher allows appending to the saved file).
    * **Architecture:** Consists of one **NameNode** (server managing all metadata) and multiple **DataNodes** (servers storing the blocks).
2.  **MapReduce:** A programming model and software framework for processing a large volume of data.
    * **Map:** Classifies scattered data into relevant data (key or value type).
    * **Reduce:** Removes duplicate data and extracts the desired data.

#### C) Hadoop Support Program

| Type | Program Examples | Description |
| :--- | :--- | :--- |
| **Streaming data collection** | Flume, Scribe, Chuckwa. | |
| **Structured data collection** | Sqoop, Hiho. | |
| **Distributed database** | Hbase, Cassandra. | Hbase is a Hadoop-based column-based NoSQL database. |
| **Real-time query** | Impala. | Hadoop-based real-time SQL query system. |
| **Metadata management** | HCatalog. | |
| **Data analysis** | Hive, Pig. | Hive is similar to SQL-based processing; Pig provides a proprietary language (Pig Latin). |

---

## XI. Datalink Layer

The Datalink Layer (Layer 2 of OSI) is responsible for transferring data between peripheral devices using the physical layer. This layer handles encapsulation, MAC address allocation, and error detection/correction.

### XI.01 Concept of Datalink Layer

* **Datalink Layer:** Transfers data between peripheral devices on the network using the physical layer. It ensures devices receive signals properly and detects/corrects errors in transmitted signals.

### XI.02 Encapsulation of the Datalink Layer

* **Encapsulation:** The datalink layer frame adds a header and a trailer to the network layer packet. The reverse is called decapsulation.
* **Frame header and trailer:** The header includes a preamble for bit synchronization, and the trailer includes a frame check sequence (FCS) to check for errors.

### XI.03 Datalink Layer Configuration

The datalink layer consists of two sub-layers: **LLC (Logical Link Control)** and **MAC (Media Access Control)**.

#### B) Logical Link Control (LLC)

* **Role:** Responsible for data transfer between two adjacent nodes, using DSAP and SSAP on the network layer.
* **LLC options:** Type 1 (unconfirmed datagram), Type 2 (connection-oriented, like TCP), Type 3 (confirmed datagram).

#### C) MAC

* **MAC sub-layer:** Responsible for determining how to transfer data through physical media. Includes the **MAC address** (48-bit unique system).

### XI.05 Techniques of Datalink Layer Error Detection and Correction

#### A) Concept of Error Control

* **Error Control:** The function of guaranteeing data transmission integrity.
* **FEC (Forward Error Correction):** The receiving device detects and corrects errors by transmitting a spare bit.
* **BEC (Backward Error Correction):** Notifies the transmitting device to recover from the error.

#### B) Error Detection and Correction Methods

| Method Type | Techniques | Description |
| :--- | :--- | :--- |
| **Error detection methods** (Use redundancy)  | VRC (Vertical Redundancy Check)  | Most widely used, includes parity check. |
| | LRC (Longitudinal Redundancy Check)  | Collecting the even parity of all bytes. |
| | CRC (Cyclic Redundancy Check)  | Detection method using binary division. |
| | Checksum  | Used by higher-level protocols. |
| **Error correction methods** | Single bit error correction  | Uses the principle of error correction to locate the wrong bit, called a parity bit. |
| | Redundant error correction  | Adjusting the relationship between data bits and redundant bits. |
| | Hamming code  | Finding the redundant bit position. |
| **Automatic repeat request (ARQ)** | Stop-and-wait ARQ, Go-back-N ARQ, Selective-repeat ARQ, Adaptive ARQ. | Receiving side informs sending side of error; sending side retransmits the frame. |

### XI.06 IEEE 802 Standard

The IEEE 802 defines services for each layer adjoining the LLC sub-layer.

* **IEEE 802.3 standard:** Corresponds to the LLC layer and MAC layer that includes Ethernet, token ring, and FDDI.
* **IEEE 802.11 standard (Wi-Fi):** Wireless communication standardization committee for wireless LAN. Uses DSSS modulation.
* **IEEE 802.15 standard:** Short-range wireless communication standardization committee.
    * **Types:** Bluetooth (voice/file transfer), UWB (multimedia), ZigBee (sensor communication).

---

## XII. Network Layer

The Network Layer (Layer 3 of OSI) is responsible for efficient data transmission using IP-based packets. This section covers network layer functions, internetworking equipment, routing, and IPv4/IPv6 addressing.

### XII.01 Network Layer Overview and Equipment

* **Network Layer:** The third layer of the OSI 7 model, sending packets from a transmitting side to a receiving side.
* **Network layer function:**
    * **Packetizing:** Encapsulating and decapsulating the payload.
    * **Routing:** Finding the optimal communication path to the destination.
    * **Forwarding:** Performs the action when a packet has arrived through an interface.

**Internetworking Equipment**
* **Repeater:** Device that enhances (amplifies or reproduces) signals.
* **Bridge:** Device that connects two LANs.
* **Switch:** Device that has the concept of a multi-port bridge (separates network based on MAC address).
* **Router:** Device that finds the optimal communication path when connecting to a heterogeneous network.

* **VLAN (Virtual local area network):** A method of configuring a logical network, allowing users to overcome physical and regional constraints.

### XII.02 Network Layer Encapsulation

* **Network layer encapsulation:** Configures the packets by adding a header to the transmitting layer segment.
* **IPv4 header:** Includes Version, IHL, Type of Service, Total length, Identification, Flags, Fragment Offset, Time to Live (TTL), Protocol, Header Checksum, Source Address, and Destination Address.

### XII.03 Packet Switching and Network Layer Protocol/Instruction

* **Packet switching:** The method of finding the packet path in a packet-exchanging network.
* **Network layer protocols:**
    * **ARP** (Address Resolution Protocol): Converts an IP address into a MAC address.
    * **RARP** (Reverse Address Resolution Protocol): Converts a MAC address into an IP address.
    * **ICMP** (Internet Control Message Protocol): Reports error and control information.
    * **IGMP** (Internet Group Management Protocol): IP multicasting.

### XII.04 Network Service Quality (QoS)

* **Quality of Service (QoS):** Technology guaranteeing service quality and performance of communication service.
* **Attributes:** Confidence, Delay, Jitter, Bandwidth.
* **Quality implementation technique:**
    * **Scheduling:** FIFO, Priority, Weighted fair queuing.
    * **Traffic shaping/policing:** Leaky bucket, Token bucket.
    * **Service quality models:** Integrated service (IntServ) and Differentiated service (DiffServ).

### XII.05 Routing Protocol Algorithm and Type

* **Routing algorithm:** Finds the low-cost path between a source router and a destination router in a graphical network.

#### Routing Algorithm Types

| Type | Description | Example Algorithm |
| :--- | :--- | :--- |
| **Link state routing** | Each router calculates the low-cost path to all destinations with the configuration and link-state information of the entire network. | Dijkstra algorithm. |
| **Distance vector routing** | Each router maintains the low-cost path table (vector) to all destination routers. | Bellman-Ford algorithm. |

#### Routing Protocol Types

| Type | Sub-Type | Protocol Examples | Usage |
| :--- | :--- | :--- | :--- |
| **Static Routing** | Fixed routing information. | | |
| **Dynamic Routing** | **IGP** (Interior Gateway Protocol - Used within an AS)  | **Distance Vector:** RIP, IGRP. **Link State:** OSPF, IS-IS. | Within an Autonomous System (AS). |
| | **EGP** (Exterior Gateway Protocol - Used between ASs)  | BGP (Border Gateway Protocol). | Between ASs. |

### XII.07 IPv4 Address Designation System and Subnetting

* **IPv4 address:** A 32-bit address.
* **IPv4 designation system (Classes):** Divided into Classes A, B, C, D (multicast), and E (experimental) based on the network size.
    * **Class A:** Network ID is first octet (1.0.0.0 ~ 126.255.255.255).
    * **Class C:** Network ID is first three octets (192.0.0.0 ~ 223.255.255.255).
* **Special IPv4 address:** Includes network address (0.0.0.0), limited broadcast (255.255.255.255), and private addresses (10., 172.16-31., 192.168.).
* **Subnetting:** Dividing a given IP address into multiple smaller networks. A subnet mask is used to separate the network address.
* **CIDR (Classless Inter-Domain Routing):** Combining multiple Class C addresses into a network to reduce routing table size and prevent wasted IP addresses.
* **Supernetting:** Opposite of subnetting, consolidating several small networks into one large network.
* **DHCP (Dynamic Host Configuration Protocol):** Protocol for dynamically allocating IP addresses, default gateway, and lease period.
* **NAT (Network Address Translation):** Connects internal network private addresses to external public networks.

### XII.08 IPv6 Overview

* **IPv6 (Internet Protocol Version 6):** The next-generation Internet protocol with a **128-bit** addressing system. It provides security functions like address depletion solution.

### XII.09 IPv6 Addressing System and Header Structure

* **IPv6 addressing system:** 128 bit long, expressed in hexadecimal.
* **IPv6 header structure:** Includes Version, Traffic class, Flow Label, Payload length, Next Header, Hop Limit, Source Address, Destination Address.

---

## XIV. Transport Layer Protocol

The Transport Layer (Layer 4 of OSI) is responsible for end-to-end communication between hosts. Major protocols are TCP (reliable), UDP (fast), and SCTP (combines advantages).

### XIV.01 Concept of Transport Layer Protocol

* **Transport layer protocols:** Transmit application data between end-point hosts.
* **Major protocols:** TCP, UDP, and SCTP.

### XIV.02 TCP

#### A) Characteristics of TCP

* **TCP (Transmission Control Protocol):** A stream-based protocol providing connection establishment and reliable data transfer.
* **Reliability:** Achieved through techniques like sequence number and acknowledgment number check.
* **Flow control:** Controls the packet flow volume to prevent packet loss.
* **Error control:** Detects error codes, retransmitting lost packets.
* **Congestion control:** Occurs when network load reduces the number of packets transmitted.

#### B) Virtual TCP Operation Scenario

* **TCP connection setting (3-way handshake):**
    1.  Sender sends segment with **SYN** flag set.
    2.  Receiver sends segment with **SYN** and **ACK** flags set.
    3.  Sender sends segment with **ACK** flag set, establishing a bidirectional connection.
* **TCP connection termination:** Uses the **FIN** (Finish) segment.
* **Flow control:** Uses the **sliding window protocol**. Maximum window size is 65,535 bytes.
* **Congestion control:** The **slow start algorithm** exponentially increases the congestion window size.

### XIV.03 UDP (User Datagram Protocol)

* **Characteristics of UDP:** A **connectionless service** for sending/receiving data without a pre-configuration process.
* **Details:** It is an independent datagram and does not assign a sequence number; error/flow/congestion control generally does not occur.
* **Usage:** Used for video play, voice transmission, multicast communication.

### XIV.04 SCTP (Stream Control Transmission Protocol)

* **Characteristics of SCTP:** A new transport layer protocol combining UDP and TCP advantages.
    * **Features:** Process-to-process communication, multi-stream service, allowed connection on each terminal. Supports multi-homing.
    * **Reliability:** Connection-oriented and uses acknowledgment to confirm data arrival.

---

## XV. Application Layer Technologies, Including Web Application

The Application Layer (Layer 7 of OSI) provides network application services and protocols.

### XV.01 What is Application Layer Protocol?

* **Application Layer Protocol:** Protocols used to exchange necessary information between application programs.
* **Examples:** FTP, Telnet, SMTP, POP3, IMAP4, HTTP.

### XV.02 HTTP

* **HTTP (Hypertext Transfer Protocol):** An application layer protocol for hypermedia information systems that connects text, video, and audio files. Used for transferring web contents since the early 1990s.
* **HTTP status codes:**
    * **200 (OK) or 206 (Partial Content):** Request processed successfully.
    * **Codes starting with 4 or 5:** Indicate client/server errors.
* **HTTP Methods:**
    * **GET:** Used mainly to search for content in the server.
    * **POST:** Used mainly to deliver user input information.

### XV.03 File Transfer Protocol

* **FTP (File Transfer Protocol):** A protocol for transferring a file or part of a file from one system to another. Uses ports 21 (control connection) and 20 (data connection).

#### Comparison of General Transfer Mode and Passive Transfer Mode

| Type | General Transfer Mode (Active) | Passive Transfer Mode |
| :--- | :--- | :--- |
| **Concept** | Data transfer by a server connecting to the client's specific port. | Data transfer by a client connecting to the server's specific port. |
| **Data Port** | Control port: 21, Data port: 20. | Control port: 21, Data port: 1024 or higher. |


