import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [output, setOutput] = useState("(loading...)");
  const [code, setCode] = useState("");

  function handleEditorChange(value, event) {
    setCode(`__name__ = '__main__'\n${value}`);
    //console.log("here is the current model value:", value);
    //console.log(event);
  }

  function handleRunCode() {
    console.log('handleRunCode');
    window.pyodide.loadPackage([]).then(() => {
      let output = window.pyodide.runPython(code);
      console.log('pyodide output:', output);
      setOutput(output);
    })
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Python in Browser example
        </Typography>
        <Editor 
          height="50vh"
          defaultLanguage="python"
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <Button 
          onClick={handleRunCode}
          variant="contained">
            Run
        </Button>
      </Box>
      <Box>
        <code>{output}</code>
      </Box>
      <Copyright />
    </Container>
  );
}