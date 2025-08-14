import {
  Code,
  Monitor,
  Server,
  Cloud,
  Database,
  Brain,
  Users
} from 'lucide-react';

import smashinn1 from '../assets/smashinn-1.png';
import smashinn2 from '../assets/smashinn-2.png';
import agentimg from '../assets/agent.png';
import foodieimg from '../assets/foodie-1.png';
import ragimg from '../assets/RAG.png';
import autogen1 from '../assets/AutoGen-1.png';
import autogen2 from '../assets/AutoGen-2.png';
import autogen3 from '../assets/AutoGen-3.png';


import sjsuIcon from '../assets/sjsu.png';
import sufeIcon from '../assets/sufe.png';
import ocpAdmIcon from '../assets/ocp_adm.png';
import ocpDevIcon from '../assets/ocp_dev.png';
import neo4jIcon from '../assets/neo4j.png';
import adobeIcon from '../assets/adobe.png';
import adobePdf from '../assets/pdf/adobe.pdf';
import nvidiaicon from '../assets/nvidia.png';


// Personal Information
export const personalInfo = {
  name: "Shuzhu",
  title: "Full Stack & AI Developer",
  description: "I build exceptional digital experiences for the web and develop AI applications. Currently studying at SJSU, specializing in data science and artificial intelligence.",
  about: [
    "Hello there! My name is Shuzhu and I am a master's student at San Jose State University, pursuing a degree in Data Science. My journey began at Shanghai University of Finance and Economics, where I earned my Bachelor's in Mathematical Economics.",
    "Previously, I've been working on some exciting projects, including sentiment analysis, predicting employee attrition, and building automated orderbots. Exploring in various fields of AI/ML and software engineering, I've sharpened my skills in machine learning algorithms and full-stack development.",
    "I am currently looking for intern opportunities as Data Scientist, Machine Learning Engineer, or Software Development Engineer. If you're looking for an intern who can bring fresh, innovative thinking to your team, let's connect and see how we can turn data into insights and innovation together!"
  ]
};

// Skills and Categories
export const skills = {
  'Programming Languages': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'R'],
  'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Cassandra', 'Neo4j', 'BaseX', 'Pinecone'],
  'Frontend': ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Figma', 'Vercel'],
  'Backend': ['Node.js', 'Express.js', 'FastAPI'],
  'Cloud & DevOps': ['ECS', 'EC2', 'ECR', 'Lambda', 'S3', 'BigQuery', 'Cloud SQL', 'Docker', 'Kubernetes', 'Git', 'CI/CD'],
  'Data Science & Machine Learning': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Transformer', 'LLAMA3', 'Hugging Face', 'LangChain', 'LangGraph', 'Agentic AI'],
  'Big Data': ['Apache Spark', 'Kafka', 'Hadoop (MapReduce, YARN)', 'ETL'],
  'Project Management': ['Notion', 'Github', 'Jira']
};

export const skillIcons = {
  'Programming Languages': Code,
  Frontend: Monitor,
  Backend: Server,
  Cloud: Cloud,
  Database: Database,
  'DS/ML': Brain,
  'Project Management': Users,
};

// Experience Data
export const experiences = [
  {
    position: 'AI/ML Data Scientist',
    company: 'Kismet.xyz',
    location: 'San Jose, CA',
    period: 'Jan 2025 – Present',
    responsibilities: [
      'Designed and developed scalable distributed data processing pipelines using AWS cloud infrastructure (Glue, Lambda, S3, DynamoDB), enabling near real-time analytics and self-service BI solutions for business stakeholders.',
      'Built ETL processes and streaming data ingestion systems that optimize data flow into analytical dashboards and ML workflows, supporting data-driven decision making across multiple business functions.',
      'Developed end-to-end Agentic AI solutions with tool-calling capabilities (RAG, Email, Discord integrations) and full-stack applications including database schema design, REST API endpoints, and frontend/backend deployment.',
      'Gathered requirements from business stakeholders, developed POCs and prototypes, and collaborated with cross-functional teams.',
      'Established CI/CD pipelines using GitHub Actions, designed UI/UX prototypes in Figma, created production monitoring dashboards, and optimized cloud costs while maintaining operational excellence and on-call support capabilities.',
    ]
  },
  {
    position: 'Financial Data Analyst',
    company: 'Bank of China',
    location: 'Shanghai, China',
    period: 'Aug 2020 – Jun 2021',
    responsibilities: [
      'Developed and deployed 10+ interactive data visualization dashboards using Tableau, presenting key financial metrics and trends to senior management, which improved decision-making efficiency by 25% and enhanced reporting accuracy by 21%',
      'Performed in-depth analysis of over 50,000 financial data points from loan portfolios and trading systems to support credit risk management, utilizing SQL and Python to automate reporting workflows, reducing manual effort by 40% and improving process efficiency by 25%, leading to a 15% reduction in reporting errors'
    ]
  },
  {
    position: 'Research Assistant',
    company: 'Institute for Advanced Research, SUFE',
    project: 'Longitudinal Study on Migrant Children in Shanghai',
    location: 'Shanghai, China',
    period: 'Feb 2020 – Jun 2020',
    responsibilities: [
      "Designed and managed databases in Epidata and MySQL to collect and analyze 10k+ data records on migrant children's education, implementing ETL pipelines to ensure efficient data integration and storage.",
      'Conducted statistical analysis using R Programming and Python, identifying factors influencing education outcomes.',
      'Developed data quality control processes, implementing data validation, cleaning protocols, and SQL queries to ensure data accuracy and integrity.',
      'Performed exploratory data analysis (EDA) using clustering, regression, and other techniques to inform research hypotheses, with insights supporting study designs.'
    ]
  }
];

// Projects Data
export const projects = [

  // featured projects
  {
    id: 1,
    name: 'FoodieBot',
    category: 'LLM',
    images: [foodieimg, ragimg],
    brief: [
      'AI food review app (MERN) with RAG and chatbot powered by LangChain + LLaMA3.1.',
      'Pinecone + MongoDB backend, Dockerized and deployed on AWS.'
    ],
    techStack: ['MERN', 'LangChain', 'LLaMA3.1', 'Hugging Face', 'Pinecone', 'MongoDB', 'AWS', 'Docker'],
    github: 'https://drive.google.com/drive/folders/1o8-PJovwnX1EeU9wxaZQPRA2YtCbCH-h?usp=sharing',
    demo: 'https://foodiebot.vercel.app',
    keyAchievements: [
      'Optimized RAG (Pinecone + LangChain + LLaMA3.1) for higher accuracy and faster responses.',
      'Built large-scale Yelp data pipeline for cleaning, feature engineering, and indexing.',
      'Implemented agentic AI: multi-tool queries, email replies, and persistent memory in MongoDB.',
      'Containerized and deployed on AWS; reduced cost to ~$16/day (-97%).'
    ]
  },
  
  {
    id: 2,
    name: 'SmashINN',
    category: 'LLM',
    images: [smashinn1, smashinn2, agentimg],
    brief: [
      'An Agentic AI-powered Model Context Protocol (MCP) web application for racket sports players.',
      'Extract and analyze unstructured documents to generate a knowledge graph and provide personalized equipment recommendations.'
    ],
    techStack: ['Python', 'React', 'Node.js', 'FastAPI', 'LangChain', 'LangGraph', 'Mistral 7B', 'PyMuPDF', 'Tabula', 'Tesseract', 'DynamoDB', 'AWS'],
    github: 'https://drive.google.com/drive/folders/1mtL-JAVCK3Uw28QZVuRQMydsKEGid_bl?usp=sharing',
    demo: 'https://agentic-demo.vercel.app',
    keyAchievements: [
      'ETL Agent: parsed PDFs/images (PyMuPDF, Tabula, Tesseract) into structured metadata stored in DynamoDB.',
      'MCP Worker Agent: leveraged Mistral 7B + external APIs for contextual reasoning and real-time recommendations.',
      'Built a domain knowledge graph to enable fast lookup and accurate inference.',
    ]
  },
  {
    id: 3,
    name: 'AutoGenDoctor',
    category: 'LLM',
    images: [autogen1, autogen2, autogen3],
    brief: "A healthcare web application that provides virtual medical consultations, symptom analysis, and personalized health advice using Retrieval-Augmented Generation (RAG) and transformer-based models for reliable and accessible services.",
    techStack: ['LangChain', 'RAG', 'OpenAI','React', 'Node.js', 'FastAPI'],
    github: 'https://drive.google.com/drive/folders/1xuVtgEsAua3t5uQhWxhBtC6C2-F2qmU7?usp=sharing',
    demo: 'https://autogendoctor.vercel.app',
    keyAchievements: [
      'RAG + medical databases for real-time retrieval; higher diagnostic accuracy and fewer hallucinations.',
      'Transformer-based symptom analysis and personalized advice; >90% test accuracy.',
      'Secure, scalable API architecture; market fit (underserved regions, telemedicine) and compliance-ready data protection.'
    ]
  },

// more projects  
 [
  {
    id: 4,
    name: 'Automated Orderbot for Restaurant',
    category: 'LLM',
    brief: 'Developed an automated OrderBot using OpenAI’s Chat API for an e-commerce platform, enabling seamless customer interactions and order management.',
    techStack: ['OpenAI Chat API', 'JavaScript', 'JSON'],
    keyFeatures: ['Customer interaction automation', 'Order collection', 'JSON summary generation', 'Seamless communication'],
    github: '',
    demo: ''
  },

  {
    id: 5,
    name: 'Sentiment Analysis of Movie Reviews',
    category: 'Machine Learning',
    brief: 'Built custom tokenizer and TF-IDF features to classify movie reviews with over 90% accuracy.',
    techStack: ['Python', 'TF-IDF', 'Logistic Regression', 'Decision Trees', 'Naive Bayes'],
    keyFeatures: ['Custom tokenizer', 'Stopword stemming', 'Multi-model training', 'Accuracy 92%'],
    github: '',
    demo: ''
  },
  {
    id: 6,
    name: 'Predicting Employee Attrition in IBM',
    category: 'Machine Learning',
    brief: 'Used ensemble models and SHAP for feature importance to predict employee attrition.',
    techStack: ['Python', 'Random Forest', 'XGBoost', 'SHAP'],
    keyFeatures: ['Employee attrition prediction', 'Feature importance visualization', 'Ensemble modeling'],
    github: '',
    demo: ''
  },
  {
    id: 7,
    name: 'Energy Production Analysis (MCM/ICM Competition)',
    category: 'Data Analysis',
    brief: 'Processed historical energy data to analyze consumption trends and predict profiles using regression and clustering.',
    techStack: ['Python', 'Regression Analysis', 'Cluster Analysis', 'TOPSIS'],
    keyFeatures: ['Data cleansing', 'Trend analysis', 'Predictive modeling'],
    github: '',
    demo: ''
  },
  {
    id: 8,
    name: 'Impact of Natural Disasters on Farmers\' Income (Senior Project)',
    category: 'Data Analysis',
    brief: 'Used panel regression on CFPS data to study how natural disasters affect household income of farmers in China.',
    techStack: ['Python', 'Panel Data Regression', 'Statistical Analysis'],
    keyFeatures: ['Large-scale survey data', 'Regression modeling', 'Economic impact assessment'],
    github: '',
    demo: ''
  },
  {
    id: 9,
    name: 'ChessSite: Online Chess Platform Data Integration',
    category: 'Database',
    brief: 'Designed data integration and warehouse solutions for chess platform analytics and business process orchestration.',
    techStack: ['Java', 'Data Warehousing', 'Hierarchical Clustering'],
    keyFeatures: ['Data consolidation', 'Subscription analytics', 'Quality management', 'Business process orchestration'],
    github: 'https://drive.google.com/drive/folders/1qLJAspYVlXOMLaXOee1exIKKFdnACpU9?usp=sharing',
    demo: ''
  },
  {
    id: 10,
    name: 'Voice of Customer Topic Modeling',
    category: 'Machine Learning',
    brief: 'Built scalable pipeline and topic modeling with LDA and BERT to extract insights from customer feedback data.',
    techStack: ['Python', 'SQL', 'LDA', 'BERT', 'ChatGPT API'],
    keyFeatures: ['Scalable data pipeline', 'Topic modeling', 'Sentiment classification improvement'],
    github: '',
    demo: ''
  },
  {
    id: 11,
    name: 'LLM-Powered Knowledge Retrieval and QA System',
    category: 'LLM',
    brief: 'Developed a question-answering system integrating LangChain and vector databases for fast, context-aware responses.',
    techStack: ['Python', 'LangChain', 'Vector DB', 'Prompt Engineering'],
    keyFeatures: ['Dynamic QA', 'Vector-based retrieval', 'Zero latency queries'],
    github: 'https://drive.google.com/drive/folders/1B_hxW3L857d2iJYSsPzlnkzY8ZynB6_z?usp=drive_link',
    demo: ''
  },
  {
    id: 12,
    name: 'Teaching Assistant Web Application (Master Project)',
    category: 'LLM',
    brief: 'Interactive app using Gradio and Hugging Face Transformers to assist educators with content generation and Q&A.',
    techStack: ['Python', 'Gradio', 'Hugging Face Transformers'],
    keyFeatures: ['Real-time assistance', 'Lesson planning', 'Text summarization'],
    github: '',
    demo: ''
  },
  {
    id: 13,
    name: 'Hotel Recommendation System',
    category: 'Machine Learning',
    brief: 'Built personalized hotel recommendations by analyzing ratings, reviews, and sub-ratings.',
    techStack: ['Python', 'Recommender Systems', 'Data Analysis'],
    keyFeatures: ['Personalized recommendations', 'Multi-factor analysis', 'Rating prediction'],
    github: 'https://github.com/shuzhuchen/CMPE256_Project_Hotel_Recommendation_System.git',
    demo: ''
  },
  {
    id: 14,
    name: 'Image Classification',
    category: 'Machine Learning',
    brief: 'Implemented an image classification model using PyTorch.',
    techStack: ['Python', 'PyTorch', 'CNN'],
    keyFeatures: ['Model training', 'Image dataset', 'Accuracy evaluation'],
    github: 'https://drive.google.com/drive/folders/1xTRiz6KV2efBdOOJiHgeFDmvMRzeSsff?usp=sharing',
    demo: ''
  },
  {
    id: 15,
    name: 'Job Hunter',
    category: 'Database',
    brief: 'Project related to job market data analysis and modeling.',
    techStack: ['Python', 'Data Analysis'],
    keyFeatures: [],
    github: '',
    demo: ''
  },

  {
    id: 16,
    name: 'Restaurant Location Analysis',
    category: 'Data Analysis',
    brief: 'Clustered Toronto blocks with GeoPy and Foursquare data to identify competitive restaurant areas.',
    techStack: ['Python', 'GeoPy', 'Foursquare API', 'K-means', 'Folium'],
    keyFeatures: ['Geospatial clustering', 'Site selection support', 'Spatial visualization'],
    github: '',
    demo: ''
  },
  {
    id: 17,
    name: "Smart Home's Temperature - Time Series Forecasting",
    category: 'Machine Learning',
    brief: 'Applied time series forecasting to predict smart home temperature variations.',
    techStack: ['Python', 'Time Series Analysis', 'Forecasting Models'],
    keyFeatures: ['Temperature prediction', 'Time series modeling'],
    github: '',
    demo: ''
  },
  {
    id: 18,
    name: 'Game Finder',
    category: 'Database',
    brief: 'Data-driven project to find and recommend games based on user preferences.',
    techStack: ['Java', 'Data Analysis'],
    keyFeatures: [],
    github: 'https://drive.google.com/drive/folders/1VKG5IBUnJRcVIM3BLpBglxACocxrzYv8?usp=sharing',
    demo: ''
  },
  {
    id: 19,
    name: 'Omnisense Dashboard',
    category: 'Database',
    brief: 'Developed a dashboard for oil and gas company, helping clients with data visualization and monitoring real-time data.',
    techStack: ['React', 'AWS DynamoDB', 'API Gateway', 'Data Visualization'],
    keyFeatures: ['Interactive dashboard', 'Real-time data display'],
    github: '',
    demo: 'https://main.d2u1l2rut1jdh2.amplifyapp.com/'
  },
    {
    id: 20,
    name: 'Portfolio Chatbot (Coming Soon)',
    category: 'LLM',
    brief: 'Upcoming chatbot project for portfolio interaction and personal branding.',
    techStack: ['RAG', 'Vector DB', 'Langchain', 'Agentic AI'],
    keyFeatures: [],
    github: '',
    demo: ''
  },
  {
    id: 21,
    name: 'Cross Reference for Semiconductor Products (Coming Soon)',
    category: 'Machine Learning',
    brief: 'Upcoming ML project targeting semiconductor data analysis and cross-referencing.',
    techStack: ['sentence-transformers', 'LLM', 'cosine similarity'],
    keyFeatures: [],
    github: '',
    demo: ''
  },
],
];

// Education Data
// export const education = [
//   {
//     degree: 'Master of Science in Engineering, Data Science Specialization',
//     school: 'San Jose State University',
//     location: 'San Jose, CA',
//     period: 'Graduate: May 2025',
//     type: 'graduate'
//   },
//   {
//     degree: 'Bachelor of Economics in Mathematical Economics',
//     school: 'Shanghai University of Finance and Economics',
//     location: 'Shanghai, China',
//     period: 'Graduate: July 2020',
//     type: 'undergrad'
//   },
// ];


export const education = [
  {
    degree: "Master of Science in Engineering, Data Science Specialization",
    school: "San Jose State University",
    icon: sjsuIcon, 
    period: "August 2023 - May 2025",
    major: "Data Science",
    location: "San Jose, CA",
    gpa: "3.8/4.0",
    advisor: "Dr. Ahmed Hambaba",
    advisorLink: "https://www.sjsu.edu/people/ahmed.hambaba/",
    description: "Focused on AI, machine learning, and data engineering, with a strong foundation in database systems, advanced analytics, and emerging technologies for complex systems engineering",
    key: "graduate",
    // involvement: "Teaching Assistant for CS160 (Web Programming), Member of IEEE Student Chapter." // New field
  },
  {
    degree: "Bachelor of Economics in Mathematical Economics",
    school: "Shanghai University of Finance and Economics",
    icon: sufeIcon,
    period: "September 2016 - July 2020",
    major: "Economics",
    location: "Shanghai, China",
    advisor: "Dr. Yuanyuan Chen",
    advisorLink: "https://iaren.sufe.edu.cn/00/95/c8152a131221/page.htm",
    description: "Built a strong quantitative and analytical foundation through mathematics, programming, and economics, learning to tackle real-world problems with data and models.",
    key: "undergraduate",
    involvement: [
      "Research Assistant in Institute for Advanced Research",
      "Team Leader for The 2017 Village Investigation Program",
      "Member of Digital & Visual Club, Student Union",
      // "https://english.sufe.edu.cn/ff/ad/c3087a65453/page.htm"
    ]
  }
];

// courses data 

export const courses = {
  graduate: [
    'Artificial Intelligence and Data Engineering',
    'Database System Principles',
    'Deep Learning',
    'Advanced Data Mining',
    'Machine Learning',
    'Engineering Analysis',
    'Analytics for Systems Engineering',
    'System Engineering',
    'Special Topics in Emerging Technologies',
  ],
  undergraduate: [
    'Computer Programming(C++)',
    'Data-Driven Business Problem Modeling',
    'Data Structures and Algorithms',
    'Applied Time Series Analysis',
    'Mathematical Analysis I, II, III',
    'Linear Algebra',
    'Probability Theory and Mathematical Statistics',
    "Microeconomics",
    "Macroeconomics",
    "Intermediate Microeconomics",
    "Intermediate Macroeconomics",
    "Advanced Microeconomics",
    "Advanced Macroeconomics",
    "Econometrics",
    "Applied Econometrics",
    'Experimental Economics',
    'International Economics',
    'Western Economics',
    'Game Theory and Information Economics',
  ],
};

export const certifications = [
  {
    name: "MySQL 8.0 Database Developer Oracle Certified Professional",
    organization: "Oracle University",
    date: "July 2025",
    icon: ocpDevIcon,
    link: "https://drive.google.com/file/d/1KUG77COCuIa5CutiFridBP-7sBFOifEU/view?usp=sharing"
  },
  {
    name: "MySQL 8.0 Database Administrator Oracle Certified Professional",
    organization: "Oracle University",
    date: "July 2025",
    icon: ocpAdmIcon,
    link: "https://drive.google.com/file/d/1Q-4yiLHZbVa9tL02llRaJ04dmzQp68rc/view?usp=sharingf"
  },
  {
    name: "Neo4j Certified Professional",
    organization: "Neo4j",
    date: "July 2025",
    icon: neo4jIcon,
    link: "https://graphacademy.neo4j.com/c/b19d2f86-57be-49a5-98c8-7e1bdc8182a6/"
  },
  {
    name: "Adobe Workfront Foundations",
    organization: "Adobe",
    date: "Apr 2025",
    icon: adobeIcon,
    link: adobePdf
  },
  {
    name: "Building LLM Applications With Prompt Engineering",
    organization: "NVIDIA, Deep Learning Institute",
    date: "Feb 2025",
    icon: nvidiaicon,
    link: " "
  },
  // {
  //   name: "AWS Cloud Practitioner",
  //   organization: "Coursera - Stanford University",
  //   date: "March 2025",
  //   icon: ocpAdmIcon,
  //   link: "https://coursera.org/verify/xxxxxx"
  // },
  // {
  //   name: "AWS Practical Essentials",
  //   organization: "DeepLearning.AI",
  //   date: "Jun 2024",
  //   icon: ocpAdmIcon,
  //   link: "https://coursera.org/verify/yyyyyy"
  // },
];