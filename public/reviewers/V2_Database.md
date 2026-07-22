# I. Understanding Data and Databases

## Summary of Section I
This section introduces the foundational concepts of data, information, and knowledge, defines various data processing systems (batch, online, distributed), and explains the core concepts and components of the modern database system (DBS). Key topics include the necessity of the Database Management System (DBMS), the ANSI-SPARC 3-level architecture, data independence, and the roles of the Database Administrator (DBA) and Data Architect (DA).

### I.01 Understanding Data
#### A) Concept and Characteristics of Data, Information, and Knowledge
*   **Data**: Refers to the collected resource itself, representing facts that have not yet been evaluated for a specific purpose.
    *   **Key Point**: Factual data.
*   **Information**: Data that is organized, classified, and systematized for certain purposes.
    *   **Key Point**: Treatment and processing.
*   **Knowledge**: Information accumulated and organized into a generalized form, used for decision-making.
    *   **Example**: When data is organized into meaningful patterns, it becomes information.

#### B) Concept and Characteristics of Data Processing Types
The core element of the information system is the data processing system.

1.  **Batch processing system**: Data is collected for a certain period and processed at once.
    *   Requires preparatory work (collecting and classifying raw data) and standby time.
    *   The procedure for modifying changes is complex.
    *   **Example**: Payroll processing system, grade processing system, utility bill processing system.
2.  **Online processing system**: Data transferred to a computer is processed immediately (real-time processing).
    *   Incurs a high processing cost and low system performance.
    *   **Example**: Seat reservation processing systems for airlines and railroads.
3.  **Distributed processing system**: Data is processed by connecting processors and databases that are geographically dispersed over a network.
    *   Operated in the form of a client/server system.
    *   Improves the operation speed and reliability.

### I.02 Understanding the Database
#### A) Concept of the Database
*   A database manages duplicated data in one place to eliminate duplication to the maximum.
*   The database has the characteristics of integration, operation, storing, and sharing.

#### B) Characteristics of the Database
The database is accessed and shared by multiple users simultaneously.
*   **Real-time accessibility**: Real-time response to occasional and informal queries.
*   **Continuous evolution**: Supports dynamic changes (update, insert, delete).
*   **Concurrent sharing**: Supports the concurrent sharing of the same data in different ways.

### I.03 Understanding the Database System (DBS)
#### A) Concept and Components of the Database System (DBS)
*   **Database System (DBS)**: A computer-centered system that stores and manages data in a database.
*   **Components of DBS**: Database, Database language, Users, and Database Management System (DBMS).
*   **DBMS**: System software that provides functions for database construction and utilization.
    *   **Functions**: Controls duplication (redundancy), enables data sharing among multiple users, controls access by unauthorized users, ensures data integrity, and expresses complex relationships.

#### B) Data Independence and ANSI-SPARC's 3-level Database Architecture
The database is organized into a 3-level architecture proposed by ANSI/SPARC, aimed at reducing interference when changes occur by separating the user's view from the physical storage.

1.  **External schema (External phase)**: An external schema composed of several users' viewpoints in the view phase.
2.  **Conceptual schema (Conceptual phase)**: Composed of one conceptual schema; this describes the database based on the integrated view of all user's perspectives.
3.  **Internal schema (Internal phase)**: Describes the physical storage structure; the format in which the database is physically stored.

*   **Data Independence**: The concept that the data structure/storage changes without affecting the programs that use the data.
    *   **Logical independence**: When a conceptual schema is changed, the external schema and application program are not affected.
    *   **Physical independence**: When an internal schema is changed (e.g., storage device structure change), the conceptual schema and application program are not affected.

#### C) Definition and Key Roles of Database Administrator (DBA) and Data Architect (DA)
*   **Database Administrator (DBA)**: Responsible for the configuration and overall administration of the database system.
    *   **Example**: Functional tasks of DBA: Data modeling, physical database design, tuning (performance improvement), database building, and database standardization.
*   **Data Architect (DA)**: Establishes models, systems, policies, and standards for data-related elements (data, database, data standard, and data security).
    *   **Key Roles**: Establishment of data governance and management of data security.

# II. Understanding Types of Databases

## Summary of Section II
Database technology has evolved significantly, moving from older formats like hierarchical and network databases to relational databases (RDB), and later incorporating complexity through object-oriented (OODB) and object relational databases (ORDB). This section also covers XML technology and various specialized database types (e.g., Main Memory, Spatial, Column-based) needed for large-capacity or complex data processing.

### II.01 Major Types of Databases
*   **Relational Database (RDB)**: The model itself is simple, storing data in a two-dimensional structure (table, row, column).
    *   Based on mathematical theory, ensuring high reliability.
    *   Major commercial products include Oracle, SQL Server, DB2, and Sybase.
*   **Object-oriented Database (OODB)**: Supports user-defined data types and inheritance.
    *   Emphasizes the integration of data and logic.
*   **Object Relational Database (ORDB)**: Introduced to overcome the limitations of RDB by combining existing relational capabilities with object-oriented concepts.
    *   **Characteristics (Example)**: Supports user-defined data types, supports LOB (Large Object) data types for large-scale unstructured data (e.g., images, audio), and supports table inheritance relationships.

### II.03 Understanding XML (Extensible Markup Language)
*   **Concept**: A standard language used to specify the structure and exchange data in a web environment, overcoming HTML's limits in terms of describing data extracted from a database.
    *   **Characteristics**: Simplicity (simplifies SGML features), Openness (can be used together with HTML), and Scalability (can create its own tags).
*   **XML Configuration Components (Examples)**:
    *   **XML DTD (Document Type Definition)**: Defines the form of an XML document to validate it.
    *   **XML Schema**: A document definition language used to specify the structure of an XML document, offering support for namespaces and more complex data types than DTD.
    *   **XQuery**: A standard XML query language used to search an XML-based database and extract information.
    *   **XML Processor Components**: XML parser (checks grammar/syntax) and XSL engine (converts XML document to a format like HTML for display).

### II.04 Understanding Various Database Types
*   **Main Memory Database (MMDB)**: A database stored in the main memory.
    *   **Characteristics**: Excellent performance due to high-speed I/O, but hardware-based error recovery techniques are required because performance is poor when accessing disk.
*   **Spatial Database**: Data structure expressing the spatial relationship between geographic objects.
    *   Supports unstructured data processing and indexing techniques like R-tree index for efficient sorting.
*   **Column base Database**: Physically stores data based on columns, unlike relational databases which use rows.
    *   **Characteristics**: Highly suitable for processing large amounts of data continuously for the same column.
    *   **Example**: Used for analysis in RDBMS, such as finding `SELECT AVG(COL1)`.

# IV. Data Modeling

## Summary of Section IV
Data modeling is the process of creating a database blueprint by abstracting the real world. The process moves from Conceptual (high abstraction level, establishing entities and relationships) to Logical (conversion to the relational model, applying normalization) and finally to Physical modeling (determining storage and performance factors, applying denormalization). This section defines the concepts and components of the Entity-Relationship Diagram (ERD), including the Chen model and the industrial Crow's Foot model.

### IV.01 Concept and Procedure of Data Modeling
*   **Data Modeling**: The process of abstracting the real world to create a database.
    *   **Characteristics**: Abstraction (expresses real world according to a format), Simplification (uses limited notation), and Clarification (removes ambiguity).

#### Data Modeling Levels (DB Design Flow)
1.  **Conceptual data modeling**: Abstract conceptualization of information structure, typically represented by an entity-relationship (ER) model.
2.  **Logical data modeling**: Conversion of the conceptual model into a logical structure (such as relational, network, or hierarchical models) that can be easily stored in a database. Normalization is performed here.
3.  **Physical data modeling**: Determination of the physical storage structure, performed to improve performance and storage efficiency. Denormalization is performed here.

### IV.04 ER Notation Based on the Chen Model
The Chen model is used for understanding the theoretical concepts of data modeling.
*   **Entity**: A rectangle representing a meaningful unit of information in the real world.
    *   An entity without its own identifier is called a 'weak entity', represented by a two-line rectangle.
*   **Relationship**: A diamond referring to the correlation between entities.
    *   **Cardinality**: Represents the maximum number of relationship instances that can participate. (e.g., One-to-one (1:1), One-to-many (1:N), Many-to-many (M:N)).
*   **Attribute**: An ellipse representing the intrinsic nature of an entity or relationship.
    *   **Identifier (Key attribute)**: Represented by underlining the attribute's name.
    *   **Derived attribute**: Derived from other stored data, marked with a dotted ellipse.
    *   **Example**: The number of people in a department can be derived by counting the number of employees.

### IV.06 Another Type of ERD Notation: The Crow's Foot Model
Crow's Foot notation is widely used in the industry for information engineering notation.

#### Characteristics of the Identifier
A primary identifier must distinguish all instances within an entity.
*   **Uniqueness**: A primary identifier uniquely distinguishes all instances within an entity.
    *   **Example**: An employee number is uniquely assigned to each employee.
*   **Minimality**: The number of attributes constituting a primary identifier should be the minimum.
*   **Invariability**: The value should not change.
*   **Presence (Not Null)**: The identifier must be a data value.

#### Identifier Relationship and Non-identifier Relationship
The type of relationship between entities is determined by business characteristics.
*   **Identifier relationship (Strong relationship)**: Included in the composition of the child's primary identifier, indicated by a solid line.
*   **Non-identifier relationship (Weak relationship)**: Included in the child's general attributes, indicated by a dotted line.

### IV.07 Connection Trap
A connection trap means that desired information cannot be accurately found even though a relationship has been established.
*   **Fan trap**: Occurs when an N:1 relationship exists between entities A and B, and a 1:N relationship exists between entities B and C, leading to an ambiguous path.
*   **Chasm trap**: Occurs due to the disconnection of the information flow when there is an optional relationship rather than a mandatory relationship.

### IV.09 Integrity and Key
#### B) Key (Definition and Types)
*   **Super key**: A sub-set of all fields in a table, uniquely identifying a record.
*   **Candidate key**: A super key that satisfies uniqueness and minimality.
*   **Primary key**: The unique identifier selected among candidate keys to distinguish a specific record.
*   **Foreign key (FK)**: An attribute that refers to the primary key (PK) of another table (the referenced table). Deletion is not allowed because it is referenced by the FK.

# V. Normalization and Denormalization

## Summary of Section V
Normalization is the crucial process of decomposing relations to eliminate redundancy and the resulting anomalies (insertion, deletion, update anomalies). This process progresses through stages (1NF, 2NF, 3NF, BCNF, 4NF, 5NF) based on functional dependency (FD) principles, defined by Armstrong's axioms. Conversely, Denormalization is applied during physical design to intentionally introduce redundancy to improve query performance.

### V.01 Normalization and Anomalies
*   **Anomaly**: Various errors that occur during data processing operations in a database that lacks proper structural design.
    *   **Insertion anomaly**: Cannot insert information unless inserting certain information.
    *   **Deletion anomaly**: Deleting a necessary piece of information also deletes other related information.
    *   **Update anomaly**: The same content must be updated several times repeatedly.

### V.02 Concept of Functional Dependency and Rule of Inference
*   **Functional dependency (FD)**: If attributes X and Y are sets of fields in a relation R, Y is functionally dependent on X (X → Y) if two arbitrary records with the same X values also have the same Y values.
    *   **Partial functional dependency (2NF constraint)**: Exists if there is an attribute Y that satisfies X → Y, but X is not a candidate key.
    *   **Transitive dependency (3NF constraint)**: Exists if attributes A → B and B → C exist in relation R, then A → C is expressed as the relationship.
*   **Armstrong's axioms**: A rule of inference used to derive new functional dependencies.
    *   **Axioms include**: Reflexivity rule (if Y ⊆ X, then X → Y), Augmentation rule, and Transitivity rule.

### V.03 Database Design in Which Normalization is Applied (1st, 2nd, 3rd, Boyce-Codd)
Normalization converts an irregular relation into the 'normal form' table.
1.  **First Normal Form (1NF)**: Decomposing a domain so that an attribute is not an atomic value.
2.  **Second Normal Form (2NF)**: Removing partial functional dependency.
3.  **Third Normal Form (3NF)**: Removing transitive functional dependency.
4.  **Boyce-Codd Normal Form (BCNF)**: A stricter form of 3NF; ensures that if X → Y is a functional dependency, X is a candidate key.

### V.04 4th Normalization (4NF)
*   **Concept**: The process of removing more than two multi-valued dependencies (MVD) if they occur in one relation.
*   **Anomaly Classification (4NF)**: Anomalies include Input error, Modification error, and Delete error.

### V.06 Denormalization
*   **Definition**: The process of integrating data models for normalized entities and relationships in order to improve system performance and simplify development.
*   **Considerations**: Denormalization is necessary when performance degradation occurs due to many table joins, or when simplification is needed.
*   **Denormalization Procedure Targets**: Investigating range processing frequency, large range processing, aggregation process, and number of table joins.
*   **Denormalization Technique (Examples)**:
    *   **Merging tables**: Combining 1:1, 1:N, or M:N relationship tables.
    *   **Splitting the table**: Dividing a table vertically or horizontally (e.g., horizontal split based on year for querying history data).
    *   **Adding a duplicate column**: Duplicating frequently used columns to prevent performance deterioration due to joins.

# VI. Physics Design of the Database

## Summary of Section VI
Physical design is the phase where the logical data model (ERD output) is converted into a physical structure, determining how data will be stored and accessed to ensure optimal performance. This involves detailed decisions on data types, table structure (e.g., partitioning), index design for speed, and the characteristics of distributed databases.

### VI.01 Relational Table Conversion and Table Design
#### A) Physical Modeling
*   **Industry perspective**: Physical modeling converts the ERD into a table structure drawing.
*   **Major tasks**: Data type definition, index design, normalization/denormalization, and distributed database design.

#### C) Table Design (Types)
*   **Heap-organized table**: Record storage location is determined by when the record is inserted, regardless of attribute values.
*   **Clustered index table**: A table in which data is stored in the order of the primary key value or index key value.
*   **Partitioned table**: Designed for performance enhancement by storing data physically split based on criteria (range, value, hash).

### VI.03 Index Design
*   **Function of the index**: A data structure that organizes database record information to perform search operations quickly.
    *   The index is sorted by the column value and contains a pointer to the location of the actual values.
*   **Most important function**: To speed up data search by reducing the access path.
*   **Types of index structures**: Tree-based index, Function-based index, Bitmap join index, Domain index.

### VI.05 Distributed Database
*   **Characteristics**: A database that is logically integrated and shared, but physically distributed among multiple computers on a network.
    *   **Strength**: Reduced dependence on remote data, increased processing capacity for large data volumes, and improved reliability/availability.
*   **Data transparency**: The characteristic that recognizes multiple physical databases as a single logical database.
    *   **Types of Transparency**:
        *   **Partitioning transparency**: Informs users how the global schema has been split (vertical/horizontal partitioning).
        *   **Location transparency**: Users do not need to know the physical location of data.
        *   **Replication transparency**: Users do not need to know which data is redundant.
        *   **Concurrency transparency**: Consistency of results is maintained even though multiple transactions are executed simultaneously.

# VII. Database Quality and Standardization

## Summary of Section VII
Data quality (including accuracy, consistency, and timeliness) is crucial for information systems. Data quality control is managed through a framework covering data value, data structure, and the data management process. Data Standardization is essential for improving communication clarity, reducing time/cost, and ensuring quality by defining consistent data information elements across the organization.

### VII.01 Data Quality Control Framework
*   **Data quality control**: A series of activities undertaken to improve the quality of data across its value, structure, and management process.
*   **Three Key Elements of Data Quality Management Maturity Model**:
    1.  **Data quality standard**: Defines the quality level needed (e.g., Accuracy, Consistency, Timeliness).
    2.  **Data quality control process**: Processes needed to improve accuracy, consistency, usability, etc..
    3.  **Data quality management maturity level**: A level measured from 1 to 5; higher levels indicate more systematically managed data.

### VII.02 Data Standardization
*   **Definition**: Principles defining the name, definition, format, and rule of data information elements applied throughout an organization.
*   **Necessity (Benefits)**:
    *   **Improves clarity of communication** by unifying names.
    *   **Reduces time and effort** spent on finding necessary data.
    *   **Improves data quality** by applying consistent data formats.
    *   **Reduces the cost** of data conversion.
*   **Standardization Components**: Includes data standard, data management organization, and data standardization procedure.
*   **Defining Data Standards**: Standard words are derived from all terms dispersed in the information system, often by dividing them into word units (word split).

# VIII. Relational Operation (Relational Algebra)

## Summary of Section VIII
Relational algebra is a procedural language serving as the theoretical basis for SQL. It involves set operations (Union, Intersect) and relation operations (Select, Project, Join) to manipulate relations (tables), where both operands and results are relations.

### VIII.02 Set Operation and Relation Operation
*   **Relational algebra**: A set of operations for processing relations in a relational database.

| Operator | Sign | Description                                                               |
| :------- | :--- | :------------------------------------------------------------------------ |
| Union    | ∪    | Creates a relation composed of tuples belonging to more than one relation. |
| Intersect| ∩    | Creates a relation composed of tuples common to both relations.           |
| Select   | σ    | A unary operation selecting tuples that satisfy a specific condition; results in a horizontal subset. |
| Project  | π    | A unary operation selecting attributes from a relation; results in a vertical subset. |
| Join     | ⋈    | An operation creating a new relation that combines the tuples of two relations that meet the join condition. |

# IX. Relational Database Language (SQL)

## Summary of Section IX
SQL (Structured Query Language) is the standard language used for RDBs. SQL is classified into three sub-languages: DDL (Data Definition Language), DCL (Data Control Language), and DML (Data Manipulation Language). This section details the main statements within DDL and DML, including basic and aggregate operations.

### IX.01 Types of Relational Database Languages
The relational database language processes the structure and value stored in a relational database and is classified into DDL, DCL, and DML.
*   **DDL (Data Definition Language)**: Defines the relationship, data, and data structure in a table.
    *   **Main Commands**: CREATE, ALTER, DROP, RENAME.
*   **DCL (Data Control Language)**: Controls data access, security, integrity, and concurrency.
    *   **Main Commands**: GRANT (grant privileges), REVOKE (cancel privileges), COMMIT, ROLLBACK.
*   **DML (Data Manipulation Language)**: Searches, registers, updates, and deletes data.
    *   **Main Commands**: SELECT, INSERT, UPDATE, DELETE.

### IX.04 Data Manipulation Language (DML)
#### A) Basic DML Operations

| Statement | Description and examples of usage         |
| :-------- | :---------------------------------------- |
| SELECT    | Used to search data values stored in a table. |
| INSERT    | Used to input values into a table.        |
| UPDATE    | Used to modify data stored in a table.    |
| DELETE    | Used to delete data stored in a table.    |

#### B) Aggregate DML Operations
Aggregate operations are performed by using SUM, AVG, and COUNT statements, often accompanied by the GROUP BY clause to obtain statistical information on each group.
*   **Example**: Calculating total salary and average salary by department
    *   Uses `SELECT department, COUNT(*), SUM(agreed annual salary) as total salary, AVG(agreed annual salary) as average salary`, combined with `GROUP BY department`.

# X. Database Query Application

## Summary of Section X
This section focuses on advanced SQL application techniques like Stored Procedures, Embedded SQL, and Dynamic SQL, which address limitations of basic SQL. Query optimization is critical for performance; the optimizer determines the fastest execution path, categorized primarily as Rule-based (RBO) or Cost-based (CBO).

### X.01 Stored Procedure
*   **Definition**: A set of queries executing a series of queries like a single function, stored in a database.
*   **Strengths**: Reduces network load, reduces processing time by skipping syntax analysis, maintains referential integrity, and improves readability of the source code.

### X.03 Dynamic SQL
*   **Comparison to Static SQL**: Dynamic SQL statements are dynamically changed according to the condition of execution and received from the user at runtime. Static SQL statements are defined as fixed code during development.
*   **Strengths (Dynamic SQL)**: Provides an access plan for each SQL statement, and supports multiple applications.

### X.04 Query Optimization and Optimizer
*   **Query Optimization**: The process where a DBMS selects one optimal strategy by systematically evaluating several alternatives for executing query statements.
*   **Optimizer**: The core engine of the DBMS that checks for grammatical errors and determines the optimal path/processing procedure for retrieving data.
*   **Classification of Optimizers**:
    *   **Rule-based optimizer (RBO)**: Selects the optimal path based on predefined rules (index structure or comparison operator).
    *   **Cost-based optimizer (CBO)**: Calculates the cost of each processing method and selects the method with the least cost.

# XI. Concurrency Control

## Summary of Section XI
Concurrency control is necessary in multi-user environments to ensure transaction atomicity and reliability when multiple transactions execute simultaneously. This is managed through the four ACID properties (Atomicity, Consistency, Isolation, Durability). Concurrency control techniques, such as 2-Phase Locking (2PL), prevent problems like Lost update and Dirty read, and define transaction isolation levels to prevent data corruption.

### XI.01 What is a Transaction
*   **Definition**: A transaction is a set of several operations converting the database to another consistent state.

#### B) ACID Properties of the Transaction
1.  **Atomicity**: All steps must successfully finish or fail in one transaction.
2.  **Consistency**: The transaction result should always be the same expected value.
3.  **Isolation**: Transactions should not interfere with the processing of intermediate data of others.
4.  **Durability**: The persistence of a successful transaction is guaranteed; data should be restored using forward recovery.

### XI.02 Concurrency Control
*   **Definition**: A function that enables the successful execution of several transactions at the same time in a multi-user database system.

#### D) Problems that occur when concurrency is not controlled
*   **Lost update**: Occurs when transactions update the same data simultaneously, and a later transaction overwrites the update value of a previous transaction.
*   **Dirty read**: Other transactions read data prior to the intermediate execution result of a transaction.
*   **Unrepeatable read**: When a query is executed more than twice, query results differ because other transactions have modified or deleted the value in the middle.

#### F) What is the 2PL (2-Phase Locking) technique?
*   **Definition**: A lock-based concurrency control technique that guarantees serialization.
*   **Phases**:
    1.  **Expansion phase**: A phase in which a transaction can perform locking only and cannot perform unlocking.
    2.  **Contraction phase**: A phase in which a transaction can perform unlocking only, and cannot perform locking.

### XI.03 Transaction Isolation Level
The isolation levels defined in the ANSI/ISO SQL standard (SQL92).

| Isolation Level     | Description                                                                     | Potential Anomaly      |
| :------------------ | :------------------------------------------------------------------------------ | :--------------------- |
| Level 0 Read uncommitted | Allows reading data that is still being processed by the transaction.           | Dirty read occurs.     |
| Level 1 Read committed  | Allows reading data confirmed by the completed transaction.                     | Non-repeatable read occurs. |
| Level 2 Repeatable read | Data read twice will not disappear or change within the transaction.            | Phantom read occurs.   |
| Level 3 Serializable    | Guarantees that a query executed more than twice will have the same results, values, and no new record appears. | No anomalies occur.    |

### XI.04 Deadlock
*   **Definition**: Multiple processes or transactions are waiting indefinitely for the allocation of a specific resource.
*   **Causes**: Mutual exclusion, block & wait, non-preemption, and circular wait (resource requests between processes form a circular shape).

# XII. Database Recovery

## Summary of Section XII
Database recovery ensures the system is restored to a consistent state after failures (transaction, system, disk, or user). Recovery relies on the principle of information redundancy (logs/journals) and involves Redo (forward recovery) and Undo (backward cancellation) actions. Key recovery techniques include Log-based, Checkpoint, and Shadow paging. Database backup methods (Full, Differential, Incremental, Archive log) are classified by service interruption or backup range.

### XII.01 Concept of Database Failure and Recovery
*   **Types of database failures**: Transaction failure (internal error), System failure (power/hardware failure), Disk failure (broken storage/media failure), and User failure (user lack of understanding).
*   **Basic principle of recovery**: Information redundancy through archiving/dumping the DB or keeping a log/journal of changes.
*   **Types of recovery actions**:
    *   **Redo**: If contents of the database itself are damaged, the most recent copy is loaded, and changes are applied that occurred after the recovery time (forward recovery).
    *   **Undo**: Restores the database to its original state by cancelling all changes since the transaction began (backward cancellation operation).

### XII.02 Database Troubleshooting Method (Recovery Techniques)

| Technique                     | Concept                                          | Recovery Process           | Recovery Speed              |
| :---------------------------- | :----------------------------------------------- | :------------------------- | :-------------------------- |
| Log-based technique           | Recovery using log files.                        | Uses Redo and Undo.        | Slow.                       |
| Checkpoint recovery technique | Recovery using log files and checkpoints.        | Uses Undo.                 | Faster than logs.           |
| Shadow paging technique       | Recovery using shadow page tables.                 | Replaces shadow tables.    | Fastest recovery (no Redo/Undo). |

### XII.03 Database Backup
*   **Definition**: The task of storing all or part of a database in duplicate to recover in the event of a failure.

| Classification Criteria | Backup Method      | Description                                                                     |
| :---------------------- | :----------------- | :------------------------------------------------------------------------------ |
| By Service Interruption | Offline backup     | Backup after stopping a database (simple, but service unavailable).          |
|                         | Online backup      | Backup while operating a database (no service disruption, but high memory usage). |
| By Backup Range         | Full backup        | Process of making a copy of the entire database.                                |
|                         | Differential Backup| Cumulative backup of all changes made since the last full backup.               |
|                         | Incremental Backup | A backup of only the data that has been changed or created since the contact of the previous backup activity. |

# XIII. Understanding Database Analytics

## Summary of Section XIII
Database analytics focuses on transforming data into actionable insights for decision-making. This relies on technologies like the Data Warehouse (DW), which integrates data from operational systems. Data warehouse modeling uses Star or Snowflake schema to organize data into fact and dimension tables. The data movement process is managed by ETL (Extraction, Transformation, Loading), while analysis is performed via OLAP (Online Analytical Processing) search techniques and various Data Mining algorithms.

### XIII.01 Concept and Characteristics of the Data Warehouse (DW)
*   **Concept**: An integrated system or database enabling the user to analyze internal/external data from multiple viewpoints.
*   **Characteristics**:
    *   **Subject-oriented**: Organized around business subjects (e.g., customer, product).
    *   **Integrated**: Consistent structure achieved through company-wide data standardization.
    *   **Time variant**: Retains data for a long history for analysis.
    *   **Non-volatile**: Data is generally not deleted or modified once it has been created.

### XIII.02 Data Warehouse Modeling
*   **Fact table**: A core table composed of highly relevant measures (e.g., amount, number, time).
*   **Dimension table**: A sub-table and perspective of analyzing each fact.
*   **Data warehouse techniques**:
    *   **Star schema**: Separates data into fact and dimension tables. Dimension table data are not normalized.
    *   **Snowflake schema**: Fully normalizes the dimension table of the star schema, reducing data redundancy but potentially degrading query performance.

### XIII.03 Concept of ETL (Extraction, Transformation, Loading)
*   **Definition**: The entire process by which data is extracted from the source, cleansed, converted, and stored in the data warehouse.
*   **Phases**:
    1.  **Extraction**: Data is extracted from original files or operating DB.
    2.  **Transformation**: Extracted data is cleaned and converted into a data format suitable for the DW.
    3.  **Loading**: Converted data is sent to the warehouse for storage.

### XIII.04 Concept and Search Technique of OLAP (Online Analytical Processing)
*   **Concept**: The process by which the end user accesses multi-dimensional information for decision making.
*   **Main OLAP Search Techniques (Examples)**:
    *   **Drill Down**: A search technique that approaches a low (detail) summary level from a high summary level.
    *   **Roll Up**: A search technique that approaches a high summary level from a low summary level.
    *   **Pivot**: A search technique that changes the axis of the analysis perspective on a specific analysis topic.
    *   **Dice**: A search technique that creates subsets by slicing more than two dimensions.

### XIII.05 Concept and Algorithm of Data Mining
*   **Definition**: A series of processes that apply a systematic statistical rule or pattern to large amounts of data for corporate decision-making.
*   **Data Mining Algorithms (Examples)**:
    *   **Association**: Discovers patterns using combinations of data, often applied offline stores to recommend related products.
    *   **Classification**: Algorithms that create a tree-type model which classifies the values (category values).
    *   **Clustering**: Algorithms that group records with similar attributes into subsets or clusters (e.g., K-Means algorithm).

# XIV. Understanding Big Data and NoSQL

## Summary of Section XIV
This section addresses the emergence of Big Data, defined by its 3V characteristics (Volume, Velocity, Variety). Specialized technologies like Distributed File Systems (DFS) and MapReduce are required for its storage and processing. The evolution away from traditional relational databases is highlighted by NoSQL (Not Only SQL), which prioritizes scalability and availability (BASE attributes) over strict relational consistency (ACID properties) and adheres to the limitations described by the CAP theorem.

### XIV.01 Big Data Overview
#### A) Definition and characteristics of big data
*   **Definition**: Data that exceeds the ability of database management tools to capture, store, analyze, and process large-scale data.
*   **Three elements (3V) of big data**:
    *   **Volume**: Refers to the limit of petabytes or more.
    *   **Velocity**: Refers to the high speed, demanding real-time processing.
    *   **Variety**: Refers to diverse kinds of data (structured, semi-structured, and unstructured).

#### B) Detailed technology by big data life cycle
1.  **Collection**: Technology to collect data from all devices and systems (e.g., Crawling, ETL).
2.  **Storage/processing**: Technology to store large-scale data using a distributed processing system (e.g., DFS, NoSQL, MapReduce).
3.  **Analysis**: Methods of analysis that extract meaning from the data (e.g., Text mining, Neural network).
4.  **Visualization**: Technology to analyze results effectively (e.g., Graphs, drawings).

### XIV.02 Technologies Related to Big Data
*   **MapReduce**: A programming model designed for the parallel distributed processing of big data using inexpensive machines. It performs batch-based processing.

### XIV.03 NoSQL
#### A) Definition and characteristics of NoSQL
*   **Definition**: A non-relational database that processes more data than relational DBs and excels at scalability and distributed storage.
*   **Characteristics (Examples)**: Processing of large-scale data (provides loose data structure), Inexpensive cluster configuration (supports scale-out and replication), High scalability (allows gradual node increase).

#### B) BASE attributes of NoSQL
NoSQL focuses on the BASE attributes, contrasting with the ACID properties of traditional RDBMS.
*   **Basically Available**: Emphasis on availability (guaranteed even with multiple failures).
*   **Soft-State**: Node status is determined by external information; updates are applied when needed (delayed consistency).
*   **Eventually Consistent**: Consistency is maintained optimally, even though it may be lost temporarily.

#### C) Storage method of NoSQL
*   **Key-value based**: Most basic NoSQL database, providing simple and fast Get, Put, and Delete functions.
*   **Column family based**: Stores data in rows in the column family.
*   **Document based**: Stores documents such as XML, JSON, or BSON.
*   **Graph based**: Expresses the relationship between entities, such as a node and the relationship as the edge.

# XV. Understanding Artificial Intelligence

## Summary of Section XV
Artificial Intelligence (AI) is technology that realizes human learning and reasoning abilities using computer programs. AI is classified by capability (Weak, Strong, Super AI). Machine learning is categorized into Supervised (learning with intended results/labels), Unsupervised (learning input characteristics without labels, e.g., Clustering), and Reinforcement learning (learning through behavior/feedback). Deep Learning (DL), based on deep neural networks (DNN), is a major modern advancement, with algorithms like CNN (image processing) and RNN (sequential data).

### XV.01 Overview of AI
#### A) Definition and classification of AI
*   **Definition of AI**: A technology that realizes human learning ability, reasoning, perception ability, and natural language understanding ability by using computer programs.
*   **Classification by capability (Examples)**:
    *   **Weak/Artificial Narrow Intelligence (ANI)**: Operable only under given conditions (e.g., Google Maps).
    *   **Strong/Artificial General Intelligence (AGI)**: AI that can think like humans.
    *   **Artificial Super Intelligence (ASI)**: AI that surpasses humans in all areas.

#### C) Distinguishing AI (Turing Test)
*   The Turing test is designed to test whether a machine can have intelligence.
*   If the evaluator cannot reliably distinguish the machine from a human being, the machine is considered to have thought like a human.

#### D) Machine learning
*   **Supervised learning**: A learning method that uses data describing the intended result.
    *   **Learning Problem**: Classification, regression, prediction.
    *   **Example**: Neural network, Hidden Markov Model (HMM), Decision tree.
*   **Unsupervised learning**: A learning method that uses data that does not describe the intended result.
    *   **Purpose**: The purpose is to understand the common characteristics of input patterns.
    *   **Learning Problem**: Clustering, dimension reduction.
    *   **Example**: K-means algorithm.
*   **Reinforcement learning**: A method of learning which increases its own knowledge through the experience of being praised for good behavior and punished for wrongdoing.

#### E) Deep learning
*   **Definition**: A series of machine learning based on the deep neural networks (DNN) theory and an algorithm that teaches computers how to think like a human.
*   **Deep learning algorithms (Examples)**:
    *   **DNN (Deep Neural Network)**: An artificial neural network composed of multiple hidden layers.
    *   **CNN (Convolutional Neural Network)**: A neural network algorithm suitable for image data processing.
    *   **RNN (Recurrent Neural Network)**: A neural network where the connections between units constitute a recurrent cycle, relating to past and current network states.
    *   **DBN (Deep Belief Network)**: A deep learning technique that stacks the Restricted Boltzmann Machine (RBM).
