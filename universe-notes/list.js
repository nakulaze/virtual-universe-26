import { readFileSync } from "node:fs";

const notes = JSON.parse(
  readFileSync(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
);
const highlightsByTopic = new Map();

for (const { topic, title } of notes.highlights) {
  const titles = highlightsByTopic.get(topic) ?? [];
  titles.push(title);
  highlightsByTopic.set(topic, titles);
}

for (const [topic, titles] of highlightsByTopic) {
  console.log(topic);
  for (const title of titles) {
    console.log(`  - ${title}`);
  }
}
