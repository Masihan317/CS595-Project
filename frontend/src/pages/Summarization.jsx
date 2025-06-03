import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import pdfToText from "../utils/pdfToText";

const Summarization = () => {
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const text = await pdfToText(file);
      setInputText(text);
    } else {
      alert("Please upload a valid PDF file.")
    }
  };

  return (
    <div className="container">
      <div className="row p-4">
        <div className="col-lg-6 bg-light">
          <Form>
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
                  className="btn btn-secondary d-flex align-items-center gap-2"
                  onClick={handleUploadClick}
                >
                  <AiOutlineCloudUpload size={20} />
                  Upload Doc
                </Button>
              </div>
              <Button className="btn btn-primary d-flex align-items-center gap-2">
                <HiOutlineDocumentDuplicate size={20} />
                Summarize
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-lg-6 bg-light">
          <Form>
            <Form.Group className="mb-2" controlId="output">
              <Form.Label as='h4'>Summary Output</Form.Label>
              <Form.Control as="textarea" plaintext readOnly rows={20} />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center"></div>
              <div className="d-flex align-items-center"></div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Summarization