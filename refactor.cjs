const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.svelte') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace in single quotes
    const sqRegex = /'http:\/\/(127\.0\.0\.1|localhost):8000([^']*)'/g;
    if (sqRegex.test(content)) {
        content = content.replace(sqRegex, "`${import.meta.env.VITE_PUBLIC_BACKEND_URL}$2`");
        changed = true;
    }

    // Replace in double quotes
    const dqRegex = /"http:\/\/(127\.0\.0\.1|localhost):8000([^"]*)"/g;
    if (dqRegex.test(content)) {
        content = content.replace(dqRegex, "`${import.meta.env.VITE_PUBLIC_BACKEND_URL}$2`");
        changed = true;
    }

    // Replace in backticks
    const bqRegex = /`http:\/\/(127\.0\.0\.1|localhost):8000([^`]*)`/g;
    if (bqRegex.test(content)) {
        content = content.replace(bqRegex, "`${import.meta.env.VITE_PUBLIC_BACKEND_URL}$2`");
        changed = true;
    }

    // Replace any remaining raw strings not caught (e.g. inside existing template literals where backtick isn't immediately adjacent)
    const rawRegex = /http:\/\/(127\.0\.0\.1|localhost):8000/g;
    if (rawRegex.test(content)) {
        content = content.replace(rawRegex, "${import.meta.env.VITE_PUBLIC_BACKEND_URL}");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
