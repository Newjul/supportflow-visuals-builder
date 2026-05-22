# SupportFlow AI — Visual Decision Tree Editor

A browser-based flowchart editor that lets support teams build, visualize, and test automated chatbot conversation flows — without touching a spreadsheet.

---

## Why This Exists

Support teams at SupportFlow were managing their entire bot logic in Excel. Every time a policy changed, someone had to hunt through rows and columns, manually trace which question led where, and hope nothing broke. It was fragile, invisible, and slow.

This tool replaces that with a live visual editor: drag nodes around a canvas, edit question text in real time, and instantly test the full conversation as if you were a real customer — all in one place, no backend required.

---

## Features

### Visual Flow Canvas
Nodes are positioned absolutely on a 1200×800 dot-grid canvas using `x/y` coordinates from the JSON data. Every node renders its type label, question text, and answer options as a self-contained card. SVG bezier curves connect parent nodes to their children — drawn from scratch using DOM coordinates, no graph library involved.

### Real-Time Node Editing
Click any node to open a floating properties panel beside it. Edit the question text and the canvas updates immediately. The panel closes automatically when your cursor leaves it, keeping the canvas clean.

### Drag and Drop
Every node is draggable via `mousedown` → `mousemove` → `mouseup` listeners attached to the window. Connector lines recalculate and follow in real time as you reposition nodes.

### Node Search
A search bar in the top right of the canvas filters nodes by question 
text in real time. Matching nodes stay fully visible while non-matching 
ones fade out, making it easy to locate specific nodes in large flows.

### Chat Preview Mode
Hit **▶ Preview** to switch into a WhatsApp-style chat interface. The start node opens the conversation as a bot bubble on the left. Click an option and it appears as a blue bubble on the right, then the next question follows below it — building a natural chat thread as you go. Hit **← Editor** to jump back and inspect any node, then return to preview exactly where you left off.

### Persistent Preview State
The conversation doesn't reset when you switch modes. Most editors wipe the preview on every exit — this one keeps the full chat history in state so you can cross-reference the flow and the live conversation side by side without losing your place.

### Restart
At any end node (leaf with no options), a Restart button resets the conversation back to the first question so you can walk through a different path.

---

## Tech Stack

- **React** — `useState`, `useRef`, `useCallback`
- **Tailwind CSS** — custom components only, no UI libraries
- **SVG** — hand-rolled cubic bezier curves for connectors
- **JSON** — `flow_data.json` as the single source of truth

No `react-flow`. No `jsPlumb`. No Bootstrap. No Material UI. Everything rendered and wired by hand.

---

## Getting Started

```bash
git clone https://github.com/Newjul/supportflow-visual-builder
cd supportflow-visual-builder
npm install
npm run dev
```

---

## Project Structure

```
src/
├── components/
│   ├── Node.jsx              # Draggable node card — type, text, option pills
│   ├── ConnectorLayer.jsx    # SVG layer — bezier curves between nodes
│   └── PropertiesPanel.jsx   # Floating edit panel — live text editing
├── pages/
│   └── BuilderPage.jsx       # Editor + preview state, drag logic, mode switching
└── data/
    └── flow_data.json        # Canvas size + full node graph definition
```

---

## Flow Data Format

The entire conversation is defined in `flow_data.json`. Each node has an `id`, `type`, `text`, absolute `position`, and an `options` array pointing to the next node via `nextId`. End nodes have an empty options array.

```json

 {
  "meta": {
    "theme": "dark",
    "canvas_size": { "w": 1200, "h": 800 }
  },
  "nodes": [
    {
      "id": "1",
      "type": "start",
      "text": "Welcome to Support. What is your issue?",
      "position": { "x": 500, "y": 50 },
      "options": [
        { "label": "Internet is down", "nextId": "2" },
        { "label": "Billing Question", "nextId": "3" }
      ]
    },
    {
      "id": "2",
      "type": "question",
      "text": "Have you tried restarting your router?",
      "position": { "x": 250, "y": 250 },
      "options": [
        { "label": "Yes, didn't work", "nextId": "4" },
        { "label": "No, let me try", "nextId": "5" }
      ]
    },
    {
      "id": "3",
      "type": "question",
      "text": "Is this for a Personal or Business account?",
      "position": { "x": 750, "y": 250 },
      "options": [
        { "label": "Personal", "nextId": "6" },
        { "label": "Business", "nextId": "6" }
      ]
    },
    {
      "id": "4",
      "type": "end",
      "text": "Please call 555-0199 for a technician visit.",
      "position": { "x": 100, "y": 500 },
      "options": []
    },
    {
      "id": "5",
      "type": "end",
      "text": "Restarting usually fixes it! Come back if it fails.",
      "position": { "x": 400, "y": 500 },
      "options": []
    },
    {
      "id": "6",
      "type": "end",
      "text": "Connecting you to a Billing Agent...",
      "position": { "x": 750, "y": 500 },
      "options": []
    }
  ]
}



```

 The flow wired via `nextId` which acts as edge or connector between nodes.

---

## Design System

The visual language is documented in the Figma file, covering:

- **Color Semantics** — start, question, and end node colors, connector stroke, canvas background
- **Node Cards** — all three variants with type labels, question text, and option pills
- **Connectors** — bezier curve stroke spec (`#94a3b8`, weight 2)
- **Canvas** — dot grid, EDITOR MODE watermark, layout dimensions

🔗 [View Design File](https://www.figma.com/design/LDsMgSFyYGBsO0NzCGremN/SupportFlow-AI-%E2%80%94-Design-System?node-id=0-1&t=qTYXuQUunRniW1mc-1)

---

## Live Demo

🔗 [View Deployment](https://supportflow-visuals-builder.vercel.app/)

---
