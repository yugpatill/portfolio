import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "adaptive-rag",
    title: "Adaptive RAG Portfolio Chatbot",
    description:
      "An agentic RAG chatbot that intelligently routes every query to the right pipeline — documents, web search, or general LLM — powered entirely by a local model. No OpenAI. No API costs. 100% free.",
    tags: ["Python", "LangChain", "RAG", "LLMs", "FAISS", "Local LLM"],
    github: "https://github.com/yugpatill/adaptive-rag-portfolio",
    featured: true,
    category: "NLP",
  },
  {
    id: "multi-agent-code-review",
    title: "Multi-Agent Code Review System",
    description:
      "4 specialized AI agents (Security, Performance, Code Quality, Test Coverage) analyze GitHub PRs in parallel, then a meta-agent synthesizes findings into a single prioritized review. Built with Google Gemini structured JSON output and asyncio for true parallel execution.",
    tags: ["Python", "Google Gemini", "Streamlit", "Pydantic", "asyncio", "Multi-Agent"],
    github: "https://github.com/yugpatill/multi-agent-code-review-system",
    featured: true,
    category: "MLOps",
    metrics: "5",
    metricsLabel: "AI Agents · Parallel Review",
  },
  {
    id: "student-performance",
    title: "Student Performance Prediction",
    description:
      "End-to-end ML pipeline predicting student pass/fail and final grade (G3) using demographic, academic, and behavioral data. Implemented Logistic Regression, Decision Trees, Random Forest, and SVM with full preprocessing and cross-validation.",
    tags: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Machine Learning"],
    github: "https://github.com/yugpatill/student-performance-prediction",
    featured: true,
    category: "ML",
    metrics: "91%",
    metricsLabel: "Accuracy · ROC-AUC 0.98",
  },
  {
    id: "grad-admission",
    title: "Graduate Admission Predictor",
    description:
      "Regression model predicting university admission chances based on GRE, TOEFL, CGPA, and other profile features. Used GridSearchCV for model selection across multiple algorithms.",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter"],
    github: "https://github.com/yugpatill/Graduate-Admission-Prediction-Model",
    featured: true,
    category: "ML",
    metrics: "92.8%",
    metricsLabel: "Accuracy",
  },
  {
    id: "spam-detector",
    title: "Spam Email Detector",
    description:
      "NLP model classifying spam emails using TF-IDF vectorization and logistic regression. Applied full text preprocessing pipeline including tokenization, stopword removal, and feature extraction.",
    tags: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas"],
    featured: false,
    category: "NLP",
  },
  {
    id: "uber-cancellation",
    title: "Uber Ride Cancellation Analysis",
    description:
      "EDA on 150,000 Uber ride bookings to uncover cancellation patterns across drivers, customers, vehicle types, pickup/drop locations, and time-of-day. Surfaced actionable insights to improve ride fulfillment rates.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"],
    github: "https://github.com/yugpatill/Uber-Rides-Cancelation-Analysis",
    featured: false,
    category: "ML",
  },
  {
    id: "frequent-pattern-mining",
    title: "Frequent Pattern Mining Engine",
    description:
      "Implements and compares three frequent itemset mining approaches — Brute Force (from scratch), Apriori, and FP-Growth — on five retail datasets. Configurable min-support and min-confidence via CLI.",
    tags: ["Python", "mlxtend", "Apriori", "FP-Growth", "Data Mining"],
    github: "https://github.com/yugpatill/data_mining_midtermproject",
    featured: false,
    category: "ML",
  },
  {
    id: "securecalc",
    title: "SecureCalc: Full-Stack FastAPI App",
    description:
      "Full-stack web app with BREAD calculator operations, JWT authentication, and a user profile/password management system. Backed by PostgreSQL, tested with Playwright E2E, and shipped via GitHub Actions CI/CD to Docker Hub.",
    tags: ["FastAPI", "SQLAlchemy", "Docker", "Playwright", "CI/CD", "PostgreSQL"],
    github: "https://github.com/yugpatill/is601_final_project",
    featured: false,
    category: "MLOps",
  },
  {
    id: "heart-failure-classification",
    title: "Binary Classification: Heart Failure",
    description:
      "Trains and compares Random Forest, SVM (RBF), and GRU on the UCI Heart Failure dataset using 10-fold stratified cross-validation. Evaluates across 9 metrics including ROC/AUC, F1, TSS, HSS, and Brier Score.",
    tags: ["Python", "Scikit-learn", "TensorFlow", "NumPy", "Pandas"],
    github: "https://github.com/yugpatill/patil_yug_finaltermproj",
    featured: false,
    category: "ML",
  },
  {
    id: "enhanced-calculator",
    title: "Enhanced CLI Calculator",
    description:
      "Command-line calculator using Factory, Memento (undo/redo), and Observer design patterns. Auto-saves history to CSV via pandas, .env-driven config, color-coded output, and 90%+ test coverage with GitHub Actions CI.",
    tags: ["Python", "Design Patterns", "pandas", "pytest", "CI/CD"],
    github: "https://github.com/yugpatill/is601_Enhanced_Calculator",
    featured: false,
    category: "MLOps",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis with NLTK",
    description:
      "Naive Bayes sentiment classifier trained on NLTK's movie_reviews dataset. Handles text cleaning, tokenization, and stopword removal to predict positive/negative sentiment on new inputs.",
    tags: ["Python", "NLTK", "Naive Bayes", "NLP", "Text Classification"],
    github: "https://github.com/yugpatill/sentiment_analysis_on_textdata_using_NLTK",
    featured: false,
    category: "NLP",
  },
  {
    id: "image-classifier",
    title: "Image Classifier: CNN on MNIST",
    description:
      "Convolutional Neural Network built with TensorFlow/Keras to classify handwritten digits (0–9) from the MNIST dataset. Three conv layers with ReLU activations, Adam optimizer, and one-hot encoded labels.",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "Deep Learning"],
    github: "https://github.com/yugpatill/Image_Classifier_using_Keras_and_TensorFlow",
    featured: false,
    category: "Computer Vision",
  },
];
