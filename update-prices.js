const fs = require('fs');
const path = 'src/app/menu/[[...slug]]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Handle Chicken first
    if (line.includes('Chicken 8.99')) {
        line = line.replace('Chicken 8.99', 'Chicken @@CHICKEN@@');
    }

    // Protect exclusions
    if (line.includes('Kids Meals are $9.99')) {
        line = line.replace('$9.99', '$@@KIDS@@');
    }
    if (line.includes('Fried Clam Strips') && line.includes('15.99')) {
        line = line.replace('15.99', '@@CLAM_STRIPS@@');
    }

    // Now replace all \d+\.99
    line = line.replace(/(?<!\d)(\d+)\.99/g, (match, p1) => {
        return (parseInt(p1) + 1) + '.99';
    });

    // Restore protections
    line = line.replace('@@CHICKEN@@', '11.99');
    line = line.replace('@@KIDS@@', '9.99');
    line = line.replace('@@CLAM_STRIPS@@', '15.99');

    lines[i] = line;
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Prices updated successfully!');
