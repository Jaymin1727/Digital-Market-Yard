const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'dmy', 'src');
const apiConfigImport = 'import API_BASE_URL from "../apiConfig";\n'; 
// Note: path might need to be adjusted per file depth, but we can use an absolute-ish or fixed one if we are careful.
// Alternatively, I'll just use process.env.REACT_APP_API_URL directly in each file for simplicity if needed, 
// but centralizing is better.

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const targetUrl = /http:\/\/localhost:8080/g;

walkDir(srcDir, (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.match(targetUrl)) {
            console.log(`Updating ${filePath}`);
            
            // Calculate relative path for apiConfig
            const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'apiConfig'));
            const importStatement = `import API_BASE_URL from "${relativePath.replace(/\\/g, '/')}";\n`;
            
            // Add import if not present
            if (!content.includes('import API_BASE_URL')) {
                content = importStatement + content;
            }
            
            // Replace URL
            // Case 1: "http://localhost:8080/..." -> `${API_BASE_URL}/...`
            // Case 2: 'http://localhost:8080/...' -> `${API_BASE_URL}/...`
            content = content.replace(/"http:\/\/localhost:8080([^"]*)"/g, '`${API_BASE_URL}$1`');
            content = content.replace(/'http:\/\/localhost:8080([^']*)'/g, '`${API_BASE_URL}$1`');
            
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
