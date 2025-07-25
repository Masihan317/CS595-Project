import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { FaCopy, FaFileExport } from "react-icons/fa";
import pdfToText from "../utils/pdfToText";
import exportTextAsTxt from "../utils/exportTextAsTxt";
import countWords from "../utils/countWords";

const Summarization = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("")
  const [keywords, setKeywords] = useState("");
  const [subject, setSubject] = useState("");
  const fileInputRef = useRef(null);

  const [isParsing, setIsParsing] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)

  const wordCount = countWords(summary)
  let wordLabel;
  if (wordCount === 1) {
    wordLabel = "word"
  } else {
    wordLabel = "words"
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsParsing(true)
      const text = await pdfToText(file);
      setInputText(text);
      setIsParsing(false)
    } else {
      alert("Please upload a valid PDF file.")
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true)
    try {
      const response = await fetch("https://cs595-project.onrender.com/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setSummary(data.summary);

    const analysisRes = await fetch("https://cs595-project-ml.onrender.com/analyze-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: data.summary }),
    });
    const analysisData = await analysisRes.json();

    if (Array.isArray(analysisData.keywords)) {
      setKeywords(analysisData.keywords.join(", "));
      setSubject(analysisData.subject || "");
    } else {
      setKeywords("No keywords found.");
      setSubject("");
    }

    } catch (error) {
      console.error("Summarization failed: ", error)
    } finally {
      setIsSummarizing(false)
    }
  };

  const handleCopy = async () => {
    try {
      if (summary) {
        await navigator.clipboard.writeText(summary)
        alert("AI Summary Copied to Clipboard Successfully!")
      } else {
        alert("No Summary to Copy.")
      }
    } catch (err) {
      alert("Failed to Copy Summary.")
    }
  }

  const handleExport = () => {
    exportTextAsTxt(summary, "ai-summary.txt");
  }

  return (
    <div className="container-fluid">
      <div className="row pt-3">
        <div className="col-lg-6">
          <Form id="text-input" className="bg-light rounded px-3 py-2">
            <Form.Group className="mb-2" controlId="input">
              <Form.Label as='h4'>Text Input</Form.Label>
              <Form.Control as="textarea" rows={20} value={inputText} onChange={(e) => setInputText(e.target.value)}/>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  className="btn btn-warning d-flex align-items-center gap-2"
                  onClick={handleUploadClick}
                >
                  <AiOutlineCloudUpload size={20} />
                  {isParsing ? (
                    <>Parsing <Spinner animation="border" size="sm" /></>
                  ) : (
                    "Upload Doc"
                  )}
                </Button>
              </div>
              <Button 
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={handleSummarize}
              >
                <HiOutlineDocumentDuplicate size={20} />
                {isSummarizing ? (
                    <>Summarizing <Spinner animation="border" size="sm" /></>
                  ) : (
                    "Summarize"
                  )}
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-lg-6">
          <Form id="summary-output" className="bg-light rounded px-3 py-2">
            <Form.Group className="mb-2" controlId="output">
              <Form.Label as='h4'>Summary Output</Form.Label>
              <Form.Control as="textarea" plaintext readOnly rows={20} value={summary} onChange={(e) => setSummary(e.target.value)}/>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center py-2">
                <span>{wordCount}</span>&nbsp;<span>{wordLabel}</span>
              </div>
              <div className="d-flex align-items-center">
                <Button className="btn btn-danger d-flex align-items-center gap-2" onClick={handleCopy}>
                  <FaCopy size={16}/>
                  Copy
                </Button>
                <Button className="btn ms-2 btn-success d-flex align-items-center gap-2" onClick={handleExport}>
                  <FaFileExport size={16}/>
                  Export
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col">
          <Form id="subject" className="bg-light rounded px-3 py-2">
            <Form.Group className="mb-2" controlId="subject">
              <Form.Label as='h4'>Subject</Form.Label>
              <Form.Control as="textarea" plaintext readOnly value={subject} rows={1}/>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col">
          <Form id="keywords" className="bg-light rounded px-3 py-2">
            <Form.Group className="mb-2" controlId="keywords">
              <Form.Label as='h4'>Keywords</Form.Label>
              <Form.Control as="textarea" plaintext readOnly value={keywords} rows={3}/>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Summarization