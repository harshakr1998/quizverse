const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '../src/data');
let errors = 0;
let count = 0;
const allQuestions = new Map();
const normalize = text => text.normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, ' ').trim();
for (const dir of fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
  for (const file of fs.readdirSync(path.join(root, dir.name)).filter(name => name.endsWith('.json'))) {
    const label = `${dir.name}/${file}`;
    const questions = JSON.parse(fs.readFileSync(path.join(root, dir.name, file), 'utf8'));
    const ids = new Set();
    const texts = new Set();
    for (const q of questions) {
      count++;
      const issues = [];
      if (!Number.isInteger(q.id) || ids.has(q.id)) issues.push('invalid or duplicate ID');
      if (!q.question || texts.has(q.question)) issues.push('missing or duplicate question');
      if (typeof q.question === 'string') {
        const key = normalize(q.question);
        const previous = allQuestions.get(key);
        if (previous) issues.push(`duplicate question also in ${previous}`);
        else allQuestions.set(key, `${label} #${q.id}`);
      }
      if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some(option => typeof option !== 'string' || !option.trim()) || new Set(q.options).size !== 4) issues.push('invalid options');
      if (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options?.length) issues.push('invalid correct answer');
      if (!q.explanation || !Array.isArray(q.tags) || !['Easy', 'Medium', 'Hard'].includes(q.difficulty)) issues.push('missing metadata');
      if (q.question?.startsWith('[Generated]') || q.tags?.includes('procedural')) issues.push('placeholder content');
      if (issues.length) { console.error(`${label} #${q.id}: ${issues.join(', ')}`); errors++; }
      ids.add(q.id); texts.add(q.question);
    }
  }
}
if (errors) process.exitCode = 1;
else console.log(`Validated ${count} questions. Check technical accuracy separately.`);
