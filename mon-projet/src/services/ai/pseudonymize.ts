import fs from 'fs';
import path from 'path';

/**
 * Very small pseudonymisation script for JSON decision files.
 * - Loads a JSON file (array or object)
 * - Replaces tokens that look like proper names with [REDACTED_NAME]
 * - Writes a .pseudonymized.json next to the input
 *
 * NOTE: This is a heuristic placeholder. For production use, replace with
 * an NLP pipeline (NER model) and make sure to preserve legal constraints.
 */

function pseudonymizeText(text: string) {
  // Naive regex: capitalized words of 2+ letters (this will match many false positives)
  return text.replace(/\b([A-ZÉÈÀÙÎÔÄËÏÜ][a-zéèàùîôäëïü'-]{1,})\b/g, '[REDACTED_NAME]');
}

export function pseudonymizeFile(inputFile: string) {
  const full = path.resolve(inputFile);
  const raw = fs.readFileSync(full, 'utf-8');
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    throw new Error('Input must be valid JSON');
  }

  const walk = (obj: any): any => {
    if (typeof obj === 'string') return pseudonymizeText(obj);
    if (Array.isArray(obj)) return obj.map(walk);
    if (obj && typeof obj === 'object') {
      const out: any = {};
      for (const k of Object.keys(obj)) out[k] = walk(obj[k]);
      return out;
    }
    return obj;
  };

  const result = walk(data);
  const outPath = full.replace(/(\.json)?$/, '.pseudonymized.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  return outPath;
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node pseudonymize.js <path-to-json>');
    process.exit(2);
  }
  const out = pseudonymizeFile(file);
  console.log('Wrote pseudonymized file to', out);
}
