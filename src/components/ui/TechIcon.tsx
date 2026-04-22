"use client";

import {
  SiPython, SiPytorch, SiTensorflow, SiScikitlearn,
  SiGooglecloud, SiDocker, SiPostgresql, SiMongodb,
  SiRedis, SiGrafana, SiStreamlit, SiPlotly, SiR,
  SiOpenai, SiFastapi, SiGithub, SiKaggle,
  SiScipy, SiHuggingface, SiLangchain,
  SiNumpy, SiPandas, SiJupyter, SiGit, SiFlask, SiMysql,
  SiGoogle, SiCoursera,
} from "react-icons/si";
import { FaAws, FaMicrosoft, FaPython, FaChartBar, FaLinkedin, FaCode } from "react-icons/fa";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  // Languages
  python: SiPython,
  r: SiR,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  cplusplus: FaCode,
  // ML
  scikitlearn: SiScikitlearn,
  numpy: SiNumpy,
  pandas: SiPandas,
  jupyter: SiJupyter,
  scipy: SiScipy,
  xgboost: SiScipy,
  // Deep Learning
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  // GenAI
  langchain: SiLangchain,
  huggingface: SiHuggingface,
  openai: SiOpenai,
  pinecone: SiCoursera,
  // Visualization
  matplotlib: SiPlotly,
  seaborn: SiPlotly,
  tableau: FaChartBar,
  powerbi: FaMicrosoft,
  plotly: SiPlotly,
  streamlit: SiStreamlit,
  // MLOps & Tools
  fastapi: SiFastapi,
  flask: SiFlask,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  aws: FaAws,
  amazonaws: FaAws,
  // Social
  linkedin: FaLinkedin,
  kaggle: SiKaggle,
  // Certifications
  google: SiGoogle,
  googlecloud: SiGooglecloud,
  microsoftazure: FaMicrosoft,
};

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechIcon({ name, size = 24, className }: TechIconProps) {
  const Icon = iconMap[name.toLowerCase()] || FaPython;
  return <Icon size={size} className={className} />;
}
