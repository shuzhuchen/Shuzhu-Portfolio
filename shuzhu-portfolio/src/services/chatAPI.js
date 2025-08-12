import {
  personalInfo,
  skills,
  experiences,
  projects,
  education,
  courses,
  certifications
} from '../assets/data.js';

/**
 * 预处理，把结构化数据拆解成扁平的文本文档列表
 */
const knowledgeBase = [];

// 个人信息
knowledgeBase.push({
  id: 'personalInfo',
  text: `${personalInfo.name}, ${personalInfo.title}. ${personalInfo.description} ${personalInfo.about.join(' ')}`
});

// 技能
Object.entries(skills).forEach(([category, skillList]) => {
  knowledgeBase.push({
    id: `skills_${category}`,
    text: `${category}: ${skillList.join(', ')}`
  });
});

// 工作经历
experiences.forEach((exp, i) => {
  knowledgeBase.push({
    id: `experience_${i}`,
    text: `${exp.position} at ${exp.company}, ${exp.location}, ${exp.period}. Responsibilities: ${exp.responsibilities.join('; ')}`
  });
});

// 项目经历
projects.forEach((proj, i) => {
  knowledgeBase.push({
    id: `project_${i}`,
    text: `${proj.name}: ${proj.brief} Tech stack: ${proj.techStack?.join(', ') || ''}`
  });
});

// 教育背景
education.forEach((edu, i) => {
  knowledgeBase.push({
    id: `education_${i}`,
    text: `${edu.degree} at ${edu.school}, ${edu.location}, ${edu.period}. ${edu.description || ''}`
  });
});

// 课程
Object.entries(courses).forEach(([level, courseList]) => {
  knowledgeBase.push({
    id: `courses_${level}`,
    text: `${level} courses: ${courseList.join(', ')}`
  });
});

// 证书
certifications.forEach((cert, i) => {
  knowledgeBase.push({
    id: `certification_${i}`,
    text: `${cert.name} from ${cert.organization}, obtained ${cert.date}`
  });
});

/**
 * 简单文本向量化：转小写，拆单词，统计词频（示范）
 * @param {string} text 
 * @returns {Object} 词频对象
 */
function textToVector(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq = {};
  words.forEach(w => {
    freq[w] = (freq[w] || 0) + 1;
  });
  return freq;
}

/**
 * 计算两个词频向量余弦相似度
 * @param {Object} vec1 
 * @param {Object} vec2 
 * @returns {number}
 */
function cosineSimilarity(vec1, vec2) {
  const allKeys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
  let dot = 0, mag1 = 0, mag2 = 0;
  allKeys.forEach(k => {
    const v1 = vec1[k] || 0;
    const v2 = vec2[k] || 0;
    dot += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });
  if (mag1 === 0 || mag2 === 0) return 0;
  return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

/**
 * 从知识库中检索 topK 相关文档
 * @param {string} query 
 * @param {number} topK 
 */
function retrieveTopKDocs(query, topK = 3) {
  const queryVec = textToVector(query);
  const scored = knowledgeBase.map(doc => {
    const docVec = textToVector(doc.text);
    const score = cosineSimilarity(queryVec, docVec);
    return { doc, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(item => item.doc);
}

/**
 * 模拟生成回答文本，结合检索上下文
 * @param {string} query 
 * @param {Array} docs 
 */
function generateAnswer(query, docs) {
  let contextText = docs.map(d => `- ${d.text}`).join('\n');
  return `You asked: "${query}". Based on my knowledge, here are some relevant information:\n${contextText}`;
}

/**
 * 主聊天接口
 * @param {string} query 用户问题
 * @param {Array} history 聊天上下文（未用到，可扩展）
 * @returns {Promise<string>} 回答文本
 */
export async function chatWithRAG(query, history = []) {
  // 简单模拟异步
  return new Promise((resolve) => {
    const topDocs = retrieveTopKDocs(query, 3);
    const answer = generateAnswer(query, topDocs);
    setTimeout(() => resolve(answer), 400); // 模拟网络延迟
  });
}