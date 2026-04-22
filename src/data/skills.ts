import { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: "python", proficiency: 3 },
      { name: "R", icon: "r", proficiency: 2 },
      { name: "SQL", icon: "postgresql", proficiency: 3 },
      { name: "C / C++", icon: "cplusplus", proficiency: 2 },
    ],
  },
  {
    name: "Machine Learning",
    skills: [
      { name: "Scikit-learn", icon: "scikitlearn", proficiency: 3 },
      { name: "NumPy", icon: "numpy", proficiency: 3 },
      { name: "Pandas", icon: "pandas", proficiency: 3 },
      { name: "Jupyter", icon: "jupyter", proficiency: 3 },
      { name: "SciPy", icon: "scipy", proficiency: 2 },
      { name: "XGBoost", icon: "xgboost", proficiency: 2 },
    ],
  },
  {
    name: "Deep Learning",
    skills: [
      { name: "PyTorch", icon: "pytorch", proficiency: 2 },
      { name: "TensorFlow", icon: "tensorflow", proficiency: 2 },
    ],
  },
  {
    name: "Generative AI & LLMs",
    skills: [
      { name: "LangChain", icon: "langchain", proficiency: 3 },
      { name: "HuggingFace", icon: "huggingface", proficiency: 2 },
      { name: "RAG / FAISS", icon: "openai", proficiency: 3 },
      { name: "Pinecone", icon: "pinecone", proficiency: 2 },
    ],
  },
  {
    name: "Data Visualization",
    skills: [
      { name: "Matplotlib", icon: "matplotlib", proficiency: 3 },
      { name: "Seaborn", icon: "seaborn", proficiency: 3 },
      { name: "Tableau", icon: "tableau", proficiency: 2 },
      { name: "Power BI", icon: "powerbi", proficiency: 2 },
    ],
  },
  {
    name: "MLOps & Tools",
    skills: [
      { name: "FastAPI", icon: "fastapi", proficiency: 2 },
      { name: "Docker", icon: "docker", proficiency: 2 },
      { name: "Git / GitHub", icon: "git", proficiency: 3 },
      { name: "AWS", icon: "aws", proficiency: 2 },
      { name: "Flask", icon: "flask", proficiency: 2 },
      { name: "MySQL", icon: "mysql", proficiency: 2 },
    ],
  },
];
