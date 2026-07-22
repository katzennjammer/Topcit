# Software Engineering Overview

## I. Software Engineering Overview

### Summary:
Software engineering is crucial for systematic software development and management, driven by rapid growth, complexity, and increasing scale across industries. This section defines software engineering, its key elements, and fundamental software development lifecycle models and methodologies.

### I.01 Background to and Purpose of Software Engineering

**Key Concepts and Definitions:**
*   **Software Engineering:** A discipline that studies the overall life cycle of software (development, operation, maintenance) systematically, descriptively, and quantitatively.
    *   **Purpose:** To successfully develop highly functional and large-scale software, and to apply systematic management, planning, analysis, and maintenance techniques.
    *   **Goal:** To produce high-quality software and deliver it according to a given cost and schedule.

**Four Key Elements of Software Engineering:**
1.  **Method:** Outlines tasks like project planning, estimation, analysis, data structure, algorithm design, coding, testing, and maintenance. Can be language-centric (e.g., object-oriented method) or graphical.
2.  **Tool:** An automated or semi-automated means to improve productivity or consistency while performing a task.
3.  **Procedure:** A combination of a method and a tool used to develop software rationally and timely. Defines the applied method, deliverables, and the sequence of milestones.
4.  **People:** Employees and organizations specializing in software engineering.

### I.02 Lifecycle of Software Development

**Key Concepts and Definitions:**
*   **Lifecycle:** Refers to the entire process of software development, from understanding user environment/problems to operation and maintenance.
*   **General Software Life Cycle Flow:**
    1.  Feasibility review
    2.  Development planning
    3.  Requirements analysis
    4.  Design
    5.  Implementation
    6.  Test
    7.  Operation
    8.  Maintenance activities
*   **Purposes of the Lifecycle:** To calculate project costs, standardize terms, draw up a development plan, and manage the project.

**Types of Software Lifecycle Models:**

| Model                      | Details                                                                                                                                                                                                                                                  | Example                                                                                                    |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| **V model**                | Clearly shows activities performed during implementation. Emphasizes project verification and validation and explains the relationship between development activities (design, implementation) and corresponding test activities.                        | A project involving the implementation of a standard communication protocol could apply the V model.       |
| **V model with prototyping** | A method for developing a system or part of a system to understand and solve risks or uncertainties. Can be applied to the development phase of the Waterfall or V model, or used as an independent lifecycle model.                                       | **General procedure for prototyping:** 1. Define uncertainty factors. 2. Seek a solution. 3. Apply the solution (reiterate). 4. Find the cause of uncertainty. |
| **Incremental model**      | Useful when development time needs to be reduced. Core parts are developed first to make the system operable, then the rest of the functions are extended iteratively.                                                                                       |                                                                                                            |
| **Evolutionary model**     | Useful when development time needs to be reduced. The development phase for the entire system is reiterated multiple times. Changes include modifications to functions, user interface, and non-functional items.                                       |                                                                                                            |

### I.03 Software Development Methodology

**Necessity of the Methodology:**
*   Improving development productivity by accumulating and reusing development experience.
*   Effective project management.
*   Providing a means of communication.
*   Assuring quality at a certain level.

**Comparison of Methodologies (Characteristics):**

| Methodology                    | Overview/Focus                                         | Key Characteristics                                                                                                        |
| :----------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Structural methodology**     | Focusing on business activities.                       | Principle of divide and conquer; centered on program control flow; structured with controllable modules.                   |
| **Information engineering methodology** | Focusing on data.                                      | Emphasis on data modeling; program logic depends on data structure (CRUD).                                                 |
| **Object-oriented methodology** | Identifies relationships between objects and classes. | Evolution of the object methodology; emphasis on data and logic integration; reuse by inheritance.                         |
| **CBD methodology**            | Develops or consumes reusable commercial components.   | Emphasis on interface specification; management aims to reuse black box components.                                        |

**Software Development Phases:**
1.  **Requirements analysis:** Practical first step, critical for reducing development time and preventing errors.
2.  **Design:** Conceptual step following requirements analysis. Determines the structure of the system and sub-systems.
3.  **Implementation:** Goal is to program to satisfy the design specification. Deciding on a coding standard is a major task.
4.  **Testing:** Inspects and evaluates whether the system satisfies prescribed requirements, ensuring software quality.

### I.04 Agile Development Methodology

**A) Types of Agile Methodologies:**
*   Scrum and Extreme Programming (XP) are the most widely adopted agile methodologies.
*   Other main agile methodologies include Lean software development methodology and Agile Unified Process (AUP).

**B) Agile development methodology - XP (Extreme Programming):**
*   **Definition:** A lightweight development methodology established in the late 1990s, suitable for small and medium-sized development organizations.
*   **XP Values:**
    *   **Communication:** Most important; problems solved by strong communication between customers, developers, and managers.
    *   **Simplicity:** Keeping the design simple and clearing unnecessary complexity.
    *   **Feedback:** Gradual improvement by considering yesterday's output.
    *   **Courage:** Coping with changes and delivering the solution quickly.
    *   **Respect:** The value behind the first four.
*   **Example: XP Basic Practices (Development):**
    *   **Simple design:** Keep the design as simple as possible to meet current requirements.
    *   **Test-driven development (TDD):** Write tests first, then code, and automate tests.
    *   **Refactoring:** Design existing code by eliminating duplication and complexity.
    *   **Pair programming:** Two developers work on a computer together.

---

## II. Software Reuse

### Summary:
Software reuse involves developing new software using existing software or knowledge to improve productivity and quality while reducing costs. Reverse engineering is related, as it deconstructs developed systems to reveal documentation and design.

### II.01 Software Reuse

**A) Overview of Software Reuse:**
*   **Software Reuse Definition:** Means to develop new software using existing software or knowledge. Reusable knowledge/software is a reusable asset.
*   **Purpose of Software Reuse Goals:**
    *   **Responsibility:** Performance (functions, stability, speed) has already been proven.
    *   **Scalability:** Easy to upgrade based on proven functions.
    *   **Productivity:** Improvement of the overall development process (cost, time, risk).
*   **Target of Software Reuse:**
    *   General knowledge (Environmental information, External knowledge).
    *   Design information (System/system architecture/system design).
    *   Data information (System data, Test cases).
    *   Program code (Module, Program).
    *   Others (Cost benefit analysis, User documentation, Feasibility studies, Prototypes).

**C) Principle of Software Reuse:**
1.  **Generality:** Software should be generally reusable, not designed for a specific application area.
2.  **Modularity:** Should have minimum coupling and maximum cohesion.
3.  **Hardware independence:** Should be independent of execution hardware as much as possible.
4.  **Software independence:** Should be independent of the OS or DBMS.
5.  **Self-documentation:** Accurate function, usage, and interface of the module should be described.
6.  **Commonality:** Should be commonly needed and usable by many developers.
7.  **Reliability:** Reused software should be reliable during use.

### II.02 Reverse Engineering

**A) Definition of Reverse Engineering:**
*   **Reverse engineering:** A field of software engineering that deconstructs a developed system to reveal its documents, design techniques, etc.
*   **Concept:** The opposite of forward engineering. Information or documentation corresponding to initial lifecycle deliverables is created using programs or documents from the last phase.
*   **Example: Input/Output of Reverse Engineering:**
    *   **Input:** Data or document in the form of I/O, such as source code, object code, work procedure, or library.
    *   **Output:** Structure diagram, data flow chart, control flow graph, entity relationship diagram.

**D) Types of Reverse Engineering:**

| Type                          | Description                                                                     |
| :---------------------------- | :------------------------------------------------------------------------------ |
| **Logical reverse engineering** | Information extracted from source code and stored in physical design storage.   |
| **Data reverse engineering**    | Existing database modified or migrated to a new database management system.     |

---

## III. Data Structure and Algorithm

### Summary:
This section details the fundamental building blocks for efficient software: data structures (how data is stored and organized) and algorithms (procedures used to solve problems). Understanding these concepts, including linear/non-linear structures and algorithm performance analysis (time/space complexity), is critical.

### III.01 Data Structure

**A) Definition:**
*   **Data structure:** A method of storing data in computer memory. Defines how data is stored systematically for efficient utilization.

**B) Classification:**
*   **Linear structure:** Data arranged in a straight line by following a sequence.
    *   **Types:** Array, linked list, stack, queue, and deque.
*   **Non-linear structure:** Data arranged in multiple data sets, where relationships are one-to-many or many-to-many.
    *   **Types:** Tree and graph.

**C) Stack and Queue:**
*   **Stack:** A linear data structure where data access/insert/delete operations occur only at the top.
    *   **Key concept:** Follows the LIFO (Last-In-First-Out) principle.
    *   **Operations:** `top()`, `push()`, `pop()`, `isempty()`, `isfull()`.
*   **Queue:** A linear data structure where insertion and deletion locations are limited.
    *   **Key concept:** Insertion is at the rear (`enQueue`), and deletion is at the front (`deQueue`).
    *   **Operations:** `enQueue()` (inserts data), `deQueue()` (deletes data from the front).

**D) Tree and Graph:**
*   **Tree:** A hierarchical data structure with a hierarchical (one-to-many) relationship between elements. The topmost node is called the "root node".
*   **Graph:** A data structure that expresses the many-to-many relationship between connected elements.
    *   **Types of Graphs:**
        *   **Undirected graph:** Connected by undirected lines.
        *   **Directed graph:** Connection lines are directional; sequence of vertices is important.
        *   **Complete graph:** Has as many edges as possible by connecting all vertices with each other.
        *   **Weighted graph:** A graph in which a weighted value is assigned to the edges.

### III.02 Algorithm

**A) Algorithm Overview:**
*   **Algorithm Definition:** A description of a series of processing procedures used to solve a given problem by stages.
*   **Conditions of Algorithms:**
    1.  **Input:** One or more data must be entered.
    2.  **Output:** More than one result should be output after execution.
    3.  **Definiteness:** Instructions for each processing step must be clearly specified.
    4.  **Finiteness:** Must be terminated after execution.
    5.  **Correctness:** The correct result must be produced for valid input within a finite time.
    6.  **Effectiveness:** All instructions must be basic and implementable.

**D) Algorithm Performance Analysis:**
*   Algorithm performance is analyzed by estimating space complexity and time complexity.
*   **Space complexity:** Refers to the total amount of storage space or memory needed to execute and complete an algorithm.
    *   **Formula:** `Space complexity = Amount of fixed space + Amount of variable space`.
*   **Time complexity:** The time taken to execute and complete an algorithm.
    *   **Formula:** `Time complexity = Compilation time + Execution time`.
    *   **Notation:** Time complexity is often expressed using Big O notation.

---

## IV. Software Design Principles and Structural Design

### Summary:
This section covers the core principles of designing software for quality and maintainability, emphasizing techniques like abstraction and modularization. Key criteria for evaluating module design, cohesion and coupling, are introduced, along with structural design methods that utilize data flow diagrams.

### IV.01 Principles of Software Design

| Principle            | Definition/Explanation                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Abstraction**      | Considering product implementation at a higher level first. Hides unnecessary or non-essential details.                    |
| **Information hiding** | The content of each module is hidden; communicated only by the interface. Reduces risk of changes affecting other modules. |
| **Stepwise refinement** | Gradually moving from program structure to module details. Refines required results from high to low abstraction.           |
| **Modularization**   | Dividing the system into components (modules). Goal is to manage systems efficiently and solve complexity.                  |
| **Structuralization** | Systems are structured by the division process. Division is first performed during requirements analysis and specification. |

### IV.02 Cohesion and Coupling

**A) Cohesion (High cohesion is desirable):**
*   **Definition:** A measure of module maturity that indicates the strength of correlations among the internal components in the module.
*   **Types of Cohesion (Strongest to Weakest):**
    1.  **Functional cohesion:** All elements inside a module perform a single function.
    2.  **Sequential cohesion:** Output data from one activity is used as input data of the next.
    3.  **Communication cohesion:** Components perform different functions using the same input and output data.
    4.  **Procedural cohesion:** A module has multiple related functions, performed sequentially.
    5.  **Temporal cohesion:** Creating a module by combining several functions processed at a specific time.
    6.  **Logical cohesion:** A module is created using processing elements with similar characteristics.
    7.  **Coincidental cohesion:** Each component inside a module is composed of unrelated elements only.

**B) Coupling (Low coupling is desirable):**
*   **Definition:** Refers to the complexity of correlations between modules. Coupling increases when modules interact more and depend on each other more.
*   **Types of Coupling (Weakest to Strongest):**
    1.  **Data coupling:** Data passed as a parameter or argument. Most desirable module relationship.
    2.  **Stamp coupling:** Coupling refers to a data structure (array or record) passed over the interface.
    3.  **Control coupling:** Control element (function code, switch, tag) is used to control logical flow.
    4.  **External coupling:** External references to coupling in which data (variables) declared externally by one module are referenced by another.
    5.  **Common coupling:** Modules share a common data area. Weakens module independence.
    6.  **Content coupling:** One module directly refers to or modifies the internal function or data of another module. Strongest coupling.

---

## V. Software Architecture Design

### Summary:
Software architecture design identifies the composition of a system and how its components interact, serving as a blueprint for managing complexity. It involves defining components, relationships, and the means of implementing them. This section presents different architectural styles (Repository, MVC, Client-server) and methods for describing the design (Context, Component, Package diagrams).

### V.01 Software Architecture Design

**A) Software Architecture Overview:**
*   **Software architecture:** A blueprint used to systematically handle factors that directly or indirectly affect software development and increase complexity.
*   **Booc's Definition:** A set of important decision-making facts about the software structure, including modules, processes, data, overall structure, and relationships between components.

### V.02 Software Architecture Style (Representative Types)

*   **A) Repository structure:** One subsystem creates data, and other subsystems use that data. All subsystems share data using a centralized repository.
*   **B) MVC (Model – View – Controller) structure:** A framework for GUI design. Expresses the relationship between one object that can interact with the user and the view.
*   **C) Client-server model:** Composed of a set of servers and clients. Can utilize the network system effectively.
*   **D) Hierarchy:** A system composed of several layers that provide its own specific service.
    *   **Example:** The seven layers of the OSI (Open System Interconnection) model.

---

## VI. Object-Oriented Design

### Summary:
Object-oriented design focuses on modeling real-world objects and their interactions. Key principles include encapsulation, inheritance, and polymorphism, which enable the design of reusable and flexible software components. The concept of design patterns is introduced as reusable solutions for common design problems.

### VI.02 Object-Oriented Design and Principles

| Principle      | Definition/Explanation                                                                                                    |
| :------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Object and class** | A class is a collection of similar objects. An object is a real-world thing that exists independently (e.g., person, place). |
| **Encapsulation** | A method of obtaining improved abstraction and preventing errors through information hiding. Goal: easy to understand, modify, and maintain software. |
| **Inheritance** | Defining a new class that can inherit properties and operations common to several classes. Reduces creation process by reusing common characteristics. |
| **Polymorphism** | Operations with the same name are performed differently depending on the class. Allows subtypes to respond to a superclass operation using unique methods. |

### VI.04 Design Pattern

**A) Concept of the Design Pattern:**
*   **Definition:** A general, reusable solution to a recurring problem in a specific context of software design.
*   **Classification by Scope and Purpose:**
    *   **Creation pattern:** Related to the process of object creation.
    *   **Structural pattern:** Related to the composition of classes or objects.
    *   **Behavioral pattern:** Characterizes the ways in which classes or objects interact and distribute responsibility.

**B) Representative Design Patterns (Examples):**
*   **Patterns for object creation:**
    *   **Abstract Factory:** Creating an object by product family.
    *   **Builder:** Creating a whole object by creating partial objects.
    *   **Singleton:** Limiting object creation up to N.
        *   **Example:** Used when fixing the number of class objects at less than N, such as when managing a device driver.
*   **Patterns for structural improvement:**
    *   **Adapter:** Changing an interface for reusing an existing module.
    *   **Facade:** Simplifying a complex subsystem by providing a single interface.
*   **Patterns for behavior improvement:**
    *   **Observer:** Creating a one-to-many dependency between objects when the state of one object changes.
        *   **Example:** When a subject (like EventSource in Java) changes state, it notifies all registered observers.
    *   **Strategy:** Selecting and applying one of several algorithms with the same purpose.
    *   **Template Method:** Reusing the basic structure of the algorithm and changing detailed implementation.

---

## VII. User Interface (UI)/User Experience (UX) Design

### Summary:
The user interface (UI) and user experience (UX) are crucial for computer systems. UI focuses on the smooth exchange of information between the user and the system, following principles like consistency and feedback. UX is the broader, comprehensive experience (invisible things like emotion and perception) that the designer attempts to improve.

### VII.01 User Interface Overview

*   **User Interface (UI) Definition:** Refers to a device or software that ensures a smooth exchange of information between user and system.

**UI Design Principles:**
*   **Consistency:** The UI should be created consistently.
*   **User-centered design:** UI development should focus on the user.
*   **Feedback:** The UI should provide meaningful feedback (e.g., when a user presses a wrong button).
*   **Confirming destructive behavior:** When a user tries to delete data or files, the UI confirms it before execution.

### VII.02 User Experience Overview

*   **User Experience (UX) Definition:** Refers to the comprehensive experience such as emotion, perception, attitude, and response when a user wants to achieve a purpose using a system or service.

**Differences between UX and UI:**

| UX      | UI      |
| :------ | :------ |
| Process | Result  |
| Dish    | Food    |
| Planning | Design  |
| Emotion | Reason  |

---

## VIII. Programming Language and the Development Environment

### Summary:
This section covers the basic concepts of programming languages (low-level vs. high-level) and how they are processed (interpreters vs. compilers). It also discusses modern development environments, specifically the Integrated Development Environment (IDE) and the role of Continuous Integration (CI) and Software Development Frameworks.

### VIII.01 Programming Language Overview

**A) Concept of the Programming Language:**
*   **Programming language:** Enables users to write a program using a familiar language.
*   **Classification by Level:**
    *   **Low-level language:** Machine-centric language composed of binary system; difficult for humans to write programs. (Example: Assembly language).
    *   **High-level language:** Written similarly to natural language; easy for humans to understand. (Example: C, Java, Python).

**B) Interpreter Languages:**
*   **Interpreter languages:** Convert a source program into a low-level language directly, without intermediate steps, and execute the program at the same time.
*   **Strength:** Programs are executed immediately, without waiting for complete machine translation.

**C) Compiler Languages:**
*   **Compiler languages:** Translation converts a specific language into another language having an equivalent meaning (e.g., high-level language into machine language).
*   **Strengths:**
    *   Translated object codes can be saved.
    *   Executable immediately after compilation.
    *   The reused program can be executed quickly after compilation.

### VIII.04 Integrated Development Environment (IDE)

*   **Concept of an Integrated Development Environment (IDE):** A type of software used for development purposes that provides an environment where all tasks related to programming (coding, debugging, compilation, distribution) can be handled with one software.

**B) Continuous Integration (CI):**
*   **Concept of CI:** A software development activity that frequently integrates the results of a team composed of several members. Developers merge changes to the code in the central repository several times per day.
*   **Necessity of CI:**
    *   Builds configuration management.
    *   Provides an environment where developers can concentrate on development activities.
    *   Detects and eliminates problems that may arise when integrating codes in advance.
    *   Supports a development process that receives feedback frequently.

---

## IX. Software Testing and Refactoring

### Summary:
Software testing is essential for verifying system performance and detecting defects. This section outlines the principles and process of testing, classifies test types (e.g., Acceptance, System, Integrated, Unit) and techniques (White box vs. Black box). It also introduces Refactoring as the process of improving internal code structure without changing external operation.

### IX.01 Concept and Process of Testing

**A) Concept of Testing:**
*   **Testing Definition:** A method of checking or confirming that the operation, performance, and stability of an application or system satisfies the demands of the user or customer.
*   **General Principles of Testing:**
    *   Testing shows the presence of defects.
    *   Exhaustive testing is not possible.
    *   Testing should start during the initial stages of development.
    *   **Pesticide paradox:** Repetitive tests over time become ineffective in discovering new defects.
    *   Testing is context dependent.
    *   **Absence of error - fallacy:** Finding and fixing defects won't matter if the system doesn't fulfill user needs.

### IX.02 Testing Types and Techniques

**A) Testing Types:**

| Test type          | Purpose                                                       | Performing Tester/Test Organization           | Environment                          |
| :----------------- | :------------------------------------------------------------ | :-------------------------------------------- | :----------------------------------- |
| **Acceptance test** | To check compliance with requirements.                        | User                                          | User environment                     |
| **System test**    | To check overall functional and non-functional tests.         | Test organization                             | Environment similar to actual user environment |
| **Integrated test** | To find a defect in the interface between unit modules.      | Development organization or testing organization | Development or test environment      |
| **Unit test**      | To detect any defects in the unit modules.                   | Development organization                      | Development environment              |

**B) Testing Techniques:**
*   **White box testing:** Also called structural or code-based testing. Mainly used in unit testing to verify software components.
    *   **Techniques:** Structural technique (measures logical complexity of the program), Loop test (measures the loop structure).
*   **Black box testing:** Also called function or specification-based testing. Mainly used in system testing to verify functional and non-functional requirements.
    *   **Techniques:**
        *   **Equivalence partitioning:** Tests conducted by selecting input values.
        *   **Boundary value analysis:** Tests based on the boundary value.
        *   **Cause-effect graph:** Detects an error by expressing the impact of input values on output values using a graph.
        *   **Error guessing:** Tests based on the experience of the tester.

### IX.03 Refactoring

*   **Concept of refactoring:** Improving a program's internal structure without changing the program operation viewed from the outside.
    *   **Key Insight:** Refactoring improves the internal structure of a program.
*   **Reasons for Refactoring:**
    *   Makes error detection and debugging easier.
    *   Changes in software requirements can be responded to more effectively.
    *   Complex code is simplified, and source code readability is improved.
    *   Improves productivity and quality.
*   **Concept of a code smell:** A term used to mean that a program is difficult to read or has duplicated logic, making it difficult to refactor.

---

## X. Software Requirements Management

### Summary:
Software Requirements Management (SRM) is the process of defining, specifying, verifying, and managing changes to requirements throughout the entire software life cycle. Its primary purpose is to ensure high-quality software is produced by clearly understanding and satisfying customer needs.

### X.01 Requirements Management

**A) Definition of Requirements Management:**
*   **Requirements management:** Consists of defining what to do, checking whether the planned requirements are accurately reflected, and managing changes to the first requirements on a continuous basis.

**D) Requirements Management Process:**
The requirements management activities in the software development life cycle include:
1.  **SW request extraction:** Defining the business requirements and extracting initial requirements.
2.  **Requirements analysis:** Modeling candidate requirements and determining priority.
3.  **Requirements verification:** Reviewing the specification and verifying the terms.
4.  **Requirements change management:** Performing change control, traceability control, and version control.

**E) Principles of Requirements Management:**
*   Giving priority to requirements-based customer value.
*   Identifying the exact target of the required management.
*   Analyzing the impact of a change to the requirements by running the Change Control Board (CCB).

### X.02 Requirements Specification

**B) Principles and Main Contents of Requirements Specification:**
*   **IEEE (Institute of Electrical and Electronics Engineers) Principles:**
    *   **Verifiability:** Requirements specification should be verifiable.
    *   **Modifiability:** Should be modified easily.
    *   **Clarity:** Should be understood identically by each stakeholder.
    *   **Accuracy:** Should be accurately described.
    *   **Traceability:** Source and principle of requirements should be traceable.
    *   **Consistency:** There should be no conflicts between requirements.

---

## XI. Software Configuration Management

### Summary:
Software Configuration Management (SCM) is the systematic control and management of changes to software deliverables throughout the development and maintenance phases. The goal is to reduce overall costs, minimize risk, and ensure quality by managing configuration items, baselines, and using configuration management tools.

### XI.01 Overview of Software Configuration Management

*   **Definition of Software Configuration Management (SCM):** A series of activities designed to manage software changes during the development process. It is applied to all stages of software development and performs checking and controlling the causes of software changes.
*   **Components of Configuration Management:**
    *   **Baseline:** The technical control point of each configuration item.
    *   **Configuration item:** The default items formally defined and described in the software life cycle.
    *   **Configuration product:** The tangible and realized target of configuration management.
    *   **Configuration information:** Configuration item + configuration product.

### XI.03 Configuration Management Activity

*   **Activities:**
    *   **Shape identification:** Identifying items, numbering, and organizing documentation.
    *   **Configuration control:** Managing change requests/control.
    *   **Configuration audit:** Checking the integrity of the software baseline.
    *   **Configuration recording:** Recording the various statuses and execution results of software configuration.

### XI.04 Configuration Management Tools (Examples)

*   **Client/server type:** Subversion (SVN), CVS, Perforce, TFS (Team Foundation Server).
    *   **Subversion (SVN):** An open-source version control system. It is server-client based.
*   **Distributed repository type:** Git, Mercurial, Bitkeeper, Darcs.
    *   **Distributed repository (Git):** Distributed version control systems, where Git copies the entire repository, instead of directly downloading the last snapshot.

---

## XII. Software Maintenance

### Summary:
Software maintenance is the last phase of the SDLC and accounts for a significant portion of the total software cost (60% spent on functional enhancement). It involves continuous modification, adaptation, error correction, and performance improvement. Maintenance activities are classified by reason, time, and target, which helps in systematic management.

### XII.01 Concept and Types of Software Maintenance

**A) Definition of Software Maintenance:**
*   **Software maintenance:** The continuous modification and supplementation of fully developed software. It is the last phase of the SDLC. It extends the life of software and corrects errors, improves functions, and adapts software to changed environments.

**C) Type of Software Maintenance:**

| Classification criteria | Type                     | Contents                                                                      |
| :---------------------- | :----------------------- | :---------------------------------------------------------------------------- |
| **Maintenance by reason** | **Corrective maintenance** | Handling, execution, implementation, and error identification due to errors.    |
|                         | **Adaptive maintenance**   | Adapting to changes in the data environment and infrastructure.               |
|                         | **Perfective maintenance** | Adding a new feature, changing, and improving quality.                       |
|                         | **Scheduled maintenance**  | Periodic maintenance.                                                       |
| **Maintenance by time** | **Preventive maintenance** | Maintenance as a preventive measure.                                         |
|                         | **Emergency maintenance**  | If maintenance work needs to be approved later.                               |
| **Maintenance by target** | **Data/program maintenance** | Processing when necessary, such as data conversion.                           |
|                         | **Documentation maintenance** | Processing for changing the document standard.                                |

---

## XIII. Trends of Open-Source Software

### Summary:
The growing reliance on proprietary software has led to increasing interest in open-source software, which allows users to freely use, copy, and modify the code. This section defines open-source software and its accompanying licensing, detailing major licenses such as GPL, LGPL, and BSD, which dictate the obligations required for its utilization.

### XIII.01 Concept of Open-Source Software

**A) Definition of Open-Source Software:**
*   **Open-source software:** Software that can be used, copied, and modified by anyone while protecting the rights of the creator.

**B) Definition of the Open-Source Software License:**
*   **Open-source software license:** Refers to an agreement made between an open-source developer and a user on the method of use and conditions. If a user violates the conditions, they assume legal responsibility for license infringement.
*   **Representative Licenses (Examples):**
    *   **GPL (GNU General Public License):** The most stringent license. Requires the distributor to specify copyright/distribution under the GPL and mandates that the source code must be opened.
    *   **LGPL (Lesser General Public License):** Enables users to use some libraries in a way that the source code can be used in a more eased form than GPL.
    *   **BSD (Berkeley Software Distribution) license:** Does not require the developer to disclose the source code.
    *   **Apache license:** Does not require disclosure of the source code.
*   **Major advantages of open-source software:** Initial development cost is low; technology can be developed quickly and flexibly; and interoperability between different software is guaranteed.

---

## XIV. Trends of Software Development

### Summary:
Recent trends focus on improving quality and development productivity via rapid development and efficient resource use. Key technological trends include cloud-based integrated environments, ALM integration, and modern programming languages (TypeScript, Kotlin, Swift). Architectural trends emphasize Microservice Architecture and containerization using Docker for scalability and independent deployment.

### XIV.01 Technology Trends of Software Development Tools and Programming Languages

**A) Technology Trends of Software Development Tools:**
*   Highlighting the cloud-based integrated development environment.
*   Integrating software development tools and ALM (Application Lifecycle Management).

**B) Technology Trends of Programming Languages (Examples):**
*   **TypeScript:** An extended version of JavaScript. Key feature: Includes the features of JavaScript and is a 'static type' language.
*   **Kotlin:** A functional programming language. Similar to Java; officially adopted by Google for Android development.
*   **Swift:** Developed by Apple to support application development for its products. Easy to develop an app using simple coding process.

### XIV.02 Technology Trends of the Development Framework and Software Architecture

**A) Technology Trends of Software Development Tools (Framework Examples):**
*   **Angular 4:** Used for maintenance for AngularJS. Angular is a single-page application (SPA) framework.
*   **React.js:** A JavaScript library created by Facebook. Supports the writing of markup code using extended JavaScript syntax (JSX).
*   **Express.js:** Web application framework of Node.js.

**B) Technology Trends of Software Architecture:**
*   **Microservice architecture:** Divides one large application into several small services, creating individual data repositories, and independent execution environments.
    *   **Key features:** Development productivity is high; flexible deployment in units rather than deployment of the whole set; system can be expanded elaborately.
*   **Docker:** An open-source platform that automates the Linux container (LXC) technology. Creates a virtualization environment.
    *   **Key features:** Makes it easy to package, distribute, and manage an application using a container; supports multiple cloud platforms.