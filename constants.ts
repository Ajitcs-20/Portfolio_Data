import { PortfolioData } from "./types";

export const DEFAULT_PORTFOLIO: PortfolioData = {
  name: "Ajit Sharma",
  title: "Azure Data Engineer",
  bio: "Azure Data Engineer at ThoughtSol Infotech with extensive experience in building ETL pipelines using Python, SQL, and Azure. Previously worked at BluePi Consulting handling data engineering and frontend tasks. Expert in Databricks, PySpark, and React.js.",
  email: "ajitsharma4789@gmail.com",
  location: "India",
  avatarUrl: "/Ajit_Pic.jpg",
  skills: [
    "Azure Data Factory", "Azure Databricks", "Azure Synapse", 
    "Python", "SQL", "PySpark", "Delta Lake",
    "React.js", "JavaScript", "TypeScript", 
    "ETL Pipelines", "Git", "Agile", "Jira"
  ],
  experience: [
    {
      role: "Azure Data Engineer",
      company: "ThoughtSol Infotech Pvt. Ltd",
      duration: "Aug 2025 - Present",
      details: [
        "Designing and implementing scalable data pipelines on Microsoft Azure.",
        "Optimizing data workflows and ensuring data quality for enterprise analytics.",
        "Collaborating with cross-functional teams to deliver robust data solutions.",
        "Working with large-scale data processing technologies."
      ]
    },
    {
      role: "Engineer",
      company: "BluePi Consulting",
      duration: "Sep 2024 - May 2025",
      details: [
        "Specialized in Azure services including Data Factory and Synapse Analytics.",
        "Worked on data validation, transformation, and removing duplicates to keep data clean.",
        "Used SQL and Python to clean and standardize data for downstream reporting.",
        "Communicated directly with US clients to gather requirements and review progress."
      ]
    },
    {
      role: "Engineer Trainee",
      company: "BluePi Consulting",
      duration: "Sep 2023 - Sep 2024",
      details: [
        "Gained hands-on experience with JavaScript, React.js, and cloud fundamentals.",
        "Participated in Agile development cycles and used Jira for task tracking.",
        "Assisted in spotting bugs in code and finding data issues after loading.",
        "Collaborated with senior engineers to implement frontend and backend features."
      ]
    },
    {
      role: "Student",
      company: "GLA University",
      duration: "Jul 2019 - Jun 2023",
      details: [
        "Bachelor of Technology in Computer Science & Engineering.",
        "Focused on Machine Learning, Web Technologies (HTML/CSS), and Core CS subjects.",
        "Built a strong foundation in software engineering principles."
      ]
    }
  ],
  projects: [
    {
      title: "OSTTRA",
      description: "Implemented scalable data transformation workflows in Azure Databricks using PySpark, ensuring clean and validated data for reporting in Azure Synapse.",
      technologies: ["SQL", "Python", "Databricks", "PySpark", "ADF"],
      link: "#"
    },
    {
      title: "RxBenefits",
      description: "Built scalable data pipelines with PySpark and Azure. Improved frontend UX using React and optimized APIs, combining data engineering with frontend expertise.",
      technologies: ["SQL", "Python", "ETL", "React.js", "TypeScript"],
      link: "#"
    }
  ],
  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/ajit-sharma-ajitcse20/" },
    { platform: "GitHub", url: "https://github.com/Ajitcs-20" }
  ]
};