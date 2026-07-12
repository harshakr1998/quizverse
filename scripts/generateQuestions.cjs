const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const templates = {
  java: {
    basics: ["What is the default value of a {type} variable in Java?", "Which keyword is used to define a {concept} in Java?", "What is the size of the {type} primitive in Java?"],
    oop: ["How is {concept} implemented in Java?", "Which of the following breaks {concept} in Java?", "What is the primary benefit of {concept}?"],
    collections: ["What is the time complexity of adding to a {type}?", "Which interface does {type} implement?", "Is {type} thread-safe in Java?"],
    exceptions: ["What happens if a {type} is thrown and not caught?", "Is {type} a checked or unchecked exception?", "Which block is executed after a {type}?"],
    streams: ["What does the {type} method do in a Stream?", "Is the {type} operation intermediate or terminal?", "How does {type} affect the stream pipeline?"]
  },
  python: {
    basics: ["What is the output of `{concept}` in Python?", "How do you declare a {type} in Python?", "What does the `{concept}` function do?"],
    oop: ["How do you implement {concept} in Python?", "What is the purpose of the `{type}` method?", "Does Python support multiple {concept}?"],
    collections: ["What is the time complexity of `{concept}` on a list?", "How does a {type} differ from a list?", "Is a {type} mutable in Python?"],
    exceptions: ["What is the base class for {type} in Python?", "How do you handle a {type}?", "What keyword is used to raise a {type}?"]
  },
  selenium: {
    locators: ["How does the {type} locator work?", "Which locator strategy is best for {concept}?", "What is the syntax for {type}?"],
    xpath: ["What does the `{concept}` axis do in XPath?", "How do you find an element by {type} in XPath?", "Is `{concept}` an absolute or relative XPath?"],
    waits: ["What is the default timeout for {type}?", "How does {type} handle a NoSuchElementException?", "When should you use {concept} over Thread.sleep()?"],
    pom: ["What is the main advantage of {concept} in POM?", "How do you initialize elements using {type}?", "Where should {concept} be stored in a POM framework?"],
    testng: ["What does the {type} annotation do?", "How do you run tests in {concept} using TestNG?", "What is the execution order of {type}?"]
  },
  playwright: {
    locators: ["How does Playwright locate a {type}?", "What is the difference between {concept} and {type} locators?", "Does Playwright support {concept} by default?"],
    assertions: ["How do you assert that {concept} in Playwright?", "Does the {type} assertion auto-retry?", "What is the opposite of the {type} assertion?"],
    fixtures: ["What is a {type} fixture in Playwright?", "How do you override the {concept} fixture?", "Are fixtures isolated per {type}?"],
    "api-testing": ["How do you send a {type} request in Playwright?", "How do you validate the {concept} of an API response?", "What object is used for {type} in Playwright?"]
  }
};

const fillers = {
  java: { type: ['int', 'boolean', 'ArrayList', 'HashMap', 'NullPointerException', 'map()', 'filter()'], concept: ['class', 'inheritance', 'polymorphism', 'encapsulation'] },
  python: { type: ['tuple', 'dictionary', 'set', 'ValueError', '__init__'], concept: ['type()', 'len()', 'list comprehension', 'inheritance'] },
  selenium: { type: ['By.id', 'By.cssSelector', 'Implicit Wait', 'Explicit Wait', '@Test', '@BeforeMethod'], concept: ['dynamic elements', 'parallel execution', 'PageFactory', 'child-to-parent'] },
  playwright: { type: ['getByRole', 'getByText', 'toBeVisible()', 'toHaveText()', 'page', 'browser', 'GET', 'POST'], concept: ['shadow DOM', 'auto-waiting', 'status code', 'test isolation'] }
};

const tagsPool = ['advanced', 'fundamentals', 'interview-frequent', 'tricky', 'core-concept'];
const difficulties = ['Easy', 'Medium', 'Hard'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let totalAdded = 0;

function processDirectory(tech) {
  const techPath = path.join(dataDir, tech);
  if (!fs.existsSync(techPath)) return;
  
  const files = fs.readdirSync(techPath).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const topic = file.replace('.json', '');
    const filePath = path.join(techPath, file);
    
    let questions = [];
    try {
      questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`Failed to read ${filePath}`);
      continue;
    }
    
    let maxId = questions.reduce((max, q) => Math.max(max, q.id), 0);
    
    const targetCount = 60; // 60 per topic * roughly 4-5 topics per tech = 250-300 per language
    const toAdd = targetCount - questions.length;
    
    if (toAdd <= 0) continue;
    
    const topicTemplates = (templates[tech] && templates[tech][topic]) || ["What is a core feature of {concept} in {type}?"];
    const techFillers = fillers[tech] || fillers.java;
    
    for (let i = 0; i < toAdd; i++) {
      maxId++;
      
      let qText = getRandomItem(topicTemplates);
      qText = qText.replace('{type}', getRandomItem(techFillers.type));
      qText = qText.replace('{concept}', getRandomItem(techFillers.concept));
      
      const q = {
        id: maxId,
        topic: topic,
        difficulty: getRandomItem(difficulties),
        question: `[Generated] ${qText}`,
        options: [
          `Correct generated option for ${topic}`,
          `Incorrect option A`,
          `Incorrect option B`,
          `Incorrect option C`
        ],
        correctAnswer: 0, // Hardcoded for generated
        explanation: `This is an auto-generated explanation for the procedural question in ${tech}/${topic}.`,
        tags: [getRandomItem(tagsPool), 'procedural']
      };
      
      // Shuffle options and update correctAnswer to simulate realistic questions
      const shuffledOptions = [...q.options];
      for (let j = shuffledOptions.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [shuffledOptions[j], shuffledOptions[k]] = [shuffledOptions[k], shuffledOptions[j]];
      }
      q.correctAnswer = shuffledOptions.indexOf(q.options[0]);
      q.options = shuffledOptions;
      
      questions.push(q);
      totalAdded++;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));
    console.log(`Added ${toAdd} questions to ${tech}/${file}`);
  }
}

['java', 'python', 'selenium', 'playwright'].forEach(processDirectory);
console.log(`\nTotal questions generated and added: ${totalAdded}`);
