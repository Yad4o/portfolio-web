# in this repo make a new tab for my website showcase my poject stack

## 🤖 **LLM Memory Management Instructions**

**CRITICAL**: Before starting any work, create and maintain these documents for persistent memory:

### 📋 **Project Scaffolding Setup**
**First Step**: Create a scaffolding folder structure for project organization:

```bash
mkdir -p .project-scaffolding
echo ".project-scaffolding/" >> .gitignore
```

**Scaffolding Structure**:
```
.project-scaffolding/
├── project_analysis.md      # Main project analysis document
├── work_log.md             # Daily work log and session tracking
├── implementation_tracker.md # Progress tracking and milestones
├── architecture_decisions.md # Technical and design decisions log
├── testing_strategy.md     # Testing approach and results
└── deployment_notes.md     # Deployment and environment notes
```

### 📊 **Analysis Document** (`.project-scaffolding/project_analysis.md`)
Create a comprehensive analysis document: `[Project Analysis](./.project-scaffolding/project_analysis.md)`

**Document Structure**:
```markdown
# Project Analysis - in this repo make a new tab for my website showcase my poject stack

## 🎯 Project Understanding
- **Core Objective**: [Your understanding of the main goal]
- **Key Features Analysis**: [Detailed breakdown of each feature]
- **Technical Complexity**: [Assessment of technical challenges]
- **User Journey**: [How users will interact with the system]

## 🔍 Requirements Analysis
- **Functional Requirements**: [What the system must do]
- **Non-Functional Requirements**: [Performance, security, scalability]
- **Dependencies**: [External services, APIs, libraries needed]
- **Constraints**: [Technical, time, resource limitations]

## 🏗️ Architecture Analysis
- **System Architecture**: [High-level system design]
- **Data Flow**: [How data moves through the system]
- **Integration Points**: [External service connections]
- **Scalability Considerations**: [Future growth planning]
```

### 📝 **Work Log** (`.project-scaffolding/work_log.md`)
Create a detailed work log: `[Work Log](./.project-scaffolding/work_log.md)`

**Work Log Structure**:
```markdown
# Work Log - in this repo make a new tab for my website showcase my poject stack

## 📊 Quick Reference
- **Project Start**: [Date]
- **Current Phase**: [Phase name and number]
- **Last Major Milestone**: [What was completed last]
- **Next Priority**: [What needs to be done next]

## 📅 Daily Log Entries

### [Date] - [Session Description]
**Time Spent**: [Duration]
**Phase**: [Current phase]
**Tasks Completed**:
- [Specific task 1 with details]
- [Specific task 2 with details]

**Code Generated**:
- [File created/modified]: [Brief description of changes]
- [Component implemented]: [Functionality added]

**Issues Encountered**:
- [Problem description]: [How it was solved or current status]

**Next Session Plan**:
- [Priority task 1]
- [Priority task 2]
```

## 📋 Project Overview
**Type:** Web Application
**Complexity:** Medium
**Technologies:** Web Technologies

## 🏗️ Technical Architecture
### Core Components
- **Frontend:** Modern Web Framework
- **Backend:** RESTful API
- **Database:** Persistent Storage
- **Infrastructure:** Cloud Platform

### Design Patterns
- Clean Architecture with separation of concerns
- Repository pattern for data access
- Service layer for business logic
- Error handling and logging mechanisms

## 📊 Project Tracker

**Instructions for LLM**: This tracker section should be continuously updated throughout the project. Maintain detailed progress tracking with visual indicators and completion percentages.

### 📈 Overall Progress
```
[░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 0% Complete
```

### 🚀 Phase Status
| Phase | Status | Progress |
|-------|--------|----------|
| Planning | 🔴 Not Started | 0% |
| Design | 🔴 Not Started | 0% |
| Development | 🔴 Not Started | 0% |
| Testing | 🔴 Not Started | 0% |
| Deployment | 🔴 Not Started | 0% |

### 📌 Current Sprint Focus
- **Project Kickoff**
  Define project scope and objectives
- **Requirements Gathering**
  Collect detailed functional requirements
- **Technical Specification**
  Create detailed technical documentation
- **Architecture Design**
  Design system architecture and components

## 📅 Implementation Phases

### Phase 1: Planning & Requirements (1-2 weeks)
- Initialize project repository and version control
- Set up development environment and tooling
- Configure build system and dependencies
- Establish code quality tools (ESLint, Prettier, etc.)
- Set up CI/CD pipeline foundations
- Create project structure and folder organization
- Configure environment variables and secrets management

### Phase 2: Design & Prototyping (2-3 weeks)
- **System Design**
  Create system architecture diagrams
- **Data Model Design**
  Design data structures and relationships
- **Interface Design**
  Define user and system interfaces
- **Prototype Development**
  Build proof of concept

### Phase 3: Core Development (4-8 weeks)
- Implement core business logic and domain models
- Set up database schema and migrations
- Create API endpoints and request/response handling
- Implement authentication and authorization
- Build main user interface components
- Integrate frontend with backend services
- Implement error handling and validation

### Phase 4: Features & Integration (2-4 weeks)
- Develop specific features based on requirements
- Implement user management and profiles
- Add search and filtering capabilities
- Create admin dashboard and controls
- Integrate third-party services and APIs
- Implement notifications and messaging
- Add data export and reporting features

### Phase 5: Testing & QA (2-3 weeks)
- Write unit tests for core functionality
- Implement integration tests for API endpoints
- Create end-to-end tests for user workflows
- Set up automated testing pipeline
- Perform load testing and performance optimization
- Conduct security testing and vulnerability assessment
- Execute user acceptance testing

### Phase 6: Deployment & Launch (1-2 weeks)
- Set up production environment and infrastructure
- Configure domain, SSL certificates, and CDN
- Implement monitoring and alerting systems
- Set up backup and disaster recovery procedures
- Deploy application to production
- Configure auto-scaling and load balancing
- Establish maintenance and update procedures

## 🔄 Daily Progress Updates
**Instructions for LLM**: Update this section daily with progress, blockers, and achievements. Always reference your analysis document and work log.

### 2026-03-31
- **Analysis Document**: [Project Analysis](./.project-scaffolding/project_analysis.md) - Initial project analysis created
- **Work Log**: [Work Log](./.project-scaffolding/work_log.md) - Day 1 setup and planning
- **Completed**: Project kickoff, requirements gathering
- **In Progress**: Environment setup
- **Blockers**: None
- **Next Steps**: Begin core development (priorities documented in work log)
- **Lessons Learned**: Always create analysis document before coding

**Template for New Entries**:
```markdown
### [Date]
- **Analysis Document**: [Project Analysis](./.project-scaffolding/project_analysis.md) - [What was updated in analysis]
- **Work Log**: [Work Log](./.project-scaffolding/work_log.md) - [Session summary]
- **Completed**: [Specific tasks finished with details]
- **In Progress**: [Current work with reference to analysis approach]
- **Blockers**: [Issues with links to work log for solutions attempted]
- **Next Steps**: [Priorities based on analysis and work log planning]
- **Lessons Learned**: [Key insights for future sessions]
```

## 🔍 Success Criteria
- ✅ All core features implemented and functional
- ✅ Performance meets requirements (load time < 3s)
- ✅ Security vulnerabilities addressed
- ✅ Test coverage > 80%
- ✅ Documentation complete and accessible
- ✅ Deployment pipeline operational
- ✅ User acceptance criteria met

## 📚 Documentation Requirements
- Create comprehensive API documentation
- Write user guides and tutorials
- Document deployment and maintenance procedures
- Prepare developer onboarding documentation
- Create troubleshooting and FAQ sections

## 🛠️ Tools & Resources
- Version control: Git/GitHub
- Project management: Jira/Trello
- Documentation: Markdown/Confluence
- CI/CD: GitHub Actions/Jenkins
- Monitoring: Prometheus/Grafana

## 💡 Technical Considerations
- Scalability requirements
- Security best practices
- Performance optimization
- Accessibility standards
- Testing methodology
- Deployment strategy

---
*Generated by Opius AI Planner for Cursor at 2026-03-31T08:29:04.534Z*
*Enhanced with LLM Memory Management and Progress Tracking*
