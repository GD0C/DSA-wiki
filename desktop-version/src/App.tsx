import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ArrayDiagram, AccordionCard, BaseCard, LLDiagram } from "./components";
import { useTheme, type Theme } from "./theme";
import "./App.css";


const titles: string[] = [
  "Intro",
  "Array Diagram Example (Basic)",
  "Array Diagram Example (Advanced)",
  "setup",
]

const values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const llValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(llValues);


const renderDetail = (value: number | undefined, idx: number) => (
  <div className="text-red-500">arr[{idx}] = {String(value)}</div>
);

const details: React.ReactNode[] = [
  (<button className="hover:cursor-pointer">hello</button>),
  (<ArrayDiagram values={values} />),
  (<ArrayDiagram values={values} type="advanced" renderDetail={renderDetail} />),
  (<LLDiagram />),
]

const accordionData = Array.from({ length: 4 }, (_, i) => ({
  title: titles[i],
  children: <div className="p-5">{details[i]}</div>,
}));

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  async function greet() {
    const msg = await invoke<string>("greet", { name });
    setGreetMsg(msg);
  }


  // TODO: CLEAN THIS S*** UP
  return (
    <main className="p-4">
      <div className="flex flex-col gap-4">
        <AccordionCard data={accordionData} />

        <BaseCard>
          <h1 className="text-5xl font-bold text-red-500">Welcome to Tauri + React</h1>
        </BaseCard>
      </div>

      <div className="row">
        <button type="button" onClick={toggleTheme}>
          Toggle theme (now: {resolvedTheme})
        </button>
        <select value={theme} onChange={(e) => setTheme(e.currentTarget.value as Theme)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>

      </div>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main >
  );
}

export default App;
