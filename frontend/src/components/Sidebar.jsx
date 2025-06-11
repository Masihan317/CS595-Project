import { Nav, Navbar } from 'react-bootstrap';
import { PiSmileyWinkBold } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiCardsThree } from "react-icons/pi";
import { TbMessageChatbot } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
      <Navbar.Brand href="/" className="d-flex align-items-center link-dark text-decoration-none">
        <PiSmileyWinkBold size={32} className="me-2" />
        <span className="fs-4">AI Study Buddy</span>
      </Navbar.Brand>
      <hr />
      <Nav variant="pills" className="flex-column mb-auto align-items-start">
        <Nav.Link href="/summarization" active className="active d-flex align-items-center w-100">
          <IoDocumentTextOutline size={20} className="me-2" />
          Summarization
        </Nav.Link>
        <Nav.Link href="/flashcards" className="link-dark d-flex align-items-center w-100">
          <PiCardsThree size={20} className="me-2" />
          Flashcards Generator
        </Nav.Link>
        <Nav.Link href="/chatbot" className="link-dark d-flex align-items-center w-100">
          <TbMessageChatbot size={20} className="me-2" />
          Q&A Chatbot
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;