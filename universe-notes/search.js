import { readFile } from "node:fs/promises";
import { argv } from "node:process";

const query = argv.slice(2).join(" ").trim().toLowerCase();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const notes = JSON.parse(
    await readFile(
      new URL("./notes/keynote-highlights.json", import.meta.url),
      "utf8",
    ),
  );
  const matches = notes.highlights.filter(({ title, summary }) =>
    `${title} ${summary}`.toLowerCase().includes(query),
  );

  if (matches.length === 0) {
    console.log("No matching highlights.");
  } else {
    for (const { title, summary } of matches) {
      console.log(`${title}\n  ${summary}`);
    }
  }
}
