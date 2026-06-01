const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const escapeAttribute = (value) => escapeHtml(value).replace(/`/g, "&#96;");

const unescapeMarkdownUrl = (value) => String(value)
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, "\"")
  .replace(/&#39;/g, "'");

const sanitizeUrl = (value) => {
  const url = unescapeMarkdownUrl(value).trim();

  if (/^(https?:|mailto:|tel:|\/|#)/i.test(url)) {
    return escapeAttribute(url);
  }

  return "#";
};

const isBlockStart = (line) => {
  const trimmed = line.trim();

  return (
    trimmed === "" ||
    /^```/.test(trimmed) ||
    /^#{1,6}\s+/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    /^[-*+]\s+/.test(trimmed) ||
    /^\d+[.)]\s+/.test(trimmed) ||
    /^\|/.test(trimmed) ||
    /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(trimmed)
  );
};

const parseTable = (lines) => {
  if (lines.length < 2 || !lines.every((line) => line.trim().startsWith("|"))) {
    return null;
  }

  const rows = lines.map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  const separatorIndex = rows.findIndex((row) => row.every((cell) => /^:?-{3,}:?$/.test(cell)));

  if (separatorIndex < 1) {
    return null;
  }

  const headers = rows[separatorIndex - 1];
  const bodyRows = rows.slice(separatorIndex + 1).filter((row) => row.some(Boolean));

  if (headers.length < 2 || bodyRows.length === 0) {
    return null;
  }

  return {
    headers,
    rows: bodyRows.map((row) => headers.map((_, cellIndex) => row[cellIndex] || "")),
  };
};

export const renderMarkdownInline = (value = "") => {
  const codeSpans = [];
  const codePlaceholder = "\u0000CODESPAN";
  const withCodePlaceholders = String(value).replace(/`([^`]+)`/g, (_, code) => {
    const index = codeSpans.push(`<code>${escapeHtml(code)}</code>`) - 1;
    return `${codePlaceholder}${index}\u0000`;
  });

  let html = escapeHtml(withCodePlaceholders);

  html = html.replace(/!\[([^\]]*)]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_, alt, url) => (
    `<img src="${sanitizeUrl(url)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async">`
  ));

  html = html.replace(/\[([^\]]+)]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_, label, url) => (
    `<a href="${sanitizeUrl(url)}" rel="noopener noreferrer" target="_blank">${label}</a>`
  ));

  html = html
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");

  codeSpans.forEach((code, index) => {
    html = html.replace(`${codePlaceholder}${index}\u0000`, code);
  });

  return html;
};

const renderList = (lines, tagName, markerPattern) => {
  const items = lines
    .map((line) => line.trim().replace(markerPattern, ""))
    .map((item) => `<li>${renderMarkdownInline(item)}</li>`)
    .join("");

  return `<${tagName}>${items}</${tagName}>`;
};

const renderTable = (table) => {
  const headers = table.headers.map((header) => `<th>${renderMarkdownInline(header)}</th>`).join("");
  const rows = table.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${renderMarkdownInline(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `<div class="blog-table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
};

export const renderMarkdownToHtml = (markdown = "") => {
  const lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;
  let paragraphIndex = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed === "") {
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.replace(/^```/, "").trim().replace(/[^\w-]/g, "");
      const codeLines = [];
      index += 1;

      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      const className = language ? ` class="language-${escapeAttribute(language)}"` : "";
      blocks.push(`<pre><code${className}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(trimmed)) {
      blocks.push("<hr>");
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(Number(headingMatch[1].length) + 1, 6);
      blocks.push(`<h${level}>${renderMarkdownInline(headingMatch[2].replace(/\s+#+$/, ""))}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines = [];

      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(`<blockquote><p>${renderMarkdownInline(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^\|/.test(trimmed)) {
      const tableLines = [];

      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const table = parseTable(tableLines);
      blocks.push(table ? renderTable(table) : `<p>${renderMarkdownInline(tableLines.join(" "))}</p>`);
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      const listLines = [];

      while (index < lines.length && /^[-*+]\s+/.test(lines[index].trim())) {
        listLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderList(listLines, "ul", /^[-*+]\s+/));
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const listLines = [];

      while (index < lines.length && /^\d+[.)]\s+/.test(lines[index].trim())) {
        listLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderList(listLines, "ol", /^\d+[.)]\s+/));
      continue;
    }

    const paragraphLines = [];

    while (index < lines.length && !isBlockStart(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const className = paragraphIndex === 0 ? ' class="lede"' : "";
    blocks.push(`<p${className}>${renderMarkdownInline(paragraphLines.join(" "))}</p>`);
    paragraphIndex += 1;
  }

  return blocks.join("\n");
};
