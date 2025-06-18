import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import pdfToText from "../utils/pdfToText";

const Flashcards = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([])
  const fileInputRef = useRef(null);

  const [isParsing, setIsParsing] = useState(false)
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false)
  const [canShowFlashcards, setCanShowFlashcards] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

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
  }

  const handleGenerateFlashcards = async () => {
    setIsGeneratingFlashcards(true)
    try {
      const response = await fetch("https://cs595-project.onrender.com/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setFlashcards(data.flashcards)
      setCanShowFlashcards(true)
    } catch (error) {
      console.error("Flashcard generation failed: ", error)
    } finally {
      setIsGeneratingFlashcards(false)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-3 px-3">
        {!canShowFlashcards ? (
          <Form className="bg-light rounded px-3 pt-2 pb-1">
            <Form.Group className="mb-2" controlId="flashcard-input">
              <Form.Label as='h4'>Flashcard Prompt Input</Form.Label>
              <Form.Control as="textarea" className="mb-2" rows={20} value={inputText} onChange={(e) => setInputText(e.target.value)}/>
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
                    className="btn btn-info d-flex align-items-center gap-2"
                    onClick={handleUploadClick}
                  >
                    <AiOutlineCloudUpload size={20} />
                    {isParsing ? (
                      <>Parsing <Spinner animation="border" size="sm" /></>
                    ) : (
                      "Upload Prompt"
                    )}
                  </Button>
                </div>
                <Button 
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleGenerateFlashcards}
                >
                  <HiOutlineDocumentDuplicate size={20} />
                  {isGeneratingFlashcards ? (
                      <>Generating <Spinner animation="border" size="sm" /></>
                    ) : (
                      "Generate Flashcards"
                    )}
                </Button>
              </div>
            </Form.Group>
          </Form>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-between">
            <Card onClick={() => setShowAnswer(!showAnswer)} className="w-100 shadow mb-3" style={{ minHeight: "600px", cursor: "pointer" }}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Text className="fs-1">
                  {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="d-flex align-items-center justify-content-around w-100">
              <Button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
                  setShowAnswer(false)
                }}
                disabled={currentIndex === 0}
              >Previous Flashcard</Button>
              <Button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev))
                  setShowAnswer(false)
                }}
                disabled={currentIndex === flashcards.length - 1}
              >Next Flashcard</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flashcards